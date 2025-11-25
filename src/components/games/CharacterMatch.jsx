import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  playSound,
  playBackgroundMusic,
  stopBackgroundMusic,
} from "../../utils/soundManager";

const emperors = [
  {
    id: 1,
    name: "Confucius",
    title: "Dakilang Pilosopo",
    dynasty: "Panahon ng Spring at Autumn",
    description:
      "Tagapagtatag ng Confucianism, nagbigay-diin sa moral na paghubog at pagkakaisa ng lipunan",
    image: "/character/confucius.avif",
    image2: "/character/confucius.avif", // Second image for matching
    reign: "551-479 BC",
  },
  {
    id: 2,
    name: "Laozi",
    title: "Pantas ng Taoism",
    dynasty: "Sinaunang Tsina",
    description: "Alamat na tagapagtatag ng Taoism, may-akda ng Tao Te Ching",
    image: "/character/laozi.jpg",
    image2: "/character/laozi.jpg",
    reign: "Ika-6 na siglo BC",
  },
  {
    id: 3,
    name: "Emperor Taizu",
    title: "Tagapagtatag ng Song Dynasty",
    dynasty: "Dinastiyang Song",
    description:
      "Itinatag ang Dinastiyang Song, kilala sa repormang militar at administratibo",
    image: "/character/taizu.jpg",
    image2: "/character/taizu.jpg",
    reign: "960-976 AD",
  },
  {
    id: 4,
    name: "Emperor Tianzhang",
    title: "Emperador ng Ming",
    dynasty: "Dinastiyang Ming",
    description:
      "Kilala bilang emperador ng Dinastiyang Ming na nagtaguyod ng mga kultural na tagumpay",
    image: "/character/tianxiang.webp",
    image2: "/character/tianxiang.webp",
    reign: "Panahon ng Ming",
  },
  {
    id: 5,
    name: "Yu the Great",
    title: "Alamat na Tagapagtatag",
    dynasty: "Dinastiyang Xia",
    description:
      "Alamat na tagapagtatag ng Dinastiyang Xia, tanyag sa pagkontrol ng pagbaha",
    image: "/character/yuthegreat.jpg",
    image2: "/character/yuthegreat.jpg",
    reign: "c. 2123-2025 BC",
  },
  {
    id: 6,
    name: "Wu Zetian",
    title: "Nag-iisang Babaeng Emperador",
    dynasty: "Dinastiyang Tang",
    description:
      "Ang tanging babae na humawak ng titulong Emperador sa kasaysayan ng Tsina",
    image: "/character/zetian.jpg",
    image2: "/character/zetian.jpg",
    reign: "690-705 AD",
  },
];

const EmperorMatch = () => {
  const navigate = useNavigate();
  const [shuffledEmperors, setShuffledEmperors] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    resetGame();
    // Start background music when component mounts
    playBackgroundMusic();

    // Cleanup: stop background music when component unmounts
    return () => {
      stopBackgroundMusic();
    };
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
    playSound("flip"); // Play flip sound when card is clicked

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
        playSound("correct"); // Play correct sound for successful matches

        if (matchedPairs.length + 1 === emperors.length) {
          setGameComplete(true);
          playSound("complete"); // Play complete sound for game completion
        }
      } else {
        // Add a small delay before playing the wrong sound
        setTimeout(() => {
          playSound("wrong"); // Play wrong sound for failed matches with delay
        }, 300); // 300ms delay
      }

      setTimeout(() => {
        setFlippedCards([]);
        setIsChecking(false);
      }, 800);
    }
  };

  const resetGame = () => {
    // Create pairs of images (primary and secondary) for each emperor
    const pairs = emperors.flatMap((emperor) => [
      { ...emperor, type: "primary" },
      { ...emperor, type: "secondary" },
    ]);
    setShuffledEmperors([...pairs].sort(() => Math.random() - 0.5));
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
            aria-label="Back"
          >
            <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
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
            Emperor Match
          </h1>
          <p className="text-center text-gray-600 mb-4 text-xs sm:text-base">
            Hanapin ang Kapareha
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
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full mb-2">
                    <div
                      className="h-2 bg-[#6B3100] rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (matchedPairs.length / emperors.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-center text-[#6B3100] font-medium text-xs sm:text-sm">
                    {matchedPairs.length} / {emperors.length} Matched
                  </p>
                </div>

                <div className="grid grid-cols-4 lg:grid-cols-4 md:grid-cols-4 gap-2 lg:gap-2">
                  {shuffledEmperors.map((card) => (
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
                          rounded-lg border-4 flex flex-col items-center justify-center text-center
                          bg-gradient-to-br from-amber-600 to-amber-800 border-amber-700 shadow-md
                          ${
                            matchedPairs.includes(card.id)
                              ? "cursor-default"
                              : "cursor-pointer hover:border-amber-600 hover:shadow-lg transition-all duration-200"
                          }
                        `}
                        onClick={() => handleCardClick(card)}
                        disabled={matchedPairs.includes(card.id) || isChecking}
                      >
                        <span className="text-2xl sm:text-3xl text-white">
                          👑
                        </span>
                      </motion.button>
                      <motion.div
                        initial={false}
                        animate={{
                          rotateY: isCardFlipped(card) ? 0 : -180,
                        }}
                        transition={{ duration: 0.4 }}
                        className={`
                          absolute w-22 h-22 inset-0 lg:w-full lg:h-full backface-hidden
                          rounded-lg border-4 flex flex-col items-center justify-center text-center p-2
                          ${
                            matchedPairs.includes(card.id)
                              ? "bg-green-100 border-green-500 shadow-md"
                              : "bg-white border-[#6B3100]/80 shadow-md"
                          }
                        `}
                      >
                        <div className="w-full h-full relative rounded-lg overflow-hidden">
                          <img
                            src={
                              card.type === "primary" ? card.image : card.image2
                            }
                            alt={card.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200">
                            <span className="text-lg sm:text-xl">🎭</span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white px-2 py-1">
                            <span className="text-xs sm:text-sm font-bold text-center block leading-tight">
                              {card.name}
                            </span>
                          </div>
                        </div>
                        {matchedPairs.includes(card.id) && (
                          <Check className="absolute top-1 right-1 text-green-500 w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                <style>{`
                  .backface-hidden {
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    transform-style: preserve-3d;
                    -webkit-transform-style: preserve-3d;
                  }
                `}</style>

                <div className="mt-4 sm:mt-6 text-center">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Click on a card to reveal it, then find its matching image
                    of the same emperor
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmperorMatch;
