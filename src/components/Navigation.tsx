import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import textConfig from '../textConfig';

interface NavigationProps {
  currentPage: number;
  onNavigate: (pageIndex: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sections = textConfig.navigation.sections;

  const handleNavigate = (pageIndex: number) => {
    onNavigate(pageIndex);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 hover:shadow-lg transition-all duration-300 group"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <svg className="w-6 h-6 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </motion.div>
      </motion.button>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Sidebar */}
            <motion.nav
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 h-screen w-80 bg-gradient-to-b from-pink-100 via-pink-50 to-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="pt-20 px-6">
                <h2 className="text-2xl font-display text-pink-700 mb-8 text-center">{textConfig.navigation.heading}</h2>

                <div className="space-y-3">
                  {sections.map((section, idx) => (
                    <motion.button
                      key={section.id}
                      onClick={() => handleNavigate(section.id)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className={`w-full px-6 py-4 rounded-xl font-medium flex items-center gap-3 transition-all duration-300 group ${
                        currentPage === section.id
                          ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-lg shadow-pink-300/50'
                          : 'bg-white/70 text-pink-700 hover:bg-pink-200/60 border-2 border-pink-200/50'
                      }`}
                    >
                      <span className="text-2xl group-hover:scale-125 transition-transform">{section.icon}</span>
                      <span className="flex-1 text-left">{section.label}</span>
                      {currentPage === section.id && (
                        <span className="text-lg">→</span>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Decorative element */}
                <div className="mt-12 p-4 bg-gradient-to-br from-pink-200/50 to-pink-100/50 rounded-xl border-2 border-pink-200/30 text-center">
                  <p className="text-sm text-pink-700 font-hand italic">{textConfig.navigation.footerText}</p>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
