// src/WelcomePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Volume2, VolumeX } from "lucide-react";
import { conversation, characterPuzzle } from "../data/welcomePageData";
import { speak, initializeSpeech } from "../utils/speech";
import CharacterPuzzle from "../components/CharacterPuzzle";

function WelcomePage({ onComplete }) {
  const [step, setStep] = useState(0);
  const [showLiMei, setShowLiMei] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [solvedPairs, setSolvedPairs] = useState([]);
  const [puzzleComplete, setPuzzleComplete] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [synth, setSynth] = useState(null);
  const navigate = useNavigate();

  // Pre-initialize speech synthesis
  useEffect(() => {
    let cleanupFunction = null;

    const initSynth = async () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        try {
          // Force Chrome to load voices
          window.speechSynthesis.getVoices();

          // Add a small delay to ensure voices are loaded
          setTimeout(() => {
            // Store the synth reference without calling speak
            setSynth(window.speechSynthesis);
            setIsLoaded(true);
            cleanupFunction = initializeSpeech(setIsLoaded);
          }, 100);
        } catch (error) {
          console.error("Speech synthesis initialization error:", error);
          setIsLoaded(false);
        }
      }
    };

    initSynth();

    return () => {
      if (cleanupFunction) cleanupFunction();
      if (synth) {
        synth.cancel();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Handle sound toggle with first-time interaction - this is user-activated
  const handleSoundToggle = async () => {
    const newSoundState = !isSoundOn;
    setIsSoundOn(newSoundState);
    setHasInteracted(true);

    // If turning sound off, cancel any ongoing speech
    if (!newSoundState && synth) {
      synth.cancel();
      setIsPlaying(false);
      return;
    }

    // This is a user interaction, so it's safe to initialize speech here
    if (newSoundState) {
      try {
        // Pre-warm voices on user interaction
        if (window.speechSynthesis) {
          // Force Chrome to load voices after user interaction
          window.speechSynthesis.getVoices();
          setSynth(window.speechSynthesis);

          // Add a small delay to ensure voices are loaded
          setTimeout(async () => {
            // Speak current text if first time enabling
            if (!hasInteracted) {
              setIsPlaying(true);
              await speak(conversation[step].text, true, volume, setIsPlaying);
            }
          }, 100);
        }
      } catch (error) {
        console.error("Speech activation error:", error);
        setIsPlaying(false);
      }
    }
  };

  // Effect for speaking when page is loaded or step changes
  useEffect(() => {
    const speakText = async () => {
      // If sound is off, don't speak
      if (!isSoundOn) {
        return;
      }

      if (
        isLoaded &&
        isSoundOn &&
        hasInteracted &&
        conversation[step] &&
        !isPlaying &&
        synth
      ) {
        setIsPlaying(true);
        try {
          await speak(conversation[step].text, isSoundOn, volume, setIsPlaying);
        } catch (error) {
          console.error("Speech synthesis error:", error);
          setIsPlaying(false);
        }
      }
    };
    speakText();
  }, [isLoaded, step, isSoundOn, hasInteracted, volume, synth]);

  // Handle speech synthesis visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && synth) {
        synth.cancel();
        setIsPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [synth]);

  const handleDragStart = (e, item, type) => {
    setDraggedItem({ ...item, type });
    e.dataTransfer.setData("text/plain", "");
    e.currentTarget.classList.add("opacity-50");
  };

  const handleDragEnd = (e) => {
    setDraggedItem(null);
    e.currentTarget.classList.remove("opacity-50");
  };

  const handleDragOver = (e, item, type) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.type === type) return;
    setDragOverItem({ ...item, type });
  };

  const handleDrop = (e, item, type) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.type === type) return;

    const match =
      draggedItem.type === "character"
        ? draggedItem.meaning === item.meaning
        : item.meaning === draggedItem.meaning;

    if (match) {
      const matchedChar = draggedItem.type === "character" ? draggedItem : item;
      if (!solvedPairs.some((pair) => pair.id === matchedChar.id)) {
        const newSolvedPairs = [...solvedPairs, matchedChar];
        setSolvedPairs(newSolvedPairs);

        if (newSolvedPairs.length === characterPuzzle.length) {
          const speakCongratulations = async () => {
            setIsPlaying(true);
            await speak(
              "Napakaganda! Nabuksan mo ang sinaunang karunungan. Naghihintay na ang iyong paglalakbay...",
              isSoundOn,
              volume,
              setIsPlaying
            );
            setPuzzleComplete(true);
            setStep(4);
          };
          speakCongratulations();
        }
      }
    }

    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleOptionClick = async (nextStep) => {
    if (typeof nextStep === "string") {
      setIsPlaying(true);
      await speak(
        "Congratulations! You've proven yourself worthy to explore the wonders of China. Your journey begins now, and I'll be here to guide you along the way. Let's discover the treasures that await!",
        isSoundOn,
        volume,
        setIsPlaying
      );
      onComplete();
      navigate(nextStep);
    } else if (nextStep !== null) {
      setStep(nextStep);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 bg-[url('/images/rice-paper.png')] bg-repeat">
      <div className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-2xl bg-white rounded-none border-2 border-[#6B3100] p-8 sm:p-10 space-y-6 shadow-[8px_8px_0px_0px_rgba(107,49,0,0.2)]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-1 h-12 bg-[#6B3100] mx-2"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#6B3100] tracking-wider">
              Lakbay Tsina
            </h1>
            <div className="w-1 h-12 bg-[#6B3100] mx-2"></div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-[2px] bg-[#6B3100]"></div>
            <div className="text-[#6B3100] text-xl">游记</div>
            <div className="w-16 h-[2px] bg-[#6B3100]"></div>
          </div>
        </div>

        {/* Sound Controls */}
        <div className="flex justify-end items-center space-x-4 mb-6 border-b border-[#6B3100]/20 pb-4">
          <button
            onClick={handleSoundToggle}
            disabled={isPlaying}
            className={`text-[#6B3100] transition-colors relative ${
              isPlaying
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-[#8B4513]"
            }`}
            aria-label={isSoundOn ? "Mute sound" : "Unmute sound"}
          >
            {isSoundOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
            {!hasInteracted && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
            )}
          </button>
          {isSoundOn && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              disabled={isPlaying}
              className={`w-24 accent-[#6B3100] ${
                isPlaying ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Volume control"
            />
          )}
          <button
            onClick={() => setShowLiMei(!showLiMei)}
            disabled={isPlaying}
            className={`text-[#6B3100] transition-colors ${
              isPlaying
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-[#8B4513]"
            }`}
            title={showLiMei ? "Hide Li Mei" : "Show Li Mei"}
            aria-label={showLiMei ? "Hide Li Mei" : "Show Li Mei"}
          >
            {showLiMei ? <Eye size={24} /> : <EyeOff size={24} />}
          </button>
        </div>

        {!hasInteracted && !isSoundOn && (
          <div className="bg-[#6B3100]/10 p-4 rounded-lg mb-4 text-center">
            <p className="text-[#6B3100] font-medium text-sm">
              Click the sound icon to enable Li Mei's voice 🔊
            </p>
          </div>
        )}

        <div className="space-y-6">
          {showLiMei && (
            <div className="flex items-center justify-center mb-6">
              <div className="w-28 h-28 rounded-full bg-[#F5E6D3] border-2 border-[#6B3100] flex items-center justify-center p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border border-[#6B3100]/20">
                  <img
                    src="/avatar.jpg"
                    alt="Li Mei"
                    className="w-full h-full object-cover rounded-full"
                    style={{
                      imageRendering: "high-quality",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="bg-[#F5E6D3] p-6 border-2 border-[#6B3100] relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#6B3100] -translate-x-1 -translate-y-1"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#6B3100] translate-x-1 -translate-y-1"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#6B3100] -translate-x-1 translate-y-1"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#6B3100] translate-x-1 translate-y-1"></div>
            <p className="text-base sm:text-lg md:text-xl text-[#6B3100] font-medium leading-relaxed">
              {conversation[step].text}
            </p>
          </div>

          {conversation[step].type === "puzzle" ? (
            <CharacterPuzzle
              solvedPairs={solvedPairs}
              draggedItem={draggedItem}
              dragOverItem={dragOverItem}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragLeave={handleDragLeave}
            />
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {conversation[step].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option.nextStep)}
                  disabled={isPlaying || !isLoaded}
                  className={`px-6 py-3 border-2 text-[#6B3100] 
                           transition-all duration-300 ease-in-out text-sm sm:text-base font-medium
                           focus:outline-none focus:ring-2 focus:ring-[#6B3100] focus:ring-offset-2
                           w-full sm:w-auto relative group overflow-hidden
                           ${
                             index === 0
                               ? "border-[#6B3100] bg-[#6B3100]/5 shadow-lg hover:shadow-xl hover:scale-105"
                               : "border-[#6B3100]/50 hover:border-[#6B3100] hover:scale-102"
                           }
                           ${
                             isPlaying || !isLoaded
                               ? "opacity-50 cursor-not-allowed"
                               : "hover:bg-[#6B3100] hover:text-white"
                           }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {option.label}
                    {index === 0 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                  <div
                    className={`absolute inset-0 bg-[#6B3100] transform -translate-x-full 
                                ${
                                  !isPlaying && isLoaded
                                    ? "group-hover:translate-x-0"
                                    : ""
                                } 
                                transition-transform duration-300 ease-in-out`}
                  ></div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-3 mt-8">
          {conversation.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 transform rotate-45 ${
                index === step ? "bg-[#6B3100]" : "bg-[#6B3100]/30"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
