import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    guest_search: {
      executor: 'constant-vus',
      vus: 50,
      duration: '5m',
    },
    booking_flow: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 200 },
        { duration: '5m', target: 200 },
        { duration: '2m', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<500'],
    'http_req_failed{status:429}': ['count<100'], // Allow some rate limiting but not excessive
  },
};

const BASE_URL = 'http://api.hotel.bt/v1';

export default function () {
  // 1. Guest Search & Filter
  const searchRes = http.get(`${BASE_URL}/public/hotels?lat=27.47&lng=89.63&radius_km=20`);
  check(searchRes, { 'search ok': (r) => r.status === 200 });

  const hotelId = 'hotel-123';

  // 2. Check Availability
  const availRes = http.get(`${BASE_URL}/public/hotels/${hotelId}/availability?start=2026-06-01&end=2026-06-05`);
  check(availRes, { 'avail ok': (r) => r.status === 200 });

  sleep(1);

  // 3. Create Hold
  const holdRes = http.post(`${BASE_URL}/public/hotels/${hotelId}/holds`, JSON.stringify({
    room_type_id: 'rt-456',
    start_date: '2026-06-01',
    end_date: '2026-06-05'
  }), { headers: { 'Content-Type': 'application/json' } });
  check(holdRes, { 'hold created': (r) => r.status === 201 });

  const holdId = holdRes.json().id;

  // 4. Confirm Booking (Simplified)
  if (holdId) {
    const confirmRes = http.post(`${BASE_URL}/public/bookings/${holdId}/confirm`);
    check(confirmRes, { 'confirmed ok': (r) => r.status === 200 });
  }

  sleep(2);
}
