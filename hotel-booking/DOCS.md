# Hotel Booking & Management SaaS Documentation

## 1. OpenAPI Specification
Access the full OpenAPI spec at `/api/v1/openapi.json` when running the backend.

## 2. Webhook Verification
All webhooks sent from the platform (to partners or for payment status) include an `X-Webhook-Signature` header.
Verification (Node.js example):
```javascript
const hmac = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET);
const expected = hmac.update(JSON.stringify(payload)).digest('hex');
if (signature === expected) { /* valid */ }
```

## 3. Local Bank Callback Templates
Configure these in the Platform Admin UI:
- **Success Redirect**: `https://yourapp.com/bookings/{{booking_id}}/success`
- **Callback Signature**: HMAC-SHA256 using the configured `signature_key`.

## 4. Deployment Guides
### Backend (FastAPI)
1. Build Docker image: `docker build -t hotel-backend ./backend`
2. Run on Render/AWS: Configure environment variables as per `.env.example`.
3. Set up PostGIS and Redis managed services.

### Frontend (React)
1. Build: `npm run build`
2. Deploy `dist/` folder to Vercel, Netlify, or S3+CloudFront.

### Mobile (React Native)
1. Build with EAS: `eas build --platform ios/android`
2. Deploy to Apple App Store / Google Play Store.

## 5. Mapbox Configuration
Ensure Mapbox keys are restricted to your domains in the Mapbox Dashboard.
Configure keys via the Admin UI in this platform.
