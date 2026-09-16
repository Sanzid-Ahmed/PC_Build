import React from "react";

const SortBar = ({
  sortOption,
  setSortOption,
  setCurrentPage,
  productCount,
}) => {
  return (
    <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-[#E5E1D0] bg-white p-3 shadow-sm sm:mb-6 sm:p-4 md:flex-row md:items-center md:justify-between">

      <div className="min-w-0">
        <p className="text-xs text-[#6B705C] sm:text-sm">
          Showing
        </p>

        <p className="truncate font-bold text-[#283618]">
          {productCount} components
        </p>
      </div>

      <div className="flex w-full items-center gap-2 sm:gap-3 md:w-auto">

        <label
          htmlFor="sort"
          className="shrink-0 text-xs font-semibold text-[#6B705C] sm:text-sm"
        >
          Sort:
        </label>

        <select
          id="sort"
          value={sortOption}
          onChange={(e) => {
            setSortOption(
              e.target.value
            );

            setCurrentPage(1);
          }}
          className="select select-bordered min-w-0 flex-1 rounded-xl border-[#E5E1D0] bg-[#FFFEF7] text-xs text-[#283618] focus:border-[#606C38] focus:outline-none sm:text-sm md:w-56 md:flex-none"
        >
          <option value="default">
            Default
          </option>

          <option value="price-low">
            Price: Low to High
          </option>

          <option value="price-high">
            Price: High to Low
          </option>

          <option value="name-az">
            Name: A to Z
          </option>

          <option value="name-za">
            Name: Z to A
          </option>
        </select>

      </div>
    </div>
  );
};

export default SortBar;