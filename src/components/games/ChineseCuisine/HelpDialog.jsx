import React from "react";
import { motion } from "framer-motion";

const HelpDialog = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#F5E6D3] p-3 rounded-lg mb-4 text-sm"
    >
      <h3 className="font-semibold mb-1">How to Play:</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Select the correct ingredients for the Chinese dish</li>
        <li>Drag ingredients to the cooking pot</li>
        <li>Follow the cooking steps in the correct order</li>
        <li>Complete the dish before time runs out</li>
        <li>Learn fascinating facts about Chinese cuisine!</li>
      </ul>
      <button onClick={onClose} className="text-[#6B3100] font-medium mt-2">
        Close
      </button>
    </motion.div>
  );
};

export default HelpDialog;
