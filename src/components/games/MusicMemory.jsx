import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  RefreshCw,
  Check,
  Clock,
  HelpCircle,
  ChefHat,
  UtensilsCrossed,
  Trophy,
  Star,
  X,
  Flame,
  Utensils,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const recipes = [
  {
    id: 1,
    name: "Kung Pao Chicken",
    difficulty: "easy",
    description:
      "A spicy stir-fry dish with chicken, peanuts, vegetables, and chili peppers",
    image: "/images/guzheng.jpg", // Reusing existing images as placeholders
    region: "Sichuan",
    preparationTime: "25 minutes",
    ingredients: [
      "Chicken",
      "Peanuts",
      "Bell Peppers",
      "Dried Chili",
      "Sichuan Peppercorns",
      "Soy Sauce",
    ],
    steps: [
      "Dice chicken into small cubes",
      "Dry-fry the peanuts",
      "Stir-fry chicken until golden",
      "Add vegetables and spices",
      "Mix in sauce and peanuts",
      "Serve hot with rice",
    ],
    funFact:
      "Kung Pao chicken is named after a Qing Dynasty official, Ding Baozhen, whose title was 'Gong Bao'",
  },
  {
    id: 2,
    name: "Dim Sum",
    difficulty: "medium",
    description: "A variety of small dishes traditionally served with tea",
    image: "/images/erhu.jpg", // Reusing existing images as placeholders
    region: "Cantonese",
    preparationTime: "45 minutes",
    ingredients: [
      "Wheat Flour",
      "Rice Flour",
      "Shrimp",
      "Pork",
      "Bamboo Shoots",
      "Shiitake Mushrooms",
    ],
    steps: [
      "Prepare the dough",
      "Mix filling ingredients",
      "Wrap filling in dough",
      "Steam for 8-10 minutes",
      "Serve with dipping sauces",
      "Enjoy with tea",
    ],
    funFact:
      "Dim Sum means 'touch the heart' in Cantonese and originated from teahouses along the Silk Road",
  },
  {
    id: 3,
    name: "Peking Duck",
    difficulty: "hard",
    description: "Famous roast duck known for its thin, crispy skin",
    image: "/images/pipa.jpg", // Reusing existing images as placeholders
    region: "Beijing",
    preparationTime: "2 days",
    ingredients: [
      "Whole Duck",
      "Honey",
      "Chinese Five Spice",
      "Soy Sauce",
      "Scallions",
      "Cucumber",
    ],
    steps: [
      "Clean and dry the duck",
      "Air-dry for 24 hours",
      "Brush with honey mixture",
      "Roast until crispy",
      "Slice the meat and skin",
      "Serve with pancakes",
    ],
    funFact:
      "Peking Duck dates back to the imperial era and was prepared for the Emperor of China in the Yuan Dynasty",
  },
  {
    id: 4,
    name: "Mapo Tofu",
    difficulty: "easy",
    description: "Spicy tofu dish with minced meat in fermented bean sauce",
    image: "/images/dizi.jpg", // Reusing existing images as placeholders
    region: "Sichuan",
    preparationTime: "20 minutes",
    ingredients: [
      "Soft Tofu",
      "Ground Pork",
      "Doubanjiang",
      "Sichuan Peppercorns",
      "Garlic",
      "Green Onions",
    ],
    steps: [
      "Cut tofu into cubes",
      "Stir-fry ground pork",
      "Add doubanjiang and spices",
      "Gently add tofu",
      "Simmer for 5 minutes",
      "Sprinkle with peppercorns",
    ],
    funFact:
      "Mapo Tofu was created by a pockmarked (ma) woman (po) in the 1800s, which is how the dish got its name",
  },
  {
    id: 5,
    name: "Hot Pot",
    difficulty: "medium",
    description:
      "A communal meal with a simmering pot of soup stock and various ingredients",
    image: "/images/yangqin.jpg", // Reusing existing images as placeholders
    region: "Chongqing",
    preparationTime: "40 minutes",
    ingredients: [
      "Beef Slices",
      "Fish Balls",
      "Tofu",
      "Napa Cabbage",
      "Enoki Mushrooms",
      "Chili Oil",
    ],
    steps: [
      "Prepare broth with spices",
      "Arrange raw ingredients",
      "Heat broth to boiling",
      "Cook ingredients in broth",
      "Dip in sauce before eating",
      "Add more broth as needed",
    ],
    funFact:
      "Hot pot has a history of over 1,000 years and was originally used by Mongolian warriors who used their helmets as cooking vessels",
  },
  {
    id: 6,
    name: "Spring Rolls",
    difficulty: "easy",
    description:
      "Cylindrical pastries filled with vegetables and sometimes meat",
    image: "/images/gong.jpg", // Reusing existing images as placeholders
    region: "Various regions",
    preparationTime: "30 minutes",
    ingredients: [
      "Spring Roll Wrappers",
      "Bean Sprouts",
      "Carrots",
      "Cabbage",
      "Mushrooms",
      "Garlic",
    ],
    steps: [
      "Chop vegetables finely",
      "Stir-fry filling until soft",
      "Let filling cool",
      "Wrap filling in wrappers",
      "Deep fry until golden",
      "Serve with dipping sauce",
    ],
    funFact:
      "Spring rolls got their name because they were traditionally eaten during the Spring Festival to welcome the new season",
  },
  {
    id: 7,
    name: "Xiaolongbao",
    difficulty: "hard",
    description:
      "Soup dumplings with a thin wrapper filled with meat and rich broth",
    image: "/images/dizi.jpg",
    region: "Shanghai",
    preparationTime: "2 hours",
    ingredients: [
      "Flour",
      "Ground Pork",
      "Gelatin",
      "Ginger",
      "Sesame Oil",
      "Green Onions",
    ],
    steps: [
      "Make gelatin-rich broth",
      "Chill until solid",
      "Dice and mix with meat",
      "Roll out thin wrappers",
      "Fold dumplings carefully",
      "Steam for 8 minutes",
    ],
    funFact:
      "Xiaolongbao gets its soup filling from gelatin that melts during cooking, creating the signature soupy interior",
  },
  {
    id: 8,
    name: "Zhajiangmian",
    difficulty: "medium",
    description:
      "Hand-pulled noodles topped with minced pork in fermented soybean sauce",
    image: "/images/guzheng.jpg",
    region: "Beijing",
    preparationTime: "35 minutes",
    ingredients: [
      "Wheat Noodles",
      "Ground Pork",
      "Sweet Bean Sauce",
      "Cucumber",
      "Garlic",
      "Soybean Paste",
    ],
    steps: [
      "Prepare fresh noodles",
      "Stir-fry ground pork",
      "Add sweet bean sauce",
      "Simmer sauce until thick",
      "Cook and drain noodles",
      "Top noodles with sauce and vegetables",
    ],
    funFact:
      "Zhajiangmian is often called 'Chinese spaghetti bolognese' but dates back over 300 years, predating Italian influence",
  },
  {
    id: 9,
    name: "Char Siu",
    difficulty: "medium",
    description: "Cantonese-style barbecued pork with a sweet and savory glaze",
    image: "/images/pipa.jpg",
    region: "Guangdong",
    preparationTime: "24 hours",
    ingredients: [
      "Pork Shoulder",
      "Hoisin Sauce",
      "Five-Spice Powder",
      "Soy Sauce",
      "Honey",
      "Red Food Coloring",
    ],
    steps: [
      "Slice pork into strips",
      "Marinate overnight",
      "Prepare roasting rack",
      "Roast and baste regularly",
      "Rest meat before slicing",
      "Reduce marinade for sauce",
    ],
    funFact:
      "The signature red color traditionally comes from red fermented bean curd, though many restaurants now use food coloring",
  },
  {
    id: 10,
    name: "Congee",
    difficulty: "easy",
    description:
      "Comforting rice porridge that can be served plain or with various toppings",
    image: "/images/yangqin.jpg",
    region: "All over China",
    preparationTime: "1 hour",
    ingredients: [
      "Rice",
      "Chicken Stock",
      "Ginger",
      "Century Egg",
      "Green Onions",
      "White Pepper",
    ],
    steps: [
      "Rinse rice thoroughly",
      "Simmer rice in stock",
      "Stir occasionally",
      "Cook until creamy",
      "Add toppings of choice",
      "Season to taste",
    ],
    funFact:
      "Congee is considered a healing food in Chinese medicine and is often served to those who are ill to aid recovery",
  },
  {
    id: 11,
    name: "Dan Dan Noodles",
    difficulty: "medium",
    description:
      "Spicy Sichuan noodles with chili oil, minced pork and preserved vegetables",
    image: "/images/erhu.jpg",
    region: "Sichuan",
    preparationTime: "30 minutes",
    ingredients: [
      "Wheat Noodles",
      "Ground Pork",
      "Chili Oil",
      "Sichuan Peppercorns",
      "Preserved Vegetables",
      "Sesame Paste",
    ],
    steps: [
      "Make chili oil mixture",
      "Brown ground pork",
      "Boil noodles until al dente",
      "Mix sauce ingredients",
      "Combine noodles with sauce",
      "Top with meat and peanuts",
    ],
    funFact:
      "The name comes from the carrying pole (dan dan) that street vendors used to carry their noodles and cooking equipment",
  },
  {
    id: 12,
    name: "Beggar's Chicken",
    difficulty: "hard",
    description:
      "Whole chicken wrapped in lotus leaves and clay, then baked until tender",
    image: "/images/gong.jpg",
    region: "Hangzhou",
    preparationTime: "4 hours",
    ingredients: [
      "Whole Chicken",
      "Lotus Leaves",
      "Shaoxing Wine",
      "Mushrooms",
      "Clay or Dough",
      "Ginger",
    ],
    steps: [
      "Marinate the chicken",
      "Stuff with mushrooms and ham",
      "Wrap in lotus leaves",
      "Seal in clay or dough",
      "Bake for 3 hours",
      "Crack open at the table",
    ],
    funFact:
      "Legend says a beggar stole a chicken and buried it in mud to cook it without detection, accidentally creating this delicious dish",
  },
];

