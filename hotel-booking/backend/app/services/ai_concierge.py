from typing import Optional

class AIConciergeService:
    @staticmethod
    def get_auto_response(message: str) -> Optional[str]:
        """
        Simple rule-based AI stub for instant guest responses.
        In production, this would call OpenAI or a fine-tuned LLM.
        """
        m = message.lower()
        if "check-out" in m or "checkout" in m:
            return "Standard check-out is at 12:00 PM. Would you like to request a late check-out?"
        if "breakfast" in m:
            return "Breakfast is served in the Lotus Pavilion from 7:00 AM to 10:30 AM."
        if "wifi" in m or "internet" in m:
            return "Complimentary high-speed fiber is available throughout the sanctuary. The password is 'bhutansanctuary2026'."
        if "bath" in m or "stone" in m:
            return "Our traditional Hot Stone Bath requires 2 hours of preparation. Shall I reserve a session for you this evening?"

        return None

ai_concierge = AIConciergeService()
