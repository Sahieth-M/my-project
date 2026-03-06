import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File as FileIcon, X, Music } from 'lucide-react';

interface AudioUploaderProps {
  onFileSelect: (file: File) => void;
}

export default function AudioUploader({ onFileSelect }: AudioUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = ['audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/m4a', 'audio/ogg', 'audio/flac'];
  const maxSizeMB = 10;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(wav|mp3|m4a|ogg|flac)$/i)) {
      return 'Invalid file type. Please upload WAV, MP3, M4A, OGG, or FLAC files.';
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File size exceeds ${maxSizeMB}MB limit.`;
    }

    return null;
  };

  const handleFile = (file: File) => {
    const error = validateFile(file);

    if (error) {
      alert(error);
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleClear = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setSelectedFile(null);
    setAudioUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUseFile = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <div className="w-full space-y-6">
      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div
            key="uploader"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative w-full p-12 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
              isDragging
                ? 'border-cyan-400 bg-cyan-500/10'
                : 'border-gray-700 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-900/70'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*,.wav,.mp3,.m4a,.ogg,.flac"
              onChange={handleFileInput}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center"
              >
                {isDragging ? (
                  <Music className="w-10 h-10 text-white" />
                ) : (
                  <Upload className="w-10 h-10 text-white" />
                )}
              </motion.div>

              <div className="text-center">
                <div className="text-xl font-bold text-white mb-2">
                  {isDragging ? 'Drop audio file here' : 'Upload Audio File'}
                </div>
                <div className="text-sm text-gray-400">
                  Drag and drop or click to browse
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Supported: WAV, MP3, M4A, OGG, FLAC (Max {maxSizeMB}MB)
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500 rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold truncate">
                    {selectedFile.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </div>
              <button
                onClick={handleClear}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {audioUrl && (
              <div className="mb-4">
                <audio src={audioUrl} controls className="w-full" />
              </div>
            )}

            <button
              onClick={handleUseFile}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg text-white font-semibold transition-all"
            >
              Analyze This File
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