const ChineseCuisineGame = () => {
  const navigate = useNavigate();
  const [gameMode, setGameMode] = useState("menu"); // menu, playing, complete
  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameTimer, setGameTimer] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const [draggedIngredient, setDraggedIngredient] = useState(null);
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [correctSteps, setCorrectSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [showFeedback, setShowFeedback] = useState(null);

  useEffect(() => {
    // Cleanup function
    return () => {
      if (gameTimer) clearInterval(gameTimer);
    };
  }, []);

  const startGame = (difficulty) => {
    setDifficultyLevel(difficulty);

    // Filter recipes by difficulty
    const filteredRecipes = recipes.filter(
      (recipe) => recipe.difficulty === difficulty
    );

    // Select a random recipe from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
    const randomRecipe = filteredRecipes[randomIndex];
    setCurrentRecipe(randomRecipe);

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
      (ingredient) => !randomRecipe.ingredients.includes(ingredient)
    );

    // Shuffle the wrong ingredients and take some based on difficulty
    const shuffledWrong = [...wrongIngredients].sort(() => Math.random() - 0.5);
    let wrongCount = 6; // Default for easy
    if (difficulty === "medium") wrongCount = 8;
    if (difficulty === "hard") wrongCount = 10;

    // Combine correct and wrong ingredients, then shuffle
    const allIngredients = [
      ...randomRecipe.ingredients,
      ...shuffledWrong.slice(0, wrongCount),
    ].sort(() => Math.random() - 0.5);

    setAvailableIngredients(allIngredients);

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
    setUsedIngredients([]);
    setCorrectSteps([]);
    setCurrentStep(0);
    setGameMode("playing");
    setShowFact(false);
  };

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
        setShowFeedback({
          type: "success",
          message: "Correct ingredient!",
        });
      }
    } else {
      // Wrong ingredient
      setScore((prev) => Math.max(0, prev - 2));
      setShowFeedback({
        type: "error",
        message: "Wrong ingredient!",
      });
    }

    // Clear feedback after 1.5 seconds
    setTimeout(() => {
      setShowFeedback(null);
    }, 1500);

    setDraggedIngredient(null);

    // Check if all correct ingredients are used
    if (usedIngredients.length + 1 >= currentRecipe.ingredients.length) {
      // Move to next step (cooking)
      setTimeout(() => {
        setCurrentStep(1);
      }, 1000);
    }
  };

  const handleStepComplete = (step) => {
    if (correctSteps.includes(step)) return;

    setCorrectSteps((prev) => [...prev, step]);
    setScore((prev) => prev + 10);

    // Check if all steps are completed
    if (correctSteps.length + 1 >= currentRecipe.steps.length) {
      if (gameTimer) clearInterval(gameTimer);
      endGame();
    }
  };

  const endGame = () => {
    if (gameTimer) clearInterval(gameTimer);
    setGameMode("complete");
  };

  const resetGame = () => {
    if (gameTimer) clearInterval(gameTimer);
    setGameMode("menu");
    setShowFact(false);
    setShowHelp(false);
    setDraggedIngredient(null);
    setUsedIngredients([]);
    setCorrectSteps([]);
    setCurrentStep(0);
  };

  const toggleHelp = () => {
    setShowHelp((prev) => !prev);
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
            <span>Back</span>
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

          {showHelp && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#F5E6D3] p-3 rounded-lg mb-4 text-sm"
            >
              <h3 className="font-semibold mb-1">How to Play:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Select the correct ingredients for the Chinese dish</li>
                <li>Drag ingredients to the cooking pot</li>
                <li>Follow the cooking steps in the correct order</li>
                <li>Complete the dish before time runs out</li>
                <li>Learn fascinating facts about Chinese cuisine!</li>
              </ul>
              <button
                onClick={toggleHelp}
                className="text-[#6B3100] font-medium mt-2"
              >
                Close
              </button>
            </motion.div>
          )}

          {gameMode === "menu" ? (
            <div className="py-4">
              <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
                Learn to cook famous Chinese dishes and discover the rich
                culinary traditions of China!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startGame("easy")}
                  className="bg-green-100 text-green-800 border-2 border-green-300 rounded-lg p-4 flex flex-col items-center"
                >
                  <span className="font-bold text-lg">Easy</span>
                  <span className="text-sm mt-1">Simple Dishes</span>
                  <span className="text-sm">120 seconds</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startGame("medium")}
                  className="bg-yellow-100 text-yellow-800 border-2 border-yellow-300 rounded-lg p-4 flex flex-col items-center"
                >
                  <span className="font-bold text-lg">Medium</span>
                  <span className="text-sm mt-1">Popular Dishes</span>
                  <span className="text-sm">90 seconds</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startGame("hard")}
                  className="bg-red-100 text-red-800 border-2 border-red-300 rounded-lg p-4 flex flex-col items-center"
                >
                  <span className="font-bold text-lg">Hard</span>
                  <span className="text-sm mt-1">Complex Dishes</span>
                  <span className="text-sm">60 seconds</span>
                </motion.button>
              </div>
            </div>
          ) : gameMode === "complete" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 sm:py-8"
            >
              <h2 className="text-lg sm:text-2xl font-bold text-[#6B3100] mb-3">
                {score >= 50 ? "Delicious Dish!" : "Time's up!"}
              </h2>
              <p className="text-sm sm:text-lg mb-2">
                You prepared {correctSteps.length} of{" "}
                {currentRecipe?.steps.length || 0} cooking steps
              </p>
              <p className="text-xs sm:text-sm mb-4">
                and used {usedIngredients.length} of{" "}
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
                  onClick={() => setGameMode("menu")}
                  className="bg-[#6B3100] text-white px-4 py-2 rounded-lg hover:bg-[#6B3100]/90 transition-colors text-sm sm:text-base"
                >
                  Choose Level
                </button>
                <button
                  onClick={() => startGame(difficultyLevel)}
                  className="bg-[#6B3100]/20 text-[#6B3100] px-4 py-2 rounded-lg hover:bg-[#6B3100]/30 transition-colors text-sm sm:text-base"
                >
                  Cook Again
                </button>
              </div>
            </motion.div>
          ) : (
            // Game playing mode
            <div className="py-4">
              {currentRecipe && (
                <>
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
                        {currentRecipe.region} Cuisine •{" "}
                        {currentRecipe.preparationTime}
                      </p>
                      <p className="text-xs sm:text-sm mb-3">
                        {currentRecipe.description}
                      </p>

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

                  {currentStep === 0 ? (
                    <>
                      <h3 className="font-medium text-[#6B3100] mb-3">
                        Step 1: Select the correct ingredients
                      </h3>
                      <div
                        className="bg-[#F5E6D3]/50 p-3 rounded-lg mb-4 min-h-32 flex items-center justify-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleIngredientDrop}
                      >
                        {usedIngredients.length === 0 ? (
                          <p className="text-gray-500 text-sm italic">
                            Drag ingredients here
                          </p>
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
                              usedIngredients.includes(ingredient)
                                ? "opacity-50"
                                : ""
                            }`}
                          >
                            {ingredient}
                          </motion.div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="font-medium text-[#6B3100] mb-3">
                        Step 2: Follow the cooking steps
                      </h3>
                      <div className="space-y-3">
                        {currentRecipe.steps.map((step, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.01 }}
                            onClick={() => handleStepComplete(index)}
                            className={`p-3 rounded-lg border-2 cursor-pointer flex items-center gap-2 ${
                              correctSteps.includes(index)
                                ? "bg-green-100 border-green-500"
                                : "bg-white border-gray-200 hover:border-[#6B3100]/50"
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                correctSteps.includes(index)
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {correctSteps.includes(index) ? (
                                <Check size={14} />
                              ) : (
                                index + 1
                              )}
                            </div>
                            <span className="text-sm">{step}</span>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChineseCuisineGame;
