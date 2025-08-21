import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  RefreshCw,
  Check,
  X,
  Info,
  BookOpen,
  Award,
  Target,
} from "lucide-react";
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
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [shuffledTerms, setShuffledTerms] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answeredTerms, setAnsweredTerms] = useState(new Set());

  // Memoized categories for performance
  const categories = useMemo(() => {
    return Array.from(
      new Set(TERM_DEFINITION_DATA.map((term) => term.category))
    );
  }, []);

  // Initialize and shuffle terms
  useEffect(() => {
    const shuffled = [...TERM_DEFINITION_DATA].sort(() => Math.random() - 0.5);
    setShuffledTerms(shuffled);
    playBackgroundMusic();

    return () => stopBackgroundMusic();
  }, []);

  // Enhanced answer checking function that handles aliases
  const checkAnswer = useCallback((userInput, termData) => {
    const cleanInput = userInput.trim().toLowerCase();

    // Check main term
    const mainTerm = termData.term.toLowerCase();
    if (cleanInput === mainTerm) {
      return { isCorrect: true, matchedAnswer: termData.term };
    }

    // Check aliases if they exist
    if (termData.aliases && Array.isArray(termData.aliases)) {
      for (const alias of termData.aliases) {
        if (cleanInput === alias.toLowerCase()) {
          return { isCorrect: true, matchedAnswer: alias };
        }
      }
    }

    // Check if aliases is a string (single alias)
    if (termData.aliases && typeof termData.aliases === "string") {
      if (cleanInput === termData.aliases.toLowerCase()) {
        return { isCorrect: true, matchedAnswer: termData.aliases };
      }
    }

    // Partial matching for better user experience (optional)
    const allPossibleAnswers = [
      termData.term,
      ...(Array.isArray(termData.aliases)
        ? termData.aliases
        : termData.aliases
        ? [termData.aliases]
        : []),
    ];

    for (const answer of allPossibleAnswers) {
      const similarity = calculateSimilarity(cleanInput, answer.toLowerCase());
      if (similarity > 0.8) {
        // 80% similarity threshold
        return {
          isCorrect: true,
          matchedAnswer: answer,
          wasSimilar: true,
        };
      }
    }

    return {
      isCorrect: false,
      correctAnswers: allPossibleAnswers,
    };
  }, []);

  // Simple similarity calculation for fuzzy matching
  const calculateSimilarity = useCallback((str1, str2) => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    const editDistance = levenshteinDistance(longer, shorter);

    if (longer.length === 0) return 1.0;
    return (longer.length - editDistance) / longer.length;
  }, []);

  // Levenshtein distance calculation
  const levenshteinDistance = useCallback((str1, str2) => {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }, []);

  const resetGame = useCallback(() => {
    setGameState("intro");
    setCurrentTermIndex(0);
    setUserAnswer("");
    setScore(0);
    setAttempts(0);
    setCorrectAnswers(0);
    setFeedback(null);
    setShowInstructions(false);
    setGameComplete(false);
    setIsSubmitting(false);
    setAnsweredTerms(new Set());

    const shuffled = [...TERM_DEFINITION_DATA].sort(() => Math.random() - 0.5);
    setShuffledTerms(shuffled);
  }, []);

  const startGame = useCallback(() => {
    setGameState("playing");
    playSound("correct");
  }, []);

  const handleSubmitAnswer = useCallback(async () => {
    if (!userAnswer.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const currentTerm = shuffledTerms[currentTermIndex];
    const result = checkAnswer(userAnswer, currentTerm);

    setAttempts((prev) => prev + 1);
    setAnsweredTerms((prev) => new Set([...prev, currentTermIndex]));

    if (result.isCorrect) {
      const points = result.wasSimilar ? 8 : 10; // Slightly lower points for fuzzy matches
      setScore((prev) => prev + points);
      setCorrectAnswers((prev) => prev + 1);
      playSound("correct");

      setFeedback({
        type: "success",
        message: result.wasSimilar
          ? `Malapit na! Tinanggap namin ang "${result.matchedAnswer}" 🎉`
          : `Tumpak! Ang sagot ay "${result.matchedAnswer}" 🎉 Magaling!`,
      });
    } else {
      playSound("wrong");
      const correctAnswersText = result.correctAnswers.join('" o "');
      setFeedback({
        type: "error",
        message: `Hindi pa tama. Ang mga tamang sagot ay "${correctAnswersText}". Subukan ulit! 💪`,
      });
    }

    // Auto-advance to next question
    setTimeout(() => {
      setFeedback(null);
      setUserAnswer("");
      setIsSubmitting(false);

      if (currentTermIndex < shuffledTerms.length - 1) {
        setCurrentTermIndex((prev) => prev + 1);
      } else {
        setGameComplete(true);
        playSound("complete");
      }
    }, 2500);
  }, [userAnswer, isSubmitting, shuffledTerms, currentTermIndex, checkAnswer]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !isSubmitting) {
        handleSubmitAnswer();
      }
    },
    [handleSubmitAnswer, isSubmitting]
  );

  const currentTerm = shuffledTerms[currentTermIndex];
  const progress = ((currentTermIndex + 1) / shuffledTerms.length) * 100;
  const accuracy =
    attempts > 0 ? Math.round((correctAnswers / attempts) * 100) : 0;

  // Intro Screen
  if (gameState === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] to-[#E8D5C4] py-4 sm:py-8 px-2 sm:px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-row justify-between items-center mb-4 gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/entertainment")}
              className="flex items-center gap-2 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base bg-white/80 px-3 py-2 rounded-lg shadow-sm"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Bumalik</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowInstructions(true)}
              className="flex items-center gap-2 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base bg-white/80 px-3 py-2 rounded-lg shadow-sm"
            >
              <Info size={16} className="sm:w-5 sm:h-5" />
              <span>Paano Laruin</span>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex justify-center mb-6"
            >
              <div className="bg-gradient-to-r from-[#6B3100] to-[#8B4513] p-4 rounded-full shadow-lg">
                <BookOpen size={48} className="text-white" />
              </div>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#6B3100] mb-4">
              {GAME_INSTRUCTIONS.title}
            </h1>
            <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-2xl mx-auto">
              {GAME_INSTRUCTIONS.description}
            </p>
            <p className="text-gray-600 mb-8 text-sm sm:text-base max-w-2xl mx-auto">
              {GAME_INSTRUCTIONS.instructions}
            </p>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl mb-6 border-2 border-yellow-200 shadow-inner">
              <h3 className="font-bold text-[#6B3100] mb-4 text-lg flex items-center justify-center gap-2">
                <Target size={24} />
                🎯 Mga Kategorya na Matututunan Mo:
              </h3>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                {categories.map((category, index) => (
                  <motion.span
                    key={category}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white px-4 py-2 rounded-full text-[#6B3100] font-medium shadow-md border border-yellow-200 hover:shadow-lg transition-shadow"
                  >
                    ✨ {category}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-blue-400">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Pwedeng may iba't ibang tamang sagot!
                Subukan ang inyong alam na mga termino.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="bg-gradient-to-r from-[#6B3100] to-[#8B4513] text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-[#8B4513] hover:to-[#6B3100] transition-all duration-300 shadow-xl flex items-center gap-3 mx-auto"
            >
              <Award size={24} />
              🚀 Simulan ang Laro!
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl max-w-md mx-auto mt-4 border-2 border-[#6B3100]/20"
              >
                <h3 className="font-bold text-[#6B3100] mb-4 text-lg flex items-center gap-2">
                  <Info size={20} />
                  💡 Paano Laruin:
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    { icon: "📖", text: "Basahin ang kahulugan ng termino" },
                    {
                      icon: "🖼️",
                      text: "Tingnan ang larawan para sa mga pahiwatig",
                    },
                    { icon: "⌨️", text: "I-type ang tamang termino sa kahon" },
                    {
                      icon: "🎯",
                      text: "Pindutin ang Enter o ang 'Sagot' na button",
                    },
                    {
                      icon: "⭐",
                      text: "Kumuha ng puntos sa bawat tamang sagot",
                    },
                    {
                      icon: "🔄",
                      text: "May mga terminong may iba't ibang tamang sagot",
                    },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowInstructions(false)}
                  className="mt-6 bg-gradient-to-r from-[#6B3100] to-[#8B4513] text-white px-6 py-3 rounded-lg text-sm font-medium hover:from-[#8B4513] hover:to-[#6B3100] transition-all duration-300 w-full shadow-lg"
                >
                  Sige, maglaro na tayo! 🚀
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Game Complete Screen
  if (gameComplete) {
    const finalAccuracy = Math.round(
      (correctAnswers / shuffledTerms.length) * 100
    );
    const maxScore = shuffledTerms.length * 10;
    const performanceLevel =
      finalAccuracy >= 90
        ? "Napakahusay!"
        : finalAccuracy >= 80
        ? "Magaling!"
        : finalAccuracy >= 70
        ? "Mabuti!"
        : finalAccuracy >= 60
        ? "Hindi masama!"
        : "Kailangan pa ng practice!";

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] to-[#E8D5C4] py-4 sm:py-8 px-2 sm:px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-row justify-between items-center mb-4 gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/entertainment")}
              className="flex items-center gap-2 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base bg-white/80 px-3 py-2 rounded-lg shadow-sm"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Bumalik</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="flex items-center gap-2 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base bg-white/80 px-3 py-2 rounded-lg shadow-sm"
            >
              <RefreshCw size={16} className="sm:w-5 sm:h-5" />
              <span>Laruin Muli</span>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="mb-6"
            >
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-full inline-flex shadow-lg">
                <Award size={64} className="text-white" />
              </div>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#6B3100] mb-4">
              🎉 Tapos na ang Laro! 🎉
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-800">{score}</div>
                <div className="text-sm text-blue-600">
                  Puntos ({maxScore} max)
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-800">
                  {correctAnswers}/{shuffledTerms.length}
                </div>
                <div className="text-sm text-green-600">Tamang Sagot</div>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-800">
                  {finalAccuracy}%
                </div>
                <div className="text-sm text-purple-600">Accuracy</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg mb-6 border-l-4 border-yellow-400">
              <h3 className="font-bold text-[#6B3100] text-lg mb-2">
                {performanceLevel}
              </h3>
              <p className="text-gray-600 text-sm">
                Nakamit mo ang {finalAccuracy}% accuracy sa {attempts} na
                pagtatangka.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="bg-gradient-to-r from-[#6B3100] to-[#8B4513] text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-[#8B4513] hover:to-[#6B3100] transition-all duration-300 shadow-xl"
            >
              🔄 Laruin Muli
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Main Game Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] to-[#E8D5C4] py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-row justify-between items-center mb-4 gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/entertainment")}
            className="flex items-center gap-2 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base bg-white/80 px-3 py-2 rounded-lg shadow-sm"
          >
            <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Bumalik</span>
          </motion.button>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="bg-white/80 px-3 py-2 rounded-lg shadow-sm">
              <div className="text-[#6B3100] font-bold text-sm sm:text-base">
                Puntos: {score}
              </div>
            </div>
            <div className="bg-white/80 px-3 py-2 rounded-lg shadow-sm">
              <div className="text-[#6B3100] font-bold text-sm sm:text-base">
                {currentTermIndex + 1} / {shuffledTerms.length}
              </div>
            </div>
            <div className="bg-white/80 px-3 py-2 rounded-lg shadow-sm">
              <div className="text-[#6B3100] font-bold text-sm sm:text-base">
                {accuracy}%
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base bg-white/80 px-3 py-2 rounded-lg shadow-sm"
            >
              <RefreshCw size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Reset</span>
            </motion.button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="bg-white/80 rounded-full h-3 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="bg-gradient-to-r from-[#6B3100] to-[#8B4513] h-full rounded-full shadow-sm"
            />
          </div>
        </div>

        {/* Main Game Content */}
        <motion.div
          key={currentTermIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6"
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
              className="bg-gradient-to-r from-[#F5E6D3] to-[#E8D5C4] px-4 py-2 rounded-full inline-block shadow-lg border-2 border-[#6B3100]/20"
            >
              <span className="text-[#6B3100] font-semibold text-sm">
                📚 {currentTerm?.category}
              </span>
            </motion.div>
          </div>

          <div className="flex flex-col gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-[#F5E6D3] to-[#E8D5C4] p-6 rounded-xl shadow-inner border border-[#6B3100]/10">
                <p className="text-gray-700 leading-relaxed text-lg sm:text-xl font-medium">
                  {currentTerm?.definition}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-md">
                <img
                  src={currentTerm?.image}
                  alt="Visual hint for the term"
                  className="w-full h-64 object-cover rounded-xl shadow-lg border-4 border-white"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex justify-center">
                <input
                  id="answer"
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="I-type ang termino dito..."
                  className="w-full max-w-md px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6B3100] focus:border-transparent text-base font-medium shadow-lg transition-all duration-200"
                  disabled={feedback !== null || isSubmitting}
                  autoComplete="off"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitAnswer}
                disabled={
                  !userAnswer.trim() || feedback !== null || isSubmitting
                }
                className="bg-gradient-to-r from-[#6B3100] to-[#8B4513] text-white px-8 py-4 rounded-xl font-bold hover:from-[#8B4513] hover:to-[#6B3100] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-lg shadow-xl"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-6 h-6"
                  >
                    <RefreshCw size={24} />
                  </motion.div>
                ) : (
                  <Check size={24} />
                )}
                {isSubmitting ? "Sinusuri..." : "Sagot"}
              </motion.button>
            </motion.div>
          </div>

          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                className={`mt-6 p-4 rounded-xl text-center shadow-lg ${
                  feedback.type === "success"
                    ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-2 border-green-300"
                    : "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-2 border-red-300"
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    {feedback.type === "success" ? (
                      <div className="bg-green-500 rounded-full p-1">
                        <Check size={20} className="text-white" />
                      </div>
                    ) : (
                      <div className="bg-red-500 rounded-full p-1">
                        <X size={20} className="text-white" />
                      </div>
                    )}
                  </motion.div>
                  <span className="font-bold text-lg">{feedback.message}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint Section */}
          {currentTerm?.hint && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-6 bg-blue-50 p-4 rounded-xl border-l-4 border-blue-400"
            >
              <div className="flex items-center gap-2 mb-2">
                <Info size={20} className="text-blue-600" />
                <span className="font-bold text-blue-800">Clue:</span>
              </div>
              <p className="text-blue-700 text-sm">{currentTerm.hint}</p>
            </motion.div>
          )}

          {/* Possible Answers Info */}
          {currentTerm?.aliases && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-4 bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-400"
            >
              <div className="flex items-center gap-2 mb-2">
                <Target size={20} className="text-yellow-600" />
                <span className="font-bold text-yellow-800">
                  May iba't ibang tamang sagot!
                </span>
              </div>
              <p className="text-yellow-700 text-sm">
                Ang terminong ito ay may ilang posibleng sagot. Subukan ang
                inyong alam!
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TermDefinitionGame;
