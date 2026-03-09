# Definitive Hotel Booking & Management SaaS Documentation

## "Masterpiece Edition" Design System
Inspired by high-fidelity boutique hotel templates (Wix wh-1038), the design system prioritizes immersion and storytelling.
- **Palette**: Stone (#FCFAF7), Gold (#B4975A), Charcoal (#1A1A1A).
- **Typography**: Playfair Display (Serif) for narrative elements, Plus Jakarta Sans (Sans) for operational clarity.
- **Interactions**: Framer Motion scroll-driven parallax, ultra-large serif titles, and smooth route transitions.

## World-Class Features Checklist
1. **Multi-tenant isolation**: Enforced via tenant_id scoping on all 50+ tables.
2. **Dual Inventory**: Mode A (Room-Type) & Mode B (Fixed Room) supported with row-level locking.
3. **Payment Orchestration**: Pluggable adapters (Stripe, Razorpay, PayPal) + Local Bank Template Engine.
4. **Multi-country Localization**: Admin UI tools for Countries, States, and dynamic Tax Rules.
5. **Mapbox Experience**: Reverse geocoding, spatial radius search (PostGIS), and Directions API polyline preview.
6. **Background Automation**: Celery workers for hold cleanup, email notifications, and webhook retries.
7. **Partner Ecosystem**: OAuth2 Client Credentials API + HMAC-SHA256 signed webhooks for OTAs.
8. **Staff Operations**: Shift management templates, housekeeping dashboard (DIRTY/READY), and Walk-in Booking form.
9. **Guest Experience**: Digital Check-in with QR key generation, Verified Reviews, and In-app Concierge Chat.
10. **Yield Management**: Occupancy-based dynamic pricing rules and Length-of-Stay (LOS) discounts.
11. **Fraud Detection**: IP-based risk scoring and frequency limiting for booking holds.
12. **Infrastructure**: Production-hardened Docker, Redis caching for inventory, and PostGIS GIST indexing.
13. **Analytics**: Revenue insights dashboard featuring RevPAR, ADR, and Occupancy forecasting.

## Multi-Channel Inventory Allocation
Hotels can define `ChannelConfig` settings to reserve inventory percentages for Partner APIs. All reservations use `SELECT ... FOR UPDATE` to prevent overbooking during high-concurrency periods.

## Local Bank Integration (Template Engine)
Admin UI allows configuring redirect URLs with dynamic placeholders:
- `{{booking_id}}`, `{{amount}}`, `{{callback_url}}`
- Signature Method: HMAC-SHA256 (Secret managed in registry)
- Parameter Mapping: Map bank response fields to system statuses (e.g., "TX_SUCCESS" -> "PAID").

## Self-Checkout & Housekeeping
Guests can initiate "Self-Checkout" from the mobile app.
1. Status transitions from `checked_in` to `checked_out`.
2. Room status automatically set to `DIRTY`.
3. Housekeeping dashboard updated in real-time for staff assignment.
