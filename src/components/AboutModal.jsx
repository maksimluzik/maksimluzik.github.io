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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div 
            className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center"
            onClick={onClose}
          >
            <motion.div
              className="relative w-full max-w-lg my-auto"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="about-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="glass bg-dark-900/90 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl shadow-2xl border border-white/10 flex flex-col max-h-[calc(100vh-2rem)] max-h-[calc(100dvh-2rem)] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-5 sm:p-6 pb-4 sm:pb-5 border-b border-white/10 flex-shrink-0">
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-2">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/5 backdrop-blur-sm flex items-center justify-center text-2xl sm:text-3xl border border-white/10 flex-shrink-0">
                      👤
                    </div>
                    <div className="min-w-0">
                      <h2 id="about-modal-title" className="text-xl sm:text-2xl font-semibold text-white truncate">About Me</h2>
                      <p className="text-xs sm:text-sm text-dark-300 truncate">Technical Specialist & Consultant</p>
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="text-dark-400 hover:text-white active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xl p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 flex-shrink-0 ml-2"
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto p-5 sm:p-6 space-y-4 text-dark-200 text-sm sm:text-base leading-relaxed">
                  <p>
                    Hi, I'm <span className="text-white font-medium">Maksim Luzik</span>, a passionate technical specialist and consultant with expertise in software development, system architecture, and digital solutions. I help businesses transform their ideas into robust, scalable applications.
                  </p>

                  <p>
                    With years of experience across various technologies and industries, I specialize in creating elegant solutions to complex problems. My approach combines technical excellence with a deep understanding of business needs, ensuring that every project delivers real value.
                  </p>

                  <p>
                    When I'm not building software, you can find me doing some sport activities like playing padel and exploring new technologies, or sharing knowledge with the developer community through forums and other platforms.
                  </p>

                  {/* Footer links */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2.5 sm:gap-4">
                    <a
                      href="https://fi.linkedin.com/in/maksimluzik"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm text-dark-300 hover:text-white transition-colors py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5"
                    >
                      <svg className="w-4 h-4 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/maksimluzik"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm text-dark-300 hover:text-white transition-colors py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      GitHub
                    </a>
                    <a
                      href="mailto:me@maksimluzik.com"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm text-dark-300 hover:text-white transition-colors py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5"
                    >
                      <span className="text-sm">✉️</span>
                      Email
                    </a>
                  </div>
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
