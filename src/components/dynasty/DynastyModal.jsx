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
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal-content"
          ref={ref}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-5xl max-h-[95vh] overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with dynasty name and close button */}
          <div className="relative flex-shrink-0">
            <div className="h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
              <img
                src={`/dynasty/${dynasty.img}`}
                alt={dynasty.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-3 sm:p-4 md:p-6 w-full">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white line-clamp-2">
                    {dynasty.name}
                  </h2>
                  <p className="text-white/80 text-sm md:text-base mt-1">
                    {dynasty.years}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Isara"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/80 hover:bg-white text-black p-2 rounded-full transition-colors z-10"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-3 sm:p-4 md:p-6">
              {/* Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Left column */}
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-2 md:gap-3">
                    <Calendar
                      className="text-[#6B3100] mt-1 flex-shrink-0"
                      size={16}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                        Panahon
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {dynasty.years}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 md:gap-3">
                    <MapPin
                      className="text-[#6B3100] mt-1 flex-shrink-0"
                      size={16}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                        Kabisera
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {dynasty.capital}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 md:gap-3">
                    <Book
                      className="text-[#6B3100] mt-1 flex-shrink-0"
                      size={16}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                        Kultura
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {dynasty.culture}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 md:gap-3">
                    <Users
                      className="text-[#6B3100] mt-1 flex-shrink-0"
                      size={16}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                        Pamumuhay
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {dynasty.lifestyle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-2 md:gap-3">
                    <Star
                      className="text-[#6B3100] mt-1 flex-shrink-0"
                      size={16}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                        Mga Kilalang Pinuno
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {dynasty.notable_rulers.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 md:gap-3">
                    <Flame
                      className="text-[#6B3100] mt-1 flex-shrink-0"
                      size={16}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                        Relihiyon
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {dynasty.religion}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 md:gap-3">
                    <Award
                      className="text-[#6B3100] mt-1 flex-shrink-0"
                      size={16}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                        Pamana
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {dynasty.legacy}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inventions section */}
              <div className="mt-4 md:mt-6">
                <h3 className="text-base md:text-lg font-semibold text-[#6B3100] mb-3">
                  Mga Imbensyon at Nagawa
                </h3>
                <div className="bg-[#6B3100]/5 dark:bg-[#6B3100]/10 rounded-lg p-3 md:p-4">
                  <ul className="space-y-2">
                    {dynasty.inventions.map((invention, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="h-4 w-4 md:h-5 md:w-5 rounded-full bg-[#6B3100] text-white flex-shrink-0 text-xs flex items-center justify-center mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {invention}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation controls - fixed at bottom */}
          <div className="flex-shrink-0 p-3 sm:p-4 md:p-6 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <button
              onClick={onPrev}
              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors text-sm"
              aria-label="Nakaraang dinastiya"
            >
              <ChevronLeft size={16} className="md:w-[18px] md:h-[18px]" />
              <span className="hidden sm:inline">Nakaraan</span>
            </button>

            <div className="hidden md:flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {currentIndex + 1} sa {totalDynasties}
              </span>
            </div>

            <button
              onClick={onNext}
              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors text-sm"
              aria-label="Susunod na dinastiya"
            >
              <span className="hidden sm:inline">Susunod</span>
              <ChevronRight size={16} className="md:w-[18px] md:h-[18px]" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

export default DynastyModal;
