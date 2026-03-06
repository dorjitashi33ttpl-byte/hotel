# Definitive Hotel Booking & Management SaaS Documentation

## World-Class Features Checklist
1. **Multi-tenant isolation**: Enforced via tenant_id scoping.
2. **Dual Inventory**: Mode A (Room-Type) & Mode B (Fixed Room) supported.
3. **Payment Orchestration**: Pluggable gateways + bank redirect template engine.
4. **Multi-country Localization**: Admin CSV tools & regional tax rules.
5. **Mapbox Experience**: Geocoding, spatial search (ST_DWithin), and route polyline preview.
6. **Background Automation**: Celery workers for cleanup & notifications.
7. **Partner Ecosystem**: OAuth2 API + HMAC-signed webhooks.
8. **Real-time Operations**: WebSocket chat & staff shift scheduling.
9. **Guest Experience**: SSO, digital check-in (QR), verified reviews.
10. **Fraud Risk Check**: Rule-based detection service.
11. **Pricing Insights**: Real-time RevPAR & occupancy trends.
12. **Infrastructure**: Hardened Docker, healthchecks, PostGIS spatial indexing.
13. **Observability**: Structured JSON logging & Prometheus metrics.

## Setup & Deployment
Refer to service-specific READMEs in backend/, frontend/, and mobile/ directories.
