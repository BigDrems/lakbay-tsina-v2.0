import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Check, X, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const dynasties = [
  {
    id: 1,
    name: "Xia Dynasty",
    period: "2070-1600 BCE",
    description: "First dynasty in Chinese history, known for bronze work",
    achievements: "Development of bronze casting, calendar system",
    image: "/images/xia-dynasty.jpg",
  },
  {
    id: 2,
    name: "Shang Dynasty",
    period: "1600-1046 BCE",
    description: "Known for oracle bone inscriptions and bronze work",
    achievements: "First Chinese writing system, advanced bronze technology",
    image: "/images/shang-dynasty.jpg",
  },
  {
    id: 3,
    name: "Zhou Dynasty",
    period: "1046-256 BCE",
    description: "Longest ruling dynasty, introduced Mandate of Heaven",
    achievements: "Confucianism and Taoism emerged, iron technology",
    image: "/images/zhou-dynasty.jpg",
  },
  {
    id: 4,
    name: "Qin Dynasty",
    period: "221-206 BCE",
    description: "First unified Chinese empire, built Great Wall",
    achievements: "Standardized writing, currency, and measurements",
    image: "/images/qin-dynasty.jpg",
  },
  {
    id: 5,
    name: "Han Dynasty",
    period: "206 BCE-220 CE",
    description: "Golden age of Chinese civilization",
    achievements:
      "Silk Road established, paper invented, Confucianism official",
    image: "/images/han-dynasty.jpg",
  },
  {
    id: 6,
    name: "Tang Dynasty",
    period: "618-907 CE",
    description: "Cultural and artistic flourishing period",
    achievements: "Poetry and art flourished, Buddhism spread",
    image: "/images/tang-dynasty.jpg",
  },
  {
    id: 7,
    name: "Song Dynasty",
    period: "960-1279 CE",
    description: "Period of economic growth and cultural achievement",
    achievements: "Gunpowder, compass, printing technology",
    image: "/images/song-dynasty.jpg",
  },
  {
    id: 8,
    name: "Yuan Dynasty",
    period: "1271-1368 CE",
    description: "Mongol-led dynasty, expanded trade routes",
    achievements: "Marco Polo's travels, paper money widely used",
    image: "/images/yuan-dynasty.jpg",
  },
  {
    id: 9,
    name: "Ming Dynasty",
    period: "1368-1644 CE",
    description: "Known for maritime expeditions and porcelain",
    achievements: "Great Wall completed, Forbidden City built",
    image: "/images/ming-dynasty.jpg",
  },
  {
    id: 10,
    name: "Qing Dynasty",
    period: "1644-1912 CE",
    description: "Last imperial dynasty of China",
    achievements: "Territorial expansion, cultural preservation",
    image: "/images/qing-dynasty.jpg",
  },
];

