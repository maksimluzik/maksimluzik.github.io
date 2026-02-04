import { motion } from 'framer-motion';
import QuoteDisplay from './QuoteDisplay';

/**
 * Hero Component
 * 
 * Main hero section with animated name and tagline.
 */
export function Hero({ className = '' }) {
  return (
    <motion.header
      className={`text-center mb-12 md:mb-16 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Profile Image */}
      <motion.div
        className="relative inline-block mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="relative">
          <img
            src="/images/maksim-mxmz.jpg"
            alt="Maksim Luzik"
            width={120}
            height={120}
            className="w-24 h-24 md:w-30 md:h-30 rounded-full ring-2 ring-white/20 ring-offset-4 ring-offset-dark-950"
            loading="eager"
          />
          {/* Status indicator */}
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-dark-950" title="Available" />
        </div>
      </motion.div>
      
      {/* Name */}
      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-balance"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="gradient-text">Maksim Luzik</span>
      </motion.h1>
      
      {/* Tagline */}
      <motion.p
        className="text-lg md:text-xl text-dark-300 max-w-2xl mx-auto mb-6 text-balance"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Techical Consultant & Startup Specialist
        <br className="hidden md:block" />
        <span className="text-dark-400">Where engineering meets business intuition</span>
      </motion.p>
      
      {/* Location / Status */}
      <motion.div
        className="flex items-center justify-center gap-4 text-sm text-dark-400 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Helsinki, Finland
        </span>
      </motion.div>
      
      {/* Quote Display */}
      <QuoteDisplay className="mt-6" />
    </motion.header>
  );
}

export default Hero;
