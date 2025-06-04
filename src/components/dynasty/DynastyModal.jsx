import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import {
  X,
  Calendar,
  MapPin,
  Book,
  Users,
  Flame,
  Award,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const DynastyModal = forwardRef(
  ({ dynasty, onClose, onPrev, onNext, currentIndex, totalDynasties }, ref) => {
    return (
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal-content"
          ref={ref}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with dynasty name and close button */}
          <div className="relative">
            <div className="h-48 md:h-64 overflow-hidden">
              <img
                src={`/images/${dynasty.img}`}
                alt={dynasty.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-4 md:p-6 w-full">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {dynasty.name}
                  </h2>
                  <p className="text-white/80 text-sm md:text-base">
                    {dynasty.years}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-black p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar
                      className="text-[#6B3100] mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Period
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {dynasty.years}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin
                      className="text-[#6B3100] mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Capital
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {dynasty.capital}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Book
                      className="text-[#6B3100] mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Culture
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {dynasty.culture}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users
                      className="text-[#6B3100] mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Lifestyle
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {dynasty.lifestyle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Star
                      className="text-[#6B3100] mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Notable Rulers
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {dynasty.notable_rulers.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Flame
                      className="text-[#6B3100] mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Religion
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {dynasty.religion}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award
                      className="text-[#6B3100] mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Legacy
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {dynasty.legacy}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventions section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#6B3100] mb-3">
                Inventions & Achievements
              </h3>
              <div className="bg-[#6B3100]/5 dark:bg-[#6B3100]/10 rounded-lg p-4">
                <ul className="space-y-2">
                  {dynasty.inventions.map((invention, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-[#6B3100] text-white flex-shrink-0 text-xs flex items-center justify-center mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {invention}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="p-4 md:p-6 border-t border-gray-200 dark:border-gray-800 flex justify-between">
            <button
              onClick={onPrev}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors"
              aria-label="Previous dynasty"
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>

            <div className="hidden md:flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {currentIndex + 1} of {totalDynasties}
              </span>
            </div>

            <button
              onClick={onNext}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors"
              aria-label="Next dynasty"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

export default DynastyModal;
