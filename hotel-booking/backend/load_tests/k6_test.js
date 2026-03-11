import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 },  // ramp up
    { duration: '3m', target: 500 }, // stay at 500 users
    { duration: '1m', target: 0 },   // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must be under 500ms
  },
};

const BASE_URL = 'http://localhost:8000/api/v1';

export default function () {
  // 1. Search Hotels
  const searchRes = http.get(`${BASE_URL}/public/hotels`);
  check(searchRes, { 'status is 200': (r) => r.status === 200 });

  sleep(1);

  // 2. Check Availability
  const availRes = http.get(`${BASE_URL}/public/hotels/hotel-1/availability?start=2026-06-01&end=2026-06-05`);
  check(availRes, { 'status is 200': (r) => r.status === 200 });

  sleep(2);

  // 3. Health Check
  const healthRes = http.get(`${BASE_URL}/health`);
  check(healthRes, { 'status is 200': (r) => r.status === 200 });
}
