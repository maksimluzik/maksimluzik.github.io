import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// API Configuration
const API_KEY = 'AIzaSyAm0ilG2HsLn78-hnGvwQuWX7gtdX1HiDE';
const SPREADSHEET_ID = '145LPgIHqxSHXc2M5saohs7hCZ5ryT6_IfqbOsbMjNSI';

/**
 * QuoteDisplay Component
 * 
 * Displays inspirational quotes fetched from Google Sheets.
 * Includes a refresh button to cycle through quotes.
 */
export function QuoteDisplay({ className = '' }) {
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch quotes from Google Sheets
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Load Google API client
        await new Promise((resolve, reject) => {
          if (window.gapi) {
            resolve();
          } else {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          }
        });

        // Initialize and fetch data
        await new Promise((resolve) => window.gapi.load('client', resolve));
        await window.gapi.client.init({ apiKey: API_KEY });
        await window.gapi.client.load('sheets', 'v4');

        const response = await window.gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: SPREADSHEET_ID,
          range: 'slogans',
        });

        const values = response.result.values;
        const quotesData = [];
        
        if (values && values.length > 1) {
          for (let i = 1; i < values.length; i++) {
            const row = values[i] || [];
            const slogan = row[0] || '';
            const author = row[1] || '';
            if (slogan) {
              quotesData.push({ slogan, author });
            }
          }
        }

        setQuotes(quotesData);
        if (quotesData.length > 0) {
          setCurrentQuote(quotesData[Math.floor(Math.random() * quotesData.length)]);
        }
      } catch (err) {
        console.error('Error loading quotes:', err);
        setError('Unable to load quotes');
        // Fallback quote
        setCurrentQuote({
          slogan: 'Dream big. Start small. But most of all, start.',
          author: 'Simon Sinek'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  // Handle refresh button click
  const handleRefresh = () => {
    if (quotes.length === 0) return;
    
    setIsRefreshing(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
      setIsRefreshing(false);
    }, 300);
  };

  if (isLoading) {
    return (
      <div className={`text-center ${className}`}>
        <div className="inline-block w-5 h-5 border-2 border-dark-400 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentQuote) return null;

  return (
    <motion.div
      className={`relative max-w-2xl mx-auto ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="glass px-6 py-4 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote.slogan}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm md:text-base text-dark-200 italic leading-relaxed mb-2">
              "{currentQuote.slogan}"
            </p>
            {currentQuote.author && (
              <p className="text-xs md:text-sm text-dark-400">
                — {currentQuote.author}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Refresh button */}
        {quotes.length > 1 && (
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="absolute -top-3 -right-3 w-9 h-9 flex items-center justify-center bg-dark-800/90 hover:bg-dark-700 border border-dark-600 rounded-full transition-all duration-150 shadow-lg hover:shadow-xl group disabled:opacity-50"
            aria-label="Refresh quote"
            title="Get another quote"
            style={{
              transform: isRefreshing ? 'none' : 'rotate(0deg)',
            }}
          >
            <svg
              className={`w-4 h-4 text-dark-300 group-hover:text-primary-400 transition-all duration-150 ${
                isRefreshing ? 'animate-spin' : ''
              }`}
              style={{
                transform: isRefreshing ? 'none' : 'rotate(0deg)',
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              onMouseEnter={(e) => !isRefreshing && (e.currentTarget.style.transform = 'rotate(90deg)')}
              onMouseLeave={(e) => !isRefreshing && (e.currentTarget.style.transform = 'rotate(0deg)')}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-400 mt-2 text-center">{error}</p>
      )}
    </motion.div>
  );
}

export default QuoteDisplay;
