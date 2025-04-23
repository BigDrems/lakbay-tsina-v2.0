import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
  lazy,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Trophy,
  Brain,
  Music,
  Book,
  Gamepad2,
  ChefHat,
  Search,
  Heart,
  ChevronDown,
  Filter,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Game data - could be moved to a separate file or fetched from an API
const GAMES_DATA = [
  {
    id: 1,
    title: "Chinese Character Match",
    description:
      "Match Chinese characters with their Filipino meanings. Test your knowledge of basic Chinese characters!",
    icon: Book,
    difficulty: "Easy",
    category: "Wika",
    image: "/images/character-match.png",
    path: "/games/character-match",
    popular: true,
  },
  {
    id: 2,
    title: "Dynasty Timeline",
    description:
      "Arrange Chinese dynasties in chronological order. Learn about the rich history of China!",
    icon: Brain,
    difficulty: "Medium",
    category: "Kasaysayan",
    image: "/images/dynasty-timeline.png",
    path: "/games/dynasty-timeline",
    popular: false,
  },
  {
    id: 3,
    title: "Cultural Quiz",
    description:
      "Test your knowledge about Chinese festivals, traditions, and customs.",
    icon: Trophy,
    difficulty: "Medium",
    category: "Kultura",
    image: "/images/cultural-quiz.png",
    path: "/games/cultural-quiz",
    popular: true,
  },
  {
    id: 4,
    title: "Chinese Cuisine Master",
    description:
      "Learn to cook famous Chinese dishes and discover culinary traditions. Drag ingredients and follow cooking steps!",
    icon: ChefHat,
    difficulty: "Easy",
    category: "Kultura",
    image: "/images/chef.png",
    path: "/games/music-memory",
    popular: true,
  },
  {
    id: 5,
    title: "Geography Explorer",
    description:
      "Explore China's geography through an interactive map game. Learn about provinces and landmarks!",
    icon: Gamepad2,
    difficulty: "Medium",
    category: "Heograpiya",
    image: "/images/geography.jpg",
    path: "/games/geography-explorer",
    popular: false,
  },
];

// All available categories
const CATEGORIES = [
  "Lahat",
  "Wika",
  "Kasaysayan",
  "Kultura",
  "Musika",
  "Heograpiya",
];

// Animation variants - optimized for performance
const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced stagger time
      },
    },
  },
  item: {
    hidden: { y: 10, opacity: 0 }, // Reduced y movement
    show: { y: 0, opacity: 1 },
  },
};

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

// Separate component for the filter badge - memoized
const FilterBadge = React.memo(({ label, color = "amber", onRemove }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}
  >
    {label}
    <button
      onClick={onRemove}
      className={`ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-${color}-500 hover:bg-${color}-200 hover:text-${color}-700 focus:outline-none`}
      aria-label={`Remove ${label} filter`}
    >
      ×
    </button>
  </span>
));

