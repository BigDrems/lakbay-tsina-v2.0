import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const AboutSection = ({ metadata, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mb-6 p-4 bg-[#6B3100]/5 dark:bg-[#6B3100]/10 rounded-lg border border-[#6B3100]/20 dark:border-[#6B3100]/30"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-[#6B3100] dark:text-amber-500 mb-2">
          About This Explorer
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          aria-label="Close about section"
        >
          <X size={16} />
        </button>
      </div>
      <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">
        This explorer provides information about China's major dynasties, from
        the legendary Xia to the final Qing Dynasty. Navigate through different
        views to explore the chronology and details of each dynasty.
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Source: {metadata.source} | Note: {metadata.note}
      </p>
    </motion.div>
  );
};

export default AboutSection;
