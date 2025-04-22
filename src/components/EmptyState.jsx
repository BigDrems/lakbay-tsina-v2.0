import React from "react";
import { motion } from "framer-motion";

const EmptyState = ({ resetFilters }) => {
  return (
    <div className="text-center py-16 bg-white rounded-xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/images/empty-state.svg"
          alt="No results found"
          className="w-48 h-48 mx-auto mb-6 opacity-70"
        />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Walang Nahanap na Aralin
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Subukang baguhin ang iyong mga filter o maghanap ng ibang paksa.
        </p>
        <button
          onClick={resetFilters}
          className="mt-6 px-6 py-3 bg-[#cd201c] text-white rounded-full font-medium hover:bg-red-700 transition-colors"
        >
          I-clear ang mga Filter
        </button>
      </motion.div>
    </div>
  );
};

export default EmptyState;
