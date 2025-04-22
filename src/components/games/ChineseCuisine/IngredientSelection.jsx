import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const IngredientSelection = ({
  currentRecipe,
  availableIngredients,
  onComplete,
  setScore,
  displayFeedback,
}) => {
  const [draggedIngredient, setDraggedIngredient] = useState(null);
  const [usedIngredients, setUsedIngredients] = useState([]);

  useEffect(() => {
    // Check if all correct ingredients are used
    if (
      usedIngredients.length > 0 &&
      usedIngredients.length >= currentRecipe.ingredients.length
    ) {
      // All ingredients selected, move to next step
      setTimeout(() => {
        onComplete(usedIngredients);
      }, 1000);
    }
  }, [usedIngredients, currentRecipe, onComplete]);

  const handleIngredientDrag = (ingredient) => {
    setDraggedIngredient(ingredient);
  };

  const handleIngredientDrop = () => {
    if (!draggedIngredient) return;

    // Check if ingredient belongs in recipe
    if (currentRecipe.ingredients.includes(draggedIngredient)) {
      // Correct ingredient
      if (!usedIngredients.includes(draggedIngredient)) {
        setUsedIngredients((prev) => [...prev, draggedIngredient]);
        setScore((prev) => prev + 5);
        displayFeedback("success", "Correct ingredient!");
      }
    } else {
      // Wrong ingredient
      setScore((prev) => Math.max(0, prev - 2));
      displayFeedback("error", "Wrong ingredient!");
    }

    setDraggedIngredient(null);
  };

  return (
    <div>
      <h3 className="font-medium text-[#6B3100] mb-3">
        Step 1: Select the correct ingredients
      </h3>

      <div
        className="bg-[#F5E6D3]/50 p-3 rounded-lg mb-4 min-h-32 flex items-center justify-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleIngredientDrop}
      >
        {usedIngredients.length === 0 ? (
          <p className="text-gray-500 text-sm italic">Drag ingredients here</p>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center">
            {usedIngredients.map((ingredient, index) => (
              <div
                key={index}
                className="bg-white px-2 py-1 rounded-md text-xs shadow-sm"
              >
                {ingredient}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {availableIngredients.map((ingredient, index) => (
          <motion.div
            key={index}
            draggable
            onDragStart={() => handleIngredientDrag(ingredient)}
            whileHover={{ scale: 1.05 }}
            className={`bg-white border border-gray-200 rounded-md p-2 text-center text-xs sm:text-sm shadow-sm cursor-grab ${
              usedIngredients.includes(ingredient) ? "opacity-50" : ""
            }`}
          >
            {ingredient}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IngredientSelection;
