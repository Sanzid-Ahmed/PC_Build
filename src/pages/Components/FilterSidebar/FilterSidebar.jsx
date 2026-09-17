import React from "react";

import {
  FaFilter,
} from "react-icons/fa";

import PriceRange from "../PriceRange/PriceRange";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import StoreFilter from "../StoreFilter/StoreFilter";

const FilterSidebar = ({
  categories,
  stores,
  categoryCounts,
  storeCounts,
  selectedCategory,
  setSelectedCategory,
  selectedStore,
  setSelectedStore,
  minPrice,
  maxPrice,
  priceRange,
  setMinPrice,
  setMaxPrice,
  resetFilters,
  setCurrentPage,
}) => {
  return (
    <aside
      className="
        flex
        h-fit
        w-full
        flex-col
        rounded-2xl
        border
        border-base-300
        bg-base-100
        p-4
        shadow-sm
        sm:p-5
      "
    >

      {/* ================= HEADER ================= */}

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <FaFilter className="text-sm text-primary" />

          <h2 className="font-bold text-base-content">
            Filters
          </h2>

        </div>

        <button
          onClick={resetFilters}
          className="
            text-xs
            font-semibold
            text-primary
            transition-colors
            hover:text-accent
            hover:underline
          "
        >
          Reset
        </button>

      </div>


      {/* ================= PRICE ================= */}

      <PriceRange
        minPrice={minPrice}
        maxPrice={maxPrice}
        priceRange={priceRange}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        setCurrentPage={setCurrentPage}
      />


      {/* ================= CATEGORY ================= */}

      <CategoryFilter
        categories={categories}
        categoryCounts={categoryCounts}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setCurrentPage={setCurrentPage}
      />


      {/* ================= STORE ================= */}

      <StoreFilter
        stores={stores}
        storeCounts={storeCounts}
        selectedStore={selectedStore}
        setSelectedStore={setSelectedStore}
        setCurrentPage={setCurrentPage}
      />

    </aside>
  );
};

export default FilterSidebar;