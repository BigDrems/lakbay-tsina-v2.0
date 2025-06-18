import React from "react";
import { motion } from "framer-motion";

const DynastyCard = ({ dynasty, index, onClick, imageSrc }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700 hover:border-[#6B3100]/50 dark:hover:border-amber-800/50 transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      <div className="h-40 overflow-hidden relative">
        <img
          src={`/dynasty/${imageSrc}`}
          alt={dynasty.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-0 left-0 p-3">
          <p className="text-white text-xs font-medium bg-[#6B3100]/80 dark:bg-amber-900/80 px-2 py-1 rounded-full inline-block">
            {dynasty.years}
          </p>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-[#6B3100] dark:text-amber-500 group-hover:text-[#8B4100] dark:group-hover:text-amber-400 transition-colors">
          {dynasty.name}
        </h3>
        <p className="text-xs mt-1 text-gray-700 dark:text-gray-300 line-clamp-2">
          {dynasty.legacy}
        </p>

        <div className="flex items-center gap-1 mt-3">
          {dynasty.notable_rulers
            .map((ruler, idx) => (
              <span
                key={idx}
                className="inline-block bg-[#6B3100]/10 dark:bg-[#6B3100]/20 text-[#6B3100] dark:text-amber-500 text-xs px-2 py-0.5 rounded-full whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]"
              >
                {ruler}
              </span>
            ))
            .slice(0, 2)}
          {dynasty.notable_rulers.length > 2 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{dynasty.notable_rulers.length - 2}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DynastyCard;
