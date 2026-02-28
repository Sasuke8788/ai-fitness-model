# Testing Report

## Scope

Validated core deliverables:
- Diet recommendation model + API
- Workout analysis model + API
- Behavior prediction model + API
- Chat API fallback path
- Admin analytics API

## Automated Tests

Test file:
- `backend/tests/test_backend.py`

Run command:
- `cd backend`
- `python -m unittest discover -s tests -p "test_*.py"`

## Covered Test Cases

- Diet output includes BMI, calories, macro split
- Workout analysis returns reps and form score
- Behavior prediction returns adherence score and risk level
- API health check returns service readiness
- Admin analytics endpoint returns usage summary

## Notes

- Chat model gracefully falls back to a safe coach response when Gemini SDK or API key is unavailable.
- Pose webcam route (`/workout`) requires `mediapipe` + `opencv-python` and a camera device.
