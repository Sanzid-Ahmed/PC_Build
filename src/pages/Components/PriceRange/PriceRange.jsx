import React from "react";

const PriceRange = ({
  minPrice,
  maxPrice,
  priceRange,
  setMinPrice,
  setMaxPrice,
  setCurrentPage,
}) => {
  return (
    <div>

      {/* ================= TITLE ================= */}

      <h3
        className="
          mb-4
          text-sm
          font-bold
          uppercase
          tracking-wide
          text-base-content
        "
      >
        Price Range
      </h3>


      {/* ================= PRICE BOXES ================= */}

      <div className="mb-5 grid grid-cols-2 gap-2.5">

        {/* MINIMUM BOX */}

        <div
          className="
            min-w-0
            rounded-xl
            border
            border-base-300
            bg-base-200
            p-2.5
            sm:p-3
          "
        >
          <p className="text-[11px] text-base-content/60 sm:text-xs">
            Minimum
          </p>

          <p
            className="
              mt-1
              truncate
              text-xs
              font-bold
              text-base-content
              sm:text-sm
            "
          >
            ৳ {minPrice.toLocaleString()}
          </p>
        </div>


        {/* MAXIMUM BOX */}

        <div
          className="
            min-w-0
            rounded-xl
            border
            border-base-300
            bg-base-200
            p-2.5
            sm:p-3
          "
        >
          <p className="text-[11px] text-base-content/60 sm:text-xs">
            Maximum
          </p>

          <p
            className="
              mt-1
              truncate
              text-xs
              font-bold
              text-base-content
              sm:text-sm
            "
          >
            ৳ {maxPrice.toLocaleString()}
          </p>
        </div>

      </div>


      {/* ================= MINIMUM ================= */}

      <div className="mb-5">

        <div
          className="
            mb-2
            flex
            items-center
            justify-between
            gap-2
            text-xs
            text-base-content/60
          "
        >
          <span>
            Minimum Price
          </span>

          <span className="shrink-0 font-medium text-base-content">
            ৳ {minPrice.toLocaleString()}
          </span>
        </div>

        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          value={minPrice}
          onChange={(e) => {
            const value = Number(e.target.value);

            setMinPrice(
              Math.min(
                value,
                maxPrice
              )
            );

            setCurrentPage(1);
          }}
          className="
            range
            range-xs
            w-full
            [--range-shdw:var(--color-primary)]
          "
        />

      </div>


      {/* ================= MAXIMUM ================= */}

      <div>

        <div
          className="
            mb-2
            flex
            items-center
            justify-between
            gap-2
            text-xs
            text-base-content/60
          "
        >
          <span>
            Maximum Price
          </span>

          <span className="shrink-0 font-medium text-base-content">
            ৳ {maxPrice.toLocaleString()}
          </span>
        </div>

        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          value={maxPrice}
          onChange={(e) => {
            const value = Number(e.target.value);

            setMaxPrice(
              Math.max(
                value,
                minPrice
              )
            );

            setCurrentPage(1);
          }}
          className="
            range
            range-xs
            w-full
            [--range-shdw:var(--color-primary)]
          "
        />

      </div>

    </div>
  );
};

export default PriceRange;