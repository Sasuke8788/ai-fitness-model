# AI Gym & Fitness Assistant

A full-stack fitness platform that combines workout analysis, diet planning, conversational coaching, and admin analytics in one application.

## Project Summary

This project was built as an AI-powered gym assistant with a modular backend and a React-based frontend. The system supports:

- Workout form analysis from joint-angle input
- Personalized diet recommendations (BMI, calories, macros)
- Behavior/adherence prediction
- AI coaching chat endpoint
- Admin analytics for usage and model output visibility

## Tech Stack

- Frontend: React, React Router, Tailwind CSS
- Backend: Flask, Flask-CORS
- AI/ML modules: custom Python model services in separate modules
- Testing: Python unittest

## Core Modules

- Workout analysis: `backend/workout_model.py`
- Diet recommendation: `backend/diet.py`
- Behavior prediction: `backend/behavior.py`
- Chat service: `backend/chatbot.py`
- Analytics store: `backend/analytics.py`

## API Overview

### System

- `GET /`
- `GET /health`

### User-facing

- `POST /api/v1/chat`
- `POST /api/v1/diet/recommendation`
- `POST /api/v1/workout/analyze`
- `POST /api/v1/behavior/predict`

### Admin

- `GET /api/v1/admin/analytics`
- `GET /api/v1/admin/events?limit=20`

## Local Development Setup

### 1) Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs on http://127.0.0.1:5000 by default.

### 2) Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on http://localhost:3000 by default.

Optional frontend environment variable:

- `REACT_APP_API_BASE_URL=http://127.0.0.1:5000`

## Running Tests

```bash
cd backend
python -m unittest discover -s tests -p "test_*.py"
```

Test file:

- `backend/tests/test_backend.py`

## Project Structure

- `backend/` Flask API and model modules
- `frontend/` React user interface
- `docs/` deployment and testing documentation

## Documentation

- Deployment guide: [docs/deployment.md](docs/deployment.md)
- Testing report: [docs/testing-report.md](docs/testing-report.md)

## Notes

- Sensitive files (such as `.env`) are excluded from version control.
- The admin dashboard is available at the `/admin` route in the frontend app.
