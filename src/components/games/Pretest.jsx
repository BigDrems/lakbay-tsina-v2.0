import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Check, X, Clock, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PRETEST_DATA } from "../../data/pretestData";
import {
  playSound,
  playBackgroundMusic,
  stopBackgroundMusic,
} from "../../utils/soundManager";

const Pretest = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isComplete, setIsComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  // Monitor answers changes for debugging
  useEffect(() => {
    console.log("Answers updated:", answers);
    console.log("Answered questions count:", Object.keys(answers).length);
  }, [answers]);

  useEffect(() => {
    // Start background music when component mounts
    playBackgroundMusic();

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup: stop background music and timer when component unmounts
    return () => {
      clearInterval(timer);
      stopBackgroundMusic();
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers((prev) => {
      const newAnswers = {
        ...prev,
        [questionId]: answerIndex,
      };
      console.log("Answer selected:", questionId, answerIndex, newAnswers);
      return newAnswers;
    });
    playSound("flip");
  };

  const handleComplete = () => {
    let correctAnswers = 0;
    PRETEST_DATA.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round(
      (correctAnswers / PRETEST_DATA.questions.length) * 100
    );
    setScore(finalScore);
    setIsComplete(true);
    playSound("complete");
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleContinue = () => {
    if (onComplete) {
      onComplete();
    } else {
      navigate("/entertainment");
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(1800);
    setIsComplete(false);
    setShowResults(false);
    setScore(0);
    setShowExplanation(false);
  };

  const currentQ = PRETEST_DATA.questions[currentQuestion];
  const totalQuestions = PRETEST_DATA.questions.length;
  const answeredQuestions = Object.keys(answers).length;

  const renderQuestion = () => (
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold text-[#6B3100] mb-4">
          {currentQ.question}
        </h3>

        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQ.id, index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                answers[currentQ.id] === index
                  ? "border-[#6B3100] bg-[#6B3100]/10"
                  : "border-gray-200 hover:border-[#6B3100]/50 hover:bg-[#6B3100]/5"
              }`}
            >
              <span className="font-medium text-[#6B3100] mr-3">
                {String.fromCharCode(65 + index)}.
              </span>
              <span className="text-gray-700">{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        {currentQuestion < totalQuestions - 1 ? (
          <button
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            className="px-6 py-3 bg-[#6B3100] text-white rounded-lg hover:bg-[#6B3100]/90"
          >
            Susunod
          </button>
        ) : (
          <button
            onClick={handleComplete}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Tapusin ang Pagsusulit
          </button>
        )}
      </div>
    </motion.div>
  );

  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-lg p-6 shadow-md text-center">
        <h2 className="text-2xl font-bold text-[#6B3100] mb-4">
          🎉 Natapos ang Pagsusulit!
        </h2>

        <div className="text-6xl font-bold mb-4">{score}%</div>

        <p className="text-gray-600 mb-6">
          {answeredQuestions} sa {totalQuestions} tanong ang nasagot
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleShowResults}
            className="px-6 py-3 bg-[#6B3100] text-white rounded-lg hover:bg-[#6B3100]/90 flex items-center gap-2"
          >
            <BookOpen size={16} />
            Tingnan ang mga Sagot
          </button>
          <button
            onClick={handleContinue}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            Magpatuloy 🚀
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 border border-[#6B3100] text-[#6B3100] rounded-lg hover:bg-[#6B3100]/10 flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Ulitin
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderAnswerReview = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold text-[#6B3100] mb-4">
          📚 Mga Sagot at Paliwanag
        </h2>

        <div className="space-y-6 max-h-96 overflow-y-auto">
          {PRETEST_DATA.questions.map((question, index) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            const correctAnswerText = question.options[question.correctAnswer];
            const userAnswerText =
              userAnswer !== undefined
                ? question.options[userAnswer]
                : "Hindi nasagot";

            return (
              <div key={question.id} className="border-b border-gray-200 pb-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      isCorrect ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {isCorrect ? <Check size={16} /> : <X size={16} />}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-[#6B3100] mb-2">
                      {index + 1}. {question.question}
                    </h4>

                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">Iyong sagot:</span>{" "}
                        {userAnswerText}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Tamang sagot:</span>{" "}
                        {correctAnswerText}
                      </p>
                    </div>

                    <div className="mt-3 p-3 bg-amber-50 rounded-lg">
                      <p className="text-sm text-amber-800">
                        <span className="font-medium">Paliwanag:</span>{" "}
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleContinue}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            Magpatuloy
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#F5E6D3] py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-row justify-between items-center mb-4 gap-2">
          {!onComplete && (
            <button
              onClick={() => navigate("/entertainment")}
              className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base"
              aria-label="Bumalik"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Bumalik</span>
            </button>
          )}

          {!isComplete && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-[#6B3100] hover:text-[#6B3100]/80 text-sm sm:text-base"
            >
              <RefreshCw size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">I-reset</span>
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-3xl font-bold text-[#6B3100] mb-2">
              🧠 Pagsusulit sa Sinaunang Tsina
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-2">
              Subukan ang iyong kaalaman tungkol sa sinaunang kabihasnang Tsina!
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Piliin ang tamang sagot sa bawat tanong
            </p>
          </div>

          {/* Progress bar */}
          {!isComplete && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>
                  Mga Nasagot: {answeredQuestions}/{totalQuestions}
                </span>
                <span>Oras: {formatTime(timeLeft)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#6B3100] h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(answeredQuestions / totalQuestions) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Content */}
          {!isComplete && renderQuestion()}
          {isComplete && !showResults && renderResults()}
          {isComplete && showResults && renderAnswerReview()}
        </div>
      </div>
    </div>
  );
};

export default Pretest;
