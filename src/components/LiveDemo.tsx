import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, AlertTriangle, CheckCircle2, Activity } from 'lucide-react';

type AnalysisStage = 'preprocessing' | 'mfcc' | 'embedding' | 'scoring' | 'complete';
type VoiceType = 'genuine' | 'spliced' | null;

export default function LiveDemo() {
  const [analyzing, setAnalyzing] = useState(false);
  const [currentStage, setCurrentStage] = useState<AnalysisStage>('preprocessing');
  const [result, setResult] = useState<VoiceType>(null);
  const [confidence, setConfidence] = useState(0);

  const stages = [
    { id: 'preprocessing', label: 'Preprocessing' },
    { id: 'mfcc', label: 'MFCC Extraction' },
    { id: 'embedding', label: 'Embedding Analysis' },
    { id: 'scoring', label: 'Anomaly Scoring' },
  ];

  const anomalyData = result === 'spliced'
    ? [85, 20, 90, 15, 88, 92, 18, 85]
    : [12, 8, 15, 10, 13, 11, 9, 14];

  const handleAnalyze = (type: VoiceType) => {
    setAnalyzing(true);
    setResult(null);
    setConfidence(0);

    const stageSequence: AnalysisStage[] = ['preprocessing', 'mfcc', 'embedding', 'scoring', 'complete'];
    let stageIndex = 0;

    const interval = setInterval(() => {
      if (stageIndex < stageSequence.length) {
        setCurrentStage(stageSequence[stageIndex]);
        stageIndex++;
      } else {
        clearInterval(interval);
        setAnalyzing(false);
        setResult(type);
        setConfidence(type === 'genuine' ? 96.3 : 94.7);
      }
    }, 1000);
  };

  return (
    <section id="demo" className="py-24 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Live Demo Simulator
          </h2>
          <p className="text-gray-400 text-lg">Experience Voice Authentication Analysis</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <button
              onClick={() => handleAnalyze('genuine')}
              disabled={analyzing}
              className="w-full p-6 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-2 border-green-500/50 rounded-xl hover:border-green-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <div className="flex items-center justify-center gap-3">
                <Upload className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-semibold text-green-400">Upload Genuine Voice</span>
              </div>
            </button>

            <button
              onClick={() => handleAnalyze('spliced')}
              disabled={analyzing}
              className="w-full p-6 bg-gradient-to-r from-red-600/20 to-orange-600/20 border-2 border-red-500/50 rounded-xl hover:border-red-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <div className="flex items-center justify-center gap-3">
                <Upload className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-semibold text-red-400">Upload Spliced Voice</span>
              </div>
            </button>

            <div className="bg-gray-950/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 h-64">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-semibold text-gray-300">Audio Waveform</span>
              </div>
              <div className="flex items-end justify-around h-40 gap-1">
                {[...Array(50)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t"
                    animate={analyzing ? {
                      height: [
                        `${Math.random() * 60 + 20}%`,
                        `${Math.random() * 80 + 10}%`,
                        `${Math.random() * 60 + 20}%`,
                      ],
                    } : {
                      height: '10%',
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: analyzing ? Infinity : 0,
                      delay: i * 0.02,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-gray-950/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Analysis Progress</h3>
              <div className="space-y-3">
                {stages.map((stage, index) => (
                  <div key={stage.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      analyzing && stages.findIndex(s => s.id === currentStage) >= index
                        ? 'bg-cyan-500'
                        : 'bg-gray-700'
                    } transition-all duration-300`}>
                      {analyzing && stages.findIndex(s => s.id === currentStage) === index && (
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                      )}
                      {stages.findIndex(s => s.id === currentStage) > index && (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <span className={`text-sm ${
                      analyzing && stages.findIndex(s => s.id === currentStage) >= index
                        ? 'text-cyan-400'
                        : 'text-gray-500'
                    }`}>
                      {stage.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`bg-gradient-to-br ${
                    result === 'genuine'
                      ? 'from-green-600/20 to-emerald-600/20 border-green-500/50'
                      : 'from-red-600/20 to-orange-600/20 border-red-500/50'
                  } border-2 rounded-xl p-6`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {result === 'genuine' ? (
                      <>
                        <CheckCircle2 className="w-8 h-8 text-green-400" />
                        <div>
                          <h3 className="text-xl font-bold text-green-400">GENUINE</h3>
                          <p className="text-sm text-gray-300">Voice authenticated successfully</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-8 h-8 text-red-400" />
                        <div>
                          <h3 className="text-xl font-bold text-red-400">SPLICE DETECTED</h3>
                          <p className="text-sm text-gray-300">Voice manipulation detected</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Confidence Score</span>
                      <span className="font-semibold text-white">{confidence}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${confidence}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full ${
                          result === 'genuine' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-950/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Anomaly Heatmap</h3>
                <div className="flex items-end gap-2 h-32">
                  {anomalyData.map((value, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${value}%` }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex-1 rounded-t"
                      style={{
                        backgroundColor: value > 50 ? '#ef4444' : '#10b981',
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Segment 1</span>
                  <span>Segment 8</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
