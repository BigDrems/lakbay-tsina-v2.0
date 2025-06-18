import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star } from "lucide-react";

const GameResult = ({
  score,
  currentRecipe,
  usedIngredients,
  showFact,
  setShowFact,
  onResetGame,
  onPlayAgain,
  difficultyLevel,
  arrangedSteps,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-6 sm:py-8"
    >
      <h2 className="text-lg sm:text-2xl font-bold text-[#6B3100] mb-3">
        {score >= 50 ? "Masarap na Putahe!" : "Tapos na ang oras!"}
      </h2>
      <p className="text-sm sm:text-lg mb-2">
        Naghanda ka ng {arrangedSteps?.length || 0} sa{" "}
        {currentRecipe?.steps.length || 0} hakbang sa pagluluto
      </p>
      <p className="text-xs sm:text-sm mb-4">
        at gumamit ng {usedIngredients?.length || 0} sa{" "}
        {currentRecipe?.ingredients.length || 0} tamang sangkap
      </p>

      <div className="text-base sm:text-xl font-bold mb-6 flex items-center justify-center gap-2">
        <Trophy size={20} className="text-yellow-500" />
        <span>Iyong Puntos: {score}</span>
      </div>

      {!showFact && currentRecipe && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowFact(true)}
          className="bg-[#F5E6D3] text-[#6B3100] px-4 py-2 rounded-lg mb-6 mx-auto"
        >
          Matuto ng katotohanan tungkol sa {currentRecipe.name}
        </motion.button>
      )}

      {showFact && currentRecipe && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#F5E6D3] p-3 rounded-lg mb-6 max-w-md mx-auto"
        >
          <h3 className="font-semibold text-[#6B3100]">
            Kagiliw-giliw na Katotohanan:
          </h3>
          <p className="text-sm mt-1">{currentRecipe.funFact}</p>
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onResetGame}
          className="bg-[#6B3100] text-white px-6 py-3 rounded-lg hover:bg-[#6B3100]/90 transition-colors text-sm sm:text-base"
        >
          Bumalik sa Menu
        </button>
        <button
          onClick={() => onPlayAgain(difficultyLevel)}
          className="bg-white text-[#6B3100] border-2 border-[#6B3100] px-6 py-3 rounded-lg hover:bg-[#6B3100]/10 transition-colors text-sm sm:text-base"
        >
          Laruin Muli
        </button>
      </div>
    </motion.div>
  );
};

export default GameResult;
