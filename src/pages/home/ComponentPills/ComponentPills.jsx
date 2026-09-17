import React from "react";
import {
  FaMicrochip,
  FaMemory,
  FaHdd,
  FaBolt,
  FaDesktop,
  FaKeyboard,
  FaMouse,
  FaFan,
} from "react-icons/fa";
import { BsMotherboard } from "react-icons/bs";
import { MdStorage, MdDeveloperBoard } from "react-icons/md";
import { FiArrowRight, FiShoppingCart } from "react-icons/fi";
import useProducts from "../../../hooks/useProducts";
import { Link } from "react-router";

const ComponentPills = () => {
  const { products, loading, error } = useProducts();

  const theme = {
    primary: "#E5092F",
    black: "#0A0A0A",
    white: "#FFFFFF",
    surface: "#F5F5F5",
    border: "#E5E5E5",
    muted: "#666666",
  };

  const rowOne = [
    { name: "Processor", icon: FaMicrochip },
    { name: "Graphics Card", icon: FaDesktop },
    { name: "Motherboard", icon: BsMotherboard },
    { name: "RAM", icon: FaMemory },
    { name: "SSD", icon: MdStorage },
    { name: "HDD", icon: FaHdd },
  ];

  const rowTwo = [
    { name: "Power Supply", icon: FaBolt },
    { name: "CPU Cooler", icon: FaFan },
    { name: "Casing", icon: MdDeveloperBoard },
    { name: "Monitor", icon: FaDesktop },
    { name: "Keyboard", icon: FaKeyboard },
    { name: "Mouse", icon: FaMouse },
  ];

  // =====================================================
  // SAFELY EXTRACT PRODUCT IMAGE
  // =====================================================
  const getProductImage = (product) => {
    if (!product?.images) return "";

    let rawImages = product.images;

    if (typeof rawImages === "string") {
      const trimmed = rawImages.trim();
      if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
        try {
          rawImages = JSON.parse(trimmed);
        } catch (err) {
          return "";
        }
      } else {
        return trimmed;
      }
    }

    if (Array.isArray(rawImages) && rawImages.length > 0) {
      return rawImages[0] || "";
    }

    return "";
  };

  const formatPrice = (price) => {
    const numericPrice = Number(price);
    if (!Number.isFinite(numericPrice)) {
      return "Price unavailable";
    }
    return `৳${numericPrice.toLocaleString("en-BD")}`;
  };

  const getCategoryProducts = (category) => {
    if (!Array.isArray(products)) return [];
    return products.filter(
      (product) =>
        product?.category?.trim().toLowerCase() ===
        category.trim().toLowerCase()
    );
  };

  const getFeaturedProducts = () => {
    if (!Array.isArray(products) || products.length === 0) return [];

    const categories = [
      "Processor",
      "Graphics Card",
      "Motherboard",
      "RAM",
      "SSD",
      "HDD",
      "Power Supply",
      "CPU Cooler",
      "Casing",
      "Monitor",
      "Keyboard",
      "Mouse",
    ];

    return categories
      .map((category) => {
        const categoryProducts = getCategoryProducts(category);

        // Strict requirement: must have a non-empty image string
        const productWithImage = categoryProducts.find(
          (product) => !!getProductImage(product)
        );

        // Skip category entirely if no product has an image
        return productWithImage || null;
      })
      .filter(Boolean)
      .map((product, index) => ({
        ...product,
        badge:
          index === 0
            ? "Popular"
            : index === 1
            ? "Best Deal"
            : index === 2
            ? "Featured"
            : "Popular",
      }));
  };

  const components = getFeaturedProducts();

  const Pill = ({ item }) => {
    const Icon = item.icon;
    return (
      <div
        className="group mx-2 flex h-14 shrink-0 items-center gap-3 rounded-full border px-5 shadow-[0_4px_15px_rgba(10,10,10,0.06)] transition-all duration-300 hover:-translate-y-1 sm:mx-3 sm:h-16 sm:px-6"
        style={{
          backgroundColor: theme.white,
          borderColor: theme.border,
        }}
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:h-10 sm:w-10"
          style={{
            backgroundColor: theme.surface,
            color: theme.primary,
          }}
        >
          <Icon className="text-sm sm:text-base" />
        </div>
        <span
          className="whitespace-nowrap text-sm font-bold transition-colors duration-300 sm:text-base"
          style={{ color: theme.black }}
        >
          {item.name}
        </span>
        <span
          className="h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-125"
          style={{ backgroundColor: theme.primary }}
        />
      </div>
    );
  };

  const ComponentCard = ({ component }) => {
    const image = getProductImage(component);

    return (
      <div
        className="group overflow-hidden rounded-2xl border bg-white shadow-[0_5px_20px_rgba(10,10,10,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(229,9,47,0.12)]"
        style={{ borderColor: theme.border }}
      >
        <div
          className="relative flex h-52 items-center justify-center overflow-hidden p-6"
          style={{ backgroundColor: theme.surface }}
        >
          <span
            className="absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: theme.primary }}
          >
            {component.badge}
          </span>
          <img
            src={image}
            alt={component.name}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="p-5">
          <p
            className="mb-2 text-[11px] font-bold uppercase tracking-wider"
            style={{ color: theme.primary }}
          >
            {component.category}
          </p>
          <h3
            className="min-h-[48px] text-base font-bold leading-6 transition-colors duration-300 group-hover:text-[#E5092F]"
            style={{ color: theme.black }}
          >
            {component.name}
          </h3>
          <div className="mt-4 flex items-end gap-2">
            <span
              className="text-xl font-bold"
              style={{ color: theme.primary }}
            >
              {formatPrice(component.price)}
            </span>
            {component.old_price && (
              <span
                className="mb-0.5 text-xs line-through"
                style={{ color: theme.muted }}
              >
                {formatPrice(component.old_price)}
              </span>
            )}
          </div>
          <div
            className="mt-5 flex items-center justify-between border-t pt-4"
            style={{ borderColor: theme.border }}
          >
            <button
              className="group/details flex items-center gap-2 text-xs font-bold transition-colors duration-300"
              style={{ color: theme.black }}
              onMouseEnter={(e) => (e.currentTarget.style.color = theme.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = theme.black)}
            >
              View Details
              <FiArrowRight className="transition-transform duration-300 group-hover/details:translate-x-1" />
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: theme.primary }}
              aria-label="Add to cart"
            >
              <FiShoppingCart className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="my-10 w-full overflow-hidden bg-white py-14">
      <div className="mb-10 px-6 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8" style={{ backgroundColor: theme.primary }} />
          <span
            className="text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: theme.primary }}
          >
            PC Components
          </span>
          <span className="h-px w-8" style={{ backgroundColor: theme.primary }} />
        </div>
        <h2
          className="text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ color: theme.black }}
        >
          Everything You Need
        </h2>
        <p
          className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed sm:text-base"
          style={{ color: theme.muted }}
        >
          Explore real PC components from different categories and find the right parts for your next build.
        </p>
      </div>

      <div className="relative mb-5 w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent sm:w-40" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent sm:w-40" />
        <div className="flex w-max animate-[componentLeft_25s_linear_infinite]">
          {rowOne.map((item, index) => (
            <Pill key={`row1-first-${index}`} item={item} />
          ))}
          {rowOne.map((item, index) => (
            <Pill key={`row1-second-${index}`} item={item} />
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent sm:w-40" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent sm:w-40" />
        <div className="flex w-max animate-[componentRight_28s_linear_infinite]">
          {rowTwo.map((item, index) => (
            <Pill key={`row2-first-${index}`} item={item} />
          ))}
          {rowTwo.map((item, index) => (
            <Pill key={`row2-second-${index}`} item={item} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-6">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: theme.primary }}
              />
              <span
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: theme.primary }}
              >
                Featured
              </span>
            </div>
            <h3
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: theme.black }}
            >
              Popular Components
            </h3>
            <p className="mt-1 text-sm" style={{ color: theme.muted }}>
              Real products from our component database.
            </p>
          </div>
          <Link to="/components">
          <button
            className="group flex w-fit items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition-all duration-300"
            style={{ borderColor: theme.primary, color: theme.primary }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.primary;
              e.currentTarget.style.color = theme.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = theme.primary;
            }}
          >
            View All Components
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          </Link>
        </div>

        {loading && (
          <div className="py-16 text-center">
            <div
              className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"
              style={{
                borderColor: theme.border,
                borderTopColor: theme.primary,
              }}
            />
            <p className="text-sm" style={{ color: theme.muted }}>
              Loading real components...
            </p>
          </div>
        )}

        {!loading && error && components.length === 0 && (
          <div
            className="rounded-2xl border p-8 text-center"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.surface,
            }}
          >
            <p className="font-bold" style={{ color: theme.black }}>
              Unable to load components
            </p>
            <p className="mt-2 text-sm" style={{ color: theme.muted }}>
              Please try again later.
            </p>
          </div>
        )}

        {!loading && components.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {components.slice(0, 9).map((component, idx) => (
              <div
                key={component.id || `${component.category}-${component.name}`}
                className={idx >= 3 ? "hidden sm:block" : "block"}
              >
                <ComponentCard component={component} />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && components.length === 0 && (
          <div className="py-12 text-center">
            <p className="font-bold" style={{ color: theme.black }}>
              No featured components found.
            </p>
            <p className="mt-2 text-sm" style={{ color: theme.muted }}>
              Our component database is currently being updated.
            </p>
          </div>
        )}
      </div>

      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
          <span className="h-1.5 w-12 rounded-full" style={{ backgroundColor: theme.primary }} />
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
        </div>
      </div>

      <style>{`
        @keyframes componentLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes componentRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default ComponentPills;