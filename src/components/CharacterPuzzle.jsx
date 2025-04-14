import React, { useState } from "react";
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
  const [touchedItem, setTouchedItem] = useState(null);

  const handleTouchStart = (e, item, type) => {
    e.preventDefault();
    if (solvedPairs.some((pair) => pair.id === item.id)) return;
    setTouchedItem({ ...item, type });
    onDragStart(e, item, type);
  };

  const handleTouchMove = (e, item, type) => {
    e.preventDefault();
    if (!touchedItem || touchedItem.type === type) return;
    const touch = e.touches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const dropTarget = elements.find(
      (el) => el.getAttribute("data-droppable") === "true"
    );

    if (dropTarget) {
      const itemId = dropTarget.getAttribute("data-item-id");
      const itemType = dropTarget.getAttribute("data-item-type");
      const targetItem = characterPuzzle.find((char) => char.id === itemId);
      if (targetItem) {
        onDragOver(e, targetItem, itemType);
      }
    }
  };

  const handleTouchEnd = (e, item, type) => {
    e.preventDefault();
    if (!touchedItem) return;

    const touch = e.changedTouches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const dropTarget = elements.find(
      (el) => el.getAttribute("data-droppable") === "true"
    );

    if (dropTarget) {
      const itemId = dropTarget.getAttribute("data-item-id");
      const itemType = dropTarget.getAttribute("data-item-type");
      const targetItem = characterPuzzle.find((char) => char.id === itemId);
      if (targetItem) {
        onDrop(e, targetItem, itemType);
      }
    }

    setTouchedItem(null);
    onDragEnd(e);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-[#6B3100] font-medium text-base sm:text-lg">
            Characters
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {characterPuzzle.map((char) => (
              <div
                key={char.id}
                draggable={!solvedPairs.some((pair) => pair.id === char.id)}
                onDragStart={(e) => onDragStart(e, char, "character")}
                onDragEnd={onDragEnd}
                onDragOver={(e) => onDragOver(e, char, "character")}
                onDrop={(e) => onDrop(e, char, "character")}
                onDragLeave={onDragLeave}
                onTouchStart={(e) => handleTouchStart(e, char, "character")}
                onTouchMove={(e) => handleTouchMove(e, char, "character")}
                onTouchEnd={(e) => handleTouchEnd(e, char, "character")}
                data-droppable="true"
                data-item-id={char.id}
                data-item-type="character"
                className={`p-4 sm:p-6 text-2xl sm:text-3xl border-2 select-none
                  ${touchedItem?.id === char.id ? "opacity-50" : ""}
                  ${
                    solvedPairs.some((pair) => pair.id === char.id)
                      ? "bg-[#6B3100]/20 border-[#6B3100]/20 cursor-default"
                      : dragOverItem?.id === char.id
                      ? "bg-[#6B3100] text-[#F5E6D3] border-[#6B3100]"
                      : "border-[#6B3100] hover:bg-[#6B3100]/10 active:bg-[#6B3100]/20"
                  } transition-colors duration-200 touch-manipulation`}
              >
                {char.character}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-[#6B3100] font-medium text-base sm:text-lg">
            Meanings
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {characterPuzzle.map((char) => (
              <div
                key={char.id}
                draggable={!solvedPairs.some((pair) => pair.id === char.id)}
                onDragStart={(e) => onDragStart(e, char, "meaning")}
                onDragEnd={onDragEnd}
                onDragOver={(e) => onDragOver(e, char, "meaning")}
                onDrop={(e) => onDrop(e, char, "meaning")}
                onDragLeave={onDragLeave}
                onTouchStart={(e) => handleTouchStart(e, char, "meaning")}
                onTouchMove={(e) => handleTouchMove(e, char, "meaning")}
                onTouchEnd={(e) => handleTouchEnd(e, char, "meaning")}
                data-droppable="true"
                data-item-id={char.id}
                data-item-type="meaning"
                className={`p-3 sm:p-4 text-sm sm:text-base border-2 select-none
                  ${touchedItem?.id === char.id ? "opacity-50" : ""}
                  ${
                    solvedPairs.some((pair) => pair.id === char.id)
                      ? "bg-[#6B3100]/20 border-[#6B3100]/20 cursor-default"
                      : dragOverItem?.id === char.id
                      ? "bg-[#6B3100] text-[#F5E6D3] border-[#6B3100]"
                      : "border-[#6B3100] hover:bg-[#6B3100]/10 active:bg-[#6B3100]/20"
                  } transition-colors duration-200 touch-manipulation`}
              >
                {char.meaning}
                <div className="text-xs sm:text-sm mt-1 opacity-60">
                  {char.hint}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {solvedPairs.length === characterPuzzle.length && (
        <div className="text-center space-y-3 sm:space-y-4 animate-fade-in">
          <div className="text-[#6B3100] text-base sm:text-lg font-medium">
            Excellent! You've unlocked the ancient wisdom. Your journey
            awaits...
          </div>
          <div className="flex justify-center space-x-2">
            {["🎊", "🏮", "✨", "🎋", "🎭"].map((emoji, index) => (
              <span
                key={index}
                className="text-xl sm:text-2xl animate-bounce"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="text-center text-[#6B3100]/70 text-xs sm:text-sm">
        Drag or tap characters to match with their meanings
      </div>
    </div>
  );
};

export default CharacterPuzzle;
