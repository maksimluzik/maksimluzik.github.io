import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Command items configuration
const COMMANDS = [
  { id: 'about', label: 'About Me', category: 'Navigation', action: () => scrollToSection('about'), keywords: ['profile', 'bio', 'who'] },
  { id: 'company', label: 'View Company', category: 'Navigation', action: () => window.open('https://mxm-consulting.fi', '_blank'), keywords: ['work', 'portfolio', 'projects', 'consulting'] },
  { id: 'stackexchange', label: 'StackExchange Profile', category: 'Navigation', action: () => window.open('https://stackexchange.com/users/1509702/maksim-luzik?tab=accounts', '_blank'), keywords: ['qa', 'questions', 'answers', 'code'] },
  { id: 'capitol-conquest', label: 'Capitol Conquest Game', category: 'Projects', action: () => window.open('https://cc.maksimluzik.com', '_blank'), keywords: ['game', 'strategy', 'play', 'gaming'] },
  { id: 'co-split', label: 'Co-Split App', category: 'Projects', action: () => window.open('https://co-split.maksimluzik.com', '_blank'), keywords: ['share', 'services', 'split', 'subscription'] },
  { id: 'contact-email', label: 'Send Email', category: 'Contact', action: () => window.location.href = 'mailto:me@maksimluzik.com', keywords: ['email', 'mail', 'message'] },
  { id: 'linkedin', label: 'Open LinkedIn', category: 'Social', action: () => window.open('https://fi.linkedin.com/in/maksimluzik', '_blank'), keywords: ['professional', 'network'] },
  { id: 'github', label: 'Open GitHub', category: 'Social', action: () => window.open('https://github.com/maksimluzik', '_blank'), keywords: ['code', 'repos', 'open source'] },
  { id: 'twitter', label: 'Open Twitter/X', category: 'Social', action: () => window.open('https://twitter.com/maksimluzik', '_blank'), keywords: ['x', 'tweets'] },
];

// Helper function for smooth scrolling
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Fuzzy search implementation
function fuzzySearch(query, items) {
  if (!query) return items;
  
  const lowerQuery = query.toLowerCase();
  
  return items
    .map(item => {
      // Search in label, category, and keywords
      const searchTexts = [
        item.label.toLowerCase(),
        item.category.toLowerCase(),
        ...(item.keywords || []).map(k => k.toLowerCase()),
      ];
      
      // Calculate match score
      let score = 0;
      for (const text of searchTexts) {
        if (text.includes(lowerQuery)) {
          score += text === lowerQuery ? 100 : 50;
        } else {
          // Fuzzy character matching
          let queryIndex = 0;
          for (let i = 0; i < text.length && queryIndex < lowerQuery.length; i++) {
            if (text[i] === lowerQuery[queryIndex]) {
              queryIndex++;
              score += 1;
            }
          }
        }
      }
      
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

/**
 * CommandPalette Component
 * 
 * A spotlight-style command palette for keyboard-first navigation.
 * Inspired by VS Code, Raycast, and Alfred.
 */
export function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  
  // Filter commands based on query
  const filteredCommands = useMemo(() => fuzzySearch(query, COMMANDS), [query]);
  
  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups = {};
    filteredCommands.forEach(cmd => {
      if (!groups[cmd.category]) {
        groups[cmd.category] = [];
      }
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);
  
  // Flatten grouped commands for index navigation
  const flattenedCommands = useMemo(() => {
    return Object.values(groupedCommands).flat();
  }, [groupedCommands]);
  
  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);
  
  // Focus input when palette opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);
  
  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, flattenedCommands.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (flattenedCommands[selectedIndex]) {
          flattenedCommands[selectedIndex].action();
          onClose();
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  }, [flattenedCommands, selectedIndex, onClose]);
  
  // Scroll selected item into view
  useEffect(() => {
    const selectedElement = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="glass rounded-xl overflow-hidden shadow-2xl">
              {/* Search Input */}
              <div className="flex items-center px-4 py-3 border-b border-white/10">
                <svg
                  className="w-5 h-5 text-dark-400 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-white placeholder-dark-400 focus:outline-none text-base"
                  aria-label="Search commands"
                  aria-autocomplete="list"
                  aria-controls="command-list"
                  aria-activedescendant={flattenedCommands[selectedIndex]?.id}
                />
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-dark-400 bg-dark-800/50 rounded border border-dark-700">
                  ESC
                </kbd>
              </div>
              
              {/* Command List */}
              <div
                ref={listRef}
                id="command-list"
                role="listbox"
                className="max-h-80 overflow-y-auto py-2"
              >
                {flattenedCommands.length === 0 ? (
                  <div className="px-4 py-8 text-center text-dark-400">
                    No results found for "{query}"
                  </div>
                ) : (
                  Object.entries(groupedCommands).map(([category, commands]) => (
                    <div key={category}>
                      <div className="px-4 py-2 text-xs font-medium text-dark-400 uppercase tracking-wider">
                        {category}
                      </div>
                      {commands.map((command) => {
                        const globalIndex = flattenedCommands.findIndex(c => c.id === command.id);
                        const isSelected = globalIndex === selectedIndex;
                        
                        return (
                          <button
                            key={command.id}
                            data-index={globalIndex}
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              command.action();
                              onClose();
                            }}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`
                              w-full flex items-center px-4 py-3 text-left
                              transition-colors duration-150
                              ${isSelected ? 'bg-white/10 text-white' : 'text-dark-200 hover:bg-white/5'}
                            `}
                          >
                            <span className="flex-1">{command.label}</span>
                            {isSelected && (
                              <kbd className="flex items-center gap-1 px-2 py-1 text-xs text-dark-400 bg-dark-800/50 rounded">
                                ↵
                              </kbd>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>
              
              {/* Footer hint */}
              <div className="px-4 py-2 border-t border-white/10 flex items-center gap-4 text-xs text-dark-400">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-dark-800/50 rounded">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-dark-800/50 rounded">↵</kbd>
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-dark-800/50 rounded">ESC</kbd>
                  Close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * CommandPaletteButton Component
 * 
 * A floating action button to trigger the command palette.
 */
export function CommandPaletteButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 glass glass-hover p-4 rounded-full shadow-lg group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Open command palette (⌘K)"
      title="Open command palette (⌘K)"
    >
      <svg
        className="w-6 h-6 text-white/80 group-hover:text-white transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      
      {/* Keyboard shortcut hint */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white/60 bg-dark-800/90 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        ⌘K
      </span>
    </motion.button>
  );
}

export default CommandPalette;
