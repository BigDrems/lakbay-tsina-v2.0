import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { dynastyImageMap } from "../../data/dynastyData";

const DynastyTimeline = forwardRef(
  ({ dynasties, timelineConfig, selectedDynasty, onDynastyClick }, ref) => {
    return (
      <div className="mt-12 mb-16 relative" ref={ref}>
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-8 text-center">
          Chinese Dynasties Timeline{" "}
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            (2000 BCE - 1912 CE)
          </span>
        </h3>

        {/* Timeline background with eras */}
        <div className="relative mb-10 mx-4">
          <div className="h-20 w-full bg-gradient-to-r from-amber-50 via-amber-100 to-amber-200 dark:from-gray-800 dark:via-amber-900/20 dark:to-amber-900/40 rounded-lg opacity-30 dark:opacity-20"></div>

          {/* Era labels */}
          <div className="absolute top-0 left-0 w-1/4 h-full border-r border-dashed border-amber-800/20 dark:border-amber-600/20">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs px-2 py-0.5 rounded-full">
              Early Dynasties
            </div>
          </div>
          <div className="absolute top-0 left-1/4 w-1/4 h-full border-r border-dashed border-amber-800/20 dark:border-amber-600/20">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs px-2 py-0.5 rounded-full">
              Imperial Formation
            </div>
          </div>
          <div className="absolute top-0 left-1/2 w-1/4 h-full border-r border-dashed border-amber-800/20 dark:border-amber-600/20">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs px-2 py-0.5 rounded-full">
              Golden Age
            </div>
          </div>
          <div className="absolute top-0 left-3/4 w-1/4 h-full">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs px-2 py-0.5 rounded-full">
              Late Imperial
            </div>
          </div>
        </div>

        {/* Main timeline */}
        <div className="relative">
          {/* Timeline bar */}
          <div className="h-1.5 bg-gradient-to-r from-amber-500 to-amber-700 dark:from-amber-700 dark:to-amber-500 w-full rounded-full relative shadow-sm">
            {/* Year markers */}
            <div className="absolute -bottom-8 left-0 flex flex-col items-center">
              <div className="h-3 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                2000 BCE
              </span>
            </div>
            <div className="absolute -bottom-8 left-1/4 flex flex-col items-center">
              <div className="h-3 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                1000 BCE
              </span>
            </div>
            <div className="absolute -bottom-8 left-1/2 flex flex-col items-center">
              <div className="h-3 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                0 CE
              </span>
            </div>
            <div className="absolute -bottom-8 left-3/4 flex flex-col items-center">
              <div className="h-3 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                1000 CE
              </span>
            </div>
            <div className="absolute -bottom-8 right-0 flex flex-col items-center">
              <div className="h-3 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                1900 CE
              </span>
            </div>

            {/* Dynasty markers */}
            {dynasties.map((dynasty, index) => {
              const position = timelineConfig.getPosition(dynasty.years);
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0, y: 0 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className={`absolute -top-6 cursor-pointer group`}
                  style={{ left: `${position}%` }}
                  onClick={() => onDynastyClick(dynasty)}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`flex flex-col items-center`}
                  >
                    <div
                      className={`h-6 w-6 rounded-full border-2 border-white dark:border-gray-800 bg-gradient-to-br from-amber-500 to-[#6B3100] dark:from-amber-600 dark:to-amber-800 ${
                        selectedDynasty?.name === dynasty.name
                          ? "ring-4 ring-amber-500/30 dark:ring-amber-600/20"
                          : "hover:ring-4 hover:ring-amber-500/30 dark:hover:ring-amber-600/20"
                      } transition-all duration-200 shadow-md flex items-center justify-center`}
                    >
                      <span className="text-[8px] text-white font-bold">
                        {index + 1}
                      </span>
                    </div>

                    {/* Dynasty name on top */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 transform -rotate-45 origin-bottom-left">
                      <div className="w-0.5 h-4 bg-amber-600/50 dark:bg-amber-500/30 mb-1"></div>
                      <div className="whitespace-nowrap text-[10px] font-medium transform rotate-45 text-amber-800 dark:text-amber-400">
                        {dynasty.name.split(" ")[0]}
                      </div>
                    </div>
                  </motion.div>

                  {/* Hover detail card */}
                  <TimelineTooltip dynasty={dynasty} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <TimelineLegend />
      </div>
    );
  }
);

const TimelineTooltip = ({ dynasty }) => {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg z-10 w-56 border border-amber-100 dark:border-amber-900/50">
      <div className="flex items-start gap-2">
        <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={`/dynasty/${dynastyImageMap[dynasty.name] || "xia.jpg"}`}
            alt={dynasty.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-[#6B3100] dark:text-amber-500">
            {dynasty.name}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {dynasty.years}
          </p>
        </div>
      </div>
      <div className="mt-2 border-t border-amber-100 dark:border-gray-700 pt-2">
        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
          {dynasty.legacy}
        </p>
      </div>
      <button
        className="w-full mt-2 text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 py-1 rounded hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        View Details
      </button>
    </div>
  );
};

const TimelineLegend = () => {
  return (
    <div className="mt-14 flex justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm px-4 py-2 border border-amber-100 dark:border-gray-700">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-500 to-[#6B3100] dark:from-amber-600 dark:to-amber-800"></div>
            <span>Dynasty</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-gradient-to-r from-amber-500 to-amber-700 dark:from-amber-700 dark:to-amber-500"></div>
            <span>Timeline</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-500 to-[#6B3100] dark:from-amber-600 dark:to-amber-800 ring-2 ring-amber-500/30"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynastyTimeline;
