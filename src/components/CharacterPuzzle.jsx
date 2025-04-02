import React from "react";
import { characterPuzzle } from "../data/welcomePageData";

const CharacterPuzzle = ({
  solvedPairs,
  onPuzzleComplete,
  draggedItem,
  dragOverItem,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onDragLeave,
}) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-[#8B4513] font-medium text-lg">Characters</h3>
          <div className="grid grid-cols-2 gap-4">
            {characterPuzzle.map((char) => (
              <div
                key={char.id}
                draggable={!solvedPairs.some((pair) => pair.id === char.id)}
                onDragStart={(e) => onDragStart(e, char, "character")}
                onDragEnd={onDragEnd}
                onDragOver={(e) => onDragOver(e, char, "character")}
                onDrop={(e) => onDrop(e, char, "character")}
                onDragLeave={onDragLeave}
                className={`p-6 text-3xl border-2 cursor-move select-none
                  ${
                    solvedPairs.some((pair) => pair.id === char.id)
                      ? "bg-[#8B4513]/20 border-[#8B4513]/20 cursor-default"
                      : dragOverItem?.id === char.id
                      ? "bg-[#8B4513] text-[#F5E6D3] border-[#8B4513]"
                      : "border-[#8B4513] hover:bg-[#8B4513]/10"
                  } transition-colors duration-200`}
              >
                {char.character}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-[#8B4513] font-medium text-lg">Meanings</h3>
          <div className="grid grid-cols-1 gap-4">
            {characterPuzzle.map((char) => (
              <div
                key={char.id}
                draggable={!solvedPairs.some((pair) => pair.id === char.id)}
                onDragStart={(e) => onDragStart(e, char, "meaning")}
                onDragEnd={onDragEnd}
                onDragOver={(e) => onDragOver(e, char, "meaning")}
                onDrop={(e) => onDrop(e, char, "meaning")}
                onDragLeave={onDragLeave}
                className={`p-4 text-sm border-2 cursor-move select-none
                  ${
                    solvedPairs.some((pair) => pair.id === char.id)
                      ? "bg-[#8B4513]/20 border-[#8B4513]/20 cursor-default"
                      : dragOverItem?.id === char.id
                      ? "bg-[#8B4513] text-[#F5E6D3] border-[#8B4513]"
                      : "border-[#8B4513] hover:bg-[#8B4513]/10"
                  } transition-colors duration-200`}
              >
                {char.meaning}
                <div className="text-xs mt-1 opacity-60">{char.hint}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {solvedPairs.length === characterPuzzle.length && (
        <div className="text-center space-y-4 animate-fade-in">
          <div className="text-[#8B4513] text-lg font-medium">
            Excellent! You've unlocked the ancient wisdom. Your journey
            awaits...
          </div>
          <div className="flex justify-center space-x-2">
            {["🎊", "🏮", "✨", "🎋", "🎭"].map((emoji, index) => (
              <span
                key={index}
                className="text-2xl animate-bounce"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="text-center text-[#8B4513]/70 text-sm">
        Drag characters to their meanings or meanings to their characters
      </div>
    </div>
  );
};

export default CharacterPuzzle;
