import React from "react";

const StepIndicators = ({
  currentStep,
  totalSteps,
  isPlaying,
  isTyping,
  setStep,
}) => {
  return (
    <div className="flex justify-center space-x-3 mt-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <button
          key={index}
          onClick={() => !isTyping && setStep(index)}
          disabled={isPlaying || isTyping}
          className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed
          ${
            index === currentStep
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
};

export default StepIndicators;
