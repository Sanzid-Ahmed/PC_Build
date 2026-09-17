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
    <div className="mt-8 border-t border-base-300 pt-7">

      {/* ================= HEADER ================= */}

      <div className="mb-3 flex items-center gap-2">

        <FaTags className="text-sm text-primary" />

        <h3
          className="
            text-sm
            font-bold
            uppercase
            tracking-wide
            text-base-content
          "
        >
          Category
        </h3>

      </div>


      {/* ================= CATEGORIES ================= */}

      <div className="space-y-1.5">

        {/* ALL */}

        <button
          onClick={() => {
            setSelectedCategory("All");
            setCurrentPage(1);
          }}
          className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${
            selectedCategory === "All"
              ? "bg-primary text-primary-content"
              : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
          }`}
        >
          <span className="truncate">
            All Components
          </span>

          <span className="shrink-0 font-medium">
            {categories.reduce(
              (total, category) =>
                total + (categoryCounts[category] || 0),
              0
            )}
          </span>
        </button>


        {/* CATEGORIES */}

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${
              selectedCategory === category
                ? "bg-primary text-primary-content"
                : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
            }`}
          >
            <span className="min-w-0 truncate">
              {category}
            </span>

            <span className="shrink-0 font-medium">
              {categoryCounts[category] || 0}
            </span>
          </button>
        ))}

      </div>
    </div>
  );
};

export default CategoryFilter;