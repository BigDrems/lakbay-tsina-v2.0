import React from "react";
import { Eye, EyeOff, Volume2, VolumeX } from "lucide-react";

const Header = ({
  isSoundOn,
  volume,
  setVolume,
  isPlaying,
  hasInteracted,
  showLiMei,
  handleSoundToggle,
  toggleLiMei,
}) => {
  return (
    <header className="bg-gradient-to-r from-amber-800 to-orange-700 py-6 px-6 md:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-10 w-10 h-10 bg-white/10 rounded-full translate-y-1/2"></div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-4xl font-semibold text-white tracking-wide">
            Lakbay Tsina
          </h1>
          <div className="flex items-center mt-1">
            <span className="text-amber-200 text-lg">游记</span>
            <div className="w-24 h-[1px] bg-amber-200/50 ml-3"></div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSoundToggle}
            disabled={isPlaying}
            className={`relative p-2.5 rounded-full bg-white/20 transition-all hover:bg-white/30 ${
              isPlaying
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-white/30 hover:scale-105 active:scale-95"
            }`}
            aria-label={isSoundOn ? "Mute sound" : "Unmute sound"}
          >
            {isSoundOn ? (
              <Volume2 size={24} className="text-white drop-shadow-md" />
            ) : (
              <VolumeX size={24} className="text-white drop-shadow-md" />
            )}
            {!hasInteracted && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-300 ring-2 ring-white rounded-full animate-pulse"></div>
            )}
          </button>

          {isSoundOn && (
            <div className="px-3 py-1.5 bg-white/20 rounded-lg flex items-center shadow-sm">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                disabled={isPlaying}
                className={`w-24 accent-amber-300 ${
                  isPlaying ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Volume control"
              />
            </div>
          )}

          <button
            onClick={toggleLiMei}
            disabled={isPlaying}
            className={`p-2.5 rounded-full bg-white/20 transition-all ${
              isPlaying
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-white/30 hover:scale-105 active:scale-95"
            }`}
            title={showLiMei ? "Hide Li Mei" : "Show Li Mei"}
            aria-label={showLiMei ? "Hide Li Mei" : "Show Li Mei"}
          >
            {showLiMei ? (
              <Eye size={24} className="text-white drop-shadow-md" />
            ) : (
              <EyeOff size={24} className="text-white drop-shadow-md" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
