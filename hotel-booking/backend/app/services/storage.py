import os
import boto3
from botocore.exceptions import ClientError
from typing import Optional
from app.core.config import settings

class StorageService:
    def __init__(self):
        self.s3_client = None
        if hasattr(settings, 'AWS_ACCESS_KEY_ID') and settings.AWS_ACCESS_KEY_ID:
            self.s3_client = boto3.client(
                's3',
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                region_name=settings.AWS_REGION
            )
        self.bucket = getattr(settings, 'S3_BUCKET_NAME', 'hotel-masterpiece-assets')

    def get_file_url(self, filename: str) -> str:
        """
        Returns a public URL or a presigned URL.
        """
        if self.s3_client:
            return f"https://{self.bucket}.s3.{settings.AWS_REGION}.amazonaws.com/{filename}"
        return f"/media/{filename}"

    def upload_file(self, file_content: bytes, filename: str, content_type: str = "application/octet-stream") -> str:
        if self.s3_client:
            try:
                self.s3_client.put_object(
                    Bucket=self.bucket,
                    Key=filename,
                    Body=file_content,
                    ContentType=content_type
                )
                return filename
            except ClientError as e:
                print(f"S3 Upload Error: {e}")
                return f"error_{filename}"
        else:
            # Local Storage Simulation
            os.makedirs("media", exist_ok=True)
            with open(f"media/{filename}", "wb") as f:
                f.write(file_content)
            return filename

    def generate_presigned_url(self, filename: str, expires_in: int = 3600) -> Optional[str]:
        if not self.s3_client:
            return self.get_file_url(filename)
        try:
            url = self.s3_client.generate_presigned_url(
                'get_object',
                Params={'Bucket': self.bucket, 'Key': filename},
                ExpiresIn=expires_in
            )
            return url
        except ClientError:
            return None

storage_service = StorageService()
