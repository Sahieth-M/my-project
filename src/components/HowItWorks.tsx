import { motion } from 'framer-motion';
import { Mic, Settings, Target, CheckCircle, Radio } from 'lucide-react';

const steps = [
  {
    icon: Mic,
    title: 'Audio Signal Acquisition',
    description: 'Captures voice input through secure channels',
  },
  {
    icon: Settings,
    title: 'Feature Extraction',
    description: 'Extracts MFCC, spectral flux, and pitch contours',
  },
  {
    icon: Target,
    title: 'Splice Detection Engine',
    description: 'ML models analyze temporal embeddings for anomalies',
  },
  {
    icon: Radio,
    title: 'Decision Module',
    description: 'Multi-vector scoring determines authenticity',
  },
  {
    icon: CheckCircle,
    title: 'Authentication Result',
    description: 'Real-time verdict with explainable indicators',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg">5-Stage Pipeline for Splice Detection</p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 rounded-xl group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-300"
                  />

                  <div className="relative">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400 mb-2">{index + 1}</div>
                      <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-400">{step.description}</p>
                    </div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
