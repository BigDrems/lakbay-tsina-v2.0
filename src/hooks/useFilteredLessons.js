import { useState, useMemo } from "react";
import { lessons } from "../data/lessons";

export const useFilteredLessons = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  const filteredLessons = useMemo(() => {
    // Filter by category and search query
    const filtered = lessons.filter(
      (lesson) =>
        (selectedCategory === "All" || lesson.category === selectedCategory) &&
        (searchQuery === "" ||
          lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lesson.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Sort based on selected option
    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "popular":
          return b.students - a.students;
        case "highest-rated":
          return b.ratings - a.ratings;
        case "newest":
        default:
          return b.id - a.id;
      }
    });
  }, [selectedCategory, searchQuery, sortOption]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return {
    filteredLessons,
    selectedCategory,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    resetFilters,
  };
};

export default useFilteredLessons;
