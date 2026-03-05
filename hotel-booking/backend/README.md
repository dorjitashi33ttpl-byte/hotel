# Hotel Booking SaaS - Backend

FastAPI application with PostgreSQL, PostGIS, Redis, and Celery.

## Setup
1. Copy `.env.example` to `.env`
2. Install dependencies: `pip install -r requirements.txt`
3. Run migrations: `alembic upgrade head`
4. Seed data: `python app/db/seed.py`
5. Start server: `uvicorn app.main:app --reload`

## Features
- Multi-tenant data isolation
- RBAC with 6 roles
- Payment Orchestration (Stripe, Razorpay, PayPal, Local Bank)
- Geo-spatial search via PostGIS
- Background jobs for cleanup and notifications
