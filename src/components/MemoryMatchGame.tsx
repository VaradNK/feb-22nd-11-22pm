import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import textConfig from '../textConfig';

interface MemoryMatchGameProps {
  onNext: () => void;
}

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryMatchGame: React.FC<MemoryMatchGameProps> = ({ onNext }) => {
  const initialCards = textConfig.memoryGame.pairs.flatMap((emoji, index) => [
    { id: index * 2, emoji, isFlipped: false, isMatched: false },
    { id: index * 2 + 1, emoji, isFlipped: false, isMatched: false },
  ]);

  const [cards, setCards] = useState<Card[]>(initialCards.sort(() => Math.random() - 0.5));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Check for matches
  useEffect(() => {
    if (flipped.length === 2) {
      setMoves(prev => prev + 1);
      
      const [first, second] = flipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 600);
      }
    }
  }, [flipped, cards, matched]);

  // Check for win
  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matched, cards.length]);

  const handleCardClick = (index: number) => {
    if (flipped.includes(index) || matched.includes(index) || flipped.length === 2) return;
    setFlipped([...flipped, index]);
  };

  const resetGame = () => {
    const newCards = initialCards.sort(() => Math.random() - 0.5);
    setCards(newCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-grow relative w-full max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-8 flex flex-col items-center justify-center min-h-screen"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-6 md:mb-10 relative z-10 flex-shrink-0"
        >
          <span className="block text-pink-500 font-hand text-lg md:text-2xl rotate-[-2deg] mb-2">
            {textConfig.memoryGame.subheading}
          </span>
          <h1 className="text-3xl md:text-5xl font-display text-primary drop-shadow-sm tracking-tight leading-tight mb-2">
            {textConfig.memoryGame.heading}
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto font-medium text-xs md:text-sm">
            {textConfig.memoryGame.instruction}
          </p>
        </motion.div>

        {/* Game Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-4 md:mb-6 flex gap-3 md:gap-6 flex-shrink-0"
        >
          <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg md:rounded-xl p-2 md:p-4 shadow-md border-2 border-pink-300 text-center min-w-[100px] md:min-w-[120px]">
            <p className="text-gray-600 font-medium text-xs md:text-sm mb-0.5 md:mb-1">{textConfig.gameStats.moves}</p>
            <p className="text-2xl md:text-3xl font-display text-primary">{moves}</p>
          </div>
          <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg md:rounded-xl p-2 md:p-4 shadow-md border-2 border-pink-300 text-center min-w-[100px] md:min-w-[120px]">
            <p className="text-gray-600 font-medium text-xs md:text-sm mb-0.5 md:mb-1">{textConfig.gameStats.matched}</p>
            <p className="text-2xl md:text-3xl font-display text-primary">{matched.length / 2}/{cards.length / 2}</p>
          </div>
        </motion.div>

        {/* Game Grid */}
        {!gameWon ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="w-full bg-gradient-to-br from-pink-50 to-white rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-lg border-3 border-pink-200 mb-4 md:mb-6 flex-shrink-0 overflow-hidden"
          >
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-3 auto-rows-max justify-center">
              {cards.map((card, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleCardClick(index)}
                  whileHover={{ scale: matched.includes(index) ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={matched.includes(index)}
                  className="relative aspect-square w-16 md:w-20 lg:w-24"
                >
                  <motion.div
                    initial={{ rotateY: 0 }}
                    animate={{ 
                      rotateY: flipped.includes(index) || matched.includes(index) ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="w-full h-full"
                  >
                    {/* Back of card */}
                    <div
                      style={{ backfaceVisibility: 'hidden' }}
                      className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-md cursor-pointer border-2 border-pink-300 hover:shadow-lg transition-shadow"
                    >
                      <span className="text-xl md:text-2xl font-bold text-white">?</span>
                    </div>

                    {/* Front of card */}
                    <div
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                      className={`absolute inset-0 rounded-lg md:rounded-xl flex items-center justify-center text-3xl md:text-4xl lg:text-5xl shadow-md border-2 transition-all ${
                        matched.includes(index)
                          ? 'bg-gradient-to-br from-pink-100 to-pink-50 border-pink-200 opacity-50'
                          : 'bg-white border-pink-300 hover:bg-pink-50'
                      }`}
                    >
                      {card.emoji}
                    </div>
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          // Victory Screen
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-gradient-to-br from-pink-100 via-pink-50 to-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg border-3 border-pink-300 text-center mb-4 md:mb-6 flex-shrink-0"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-4"
            >
              <p className="text-4xl md:text-5xl mb-3">🎉</p>
              <h2 className="text-2xl md:text-3xl font-display text-primary mb-2">
                You Won!
              </h2>
              <p className="text-sm md:text-base text-gray-700 font-body">
                Completed in <span className="font-bold text-primary">{moves} moves</span>
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={resetGame}
              className="px-5 md:px-6 py-2 md:py-3 rounded-full bg-primary text-white font-bold text-sm md:text-base shadow-retro hover:shadow-retro-hover hover:bg-primary-hover hover:translate-y-[2px] hover:translate-x-[2px] transition-all"
            >
              Play Again
            </motion.button>
          </motion.div>
        )}

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-4 flex-shrink-0"
        >
          {!gameWon && (
            <button
              onClick={resetGame}
              className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-pink-300 text-white font-bold text-sm md:text-base shadow-retro hover:shadow-retro-hover hover:translate-y-[2px] hover:translate-x-[2px] transition-all"
            >
              Reset Game
            </button>
          )}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(() => onNext?.(), 300);
            }}
            className="group flex items-center gap-2 px-6 md:px-8 py-2 md:py-3 rounded-full bg-primary text-white font-bold text-sm md:text-base shadow-retro hover:shadow-retro-hover hover:bg-primary-hover hover:translate-y-[2px] hover:translate-x-[2px] transition-all"
          >
            {textConfig.memoryGame.continueButton}
            <span className="material-icons-round text-lg group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </motion.div>
      </motion.main>
    </>
  );
};

export default MemoryMatchGame;
