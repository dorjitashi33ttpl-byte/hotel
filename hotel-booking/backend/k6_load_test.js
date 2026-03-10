import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '30s',
};

const BASE_URL = 'http://localhost:8000/api/v1';

export default function () {
  // 1. Search availability
  let res = http.get(`${BASE_URL}/public/hotels/search?lat=27.4728\&lng=89.6339\&radius_km=10`);
  check(res, { 'search status is 200': (r) => r.status === 200 });

  // 2. View hotel details
  res = http.get(`${BASE_URL}/public/hotels/1`);
  check(res, { 'detail status is 200': (r) => r.status === 200 });

  // 3. Create a booking hold (High concurrency scenario)
  const payload = JSON.stringify({
    room_type_id: 1,
    start_date: '2026-06-01',
    end_date: '2026-06-05'
  });
  const params = { headers: { 'Content-Type': 'application/json' } };
  res = http.post(`${BASE_URL}/bookings/holds`, payload, params);
  check(res, { 'hold status is 201 or 409': (r) => r.status === 201 || r.status === 409 });

  sleep(1);
}
