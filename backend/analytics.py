from datetime import datetime, timezone
from threading import Lock


class AnalyticsStore:
    def __init__(self):
        self._events = []
        self._lock = Lock()

    def track(self, event_type, payload=None):
        payload = payload or {}
        event = {
            "event_type": event_type,
            "payload": payload,
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
        with self._lock:
            self._events.append(event)
        return event

    def summary(self):
        with self._lock:
            events = list(self._events)

        usage = {
            "diet_requests": 0,
            "chat_requests": 0,
            "workout_analyses": 0,
            "behavior_predictions": 0,
        }

        latest_scores = []
        for event in events:
            et = event["event_type"]
            if et in usage:
                usage[et] += 1
            if et == "workout_analyses":
                score = event["payload"].get("form_score")
                if isinstance(score, (int, float)):
                    latest_scores.append(score)

        avg_form_score = round(sum(latest_scores) / len(latest_scores), 2) if latest_scores else None

        return {
            "total_events": len(events),
            "usage": usage,
            "avg_form_score": avg_form_score,
            "last_event": events[-1] if events else None,
        }

    def recent_events(self, limit=20):
        limit = max(1, min(int(limit), 100))
        with self._lock:
            return list(self._events[-limit:])[::-1]
