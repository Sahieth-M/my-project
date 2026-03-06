import torch
import torch.nn as nn
import numpy as np
from pathlib import Path
from typing import Optional
from core.logging import logger


class SimpleVoiceDetector(nn.Module):
    def __init__(self, input_size: int = 128, hidden_size: int = 256):
        super(SimpleVoiceDetector, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers=2, batch_first=True, dropout=0.3)
        self.fc1 = nn.Linear(hidden_size, 128)
        self.dropout = nn.Dropout(0.3)
        self.fc2 = nn.Linear(128, 2)
        self.relu = nn.ReLU()

    def forward(self, x):
        lstm_out, _ = self.lstm(x)
        last_output = lstm_out[:, -1, :]
        x = self.relu(self.fc1(last_output))
        x = self.dropout(x)
        x = self.fc2(x)
        return x


class ModelLoader:
    _instance: Optional['ModelLoader'] = None
    _model: Optional[nn.Module] = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelLoader, cls).__new__(cls)
        return cls._instance

    def load_model(self, model_path: str) -> nn.Module:
        if self._model is not None:
            logger.info("Model already loaded, returning cached instance")
            return self._model

        try:
            device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
            logger.info(f"Using device: {device}")

            if Path(model_path).exists():
                logger.info(f"Loading model from {model_path}")
                self._model = torch.load(model_path, map_location=device)
            else:
                logger.warning(f"Model file not found at {model_path}, creating dummy model for demo")
                self._model = SimpleVoiceDetector()

            self._model.to(device)
            self._model.eval()

            logger.info("Model loaded successfully")
            return self._model

        except Exception as e:
            logger.error(f"Error loading model: {e}")
            logger.info("Creating fallback model")
            self._model = SimpleVoiceDetector()
            self._model.eval()
            return self._model

    def get_model(self) -> nn.Module:
        if self._model is None:
            raise RuntimeError("Model not loaded. Call load_model() first.")
        return self._model

    @property
    def device(self) -> torch.device:
        return torch.device("cuda" if torch.cuda.is_available() else "cpu")


model_loader = ModelLoader()
