import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Privacy Policy Page Component
 */
export function Policy() {
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
      <main className="relative z-10 flex flex-col items-center px-4 py-16 md:py-24">
        <motion.article
          className="w-full max-w-3xl bg-dark-900/50 backdrop-blur-sm rounded-2xl border border-dark-800 p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Privacy Policy</h1>
          
          <p className="text-sm text-dark-400 mb-8">Last updated: February 3, 2026</p>
          
          <section className="space-y-6 text-dark-200">
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-dark-100">Data Collection</h2>
              <p>This website collects only necessary data required for its operation and analytics. We are committed to respecting your privacy and handling any personal information with care.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-dark-100">Data Usage</h2>
              <p className="mb-2">Any data collected is used solely for:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Website functionality and performance</li>
                <li>Understanding visitor engagement through analytics</li>
                <li>Improving user experience</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-dark-100">Your Rights</h2>
              <p className="mb-3">You have the right to request the removal of any personal data we may have collected. If you have any questions about this privacy policy or wish to have your data removed, please contact:</p>
              <p>
                <strong>Email:</strong>{' '}
                <a 
                  href="mailto:me@maksimluzik.com" 
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  me@maksimluzik.com
                </a>
              </p>
            </div>
          </section>
          
          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-dark-800/80 hover:bg-dark-700 border border-dark-700 rounded-lg text-dark-200 hover:text-dark-100 transition-all"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.article>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-sm text-dark-500">
        <span>© {new Date().getFullYear()} Maksim Luzik</span>
      </footer>
    </div>
  );
}

export default Policy;
