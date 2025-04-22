import React from "react";

const CategoryButton = ({ category, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 rounded-lg transition-all duration-300 ${
        isSelected
          ? "bg-[#cd201c] text-white shadow-md shadow-red-200"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
    >
      {category}
    </button>
  );
};

export default CategoryButton;
