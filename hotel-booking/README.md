# Hotel Booking & Management SaaS (Production-Ready)

A comprehensive, multi-tenant SaaS platform for Bhutanese and international hotel markets.

## Tech Stack
- **Backend**: FastAPI (Async), PostgreSQL + PostGIS, Redis, SQLAlchemy 2.0, Celery.
- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, Mapbox GL.
- **Mobile**: React Native, Expo, Mapbox.
- **Infrastructure**: Docker, k6, Locust.

## Directory Structure
- `backend/`: API, Workers, Models, Services.
- `frontend/`: Web dashboards and booking portal.
- `mobile/`: iOS/Android guest application.

## Quick Start
1. `docker-compose up --build`
2. Backend is at `http://localhost:8000`
3. Frontend is at `http://localhost:5173`

## Features Included
- Dual Inventory (Room-type vs Fixed-room).
- Multi-gateway Payment Orchestration.
- Mapbox routing and spatial search.
- Staff shift management and automated notifications.
- Partner API with OAuth2 and signed webhooks.
- Multi-country localization via Admin UI.

Refer to `DOCS.md` for detailed API and deployment guides.
