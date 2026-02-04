import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * 404 Not Found Page Component
 */
export function NotFound() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background gradient matching main site */}
      <div className="fixed inset-0 z-0 bg-dark-950" aria-hidden="true" />
      
      {/* Gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.08), transparent)`,
        }}
        aria-hidden="true"
      />
      
      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <motion.div
          className="text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Number */}
          <motion.div
            className="text-8xl md:text-9xl font-bold mb-6 gradient-text"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            404
          </motion.div>
          
          {/* Message */}
          <motion.h1
            className="text-3xl md:text-4xl font-semibold mb-4 text-dark-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Page not found
          </motion.h1>
          
          <motion.p
            className="text-lg text-dark-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            The page you're looking for doesn't exist or was moved.
          </motion.p>
          
          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 rounded-lg text-white font-medium transition-all shadow-lg shadow-primary-600/20"
            >
              ← Back to Home
            </Link>
            
            <a
              href="mailto:me@maksimluzik.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-dark-800/80 hover:bg-dark-700 border border-dark-700 rounded-lg text-dark-200 hover:text-dark-100 transition-all"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

export default NotFound;
