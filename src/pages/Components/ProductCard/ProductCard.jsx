import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  FaMicrochip,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useCart } from "../../../hooks/useCart";

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const image = useMemo(() => {
    let images = product?.images;

    if (typeof images === "string") {
      try {
        images = JSON.parse(images);
      } catch {
        images = [];
      }
    }

    if (Array.isArray(images) && images.length > 0) {
      return images[0];
    }

    return null;
  }, [product?.images]);

  const price = Number(
    product?.numericPrice ?? product?.price ?? 0
  );

  const oldPrice =
    product?.old_price !== null &&
    product?.old_price !== undefined &&
    product?.old_price !== ""
      ? Number(product.old_price)
      : null;

  const hasDiscount =
    oldPrice !== null &&
    oldPrice > 0 &&
    oldPrice > price;

  const discount = hasDiscount
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  const getBottleneckPercentage = (category = "") => {
    const value = category.toLowerCase();

    if (
      value.includes("processor") ||
      value.includes("cpu")
    ) {
      return 2.5;
    }

    if (
      value.includes("graphics") ||
      value.includes("gpu") ||
      value.includes("video card")
    ) {
      return 2;
    }

    if (
      value.includes("motherboard") ||
      value.includes("ram") ||
      value.includes("memory") ||
      value.includes("power supply") ||
      value.includes("psu")
    ) {
      return 1;
    }

    if (
      value.includes("ssd") ||
      value.includes("hdd") ||
      value.includes("hard disk") ||
      value.includes("cooler") ||
      value.includes("cooling")
    ) {
      return 0.75;
    }

    if (
      value.includes("casing") ||
      value.includes("case") ||
      value.includes("monitor") ||
      value.includes("keyboard") ||
      value.includes("mouse")
    ) {
      return 0.5;
    }

    return 0;
  };

  const bottleneck = getBottleneckPercentage(
    product?.category || ""
  );

  const bottleneckAmount =
    price * (bottleneck / 100);

  const totalPrice = price + bottleneckAmount;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <article
      className="
        group
        flex
        h-full
        min-w-0
        w-full
        flex-col
        overflow-hidden
        rounded-[clamp(0.75rem,1vw,1.25rem)]
        border
        border-base-300
        bg-base-100
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary/30
        hover:shadow-lg
      "
    >
      <div
        className="
          relative
          flex
          w-full
          shrink-0
          items-center
          justify-center
          overflow-hidden
          bg-base-200
          h-[clamp(10rem,14vw,13rem)]
          p-[clamp(0.6rem,1vw,1.25rem)]
        "
      >
        {hasDiscount && (
          <div
            className="
              absolute
              left-[clamp(0.5rem,0.8vw,0.75rem)]
              top-[clamp(0.5rem,0.8vw,0.75rem)]
              z-10
              rounded-full
              bg-primary
              px-[clamp(0.4rem,0.6vw,0.7rem)]
              py-[clamp(0.2rem,0.35vw,0.3rem)]
              text-[clamp(0.5rem,0.65vw,0.7rem)]
              font-bold
              text-primary-content
              shadow-sm
            "
          >
            -{discount}%
          </div>
        )}

        {product?.category && (
          <div
            title={product.category}
            className="
              absolute
              right-[clamp(0.5rem,0.8vw,0.75rem)]
              top-[clamp(0.5rem,0.8vw,0.75rem)]
              z-10
              max-w-[55%]
              truncate
              rounded-full
              border
              border-base-300
              bg-base-100
              px-[clamp(0.4rem,0.6vw,0.7rem)]
              py-[clamp(0.2rem,0.35vw,0.3rem)]
              text-[clamp(0.5rem,0.65vw,0.7rem)]
              font-semibold
              text-primary
              shadow-sm
            "
          >
            {product.category}
          </div>
        )}

        {image && !imageError ? (
          <img
            src={image}
            alt={product?.name || "Product"}
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
            className="
              h-full
              w-full
              max-w-full
              object-contain
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              flex
              h-[clamp(4rem,6vw,6rem)]
              w-[clamp(4rem,6vw,6rem)]
              items-center
              justify-center
              rounded-[clamp(0.75rem,1vw,1rem)]
              bg-base-100
              text-primary
              shadow-sm
            "
          >
            <FaMicrochip
              className="text-[clamp(2rem,3vw,3rem)]"
            />
          </div>
        )}
      </div>

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          p-[clamp(0.7rem,1vw,1.15rem)]
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-[clamp(0.3rem,0.5vw,0.5rem)]
            text-[clamp(0.58rem,0.7vw,0.75rem)]
            font-semibold
            text-primary
          "
        >
          <FaStore className="shrink-0" />
          <span
            title={product?.store || "Unknown Store"}
            className="min-w-0 truncate"
          >
            {product?.store || "Unknown Store"}
          </span>
        </div>

        <h3
          title={product?.name || ""}
          className="
            mt-[clamp(0.35rem,0.6vw,0.65rem)]
            min-h-[clamp(2.35rem,3vw,3rem)]
            line-clamp-2
            break-words
            text-[clamp(0.75rem,0.9vw,1rem)]
            font-bold
            leading-[1.4]
            text-base-content
          "
        >
          {product?.name || "Unnamed Product"}
        </h3>

        {product?.brand && (
          <p
            className="
              mt-[clamp(0.35rem,0.6vw,0.6rem)]
              truncate
              text-[clamp(0.58rem,0.7vw,0.75rem)]
              text-base-content/60
            "
          >
            Brand:{" "}
            <span className="font-semibold text-base-content">
              {product.brand}
            </span>
          </p>
        )}

        {product?.rating !== null &&
          product?.rating !== undefined &&
          product?.rating !== "" && (
            <div
              className="
                mt-[clamp(0.45rem,0.7vw,0.7rem)]
                flex
                min-w-0
                items-center
                gap-[clamp(0.2rem,0.4vw,0.4rem)]
                text-[clamp(0.65rem,0.8vw,0.85rem)]
              "
            >
              <FaStar className="shrink-0 text-warning" />

              <span className="font-semibold text-base-content">
                {product.rating}
              </span>

              <span
                className="
                  truncate
                  text-[clamp(0.55rem,0.65vw,0.7rem)]
                  text-base-content/50
                "
              >
                ({product.reviews || 0})
              </span>
            </div>
          )}

        {bottleneck > 0 && (
          <div
            className="
              mt-[clamp(0.5rem,0.7vw,0.75rem)]
              flex
              items-center
              justify-between
              rounded-lg
              border
              border-primary/10
              bg-primary/5
              px-3
              py-2
            "
          >
            <span
              className="
                text-[clamp(0.58rem,0.7vw,0.75rem)]
                font-semibold
                text-base-content/60
              "
            >
              Bottleneck
            </span>

            <span
              className="
                text-[clamp(0.65rem,0.8vw,0.85rem)]
                font-black
                text-primary
              "
            >
              {bottleneck}%
            </span>
          </div>
        )}

        <div
          className="
            mt-auto
            pt-[clamp(0.75rem,1.2vw,1.25rem)]
          "
        >
          <div
            className="
              flex
              min-w-0
              flex-wrap
              items-end
              gap-x-[clamp(0.35rem,0.7vw,0.7rem)]
              gap-y-1
            "
          >
            <span
              className="
                min-w-0
                text-[clamp(1rem,1.5vw,1.4rem)]
                font-extrabold
                leading-none
                text-primary
              "
            >
              ৳ {price.toLocaleString("en-BD")}
            </span>

            {hasDiscount && (
              <span
                className="
                  mb-0.5
                  text-[clamp(0.6rem,0.75vw,0.8rem)]
                  text-base-content/50
                  line-through
                "
              >
                ৳ {oldPrice.toLocaleString("en-BD")}
              </span>
            )}
          </div>

          {bottleneck > 0 && (
            <div className="mt-2 text-[clamp(0.55rem,0.65vw,0.7rem)] text-base-content/50">
              Bottleneck adjustment:{" "}
              <span className="font-semibold text-primary">
                ৳ {bottleneckAmount.toLocaleString("en-BD", {
                  maximumFractionDigits: 0,
                })}
              </span>
              {" · "}
              Total:{" "}
              <span className="font-bold text-base-content">
                ৳ {totalPrice.toLocaleString("en-BD", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          )}

          <div
            className="
              mt-[clamp(0.6rem,0.9vw,1rem)]
              flex
              min-w-0
              w-full
              gap-[clamp(0.35rem,0.6vw,0.6rem)]
            "
          >
            <button
              type="button"
              onClick={handleViewDetails}
              className="
                flex
                min-w-0
                flex-1
                items-center
                justify-center
                gap-[clamp(0.25rem,0.4vw,0.45rem)]
                rounded-xl
                bg-primary
                px-[clamp(0.4rem,0.7vw,0.8rem)]
                py-[clamp(0.6rem,0.8vw,0.75rem)]
                text-[clamp(0.6rem,0.75vw,0.82rem)]
                font-bold
                whitespace-nowrap
                text-primary-content
                transition-all
                duration-200
                hover:bg-accent
                hover:shadow-md
                active:scale-[0.98]
              "
            >
              <span className="whitespace-nowrap">
                View Details
              </span>

              <FaExternalLinkAlt
                className="
                  shrink-0
                  text-[clamp(0.5rem,0.65vw,0.7rem)]
                "
              />
            </button>

            <button
              type="button"
              title="Add to cart"
              aria-label="Add to cart"
              onClick={handleAddToCart}
              className="
                flex
                h-[clamp(2.5rem,3.2vw,3rem)]
                w-[clamp(2.5rem,3.2vw,3rem)]
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-primary
                bg-base-100
                text-primary
                transition-all
                duration-200
                hover:bg-primary
                hover:text-primary-content
                hover:shadow-md
                active:scale-95
              "
            >
              <FaShoppingCart
                className="
                  text-[clamp(0.75rem,1vw,1rem)]
                "
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;