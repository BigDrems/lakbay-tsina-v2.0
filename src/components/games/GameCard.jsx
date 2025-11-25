import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { ANIMATION_VARIANTS } from "../../data/games";
import { getIconComponent } from "../../utils/icons";

const GameCard = React.memo(
  ({ game, onPlay, isFavorite, onToggleFavorite, priority = false }) => {
    const {
      id,
      title,
      description,
      icon,
      difficulty,
      category,
      image,
      path,
      popular,
    } = game;

    const GameIcon = getIconComponent(icon);

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
            fetchPriority={priority ? "high" : "auto"}
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
          <p className="text-amber-800/70 mb-5 flex-grow text-justify">
            {description}
          </p>
          <div className="mt-auto">
            <span className="text-xs font-medium text-amber-600 mb-2 block">
              {category}
            </span>
            <button
              onClick={handlePlay}
              className="w-full bg-gradient-to-r from-amber-600 to-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:from-amber-700 hover:to-red-700 transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
              aria-label={`Play ${title}`}
            >
              Simulan
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }
);

GameCard.displayName = "GameCard";

export default GameCard;
