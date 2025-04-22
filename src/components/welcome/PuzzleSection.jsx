import React from "react";
import CharacterPuzzle from "../CharacterPuzzle";

const PuzzleSection = ({
  solvedPairs,
  draggedItem,
  dragOverItem,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onDragLeave,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-amber-200 shadow-sm transition-all duration-300 hover:shadow-md">
      <h3 className="text-center text-lg font-medium text-amber-900 mb-4">
        Character Matching Puzzle
      </h3>
      <div className="bg-amber-50/50 p-3 mb-4 rounded-lg text-sm text-amber-800 flex items-center">
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
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Drag the characters to match them with their meanings
      </div>
      <CharacterPuzzle
        solvedPairs={solvedPairs}
        draggedItem={draggedItem}
        dragOverItem={dragOverItem}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
      />
    </div>
  );
};

export default PuzzleSection;
