import React, { useState } from "react";
import { X, ChevronRight, ChevronLeft, BookOpen } from "lucide-react";
import RecipeCard from "./RecipeCard";
import recipeData from "../../../../src/data/chineseRecipes.json";

const LearnMoreDialog = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const recipePages = recipeData.pages.map((page, index) => ({
    ...page,
    items: recipeData.recipes,
  }));

  const currentContent = recipePages[currentPage];

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gradient-to-br from-white to-[#FFF5E6] rounded-2xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl transform transition-all duration-300 animate-slideUp">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 p-6 border-b border-[#6B3100]/10 bg-gradient-to-r from-[#6B3100]/5 to-transparent">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-[#6B3100]" />
              <div>
                <h2 className="text-2xl font-bold text-[#6B3100]">
                  Chinese Recipes
                </h2>
                <p className="text-[#6B3100]/70 text-sm mt-1">
                  Discover authentic Chinese dishes
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#6B3100]/10 rounded-full transition-colors duration-200"
            >
              <X className="w-6 h-6 text-[#6B3100]" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto min-h-0 p-6 bg-gradient-to-br from-white/50 to-[#FFF5E6]/50">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-[#6B3100] mb-2">
              {currentContent.title}
            </h3>
            <p className="text-[#6B3100]/70 italic">
              {currentContent.subtitle}
            </p>
          </div>

          <div className="space-y-6">
            {currentContent.items.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        </div>

        {/* Navigation - Fixed */}
        {recipePages.length > 1 && (
          <div className="flex-shrink-0 p-4 border-t border-[#6B3100]/10 bg-white/80 backdrop-blur-sm">
            <div className="flex justify-between items-center max-w-2xl mx-auto">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#6B3100]/5 text-[#6B3100] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#6B3100]/10 transition-colors duration-200 font-medium"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: recipePages.length }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                      currentPage === i
                        ? "bg-[#6B3100] w-8"
                        : "bg-[#6B3100]/30 hover:bg-[#6B3100]/50"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() =>
                  setCurrentPage(
                    Math.min(recipePages.length - 1, currentPage + 1)
                  )
                }
                disabled={currentPage === recipePages.length - 1}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#6B3100]/5 text-[#6B3100] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#6B3100]/10 transition-colors duration-200 font-medium"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnMoreDialog;
