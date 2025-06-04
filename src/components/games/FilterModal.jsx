import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { CATEGORIES } from "../../data/games";

// Separate component for the filter badge
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

FilterBadge.displayName = "FilterBadge";

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

FilterModal.displayName = "FilterModal";

export default FilterModal;
