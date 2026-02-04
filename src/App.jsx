import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import ParticleCanvas from './components/ParticleCanvas';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import { CommandPalette, CommandPaletteButton } from './components/CommandPalette';

/**
 * Main App Component
 * 
 * Orchestrates the sophisticated minimalist portfolio experience.
 */
function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  
  // Global keyboard shortcut for command palette (⌘K / Ctrl+K)
  const handleKeyDown = useCallback((e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsCommandPaletteOpen(prev => !prev);
    }
  }, []);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/tokyo-maksim.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
        aria-hidden="true"
      />
      
      {/* Dark overlay filter to match site style */}
      <div 
        className="fixed inset-0 z-[1] bg-dark-950/85"
        aria-hidden="true"
      />
      
      {/* Background particle system */}
      <ParticleCanvas />
      
      {/* Gradient overlay for depth */}
      <div 
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.12), transparent),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(168, 85, 247, 0.08), transparent)
          `,
        }}
        aria-hidden="true"
      />
      
      {/* Noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-[3] noise" aria-hidden="true" />
      
      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 md:py-24">
        {/* Hero section */}
        <Hero />
        
        {/* Bento Grid navigation */}
        <BentoGrid className="mb-12" />
        
        {/* Keyboard shortcut hint */}
        <motion.p
          className="text-sm text-dark-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Press{' '}
          <kbd className="px-2 py-1 text-xs bg-dark-800/50 rounded border border-dark-700 text-dark-300">
            ⌘K
          </kbd>{' '}
          to open command palette
        </motion.p>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-sm text-dark-500">
        <div className="flex items-center justify-center gap-4">
          <a 
            href="/policy" 
            className="hover:text-dark-300 transition-colors"
          >
            Privacy Policy
          </a>
          <span className="w-1 h-1 rounded-full bg-dark-700" />
          <span>© {new Date().getFullYear()} Maksim Luzik</span>
        </div>
      </footer>
      
      {/* Command Palette */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
      
      {/* Command Palette FAB */}
      <CommandPaletteButton onClick={() => setIsCommandPaletteOpen(true)} />
    </div>
  );
}

export default App;
