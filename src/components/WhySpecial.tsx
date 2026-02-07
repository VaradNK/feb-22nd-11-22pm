import React from 'react';
import { motion } from 'framer-motion';
// @ts-ignore
import textConfig from '../textConfig';

interface WhySpecialProps {
  onNext: () => void;
}

const WhySpecial: React.FC<WhySpecialProps> = ({ onNext }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-grow relative w-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16 md:mb-20 relative z-10"
        >
          <span className="block text-pink-500 font-hand text-2xl md:text-3xl rotate-[-3deg] mb-3">
            {textConfig.whySpecial.subheading}
          </span>
          <h1 className="text-4xl md:text-6xl font-display text-primary drop-shadow-sm tracking-tight leading-tight mb-4">
            {textConfig.whySpecial.heading}
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto font-medium text-sm md:text-base italic">
            A glimpse into what makes you extraordinary to me
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0 mb-12 relative z-0"
        >
          {textConfig.whySpecial.reasons.map((reason: any, index: number) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              {/* Reason Card */}
              <div className="h-full bg-gradient-to-br from-pink-100/80 to-pink-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-pink-200/60 flex flex-col items-center text-center space-y-4"
              >
                {/* Emoji Circle */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-300 to-pink-200 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{reason.emoji}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display text-primary">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 font-body text-sm leading-relaxed">
                  {reason.description}
                </p>

                {/* Decorative accent */}
                <div className="mt-4 w-12 h-1 bg-gradient-to-r from-pink-300 to-pink-200 rounded-full group-hover:w-16 transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
          {textConfig.whySpecial.continueButton}
          <span className="material-icons-round text-lg group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </motion.div>
    </>
  );
};

export default WhySpecial;
