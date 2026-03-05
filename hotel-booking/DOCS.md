# Definitive Hotel Booking & Management SaaS Documentation

## Local Bank Integration (Template Engine)
Admin UI allows configuring custom redirect URLs using Jinja2 syntax:
- **Template**: `https://bank.bt/pay?booking_id={{booking_id}}&amount={{amount}}&callback={{callback_url}}`
- **Signature**: HMAC-SHA256 of the payload.
- **Status Mapping**: Dynamic mapping of provider response codes to internal `success` or `failed`.

## Partner Webhook Security
Partners must verify the `X-Webhook-Signature` header.
```javascript
const hmac = crypto.createHmac('sha256', partner_secret);
const digest = hmac.update(raw_body).digest('hex');
if (signature === digest) { /* valid */ }
```

## Deployment & Scalability
- **Production Stack**: Docker Swarm or Kubernetes.
- **Spatial Queries**: Managed PostGIS required for `ST_DWithin` search performance.
- **Concurrent Users**: Optimized with async FastAPI and Redis-backed session management to handle 4000+ concurrent requests.

## Role Permissions (RBAC)
- **platform_admin**: Full access to global settings and provider registry.
- **support_agent**: Onboarding and dispute management.
- **hotel_owner_admin**: Tenant configuration and financial reports.
- **hotel_manager**: Property-level operations and shift management.
- **hotel_staff**: Check-ins, walk-ins, and guest communication.
- **customer**: Booking and verified reviews.
