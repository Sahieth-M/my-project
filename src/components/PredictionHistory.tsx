import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { History, CheckCircle2, AlertTriangle, Clock, FileAudio } from 'lucide-react';
import { apiService, PredictionHistory as PredictionHistoryType } from '../services/api';

export default function PredictionHistory() {
  const [predictions, setPredictions] = useState<PredictionHistoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await apiService.getPredictionHistory(10);
      setPredictions(data);
    } catch (err) {
      setError('Failed to load prediction history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2);
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full"
            />
          </div>
        </div>
      </section>
    );
  }

  if (error || predictions.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <History className="w-8 h-8 text-cyan-400" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Recent Analyses
            </h2>
          </div>
          <p className="text-gray-400 text-lg">Latest voice deepfake detection results</p>
        </motion.div>

        <div className="grid gap-4">
          {predictions.map((prediction, index) => (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    prediction.prediction === 'Genuine Voice'
                      ? 'bg-green-500/20'
                      : 'bg-red-500/20'
                  }`}>
                    {prediction.prediction === 'Genuine Voice' ? (
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <FileAudio className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <div className="text-white font-semibold truncate">
                        {prediction.audio_filename}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(prediction.created_at)}
                      </div>
                      <div>{prediction.audio_duration.toFixed(1)}s</div>
                      <div>{formatFileSize(prediction.file_size)} MB</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      prediction.prediction === 'Genuine Voice'
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}>
                      {prediction.prediction}
                    </div>
                    <div className="text-sm text-gray-400">
                      {(prediction.confidence * 100).toFixed(1)}% confidence
                    </div>
                  </div>

                  <div className="w-24">
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          prediction.prediction === 'Genuine Voice'
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${prediction.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
