import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

// Navigation items configuration
const NAV_ITEMS = [
  {
    id: 'about',
    title: 'About',
    description: 'Technical specialist & consultant',
    icon: '👤',
    href: '#about',
    size: 'large',
    gradient: 'from-indigo-500/20 to-purple-500/20',
    accentColor: 'rgba(99, 102, 241, 0.4)',
  },
  {
    id: 'work',
    title: 'Company',
    description: 'Projects & portfolio',
    icon: '💼',
    href: 'https://mxm-consulting.fi',
    size: 'regular',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    accentColor: 'rgba(6, 182, 212, 0.4)',
    external: true,
  },
  {
    id: 'research',
    title: 'StackExchange',
    description: 'Q&A contributions',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25M6.75 17.25L1.5 12l5.25-5.25M14.25 3l-4.5 18"/>
      </svg>
    ),
    href: 'https://stackexchange.com/users/1509702/maksim-luzik?tab=accounts',
    size: 'regular',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    accentColor: 'rgba(16, 185, 129, 0.4)',
    external: true,
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Get in touch',
    icon: '✉️',
    href: 'mailto:me@maksimluzik.com',
    size: 'regular',
    gradient: 'from-pink-500/20 to-rose-500/20',
    accentColor: 'rgba(236, 72, 153, 0.4)',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    description: 'Professional network',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    href: 'https://fi.linkedin.com/in/maksimluzik',
    size: 'regular',
    gradient: 'from-blue-600/20 to-blue-400/20',
    accentColor: 'rgba(37, 99, 235, 0.4)',
    external: true,
  },
  {
    id: 'github',
    title: 'GitHub',
    description: 'Open source',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
      </svg>
    ),
    href: 'https://github.com/maksimluzik',
    size: 'regular',
    gradient: 'from-gray-600/20 to-gray-400/20',
    accentColor: 'rgba(156, 163, 175, 0.4)',
    external: true,
  },
  {
    id: 'twitter',
    title: 'Twitter',
    description: 'Thoughts & updates',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    href: 'https://twitter.com/maksimluzik',
    size: 'regular',
    gradient: 'from-slate-600/20 to-slate-400/20',
    accentColor: 'rgba(148, 163, 184, 0.4)',
    external: true,
  },
  {
    id: 'capitol-conquest',
    title: 'Capitol Conquest',
    description: 'Strategy game',
    icon: '🎮',
    href: 'https://cc.maksimluzik.com',
    size: 'regular',
    gradient: 'from-red-500/20 to-orange-500/20',
    accentColor: 'rgba(239, 68, 68, 0.4)',
    external: true,
  },
  {
    id: 'co-split',
    title: 'Co-Split',
    description: 'Share services',
    icon: '💰',
    href: 'https://co-split.maksimluzik.com',
    size: 'regular',
    gradient: 'from-amber-500/20 to-yellow-500/20',
    accentColor: 'rgba(245, 158, 11, 0.4)',
    external: true,
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  },
};

// Size classes for grid items
const sizeClasses = {
  large: 'col-span-2 row-span-2',
  regular: 'col-span-1 row-span-1',
};

/**
 * BentoGrid Navigation Component
 * 
 * An interactive grid-based navigation system with:
 * - Variable-sized cards in a bento-box layout
 * - 3D tilt effects on hover
 * - Glassmorphism styling
 * - Accessible keyboard navigation
 */
export function BentoGrid({ className = '' }) {
  return (
    <motion.nav
      className={`w-full max-w-5xl mx-auto px-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px]">
        {NAV_ITEMS.map((item) => (
          <BentoItem key={item.id} item={item} />
        ))}
      </div>
    </motion.nav>
  );
}

function BentoItem({ item }) {
  const { id, title, description, icon, href, size, gradient, accentColor, external } = item;
  
  const isLarge = size === 'large';
  
  return (
    <motion.div
      className={sizeClasses[size]}
      variants={itemVariants}
    >
      <TiltCard
        className="h-full"
        glowColor={accentColor}
        tiltAmount={isLarge ? 8 : 12}
        scale={1.02}
      >
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={`
            group flex flex-col h-full min-h-full p-5 md:p-6
            glass glass-hover
            bg-gradient-to-br ${gradient}
            transition-all duration-300
            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950
          `}
          aria-label={`${title}: ${description}`}
        >
          {/* Icon */}
          <div className={`
            flex items-center justify-center
            ${isLarge ? 'w-16 h-16 text-4xl' : 'w-12 h-12 text-2xl'}
            mb-3 rounded-xl
            bg-white/5 backdrop-blur-sm
            group-hover:bg-white/10 transition-colors duration-300
            ${typeof icon !== 'string' ? 'text-white/80' : ''}
          `}>
            {icon}
          </div>
          
          {/* Content */}
          <div className="flex-1 flex flex-col justify-end">
            <h2 className={`
              font-semibold text-white
              ${isLarge ? 'text-2xl md:text-3xl' : 'text-xl'}
              mb-1
            `}>
              {title}
            </h2>
            
            {isLarge && (
              <p className={`
                text-dark-300 leading-relaxed text-base
              `}>
                {description}
              </p>
            )}
          </div>
          
          {/* External link indicator */}
          {external && (
            <div className="absolute top-4 right-4 text-dark-400 group-hover:text-white/60 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          )}
          
          {/* Hover shimmer effect */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </div>
        </a>
      </TiltCard>
    </motion.div>
  );
}

export default BentoGrid;
