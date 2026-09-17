
/* eslint-disable react-hooks/set-state-in-effect */

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

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

  /* =====================================================
     FILTER STATES
  ===================================================== */

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedStore, setSelectedStore] =
    useState("All");

  const [sortOption, setSortOption] =
    useState("default");

  /* =====================================================
     PRICE STATES
  ===================================================== */

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 0,
  });

  /* =====================================================
     PAGINATION
  ===================================================== */

  const [currentPage, setCurrentPage] = useState(1);

  /* =====================================================
     PREPARE PRODUCTS
  ===================================================== */

  const preparedProducts = useMemo(() => {
    return products.map((product) => ({
      ...product,

      numericPrice:
        Number(product.price) || 0,

      searchableName:
        String(product.name || "").toLowerCase(),
    }));
  }, [products]);

  /* =====================================================
     CATEGORIES
  ===================================================== */

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

  /* =====================================================
     STORES
  ===================================================== */

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

  /* =====================================================
     FILTER PRODUCTS
  ===================================================== */

  const filteredProducts = useMemo(() => {
    const result = [];

    for (const product of preparedProducts) {
      /* Category */

      if (
        selectedCategory !== "All" &&
        product.category !== selectedCategory
      ) {
        continue;
      }

      /* Store */

      if (
        selectedStore !== "All" &&
        product.store !== selectedStore
      ) {
        continue;
      }

      /* Price */

      if (
        product.numericPrice < minPrice ||
        product.numericPrice > maxPrice
      ) {
        continue;
      }

      result.push(product);
    }

    /* Sort */

    if (sortOption === "price-low") {
      result.sort(
        (a, b) =>
          a.numericPrice - b.numericPrice
      );
    }

    if (sortOption === "price-high") {
      result.sort(
        (a, b) =>
          b.numericPrice - a.numericPrice
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
    filteredProducts.length /
      PRODUCTS_PER_PAGE
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
  }, [
    filteredProducts,
    currentPage,
  ]);

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
      <section
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-base-100
          px-4
          sm:px-5
        "
      >
        <div
          className="
            w-full
            max-w-lg
            rounded-2xl
            border
            border-error/20
            bg-base-100
            p-6
            text-center
            shadow-lg
            sm:p-8
          "
        >
          <h2
            className="
              text-xl
              font-bold
              text-error
              sm:text-2xl
            "
          >
            Failed to Load Components
          </h2>

          <p
            className="
              mt-3
              break-words
              text-sm
              text-base-content/60
              sm:text-base
            "
          >
            {error}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="
              mt-6
              rounded-xl
              bg-primary
              px-6
              py-3
              font-semibold
              text-primary-content
              transition-all
              duration-200
              hover:bg-accent
              hover:shadow-md
            "
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <section
      className="
        min-h-screen
        overflow-x-hidden
        bg-base-100
        px-3
        pb-16
        pt-24
        sm:px-5
        sm:pb-20
        sm:pt-28
      "
    >
      <div
        className="
          mx-auto
          w-full
          xl:w-10/12
        "
      >

        {/* ================= HEADER ================= */}

        <div className="mb-7 sm:mb-10">
          <div
            className="
              flex
              flex-col
              gap-5
              md:flex-row
              md:items-end
              md:justify-between
            "
          >
            <div className="min-w-0">

              <p
                className="
                  mb-2
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-primary
                  sm:text-sm
                  sm:tracking-[0.2em]
                "
              >
                ThriftBuild Components
              </p>

              <h1
                className="
                  text-2xl
                  font-extrabold
                  leading-tight
                  text-base-content
                  sm:text-3xl
                  md:text-4xl
                "
              >
                Find the Right Components
              </h1>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-6
                  text-base-content/60
                  sm:text-base
                "
              >
                Browse PC components from
                different stores and find the
                right products at the right price.
              </p>

            </div>
          </div>
        </div>


        {/* ================= MAIN GRID ================= */}

        <div
          className="
            grid
            min-w-0
            gap-6
            lg:grid-cols-[250px_minmax(0,1fr)]
            lg:gap-7
            xl:grid-cols-[270px_minmax(0,1fr)]
            xl:gap-8
          "
        >

          {/* ================= SIDEBAR ================= */}

          <FilterSidebar
            categories={categories}
            stores={stores}
            categoryCounts={categoryCounts}
            storeCounts={storeCounts}
            selectedCategory={selectedCategory}
            setSelectedCategory={
              setSelectedCategory
            }
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


          {/* ================= PRODUCTS ================= */}

          <div className="min-w-0">

            {/* SORT */}

            <SortBar
              sortOption={sortOption}
              setSortOption={setSortOption}
              setCurrentPage={setCurrentPage}
              productCount={
                filteredProducts.length
              }
            />


            {/* ACTIVE FILTERS */}

            <ActiveFilters
              selectedCategory={
                selectedCategory
              }
              setSelectedCategory={
                setSelectedCategory
              }
              selectedStore={selectedStore}
              setSelectedStore={
                setSelectedStore
              }
              setCurrentPage={
                setCurrentPage
              }
            />


            {/* PRODUCT GRID */}

            {paginatedProducts.length > 0 ? (
              <div
                className="
                  grid
                  min-w-0
                  grid-cols-1
                  gap-4
                  sm:grid-cols-3
                  sm:gap-5
                  xl:grid-cols-4
                  xl:gap-6
                "
              >
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
              <div
                className="
                  rounded-2xl
                  border
                  border-base-300
                  bg-base-100
                  px-5
                  py-16
                  text-center
                  shadow-sm
                  sm:px-6
                  sm:py-20
                "
              >
                <h3
                  className="
                    text-lg
                    font-bold
                    text-base-content
                    sm:text-xl
                  "
                >
                  No Components Found
                </h3>

                <p
                  className="
                    mx-auto
                    mt-2
                    max-w-md
                    text-sm
                    text-base-content/60
                  "
                >
                  No components match your
                  current filters.
                </p>

                <button
                  onClick={resetFilters}
                  className="
                    mt-6
                    rounded-xl
                    bg-primary
                    px-5
                    py-3
                    text-sm
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


            {/* ================= PAGINATION ================= */}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageNumbers={pageNumbers}
              setCurrentPage={setCurrentPage}
            />

          </div>
        </div>
      </div>
    </section>
  );
};

export default Components;