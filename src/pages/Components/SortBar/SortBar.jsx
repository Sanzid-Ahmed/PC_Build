import React from "react";

const SortBar = ({
  sortOption,
  setSortOption,
  setCurrentPage,
  productCount,
}) => {
  return (
    <div
      className="
        mb-5
        flex
        flex-col
        gap-3
        rounded-2xl
        border
        border-base-300
        bg-base-100
        p-3
        shadow-sm
        sm:mb-6
        sm:p-4
        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      {/* PRODUCT COUNT */}

      <div className="min-w-0">
        <p className="text-xs text-base-content/60 sm:text-sm">
          Showing
        </p>

        <p className="truncate font-bold text-base-content">
          {productCount} components
        </p>
      </div>


      {/* SORT */}

      <div className="flex w-full items-center gap-2 sm:gap-3 md:w-auto">

        <label
          htmlFor="sort"
          className="
            shrink-0
            text-xs
            font-semibold
            text-base-content/60
            sm:text-sm
          "
        >
          Sort:
        </label>

        <select
          id="sort"
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            setCurrentPage(1);
          }}
          className="
            select
            select-bordered
            min-w-0
            flex-1
            rounded-xl
            border-base-300
            bg-base-100
            text-xs
            text-base-content
            focus:border-primary
            focus:outline-none
            sm:text-sm
            md:w-56
            md:flex-none
          "
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