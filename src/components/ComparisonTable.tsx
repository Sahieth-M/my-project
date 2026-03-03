import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const features = [
  { name: 'Splice Detection', traditional: false, voiceShield: true },
  { name: 'Temporal Analysis', traditional: false, voiceShield: true },
  { name: 'Real-Time Processing', traditional: false, voiceShield: true },
  { name: 'Explainability', traditional: false, voiceShield: true },
  { name: 'IoT Support', traditional: false, voiceShield: true },
  { name: 'Multi-Vector Detection', traditional: false, voiceShield: true },
  { name: 'Frame-Level Analysis', traditional: false, voiceShield: true },
  { name: 'Low Latency (<1s)', traditional: false, voiceShield: true },
];

export default function ComparisonTable() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            VoiceShield vs Existing Systems
          </h2>
          <p className="text-gray-400 text-lg">Next-Generation Voice Security</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-950/50 border-b border-gray-800">
                  <th className="text-left p-6 text-gray-400 font-semibold">Feature</th>
                  <th className="text-center p-6 text-gray-400 font-semibold">Traditional Systems</th>
                  <th className="text-center p-6 text-cyan-400 font-semibold">
                    <div className="flex items-center justify-center gap-2">
                      <span>VoiceShield</span>
                      <div className="px-2 py-1 bg-cyan-500/20 rounded text-xs">NEW</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="p-6 text-white">{feature.name}</td>
                    <td className="p-6">
                      <div className="flex justify-center">
                        {feature.traditional ? (
                          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                            <Check className="w-5 h-5 text-green-400" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                            <X className="w-5 h-5 text-red-400" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex justify-center">
                        {feature.voiceShield ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                            className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center"
                          >
                            <Check className="w-5 h-5 text-cyan-400" />
                          </motion.div>
                        ) : (
                          <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                            <X className="w-5 h-5 text-red-400" />
                          </div>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border-t border-cyan-500/30"
          >
            <p className="text-center text-gray-300">
              <span className="font-semibold text-cyan-400">60% of existing systems</span> fail to detect frame-level splice attacks
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
