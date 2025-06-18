import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const RecipeDetails = ({ currentRecipe, showFeedback }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="w-full sm:w-1/3">
        <div className="rounded-lg overflow-hidden h-32 sm:h-48">
          <img
            src={currentRecipe.image}
            alt={currentRecipe.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="w-full sm:w-2/3">
        <h2 className="text-lg sm:text-xl font-bold text-[#6B3100] mb-1">
          {currentRecipe.name}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-2">
          Lutuing {currentRecipe.region} • {currentRecipe.preparationTime}
        </p>
        <p className="text-xs sm:text-sm mb-3">{currentRecipe.description}</p>

        {showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-2 rounded-md mb-2 text-sm ${
              showFeedback.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {showFeedback.type === "success" ? (
              <Check size={16} className="inline mr-1" />
            ) : (
              <X size={16} className="inline mr-1" />
            )}
            {showFeedback.message}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
