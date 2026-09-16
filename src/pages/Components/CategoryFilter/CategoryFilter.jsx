import React from "react";

import { FaTags } from "react-icons/fa";

const CategoryFilter = ({
  categories,
  categoryCounts,
  selectedCategory,
  setSelectedCategory,
  setCurrentPage,
}) => {
  return (
    <div className="mt-8 border-t border-[#E5E1D0] pt-7">

      <div className="mb-3 flex items-center gap-2">
        <FaTags className="text-sm text-[#606C38]" />

        <h3 className="text-sm font-bold uppercase tracking-wide text-[#283618]">
          Category
        </h3>
      </div>

      <div className="space-y-1.5">

        {/* ALL */}
        <button
          onClick={() => {
            setSelectedCategory("All");
            setCurrentPage(1);
          }}
          className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${
            selectedCategory === "All"
              ? "bg-[#606C38] text-white"
              : "text-[#606C38] hover:bg-[#F7F5EA]"
          }`}
        >
          <span className="truncate">
            All Components
          </span>

          <span className="shrink-0">
            {categories.reduce(
              (total, category) =>
                total +
                (categoryCounts[category] || 0),
              0
            )}
          </span>
        </button>

        {/* CATEGORIES */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(
                category
              );
              setCurrentPage(1);
            }}
            className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${
              selectedCategory === category
                ? "bg-[#606C38] text-white"
                : "text-[#606C38] hover:bg-[#F7F5EA]"
            }`}
          >
            <span className="min-w-0 truncate">
              {category}
            </span>

            <span className="shrink-0">
              {categoryCounts[category] ||
                0}
            </span>
          </button>
        ))}

      </div>
    </div>
  );
};

export default CategoryFilter;