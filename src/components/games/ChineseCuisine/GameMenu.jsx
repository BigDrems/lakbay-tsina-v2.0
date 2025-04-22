import React from "react";
import { motion } from "framer-motion";

const GameMenu = ({ onStartGame }) => {
  return (
    <div className="py-4">
      <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
        Learn to cook famous Chinese dishes and discover the rich culinary
        traditions of China!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStartGame("easy")}
          className="bg-green-100 text-green-800 border-2 border-green-300 rounded-lg p-4 flex flex-col items-center"
        >
          <span className="font-bold text-lg">Easy</span>
          <span className="text-sm mt-1">Simple Dishes</span>
          <span className="text-sm">120 seconds</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStartGame("medium")}
          className="bg-yellow-100 text-yellow-800 border-2 border-yellow-300 rounded-lg p-4 flex flex-col items-center"
        >
          <span className="font-bold text-lg">Medium</span>
          <span className="text-sm mt-1">Popular Dishes</span>
          <span className="text-sm">90 seconds</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStartGame("hard")}
          className="bg-red-100 text-red-800 border-2 border-red-300 rounded-lg p-4 flex flex-col items-center"
        >
          <span className="font-bold text-lg">Hard</span>
          <span className="text-sm mt-1">Complex Dishes</span>
          <span className="text-sm">60 seconds</span>
        </motion.button>
      </div>
    </div>
  );
};

export default GameMenu;
