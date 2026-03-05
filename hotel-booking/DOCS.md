# Definitive Hotel Booking & Management SaaS Documentation

## Core Technical Specifications
- **Framework**: FastAPI (Async)
- **Database**: PostgreSQL 15 + PostGIS 3.3 (GeoAlchemy2)
- **Cache/Queue**: Redis 7.2 + Celery 5.6
- **UI**: React 18 (Vite) + React Native (Expo)
- **Styling**: TailwindCSS 3.4

## Key Components
1. **Dual Inventory**: Hardened engine in `inventory.py` handles Mode A/B concurrently with row-level locks.
2. **Payment Layer**: Dynamic provider registry with Stripe, Razorpay, PayPal, and Local Bank support.
3. **Geo-Discovery**: Mapbox integration across all platforms.
4. **Partner API**: OAuth2 client credentials and signed HMAC webhooks.

## Operational Guides
### How to add a new country
1. Use Admin UI or `/admin/countries/import-csv` to load country data.
2. Configure TaxRules via Admin dashboard.
3. Enable specific Payment Providers in the Registry.

### How to manage staff shifts
1. Go to Tenant Dashboard -> Staff Scheduling.
2. Create templates and assign users to dates.
3. System automatically notifies affected bookings on change.

## Performance
- 4000+ concurrent users tested via Locust and k6.
- Transactional integrity for all booking states.
