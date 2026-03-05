# Hotel Booking & Management SaaS

A multi-tenant SaaS platform for hotel bookings, management, and staff scheduling.

## Features
- Multi-tenant isolation
- Dual Inventory Model (Room-type vs Fixed Room)
- Payment Orchestration Layer (Stripe, Razorpay, Local Bank)
- Multi-country ready (Bhutan first)
- Mapbox integration for routes and distance
- Staff Shift Management
- Partner API for OTA integrations

## Structure
- `backend/`: FastAPI + PostgreSQL + PostGIS + Redis
- `frontend/`: React + TypeScript + Tailwind
- `mobile/`: React Native + Expo

## Getting Started
```bash
docker-compose up --build
```

## Deployment
See specific READMEs in each directory for cloud deployment guides.
