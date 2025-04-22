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
        {score >= 50 ? "Delicious Dish!" : "Time's up!"}
      </h2>
      <p className="text-sm sm:text-lg mb-2">
        You prepared {arrangedSteps?.length || 0} of{" "}
        {currentRecipe?.steps.length || 0} cooking steps
      </p>
      <p className="text-xs sm:text-sm mb-4">
        and used {usedIngredients?.length || 0} of{" "}
        {currentRecipe?.ingredients.length || 0} correct ingredients
      </p>

      <div className="text-base sm:text-xl font-bold mb-6 flex items-center justify-center gap-2">
        <Trophy size={20} className="text-yellow-500" />
        <span>Your Score: {score}</span>
      </div>

      {!showFact && currentRecipe && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowFact(true)}
          className="bg-[#F5E6D3] text-[#6B3100] px-4 py-2 rounded-lg mb-6 mx-auto"
        >
          Learn a fact about {currentRecipe.name}
        </motion.button>
      )}

      {showFact && currentRecipe && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#F5E6D3] p-3 rounded-lg mb-6 max-w-md mx-auto"
        >
          <h3 className="font-semibold text-[#6B3100]">Fun Fact:</h3>
          <p className="text-sm mt-1">{currentRecipe.funFact}</p>
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onResetGame}
          className="bg-[#F5E6D3] text-[#6B3100] font-medium px-4 py-2 rounded-lg border-2 border-[#6B3100] hover:bg-[#F5E6D3]/80 transition-colors text-sm sm:text-base"
        >
          Choose Level
        </button>
        <button
          onClick={() => onPlayAgain(difficultyLevel)}
          className="bg-[#6B3100]/20 text-[#6B3100] px-4 py-2 rounded-lg hover:bg-[#6B3100]/30 transition-colors text-sm sm:text-base"
        >
          Cook Again
        </button>
      </div>
    </motion.div>
  );
};

export default GameResult;
