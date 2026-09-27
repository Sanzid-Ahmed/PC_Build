import React, {
  memo,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaBolt,
  FaBox,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaCircle,
  FaDesktop,
  FaMicrochip,
  FaMemory,
  FaSearch,
  FaServer,
  FaStar,
  FaTimes,
} from "react-icons/fa";

import useProducts from "../../../hooks/useProducts";

import {
  checkProductCompatibility,
} from "../compatibility/compatibility";


// ============================================================
// CONSTANTS
// ============================================================

const PRODUCTS_PER_PAGE = 12;


// ============================================================
// COMPONENT DEFINITIONS
// ============================================================

const COMPONENTS = [
  {
    id: "processor",
    name: "Processor",
    shortName: "CPU",
    icon: FaMicrochip,
  },
  {
    id: "motherboard",
    name: "Motherboard",
    shortName: "Board",
    icon: FaServer,
  },
  {
    id: "ram",
    name: "Memory",
    shortName: "RAM",
    icon: FaMemory,
  },
  {
    id: "gpu",
    name: "Graphics",
    shortName: "GPU",
    icon: FaDesktop,
  },
  {
    id: "storage",
    name: "Storage",
    shortName: "SSD / HDD",
    icon: FaBox,
  },
  {
    id: "psu",
    name: "Power Supply",
    shortName: "PSU",
    icon: FaBolt,
  },
  {
    id: "case",
    name: "PC Case",
    shortName: "Case",
    icon: FaDesktop,
  },
];


// ============================================================
// CATEGORY MAP
// ============================================================

const CATEGORY_MAP = {
  processor: [
    "processor",
    "cpu",
  ],

  motherboard: [
    "motherboard",
    "mother board",
    "mainboard",
  ],

  ram: [
    "ram",
    "memory",
    "desktop ram",
    "laptop ram",
  ],

  gpu: [
    "gpu",
    "graphics card",
    "graphic card",
    "graphics",
    "video card",
    "vga",
  ],

  storage: [
    "storage",
    "ssd",
    "hdd",
    "nvme",
    "hard disk",
    "hard drive",
  ],

  psu: [
    "psu",
    "power supply",
    "power supply unit",
  ],

  case: [
    "case",
    "pc case",
    "computer case",
    "casing",
  ],
};


// ============================================================
// NORMALIZE
// ============================================================

const normalize = (value) => {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ");
};


// ============================================================
// JSON PARSER
// ============================================================

const parseJSON = (value) => {
  if (!value) {
    return {};
  }

  if (
    typeof value === "object"
  ) {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
};


// ============================================================
// FEATURES
// ============================================================

const parseFeatures = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  try {
    const parsed =
      JSON.parse(value);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
};


// ============================================================
// CATEGORY MATCH
// ============================================================

const productMatchesCategory = (
  product,
  componentType
) => {
  const category =
    normalize(product?.category);

  if (!category) {
    return false;
  }

  const allowed =
    CATEGORY_MAP[
      componentType
    ] || [];

  return allowed.some(
    (item) => {
      const normalizedItem =
        normalize(item);

      return (
        category ===
          normalizedItem ||
        category.startsWith(
          normalizedItem + " "
        )
      );
    }
  );
};


// ============================================================
// IMAGE
// ============================================================

const getProductImage = (
  product
) => {
  if (!product?.images) {
    return "";
  }

  if (
    Array.isArray(
      product.images
    )
  ) {
    return (
      product.images[0] || ""
    );
  }

  try {
    const parsed =
      JSON.parse(
        product.images
      );

    if (
      Array.isArray(parsed)
    ) {
      return (
        parsed[0] || ""
      );
    }
  } catch {
    return "";
  }

  return "";
};


// ============================================================
// SPECIFICATIONS
// ============================================================

const getSpecificationEntries = (
  product
) => {
  const specifications =
    parseJSON(
      product?.specifications
    );

  if (
    !specifications ||
    typeof specifications !==
      "object"
  ) {
    return [];
  }

  return Object.entries(
    specifications
  ).slice(0, 3);
};


// ============================================================
// PRODUCT IMAGE
// ============================================================

const ProductImage = memo(
  ({ product }) => {
    const [
      imageError,
      setImageError,
    ] = useState(false);

    const image =
      getProductImage(product);

    if (
      !image ||
      imageError
    ) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-base-200">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-base-300 text-xl text-base-content/30">
            <FaBox />
          </div>

        </div>
      );
    }

    return (
      <img
        src={image}
        alt={product.name}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        onError={() =>
          setImageError(true)
        }
      />
    );
  }
);


