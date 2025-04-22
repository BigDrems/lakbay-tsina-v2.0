import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Info,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  MapPin,
  Book,
  Users,
  Flame,
  Award,
  Star,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  dynastyData,
  dynastyImageMap,
  timelineConfig,
} from "../data/dynastyData";
import DynastyCard from "./dynasty/DynastyCard";
import DynastyModal from "./dynasty/DynastyModal";
import DynastyTimeline from "./dynasty/DynastyTimeline";
import AboutSection from "./dynasty/AboutSection";

const DynastyExplorer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDynasty, setSelectedDynasty] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "timeline"
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef(null);
  const timelineRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    // Check for dynasty parameter in URL (both query params and route params)
    const params = new URLSearchParams(location.search);
    const queryDynasty = params.get("dynasty");
    const routeDynasty = location.pathname.split("/").pop();

    // If we have a dynasty parameter (from either source)
    const dynastyName =
      queryDynasty ||
      (routeDynasty && routeDynasty !== "dynasty-explorer"
        ? routeDynasty.replace(/\+/g, " ")
        : null);

    if (dynastyName) {
      // First try exact match
      let dynasty = dynastyData.dynasties.find((d) => d.name === dynastyName);

      // If no exact match, try case-insensitive match or partial match
      if (!dynasty) {
        dynasty = dynastyData.dynasties.find(
          (d) =>
            d.name.toLowerCase() === dynastyName.toLowerCase() ||
            d.name.toLowerCase().includes(dynastyName.toLowerCase())
        );
      }

      if (dynasty) {
        handleDynastyClick(dynasty);
      }
    }

    // Add keyboard event listeners for accessibility
    const handleKeyDown = (e) => {
      if (isModalVisible) {
        if (e.key === "Escape") handleClose();
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [location]);

  useEffect(() => {
    // When selectedDynasty changes, update modal visibility
    if (selectedDynasty) {
      setIsModalVisible(true);
    }
  }, [selectedDynasty]);

  const handleDynastyClick = (dynasty) => {
    setSelectedDynasty(dynasty);
    setCurrentIndex(
      dynastyData.dynasties.findIndex((d) => d.name === dynasty.name)
    );
    setIsModalVisible(true);
    setShowInfo(false);

    // Update URL to reflect selected dynasty (without triggering navigation)
    const url = new URL(window.location);
    url.searchParams.set("dynasty", dynasty.name);
    window.history.pushState({}, "", url);

    // Add overflow hidden to body to prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedDynasty(null);
    setShowInfo(false);

    // Remove the dynasty parameter from URL
    const url = new URL(window.location);
    url.searchParams.delete("dynasty");
    window.history.pushState({}, "", url);

    // Restore body scrolling
    document.body.style.overflow = "auto";

    // Focus on an element in the grid or timeline after closing
    if (viewMode === "grid" && gridRef.current) {
      gridRef.current.focus();
    } else if (viewMode === "timeline" && timelineRef.current) {
      timelineRef.current.focus();
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : dynastyData.dynasties.length - 1
    );
    setSelectedDynasty(
      dynastyData.dynasties[
        currentIndex > 0 ? currentIndex - 1 : dynastyData.dynasties.length - 1
      ]
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < dynastyData.dynasties.length - 1 ? prev + 1 : 0
    );
    setSelectedDynasty(
      dynastyData.dynasties[
        currentIndex < dynastyData.dynasties.length - 1 ? currentIndex + 1 : 0
      ]
    );
  };

  const renderDynastyGrid = () => {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
        ref={gridRef}
        tabIndex={0}
      >
        {dynastyData.dynasties.map((dynasty, index) => (
          <DynastyCard
            key={index}
            dynasty={dynasty}
            index={index}
            onClick={() => handleDynastyClick(dynasty)}
            imageSrc={dynastyImageMap[dynasty.name] || "qin.webp"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] dark:bg-gray-950 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Navigation */}
        <div className="flex justify-between items-center mb-4 gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-[#6B3100] dark:text-white hover:bg-[#6B3100]/10 dark:hover:bg-gray-700 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setViewMode(viewMode === "grid" ? "timeline" : "grid")
              }
              className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-[#6B3100] dark:text-white hover:bg-[#6B3100]/10 dark:hover:bg-gray-700 transition-colors text-sm"
            >
              {viewMode === "grid" ? "Timeline View" : "Grid View"}
            </button>

            <button
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-[#6B3100] dark:text-white hover:bg-[#6B3100]/10 dark:hover:bg-gray-700 transition-colors"
              aria-label="About this explorer"
            >
              <Info size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">About</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-4 sm:p-6 transition-all">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-[#6B3100] dark:text-amber-500 mb-2 text-center">
              Chinese Dynasties Explorer
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
              Discover the rich legacy of China's imperial dynasties spanning
              over 4,000 years
            </p>
          </motion.div>

          {/* About Modal */}
          <AnimatePresence>
            {showInfo && (
              <AboutSection
                metadata={dynastyData.metadata}
                onClose={() => setShowInfo(false)}
              />
            )}
          </AnimatePresence>

          {/* Timeline View */}
          {viewMode === "timeline" && (
            <DynastyTimeline
              dynasties={dynastyData.dynasties}
              timelineConfig={timelineConfig}
              selectedDynasty={selectedDynasty}
              onDynastyClick={handleDynastyClick}
              ref={timelineRef}
            />
          )}

          {/* Dynasty Grid */}
          {viewMode === "grid" && renderDynastyGrid()}
        </div>
      </div>

      {/* Dynasty Modal with AnimatePresence for exit animations */}
      <AnimatePresence mode="wait">
        {isModalVisible && selectedDynasty && (
          <DynastyModal
            dynasty={selectedDynasty}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
            currentIndex={currentIndex}
            totalDynasties={dynastyData.dynasties.length}
            ref={modalRef}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DynastyExplorer;
