import React from "react";

import { FaTimes } from "react-icons/fa";

const ActiveFilters = ({
  selectedCategory,
  setSelectedCategory,
  selectedStore,
  setSelectedStore,
  setCurrentPage,
}) => {
  if (
    selectedCategory === "All" &&
    selectedStore === "All"
  ) {
    return null;
  }

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2 sm:mb-6">

      {/* ================= LABEL ================= */}

      <span
        className="
          text-xs
          font-semibold
          text-base-content/60
          sm:text-sm
        "
      >
        Active filters:
      </span>


      {/* ================= CATEGORY ================= */}

      {selectedCategory !== "All" && (
        <button
          onClick={() => {
            setSelectedCategory("All");
            setCurrentPage(1);
          }}
          className="
            flex
            max-w-full
            items-center
            gap-2
            rounded-full
            border
            border-primary/25
            bg-primary/5
            px-3
            py-1.5
            text-xs
            font-semibold
            text-primary
            transition-all
            duration-200
            hover:border-primary
            hover:bg-primary
            hover:text-primary-content
          "
        >
          <span className="max-w-[180px] truncate">
            Category: {selectedCategory}
          </span>

          <FaTimes className="shrink-0 text-[10px]" />
        </button>
      )}


      {/* ================= STORE ================= */}

      {selectedStore !== "All" && (
        <button
          onClick={() => {
            setSelectedStore("All");
            setCurrentPage(1);
          }}
          className="
            flex
            max-w-full
            items-center
            gap-2
            rounded-full
            border
            border-primary/25
            bg-primary/5
            px-3
            py-1.5
            text-xs
            font-semibold
            text-primary
            transition-all
            duration-200
            hover:border-primary
            hover:bg-primary
            hover:text-primary-content
          "
        >
          <span className="max-w-[180px] truncate">
            Store: {selectedStore}
          </span>

          <FaTimes className="shrink-0 text-[10px]" />
        </button>
      )}

    </div>
  );
};

export default ActiveFilters;
