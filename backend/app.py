from flask import Flask, request, jsonify
import threading

try:
    from flask_cors import CORS
except ImportError:
    CORS = None
from diet import build_diet_recommendation
from chatbot import fitness_chatbot
from pose_detector import start_workout, check_dependencies
from behavior import predict_adherence
from workout_model import analyze_squat_angles
from analytics import AnalyticsStore

app = Flask(__name__)
analytics_store = AnalyticsStore()

if CORS:
    CORS(app)
else:
    @app.after_request
    def add_cors_headers(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
        return response

@app.route("/")
def home():
    return jsonify(
        {
            "service": "AI Fitness Assistant",
            "status": "running",
            "version": "v1",
        }
    )


@app.route("/health")
def health():
    workout_ok, workout_error = check_dependencies()
    return jsonify(
        {
            "status": "ok",
            "workout_model_ready": workout_ok,
            "workout_model_message": workout_error,
        }
    )


def _require_fields(data, required_fields):
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400
    return None

@app.route("/diet", methods=["POST"])
def diet():
    return diet_recommendation()


@app.route("/api/v1/diet/recommendation", methods=["POST"])
def diet_recommendation():
    data = request.get_json(silent=True) or {}
    required_fields = ["weight", "height", "age", "goal"]
    validation_error = _require_fields(data, required_fields)
    if validation_error:
        return validation_error

    try:
        result = build_diet_recommendation(
            data["weight"], data["height"], data["age"], data["goal"]
        )
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid numeric inputs for diet recommendation."}), 400

    analytics_store.track("diet_requests", {"goal": data.get("goal")})
    return jsonify(result)

@app.route("/chat", methods=["POST"])
def chat():
    return chat_v1()


@app.route("/api/v1/chat", methods=["POST"])
def chat_v1():
    data = request.get_json(silent=True) or {}
    if "message" not in data:
        return jsonify({"error": "Missing field: message"}), 400
    msg = data["message"]
    response = fitness_chatbot(msg)
    analytics_store.track("chat_requests", {"message_length": len(msg)})
    return jsonify({"response": response})


@app.route("/api/v1/workout/analyze", methods=["POST"])
def analyze_workout():
    data = request.get_json(silent=True) or {}
    if "angles" not in data:
        return jsonify({"error": "Missing field: angles"}), 400

    try:
        result = analyze_squat_angles(data.get("angles", []))
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid angle series."}), 400

    analytics_store.track("workout_analyses", result)
    return jsonify(result)


@app.route("/api/v1/behavior/predict", methods=["POST"])
def behavior_predict():
    data = request.get_json(silent=True) or {}
    required_fields = ["workout_days_per_week", "avg_sleep_hours", "missed_sessions"]
    validation_error = _require_fields(data, required_fields)
    if validation_error:
        return validation_error

    try:
        result = predict_adherence(
            data["workout_days_per_week"],
            data["avg_sleep_hours"],
            data["missed_sessions"],
        )
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid behavior input values."}), 400

    analytics_store.track("behavior_predictions", result)
    return jsonify(result)


@app.route("/api/v1/admin/analytics", methods=["GET"])
def admin_analytics():
    return jsonify(analytics_store.summary())


@app.route("/api/v1/admin/events", methods=["GET"])
def admin_events():
    limit = request.args.get("limit", 20)
    return jsonify({"events": analytics_store.recent_events(limit)})

@app.route("/workout")
def workout():
    threading.Thread(target=start_workout).start()
    return {"status":"Camera Started"}

if __name__ == "__main__":
    app.run(debug=True)
