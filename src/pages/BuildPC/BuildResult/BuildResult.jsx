import React from "react";
import {
  FaMicrochip,
  FaMemory,
  FaHdd,
  FaBolt,
  FaDesktop,
  FaFan,
  FaCheckCircle,
  FaArrowLeft,
  FaRedo,
} from "react-icons/fa";
import { BsMotherboard } from "react-icons/bs";
import { MdStorage } from "react-icons/md";

const BuildResult = ({ requirements, buildData, buildAgain }) => {
  // =========================================================
  // Safety check
  // =========================================================

  if (!buildData) {
    return (
      <div className="mx-auto max-w-5xl rounded-3xl border border-base-300 bg-base-100 p-8 text-center shadow-lg">
        <h2 className="text-2xl font-black text-base-content">
          No build data found
        </h2>

        <p className="mt-3 text-base-content/60">
          Something went wrong while loading your generated PC.
        </p>

        <button
          type="button"
          onClick={buildAgain}
          className="mt-6 rounded-xl bg-primary px-6 py-3 font-bold text-primary-content transition hover:bg-accent"
        >
          Try Again
        </button>
      </div>
    );
  }

  // =========================================================
  // Backend response
  // =========================================================

  const products = Array.isArray(buildData.products)
    ? buildData.products
    : [];

  const totalPrice = Number(buildData.total_price || 0);
  const budget = Number(buildData.budget || 0);

  // =========================================================
  // Category icons
  // =========================================================

  const getCategoryIcon = (category = "") => {
    const value = category.toLowerCase();

    if (value.includes("processor") || value.includes("cpu")) {
      return <FaMicrochip />;
    }

    if (value.includes("motherboard")) {
      return <BsMotherboard />;
    }

    if (value.includes("ram") || value.includes("memory")) {
      return <FaMemory />;
    }

    if (
      value.includes("graphics") ||
      value.includes("gpu") ||
      value.includes("video card")
    ) {
      return <FaDesktop />;
    }

    if (value.includes("ssd")) {
      return <MdStorage />;
    }

    if (
      value.includes("hard disk") ||
      value.includes("hdd") ||
      value.includes("storage")
    ) {
      return <FaHdd />;
    }

    if (
      value.includes("power supply") ||
      value.includes("psu")
    ) {
      return <FaBolt />;
    }

    if (
      value.includes("cooler") ||
      value.includes("cooling")
    ) {
      return <FaFan />;
    }

    if (
      value.includes("casing") ||
      value.includes("case")
    ) {
      return <FaDesktop />;
    }

    return <FaDesktop />;
  };

  // =========================================================
  // Get product image safely
  // =========================================================

  const getProductImage = (product) => {
    if (!product) {
      return null;
    }

    // Direct image fields
    if (product.image) {
      return product.image;
    }

    if (product.image_url) {
      return product.image_url;
    }

    if (product.imageUrl) {
      return product.imageUrl;
    }

    // Backend may return images as an array
    if (Array.isArray(product.images)) {
      if (product.images.length > 0) {
        return product.images[0];
      }
    }

    // Backend may return images as a JSON string
    if (typeof product.images === "string") {
      try {
        const parsed = JSON.parse(product.images);

        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0];
        }

        if (typeof parsed === "string") {
          return parsed;
        }
      } catch {
        // If it is already a normal URL/string
        if (product.images.trim() !== "") {
          return product.images;
        }
      }
    }

    return null;
  };

  // =========================================================
  // Format price
  // =========================================================

  const formatPrice = (price) => {
    const value = Number(price || 0);

    return `৳${value.toLocaleString("en-BD")}`;
  };

  // =========================================================
  // Remaining budget
  // =========================================================

  const remainingBudget = budget - totalPrice;

  // =========================================================
  // Budget percentage
  // =========================================================

  const budgetPercentage =
    budget > 0
      ? Math.min((totalPrice / budget) * 100, 100)
      : 0;

  // =========================================================
  // Product card
  // =========================================================

  const ProductCard = ({ product, index }) => {
    const image = getProductImage(product);

    const category =
      product.category ||
      product.product_category ||
      "Component";

    const name =
      product.name ||
      product.product_name ||
      "Unknown Product";

    const brand = product.brand || "";

    const price = Number(product.price || 0);

    return (
      <div
        className="
          group
          rounded-2xl
          border
          border-base-300
          bg-base-100
          p-4
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-primary/40
          hover:shadow-xl
        "
      >
        {/* ================================================= */}
        {/* Image */}
        {/* ================================================= */}

        <div
          className="
            relative
            flex
            h-48
            items-center
            justify-center
            overflow-hidden
            rounded-xl
            bg-base-200
          "
        >
          {image ? (
            <img
              src={image}
              alt={name}
              className="
                h-full
                w-full
                object-contain
                p-4
                transition-transform
                duration-300
                group-hover:scale-105
              "
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling.style.display =
                  "flex";
              }}
            />
          ) : null}

          {/* Fallback */}
          <div
            className={`${
              image ? "hidden" : "flex"
            } h-full w-full items-center justify-center text-5xl text-base-content/20`}
          >
            {getCategoryIcon(category)}
          </div>

          {/* Number */}
          <div
            className="
              absolute
              left-3
              top-3
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-primary
              text-sm
              font-black
              text-primary-content
              shadow-md
            "
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* ================================================= */}
        {/* Content */}
        {/* ================================================= */}

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <span className="text-lg text-primary">
              {getCategoryIcon(category)}
            </span>

            <p className="text-xs font-black uppercase tracking-wider text-primary">
              {category}
            </p>
          </div>

          <h3
            className="
              mt-2
              line-clamp-2
              min-h-[3.5rem]
              text-base
              font-black
              leading-6
              text-base-content
            "
          >
            {name}
          </h3>

          {brand && (
            <p className="mt-1 text-sm text-base-content/50">
              {brand}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-black text-base-content">
              {formatPrice(price)}
            </span>

            <span className="flex items-center gap-1 text-xs font-bold text-success">
              <FaCheckCircle />
              Available
            </span>
          </div>
        </div>
      </div>
    );
  };

  // =========================================================
  // Render
  // =========================================================

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* ===================================================== */}
      {/* Header */}
      {/* ===================================================== */}

      <div
        className="
          rounded-3xl
          border
          border-base-300
          bg-base-100
          p-6
          shadow-lg
          shadow-base-content/5
          sm:p-8
          md:p-10
        "
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm font-black uppercase tracking-widest text-primary">
              Your Build
            </span>

            <h1
              className="
                mt-2
                text-3xl
                font-black
                tracking-tight
                text-base-content
                sm:text-4xl
              "
            >
              Your PC is ready! 🎉
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-base-content/60 sm:text-base">
              We created this configuration based on your
              requirements and the products currently available
              in our database.
            </p>
          </div>

          {/* Success */}
          <div
            className="
              flex
              shrink-0
              items-center
              gap-2
              rounded-full
              border
              border-success/20
              bg-success/5
              px-4
              py-2
              text-sm
              font-bold
              text-success
            "
          >
            <FaCheckCircle />
            Build Generated
          </div>
        </div>

        {/* =================================================== */}
        {/* Requirements */}
        {/* =================================================== */}

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <RequirementItem
            label="Type"
            value={requirements?.type}
          />

          <RequirementItem
            label="Budget"
            value={requirements?.budget}
          />

          <RequirementItem
            label="Priority"
            value={requirements?.priority}
          />

          <RequirementItem
            label="RAM"
            value={requirements?.ram}
          />

          <RequirementItem
            label="Storage"
            value={requirements?.storage}
          />
        </div>
      </div>

      {/* ===================================================== */}
      {/* Price Summary */}
      {/* ===================================================== */}

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* Total */}
        <div
          className="
            rounded-2xl
            border
            border-base-300
            bg-base-100
            p-6
            shadow-sm
          "
        >
          <p className="text-sm font-semibold text-base-content/50">
            Total Build Price
          </p>

          <p className="mt-2 text-3xl font-black text-primary">
            {formatPrice(totalPrice)}
          </p>
        </div>

        {/* Budget */}
        <div
          className="
            rounded-2xl
            border
            border-base-300
            bg-base-100
            p-6
            shadow-sm
          "
        >
          <p className="text-sm font-semibold text-base-content/50">
            Your Budget
          </p>

          <p className="mt-2 text-3xl font-black text-base-content">
            {formatPrice(budget)}
          </p>
        </div>

        {/* Remaining */}
        <div
          className="
            rounded-2xl
            border
            border-base-300
            bg-base-100
            p-6
            shadow-sm
          "
        >
          <p className="text-sm font-semibold text-base-content/50">
            Remaining Budget
          </p>

          <p
            className={`mt-2 text-3xl font-black ${
              remainingBudget >= 0
                ? "text-success"
                : "text-error"
            }`}
          >
            {formatPrice(Math.abs(remainingBudget))}
          </p>

          {remainingBudget < 0 && (
            <p className="mt-1 text-xs font-semibold text-error">
              Over budget
            </p>
          )}
        </div>
      </div>

      {/* ===================================================== */}
      {/* Budget Progress */}
      {/* ===================================================== */}

      <div
        className="
          mt-6
          rounded-2xl
          border
          border-base-300
          bg-base-100
          p-6
          shadow-sm
        "
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-base-content">
            Budget Usage
          </p>

          <p className="text-sm font-black text-primary">
            {budgetPercentage.toFixed(0)}%
          </p>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-base-300">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{
              width: `${budgetPercentage}%`,
            }}
          />
        </div>

        <p className="mt-2 text-xs text-base-content/50">
          {formatPrice(totalPrice)} of{" "}
          {formatPrice(budget)} budget used
        </p>
      </div>

      {/* ===================================================== */}
      {/* Products */}
      {/* ===================================================== */}

      <div className="mt-10">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-black uppercase tracking-widest text-primary">
              Components
            </span>

            <h2 className="mt-1 text-2xl font-black text-base-content sm:text-3xl">
              Selected Components
            </h2>
          </div>

          <p className="text-sm font-semibold text-base-content/50">
            {products.length} components selected
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard
                key={
                  product.id ??
                  product.product_id ??
                  `${product.name}-${index}`
                }
                product={product}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div
            className="
              rounded-3xl
              border
              border-warning/20
              bg-warning/5
              p-10
              text-center
            "
          >
            <h3 className="text-xl font-black text-base-content">
              No components found
            </h3>

            <p className="mt-2 text-sm text-base-content/60">
              The server generated a response, but no products
              were returned.
            </p>
          </div>
        )}
      </div>

      {/* ===================================================== */}
      {/* Backend Message */}
      {/* ===================================================== */}

      {buildData.message && (
        <div
          className="
            mt-8
            rounded-2xl
            border
            border-primary/20
            bg-primary/5
            p-5
          "
        >
          <div className="flex gap-3">
            <FaCheckCircle className="mt-0.5 shrink-0 text-primary" />

            <div>
              <p className="font-bold text-base-content">
                Build recommendation
              </p>

              <p className="mt-1 text-sm leading-6 text-base-content/60">
                {buildData.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* Bottom Actions */}
      {/* ===================================================== */}

      <div
        className="
          mt-10
          flex
          flex-col-reverse
          gap-3
          border-t
          border-base-300
          pt-6
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <button
          type="button"
          onClick={buildAgain}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            px-6
            py-3
            font-semibold
            text-base-content/60
            transition
            hover:bg-base-200
            hover:text-base-content
          "
        >
          <FaArrowLeft />
          Start Again
        </button>

        <button
          type="button"
          onClick={buildAgain}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-primary
            px-8
            py-3
            font-bold
            text-primary-content
            shadow-md
            shadow-primary/20
            transition
            hover:bg-accent
          "
        >
          <FaRedo />
          Build Another PC
        </button>
      </div>
    </div>
  );
};

// =============================================================
// Requirement Item
// =============================================================

const RequirementItem = ({ label, value }) => {
  return (
    <div className="rounded-xl bg-base-200/60 p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-base-content/40">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-bold text-base-content">
        {value || "Not specified"}
      </p>
    </div>
  );
};

export default BuildResult;