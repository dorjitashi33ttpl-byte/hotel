# 🏰 Hotel Masterpiece SaaS - Backend

A world-class, production-ready Hotel Management & Booking engine built with **FastAPI**, **PostgreSQL/PostGIS**, **Redis**, and **Celery**.

## 🚀 Architectural Pillars
- **Multi-Tenant Scoping**: Strict isolation using `tenant_id` on all 50+ models.
- **Dual Inventory Engine**: Simultaneous support for Mode A (Quantity) and Mode B (Fixed Rooms).
- **Payment Orchestration**: Unified adapter layer for Stripe, Razorpay, and custom Local Bank templates.
- **Geo-Intelligence**: PostGIS-powered proximity search and Mapbox route orchestration.
- **Security**: Rate limiting, XSS/CSP headers, and AES-256 encrypted credential storage.

## 🛠 Tech Stack
- **API**: FastAPI (Async)
- **Database**: PostgreSQL with PostGIS
- **Cache/Queue**: Redis & Celery
- **Auth**: JWT with enterprise RBAC (6 roles)
- **Monitoring**: Prometheus + Health Checks + Structured JSON Logs

## 📖 API Ecosystem
### Public (Guest)
- `GET /public/hotels`: Advanced search with geo-proximity & RADIUS.
- `GET /public/hotels/{id}/route`: Mapbox route preview with duration & polyline.
- `POST /public/hotels/{id}/save`: Wishlist management.
- `POST /public/bookings/{id}/review`: Verified review submission.

### Tenant (Hotel Manager)
- `GET /tenant/room-rack`: Visual grid of room statuses (READY/DIRTY/OCCUPIED).
- `POST /tenant/shifts/generate`: Automated staff rotation based on templates.
- `GET /tenant/metrics`: RevPAR, ADR, and Occupancy forecasting.

### Partner (External Apps)
- `GET /partner/availability`: Quota-limited inventory lookup.
- `POST /partner/holds`: Atomic inventory locking for 15 minutes.

### Admin (Platform Owner)
- `POST /admin/geo/countries`: No-code international expansion.
- `POST /admin/payments/providers`: Gateway registry and bank templating.
- `GET /admin/audit-logs`: Immutable trail of system changes.

## 📦 Deployment
```bash
docker-compose up --build
```
