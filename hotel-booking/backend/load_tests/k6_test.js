import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 }, # Ramp up to 50 users
    { duration: '1m', target: 50 },  # Stay at 50 users
    { duration: '10s', target: 0 },  # Ramp down
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:8000/api/v1';

  // 1. Search Hotels
  let res = http.get(`${BASE_URL}/public/hotels/search?lat=27.4728&lng=89.6339&radius_km=10&check_in=2024-06-01T12:00:00Z&check_out=2024-06-05T12:00:00Z`);
  check(res, { 'status is 200': (r) => r.status === 200 });

  // 2. Geo Autocomplete
  res = http.get(`${BASE_URL}/public/geo/autocomplete?q=Thimphu&country=BT`);
  check(res, { 'status is 200': (r) => r.status === 200 });

  sleep(1);
}
