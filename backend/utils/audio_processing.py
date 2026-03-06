import librosa
import numpy as np
from pathlib import Path
import tempfile
from typing import Tuple
from core.logging import logger


def load_audio(file_path: str, sr: int = 16000) -> Tuple[np.ndarray, int]:
    try:
        audio, sample_rate = librosa.load(file_path, sr=sr, mono=True)
        return audio, sample_rate
    except Exception as e:
        logger.error(f"Error loading audio file: {e}")
        raise


def extract_mel_spectrogram(audio: np.ndarray, sr: int = 16000, n_mels: int = 128) -> np.ndarray:
    try:
        mel_spec = librosa.feature.melspectrogram(
            y=audio,
            sr=sr,
            n_mels=n_mels,
            n_fft=2048,
            hop_length=512
        )

        mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)

        return mel_spec_db
    except Exception as e:
        logger.error(f"Error extracting mel spectrogram: {e}")
        raise


def extract_lfcc(audio: np.ndarray, sr: int = 16000, n_lfcc: int = 20) -> np.ndarray:
    try:
        stft = np.abs(librosa.stft(audio, n_fft=2048, hop_length=512))

        linear_freq = librosa.fft_frequencies(sr=sr, n_fft=2048)

        lfcc = librosa.feature.mfcc(
            y=audio,
            sr=sr,
            n_mfcc=n_lfcc,
            n_fft=2048,
            hop_length=512
        )

        return lfcc
    except Exception as e:
        logger.error(f"Error extracting LFCC: {e}")
        raise


def extract_mfcc(audio: np.ndarray, sr: int = 16000, n_mfcc: int = 40) -> np.ndarray:
    try:
        mfcc = librosa.feature.mfcc(
            y=audio,
            sr=sr,
            n_mfcc=n_mfcc,
            n_fft=2048,
            hop_length=512
        )

        return mfcc
    except Exception as e:
        logger.error(f"Error extracting MFCC: {e}")
        raise


def get_audio_duration(file_path: str) -> float:
    try:
        duration = librosa.get_duration(path=file_path)
        return duration
    except Exception as e:
        logger.error(f"Error getting audio duration: {e}")
        return 0.0


def save_uploaded_file(file_content: bytes, filename: str) -> str:
    try:
        suffix = Path(filename).suffix

        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp_file:
            tmp_file.write(file_content)
            return tmp_file.name
    except Exception as e:
        logger.error(f"Error saving uploaded file: {e}")
        raise
