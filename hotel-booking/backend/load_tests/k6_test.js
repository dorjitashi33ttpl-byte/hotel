import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 },  // ramp up to 100 users
    { duration: '3m', target: 500 },  // stay at 500 users
    { duration: '1m', target: 4000 }, // stress test to 4k
    { duration: '2m', target: 0 },    // scale down
  ],
};

const BASE_URL = 'http://api.hotel.bt/v1';

export default function () {
  const responses = http.batch([
    ['GET', `${BASE_URL}/public/hotels`],
    ['GET', `${BASE_URL}/public/hotels/hotel-1/availability?start=2026-06-01&end=2026-06-05`],
  ]);

  check(responses[0], { 'search status was 200': (r) => r.status === 200 });
  check(responses[1], { 'avail status was 200': (r) => r.status === 200 });

  sleep(1);
}
