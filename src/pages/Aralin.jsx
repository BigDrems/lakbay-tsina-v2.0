import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

// Custom hooks
import useFilteredLessons from "../hooks/useFilteredLessons";

// Components
import LessonCard from "../components/LessonCard";
import EmptyState from "../components/EmptyState";
import LessonCardSkeleton from "../components/LessonCardSkeleton";

// Data and constants
import { SORT_OPTIONS } from "../utils/constants";
import { lessons } from "../data/lessons";
import { preloadImages } from "../utils/imageUtils";

// Memoized section components for better performance
const HeroSection = memo(({ searchQuery, setSearchQuery }) => (
  <div className="mb-12 text-center">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Mga Aralin Tungkol sa Tsina
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Simulan ang iyong paglalakbay sa pag-aaral tungkol sa mayamang kultura
        at kasaysayan ng Tsina.
      </p>
    </motion.div>

    {/* Search */}
    <div className="mt-8 max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Maghanap ng aralin..."
          className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200 focus:border-[#cd201c] focus:ring focus:ring-red-100 focus:outline-none shadow-sm"
        />
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
    </div>
  </div>
));

const ResultsHeader = memo(
  ({ filteredLessons, selectedCategory, sortOption, setSortOption }) => (
    <div className="mb-6 flex justify-between items-center">
      <h2 className="text-xl font-bold text-gray-800">
        {filteredLessons.length}{" "}
        {filteredLessons.length === 1 ? "Aralin" : "Mga Aralin"}{" "}
        {selectedCategory !== "All" ? `sa ${selectedCategory}` : ""}
      </h2>
      <div className="text-sm text-gray-500">
        <select
          className="bg-white border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-100"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
);

// Updated component to handle loading state
const LessonsGrid = memo(({ filteredLessons, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <LessonCardSkeleton key={index} index={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredLessons.map((lesson, index) => (
        <LessonCard key={lesson.id} lesson={lesson} index={index} />
      ))}
    </div>
  );
});

// Main component
const Aralin = () => {
  const {
    filteredLessons,
    selectedCategory,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    resetFilters,
  } = useFilteredLessons();

  const [isLoading, setIsLoading] = useState(true);

  // Preload lesson images when component mounts
  useEffect(() => {
    setIsLoading(true);

    const lessonImages = lessons.map((lesson) => lesson.image);
    const avatarImages = lessons.map(
      (lesson) =>
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${lesson.instructor}`
    );

    // Preload all lesson images first
    preloadImages(lessonImages)
      .then(() => {
        console.log("Lesson images preloaded successfully");
        // Then preload instructor avatars
        return preloadImages(avatarImages);
      })
      .then(() => {
        console.log("Instructor avatars preloaded successfully");
        // Set loading to false when all images are preloaded
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn("Some images failed to preload", error);
        // Even if preloading fails, stop showing loading state after 3 seconds
        setTimeout(() => setIsLoading(false), 3000);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <ResultsHeader
          filteredLessons={filteredLessons}
          selectedCategory={selectedCategory}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        {filteredLessons.length > 0 || isLoading ? (
          <LessonsGrid
            filteredLessons={filteredLessons}
            isLoading={isLoading}
          />
        ) : (
          <EmptyState resetFilters={resetFilters} />
        )}
      </div>
    </div>
  );
};

export default Aralin;
