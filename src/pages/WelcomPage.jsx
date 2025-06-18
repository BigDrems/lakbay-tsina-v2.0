import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { conversation } from "../data/welcomePageData";
import IntroAnimation from "../components/welcome/IntroAnimation";
import EmbeddedWorldMap from "../components/EmbeddedWorldMap";
import Pretest from "../components/games/Pretest";

function WelcomePage({ onComplete }) {
  const navigate = useNavigate();

  // State management
  const [step, setStep] = useState(0);
  const [showLiMei, setShowLiMei] = useState(true);
  const [worldMapComplete, setWorldMapComplete] = useState(false);
  const [bgAnimation, setBgAnimation] = useState(false);
  const [showIntroAnim, setShowIntroAnim] = useState(true);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPretest, setShowPretest] = useState(false);
  const textRef = useRef("");
  const typingIntervalRef = useRef(null);

  // Effects ------------------------------------------

  // Handle intro animation timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntroAnim(false);
    }, 8000); // Extended time to allow for interaction with the new animation

    return () => clearTimeout(timer);
  }, []);

  // Typing effect for conversation text
  useEffect(() => {
    if (!conversation[step] || !conversation[step].text) {
      return;
    }

    const currentText = conversation[step].text;
    textRef.current = currentText;

    // Reset typing state
    setIsTyping(false);
    setTypingText("");

    // Create refs to track interval and typing state within the effect
    let isCanceledRef = false;

    const startTyping = () => {
      if (isCanceledRef) return;

      setIsTyping(true);
      let index = 0;
      setTypingText(currentText.charAt(0));
      index = 1;

      typingIntervalRef.current = setInterval(() => {
        if (isCanceledRef) {
          clearInterval(typingIntervalRef.current);
          return;
        }

        if (index < currentText.length) {
          setTypingText(currentText.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typingIntervalRef.current);
          setIsTyping(false);
        }
      }, 60);
    };

    const typingTimer = setTimeout(startTyping, 200);

    // Cleanup function
    return () => {
      isCanceledRef = true;
      clearTimeout(typingTimer);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [step]);

  // Background animation toggle when step changes
  useEffect(() => {
    setBgAnimation(true);
    const timer = setTimeout(() => setBgAnimation(false), 1000);
    return () => clearTimeout(timer);
  }, [step]);

  // Event handlers ------------------------------------------

  const skipTyping = () => {
    if (isTyping && textRef.current) {
      // Clear the typing interval
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }

      // Stop typing state
      setIsTyping(false);

      // Immediately set the full text
      setTypingText(textRef.current);
    }
  };

  const handleWorldMapComplete = () => {
    setWorldMapComplete(true);
    setStep(4); // Move to the next step after map completion
  };

  const handlePretestComplete = () => {
    setShowPretest(false);
    setStep(7); // Move to the final step after pretest completion
  };

  const handleOptionClick = async (nextStep) => {
    if (typeof nextStep === "string") {
      if (nextStep === "pretest") {
        setShowPretest(true);
      } else {
        onComplete();
        navigate(nextStep);
      }
    } else if (nextStep !== null) {
      setStep(nextStep);
    }
  };

  // If pretest is showing, render the pretest component
  if (showPretest) {
    return (
      <div className="min-h-screen bg-[#F5E6D3]">
        <Pretest onComplete={handlePretestComplete} />
      </div>
    );
  }

  const renderIntroAnimation = () => {
    return <IntroAnimation showIntroAnim={showIntroAnim} />;
  };

  const renderHeader = () => (
    <header className="bg-gradient-to-r from-amber-800 to-orange-700 py-4 sm:py-6 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 sm:w-32 md:w-40 h-20 sm:h-32 md:h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-4 sm:left-10 w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 bg-white/10 rounded-full translate-y-1/2"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between relative z-10 gap-3 sm:gap-0">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold text-white tracking-wide">
            Lakbay Tsina
          </h1>
          <div className="flex items-center mt-1">
            <span className="text-amber-200 text-base sm:text-lg">
              去中国旅行
            </span>
            <div className="w-16 sm:w-20 md:w-24 h-[1px] bg-amber-200/50 ml-2 sm:ml-3"></div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={() => setShowLiMei(!showLiMei)}
            className="p-2 sm:p-2.5 rounded-full bg-white/20 transition-all hover:bg-white/30 hover:scale-105 active:scale-95"
            title={showLiMei ? "Hide Li Mei" : "Show Li Mei"}
            aria-label={showLiMei ? "Hide Li Mei" : "Show Li Mei"}
          >
            {showLiMei ? (
              <Eye
                size={20}
                className="sm:w-6 sm:h-6 text-black lg:text-black drop-shadow-md"
              />
            ) : (
              <EyeOff
                size={20}
                className="sm:w-6 sm:h-6 text-black lg:text-black drop-shadow-md"
              />
            )}
          </button>
        </div>
      </div>
    </header>
  );

  const renderConversationBubble = () => (
    <div
      onClick={skipTyping}
      className={`bg-gradient-to-r from-amber-50 to-orange-50 p-3 sm:p-4 md:p-5 rounded-xl relative shadow-sm 
        transition-all duration-300 ${
          isTyping
            ? "cursor-pointer hover:shadow-lg border-2 border-amber-300 hover:border-amber-500 hover:-translate-y-0.5"
            : "border border-amber-100"
        }`}
      role={isTyping ? "button" : "none"}
      aria-label={isTyping ? "Click to skip typing animation" : ""}
      tabIndex={isTyping ? 0 : -1}
      onKeyDown={(e) => isTyping && e.key === "Enter" && skipTyping()}
    >
      {/* Indicate clickable state visually */}
      {isTyping && (
        <div className="absolute -top-2 -right-2 w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center shadow-md animate-pulse z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </div>
      )}

      <p
        className="text-amber-900 text-base sm:text-lg leading-relaxed text-justify"
        dangerouslySetInnerHTML={{
          __html:
            conversation && conversation[step] && typingText
              ? typingText
              : conversation[step]?.text || "Naglo-load...",
        }}
      ></p>
      {isTyping && (
        <span className="inline-block w-1.5 h-5 bg-amber-700 ml-0.5 animate-blink"></span>
      )}

      {isTyping && (
        <div className="absolute bottom-2 right-2 text-xs font-medium text-amber-600 bg-amber-100 px-2 py-1 rounded-md flex items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>Click to skip typing</span>
        </div>
      )}
    </div>
  );

  const renderWorldMap = () => (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl border border-amber-200 shadow-sm transition-all duration-300 hover:shadow-md">
      <h3 className="text-center text-base sm:text-lg font-medium text-amber-900 mb-3 sm:mb-4">
        Tuklasin ang China sa Mapa
      </h3>
      <div className="bg-amber-50/50 p-2 sm:p-3 mb-3 sm:mb-4 rounded-lg text-xs sm:text-sm text-amber-800 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-amber-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        I-click ang marker sa China para simulan ang iyong paglalakbay
      </div>
      <div className="h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden border border-amber-200">
        <EmbeddedWorldMap onComplete={handleWorldMapComplete} />
      </div>
    </div>
  );

  const renderOptions = () => {
    if (!conversation[step]?.options?.length) return null;

    return (
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mt-4 sm:mt-6">
        {conversation[step]?.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option.nextStep)}
            disabled={isTyping}
            className={`group px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base font-medium
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500
                     flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed
                     ${
                       index === 0
                         ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md hover:shadow-lg hover:from-amber-700 hover:to-amber-800 active:shadow-sm"
                         : "border-2 border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 active:bg-amber-100"
                     }`}
          >
            {option.label}
            {index === 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1"
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
          </button>
        ))}
      </div>
    );
  };

  const renderStepIndicators = () => (
    <div className="flex justify-center space-x-3 mt-8">
      {conversation.map((_, index) => (
        <button
          key={index}
          onClick={() => !isTyping && setStep(index)}
          disabled={isTyping}
          className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed
          ${
            index === step
              ? "bg-amber-600 scale-110"
              : "bg-amber-200 hover:bg-amber-300"
          }`}
          aria-label={`Go to step ${index + 1}`}
        >
          <span className="sr-only">Step {index + 1}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div
      className={`min-h-screen relative overflow-visible flex items-center justify-center p-2 sm:p-4 md:p-8 transition-colors duration-1000 
      ${
        bgAnimation
          ? "bg-gradient-to-b from-amber-100 to-orange-100"
          : "bg-gradient-to-b from-amber-50 to-orange-50"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -left-10 w-20 sm:w-32 md:w-40 h-20 sm:h-32 md:h-40 bg-amber-300 opacity-20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute top-20 -right-20 w-40 sm:w-48 md:w-60 h-40 sm:h-48 md:h-60 bg-orange-300 opacity-20 rounded-full filter blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-10 left-20 w-20 sm:w-32 md:w-40 h-20 sm:h-32 md:h-40 bg-amber-400 opacity-10 rounded-full filter blur-3xl animate-float-slow"></div>
      </div>

      {renderIntroAnimation()}

      <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center gap-4 lg:gap-0">
          <div
            className={`w-full max-w-3xl bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-700 
            ${showIntroAnim ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
          >
            <div
              className={`transition-all duration-500 ${
                showIntroAnim ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              {renderHeader()}

              <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                <div className="space-y-4 sm:space-y-6">
                  {renderConversationBubble()}

                  {conversation[step]?.type === "puzzle"
                    ? renderWorldMap()
                    : renderOptions()}
                </div>

                {renderStepIndicators()}
              </div>
            </div>
          </div>

          {showLiMei && (
            <div className="absolute top-4 right-4 z-10 md:static md:block transition-all duration-500 hover:transform hover:scale-105 md:-ml-4 lg:-ml-19 md:-mb-4 lg:-mb-4 md:mt-0 lg:-mt-1">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 p-1 shadow-lg relative group">
                <div className="w-full h-full rounded-full overflow-hidden border border-amber-200 transition-transform duration-300 group-hover:scale-110">
                  <video
                    src="/panda.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-[center_bottom]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
