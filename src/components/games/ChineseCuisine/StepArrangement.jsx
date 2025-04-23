import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpDown, Utensils } from "lucide-react";

const StepArrangement = ({
  currentRecipe,
  onComplete,
  setScore,
  displayFeedback,
}) => {
  const [shuffledSteps, setShuffledSteps] = useState([]);
  const [arrangedSteps, setArrangedSteps] = useState([]);
  const [isDragging, setIsDragging] = useState(null);
  const [stepComplete, setStepComplete] = useState(false);

  useEffect(() => {
    // Initialize shuffled steps when component mounts
    prepareShuffledSteps();
  }, [currentRecipe]);

  const prepareShuffledSteps = () => {
    if (!currentRecipe || shuffledSteps.length > 0) return;

    // Create array of step objects with index and text
    const stepsWithIndex = currentRecipe.steps.map((step, index) => ({
      id: index,
      text: step,
      originalIndex: index,
    }));

    // Shuffle the steps
    const shuffled = [...stepsWithIndex].sort(() => Math.random() - 0.5);
    setShuffledSteps(shuffled);
    setArrangedSteps([]);
  };

  const handleDragStart = (e, step) => {
    setIsDragging(step);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetArea) => {
    e.preventDefault();

    if (!isDragging) return;

    if (
      targetArea === "arranged" &&
      !arrangedSteps.some((s) => s.id === isDragging.id)
    ) {
      // Add to arranged steps
      setArrangedSteps((prev) => [...prev, isDragging]);
      // Remove from shuffled steps
      setShuffledSteps((prev) => prev.filter((s) => s.id !== isDragging.id));
    } else if (
      targetArea === "shuffled" &&
      !shuffledSteps.some((s) => s.id === isDragging.id)
    ) {
      // Add back to shuffled steps
      setShuffledSteps((prev) => [...prev, isDragging]);
      // Remove from arranged steps
      setArrangedSteps((prev) => prev.filter((s) => s.id !== isDragging.id));
    }

    setIsDragging(null);
  };

  const handleStepMove = (step, direction) => {
    const currentIndex = arrangedSteps.findIndex((s) => s.id === step.id);
    if (currentIndex < 0) return;

    const newArrangedSteps = [...arrangedSteps];

    if (direction === "up" && currentIndex > 0) {
      // Swap with the previous step
      [newArrangedSteps[currentIndex], newArrangedSteps[currentIndex - 1]] = [
        newArrangedSteps[currentIndex - 1],
        newArrangedSteps[currentIndex],
      ];
    } else if (
      direction === "down" &&
      currentIndex < arrangedSteps.length - 1
    ) {
      // Swap with the next step
      [newArrangedSteps[currentIndex], newArrangedSteps[currentIndex + 1]] = [
        newArrangedSteps[currentIndex + 1],
        newArrangedSteps[currentIndex],
      ];
    }

    setArrangedSteps(newArrangedSteps);
  };

  const checkArrangement = () => {
    if (arrangedSteps.length !== currentRecipe.steps.length) {
      displayFeedback("error", "You need to arrange all steps!");
      return;
    }

    // Check if steps are in correct order
    const isCorrect = arrangedSteps.every(
      (step, index) => step.originalIndex === index
    );

    if (isCorrect) {
      setScore((prev) => prev + currentRecipe.steps.length * 5); // Bonus for correct arrangement
      setStepComplete(true);
      displayFeedback("success", "Perfect arrangement! +30 bonus points");
      setTimeout(() => {
        onComplete(arrangedSteps);
      }, 2000);
    } else {
      const correctCount = arrangedSteps.filter(
        (step, index) => step.originalIndex === index
      ).length;
      setScore((prev) => prev + correctCount * 2); // Partial points for correct positions

      displayFeedback(
        "error",
        `${correctCount} steps in the right order. Try again!`
      );
    }
  };

  const resetArrangement = () => {
    // Move all arranged steps back to shuffled
    setShuffledSteps((prev) => [...prev, ...arrangedSteps]);
    setArrangedSteps([]);
  };

  return (
    <div>
      <h3 className="font-medium text-[#6B3100] mb-3 flex items-center gap-2">
        <Utensils className="w-5 h-5" />
        <span>Step 2: Arrange the cooking steps in the correct order</span>
      </h3>

      <div className="bg-[#FFF9F0] p-4 rounded-lg border border-[#E8D5B5] mb-4">
        <div className="text-sm text-[#6B3100] mb-3 flex justify-between items-center">
          <span>Drag and arrange steps in the correct cooking order</span>
          {arrangedSteps.length > 0 && (
            <button
              onClick={resetArrangement}
              className="text-xs bg-[#6B3100]/10 hover:bg-[#6B3100]/20 text-[#6B3100] px-2 py-1 rounded"
            >
              Reset
            </button>
          )}
        </div>

        {/* Target area for arranged steps */}
        <div
          className="border-2 border-dashed border-[#6B3100]/30 rounded-lg bg-white p-3 mb-4 min-h-[200px]"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "arranged")}
        >
          {arrangedSteps.length === 0 ? (
            <div className="text-center py-6 text-[#6B3100]/50 italic text-sm">
              Drag steps here and arrange them in the correct order
            </div>
          ) : (
            <div className="space-y-2">
              {arrangedSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, step)}
                  whileHover={{ scale: 1.01 }}
                  className="bg-[#F5E6D3] p-3 rounded border border-[#6B3100]/20 flex items-center gap-2 cursor-grab"
                >
                  <div className="w-6 h-6 rounded-full bg-[#6B3100] text-white flex items-center justify-center text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-grow text-sm">{step.text}</div>
                  <div className="flex flex-shrink-0">
                    <button
                      onClick={() => handleStepMove(step, "up")}
                      disabled={index === 0}
                      className={`p-1 rounded-l ${
                        index === 0
                          ? "text-gray-300"
                          : "text-[#6B3100] hover:bg-[#6B3100]/10"
                      }`}
                    >
                      <ArrowUpDown size={16} className="rotate-90" />
                    </button>
                    <button
                      onClick={() => handleStepMove(step, "down")}
                      disabled={index === arrangedSteps.length - 1}
                      className={`p-1 rounded-r ${
                        index === arrangedSteps.length - 1
                          ? "text-gray-300"
                          : "text-[#6B3100] hover:bg-[#6B3100]/10"
                      }`}
                    >
                      <ArrowUpDown size={16} className="-rotate-90" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Remaining steps */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-[#6B3100] mb-2">
            Available Steps:
          </h4>
          <div
            className="flex flex-wrap gap-2"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "shuffled")}
          >
            {shuffledSteps.map((step) => (
              <motion.div
                key={step.id}
                draggable
                onDragStart={(e) => handleDragStart(e, step)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-2 rounded border border-gray-200 text-sm cursor-grab shadow-sm max-w-[150px] sm:max-w-[200px]"
              >
                {step.text}
              </motion.div>
            ))}
            {shuffledSteps.length === 0 && arrangedSteps.length > 0 && (
              <div className="italic text-sm text-gray-500">
                All steps arranged
              </div>
            )}
          </div>
        </div>

        {/* Check button */}
        {!stepComplete && (
          <button
            onClick={checkArrangement}
            disabled={arrangedSteps.length < currentRecipe.steps.length}
            className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 ${
              arrangedSteps.length < currentRecipe.steps.length
                ? "bg-gray-200 text-gray-500"
                : "bg-[#6B3100] text-black hover:bg-[#6B3100]/90"
            }`}
          >
            <Check size={18} />
            Check My Arrangement
          </button>
        )}

        {/* Success Message */}
        {stepComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-green-100 border border-green-300 p-3 rounded-lg text-center text-green-800"
          >
            <div className="font-bold mb-1">Perfect Arrangement!</div>
            <div className="text-sm">Your cooking knowledge is impressive!</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StepArrangement;
