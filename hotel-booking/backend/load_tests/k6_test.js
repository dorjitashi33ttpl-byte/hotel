import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 },
    { duration: '3m', target: 100 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
  },
};

export default function () {
  const BASE_URL = 'http://localhost:8000/api/v1';
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // 1. Search Bhutan Hotels
  let res = http.get(`${BASE_URL}/public/hotels/search?lat=27.4728&lng=89.6339&radius_km=10&check_in=2024-06-01T12:00:00Z&check_out=2024-06-05T12:00:00Z`);
  check(res, { 'search status is 200': (r) => r.status === 200 });

  // 2. Hold Booking (Mode A)
  const holdPayload = JSON.stringify({
    hotel_id: 1,
    room_type_id: 1,
    check_in: '2024-06-01T12:00:00Z',
    check_out: '2024-06-05T12:00:00Z',
  });
  res = http.post(`${BASE_URL}/public/bookings/hold`, holdPayload, params);
  check(res, { 'hold status is 200 or 400': (r) => [200, 400].includes(r.status) });

  sleep(1);
}
