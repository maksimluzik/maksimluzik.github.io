import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AboutModal Component
 * 
 * A modal dialog that displays information about Maksim Luzik
 * Features:
 * - Glassmorphism design matching site aesthetic
 * - Click outside to close
 * - Escape key to close
 * - Smooth animations
 */
export function AboutModal({ isOpen, onClose }) {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="relative w-full max-w-lg pointer-events-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="glass bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-8 shadow-2xl border border-white/10">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-dark-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg p-1"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-white/5 backdrop-blur-sm flex items-center justify-center text-4xl">
                    👤
                  </div>
                  <div>
                    <h2 className="text-3xl font-semibold text-white mb-1">About Me</h2>
                    <p className="text-dark-300">Technical Specialist & Consultant</p>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 text-dark-200 leading-relaxed">
                  <p>
                    Hi, I'm <span className="text-white font-medium">Maksim Luzik</span>, a passionate technical specialist and consultant with expertise in software development, system architecture, and digital solutions. I help businesses transform their ideas into robust, scalable applications.
                  </p>
                  
                  <p>
                    With years of experience across various technologies and industries, I specialize in creating elegant solutions to complex problems. My approach combines technical excellence with a deep understanding of business needs, ensuring that every project delivers real value.
                  </p>

                  <p>
                    When I'm not building software, you can find me doing some sport activities like playing padel and exploring new technologies, or sharing knowledge with the developer community through Stack Exchange and other platforms.
                  </p>
                </div>

                {/* Footer links */}
                <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
                  <a
                    href="https://fi.linkedin.com/in/maksimluzik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-dark-300 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/maksimluzik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-dark-300 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="mailto:me@maksimluzik.com"
                    className="flex items-center gap-2 text-sm text-dark-300 hover:text-white transition-colors"
                  >
                    <span className="text-lg">✉️</span>
                    Email
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default AboutModal;
