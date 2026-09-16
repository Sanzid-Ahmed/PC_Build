/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useMemo, useState } from "react";

import {
  FaMicrochip,
  FaShoppingCart,
  FaStar,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaStore,
  FaTags,
  FaTimes,
} from "react-icons/fa";

import useProducts from "../../hooks/useProducts";

const PRODUCTS_PER_PAGE = 12;

const Components = () => {
  const { products, loading, error } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStore, setSelectedStore] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);

  // =====================================================
  // PREPARE PRODUCTS
  // =====================================================

  const preparedProducts = useMemo(() => {
    return products.map((product) => ({
      ...product,
      numericPrice: Number(product.price) || 0,
      searchableName: String(product.name || "").toLowerCase(),
    }));
  }, [products]);

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = useMemo(() => {
    const categorySet = new Set();

    preparedProducts.forEach((product) => {
      if (
        product.category &&
        product.category.trim() !== ""
      ) {
        categorySet.add(product.category);
      }
    });

    return [...categorySet].sort();
  }, [preparedProducts]);

  // =====================================================
  // STORES
  // =====================================================

  const stores = useMemo(() => {
    const storeSet = new Set();

    preparedProducts.forEach((product) => {
      if (
        product.store &&
        product.store.trim() !== ""
      ) {
        storeSet.add(product.store);
      }
    });

    return [...storeSet].sort();
  }, [preparedProducts]);

  // =====================================================
  // CATEGORY COUNTS
  // =====================================================

  const categoryCounts = useMemo(() => {
    const counts = {};

    preparedProducts.forEach((product) => {
      if (product.category) {
        counts[product.category] =
          (counts[product.category] || 0) + 1;
      }
    });

    return counts;
  }, [preparedProducts]);

  // =====================================================
  // STORE COUNTS
  // =====================================================

  const storeCounts = useMemo(() => {
    const counts = {};

    preparedProducts.forEach((product) => {
      if (product.store) {
        counts[product.store] =
          (counts[product.store] || 0) + 1;
      }
    });

    return counts;
  }, [preparedProducts]);

  // =====================================================
  // PRICE RANGE
  // =====================================================

  useEffect(() => {
    if (preparedProducts.length === 0) {
      return;
    }

    let lowest = Infinity;
    let highest = -Infinity;

    preparedProducts.forEach((product) => {
      const price = product.numericPrice;

      if (price >= 0) {
        if (price < lowest) {
          lowest = price;
        }

        if (price > highest) {
          highest = price;
        }
      }
    });

    if (
      lowest === Infinity ||
      highest === -Infinity
    ) {
      return;
    }

    const newMin = Math.floor(lowest);
    const newMax = Math.ceil(highest);

    setPriceRange({
      min: newMin,
      max: newMax,
    });

    setMinPrice(newMin);
    setMaxPrice(newMax);
  }, [preparedProducts]);

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  const filteredProducts = useMemo(() => {
    const result = [];

    for (const product of preparedProducts) {
      // Category filter
      if (
        selectedCategory !== "All" &&
        product.category !== selectedCategory
      ) {
        continue;
      }

      // Store filter
      if (
        selectedStore !== "All" &&
        product.store !== selectedStore
      ) {
        continue;
      }

      // Price filter
      if (
        product.numericPrice < minPrice ||
        product.numericPrice > maxPrice
      ) {
        continue;
      }

      result.push(product);
    }

    // Sort by price low to high
    if (sortOption === "price-low") {
      result.sort(
        (a, b) => a.numericPrice - b.numericPrice
      );
    }

    // Sort by price high to low
    if (sortOption === "price-high") {
      result.sort(
        (a, b) => b.numericPrice - a.numericPrice
      );
    }

    // Sort by name A-Z
    if (sortOption === "name-az") {
      result.sort((a, b) =>
        a.searchableName.localeCompare(
          b.searchableName
        )
      );
    }

    // Sort by name Z-A
    if (sortOption === "name-za") {
      result.sort((a, b) =>
        b.searchableName.localeCompare(
          a.searchableName
        )
      );
    }

    return result;
  }, [
    preparedProducts,
    selectedCategory,
    selectedStore,
    minPrice,
    maxPrice,
    sortOption,
  ]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }

    if (
      totalPages === 0 &&
      currentPage !== 1
    ) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedProducts = useMemo(() => {
    const start =
      (currentPage - 1) *
      PRODUCTS_PER_PAGE;

    return filteredProducts.slice(
      start,
      start + PRODUCTS_PER_PAGE
    );
  }, [filteredProducts, currentPage]);

  // =====================================================
  // PAGE NUMBERS
  // =====================================================

  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (currentPage <= 4) {
      return [
        1,
        2,
        3,
        4,
        5,
        "...",
        totalPages,
      ];
    }

    if (
      currentPage >= totalPages - 3
    ) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }, [totalPages, currentPage]);

  // =====================================================
  // RESET FILTERS
  // =====================================================

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedStore("All");
    setSortOption("default");

    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);

    setCurrentPage(1);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="min-h-screen bg-[#FFFEF7] px-4 pb-20 pt-24 sm:px-5 sm:pt-28">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8 sm:mb-10">
            <div className="h-8 w-56 max-w-full animate-pulse rounded-lg bg-[#E5E1D0]" />

            <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded-lg bg-[#E5E1D0]" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)]">

            <div className="h-[500px] animate-pulse rounded-2xl bg-[#F7F5EA] lg:h-[650px]" />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

              {Array.from({ length: 6 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="h-[390px] animate-pulse rounded-2xl bg-[#F7F5EA]"
                  />
                )
              )}

            </div>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#FFFEF7] px-4 sm:px-5">

        <div className="w-full max-w-lg rounded-2xl border border-red-200 bg-white p-6 text-center shadow-lg sm:p-8">

          <h2 className="text-xl font-bold text-red-600 sm:text-2xl">
            Failed to Load Components
          </h2>

          <p className="mt-3 break-words text-sm text-[#6B705C] sm:text-base">
            {error}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="mt-6 rounded-xl bg-[#606C38] px-6 py-3 font-semibold text-white transition hover:bg-[#4f5b2d]"
          >
            Try Again
          </button>

        </div>
      </section>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <section className="min-h-screen overflow-x-hidden bg-[#FFFEF7] px-3 pb-16 pt-24 sm:px-5 sm:pb-20 sm:pt-28">

      <div className="mx-auto w-full max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-7 sm:mb-10">

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div className="min-w-0">

              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#BC6C25] sm:text-sm sm:tracking-[0.2em]">
                ThriftBuild Components
              </p>

              <h1 className="text-2xl font-extrabold leading-tight text-[#283618] sm:text-3xl md:text-4xl">
                Find the Right Components
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6B705C] sm:text-base">
                Browse PC components from
                different stores and find the
                right products at the right price.
              </p>

            </div>

            <div className="w-full rounded-2xl border border-[#E5E1D0] bg-white px-4 py-3 shadow-sm sm:w-auto sm:px-5 sm:py-4">

              <p className="text-xs font-semibold uppercase tracking-wide text-[#6B705C]">
                Available Components
              </p>

              <p className="mt-1 text-xl font-extrabold text-[#606C38] sm:text-2xl">
                {filteredProducts.length}
              </p>

            </div>

          </div>
        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="z-5 grid min-w-0 gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-7 xl:grid-cols-[270px_minmax(0,1fr)] xl:gap-8">

          {/* =================================================
              FILTER SIDEBAR
          ================================================= */}

          <aside
            className="
              flex
              h-fit
              w-full
              flex-col
              rounded-2xl
              border
              border-[#E5E1D0]
              bg-white
              p-4
              shadow-[0_5px_25px_rgba(40,54,24,0.05)]
              sm:p-5
              lg:sticky
              lg:top-24
            "
          >

            {/* =================================================
                FILTER HEADER
            ================================================= */}

            <div className="mb-6 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <FaFilter className="text-sm text-[#606C38]" />

                <h2 className="font-bold text-[#283618]">
                  Filters
                </h2>

              </div>

              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-[#BC6C25] hover:underline"
              >
                Reset
              </button>

            </div>

            {/* =================================================
                PRICE RANGE
            ================================================= */}

            <div>

              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#283618]">
                Price Range
              </h3>

              {/* PRICE BOXES */}

              <div className="mb-5 grid grid-cols-2 gap-2.5">

                <div className="min-w-0 rounded-xl border border-[#E5E1D0] bg-[#F7F5EA] p-2.5 sm:p-3">

                  <p className="text-[11px] text-[#6B705C] sm:text-xs">
                    Minimum
                  </p>

                  <p className="mt-1 truncate text-xs font-bold text-[#283618] sm:text-sm">
                    ৳ {minPrice.toLocaleString()}
                  </p>

                </div>

                <div className="min-w-0 rounded-xl border border-[#E5E1D0] bg-[#F7F5EA] p-2.5 sm:p-3">

                  <p className="text-[11px] text-[#6B705C] sm:text-xs">
                    Maximum
                  </p>

                  <p className="mt-1 truncate text-xs font-bold text-[#283618] sm:text-sm">
                    ৳ {maxPrice.toLocaleString()}
                  </p>

                </div>

              </div>

              {/* MINIMUM SLIDER */}

              <div className="mb-5">

                <div className="mb-2 flex items-center justify-between gap-2 text-xs text-[#6B705C]">

                  <span>
                    Minimum Price
                  </span>

                  <span className="shrink-0">
                    ৳ {minPrice.toLocaleString()}
                  </span>

                </div>

                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={minPrice}
                  onChange={(e) => {
                    const value =
                      Number(e.target.value);

                    setMinPrice(
                      Math.min(
                        value,
                        maxPrice
                      )
                    );

                    setCurrentPage(1);
                  }}
                  className="range range-xs w-full [--range-shdw:#606C38]"
                />

              </div>

              {/* MAXIMUM SLIDER */}

              <div>

                <div className="mb-2 flex items-center justify-between gap-2 text-xs text-[#6B705C]">

                  <span>
                    Maximum Price
                  </span>

                  <span className="shrink-0">
                    ৳ {maxPrice.toLocaleString()}
                  </span>

                </div>

                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={maxPrice}
                  onChange={(e) => {
                    const value =
                      Number(e.target.value);

                    setMaxPrice(
                      Math.max(
                        value,
                        minPrice
                      )
                    );

                    setCurrentPage(1);
                  }}
                  className="range range-xs w-full [--range-shdw:#606C38]"
                />

              </div>

            </div>

            {/* =================================================
                CATEGORY + STORE
            ================================================= */}

            <div className="mt-8 border-t border-[#E5E1D0] pt-7">

              {/* =================================================
                  CATEGORY
              ================================================= */}

              <div>

                <div className="mb-3 flex items-center gap-2">

                  <FaTags className="text-sm text-[#606C38]" />

                  <h3 className="text-sm font-bold uppercase tracking-wide text-[#283618]">
                    Category
                  </h3>

                </div>

                <div className="space-y-1.5">

                  {/* ALL COMPONENTS */}

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
                      {preparedProducts.length}
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
                        {categoryCounts[
                          category
                        ] || 0}
                      </span>

                    </button>
                  ))}

                </div>

              </div>

              {/* =================================================
                  STORE
              ================================================= */}

              <div className="mt-7 sm:mt-8">

                <div className="mb-3 flex items-center gap-2">

                  <FaStore className="text-sm text-[#606C38]" />

                  <h3 className="text-sm font-bold uppercase tracking-wide text-[#283618]">
                    Store
                  </h3>

                </div>

                <div className="space-y-1.5">

                  {/* ALL STORES */}

                  <button
                    onClick={() => {
                      setSelectedStore("All");
                      setCurrentPage(1);
                    }}
                    className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${
                      selectedStore === "All"
                        ? "bg-[#606C38] text-white"
                        : "text-[#606C38] hover:bg-[#F7F5EA]"
                    }`}
                  >

                    <span className="truncate">
                      All Stores
                    </span>

                    <span className="shrink-0">
                      {preparedProducts.length}
                    </span>

                  </button>

                  {/* STORES */}

                  {stores.map((store) => (
                    <button
                      key={store}
                      onClick={() => {
                        setSelectedStore(store);
                        setCurrentPage(1);
                      }}
                      className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${
                        selectedStore === store
                          ? "bg-[#606C38] text-white"
                          : "text-[#606C38] hover:bg-[#F7F5EA]"
                      }`}
                    >

                      <span className="min-w-0 truncate">
                        {store}
                      </span>

                      <span className="shrink-0">
                        {storeCounts[store] || 0}
                      </span>

                    </button>
                  ))}

                </div>

              </div>

            </div>
          </aside>

          {/* =================================================
              PRODUCTS SECTION
          ================================================= */}

          <div className="min-w-0">

            {/* =================================================
                SORT BAR
            ================================================= */}

            <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-[#E5E1D0] bg-white p-3 shadow-sm sm:mb-6 sm:p-4 md:flex-row md:items-center md:justify-between">

              <div className="min-w-0">

                <p className="text-xs text-[#6B705C] sm:text-sm">
                  Showing
                </p>

                <p className="truncate font-bold text-[#283618]">
                  {filteredProducts.length}{" "}
                  components
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

            {/* =================================================
                ACTIVE FILTERS
            ================================================= */}

            {(selectedCategory !== "All" ||
              selectedStore !== "All") && (
              <div className="mb-5 flex flex-wrap items-center gap-2 sm:mb-6">

                <span className="text-xs font-semibold text-[#6B705C] sm:text-sm">
                  Active filters:
                </span>

                {/* CATEGORY */}

                {selectedCategory !== "All" && (
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setCurrentPage(1);
                    }}
                    className="flex max-w-full items-center gap-2 rounded-full border border-[#606C38] bg-[#F7F5EA] px-3 py-1.5 text-xs font-semibold text-[#606C38]"
                  >

                    <span className="max-w-[180px] truncate">
                      Category:{" "}
                      {selectedCategory}
                    </span>

                    <FaTimes className="shrink-0 text-[10px]" />

                  </button>
                )}

                {/* STORE */}

                {selectedStore !== "All" && (
                  <button
                    onClick={() => {
                      setSelectedStore("All");
                      setCurrentPage(1);
                    }}
                    className="flex max-w-full items-center gap-2 rounded-full border border-[#606C38] bg-[#F7F5EA] px-3 py-1.5 text-xs font-semibold text-[#606C38]"
                  >

                    <span className="max-w-[180px] truncate">
                      Store:{" "}
                      {selectedStore}
                    </span>

                    <FaTimes className="shrink-0 text-[10px]" />

                  </button>
                )}

              </div>
            )}

            {/* =================================================
                PRODUCT GRID
            ================================================= */}

            {paginatedProducts.length > 0 ? (
              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">

                {paginatedProducts.map(
                  (product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  )
                )}

              </div>
            ) : (
              <div className="rounded-2xl border border-[#E5E1D0] bg-white px-5 py-16 text-center shadow-sm sm:px-6 sm:py-20">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F7F5EA] sm:h-20 sm:w-20">

                  <FaMicrochip className="text-2xl text-[#606C38] sm:text-3xl" />

                </div>

                <h3 className="mt-5 text-lg font-bold text-[#283618] sm:text-xl">
                  No Components Found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm text-[#6B705C]">
                  No components match your
                  current filters.
                </p>

                <button
                  onClick={resetFilters}
                  className="mt-6 rounded-xl bg-[#606C38] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#4f5b2d]"
                >
                  Clear Filters
                </button>

              </div>
            )}

            {/* =================================================
                PAGINATION
            ================================================= */}

            {totalPages > 1 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:mt-10 sm:gap-2">

                {/* PREVIOUS */}

                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage(
                      (page) => page - 1
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E5E1D0] bg-white text-[#606C38] transition hover:bg-[#F7F5EA] disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
                >
                  <FaChevronLeft className="text-[10px] sm:text-xs" />
                </button>

                {/* PAGE NUMBERS */}

                {pageNumbers.map(
                  (page, index) =>
                    page === "..." ? (
                      <span
                        key={`dots-${index}`}
                        className="flex h-9 w-7 items-center justify-center text-sm text-[#6B705C] sm:h-10 sm:w-10"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() =>
                          setCurrentPage(page)
                        }
                        className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition sm:h-10 sm:w-10 sm:text-sm ${
                          currentPage === page
                            ? "bg-[#606C38] text-white shadow-md"
                            : "border border-[#E5E1D0] bg-white text-[#606C38] hover:bg-[#F7F5EA]"
                        }`}
                      >
                        {page}
                      </button>
                    )
                )}

                {/* NEXT */}

                <button
                  disabled={
                    currentPage === totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) => page + 1
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E5E1D0] bg-white text-[#606C38] transition hover:bg-[#F7F5EA] disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
                >
                  <FaChevronRight className="text-[10px] sm:text-xs" />
                </button>

              </div>
            )}

            {/* PAGE INFO */}

            {totalPages > 0 && (
              <p className="mt-4 text-center text-xs text-[#6B705C]">
                Page {currentPage} of{" "}
                {totalPages}
              </p>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// PRODUCT CARD
// =====================================================

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  // =====================================================
  // PARSE IMAGES
  // =====================================================

  let images = product.images;

  if (typeof images === "string") {
    try {
      images = JSON.parse(images);
    } catch {
      images = [];
    }
  }

  const image =
    Array.isArray(images) &&
    images.length > 0
      ? images[0]
      : null;

  // =====================================================
  // PRICE
  // =====================================================

  const price = product.numericPrice;

  // =====================================================
  // OLD PRICE
  // =====================================================

  const oldPrice =
    product.old_price !== null &&
    product.old_price !== undefined
      ? Number(product.old_price)
      : null;

  // =====================================================
  // DISCOUNT
  // =====================================================

  const hasDiscount =
    oldPrice !== null &&
    oldPrice > 0 &&
    oldPrice > price;

  const discount = hasDiscount
    ? Math.round(
        ((oldPrice - price) /
          oldPrice) *
          100
      )
    : 0;

  // =====================================================
  // PRODUCT CARD
  // =====================================================

  return (
    <div className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E5E1D0] bg-white shadow-[0_5px_25px_rgba(40,54,24,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(40,54,24,0.12)]">

      {/* =================================================
          IMAGE
      ================================================= */}

      <div className="relative flex h-48 shrink-0 items-center justify-center overflow-hidden bg-[#F7F5EA] p-4 sm:h-52 sm:p-5">

        {/* DISCOUNT */}

        {hasDiscount && (
          <div className="absolute left-3 top-3 z-10 rounded-full bg-[#BC6C25] px-2.5 py-1 text-[10px] font-bold text-white sm:px-3 sm:text-xs">
            -{discount}%
          </div>
        )}

        {/* CATEGORY */}

        {product.category && (
          <div className="absolute right-3 top-3 z-10 max-w-[55%] truncate rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#606C38] shadow-sm sm:px-3 sm:text-xs">
            {product.category}
          </div>
        )}

        {/* IMAGE */}

        {image && !imageError ? (
          <img
            src={image}
            alt={product.name}
            className="h-full w-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            onError={() =>
              setImageError(true)
            }
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-[#606C38] shadow-sm sm:h-24 sm:w-24">

            <FaMicrochip className="text-3xl sm:text-4xl" />

          </div>
        )}

      </div>

      {/* =================================================
          PRODUCT INFORMATION
      ================================================= */}

      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">

        {/* STORE */}

        <div className="mb-2 flex min-w-0 items-center gap-2 text-xs font-semibold text-[#BC6C25]">

          <FaStore className="shrink-0" />

          <span className="min-w-0 truncate">
            {product.store ||
              "Unknown Store"}
          </span>

        </div>

        {/* NAME */}

        <h3 className="line-clamp-2 min-h-[44px] break-words text-sm font-bold leading-5 text-[#283618] sm:min-h-[48px] sm:text-base sm:leading-6">
          {product.name}
        </h3>

        {/* BRAND */}

        {product.brand && (
          <p className="mt-2 truncate text-xs text-[#6B705C]">

            Brand:{" "}

            <span className="font-semibold text-[#283618]">
              {product.brand}
            </span>

          </p>
        )}

        {/* RATING */}

        {product.rating && (
          <div className="mt-3 flex items-center gap-1 text-sm">

            <FaStar className="text-[#DDA15E]" />

            <span className="font-semibold text-[#283618]">
              {product.rating}
            </span>

            <span className="text-xs text-[#6B705C]">
              ({product.reviews || 0})
            </span>

          </div>
        )}

        {/* =================================================
            PRICE
        ================================================= */}

        <div className="mt-auto pt-5">

          <div className="flex min-w-0 flex-wrap items-end gap-2">

            <span className="truncate text-xl font-extrabold text-[#606C38] sm:text-2xl">
              ৳ {price.toLocaleString()}
            </span>

            {hasDiscount && (
              <span className="mb-0.5 text-xs text-[#6B705C] line-through sm:mb-1 sm:text-sm">
                ৳ {oldPrice.toLocaleString()}
              </span>
            )}

          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-2">

            {/* VIEW DETAILS */}

            {product.url ? (
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-w-0 items-center justify-center gap-1.5 rounded-xl bg-[#606C38] px-2 py-3 text-xs font-bold text-white transition hover:bg-[#4f5b2d] sm:gap-2 sm:px-4 sm:text-sm"
              >

                <span className="truncate">
                  View Details
                </span>

                <FaExternalLinkAlt className="shrink-0 text-[9px] sm:text-xs" />

              </a>
            ) : (
              <button
                disabled
                className="rounded-xl bg-[#606C38] px-2 py-3 text-xs font-bold text-white opacity-50 sm:px-4 sm:text-sm"
              >
                View Details
              </button>
            )}

            {/* CART */}

            <button
              type="button"
              title="Add to cart"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#606C38] bg-white text-[#606C38] transition hover:bg-[#606C38] hover:text-white sm:h-12 sm:w-12"
            >
              <FaShoppingCart />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Components;