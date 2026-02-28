def predict_adherence(workout_days_per_week, avg_sleep_hours, missed_sessions):
    workout_days_per_week = max(0, int(workout_days_per_week))
    avg_sleep_hours = max(0.0, float(avg_sleep_hours))
    missed_sessions = max(0, int(missed_sessions))

    score = 50
    score += min(workout_days_per_week, 7) * 5
    score += min(avg_sleep_hours, 9) * 3
    score -= missed_sessions * 6

    score = max(0, min(100, int(score)))

    if score >= 75:
        risk = "low"
    elif score >= 50:
        risk = "medium"
    else:
        risk = "high"

    if risk == "high":
        recommendations = [
            "Reduce weekly target volume and rebuild consistency.",
            "Fix sleep first and train at the same time each day.",
            "Schedule 3 non-negotiable sessions for next week.",
        ]
    elif risk == "medium":
        recommendations = [
            "Keep sessions short and progressive.",
            "Track missed sessions and adjust realistic targets.",
            "Aim for at least 7 hours of sleep for recovery.",
        ]
    else:
        recommendations = [
            "Maintain current habit strength.",
            "Progress load gradually to avoid burnout.",
            "Use weekly deloads when fatigue rises.",
        ]

    return {
        "adherence_score": score,
        "risk_level": risk,
        "recommendations": recommendations,
    }
