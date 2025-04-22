import React from "react";

const OptionButtons = ({
  options,
  isPlaying,
  isLoaded,
  isTyping,
  handleOptionClick,
}) => {
  if (!options?.length) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleOptionClick(option.nextStep)}
          disabled={isPlaying || !isLoaded || isTyping}
          className={`group px-6 py-3 rounded-lg transition-all duration-300 text-base font-medium
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
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
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

export default OptionButtons;
