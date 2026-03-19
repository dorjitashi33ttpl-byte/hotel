from locust import HttpUser, task, between

class HotelSaaSUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def search_hotels(self):
        self.client.get("/api/v1/public/hotels")

    @task
    def get_hotel_details(self):
        self.client.get("/api/v1/public/hotels/hotel-1")

    @task
    def check_availability(self):
        self.client.get("/api/v1/public/hotels/hotel-1/availability?start=2026-06-01&end=2026-06-05")
