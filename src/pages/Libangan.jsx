import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GAMES_DATA, ANIMATION_VARIANTS } from "../data/games";
import { useFavorites } from "../hooks/useFavorites";
import { useImagePreloader } from "../hooks/useImagePreloader";
import GameCard from "../components/games/GameCard";
import FilterModal from "../components/games/FilterModal";

// Image preloader component with optimized loading
const ImagePreloader = React.memo(({ imageUrls }) => {
  return (
    <div className="hidden">
      {imageUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt="preloaded"
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          onLoad={() => console.log(`Preloaded: ${url}`)}
        />
      ))}
    </div>
  );
});

ImagePreloader.displayName = "ImagePreloader";

const Libangan = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    selectedCategory: "Lahat",
    showPopularOnly: false,
  });

  // Custom hooks
  const { toggleFavorite, isFavorite } = useFavorites();
  const allImageUrls = useMemo(() => GAMES_DATA.map((game) => game.image), []);
  const imagesLoaded = useImagePreloader(allImageUrls);

  // Callbacks
  const handleGameClick = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  // Memoized filtered games
  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter((game) => {
      const categoryMatch =
        filters.selectedCategory === "Lahat" ||
        game.category === filters.selectedCategory;

      const searchMatch =
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase());

      const popularMatch = !filters.showPopularOnly || game.popular;

      return categoryMatch && searchMatch && popularMatch;
    });
  }, [filters.selectedCategory, filters.showPopularOnly, searchQuery]);

  const hasActiveFilters = useMemo(
    () => filters.selectedCategory !== "Lahat" || filters.showPopularOnly,
    [filters.selectedCategory, filters.showPopularOnly]
  );

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Only preload images if they haven't been loaded yet */}
      {!imagesLoaded && <ImagePreloader imageUrls={allImageUrls} />}

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-800 to-red-700 mb-5 leading-tight py-1">
            Mga Libangan
          </h1>
          <p className="text-lg text-amber-900/80 max-w-2xl mx-auto">
            Tuklasin ang Tsina sa pamamagitan ng mga masayang laro at aktibidad
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <div className="max-w-4xl mx-auto mb-10 relative">
          <div className="flex items-center gap-3">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Hanapin ang laro..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition shadow-sm"
                aria-label="Search games"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-800/60 w-5 h-5" />
            </div>
            <button
              onClick={toggleFilters}
              className="p-3 rounded-full bg-white border border-amber-200 hover:bg-amber-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 relative"
              aria-label="Toggle filters"
              aria-expanded={showFilters}
            >
              <Filter className="w-5 h-5 text-amber-800" />
              {hasActiveFilters && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </button>
          </div>

          <FilterModal
            isOpen={showFilters}
            onClose={toggleFilters}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Results summary */}
        <div className="mb-6 text-amber-800/80">
          {filteredGames.length === 0 ? (
            <p>
              Walang nakitang laro. Subukan mong baguhin ang iyong paghahanap.
            </p>
          ) : (
            <></>
          )}
        </div>

        {/* Games Grid */}
        <motion.div
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredGames.map((game, index) => (
            <GameCard
              key={game.id}
              game={game}
              onPlay={handleGameClick}
              isFavorite={isFavorite(game.id)}
              onToggleFavorite={toggleFavorite}
              priority={index < 3}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Libangan;
