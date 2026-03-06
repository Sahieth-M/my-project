from fastapi import HTTPException, UploadFile
from pathlib import Path
import re


ALLOWED_EXTENSIONS = {".wav", ".mp3", ".m4a", ".ogg", ".flac"}
MAX_FILE_SIZE = 10 * 1024 * 1024


def validate_audio_file(file: UploadFile, max_size_mb: int = 10) -> None:
    if not file.filename:
        raise HTTPException(status_code=400, detail="Filename is required")

    file_ext = Path(file.filename).suffix.lower()

    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
        )

    if file.size and file.size > max_size_mb * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail=f"File too large. Maximum size: {max_size_mb}MB"
        )


def sanitize_filename(filename: str) -> str:
    filename = Path(filename).name

    filename = re.sub(r'[^\w\s\-\.]', '', filename)

    filename = filename[:255]

    return filename
