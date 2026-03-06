import { motion } from 'framer-motion';
import { Mic, Square, Play, Pause, Trash2 } from 'lucide-react';
import { useAudioRecorder } from '../hooks/useAudioRecorder';

interface AudioRecorderProps {
  onRecordingComplete: (audioBlob: Blob, filename: string) => void;
}

export default function AudioRecorder({ onRecordingComplete }: AudioRecorderProps) {
  const {
    isRecording,
    isPaused,
    recordingTime,
    audioBlob,
    audioUrl,
    error,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    clearRecording,
  } = useAudioRecorder();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStopAndUse = () => {
    stopRecording();
  };

  const handleUseRecording = () => {
    if (audioBlob) {
      const filename = `recording-${Date.now()}.webm`;
      onRecordingComplete(audioBlob, filename);
    }
  };

  return (
    <div className="w-full space-y-6">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      {!isRecording && !audioBlob && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={startRecording}
          className="w-full p-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl flex flex-col items-center gap-4 hover:from-red-500 hover:to-pink-500 transition-all"
        >
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <Mic className="w-10 h-10 text-white" />
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-white">Start Recording</div>
            <div className="text-sm text-white/80">Click to begin voice recording</div>
          </div>
        </motion.button>
      )}

      {isRecording && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 backdrop-blur-xl border border-red-500 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-4 h-4 bg-red-500 rounded-full"
              />
              <span className="text-white font-semibold">
                {isPaused ? 'Paused' : 'Recording'}
              </span>
            </div>
            <div className="text-2xl font-mono text-cyan-400">
              {formatTime(recordingTime)}
            </div>
          </div>

          <div className="flex items-center justify-center h-24 mb-6">
            <div className="flex items-end gap-1 h-full">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-red-500 to-pink-500 rounded-t min-w-[2px]"
                  animate={
                    !isPaused
                      ? {
                          height: [
                            `${Math.random() * 60 + 20}%`,
                            `${Math.random() * 80 + 10}%`,
                            `${Math.random() * 60 + 20}%`,
                          ],
                        }
                      : { height: '20%' }
                  }
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.02,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            {!isPaused ? (
              <button
                onClick={pauseRecording}
                className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-lg flex items-center justify-center gap-2 text-white font-semibold transition-colors"
              >
                <Pause className="w-5 h-5" />
                Pause
              </button>
            ) : (
              <button
                onClick={resumeRecording}
                className="flex-1 py-3 bg-green-600 hover:bg-green-500 rounded-lg flex items-center justify-center gap-2 text-white font-semibold transition-colors"
              >
                <Play className="w-5 h-5" />
                Resume
              </button>
            )}
            <button
              onClick={handleStopAndUse}
              className="flex-1 py-3 bg-red-600 hover:bg-red-500 rounded-lg flex items-center justify-center gap-2 text-white font-semibold transition-colors"
            >
              <Square className="w-5 h-5" />
              Stop
            </button>
          </div>
        </motion.div>
      )}

      {audioBlob && audioUrl && !isRecording && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500 rounded-xl p-6"
        >
          <div className="mb-4">
            <div className="text-white font-semibold mb-3">Recording Complete</div>
            <audio src={audioUrl} controls className="w-full" />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleUseRecording}
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg text-white font-semibold transition-all"
            >
              Analyze This Recording
            </button>
            <button
              onClick={clearRecording}
              className="py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-white transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
