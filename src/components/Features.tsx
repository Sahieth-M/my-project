import { motion } from 'framer-motion';
import { Brain, Activity, Shield, Zap, Eye, Wifi } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Temporal Embedding Analysis',
    description: 'Advanced ECAPA-TDNN architecture analyzes temporal patterns to detect micro-inconsistencies in voice samples.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Activity,
    title: 'Acoustic Continuity Check',
    description: 'Monitors spectral flux and pitch contours to identify unnatural transitions between audio segments.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Shield,
    title: 'Multi-Vector Spoofing Protection',
    description: 'Defends against replay attacks, voice synthesis, and deepfake audio through multi-layered detection.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Zap,
    title: 'Real-Time Low-Latency Detection',
    description: 'Sub-second analysis enables seamless authentication without compromising user experience.',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: Eye,
    title: 'Explainable Anomaly Indicators',
    description: 'Provides transparency with visual heatmaps showing exactly where splice points were detected.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Wifi,
    title: 'IoT & Cloud Integration',
    description: 'Scalable architecture designed for edge devices and cloud deployment with secure APIs.',
    color: 'from-pink-500 to-pink-600',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Core Features
          </h2>
          <p className="text-gray-400 text-lg">Advanced Technologies for Robust Voice Security</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-8 h-full hover:border-cyan-500/50 transition-all duration-300">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 rounded-xl group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-300"
                />

                <div className="relative">
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center`}>
                    <feature.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>

                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
