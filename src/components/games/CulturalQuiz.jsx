import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quizQuestions = [
  {
    id: 1,
    question: "What is the most important festival in China?",
    options: [
      { id: "a", text: "Chinese New Year" },
      { id: "b", text: "Christmas" },
      { id: "c", text: "Halloween" },
      { id: "d", text: "Valentine's Day" },
    ],
    correctAnswer: "a",
    explanation:
      "Chinese New Year (Spring Festival) is the most important festival in China, celebrated on the first day of the first month of the lunar calendar.",
  },
  {
    id: 2,
    question: "What is the traditional color of marriage in China?",
    options: [
      { id: "a", text: "White" },
      { id: "b", text: "Red" },
      { id: "c", text: "Black" },
      { id: "d", text: "Green" },
    ],
    correctAnswer: "b",
    explanation:
      "Red is considered the color of good luck and prosperity in China, so it is the traditional color of marriage.",
  },
  {
    id: 3,
    question: "What is the most important element in Chinese cuisine?",
    options: [
      { id: "a", text: "Meat" },
      { id: "b", text: "Fish" },
      { id: "c", text: "Rice" },
      { id: "d", text: "Fruit" },
    ],
    correctAnswer: "c",
    explanation:
      "Rice is the most important element in Chinese cuisine, eaten with almost every meal.",
  },
  {
    id: 4,
    question: "What is the most important animal in the Chinese zodiac?",
    options: [
      { id: "a", text: "Dragon" },
      { id: "b", text: "Tiger" },
      { id: "c", text: "Rat" },
      { id: "d", text: "Monkey" },
    ],
    correctAnswer: "c",
    explanation:
      "The Rat (Mouse) is the first animal in the Chinese zodiac cycle, starting the cycle.",
  },
  {
    id: 5,
    question: "What is the most important element in Feng Shui?",
    options: [
      { id: "a", text: "Water" },
      { id: "b", text: "Fire" },
      { id: "c", text: "Earth" },
      { id: "d", text: "All of the above" },
    ],
    correctAnswer: "d",
    explanation:
      "Feng Shui consists of five elements: Water, Fire, Earth, Metal, and Wood. All are important for balance.",
  },
  {
    id: 6,
    question: "What is the most important philosophy in China?",
    options: [
      { id: "a", text: "Confucianism" },
      { id: "b", text: "Taoism" },
      { id: "c", text: "Buddhism" },
      { id: "d", text: "All of the above" },
    ],
    correctAnswer: "d",
    explanation:
      "Confucianism, Taoism, and Buddhism are all important philosophies in China, with different influences on society.",
  },
  {
    id: 7,
    question: "What is the most important element in Chinese painting?",
    options: [
      { id: "a", text: "Color" },
      { id: "b", text: "Line" },
      { id: "c", text: "Space" },
      { id: "d", text: "All of the above" },
    ],
    correctAnswer: "d",
    explanation:
      "Chinese painting consists of color, line, and space, all of which are important for the whole art.",
  },
  {
    id: 8,
    question: "What is the most important element in Chinese calligraphy?",
    options: [
      { id: "a", text: "Brush" },
      { id: "b", text: "Ink" },
      { id: "c", text: "Paper" },
      { id: "d", text: "All of the above" },
    ],
    correctAnswer: "d",
    explanation:
      "Chinese calligraphy requires brush, ink, and paper, all of which are important for the art.",
  },
  {
    id: 9,
    question: "What is the most important element in Chinese tea ceremony?",
    options: [
      { id: "a", text: "Tea" },
      { id: "b", text: "Teapot" },
      { id: "c", text: "Cups" },
      { id: "d", text: "All of the above" },
    ],
    correctAnswer: "d",
    explanation:
      "Chinese tea ceremony requires tea, teapot, and cups, all of which are important for the ceremony.",
  },
  {
    id: 10,
    question: "What is the most important element in Chinese garden?",
    options: [
      { id: "a", text: "Plants" },
      { id: "b", text: "Water" },
      { id: "c", text: "Rocks" },
      { id: "d", text: "All of the above" },
    ],
    correctAnswer: "d",
    explanation:
      "Chinese garden consists of plants, water, and rocks, all of which are important for the whole garden.",
  },
];

const CulturalQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    // Shuffle the questions for the game
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswerSelect = (answerId) => {
    if (showExplanation) return;

    setSelectedAnswer(answerId);
    setShowExplanation(true);

    if (answerId === shuffledQuestions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 10);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setQuizComplete(false);
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5E6D3] flex items-center justify-center">
        <div className="text-[#6B3100]">Loading...</div>
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
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="text-[#6B3100] font-medium text-sm sm:text-base">
              Score: {score}
            </div>
            <button
              onClick={resetQuiz}
              className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base"
            >
              <RefreshCw size={16} className="sm:w-5 sm:h-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
          <h1 className="text-xl sm:text-3xl font-bold text-[#6B3100] mb-2 text-center">
            Cultural Quiz
          </h1>
          <p className="text-center text-gray-600 mb-4 text-xs sm:text-base">
            Test your knowledge about Chinese culture
          </p>

          {quizComplete ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 sm:py-8"
            >
              <h2 className="text-lg sm:text-2xl font-bold text-[#6B3100] mb-3">
                Great job!
              </h2>
              <p className="text-sm sm:text-lg mb-4">You completed the quiz!</p>
              <div className="text-base sm:text-xl font-bold mb-6">
                Your Score: {score} / {quizQuestions.length * 10}
              </div>
              <button
                onClick={resetQuiz}
                className="bg-[#6B3100] text-white px-4 py-2 rounded-lg hover:bg-[#6B3100]/90 transition-colors text-sm sm:text-base"
              >
                Play Again
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-4">
                <div className="h-2 bg-gray-200 rounded-full mb-2">
                  <div
                    className="h-2 bg-[#6B3100] rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((currentQuestionIndex + 1) /
                          shuffledQuestions.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <p className="text-center text-[#6B3100] font-medium text-xs sm:text-sm">
                  Question {currentQuestionIndex + 1} of{" "}
                  {shuffledQuestions.length}
                </p>
              </div>

              <div className="mb-4">
                <h2 className="text-base sm:text-lg font-semibold text-[#6B3100] mb-3">
                  {shuffledQuestions[currentQuestionIndex].question}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {shuffledQuestions[currentQuestionIndex].options.map(
                    (option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          p-2 sm:p-3 rounded-lg border-2 text-left
                          ${
                            showExplanation
                              ? option.id ===
                                shuffledQuestions[currentQuestionIndex]
                                  .correctAnswer
                                ? "bg-green-100 border-green-500"
                                : selectedAnswer === option.id
                                ? "bg-red-100 border-red-500"
                                : "bg-white border-gray-300"
                              : selectedAnswer === option.id
                              ? "bg-[#6B3100]/10 border-[#6B3100]"
                              : "bg-white border-gray-300 hover:border-[#6B3100]/50"
                          }
                        `}
                        onClick={() => handleAnswerSelect(option.id)}
                        disabled={showExplanation}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`
                              w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-sm
                              ${
                                showExplanation
                                  ? option.id ===
                                    shuffledQuestions[currentQuestionIndex]
                                      .correctAnswer
                                    ? "bg-green-500 text-white"
                                    : selectedAnswer === option.id
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-200 text-gray-600"
                                  : selectedAnswer === option.id
                                  ? "bg-[#6B3100] text-white"
                                  : "bg-gray-200 text-gray-600"
                              }
                            `}
                          >
                            {option.id.toUpperCase()}
                          </div>
                          <span className="text-xs sm:text-sm flex-grow">
                            {option.text}
                          </span>
                          {showExplanation &&
                            option.id ===
                              shuffledQuestions[currentQuestionIndex]
                                .correctAnswer && (
                              <Check className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                          {showExplanation &&
                            selectedAnswer === option.id &&
                            option.id !==
                              shuffledQuestions[currentQuestionIndex]
                                .correctAnswer && (
                              <X className="text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                        </div>
                      </motion.button>
                    )
                  )}
                </div>
              </div>

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-2 sm:p-3 bg-[#6B3100]/10 rounded-lg"
                >
                  <h3 className="font-semibold text-[#6B3100] mb-1 text-xs sm:text-sm">
                    Explanation:
                  </h3>
                  <p className="text-xs sm:text-sm">
                    {shuffledQuestions[currentQuestionIndex].explanation}
                  </p>
                </motion.div>
              )}

              {showExplanation && (
                <div className="flex justify-center">
                  <button
                    onClick={handleNextQuestion}
                    className="bg-[#6B3100] text-black px-4 py-2 rounded-lg hover:bg-[#6B3100]/90 transition-colors text-sm sm:text-base"
                  >
                    {currentQuestionIndex < shuffledQuestions.length - 1
                      ? "Next Question"
                      : "Finish Quiz"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CulturalQuiz;
