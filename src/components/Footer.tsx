import { motion } from 'framer-motion';
import { Shield, Mail, Github, Linkedin, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">VoiceShield</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Advanced spliced voice detection system for securing biometric authentication against sophisticated audio manipulation attacks.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Project Info</h3>
            <ul className="space-y-3 text-gray-400">
              <li>Cybersecurity Capstone Project</li>
              <li>Focus: Voice Biometric Security</li>
              <li>Technology: ML-Based Detection</li>
              <li>Status: Research & Development</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Team</h3>
            <p className="text-gray-400 mb-4">
              Developed by cybersecurity researchers focused on advancing voice authentication security.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center hover:border-cyan-500 transition-colors"
              >
                <Github className="w-5 h-5 text-gray-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center hover:border-cyan-500 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center hover:border-cyan-500 transition-colors"
              >
                <Mail className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 VoiceShield. Research & Educational Purpose.
            </p>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-lg">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-yellow-400 font-semibold">Patent Pending</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
