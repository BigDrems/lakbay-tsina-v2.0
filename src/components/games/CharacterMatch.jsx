import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const characters = [
  {
    id: 1,
    character: "爱",
    pinyin: "ài",
    meaning: "love",
    example: "我爱你 (Wǒ ài nǐ) - I love you",
  },
  {
    id: 2,
    character: "家",
    pinyin: "jiā",
    meaning: "home/family",
    example: "家人 (jiā rén) - family members",
  },
  {
    id: 3,
    character: "朋",
    pinyin: "péng",
    meaning: "friend",
    example: "朋友 (péng you) - friend",
  },
  {
    id: 4,
    character: "学",
    pinyin: "xué",
    meaning: "study/learn",
    example: "学习 (xué xí) - to study",
  },
  {
    id: 5,
    character: "心",
    pinyin: "xīn",
    meaning: "heart",
    example: "开心 (kāi xīn) - happy",
  },
  {
    id: 6,
    character: "好",
    pinyin: "hǎo",
    meaning: "good",
    example: "很好 (hěn hǎo) - very good",
  },
];

const CharacterMatch = () => {
  const navigate = useNavigate();
  const [shuffledCharacters, setShuffledCharacters] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const handleCardClick = (card) => {
    if (
      isChecking ||
      matchedPairs.includes(card.id) ||
      flippedCards.length === 2 ||
      flippedCards.find((c) => c.id === card.id && c.type === card.type)
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setAttempts((prev) => prev + 1);

      const [firstCard, secondCard] = newFlippedCards;

      if (
        firstCard.id === secondCard.id &&
        firstCard.type !== secondCard.type
      ) {
        setMatchedPairs((prev) => [...prev, firstCard.id]);
        setScore((prev) => prev + 10);

        if (matchedPairs.length + 1 === characters.length) {
          setGameComplete(true);
        }
      }

      setTimeout(() => {
        setFlippedCards([]);
        setIsChecking(false);
      }, 800);
    }
  };

  const resetGame = () => {
    const pairs = characters.flatMap((char) => [
      { ...char, type: "character" },
      { ...char, type: "meaning" },
    ]);
    setShuffledCharacters([...pairs].sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMatchedPairs([]);
    setScore(0);
    setAttempts(0);
    setGameComplete(false);
    setIsChecking(false);
  };

  const isCardFlipped = (card) => {
    return (
      matchedPairs.includes(card.id) ||
      flippedCards.find((c) => c.id === card.id && c.type === card.type)
    );
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
            <div className="text-[#6B3100] font-medium text-sm sm:text-base">
              Score: {score}
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

        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
          <h1 className="text-xl sm:text-3xl font-bold text-[#6B3100] mb-2 text-center">
            Character Match
          </h1>
          <p className="text-center text-gray-600 mb-4 text-xs sm:text-base">
            Match Chinese characters with their meanings
          </p>

          {gameComplete ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 sm:py-8"
            >
              <h2 className="text-lg sm:text-2xl font-bold text-[#6B3100] mb-3">
                Great job!
              </h2>
              <p className="text-sm sm:text-lg mb-4">
                You completed the game in {attempts} attempts!
              </p>
              <div className="text-base sm:text-xl font-bold mb-6">
                Your Score: {score}
              </div>
              <button
                onClick={resetGame}
                className="bg-[#6B3100] text-white px-4 py-2 rounded-lg lg:hover:bg-[#6B3100]/90 transition-colors text-sm sm:text-base"
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
                        (matchedPairs.length / characters.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <p className="text-center text-[#6B3100] font-medium text-xs sm:text-sm">
                  {matchedPairs.length} / {characters.length} Matched
                </p>
              </div>

              <div className="grid grid-cols-4 lg:grid-cols-4 md:grid-cols-4 gap-2 lg:gap-2">
                {shuffledCharacters.map((card) => (
                  <motion.div
                    key={`${card.id}-${card.type}`}
                    className="relative aspect-square"
                  >
                    <motion.button
                      initial={false}
                      animate={{
                        rotateY: isCardFlipped(card) ? 180 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      className={`
                        absolute inset-0 lg:w-full lg:h-full backface-hidden w-22 h-22
                        rounded-lg border-2 flex flex-col items-center justify-center text-center
                        bg-[#6B3100] border-[#6B3100]/50
                        ${
                          matchedPairs.includes(card.id)
                            ? "cursor-default"
                            : "cursor-pointer lg:hover:bg-[#6B3100]/90"
                        }
                      `}
                      onClick={() => handleCardClick(card)}
                      disabled={matchedPairs.includes(card.id) || isChecking}
                    >
                      <span className="text-lg sm:text-xl text-white">?</span>
                    </motion.button>
                    <motion.div
                      initial={false}
                      animate={{
                        rotateY: isCardFlipped(card) ? 0 : -180,
                      }}
                      transition={{ duration: 0.4 }}
                      className={`
                        absolute w-22 h-22 inset-0 lg:w-full lg:h-full backface-hidden
                        rounded-lg border-2 flex flex-col items-center justify-center text-center
                        ${
                          matchedPairs.includes(card.id)
                            ? "bg-green-100 border-green-500"
                            : "bg-white border-[#6B3100]"
                        }
                      `}
                    >
                      {card.type === "character" ? (
                        <>
                          <span className="text-2xl sm:text-3xl font-bold text-[#6B3100] mb-1">
                            {card.character}
                          </span>
                          <span className="text-xs text-gray-600">
                            {card.pinyin}
                          </span>
                        </>
                      ) : (
                        <div className="text-xs sm:text-sm text-[#6B3100] px-2">
                          {card.meaning}
                        </div>
                      )}
                      {matchedPairs.includes(card.id) && (
                        <Check className="absolute top-1 right-1 text-green-500 w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <style jsx>{`
                .backface-hidden {
                  backface-visibility: hidden;
                  -webkit-backface-visibility: hidden;
                  transform-style: preserve-3d;
                  -webkit-transform-style: preserve-3d;
                }
              `}</style>

              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs sm:text-sm text-gray-600">
                  Click on a card to reveal it, then find its matching pair
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterMatch;
