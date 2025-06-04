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
        <div className="flex flex-row justify-between items-center mb-4 gap-2">
          <button
            onClick={() => navigate("/entertainment")}
            className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base"
          >
            <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
          </button>
          <div className="flex items-center gap-2">
            {gameMode === "playing" && (
              <>
                <div className="text-[#6B3100] font-medium text-sm sm:text-base flex items-center gap-1">
                  <Clock size={16} className="sm:w-5 sm:h-5" />
                  <span>{timeLeft}s</span>
                </div>
                <div className="text-[#6B3100] font-medium text-sm sm:text-base">
                  Score: {score}
                </div>
              </>
            )}
            {gameMode !== "menu" && (
              <button
                onClick={resetGame}
                className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base"
              >
                <RefreshCw size={16} className="sm:w-5 sm:h-5" />
                <span>Reset</span>
              </button>
            )}
            <button
              onClick={() => setShowLearnMore(true)}
              className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base"
            >
              <BookOpen size={16} className="sm:w-5 sm:h-5" />
              <span>Learn More</span>
            </button>
            <button
              onClick={toggleHelp}
              className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base"
            >
              <HelpCircle size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
          <h1 className="text-xl sm:text-3xl font-bold text-[#6B3100] mb-2 text-center flex items-center justify-center gap-2">
            <ChefHat className="w-8 h-8" />
            <span>Chinese Cuisine Master</span>
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