// ============================================================
// PRODUCT CARD
// ============================================================

const ProductCard = memo(
  ({
    product,
    componentType,
    selectedComponents,
    onSelect,
    isAIRecommended,
  }) => {

    const compatibility =
      checkProductCompatibility(
        componentType,
        product,
        selectedComponents
      );

    if (
      compatibility?.status ===
      "incompatible"
    ) {
      return null;
    }

    const isSelected =
      selectedComponents?.[
        componentType
      ]?.id === product.id;

    const specificationEntries =
      getSpecificationEntries(
        product
      );

    const features =
      parseFeatures(
        product?.features
      );


    return (
      <article
        className={`
          group
          relative
          overflow-hidden
          rounded-xl
          border
          bg-base-100
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:shadow-md
          ${
            isSelected
              ? "border-primary ring-1 ring-primary/30"
              : "border-base-300"
          }
        `}
      >

        {/* ====================================================
            IMAGE
        ==================================================== */}

        <div className="relative h-40 bg-base-200/70">

          <ProductImage
            product={product}
          />


          {/* AI */}

          {isAIRecommended && (
            <div className="absolute left-3 top-3">

              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-content shadow-sm">

                <FaCircle className="text-[5px]" />

                AI PICK

              </span>

            </div>
          )}


          {/* SELECTED */}

          {isSelected && (
            <div className="absolute right-3 top-3">

              <span className="inline-flex items-center gap-1.5 rounded-full bg-success px-2.5 py-1 text-[10px] font-bold text-success-content shadow-sm">

                <FaCheck />

                SELECTED

              </span>

            </div>
          )}

        </div>


        {/* ====================================================
            CONTENT
        ==================================================== */}

        <div className="p-3.5">


          {/* COMPONENT */}

          <div className="mb-1.5 flex items-center gap-2">

            <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/40">
              {product.category}
            </span>

          </div>


          {/* NAME */}

          <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-bold leading-5">
            {product.name}
          </h3>


          {/* BRAND / STORE */}

          <div className="mt-2 flex min-w-0 items-center gap-2">

            {product.brand && (
              <span className="max-w-[45%] truncate rounded-md bg-base-200 px-2 py-1 text-[10px] font-semibold">
                {product.brand}
              </span>
            )}

            {product.store && (
              <span className="truncate text-[10px] text-base-content/40">
                {product.store}
              </span>
            )}

          </div>


          {/* RATING */}

          {product.rating !== null &&
            product.rating !==
              undefined && (
              <div className="mt-2 flex items-center gap-1 text-xs">

                <FaStar />

                <span className="font-semibold">
                  {product.rating}
                </span>

                {Number(
                  product.reviews
                ) > 0 && (
                  <span className="text-base-content/40">
                    ({product.reviews})
                  </span>
                )}

              </div>
            )}


          {/* PRICE */}

          <div className="mt-3 flex items-end justify-between gap-2">

            <div>

              {product.price !==
                null &&
              product.price !==
                undefined ? (
                <p className="text-lg font-black">

                  ৳
                  {Number(
                    product.price
                  ).toLocaleString(
                    "en-BD"
                  )}

                </p>
              ) : (
                <p className="text-xs text-base-content/40">
                  Price unavailable
                </p>
              )}

              {product.old_price &&
                Number(
                  product.old_price
                ) >
                  Number(
                    product.price
                  ) && (
                  <p className="text-[10px] text-base-content/35 line-through">

                    ৳
                    {Number(
                      product.old_price
                    ).toLocaleString(
                      "en-BD"
                    )}

                  </p>
                )}

            </div>


            {/* COMPATIBILITY */}

            {compatibility?.status ===
              "compatible" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-success/10 px-2 py-1 text-[10px] font-bold text-success">

                <FaCheck />

                Compatible

              </span>
            )}

          </div>


          {/* UNKNOWN */}

          {compatibility?.status ===
            "unknown" && (
            <div className="mt-2">

              <span className="text-[10px] text-warning">
                Compatibility needs review
              </span>

            </div>
          )}


          {/* ==================================================
              SMALL SPECS
          ================================================== */}

          {specificationEntries.length >
            0 && (
            <div className="mt-3 border-t border-base-200 pt-2.5">

              <div className="grid grid-cols-1 gap-1">

                {specificationEntries.map(
                  (
                    [
                      key,
                      value,
                    ],
                    index
                  ) => (
                    <div
                      key={`${key}-${index}`}
                      className="flex items-center justify-between gap-2 text-[10px]"
                    >

                      <span className="truncate text-base-content/40">
                        {key}
                      </span>

                      <span className="max-w-[55%] truncate text-right font-medium">
                        {String(
                          value
                        )}
                      </span>

                    </div>
                  )
                )}

              </div>

            </div>
          )}


          {/* FEATURES */}

          {features.length >
            0 && (
            <div className="mt-2 flex gap-1 overflow-hidden">

              {features
                .slice(0, 2)
                .map(
                  (
                    feature,
                    index
                  ) => (
                    <span
                      key={index}
                      className="max-w-[50%] truncate rounded-md bg-base-200 px-2 py-1 text-[9px] text-base-content/50"
                    >
                      {String(
                        feature
                      ).slice(
                        0,
                        32
                      )}
                    </span>
                  )
                )}

            </div>
          )}


          {/* ==================================================
              SELECT BUTTON
          ================================================== */}

          <button
            type="button"
            className={`
              btn
              btn-sm
              mt-3
              w-full
              ${
                isSelected
                  ? "btn-success"
                  : "btn-primary"
              }
            `}
            onClick={() =>
              onSelect(
                componentType,
                product
              )
            }
          >

            {isSelected ? (
              <>
                <FaCheck />
                Selected
              </>
            ) : (
              "Select Component"
            )}

          </button>

        </div>

      </article>
    );
  }
);


