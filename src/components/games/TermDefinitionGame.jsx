import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Check, X, Info, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  playSound,
  playBackgroundMusic,
  stopBackgroundMusic,
} from "../../utils/soundManager";
import {
  TERM_DEFINITION_DATA,
  GAME_INSTRUCTIONS,
} from "../../data/termDefinitionGame";

const TermDefinitionGame = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState("intro"); // intro, playing, complete
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [shuffledTerms, setShuffledTerms] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    // Shuffle the terms for the game
    const shuffled = [...TERM_DEFINITION_DATA].sort(() => Math.random() - 0.5);
    setShuffledTerms(shuffled);

    // Start background music when component mounts
    playBackgroundMusic();

    // Cleanup: stop background music when component unmounts
    return () => {
      stopBackgroundMusic();
    };
  }, []);

  const resetGame = () => {
    setGameState("intro");
    setCurrentTermIndex(0);
    setUserAnswer("");
    setScore(0);
    setAttempts(0);
    setFeedback(null);
    setShowInstructions(false);
    setGameComplete(false);

    // Reshuffle terms
    const shuffled = [...TERM_DEFINITION_DATA].sort(() => Math.random() - 0.5);
    setShuffledTerms(shuffled);
  };

  const startGame = () => {
    setGameState("playing");
    playSound("correct");
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return;

    const currentTerm = shuffledTerms[currentTermIndex];
    const isCorrect =
      userAnswer.trim().toLowerCase() === currentTerm.term.toLowerCase();

    setAttempts((prev) => prev + 1);

    if (isCorrect) {
      setScore((prev) => prev + 10);
      playSound("correct");
      setFeedback({
        type: "success",
        message: "Wow! Tama ka! 🎉 Magaling na magaling!",
      });
    } else {
      playSound("wrong");
      setFeedback({
        type: "error",
        message: `Hmm, hindi pa tama. Ang sagot ay "${currentTerm.term}". Subukan ulit! 💪`,
      });
    }

    // Clear feedback and move to next term after 2 seconds
    setTimeout(() => {
      setFeedback(null);
      setUserAnswer("");

      if (currentTermIndex < shuffledTerms.length - 1) {
        setCurrentTermIndex((prev) => prev + 1);
      } else {
        setGameComplete(true);
        playSound("complete");
      }
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmitAnswer();
    }
  };

  const currentTerm = shuffledTerms[currentTermIndex];

  if (gameState === "intro") {
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
            <button
              onClick={() => setShowInstructions(true)}
              className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base"
            >
              <Info size={16} className="sm:w-5 sm:h-5" />
              <span>Paano Laruin</span>
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 text-center"
          >
            <div className="flex justify-center mb-4">
              <BookOpen size={48} className="text-[#6B3100]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#6B3100] mb-4">
              {GAME_INSTRUCTIONS.title}
            </h1>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              {GAME_INSTRUCTIONS.description}
            </p>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
              {GAME_INSTRUCTIONS.instructions}
            </p>

            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg mb-6 border-2 border-yellow-300">
              <h3 className="font-bold text-[#6B3100] mb-3 text-lg">
                🎯 Mga Kategorya na Matututunan Mo:
              </h3>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                {Array.from(
                  new Set(TERM_DEFINITION_DATA.map((term) => term.category))
                ).map((category) => (
                  <span
                    key={category}
                    className="bg-white px-4 py-2 rounded-full text-[#6B3100] font-medium shadow-md border border-yellow-200"
                  >
                    ✨ {category}
                  </span>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="bg-gradient-to-r from-[#6B3100] to-[#8B4513] text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-[#8B4513] hover:to-[#6B3100] transition-all duration-300 shadow-lg flex items-center gap-3 mx-auto"
            >
              🚀 Simulan ang Laro!
            </motion.button>
          </motion.div>

          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-auto mt-4 border-2 border-[#6B3100]/20"
            >
              <h3 className="font-bold text-[#6B3100] mb-4 text-lg">
                💡 Paano Laruin:
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-lg">📖</span>
                  <span>Basahin ang kahulugan ng termino</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">🖼️</span>
                  <span>Tingnan ang larawan para sa mga pahiwatig</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">⌨️</span>
                  <span>I-type ang tamang termino sa kahon</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">🎯</span>
                  <span>Pindutin ang Enter o ang 'Sagot' na button</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">⭐</span>
                  <span>Kumuha ng puntos sa bawat tamang sagot</span>
                </li>
              </ul>
              <button
                onClick={() => setShowInstructions(false)}
                className="mt-6 bg-[#6B3100] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#6B3100]/90 transition-colors w-full"
              >
                Sige, maglaro na tayo! 🚀
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  if (gameComplete) {
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
            <button
              onClick={resetGame}
              className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base"
            >
              <RefreshCw size={16} className="sm:w-5 sm:h-5" />
              <span>Laruin Muli</span>
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-lg p-6 text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#6B3100] mb-4">
              Tapos na ang Laro!
            </h2>
            <p className="text-lg mb-4">
              Natapos mo ang lahat ng {shuffledTerms.length} na termino!
            </p>
            <div className="text-xl font-bold mb-6 text-[#6B3100]">
              Iyong Puntos: {score} / {shuffledTerms.length * 10}
            </div>
            <div className="text-sm text-gray-600 mb-6">
              Mga pagtatangka: {attempts}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="bg-[#6B3100] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#6B3100]/90 transition-colors"
            >
              Laruin Muli
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

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
            <div className="text-[#6B3100] font-medium text-sm sm:text-base">
              Puntos: {score}
            </div>
            <div className="text-[#6B3100] font-medium text-sm sm:text-base">
              {currentTermIndex + 1} / {shuffledTerms.length}
            </div>
            <button
              onClick={resetGame}
              className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base"
            >
              <RefreshCw size={16} className="sm:w-5 sm:h-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <motion.div
          key={currentTermIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-[#6B3100] to-[#8B4513] text-white p-6 rounded-xl shadow-2xl mb-4"
            >
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                Ano ang termino na ito?
              </h1>
              <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-[#F5E6D3] px-4 py-2 rounded-full inline-block shadow-lg border-2 border-[#6B3100]/20"
            >
              <span className="text-[#6B3100] font-semibold text-sm">
                {currentTerm?.category}
              </span>
            </motion.div>
          </div>

          <div className="flex flex-col gap-6 mb-6">
            <div className="text-center">
              <div className="bg-[#F5E6D3] p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed text-xl">
                  {currentTerm?.definition}
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <img
                  src={currentTerm?.image}
                  alt="Hint"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-center">
                <input
                  id="answer"
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="I-type ang termino dito..."
                  className="w-3/4 max-w-md px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B3100] focus:border-transparent text-base"
                  disabled={feedback !== null}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitAnswer}
                disabled={!userAnswer.trim() || feedback !== null}
                className="bg-[#6B3100] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6B3100]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-lg"
              >
                <Check size={24} />
                Sagot
              </motion.button>
            </div>
          </div>

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-lg text-center ${
                feedback.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {feedback.type === "success" ? (
                  <Check size={20} className="text-green-600" />
                ) : (
                  <X size={20} className="text-red-600" />
                )}
                <span className="font-medium">{feedback.message}</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TermDefinitionGame;
