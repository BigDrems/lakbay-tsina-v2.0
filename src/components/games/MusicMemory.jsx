import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Play, Pause, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const instruments = [
  {
    id: 1,
    name: "Guzheng",
    description: "Traditional Chinese zither with 18-21 strings",
    image: "/images/guzheng.jpg",
    audio: "/audio/guzheng.mp3",
  },
  {
    id: 2,
    name: "Erhu",
    description: 'Two-string bowed instrument, known as the "Chinese violin"',
    image: "/images/erhu.jpg",
    audio: "/audio/erhu.mp3",
  },
  {
    id: 3,
    name: "Pipa",
    description: "Four-stringed lute with a pear-shaped body",
    image: "/images/pipa.jpg",
    audio: "/audio/pipa.mp3",
  },
  {
    id: 4,
    name: "Dizi",
    description: "Traditional Chinese flute made of bamboo",
    image: "/images/dizi.jpg",
    audio: "/audio/dizi.mp3",
  },
  {
    id: 5,
    name: "Yangqin",
    description: "Chinese hammered dulcimer with many strings",
    image: "/images/yangqin.jpg",
    audio: "/audio/yangqin.mp3",
  },
  {
    id: 6,
    name: "Gong",
    description: "Percussion instrument made of metal",
    image: "/images/gong.jpg",
    audio: "/audio/gong.mp3",
  },
];

const MusicMemory = () => {
  const navigate = useNavigate();
  const [shuffledInstruments, setShuffledInstruments] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [audioElements, setAudioElements] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Shuffle the instruments for the game
    const shuffled = [...instruments].sort(() => Math.random() - 0.5);
    setShuffledInstruments(shuffled);

    // Create audio elements for each instrument
    const audioEls = {};
    instruments.forEach((instrument) => {
      audioEls[instrument.id] = new Audio(instrument.audio);
      audioEls[instrument.id].addEventListener("ended", () => {
        setIsPlaying(false);
        setPlayingAudio(null);
      });
    });
    setAudioElements(audioEls);

    // Cleanup function
    return () => {
      Object.values(audioEls).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  const playAudio = (instrumentId) => {
    // Stop any currently playing audio
    if (playingAudio) {
      audioElements[playingAudio].pause();
      audioElements[playingAudio].currentTime = 0;
    }

    // Play the selected audio
    audioElements[instrumentId].play();
    setPlayingAudio(instrumentId);
    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (playingAudio) {
      audioElements[playingAudio].pause();
      audioElements[playingAudio].currentTime = 0;
      setPlayingAudio(null);
      setIsPlaying(false);
    }
  };

  const handleInstrumentClick = (instrument) => {
    if (matchedPairs.includes(instrument.id)) return;

    setSelectedInstrument(instrument);

    if (matchedPairs.length === 0) {
      // First selection
      setMatchedPairs([instrument.id]);
      playAudio(instrument.id);
    } else {
      // Check if the selection is correct
      const lastSelectedId = matchedPairs[matchedPairs.length - 1];
      const lastSelectedIndex = instruments.findIndex(
        (i) => i.id === lastSelectedId
      );
      const currentIndex = instruments.findIndex((i) => i.id === instrument.id);

      if (currentIndex === lastSelectedIndex + 1) {
        // Correct selection
        setMatchedPairs((prev) => [...prev, instrument.id]);
        setScore((prev) => prev + 10);
        playAudio(instrument.id);

        // Check if game is complete
        if (matchedPairs.length + 1 === instruments.length) {
          setGameComplete(true);
        }
      } else {
        // Incorrect selection
        setAttempts((prev) => prev + 1);
        playAudio(instrument.id);
      }
    }
  };

  const resetGame = () => {
    stopAudio();
    setShuffledInstruments([...instruments].sort(() => Math.random() - 0.5));
    setSelectedInstrument(null);
    setMatchedPairs([]);
    setScore(0);
    setAttempts(0);
    setGameComplete(false);
    setPlayingAudio(null);
    setIsPlaying(false);
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
            Music Memory
          </h1>
          <p className="text-center text-gray-600 mb-4 text-xs sm:text-base">
            Listen and match the traditional Chinese instruments
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
                        (matchedPairs.length / instruments.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <p className="text-center text-[#6B3100] font-medium text-xs sm:text-sm">
                  {matchedPairs.length} / {instruments.length} Matched
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {shuffledInstruments.map((instrument) => (
                  <motion.div
                    key={instrument.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      p-2 sm:p-3 rounded-lg border-2 cursor-pointer
                      ${
                        matchedPairs.includes(instrument.id)
                          ? "bg-green-100 border-green-500"
                          : selectedInstrument?.id === instrument.id
                          ? "bg-[#6B3100]/10 border-[#6B3100]"
                          : "bg-white border-gray-300 lg:hover:border-[#6B3100]/50"
                      }
                    `}
                    onClick={() => handleInstrumentClick(instrument)}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-gray-200 mb-2">
                        <img
                          src={instrument.image}
                          alt={instrument.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-[#6B3100] text-xs sm:text-sm">
                        {instrument.name}
                      </h3>
                      <p className="text-xs text-gray-600 text-center mt-1 line-clamp-2">
                        {instrument.description}
                      </p>
                      <div className="mt-2">
                        {playingAudio === instrument.id ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              stopAudio();
                            }}
                            className="bg-[#6B3100] text-white p-1.5 rounded-full hover:bg-[#6B3100]/90 transition-colors"
                          >
                            <Pause size={14} className="sm:w-4 sm:h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              playAudio(instrument.id);
                            }}
                            className="bg-[#6B3100] text-white p-1.5 rounded-full hover:bg-[#6B3100]/90 transition-colors"
                          >
                            <Play size={14} className="sm:w-4 sm:h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  Click on an instrument to play its sound
                </p>
                <p className="text-xs text-gray-500">
                  Match the instruments in the correct order to win
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicMemory;
