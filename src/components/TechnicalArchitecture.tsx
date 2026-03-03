import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const architectureSteps = [
  {
    stage: 'Audio Capture',
    description: 'Raw voice input from microphone or stored samples',
  },
  {
    stage: 'Preprocessing',
    description: 'Noise reduction, normalization, and segmentation',
  },
  {
    stage: 'Feature Extraction',
    description: 'MFCC, Spectral Flux, Pitch Contour analysis',
  },
  {
    stage: 'ML Models',
    description: 'Siamese Network, GRU/LSTM, Gradient Boosting',
  },
  {
    stage: 'Decision Output',
    description: 'Authentication verdict with confidence metrics',
  },
];

export default function TechnicalArchitecture() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Technical Architecture
          </h2>
          <p className="text-gray-400 text-lg">End-to-End System Pipeline</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 md:p-12"
        >
          <div className="space-y-6">
            {architectureSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>

                  <div className="flex-1 bg-gray-950/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{step.stage}</h3>
                        <p className="text-gray-400">{step.description}</p>
                      </div>
                      {index < architectureSteps.length - 1 && (
                        <ArrowRight className="hidden md:block w-6 h-6 text-cyan-400 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>

                {index < architectureSteps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: 40 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                      className="w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-gray-800"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Feature Extraction Techniques</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'MFCC', desc: 'Mel-Frequency Cepstral Coefficients' },
                { name: 'Spectral Flux', desc: 'Temporal variation measurement' },
                { name: 'Pitch Contour', desc: 'Fundamental frequency tracking' },
              ].map((tech, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-cyan-500/30 rounded-lg p-4 text-center"
                >
                  <div className="text-cyan-400 font-bold text-lg mb-1">{tech.name}</div>
                  <div className="text-gray-400 text-sm">{tech.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
