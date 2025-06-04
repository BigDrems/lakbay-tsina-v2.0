import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Users,
  ChefHat,
  Utensils,
} from "lucide-react";

const RecipeCard = ({ recipe }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-[#6B3100]/10 hover:border-[#6B3100]/20 transition-all duration-300">
      {/* Recipe Header */}
      <div
        className="p-5 cursor-pointer hover:bg-[#6B3100]/5 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#6B3100] mb-2">
              {recipe.name}
            </h3>
            <p className="text-[#6B3100]/70 mb-3">{recipe.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-[#6B3100]/70">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.cookingTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Serves {recipe.servings}</span>
              </div>
              <div className="flex items-center gap-1">
                <ChefHat className="w-4 h-4" />
                <span>{recipe.difficulty}</span>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-[#6B3100]/10 rounded-full transition-colors">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-[#6B3100]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B3100]" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-[#6B3100]/10 animate-slideDown">
          <div className="p-5 space-y-6">
            {/* Ingredients Section */}
            <div>
              <h4 className="text-lg font-semibold text-[#6B3100] mb-3 flex items-center gap-2">
                <ChefHat className="w-5 h-5" />
                Ingredients
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg bg-[#6B3100]/5 hover:bg-[#6B3100]/10 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#6B3100]" />
                    <span className="text-[#6B3100]/80">
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cooking Methods Section */}
            <div>
              <h4 className="text-lg font-semibold text-[#6B3100] mb-3 flex items-center gap-2">
                <Utensils className="w-5 h-5" />
                Cooking Methods
              </h4>
              <div className="space-y-4">
                {recipe.methods.map((method, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-[#6B3100]/5 hover:bg-[#6B3100]/10 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#6B3100] text-white flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h5 className="font-medium text-[#6B3100] mb-1">
                          {method.name}
                        </h5>
                        <p className="text-[#6B3100]/70 text-sm">
                          {method.description}
                        </p>
                        {method.tips && (
                          <p className="mt-2 text-sm text-[#6B3100]/60 italic">
                            Tip: {method.tips}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            {recipe.notes && (
              <div className="p-4 rounded-lg bg-[#FFF5E6] border border-[#6B3100]/10">
                <h4 className="text-lg font-semibold text-[#6B3100] mb-2">
                  Chef's Notes
                </h4>
                <p className="text-[#6B3100]/70">{recipe.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
