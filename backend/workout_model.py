from statistics import mean


def analyze_squat_angles(angle_series):
    if not angle_series:
        return {
            "exercise": "squat",
            "reps": 0,
            "avg_depth_angle": None,
            "form_score": 0,
            "feedback": "No pose data received.",
        }

    clean_angles = [float(a) for a in angle_series if a is not None]
    if not clean_angles:
        return {
            "exercise": "squat",
            "reps": 0,
            "avg_depth_angle": None,
            "form_score": 0,
            "feedback": "Invalid pose data.",
        }

    reps = 0
    stage = "up"
    for angle in clean_angles:
        if angle > 160:
            stage = "up"
        if angle < 95 and stage == "up":
            reps += 1
            stage = "down"

    avg_depth_angle = round(mean(clean_angles), 2)

    if avg_depth_angle < 105:
        form_score = 90
        feedback = "Great squat depth and control."
    elif avg_depth_angle < 130:
        form_score = 75
        feedback = "Good work. Try to sit slightly deeper on each rep."
    else:
        form_score = 60
        feedback = "Depth is limited. Focus on hip mobility and tempo."

    return {
        "exercise": "squat",
        "reps": reps,
        "avg_depth_angle": avg_depth_angle,
        "form_score": form_score,
        "feedback": feedback,
    }
