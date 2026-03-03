import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Shield, Zap, Target } from 'lucide-react';

const stats = [
  {
    icon: Target,
    value: 94,
    suffix: '%+',
    label: 'Detection Accuracy',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Shield,
    value: 60,
    suffix: '%',
    label: 'Of Systems Miss Frame-Level Attacks',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: TrendingUp,
    value: 40,
    suffix: '%',
    label: 'Reduction in Unauthorized Access',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Zap,
    value: 35,
    suffix: '%',
    label: 'Reduction in Security Overhead',
    color: 'from-cyan-500 to-cyan-600',
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function ResultsStats() {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Performance Metrics
          </h2>
          <p className="text-gray-400 text-lg">Proven Results in Real-World Testing</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative bg-gray-950/50 backdrop-blur-xl border border-gray-800 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 rounded-xl group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-300"
                />

                <div className="relative">
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto`}>
                    <stat.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>

                  <div className="text-center">
                    <div className="text-5xl font-bold text-white mb-3">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-gray-400 leading-relaxed">{stat.label}</p>
                  </div>
                </div>

                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} rounded-b-xl`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-cyan-500/30 rounded-2xl p-8 text-center"
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            VoiceShield achieves <span className="font-bold text-cyan-400">state-of-the-art performance</span> in detecting
            voice splicing attacks while maintaining <span className="font-bold text-cyan-400">real-time processing speeds</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
