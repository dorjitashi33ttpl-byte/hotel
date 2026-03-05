from locust import HttpUser, task, between
import random

class BookingUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def search_hotels(self):
        self.client.get("/api/v1/public/hotels/search?lat=27.4728&lng=89.6339&radius_km=10&check_in=2024-06-01T12:00:00Z&check_out=2024-06-05T12:00:00Z")

    @task
    def autocomplete(self):
        self.client.get("/api/v1/public/geo/autocomplete?q=Thimphu&country=BT")
