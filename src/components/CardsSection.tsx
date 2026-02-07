import React from 'react';
import { motion } from 'framer-motion';
// @ts-ignore
import textConfig from '../textConfig';
import pic1 from '../imgs/pic1.jpg';
import pic2 from '../imgs/pic2.jpg';
import pic3 from '../imgs/pic3.jpg';

interface CardsSectionProps {
  onNext: () => void;
}

const CardsSection: React.FC<CardsSectionProps> = ({ onNext }) => {
  const polaroids = [
    {
      image: pic1,
      caption: textConfig.cards.card1Front,
      emoji: "😇",
      rotation: -5,
      position: "lg:translate-y-0"
    },
    {
      image: pic2,
      caption: textConfig.cards.card2Front,
      emoji: "🤍",
      rotation: 4,
      position: "lg:translate-y-8"
    },
    {
      image: pic3,
      caption: textConfig.cards.card3Front,
      emoji: "😊",
      rotation: -6,
      position: "lg:translate-y-2"
    }
  ];

  return (
    <>
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-grow relative w-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center"
      >
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16 md:mb-20 relative z-10"
        >
          <span className="block text-retro-pink font-hand text-2xl md:text-3xl rotate-[-4deg] mb-3">{textConfig.cards.subheading}</span>
          <h1 className="text-4xl md:text-6xl font-display text-primary drop-shadow-sm tracking-tight leading-tight mb-4">
            {textConfig.cards.heading}
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto font-medium text-sm md:text-base italic">
            {textConfig.cards.instruction}
          </p>
        </motion.div>

        {/* Polaroid Grid */}
        <div className="w-full flex flex-wrap justify-center gap-8 md:gap-12 px-4 md:px-0 relative z-0 mb-12">
          {polaroids.map((polaroid, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotate: polaroid.rotation }}
              animate={{ opacity: 1, scale: 1, rotate: polaroid.rotation }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: polaroid.rotation + (Math.random() * 2 - 1),
                y: -10,
                transition: { duration: 0.3 }
              }}
              className={`group w-56 sm:w-64 cursor-pointer ${polaroid.position}`}
            >
              {/* Polaroid Frame */}
              <div className="bg-white rounded-sm shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100"
                style={{
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                  transform: `rotate(${polaroid.rotation}deg)`
                }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden bg-gray-200 h-64 sm:h-72">
                  <img 
                    src={polaroid.image}
                    alt="Memory moment"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Polaroid Flash Effect */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full shadow-md"></div>
                </div>

                {/* Caption Area */}
                <div className="px-4 py-8 text-center min-h-20 flex flex-col items-center justify-center">
                  <p className="font-hand text-lg sm:text-xl text-gray-800 leading-relaxed mb-2">
                    {polaroid.caption}
                  </p>
                  <span className="text-3xl sm:text-4xl">{polaroid.emoji}</span>
                </div>

                {/* Decorative tape */}
                <div className="absolute -top-2 left-1/4 w-12 h-6 bg-retro-pink/40 shadow-md pointer-events-none"
                  style={{
                    transform: 'perspective(600px) rotateX(20deg)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                ></div>
                <div className="absolute -top-1 right-1/4 w-10 h-5 bg-note-yellow/50 shadow-sm pointer-events-none"
                  style={{
                    transform: 'perspective(600px) rotateX(25deg)',
                  }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.main>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full py-8 md:py-12 flex justify-center items-center relative z-20"
      >
        <button 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => onNext?.(), 300);
          }}
          className="group flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold shadow-retro hover:shadow-retro-hover hover:bg-primary-hover hover:translate-y-[2px] hover:translate-x-[2px] transition-all text-lg md:text-xl"
        >
          {textConfig.cards.continueButton}
          <span className="material-icons-round text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </motion.div>
    </>
  );
};

export default CardsSection;