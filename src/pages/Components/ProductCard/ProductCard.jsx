import React, { useState } from "react";

import {
  FaMicrochip,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaExternalLinkAlt,
} from "react-icons/fa";

const ProductCard = ({ product }) => {
  const [imageError, setImageError] =
    useState(false);

  /* =====================================================
     PARSE IMAGES
  ===================================================== */

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

  /* =====================================================
     PRICE
  ===================================================== */

  const price = product.numericPrice;

  /* =====================================================
     OLD PRICE
  ===================================================== */

  const oldPrice =
    product.old_price !== null &&
    product.old_price !== undefined
      ? Number(product.old_price)
      : null;

  /* =====================================================
     DISCOUNT
  ===================================================== */

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

  return (
    <div className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E5E1D0] bg-white shadow-[0_5px_25px_rgba(40,54,24,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(40,54,24,0.12)]">

      {/* IMAGE */}
      <div className="relative flex h-48 shrink-0 items-center justify-center overflow-hidden bg-[#F7F5EA] p-4 sm:h-52 sm:p-5">

        {hasDiscount && (
          <div className="absolute left-3 top-3 z-10 rounded-full bg-[#BC6C25] px-2.5 py-1 text-[10px] font-bold text-white sm:px-3 sm:text-xs">
            -{discount}%
          </div>
        )}

        {product.category && (
          <div className="absolute right-3 top-3 z-10 max-w-[55%] truncate rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#606C38] shadow-sm sm:px-3 sm:text-xs">
            {product.category}
          </div>
        )}

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

      {/* INFORMATION */}
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

        {/* PRICE */}
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

          {/* BUTTONS */}
          <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-2">

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

export default ProductCard;