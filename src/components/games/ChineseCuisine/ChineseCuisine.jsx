import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  RefreshCw,
  Clock,
  HelpCircle,
  ChefHat,
  BookOpen,
} from "lucide-react";

// Import components
import { useGameState, generateAvailableIngredients } from "./gameUtils";
import GameMenu from "./GameMenu";
import IngredientSelection from "./IngredientSelection";
import StepArrangement from "./StepArrangement";
import GameResult from "./GameResult";
import HelpDialog from "./HelpDialog";
import RecipeDetails from "./RecipeDetails";
import LearnMoreDialog from "./LearnMoreDialog";

const ChineseCuisine = () => {
  const navigate = useNavigate();
  const {
    gameMode,
    difficultyLevel,
    currentRecipe,
    score,
    timeLeft,
    showHelp,
    showFact,
    showFeedback,
    setShowFact,
    setScore,
    startGame,
    endGame,
    resetGame,
    toggleHelp,
    displayFeedback,
  } = useGameState();

  const [currentStep, setCurrentStep] = useState(0);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [arrangedSteps, setArrangedSteps] = useState([]);
  const [showLearnMore, setShowLearnMore] = useState(false);

  const handleStartGame = (difficulty) => {
    const recipe = startGame(difficulty);
    setCurrentStep(0);
    setUsedIngredients([]);
    setArrangedSteps([]);
    setAvailableIngredients(generateAvailableIngredients(recipe));
  };

  const handleIngredientSelectionComplete = (ingredients) => {
    setUsedIngredients(ingredients);
    setCurrentStep(1);
  };

  const handleStepArrangementComplete = (steps) => {
    setArrangedSteps(steps);
    endGame();
  };

  const handleBackToMenu = () => {
    resetGame();
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <button
            onClick={() => navigate("/entertainment")}
            className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base transition-colors"
          >
            <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
            {gameMode === "playing" && (
              <>
                <div className="text-[#6B3100] font-medium text-sm sm:text-base flex items-center gap-1 bg-white/50 px-2 py-1 rounded">
                  <Clock size={16} className="sm:w-5 sm:h-5" />
                  <span>{timeLeft}s</span>
                </div>
                <div className="text-[#6B3100] font-medium text-sm sm:text-base bg-white/50 px-2 py-1 rounded">
                  Score: {score}
                </div>
              </>
            )}
            {gameMode !== "menu" && (
              <button
                onClick={resetGame}
                className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base transition-colors bg-white/50 px-2 py-1 rounded hover:bg-white/70"
              >
                <RefreshCw size={16} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
            <button
              onClick={() => setShowLearnMore(true)}
              className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base transition-colors bg-white/50 px-2 py-1 rounded hover:bg-white/70"
            >
              <BookOpen size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Learn</span>
            </button>
            <button
              onClick={toggleHelp}
              className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base transition-colors bg-white/50 px-2 py-1 rounded hover:bg-white/70"
            >
              <HelpCircle size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Help</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#6B3100] mb-4 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <ChefHat className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="leading-tight">Chinese Cooking Master</span>
            </div>
          </h1>

          {showHelp && <HelpDialog onClose={toggleHelp} />}

          {gameMode === "menu" ? (
            <GameMenu onStartGame={handleStartGame} />
          ) : gameMode === "complete" ? (
            <GameResult
              score={score}
              currentRecipe={currentRecipe}
              usedIngredients={usedIngredients}
              arrangedSteps={arrangedSteps}
              showFact={showFact}
              setShowFact={setShowFact}
              onResetGame={handleBackToMenu}
              onPlayAgain={handleStartGame}
              difficultyLevel={difficultyLevel}
            />
          ) : (
            // Game playing mode
            <div className="py-4">
              {currentRecipe && (
                <>
                  <RecipeDetails
                    currentRecipe={currentRecipe}
                    showFeedback={showFeedback}
                  />

                  {currentStep === 0 ? (
                    <IngredientSelection
                      currentRecipe={currentRecipe}
                      availableIngredients={availableIngredients}
                      onComplete={handleIngredientSelectionComplete}
                      setScore={setScore}
                      displayFeedback={displayFeedback}
                    />
                  ) : (
                    <StepArrangement
                      currentRecipe={currentRecipe}
                      onComplete={handleStepArrangementComplete}
                      setScore={setScore}
                      displayFeedback={displayFeedback}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {showLearnMore && (
        <LearnMoreDialog onClose={() => setShowLearnMore(false)} />
      )}
    </div>
  );
};

export default ChineseCuisine;
