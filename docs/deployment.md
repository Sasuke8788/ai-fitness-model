# Deployment Guide

## Production Components

- Frontend: Static React build (`frontend/build`)
- Backend: Flask API service (`backend/app.py`)
- Reverse proxy: Nginx / Azure App Gateway / similar
- Environment variables:
  - `GEMINI_API_KEY` (optional for generative chat)
  - `REACT_APP_API_BASE_URL` (frontend build-time variable)

## Backend Deployment (Example)

1. Install dependencies:
   - `pip install -r backend/requirements.txt`
2. Run with production WSGI server:
   - `gunicorn -w 2 -b 0.0.0.0:5000 app:app`
3. Add CORS/domain restrictions for production.

## Frontend Deployment (Example)

1. Build frontend:
   - `npm --prefix frontend run build`
2. Serve `frontend/build` through static hosting (Vercel/Netlify/Nginx).
3. Configure API base URL to deployed backend.

## Admin Dashboard and Analytics

- Route: `/admin`
- Data source:
  - `GET /api/v1/admin/analytics`
  - `GET /api/v1/admin/events`

## Deployment Checklist

- [ ] Backend health check passes: `/health`
- [ ] Chat endpoint tested with/without Gemini API key
- [ ] Diet, workout, behavior endpoints return valid JSON
- [ ] Admin analytics page loads and refresh works
- [ ] HTTPS enabled and CORS restricted
- [ ] Logging/monitoring configured
