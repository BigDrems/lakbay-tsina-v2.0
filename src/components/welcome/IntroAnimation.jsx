import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const IntroAnimation = ({ showIntroAnim }) => {
  const [loading, setLoading] = useState(0);
  const [interactionCount, setInteractionCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [bambooCollected, setBambooCollected] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    if (!showIntroAnim) return;

    const interval = setInterval(() => {
      setLoading((prev) => {
        const newValue = prev + (1 + interactionCount * 0.5);
        return newValue >= 100 ? 100 : newValue;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [showIntroAnim, interactionCount]);

  // Show hint after delay if no interaction
  useEffect(() => {
    if (interactionCount === 0 && loading > 30 && loading < 70) {
      const timeout = setTimeout(() => setShowHint(true), 3000);
      return () => clearTimeout(timeout);
    }
  }, [loading, interactionCount]);

  // Clear hint after interaction
  useEffect(() => {
    if (interactionCount > 0) {
      setShowHint(false);
    }
  }, [interactionCount]);

  // Complete loading when enough bamboo is collected
  useEffect(() => {
    if (bambooCollected >= 5) {
      setLoading(100);
    }
  }, [bambooCollected]);

  const handleBambooClick = () => {
    setBambooCollected((prev) => prev + 1);
    setInteractionCount((prev) => prev + 1);
  };

  const handlePandaInteraction = () => {
    setInteractionCount((prev) => prev + 1);
  };

  if (!showIntroAnim) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/panda.png"
          alt="Panda Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/90 via-emerald-900/80 to-amber-900/90"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-8">
        {/* Logo & title with accessibility */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold mb-4 text-white drop-shadow-glow">
            <span aria-label="Lakbay Tsina">Lakbay Tsina</span>
          </h1>
          <p className="text-xl text-emerald-200 font-medium">
            Your journey through Chinese culture
          </p>
        </motion.div>

        {/* Interactive panda animation */}
        <motion.div
          className="relative w-64 h-64 mx-auto mb-8 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePandaInteraction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Panda body - now with subtle animations */}
          <motion.div
            className="absolute w-56 h-56 bg-white rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          ></motion.div>

          {/* Panda head with blinking and movement */}
          <motion.div
            className="absolute w-64 h-52 bg-white rounded-full left-1/2 top-6 -translate-x-1/2 shadow-lg"
            animate={{
              y: [0, -5, 0],
              rotate: [0, 1, 0, -1, 0],
            }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            {/* Black eyes that blink */}
            <motion.div
              className="absolute w-14 h-10 bg-black rounded-full left-10 top-14 transform -rotate-12"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, repeatDelay: 2.5 }}
            ></motion.div>
            <motion.div
              className="absolute w-14 h-10 bg-black rounded-full right-10 top-14 transform rotate-12"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, repeatDelay: 2.5 }}
            ></motion.div>

            {/* Ears */}
            <div className="absolute w-16 h-16 bg-black rounded-full left-4 -top-2 transform -rotate-6"></div>
            <div className="absolute w-16 h-16 bg-black rounded-full right-4 -top-2 transform rotate-6"></div>

            {/* Nose and mouth with subtle motion */}
            <div className="absolute w-10 h-7 bg-black rounded-full left-1/2 top-24 -translate-x-1/2"></div>
            <motion.div
              className="absolute w-1 h-6 bg-black left-1/2 top-[7.5rem] -translate-x-1/2"
              animate={{ height: [6, 5, 6] }}
              transition={{ repeat: Infinity, duration: 4 }}
            ></motion.div>
            <motion.div
              className="absolute w-16 h-1 bg-black rounded-full left-1/2 top-[8.75rem] -translate-x-1/2"
              animate={{ width: [16, 14, 16] }}
              transition={{ repeat: Infinity, duration: 4 }}
            ></motion.div>
          </motion.div>

          {/* Interactive paws */}
          <motion.div
            className="absolute w-16 h-14 bg-black rounded-full left-10 bottom-10 transform rotate-12"
            animate={{ x: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
          ></motion.div>
          <motion.div
            className="absolute w-16 h-14 bg-black rounded-full right-10 bottom-10 transform -rotate-12"
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          ></motion.div>
        </motion.div>

        {/* Interactive bamboo elements */}
        <div className="flex justify-center space-x-12 mt-4 mb-8">
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: bambooCollected > index ? 0.5 : 1,
                scale: 1,
                y: [0, -10, 0],
              }}
              transition={{
                delay: 0.5 + index * 0.1,
                y: {
                  repeat: Infinity,
                  duration: 3 + index * 0.5,
                  ease: "easeInOut",
                },
              }}
              whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
              whileTap={{ scale: 0.9 }}
              onClick={handleBambooClick}
              aria-label="Collect bamboo to speed up loading"
            >
              <div className="text-green-400 text-5xl filter drop-shadow-md">
                🎋
              </div>
              {bambooCollected > index && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="text-white text-xl">✓</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Loading progress bar with text feedback */}
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between mb-2 text-white">
            <span>Loading your journey...</span>
            <span aria-live="polite">{Math.floor(loading)}%</span>
          </div>

          <div className="h-3 w-full bg-white/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${loading}%` }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>

          {/* User interaction hint */}
          {showHint && (
            <motion.div
              className="mt-4 text-center text-amber-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p>
                Interact with the panda and collect bamboo to speed up loading!
              </p>
            </motion.div>
          )}
        </div>

        {/* Chinese characters with custom animations */}
        <motion.div
          className="flex justify-center space-x-8 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="relative"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{ repeat: Infinity, duration: 6 }}
          >
            <span className="text-6xl text-white filter drop-shadow-glow">
              游
            </span>
            <div className="absolute inset-0 blur-md bg-emerald-500 bg-opacity-50 rounded-full -z-10 animate-pulse"></div>
          </motion.div>
          <motion.div
            className="relative"
            animate={{
              y: [0, -10, 0],
              rotate: [0, -5, 0, 5, 0],
            }}
            transition={{ repeat: Infinity, duration: 6, delay: 0.3 }}
          >
            <span className="text-6xl text-white filter drop-shadow-glow">
              记
            </span>
            <div className="absolute inset-0 blur-md bg-amber-500 bg-opacity-50 rounded-full -z-10 animate-pulse"></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroAnimation;
