const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface PredictionResponse {
  prediction: string;
  confidence: number;
  audio_duration: number;
  file_size: number;
  filename: string;
}

export interface PredictionHistory {
  id: string;
  audio_filename: string;
  prediction: string;
  confidence: number;
  audio_duration: number;
  file_size: number;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface PredictionStats {
  total_predictions: number;
  genuine_count: number;
  fake_count: number;
  average_confidence: number;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async predictVoice(audioFile: File): Promise<PredictionResponse> {
    const formData = new FormData();
    formData.append('file', audioFile);

    const response = await fetch(`${this.baseUrl}/api/predict`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to analyze audio');
    }

    return response.json();
  }

  async getPredictionHistory(limit: number = 10): Promise<PredictionHistory[]> {
    const response = await fetch(
      `${this.baseUrl}/api/predictions/history?limit=${limit}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch prediction history');
    }

    return response.json();
  }

  async getPredictionStats(): Promise<PredictionStats> {
    const response = await fetch(`${this.baseUrl}/api/predictions/stats`);

    if (!response.ok) {
      throw new Error('Failed to fetch prediction stats');
    }

    return response.json();
  }

  async healthCheck() {
    const response = await fetch(`${this.baseUrl}/api/health`);

    if (!response.ok) {
      throw new Error('API health check failed');
    }

    return response.json();
  }
}

export const apiService = new ApiService();
