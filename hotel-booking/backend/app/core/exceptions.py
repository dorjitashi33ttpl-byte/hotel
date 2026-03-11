from fastapi import HTTPException, status
from typing import Any, Dict, Optional

class BaseAppException(HTTPException):
    code: str = "INTERNAL_ERROR"
    message: str = "An unexpected error occurred"
    status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR

    def __init__(self, message: Optional[str] = None, detail: Optional[Any] = None):
        super().__init__(
            status_code=self.status_code,
            detail={
                "code": self.code,
                "message": message or self.message,
                "detail": detail
            }
        )

class DoubleBookingException(BaseAppException):
    code = "DOUBLE_BOOKING"
    message = "The selected room or room type is no longer available for these dates."
    status_code = status.HTTP_409_CONFLICT

class InsufficientPermissionsException(BaseAppException):
    code = "INSUFFICIENT_PERMISSIONS"
    message = "You do not have permission to perform this action."
    status_code = status.HTTP_403_FORBIDDEN

class TenantLimitExceededException(BaseAppException):
    code = "TENANT_LIMIT_EXCEEDED"
    message = "Your current plan limit has been reached."
    status_code = status.HTTP_403_FORBIDDEN
