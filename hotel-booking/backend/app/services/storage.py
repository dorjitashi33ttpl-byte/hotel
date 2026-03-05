import os
import boto3
from typing import Optional
from app.core.config import settings

class StorageService:
    def __init__(self, mode: str = "local"):
        self.mode = mode
        if mode == "s3":
            self.s3 = boto3.client("s3")
        else:
            self.local_dir = "/app/media"
            os.makedirs(self.local_dir, exist_ok=True)

    async def upload_file(self, file_content: bytes, filename: str, bucket: Optional[str] = None) -> str:
        if self.mode == "s3":
            # Logic for S3 upload
            # self.s3.put_object(Bucket=bucket, Key=filename, Body=file_content)
            return f"https://{bucket}.s3.amazonaws.com/{filename}"
        else:
            # Local filesystem logic
            file_path = os.path.join(self.local_dir, filename)
            with open(file_path, "wb") as f:
                f.write(file_content)
            return f"/media/{filename}"

    def get_signed_url(self, filename: str, bucket: Optional[str] = None) -> str:
        if self.mode == "s3":
            return self.s3.generate_presigned_url('get_object', Params={'Bucket': bucket, 'Key': filename}, ExpiresIn=3600)
        return f"/media/{filename}"

storage_service = StorageService(mode="local")
