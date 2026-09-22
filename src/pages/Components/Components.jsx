/* eslint-disable react-hooks/set-state-in-effect */

import React, { useEffect, useMemo, useState } from "react";

import useProducts from "../../hooks/useProducts";

import FilterSidebar from "./FilterSidebar/FilterSidebar";
import SortBar from "./SortBar/SortBar";
import ActiveFilters from "./ActiveFilters/ActiveFilters";
import ProductCard from "./ProductCard/ProductCard";
import Pagination from "./Pagination/Pagination";
import LoadingSkeleton from "./LoadingSkeleton/LoadingSkeleton";

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

  /* =====================================================
     PREPARE PRODUCTS
  ===================================================== */

  const preparedProducts = useMemo(() => {
    const prepared = products.map((product) => ({
      ...product,
      numericPrice: Number(product.price) || 0,
      searchableName: String(product.name || "").toLowerCase(),
      searchableStore: String(product.store || "").toLowerCase(),
    }));

    /*
      Star Tech products come first.

      This only affects the default order.
      Price/name sorting below will still work normally.
    */
    prepared.sort((a, b) => {
      const aIsStarTech =
        a.searchableStore.includes("star tech") ||
        a.searchableStore.includes("startech");

      const bIsStarTech =
        b.searchableStore.includes("star tech") ||
        b.searchableStore.includes("startech");

      if (aIsStarTech && !bIsStarTech) {
        return -1;
      }

      if (!aIsStarTech && bIsStarTech) {
        return 1;
      }

      return 0;
    });

    return prepared;
  }, [products]);

  /* =====================================================
     CATEGORIES
  ===================================================== */

  const categories = useMemo(() => {
    const categorySet = new Set();

    preparedProducts.forEach((product) => {
      if (product.category && product.category.trim() !== "") {
        categorySet.add(product.category);
      }
    });

    return [...categorySet].sort();
  }, [preparedProducts]);

  /* =====================================================
     STORES
  ===================================================== */

  const stores = useMemo(() => {
    const storeSet = new Set();

    preparedProducts.forEach((product) => {
      if (product.store && product.store.trim() !== "") {
        storeSet.add(product.store);
      }
    });

    return [...storeSet].sort();
  }, [preparedProducts]);

  /* =====================================================
     CATEGORY COUNTS
  ===================================================== */

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

  /* =====================================================
     STORE COUNTS
  ===================================================== */

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

  /* =====================================================
     PRICE RANGE
  ===================================================== */

  useEffect(() => {
    if (preparedProducts.length === 0) return;

    let lowest = Infinity;
    let highest = -Infinity;

    preparedProducts.forEach((product) => {
      const price = product.numericPrice;

      if (price >= 0) {
        if (price < lowest) lowest = price;
        if (price > highest) highest = price;
      }
    });

    if (lowest === Infinity || highest === -Infinity) return;

    const newMin = Math.floor(lowest);
    const newMax = Math.ceil(highest);

    setPriceRange({
      min: newMin,
      max: newMax,
    });

    setMinPrice(newMin);
    setMaxPrice(newMax);
  }, [preparedProducts]);

  /* =====================================================
     FILTER + SORT
  ===================================================== */

  const filteredProducts = useMemo(() => {
    const result = [];

    for (const product of preparedProducts) {
      if (
        selectedCategory !== "All" &&
        product.category !== selectedCategory
      ) {
        continue;
      }

      if (
        selectedStore !== "All" &&
        product.store !== selectedStore
      ) {
        continue;
      }

      if (
        product.numericPrice < minPrice ||
        product.numericPrice > maxPrice
      ) {
        continue;
      }

      result.push(product);
    }

    /*
      Keep Star Tech first when default sorting is selected.
    */
    if (sortOption === "default") {
      result.sort((a, b) => {
        const aIsStarTech =
          a.searchableStore.includes("star tech") ||
          a.searchableStore.includes("startech");

        const bIsStarTech =
          b.searchableStore.includes("star tech") ||
          b.searchableStore.includes("startech");

        if (aIsStarTech && !bIsStarTech) {
          return -1;
        }

        if (!aIsStarTech && bIsStarTech) {
          return 1;
        }

        return 0;
      });
    }

    if (sortOption === "price-low") {
      result.sort(
        (a, b) => a.numericPrice - b.numericPrice
      );
    }

    if (sortOption === "price-high") {
      result.sort(
        (a, b) => b.numericPrice - a.numericPrice
      );
    }

    if (sortOption === "name-az") {
      result.sort((a, b) =>
        a.searchableName.localeCompare(
          b.searchableName
        )
      );
    }

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

  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedProducts = useMemo(() => {
    const start =
      (currentPage - 1) * PRODUCTS_PER_PAGE;

    return filteredProducts.slice(
      start,
      start + PRODUCTS_PER_PAGE
    );
  }, [filteredProducts, currentPage]);

  /* =====================================================
     PAGE NUMBERS
  ===================================================== */

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

    if (currentPage >= totalPages - 3) {
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

  /* =====================================================
     RESET FILTERS
  ===================================================== */

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedStore("All");
    setSortOption("default");
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);
    setCurrentPage(1);
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return <LoadingSkeleton />;
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-base-100 px-[clamp(0.75rem,2vw,2rem)]">
        <div className="w-full max-w-lg rounded-[clamp(1rem,2vw,1.5rem)] border border-error/20 bg-base-100 p-[clamp(1.25rem,3vw,2rem)] text-center shadow-lg">
          <h2 className="text-[clamp(1.15rem,2vw,1.5rem)] font-bold text-error">
            Failed to Load Components
          </h2>

          <p className="mt-3 break-words text-[clamp(0.8rem,1vw,1rem)] leading-relaxed text-base-content/60">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-primary px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.6rem,1vw,0.8rem)] text-[clamp(0.75rem,1vw,0.9rem)] font-semibold text-primary-content transition-all duration-200 hover:bg-accent hover:shadow-md"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  /* =====================================================
     MAIN
  ===================================================== */

  return (
    <section
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-base-100
        px-[clamp(0.75rem,2vw,2.5rem)]
        pt-[clamp(5.5rem,8vw,8rem)]
        pb-[clamp(3rem,5vw,5rem)]
      "
    >
      <div className="mx-auto w-full max-w-[1800px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-[clamp(1.5rem,3vw,2.75rem)]">
          <div className="min-w-0">

            <p
              className="
                mb-[clamp(0.35rem,0.7vw,0.6rem)]
                text-[clamp(0.6rem,0.8vw,0.85rem)]
                font-bold
                uppercase
                tracking-[clamp(0.1em,0.2vw,0.2em)]
                text-primary
              "
            >
              ThriftBuild Components
            </p>

            <h1
              className="
                break-words
                text-[clamp(1.6rem,3vw,3.1rem)]
                font-extrabold
                leading-[1.1]
                text-base-content
              "
            >
              Find the Right Components
            </h1>

            <p
              className="
                mt-[clamp(0.5rem,1vw,0.8rem)]
                max-w-2xl
                break-words
                text-[clamp(0.75rem,1vw,1rem)]
                leading-[1.6]
                text-base-content/60
              "
            >
              Browse PC components from different stores
              and find the right products at the right
              price.
            </p>

          </div>
        </div>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div
          className="
            grid
            min-w-0
            grid-cols-1
            gap-[clamp(1rem,1.5vw,2rem)]
            lg:grid-cols-[clamp(190px,18vw,270px)_minmax(0,1fr)]
          "
        >

          {/* =================================================
              FILTER SIDEBAR
          ================================================= */}

          <div className="min-w-0">
            <FilterSidebar
              categories={categories}
              stores={stores}
              categoryCounts={categoryCounts}
              storeCounts={storeCounts}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedStore={selectedStore}
              setSelectedStore={setSelectedStore}
              minPrice={minPrice}
              maxPrice={maxPrice}
              priceRange={priceRange}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              resetFilters={resetFilters}
              setCurrentPage={setCurrentPage}
            />
          </div>

          {/* =================================================
              PRODUCTS
          ================================================= */}

          <div className="min-w-0">

            {/* SORT */}

            <div className="min-w-0">
              <SortBar
                sortOption={sortOption}
                setSortOption={setSortOption}
                setCurrentPage={setCurrentPage}
                productCount={filteredProducts.length}
              />
            </div>

            {/* ACTIVE FILTERS */}

            <div className="mt-[clamp(0.5rem,1vw,0.8rem)] min-w-0">
              <ActiveFilters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedStore={selectedStore}
                setSelectedStore={setSelectedStore}
                setCurrentPage={setCurrentPage}
              />
            </div>

            {/* =================================================
                PRODUCT GRID
                MOBILE = 1
                SM     = 2
                LG     = 3
                XL     = 4
            ================================================= */}

            {paginatedProducts.length > 0 ? (
              <div
                className="
                  mt-[clamp(0.75rem,1.5vw,1.25rem)]
                  grid
                  min-w-0
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-3
                  xl:grid-cols-4
                  gap-[clamp(0.65rem,1vw,1.5rem)]
                "
              >
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="
                      min-w-0
                      w-full
                    "
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="
                  mt-[clamp(1rem,2vw,1.5rem)]
                  rounded-[clamp(1rem,2vw,1.5rem)]
                  border
                  border-base-300
                  bg-base-100
                  px-[clamp(1rem,3vw,1.5rem)]
                  py-[clamp(3rem,6vw,5rem)]
                  text-center
                  shadow-sm
                "
              >
                <h3
                  className="
                    text-[clamp(1rem,1.5vw,1.25rem)]
                    font-bold
                    text-base-content
                  "
                >
                  No Components Found
                </h3>

                <p
                  className="
                    mx-auto
                    mt-2
                    max-w-md
                    text-[clamp(0.75rem,1vw,0.9rem)]
                    leading-relaxed
                    text-base-content/60
                  "
                >
                  No components match your current
                  filters.
                </p>

                <button
                  onClick={resetFilters}
                  className="
                    mt-6
                    rounded-xl
                    bg-primary
                    px-[clamp(1rem,2vw,1.4rem)]
                    py-[clamp(0.6rem,1vw,0.75rem)]
                    text-[clamp(0.75rem,1vw,0.9rem)]
                    font-bold
                    text-primary-content
                    transition-all
                    duration-200
                    hover:bg-accent
                    hover:shadow-md
                  "
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* PAGINATION */}

            <div
              className="
                mt-[clamp(1.5rem,3vw,2.5rem)]
                min-w-0
                overflow-x-auto
              "
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageNumbers={pageNumbers}
                setCurrentPage={setCurrentPage}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Components;