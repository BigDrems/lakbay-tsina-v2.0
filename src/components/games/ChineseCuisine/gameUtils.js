import { useState, useEffect } from "react";
import { recipes } from "./recipeData";
import {
  playSound,
  playBackgroundMusic,
  stopBackgroundMusic,
} from "../../../utils/soundManager";

// Hook for game state management
export const useGameState = () => {
  const [gameMode, setGameMode] = useState("menu"); // menu, playing, complete
  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameTimer, setGameTimer] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const [showFeedback, setShowFeedback] = useState(null);

  // Cleanup timer and stop music on unmount
  useEffect(() => {
    // Start background music when component mounts
    playBackgroundMusic();

    return () => {
      if (gameTimer) clearInterval(gameTimer);
      stopBackgroundMusic();
    };
  }, [gameTimer]);

  const startGame = (difficulty) => {
    setDifficultyLevel(difficulty);
    playSound("correct"); // Play sound when starting the game

    // Filter recipes by difficulty
    const filteredRecipes = recipes.filter(
      (recipe) => recipe.difficulty === difficulty
    );

    // Select a random recipe from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
    const randomRecipe = filteredRecipes[randomIndex];
    setCurrentRecipe(randomRecipe);

    // Setup timer based on difficulty
    let time = 120;
    if (difficulty === "easy") time = 120;
    if (difficulty === "medium") time = 90;
    if (difficulty === "hard") time = 60;

    setTimeLeft(time);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setGameTimer(timer);
    setScore(0);
    setGameMode("playing");
    setShowFact(false);

    return randomRecipe;
  };

  const endGame = () => {
    if (gameTimer) clearInterval(gameTimer);
    setGameMode("complete");
    playSound("complete");
  };

  const resetGame = () => {
    if (gameTimer) clearInterval(gameTimer);
    setGameMode("menu");
    setShowFact(false);
    setShowHelp(false);
  };

  const toggleHelp = () => {
    setShowHelp((prev) => !prev);
  };

  const displayFeedback = (type, message) => {
    setShowFeedback({ type, message });
    if (type === "success") {
      playSound("correct");
    } else if (type === "error") {
      playSound("wrong");
    }

    // Clear feedback after 1.5 seconds
    setTimeout(() => {
      setShowFeedback(null);
    }, 1500);
  };

  return {
    gameMode,
    setGameMode,
    difficultyLevel,
    setDifficultyLevel,
    currentRecipe,
    setCurrentRecipe,
    score,
    setScore,
    timeLeft,
    setTimeLeft,
    gameTimer,
    setGameTimer,
    showHelp,
    setShowHelp,
    showFact,
    setShowFact,
    showFeedback,
    setShowFeedback,
    startGame,
    endGame,
    resetGame,
    toggleHelp,
    displayFeedback,
  };
};

// Utility function to generate available ingredients
export const generateAvailableIngredients = (recipe) => {
  // Create a more diverse set of wrong ingredients
  const allAvailableIngredients = [
    // Western ingredients
    "Ketchup",
    "Cheese",
    "Butter",
    "Milk",
    "Yogurt",
    "Potatoes",
    "Tomatoes",
    "Olives",
    "Broccoli",
    "Corn",
    "Basil",
    "Oregano",
    "Thyme",
    "Rosemary",
    "Cilantro",
    // More Asian ingredients that might confuse
    "Lemongrass",
    "Galangal",
    "Fish Sauce",
    "Coconut Milk",
    "Thai Basil",
    "Wasabi",
    "Mirin",
    "Dashi",
    "Nori",
    "Rice Vinegar",
    "Kimchi",
    "Gochujang",
    "Seaweed",
    "Miso",
    "Sake",
  ];

  // Remove any ingredients that are actually in the recipe
  const wrongIngredients = allAvailableIngredients.filter(
    (ingredient) => !recipe.ingredients.includes(ingredient)
  );

  // Shuffle the wrong ingredients and take some based on difficulty
  const shuffledWrong = [...wrongIngredients].sort(() => Math.random() - 0.5);
  let wrongCount = 6; // Default for easy
  if (recipe.difficulty === "medium") wrongCount = 8;
  if (recipe.difficulty === "hard") wrongCount = 10;

  // Combine correct and wrong ingredients, then shuffle
  const allIngredients = [
    ...recipe.ingredients,
    ...shuffledWrong.slice(0, wrongCount),
  ].sort(() => Math.random() - 0.5);

  return allIngredients;
};
