import React from "react";

const ConversationBubble = ({
  isTyping,
  isPlaying,
  typingText,
  text,
  skipTyping,
}) => {
  return (
    <div
      onClick={skipTyping}
      className={`bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-xl relative shadow-sm border border-amber-100 
        transition-all duration-300 ${
          isTyping ? "cursor-pointer hover:shadow-md" : ""
        }`}
    >
      {isPlaying && (
        <div className="absolute right-3 top-3 flex space-x-1">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></span>
        </div>
      )}
      <p className="text-amber-900 text-lg leading-relaxed">
        {typingText ? typingText : text || "Naglo-load..."}
        {isTyping && (
          <span className="inline-block w-1.5 h-5 bg-amber-700 ml-0.5 animate-blink"></span>
        )}
      </p>
      {isTyping && (
        <div className="absolute bottom-2 right-2 text-xs text-amber-500">
          Click to skip
        </div>
      )}
    </div>
  );
};

export default ConversationBubble;
