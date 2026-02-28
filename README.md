# AI Gym & Fitness Assistant

Full-stack AI-based fitness assistant with modular models for workout analysis, diet recommendation, behavior prediction, and admin analytics.

## Deliverables Implemented

- Fully functional AI-based Gym & Fitness Assistant system
- Modular AI models:
  - Workout detection/analysis (`backend/workout_model.py`)
  - Diet recommendation (`backend/diet.py`)
  - Behavior prediction (`backend/behavior.py`)
- Backend APIs and integration layer:
  - Flask API (`backend/app.py`)
  - Frontend API client (`frontend/src/api/client.js`)
- Documentation and testing artifacts:
  - Test suite (`backend/tests/test_backend.py`)
  - Testing report (`docs/testing-report.md`)
  - Deployment guide (`docs/deployment.md`)
- Final deployment readiness with admin dashboard + analytics:
  - Admin UI (`frontend/src/pages/Admin.js`)
  - Admin APIs (`/api/v1/admin/analytics`, `/api/v1/admin/events`)

## Architecture

- **Frontend**: React + Tailwind, routes for Dashboard, Workout, Diet, Chat, Admin.
- **Backend**: Flask REST API with modular model files.
- **Analytics**: In-memory event tracking for usage and model-quality snapshot.

## API Endpoints

### Core
- `GET /health`
- `POST /api/v1/chat`
- `POST /api/v1/diet/recommendation`
- `POST /api/v1/workout/analyze`
- `POST /api/v1/behavior/predict`

### Admin
- `GET /api/v1/admin/analytics`
- `GET /api/v1/admin/events?limit=20`

## Local Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Optional env var for frontend:
- `REACT_APP_API_BASE_URL=http://127.0.0.1:5000`

## Running Tests

```bash
cd backend
python -m unittest discover -s tests -p "test_*.py"
```

## Deployment

See [docs/deployment.md](docs/deployment.md) for deployment checklist and production notes.
