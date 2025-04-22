import { useState } from "react";
import { characterPuzzle } from "../data/welcomePageData";

export const useDragAndDrop = (onMatch) => {
  const [solvedPairs, setSolvedPairs] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

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

  const handleDragLeave = () => {
    setDragOverItem(null);
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
          onMatch && onMatch();
        }
      }
    }

    setDraggedItem(null);
    setDragOverItem(null);
  };

  return {
    solvedPairs,
    draggedItem,
    dragOverItem,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};

export default useDragAndDrop;
