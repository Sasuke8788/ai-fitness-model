import os
import sys
import unittest

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from app import app
from behavior import predict_adherence
from diet import build_diet_recommendation
from workout_model import analyze_squat_angles


class ModelTests(unittest.TestCase):
    def test_diet_recommendation_shape(self):
        result = build_diet_recommendation(70, 175, 27, "maintain")
        self.assertIn("bmi", result)
        self.assertIn("calories", result)
        self.assertIn("macros", result)

    def test_workout_analysis_counts_reps(self):
        result = analyze_squat_angles([170, 165, 92, 96, 170, 90])
        self.assertGreaterEqual(result["reps"], 1)
        self.assertIn("form_score", result)

    def test_behavior_prediction_output(self):
        result = predict_adherence(4, 7.5, 1)
        self.assertIn("adherence_score", result)
        self.assertIn("risk_level", result)
        self.assertIsInstance(result["recommendations"], list)


class ApiTests(unittest.TestCase):
    def setUp(self):
        app.config["TESTING"] = True
        self.client = app.test_client()

    def test_health(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)

    def test_diet_api(self):
        response = self.client.post(
            "/api/v1/diet/recommendation",
            json={"weight": 70, "height": 175, "age": 27, "goal": "maintain"},
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("bmi", data)
        self.assertIn("macros", data)

    def test_chat_api(self):
        response = self.client.post("/api/v1/chat", json={"message": "Suggest a workout"})
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("response", data)

    def test_workout_analysis_api(self):
        response = self.client.post("/api/v1/workout/analyze", json={"angles": [170, 160, 92, 170]})
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("reps", data)

    def test_behavior_predict_api(self):
        payload = {
            "workout_days_per_week": 4,
            "avg_sleep_hours": 7,
            "missed_sessions": 1,
        }
        response = self.client.post("/api/v1/behavior/predict", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("adherence_score", data)

    def test_admin_analytics_api(self):
        response = self.client.get("/api/v1/admin/analytics")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("usage", data)


if __name__ == "__main__":
    unittest.main()
