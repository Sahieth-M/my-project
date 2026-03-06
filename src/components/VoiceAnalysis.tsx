import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Upload, ArrowLeft, Loader2, AlertTriangle, CheckCircle2, Activity } from 'lucide-react';
import AudioRecorder from './AudioRecorder';
import AudioUploader from './AudioUploader';
import { apiService, PredictionResponse } from '../services/api';

type AnalysisStage = 'idle' | 'selecting' | 'recording' | 'uploading' | 'analyzing' | 'complete';

export default function VoiceAnalysis() {
  const [stage, setStage] = useState<AnalysisStage>('idle');
  const [inputMethod, setInputMethod] = useState<'record' | 'upload' | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleStart = () => {
    setStage('selecting');
    setResult(null);
    setError(null);
  };

  const handleSelectMethod = (method: 'record' | 'upload') => {
    setInputMethod(method);
    setStage(method === 'record' ? 'recording' : 'uploading');
  };

  const handleBack = () => {
    setStage('selecting');
    setInputMethod(null);
    setAudioFile(null);
  };

  const handleRecordingComplete = (audioBlob: Blob, filename: string) => {
    const file = new File([audioBlob], filename, { type: 'audio/webm' });
    setAudioFile(file);
    handleAnalyze(file);
  };

  const handleFileSelect = (file: File) => {
    setAudioFile(file);
    handleAnalyze(file);
  };

  const handleAnalyze = async (file: File) => {
    setAnalyzing(true);
    setStage('analyzing');
    setError(null);

    try {
      const response = await apiService.predictVoice(file);
      setResult(response);
      setStage('complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze audio');
      setStage('idle');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setStage('idle');
    setInputMethod(null);
    setResult(null);
    setError(null);
    setAudioFile(null);
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2);
  };

  return (
    <section id="demo" className="py-24 bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Live Voice Analysis
          </h2>
          <p className="text-gray-400 text-lg">Test our AI-powered deepfake detection system</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {stage === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-950/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-12"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStart}
                className="w-full py-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-bold text-xl hover:from-blue-500 hover:to-cyan-500 transition-all"
              >
                Start Voice Analysis
              </motion.button>
            </motion.div>
          )}

          {stage === 'selecting' && (
            <motion.div
              key="selecting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-950/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <h3 className="text-xl font-bold text-white">Choose Input Method</h3>
                <div className="w-16" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.button
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectMethod('record')}
                  className="p-8 bg-gradient-to-br from-red-600/20 to-pink-600/20 border-2 border-red-500/50 rounded-xl hover:border-red-400 transition-all group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-600 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-xl font-bold text-white mb-2">Record Voice</div>
                  <div className="text-sm text-gray-400">Use your microphone to record audio</div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectMethod('upload')}
                  className="p-8 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-2 border-blue-500/50 rounded-xl hover:border-blue-400 transition-all group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-xl font-bold text-white mb-2">Upload File</div>
                  <div className="text-sm text-gray-400">Choose an audio file from your device</div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {stage === 'recording' && (
            <motion.div
              key="recording"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-950/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <h3 className="text-xl font-bold text-white">Record Your Voice</h3>
                <div className="w-16" />
              </div>

              <AudioRecorder onRecordingComplete={handleRecordingComplete} />
            </motion.div>
          )}

          {stage === 'uploading' && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-950/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <h3 className="text-xl font-bold text-white">Upload Audio File</h3>
                <div className="w-16" />
              </div>

              <AudioUploader onFileSelect={handleFileSelect} />
            </motion.div>
          )}

          {stage === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-950/50 backdrop-blur-xl border border-cyan-500 rounded-2xl p-12"
            >
              <div className="flex flex-col items-center gap-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full"
                />
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">Analyzing Voice...</div>
                  <div className="text-gray-400">Our AI is processing your audio sample</div>
                </div>

                <div className="w-full max-w-md">
                  <div className="flex items-center justify-center h-32">
                    <div className="flex items-end gap-1 h-full">
                      {[...Array(30)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t min-w-[3px]"
                          animate={{
                            height: [
                              `${Math.random() * 60 + 20}%`,
                              `${Math.random() * 80 + 10}%`,
                              `${Math.random() * 60 + 20}%`,
                            ],
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: i * 0.02,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {stage === 'complete' && result && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`bg-gradient-to-br ${
                  result.prediction === 'Genuine Voice'
                    ? 'from-green-600/20 to-emerald-600/20 border-green-500'
                    : 'from-red-600/20 to-orange-600/20 border-red-500'
                } border-2 rounded-2xl p-8`}
              >
                <div className="flex items-start gap-4 mb-6">
                  {result.prediction === 'Genuine Voice' ? (
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className={`text-3xl font-bold mb-2 ${
                      result.prediction === 'Genuine Voice' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {result.prediction}
                    </div>
                    <div className="text-gray-300">
                      {result.prediction === 'Genuine Voice'
                        ? 'This voice sample appears to be authentic'
                        : 'This voice sample shows signs of manipulation or synthesis'}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Confidence Score</span>
                      <span className="font-semibold text-white">{(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-3 bg-gray-900 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full ${
                          result.prediction === 'Genuine Voice' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Duration</div>
                      <div className="text-white font-semibold">{result.audio_duration.toFixed(1)}s</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">File Size</div>
                      <div className="text-white font-semibold">{formatFileSize(result.file_size)} MB</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <button
                onClick={handleReset}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl text-white font-semibold transition-all"
              >
                Analyze Another Sample
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
