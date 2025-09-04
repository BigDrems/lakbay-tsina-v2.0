import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCw, Check, X, Trophy, Target, Volume2, VolumeX } from "lucide-react";
import { playSound, playBackgroundMusic, stopBackgroundMusic, setBackgroundVolume } from '../../utils/soundManager';

// Actual pyramid data
const PYRAMID_DATA = [
  "Emperador",
  "Maharlika",
  "Mga Opisyal",
  "Magsasaka",
  "Mangangalakal",
  "Alipin",
];

const PyramidGame = ({ onComplete, onBack }) => {
  const [items, setItems] = useState([]);
  const [slots, setSlots] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [draggedItem, setDraggedItem] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    initializeGame();

    // Start background music when component mounts
    if (soundEnabled) {
      playBackgroundMusic();
    }

    // Cleanup background music when component unmounts
    return () => {
      stopBackgroundMusic();
    };
  }, []);

  useEffect(() => {
    // Handle background music when sound is toggled
    if (soundEnabled) {
      playBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  }, [soundEnabled]);

  const initializeGame = () => {
    // Shuffle the items for dragging
    const shuffledItems = [...PYRAMID_DATA].sort(() => Math.random() - 0.5);
    setItems(
      shuffledItems.map((item) => ({
        id: Math.random(),
        content: item,
        isUsed: false,
      }))
    );

    // Create slots based on the correct order, initially empty
    setSlots(
      PYRAMID_DATA.map((item, index) => ({
        id: index,
        correctContent: item,
        content: null,
        isCorrect: false,
        level: index,
      }))
    );

    setIsComplete(false);
    setScore(0);
    setAttempts(0);
    setShowHint(false);
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";

    // Play flip sound when starting to drag
    if (soundEnabled) {
      playSound('flip');
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, slotIndex) => {
    e.preventDefault();
    const droppedItem = JSON.parse(e.dataTransfer.getData("text/plain"));

    // Check if slot is already filled
    if (slots[slotIndex].content !== null) return;

    // Update slots
    const newSlots = [...slots];
    const isCorrect = droppedItem.content === newSlots[slotIndex].correctContent;
    newSlots[slotIndex] = {
      ...newSlots[slotIndex],
      content: droppedItem.content,
      isCorrect: isCorrect,
    };
    setSlots(newSlots);

    // Mark item as used
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === droppedItem.id ? { ...item, isUsed: true } : item
      )
    );

    setAttempts((prev) => prev + 1);

    // Play sound based on correctness
    if (soundEnabled) {
      if (isCorrect) {
        playSound('correct');
      } else {
        playSound('wrong');
      }
    }

    checkCompletion(newSlots);
  };

  const handleSlotClick = (slotIndex) => {
    if (slots[slotIndex].content === null) return;

    // Return item to available items
    const returnedContent = slots[slotIndex].content;
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.content === returnedContent ? { ...item, isUsed: false } : item
      )
    );

    // Clear slot
    const newSlots = [...slots];
    newSlots[slotIndex] = {
      ...newSlots[slotIndex],
      content: null,
      isCorrect: false,
    };
    setSlots(newSlots);

    // Play flip sound when removing item
    if (soundEnabled) {
      playSound('flip');
    }
  };

  const checkCompletion = (currentSlots) => {
    const allSlotsFilled = currentSlots.every((slot) => slot.content !== null);
    if (allSlotsFilled) {
      const correctCount = currentSlots.filter((slot) => slot.isCorrect).length;
      const isFullyCorrect = correctCount === PYRAMID_DATA.length;

      if (isFullyCorrect) {
        setIsComplete(true);
        const finalScore = Math.max(100 - attempts * 5, 20);
        setScore(finalScore);

        // Play completion sound
        if (soundEnabled) {
          setTimeout(() => {
            playSound('complete');
          }, 500); // Delay to let the last correct sound finish
        }
      }
    }
  };

  const handleReset = () => {
    initializeGame();

    // Play flip sound for reset
    if (soundEnabled) {
      playSound('flip');
    }
  };

  const handleContinue = () => {
    // Stop background music before leaving
    stopBackgroundMusic();

    if (onComplete) {
      onComplete(score);
    } else {
      window.location.href = "/entertainment";
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);

    // Play flip sound for UI interactions
    if (soundEnabled) {
      playSound('flip');
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const getSlotWidth = (level) => {
    const widths = ["w-40", "w-48", "w-56", "w-64", "w-72", "w-80"];
    return widths[level] || "w-80";
  };

  const getSlotColor = (slot) => {
    if (slot.content === null) return "border-gray-300 bg-gray-50";
    if (slot.isCorrect) return "border-green-500 bg-green-100";
    return "border-red-500 bg-red-100";
  };

  const availableItems = items.filter((item) => !item.isUsed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-row justify-between items-center mb-6 gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-amber-800"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Bumalik</span>
            </button>
          )}

          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow-md">
              <span className="text-amber-800 font-semibold">
                Score: {score}
              </span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-md">
              <span className="text-amber-800 font-semibold">
                Attempts: {attempts}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={toggleSound}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                soundEnabled
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-500 hover:bg-gray-600 text-white'
              }`}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              <span className="hidden sm:inline">
                {soundEnabled ? 'Sound On' : 'Sound Off'}
              </span>
            </button>
            <button
              onClick={toggleHint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Target size={20} />
              <span className="hidden sm:inline">Hint</span>
            </button>
            {!isComplete && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <RefreshCw size={20} />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-amber-800 mb-4">
            🏛️ Pyramide ng Lipunan
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 mb-6">
            I-drag at i-drop ang mga salita upang buuin ang tamang
            pagkakasunod-sunod ng lipunan mula sa pinakamataas hanggang
            pinakamababa.
          </p>

          {/* Hint Section */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg"
              >
                <p className="text-blue-800 font-medium">
                  💡 Tip: Ang pyramid ay nagsisimula sa pinakamataas na antas ng
                  lipunan (tuktok) hanggang sa pinakamababang antas (ibaba).
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Completion Message */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-6 bg-green-50 border border-green-200 rounded-xl"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Trophy className="text-yellow-500" size={32} />
                  <h2 className="text-2xl font-bold text-green-800">
                    🎉 Binati Kita!
                  </h2>
                  <Trophy className="text-yellow-500" size={32} />
                </div>
                <p className="text-green-700 mb-4">
                  Natapos mo ang pyramid! Nakakuha ka ng {score} puntos sa{" "}
                  {attempts} na pagsubok.
                </p>
                <button
                  onClick={handleContinue}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto font-semibold"
                >
                  <Check size={20} />
                  Magpatuloy
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col lg:flex-row justify-center items-start gap-8">
            {/* Available Items */}
            <div className="w-full lg:w-1/3">
              <h3 className="text-lg font-semibold text-amber-800 mb-4">
                Mga Salita
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 p-4 border-2 border-dashed border-amber-300 rounded-xl bg-amber-50 min-h-[300px]">
                {availableItems.map((item) => (
                  <motion.div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragEnd={handleDragEnd}
                    whileHover={{ scale: 1.05 }}
                    whileDrag={{ scale: 1.1, rotate: 5 }}
                    className={`px-3 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-amber-900 rounded-lg cursor-grab shadow-md hover:shadow-lg transition-all font-semibold text-center text-base flex items-center justify-center ${
                      draggedItem?.id === item.id ? "opacity-50" : ""
                    }`}
                  >
                    {item.content}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pyramid */}
            <div className="w-full lg:w-2/3">
              <h3 className="text-lg font-semibold text-amber-800 mb-4">
                Pyramid ng Lipunan
              </h3>
              <div className="flex flex-col items-center justify-center space-y-3">
                {slots.map((slot, index) => (
                  <motion.div
                    key={slot.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    onClick={() => handleSlotClick(index)}
                    whileHover={{ scale: 1.02 }}
                    className={`${getSlotWidth(
                      index
                    )} h-16 flex items-center justify-center border-2 rounded-lg text-lg font-semibold cursor-pointer transition-all ${getSlotColor(
                      slot
                    )} hover:shadow-md relative`}
                  >
                    <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-amber-600 font-bold text-sm">
                      {index + 1}
                    </div>
                    {slot.content ? (
                      <div className="flex items-center gap-2">
                        {slot.content}
                        {slot.isCorrect ? (
                          <Check className="text-green-600" size={20} />
                        ) : (
                          <X className="text-red-600" size={20} />
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500 italic">I-drop dito</span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Pyramid base decoration */}
              <div className="mt-4 flex justify-center">
                <div className="w-96 h-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              📝 <strong>Paano maglaro:</strong> I-drag ang mga salita mula sa
              kaliwa at i-drop sa tamang posisyon sa pyramid. I-click ang mga
              slot upang ibalik ang mga item. Subukan mong makakuha ng mataas na
              score! {soundEnabled && "🔊 May sound effects para sa mas masayang karanasan!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PyramidGame;