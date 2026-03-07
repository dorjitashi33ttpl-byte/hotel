# Hotel Booking & Management SaaS (Production-Ready 2026)

A definitive, world-class multi-tenant platform architected for global scale, localized for the Bhutanese market.

## 🚀 World-Class Features
1.  **Dual Inventory Engine**: Simultaneous Room-Type & Fixed-Room model support with transactional locks.
2.  **Payment Orchestration**: Pluggable adapters (Stripe, Razorpay, PayPal) + Local Bank template engine.
3.  **Mapbox Integration**: Deep spatial search, route polyline previews, and radius-based discovery.
4.  **Multi-Country Localization**: Entirely data-driven tax rules, currencies, and regional administrative divisions.
5.  **Operational Excellence**: Shift scheduling, automated guest notifications, and security audit logging.
6.  **Partner Ecosystem**: OAuth2 Client Credentials API for OTAs with signed webhooks and rate limiting.
7.  **Modern Experience**: SSO, WebSocket chat, Digital Check-in (QR keys), and Verified Reviews.
8.  **Scalable Infrastructure**: FastAPI Async, PostGIS 3.3, Celery, and production-grade Docker orchestration.

## 🛠 Tech Stack
- **Backend**: FastAPI, PostgreSQL + PostGIS, Redis, Celery, SQLAlchemy 2.0.
- **Frontend**: React 18, Vite, Zustand, TailwindCSS, Mapbox GL.
- **Mobile**: React Native, Expo, Mapbox.

## 📦 Getting Started
1. `docker-compose up --build`
2. Access Backend: `http://localhost:8000/docs`
3. Access Frontend: `http://localhost:5173`

Refer to `DOCS.md` for technical deep-dives and deployment guides.