// Filter modal component - memoized
const FilterModal = React.memo(
  ({ isOpen, onClose, filters, onFilterChange }) => {
    const { selectedCategory, showPopularOnly } = filters;

    const handleCategoryChange = useCallback(
      (category) => {
        onFilterChange({ ...filters, selectedCategory: category });
      },
      [filters, onFilterChange]
    );

    const handlePopularToggle = useCallback(() => {
      onFilterChange({ ...filters, showPopularOnly: !showPopularOnly });
    }, [filters, onFilterChange, showPopularOnly]);

    const handleClearFilters = useCallback(() => {
      onFilterChange({ selectedCategory: "Lahat", showPopularOnly: false });
    }, [onFilterChange]);

    // Prevent unnecessary renders if modal is closed
    if (!isOpen) return null;

    return (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/30 z-10"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Filter Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-14 w-72 bg-white rounded-lg shadow-lg border border-amber-200 overflow-hidden z-20"
          role="dialog"
          aria-modal="true"
          aria-labelledby="filter-heading"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3
                id="filter-heading"
                className="text-sm font-semibold text-amber-900"
              >
                Mga Filter
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-amber-100 text-amber-500"
                aria-label="Close filters"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Category Filter Dropdown */}
              <div>
                <label
                  htmlFor="category-filter"
                  className="block text-xs font-medium text-amber-800 mb-1"
                >
                  Kategorya
                </label>
                <div className="relative">
                  <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full pl-3 pr-8 py-2 text-sm rounded-md bg-amber-50 border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:outline-none transition appearance-none"
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-amber-800 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Popular Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="popular-toggle"
                  checked={showPopularOnly}
                  onChange={handlePopularToggle}
                  className="h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                />
                <label
                  htmlFor="popular-toggle"
                  className="ml-2 block text-sm text-amber-800"
                >
                  Mga Popular na Laro
                </label>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== "Lahat" || showPopularOnly) && (
              <div className="mt-3 pt-3 border-t border-amber-100">
                <h4 className="text-xs font-medium text-amber-700 mb-2">
                  Aktibo:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {selectedCategory !== "Lahat" && (
                    <FilterBadge
                      label={selectedCategory}
                      onRemove={() => handleCategoryChange("Lahat")}
                    />
                  )}
                  {showPopularOnly && (
                    <FilterBadge
                      label="Popular"
                      color="red"
                      onRemove={handlePopularToggle}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex border-t border-amber-100">
            <button
              onClick={handleClearFilters}
              className="flex-1 py-2 text-xs font-medium text-amber-700 hover:bg-amber-50 transition"
            >
              I-clear
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 text-xs font-medium bg-amber-500 text-white hover:bg-amber-600 transition"
            >
              Gamitin
            </button>
          </div>
        </motion.div>
      </>
    );
  }
);

// Game card component - memoized
const GameCard = React.memo(
  ({ game, onPlay, isFavorite, onToggleFavorite, priority = false }) => {
    const {
      id,
      title,
      description,
      icon: GameIcon,
      difficulty,
      category,
      image,
      path,
      popular,
    } = game;

    const handlePlay = useCallback(() => {
      onPlay(path);
    }, [onPlay, path]);

    const handleToggleFavorite = useCallback(() => {
      onToggleFavorite(id);
    }, [onToggleFavorite, id]);

    return (
      <motion.div
        layout
        variants={ANIMATION_VARIANTS.item}
        className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-amber-100"
      >
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
            loading={priority ? "eager" : "lazy"}
            fetchpriority={priority ? "high" : "auto"}
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 right-4 flex gap-2">
            <span className="bg-amber-700/90 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
              {difficulty}
            </span>
            {popular && (
              <span className="bg-red-600/90 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md flex items-center gap-1">
                <Heart className="w-3 h-3 fill-white" /> Popular
              </span>
            )}
          </div>
          <button
            onClick={handleToggleFavorite}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-amber-800"
              }`}
            />
          </button>
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-800">
              <GameIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-amber-900">{title}</h3>
          </div>
          <p className="text-amber-800/70 mb-5 flex-grow">{description}</p>
          <div className="mt-auto">
            <span className="text-xs font-medium text-amber-600 mb-2 block">
              {category}
            </span>
            <button
              onClick={handlePlay}
              className="w-full bg-gradient-to-r from-amber-600 to-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:from-amber-700 hover:to-red-700 transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
              aria-label={`Play ${title}`}
            >
              Simulan ang Laro
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }
);

// Main component
const Libangan = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    selectedCategory: "Lahat",
    showPopularOnly: false,
  });
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Extract all image URLs for preloading
  const allImageUrls = useMemo(() => GAMES_DATA.map((game) => game.image), []);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("gameFavorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error parsing favorites:", error);
        setFavorites([]);
      }
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("gameFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // Improved image preloading with sequential loading
  useEffect(() => {
    // Create array to track loading progress
    const totalImages = allImageUrls.length;
    let loadedCount = 0;

    const preloadImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = img.onerror = () => {
          loadedCount++;
          resolve();
        };
      });
    };

    // Load images sequentially with priority for first visible ones
    const preloadImagesSequentially = async () => {
      // First load priority images (first 3)
      const priorityImages = allImageUrls.slice(0, 3);
      const remainingImages = allImageUrls.slice(3);

      await Promise.all(priorityImages.map(preloadImage));

      // Then load remaining images
      for (const url of remainingImages) {
        await preloadImage(url);
      }

      setImagesLoaded(true);
    };

    preloadImagesSequentially();
  }, [allImageUrls]);

  // Callbacks for performance optimization
  const toggleFavorite = useCallback((gameId) => {
    setFavorites((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId]
    );
  }, []);

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

  // Memoized filtered games to prevent unnecessary recalculations
  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter((game) => {
      // Category filter
      const categoryMatch =
        filters.selectedCategory === "Lahat" ||
        game.category === filters.selectedCategory;

      // Search filter
      const searchMatch =
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Popular filter
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
          transition={{ duration: 0.4 }} // Reduced animation time
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-800 to-red-700 mb-4">
            Mga Libangan at Laro
          </h1>
          <p className="text-lg text-amber-900/80 max-w-2xl mx-auto">
            Tuklasin ang Tsina sa pamamagitan ng mga masayang laro at aktibidad
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <div className="max-w-4xl mx-auto mb-10 relative">
          {/* Search Bar with Filter button */}
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

          {/* Filter Modal - only render when needed */}
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
            <p>
              Natagpuan: {filteredGames.length}{" "}
              {filteredGames.length === 1 ? "laro" : "mga laro"}
            </p>
          )}
        </div>

        {/* Games Grid with optimized animation */}
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
              isFavorite={favorites.includes(game.id)}
              onToggleFavorite={toggleFavorite}
              priority={index < 3} // Prioritize loading the first 3 visible game cards
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Libangan;
