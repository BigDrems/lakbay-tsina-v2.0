import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Check, X, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  playSound,
  playBackgroundMusic,
  stopBackgroundMusic,
} from "../../utils/soundManager";
import dynastyData from "../../data/dynasties.json";

const dynasties = dynastyData.dynasties;

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
    // Start background music when component mounts
    playBackgroundMusic();

    // Cleanup: stop background music when component unmounts
    return () => {
      stopBackgroundMusic();
    };
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
    playSound("correct"); // Play sound when starting the game
  };

  const handleDynastySelect = (dynasty) => {
    if (gameState !== "playing") return;

    setSelectedDynasty(dynasty);
    setAttempts((prev) => prev + 1);

    // Check if the selected dynasty matches the current level
    if (dynasty.id === currentLevel) {
      // Correct dynasty selected
      setScore((prev) => prev + 10);
      playSound("correct");
      setFeedback({
        type: "success",
        message: "Tama! Tamang pagkakakilanlan ng dinastiya.",
      });

      // Move to next level or complete the game
      if (currentLevel === dynasties.length) {
        setTimeout(() => {
          setGameState("complete");
          playSound("complete");
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
      playSound("wrong");
      setFeedback({
        type: "error",
        message: "Mali. Hindi ito ang dinastiyang hinahanap natin.",
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
        Tagpo ng mga Dinastiya
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto">
        Subukan ang iyong kaalaman sa mga dinastiya ng China! Kilalanin ang
        bawat dinastiya batay sa mga pahiwatig tungkol sa kanilang mga nagawa at
        kahalagahan sa kasaysayan.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <button
          onClick={startGame}
          className="bg-[#6B3100] lg:text-black text-white px-6 py-3 rounded-lg lg:hover:bg-[#6B3100]/90 transition-colors text-sm sm:text-base"
        >
          Simulan ang Laro
        </button>
        <button
          onClick={() => setShowInfo(true)}
          className="bg-white text-[#6B3100] border-2 border-[#6B3100] px-6 py-3 rounded-lg lg:hover:bg-[#6B3100]/10 transition-colors text-sm sm:text-base flex items-center justify-center gap-2"
        >
          <Info size={16} />
          <span>Paano Laruin</span>
        </button>
      </div>

      {showInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto text-left"
        >
          <h3 className="font-bold text-[#6B3100] mb-2">Paano Laruin:</h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            <li>
              Ipapakita sa iyo ang impormasyon tungkol sa isang dinastiya ng
              China
            </li>
            <li>Piliin ang tamang dinastiya mula sa mga opsyon</li>
            <li>Kumuha ng puntos sa bawat tamang pagkakakilanlan</li>
            <li>Kumpletuhin ang lahat ng antas para manalo sa laro</li>
          </ol>
          <button
            onClick={() => setShowInfo(false)}
            className="mt-4 text-[#6B3100] text-sm font-medium"
          >
            Sige, maglaro na tayo!
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
            Antas: {currentLevel} / {dynasties.length}
          </div>
          <div className="text-[#6B3100] font-medium">Puntos: {score}</div>
        </div>

        <div className="bg-[#6B3100]/5 p-6 sm:p-8 rounded-lg border border-[#6B3100]/20">
          <h3 className="font-semibold text-[#6B3100] mb-4 text-lg sm:text-xl">
            Kilalanin ang dinastiyang ito:
          </h3>
          <div className="space-y-4">
            <p className="text-base sm:text-lg">
              <span className="font-medium">Panahon:</span>{" "}
              {currentDynasty.period}
            </p>
            <p className="text-base sm:text-lg">
              <span className="font-medium">Paglalarawan:</span>{" "}
              {currentDynasty.description}
            </p>
            <p className="text-base sm:text-lg">
              <span className="font-medium">Mga Nagawa:</span>{" "}
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
        Napakagaling!
      </h2>
      <p className="text-sm sm:text-base mb-4">
        Matagumpay mong nakilala ang lahat ng dinastiya ng China!
      </p>
      <div className="text-xl font-bold mb-6">Huling Puntos: {score}</div>
      <div className="text-sm text-gray-600 mb-6">Mga Pagsubok: {attempts}</div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={resetGame}
          className="bg-[#6B3100] text-white px-6 py-3 rounded-lg hover:bg-[#6B3100]/90 transition-colors text-sm sm:text-base"
        >
          Laruin Muli
        </button>
        <button
          onClick={() => navigate("/entertainment")}
          className="bg-white text-[#6B3100] border-2 border-[#6B3100] px-6 py-3 rounded-lg hover:bg-[#6B3100]/10 transition-colors text-sm sm:text-base"
          aria-label="Bumalik sa Mga Laro"
        >
          <ArrowLeft size={16} className="mr-2" />
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
            className="flex items-center gap-1 text-[#6B3100] lg:hover:text-[#6B3100]/80 text-sm sm:text-base"
            aria-label="Bumalik"
          >
            <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
          </button>
          {gameState === "playing" && (
            <button
              onClick={resetGame}
              className="flex items-center gap-1 text-[#6B3100] lg:hover:text-[#6B3100]/80 text-sm sm:text-base"
            >
              <RefreshCw size={16} className="sm:w-5 sm:h-5" />
              <span>I-reset</span>
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
          <h1 className="text-xl sm:text-3xl font-bold text-[#6B3100] mb-2 text-center">
            Tagpo ng mga Dinastiya
          </h1>
          <p className="text-center text-gray-600 mb-4 text-xs sm:text-base">
            Subukan ang iyong kaalaman sa mga dinastiya ng China
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
