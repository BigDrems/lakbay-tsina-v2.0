import React from "react";

const GuideAvatar = ({ showLiMei }) => {
  if (!showLiMei) return null;

  return (
    <div className="flex items-center mb-6 transition-all duration-500 hover:transform hover:scale-105">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 p-1 shadow-lg relative group">
        <div className="w-full h-full rounded-full overflow-hidden border border-amber-200 transition-transform duration-300 group-hover:scale-110">
          <img
            src="/avatar.jpg"
            alt="Li Mei"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -right-1 -bottom-1 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white text-xs font-bold">李梅</span>
        </div>
      </div>
      <div className="ml-4 flex-1">
        <h2 className="text-lg font-medium text-amber-900">Li Mei</h2>
        <p className="text-amber-700 text-sm">Your guide to Chinese culture</p>
        <div className="mt-1 flex space-x-1">
          <span className="inline-block px-2 py-0.5 text-[10px] bg-amber-100 text-amber-800 rounded-full">
            Language Expert
          </span>
          <span className="inline-block px-2 py-0.5 text-[10px] bg-orange-100 text-orange-800 rounded-full">
            Cultural Guide
          </span>
        </div>
      </div>
    </div>
  );
};

export default GuideAvatar;