const DynastyTimeline = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState("intro"); // intro, playing, complete
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedDynasty, setSelectedDynasty] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // Initialize the game
    resetGame();
  }, []);

  const resetGame = () => {
    setGameState("intro");
    setScore(0);
    setAttempts(0);
    setCurrentLevel(1);
    setSelectedDynasty(null);
    setFeedback(null);
    setShowInfo(false);
  };

  const startGame = () => {
    setGameState("playing");
  };

  const handleDynastySelect = (dynasty) => {
    if (gameState !== "playing") return;

    setSelectedDynasty(dynasty);
    setAttempts((prev) => prev + 1);

    // Check if the selected dynasty matches the current level
    if (dynasty.id === currentLevel) {
      // Correct dynasty selected
      setScore((prev) => prev + 10);
      setFeedback({
        type: "success",
        message: "Correct! You've identified the dynasty correctly.",
      });

      // Move to next level or complete the game
      if (currentLevel === dynasties.length) {
        setTimeout(() => {
          setGameState("complete");
        }, 1500);
      } else {
        setTimeout(() => {
          setCurrentLevel((prev) => prev + 1);
          setSelectedDynasty(null);
          setFeedback(null);
        }, 1500);
      }
    } else {
      // Wrong dynasty selected
      const correctDynasty = dynasties.find((d) => d.id === currentLevel);
      setFeedback({
        type: "error",
        message: `Incorrect. This is not the dynasty we're looking for.`,
      });

      // Clear feedback after 2 seconds
      setTimeout(() => {
        setSelectedDynasty(null);
        setFeedback(null);
      }, 2000);
    }
  };

  const getCurrentDynastyInfo = () => {
    return dynasties.find((d) => d.id === currentLevel);
  };

  const renderIntroScreen = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-8"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-[#6B3100] mb-4">
        Dynasty Explorer
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto">
        Test your knowledge of Chinese dynasties! Identify each dynasty based on
        clues about their achievements and historical significance.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <button
          onClick={startGame}
          className="bg-[#6B3100] text-white px-6 py-3 rounded-lg hover:bg-[#6B3100]/90 transition-colors text-sm sm:text-base"
        >
          Start Game
        </button>
        <button
          onClick={() => setShowInfo(true)}
          className="bg-white text-[#6B3100] border-2 border-[#6B3100] px-6 py-3 rounded-lg hover:bg-[#6B3100]/10 transition-colors text-sm sm:text-base flex items-center justify-center gap-2"
        >
          <Info size={16} />
          <span>How to Play</span>
        </button>
      </div>

      {showInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto text-left"
        >
          <h3 className="font-bold text-[#6B3100] mb-2">How to Play:</h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            <li>You'll be shown information about a Chinese dynasty</li>
            <li>Select the correct dynasty from the options provided</li>
            <li>Score points for each correct identification</li>
            <li>Complete all levels to win the game</li>
          </ol>
          <button
            onClick={() => setShowInfo(false)}
            className="mt-4 text-[#6B3100] text-sm font-medium"
          >
            Got it, let's play!
          </button>
        </motion.div>
      )}
    </motion.div>
  );

  const renderGameScreen = () => {
    const currentDynasty = getCurrentDynastyInfo();

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <div className="text-[#6B3100] font-medium">
            Level: {currentLevel} / {dynasties.length}
          </div>
          <div className="text-[#6B3100] font-medium">Score: {score}</div>
        </div>

        <div className="bg-[#6B3100]/5 p-4 rounded-lg border border-[#6B3100]/20">
          <h3 className="font-semibold text-[#6B3100] mb-2">
            Identify this dynasty:
          </h3>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Period:</span>{" "}
              {currentDynasty.period}
            </p>
            <p className="text-sm">
              <span className="font-medium">Description:</span>{" "}
              {currentDynasty.description}
            </p>
            <p className="text-sm">
              <span className="font-medium">Achievements:</span>{" "}
              {currentDynasty.achievements}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dynasties.map((dynasty) => (
            <motion.button
              key={dynasty.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                p-3 rounded-lg border-2 text-left
                ${
                  selectedDynasty?.id === dynasty.id
                    ? "bg-[#6B3100]/10 border-[#6B3100]"
                    : "bg-white border-gray-300 hover:border-[#6B3100]/50"
                }
              `}
              onClick={() => handleDynastySelect(dynasty)}
              disabled={selectedDynasty !== null}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                  <img
                    src={dynasty.image}
                    alt={dynasty.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-[#6B3100]">
                    {dynasty.name}
                  </h3>
                  <p className="text-xs text-gray-600">{dynasty.period}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              p-3 rounded-lg text-center
              ${
                feedback.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }
            `}
          >
            {feedback.message}
          </motion.div>
        )}
      </motion.div>
    );
  };

  const renderCompleteScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-[#6B3100] mb-4">
        Excellent!
      </h2>
      <p className="text-sm sm:text-base mb-4">
        You've successfully identified all Chinese dynasties!
      </p>
      <div className="text-xl font-bold mb-6">Final Score: {score}</div>
      <div className="text-sm text-gray-600 mb-6">Attempts: {attempts}</div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={resetGame}
          className="bg-[#6B3100] text-white px-6 py-3 rounded-lg hover:bg-[#6B3100]/90 transition-colors text-sm sm:text-base"
        >
          Play Again
        </button>
        <button
          onClick={() => navigate("/entertainment")}
          className="bg-white text-[#6B3100] border-2 border-[#6B3100] px-6 py-3 rounded-lg hover:bg-[#6B3100]/10 transition-colors text-sm sm:text-base"
        >
          Back to Games
        </button>
      </div>
    </motion.div>
  );

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
          {gameState === "playing" && (
            <button
              onClick={resetGame}
              className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base"
            >
              <RefreshCw size={16} className="sm:w-5 sm:h-5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
          <h1 className="text-xl sm:text-3xl font-bold text-[#6B3100] mb-2 text-center">
            Dynasty Explorer
          </h1>
          <p className="text-center text-gray-600 mb-4 text-xs sm:text-base">
            Test your knowledge of Chinese dynasties
          </p>

          {gameState === "intro" && renderIntroScreen()}
          {gameState === "playing" && renderGameScreen()}
          {gameState === "complete" && renderCompleteScreen()}
        </div>
      </div>
    </div>
  );
};

export default DynastyTimeline;
