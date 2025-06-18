import React from "react";
import { motion } from "framer-motion";

const GameMenu = ({ onStartGame }) => {
  return (
    <div className="py-4">
      <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
        Matuto magluto ng mga kilalang putahe ng Tsino at tuklasin ang mayamang
        tradisyon sa pagluluto ng China!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStartGame("easy")}
          className="bg-green-100 text-green-800 border-2 border-green-300 rounded-lg p-4 flex flex-col items-center"
        >
          <span className="font-bold text-lg">Madali</span>
          <span className="text-sm mt-1">Mga Simpleng Putahe</span>
          <span className="text-sm">120 segundo</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStartGame("medium")}
          className="bg-yellow-100 text-yellow-800 border-2 border-yellow-300 rounded-lg p-4 flex flex-col items-center"
        >
          <span className="font-bold text-lg">Katamtaman</span>
          <span className="text-sm mt-1">Mga Sikat na Putahe</span>
          <span className="text-sm">90 segundo</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStartGame("hard")}
          className="bg-red-100 text-red-800 border-2 border-red-300 rounded-lg p-4 flex flex-col items-center"
        >
          <span className="font-bold text-lg">Mahirap</span>
          <span className="text-sm mt-1">Mga Kumplikadong Putahe</span>
          <span className="text-sm">60 segundo</span>
        </motion.button>
      </div>
    </div>
  );
};

export default GameMenu;