// ============================================================
// MAIN COMPONENT
// ============================================================

const ComponentSelector = ({
  selectedComponents,
  onSelect,
  aiSuggestions = [],
}) => {

  const {
    products,
    loading,
    refreshing,
    error,
  } = useProducts();


  // ==========================================================
  // ACTIVE COMPONENT
  // ==========================================================

  const [
    activeComponent,
    setActiveComponent,
  ] = useState(
    "processor"
  );


  // ==========================================================
  // FILTERS
  // ==========================================================

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    brand,
    setBrand,
  ] = useState("all");

  const [
    maxPrice,
    setMaxPrice,
  ] = useState("");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);


  // ==========================================================
  // RESET PAGE
  // ==========================================================

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [
    activeComponent,
    search,
    brand,
    maxPrice,
  ]);


  // ==========================================================
  // AI IDS
  // ==========================================================

  const aiProductIds =
    useMemo(() => {

      const ids =
        new Set();

      for (
        const suggestion of aiSuggestions
      ) {
        if (
          suggestion?.product?.id !==
          undefined
        ) {
          ids.add(
            String(
              suggestion.product.id
            )
          );
        }
      }

      return ids;

    }, [
      aiSuggestions,
    ]);


  // ==========================================================
  // AI PRODUCTS
  // ==========================================================

  const aiProducts =
    useMemo(() => {

      return aiSuggestions
        .filter(
          (suggestion) =>
            suggestion?.component ===
              activeComponent &&
            suggestion?.product
        )
        .map(
          (suggestion) =>
            suggestion.product
        );

    }, [
      aiSuggestions,
      activeComponent,
    ]);


  // ==========================================================
  // CATEGORY PRODUCTS
  // ==========================================================

  const categoryProducts =
    useMemo(() => {

      return products.filter(
        (product) =>
          productMatchesCategory(
            product,
            activeComponent
          )
      );

    }, [
      products,
      activeComponent,
    ]);


  // ==========================================================
  // BRANDS
  // ==========================================================

  const brands =
    useMemo(() => {

      const brandSet =
        new Set();

      for (
        const product of categoryProducts
      ) {
        if (
          product?.brand
        ) {
          brandSet.add(
            product.brand
          );
        }
      }

      return Array.from(
        brandSet
      ).sort();

    }, [
      categoryProducts,
    ]);


  // ==========================================================
  // FILTERED PRODUCTS
  // ==========================================================

  const filteredProducts =
    useMemo(() => {

      const searchText =
        normalize(search);

      const results = [];

      for (
        const product of categoryProducts
      ) {

        // SEARCH

        if (
          searchText &&
          !normalize(
            `${product.name || ""} ${
              product.brand || ""
            }`
          ).includes(
            searchText
          )
        ) {
          continue;
        }


        // BRAND

        if (
          brand !== "all" &&
          normalize(
            product.brand
          ) !==
            normalize(
              brand
            )
        ) {
          continue;
        }


        // PRICE

        if (
          maxPrice &&
          Number(
            product.price
          ) >
            Number(
              maxPrice
            )
        ) {
          continue;
        }


        // COMPATIBILITY

        const compatibility =
          checkProductCompatibility(
            activeComponent,
            product,
            selectedComponents
          );

        if (
          compatibility?.status ===
          "incompatible"
        ) {
          continue;
        }


        // AI PRODUCTS

        if (
          aiProductIds.has(
            String(
              product.id
            )
          )
        ) {
          continue;
        }


        results.push(
          product
        );
      }

      return results;

    }, [
      categoryProducts,
      search,
      brand,
      maxPrice,
      selectedComponents,
      activeComponent,
      aiProductIds,
    ]);


  // ==========================================================
  // PAGINATION
  // ==========================================================

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredProducts.length /
          PRODUCTS_PER_PAGE
      )
    );


  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages
    );


  const startIndex =
    (safeCurrentPage - 1) *
    PRODUCTS_PER_PAGE;


  const visibleProducts =
    filteredProducts.slice(
      startIndex,
      startIndex +
        PRODUCTS_PER_PAGE
    );


  // ==========================================================
  // CLEAR FILTERS
  // ==========================================================

  const clearFilters = () => {
    setSearch("");
    setBrand("all");
    setMaxPrice("");
  };


  const hasFilters =
    Boolean(
      search ||
      brand !== "all" ||
      maxPrice
    );


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="rounded-2xl border border-base-300 bg-base-100 p-12">

        <div className="flex flex-col items-center">

          <span className="loading loading-spinner loading-lg text-primary" />

          <p className="mt-4 text-sm font-medium text-base-content/60">
            Loading components...
          </p>

        </div>

      </div>
    );
  }


  // ==========================================================
  // ERROR
  // ==========================================================

  if (error) {
    return (
      <div className="rounded-2xl border border-error/20 bg-error/5 p-6">

        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-error/10 text-error">
            <FaTimes />
          </div>

          <div>

            <h3 className="font-bold">
              Could not load products
            </h3>

            <p className="mt-1 text-sm text-base-content/60">
              {error}
            </p>

          </div>

        </div>

      </div>
    );
  }


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">


      {/* ======================================================
          COMPONENT NAVIGATION
      ====================================================== */}

      <div className="border-b border-base-300 bg-base-100">

        <div className="overflow-x-auto">

          <div className="flex min-w-max px-2">

            {COMPONENTS.map(
              (component) => {

                const Icon =
                  component.icon;

                const selected =
                  Boolean(
                    selectedComponents?.[
                      component.id
                    ]
                  );

                const active =
                  activeComponent ===
                  component.id;


                return (
                  <button
                    key={
                      component.id
                    }
                    type="button"
                    onClick={() => {

                      setActiveComponent(
                        component.id
                      );

                      setSearch("");
                      setBrand("all");
                      setMaxPrice("");

                    }}
                    className={`
                      relative
                      flex
                      min-w-[105px]
                      flex-col
                      items-center
                      gap-1.5
                      px-4
                      py-3
                      text-xs
                      transition-colors
                      ${
                        active
                          ? "text-primary"
                          : "text-base-content/50 hover:text-base-content"
                      }
                    `}
                  >

                    <div
                      className={`
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        transition
                        ${
                          active
                            ? "bg-primary/10"
                            : "bg-base-200"
                        }
                      `}
                    >
                      <Icon />
                    </div>


                    <span className="font-semibold">
                      {
                        component.shortName
                      }
                    </span>


                    {selected && (
                      <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-success text-[9px] text-success-content">
                        <FaCheck />
                      </span>
                    )}


                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" />
                    )}

                  </button>
                );
              }
            )}

          </div>

        </div>

      </div>


      {/* ======================================================
          FILTER BAR
      ====================================================== */}

      <div className="border-b border-base-300 bg-base-100 p-4">

        <div className="flex flex-col gap-3 lg:flex-row">

          {/* SEARCH */}

          <label className="input input-bordered flex h-11 flex-1 items-center gap-2">

            <FaSearch className="text-base-content/40" />

            <input
              type="text"
              placeholder={`Search ${activeComponent}...`}
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              className="min-w-0"
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                className="text-base-content/40 hover:text-base-content"
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}

          </label>


          {/* BRAND */}

          <select
            className="select select-bordered h-11 w-full lg:w-44"
            value={brand}
            onChange={(event) =>
              setBrand(
                event.target.value
              )
            }
          >

            <option value="all">
              All Brands
            </option>

            {brands.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}

          </select>


          {/* PRICE */}

          <label className="input input-bordered flex h-11 w-full items-center gap-2 lg:w-48">

            <span className="text-sm font-semibold text-base-content/40">
              ৳
            </span>

            <input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(event) =>
                setMaxPrice(
                  event.target.value
                )
              }
              min="0"
            />

          </label>

        </div>


        {/* FILTER INFO */}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">

          <div className="flex items-center gap-2">

            <span className="text-xs font-semibold text-base-content/50">
              {filteredProducts.length}{" "}
              components
            </span>

            {refreshing && (
              <span className="text-[10px] text-base-content/40">
                Updating...
              </span>
            )}

          </div>


          {hasFilters && (
            <button
              type="button"
              onClick={
                clearFilters
              }
              className="text-xs font-semibold text-primary hover:underline"
            >
              Clear filters
            </button>
          )}

        </div>

      </div>


      {/* ======================================================
          AI RECOMMENDATIONS
      ====================================================== */}

      {aiProducts.length >
        0 && (
        <div className="border-b border-primary/20 bg-primary/[0.035] p-4">

          <div className="mb-3 flex items-center justify-between">

            <div>

              <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FaStar />
                </div>

                <h3 className="font-bold">
                  AI Recommendations
                </h3>

              </div>

              <p className="mt-1 text-xs text-base-content/50">
                Suggestions based on your current build.
              </p>

            </div>

            <span className="badge badge-primary badge-sm">
              {aiProducts.length}
            </span>

          </div>


          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">

            {aiProducts.map(
              (product) => (
                <ProductCard
                  key={`ai-${product.id}`}
                  product={
                    product
                  }
                  componentType={
                    activeComponent
                  }
                  selectedComponents={
                    selectedComponents
                  }
                  onSelect={
                    onSelect
                  }
                  isAIRecommended={
                    true
                  }
                />
              )
            )}

          </div>

        </div>
      )}


      {/* ======================================================
          PRODUCTS
      ====================================================== */}

      <div className="p-4">


        {/* HEADER */}

        <div className="mb-4 flex items-center justify-between gap-3">

          <div>

            <h3 className="text-base font-bold">
              Available{" "}
              {
                COMPONENTS.find(
                  (item) =>
                    item.id ===
                    activeComponent
                )?.name
              }
            </h3>

            <p className="text-xs text-base-content/40">
              Choose a compatible component for your build.
            </p>

          </div>


          {filteredProducts.length >
            0 && (
            <span className="hidden text-xs font-medium text-base-content/40 sm:block">
              {startIndex + 1}–
              {Math.min(
                startIndex +
                  visibleProducts.length,
                filteredProducts.length
              )}{" "}
              of{" "}
              {
                filteredProducts.length
              }
            </span>
          )}

        </div>


        {/* EMPTY */}

        {filteredProducts.length ===
          0 && (
          <div className="rounded-xl border border-dashed border-base-300 px-6 py-14 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-base-200 text-xl text-base-content/30">
              <FaSearch />
            </div>

            <h3 className="mt-4 font-bold">
              No compatible products found
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-sm text-base-content/50">
              Try another search, brand, or price range.
            </p>

            {hasFilters && (
              <button
                type="button"
                className="btn btn-sm btn-outline mt-4"
                onClick={
                  clearFilters
                }
              >
                Clear Filters
              </button>
            )}

          </div>
        )}


        {/* PRODUCT GRID */}

        {filteredProducts.length >
          0 && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">

            {visibleProducts.map(
              (product) => (
                <ProductCard
                  key={
                    product.id
                  }
                  product={
                    product
                  }
                  componentType={
                    activeComponent
                  }
                  selectedComponents={
                    selectedComponents
                  }
                  onSelect={
                    onSelect
                  }
                  isAIRecommended={
                    false
                  }
                />
              )
            )}

          </div>
        )}


        {/* ====================================================
            PAGINATION
        ==================================================== */}

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-1.5">

            <button
              type="button"
              className="btn btn-sm btn-ghost"
              disabled={
                safeCurrentPage ===
                1
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.max(
                      1,
                      page - 1
                    )
                )
              }
              aria-label="Previous page"
            >
              <FaChevronLeft />
            </button>


            {Array.from(
              {
                length: Math.min(
                  totalPages,
                  5
                ),
              },
              (_, index) => {

                let pageNumber;

                if (
                  totalPages <=
                  5
                ) {
                  pageNumber =
                    index + 1;
                } else if (
                  safeCurrentPage <=
                  3
                ) {
                  pageNumber =
                    index + 1;
                } else if (
                  safeCurrentPage >=
                  totalPages - 2
                ) {
                  pageNumber =
                    totalPages -
                    4 +
                    index;
                } else {
                  pageNumber =
                    safeCurrentPage -
                    2 +
                    index;
                }


                return (
                  <button
                    key={
                      pageNumber
                    }
                    type="button"
                    className={`
                      btn
                      btn-sm
                      min-w-9
                      ${
                        safeCurrentPage ===
                        pageNumber
                          ? "btn-primary"
                          : "btn-ghost"
                      }
                    `}
                    onClick={() =>
                      setCurrentPage(
                        pageNumber
                      )
                    }
                  >
                    {
                      pageNumber
                    }
                  </button>
                );
              }
            )}


            <button
              type="button"
              className="btn btn-sm btn-ghost"
              disabled={
                safeCurrentPage ===
                totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.min(
                      totalPages,
                      page + 1
                    )
                )
              }
              aria-label="Next page"
            >
              <FaChevronRight />
            </button>

          </div>
        )}

      </div>

    </div>
  );
};


export default ComponentSelector;
