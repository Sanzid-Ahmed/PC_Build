import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiTruck,
  FiShield,
  FiPackage,
  FiStar,
  FiShare2,
} from "react-icons/fi";

import { useCart } from "../../../hooks/useCart";
import useProducts from "../../../hooks/useProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [liked, setLiked] = useState(false);

  // =====================================================
  // THEME
  // =====================================================

  const theme = {
    primary: "#E5092F",
    black: "#0A0A0A",
    white: "#FFFFFF",
    surface: "#F5F5F5",
    border: "#E5E5E5",
    muted: "#666666",
    lightText: "#888888",
  };

  // =====================================================
  // GET PRODUCT ID
  // =====================================================

  const getProductId = (product) => {
    return product?.id ?? product?.productId;
  };

  // =====================================================
  // FIND PRODUCT
  // =====================================================

  const product = useMemo(() => {
    if (!Array.isArray(products)) {
      return null;
    }

    return (
      products.find(
        (item) => String(getProductId(item)) === String(id)
      ) || null
    );
  }, [products, id]);

  // =====================================================
  // GET IMAGES
  // =====================================================

  const getProductImages = (product) => {
    if (!product?.images) {
      return [];
    }

    let images = product.images;

    // If images comes as a JSON string
    if (typeof images === "string") {
      const trimmed = images.trim();

      if (
        trimmed.startsWith("[") ||
        trimmed.startsWith("{")
      ) {
        try {
          images = JSON.parse(trimmed);
        } catch {
          return trimmed ? [trimmed] : [];
        }
      } else {
        return trimmed ? [trimmed] : [];
      }
    }

    if (Array.isArray(images)) {
      return images.filter(Boolean);
    }

    return [];
  };

  const images = getProductImages(product);

  // =====================================================
  // RESET SELECTED IMAGE WHEN PRODUCT CHANGES
  // =====================================================

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedImage(0);
    setQuantity(1);
  }, [id]);

  // =====================================================
  // FORMAT PRICE
  // =====================================================

  const formatPrice = (price) => {
    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice)) {
      return "Price unavailable";
    }

    return `৳${numericPrice.toLocaleString("en-BD")}`;
  };

  // =====================================================
  // PRODUCT DATA
  // =====================================================

  const productName =
    product?.name ||
    product?.productName ||
    "Product";

  const category =
    product?.category ||
    "PC Component";

  const price =
    product?.price ??
    product?.sellingPrice ??
    0;

  const oldPrice =
    product?.old_price ??
    product?.oldPrice ??
    product?.regularPrice ??
    null;

  const description =
    product?.description ||
    product?.details ||
    product?.shortDescription ||
    "High-quality PC component designed for reliable performance and long-term use.";

  const brand =
    product?.brand ||
    product?.manufacturer ||
    "Premium Brand";

  const model =
    product?.model ||
    product?.modelNumber ||
    "N/A";

  const stock =
    product?.stock ??
    product?.quantity ??
    product?.stockQuantity ??
    null;

  const rating =
    Number(product?.rating) ||
    Number(product?.averageRating) ||
    4.8;

  const reviewCount =
    product?.reviewCount ??
    product?.reviewsCount ??
    0;

  const isInStock =
    stock === null ||
    Number(stock) > 0;

  // =====================================================
  // SPECIFICATIONS
  // =====================================================

  const specifications = useMemo(() => {
    if (!product) {
      return [];
    }

    const excludedFields = [
      "id",
      "productId",
      "name",
      "productName",
      "category",
      "price",
      "sellingPrice",
      "old_price",
      "oldPrice",
      "regularPrice",
      "description",
      "details",
      "shortDescription",
      "images",
      "image",
      "rating",
      "averageRating",
      "reviewCount",
      "reviewsCount",
      "stock",
      "quantity",
      "stockQuantity",
      "brand",
      "manufacturer",
      "model",
      "modelNumber",
      "createdAt",
      "updatedAt",
    ];

    const ignoredValues = [
      null,
      undefined,
      "",
      "null",
      "undefined",
    ];

    return Object.entries(product)
      .filter(([key, value]) => {
        return (
          !excludedFields.includes(key) &&
          !ignoredValues.includes(value) &&
          typeof value !== "object"
        );
      })
      .slice(0, 12)
      .map(([key, value]) => ({
        name: key
          .replace(/([A-Z])/g, " $1")
          .replace(/[_-]/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .replace(/^./, (char) => char.toUpperCase()),

        value: String(value),
      }));
  }, [product]);

  // =====================================================
  // RELATED PRODUCTS
  // =====================================================

  const relatedProducts = useMemo(() => {
    if (!Array.isArray(products) || !product) {
      return [];
    }

    return products
      .filter((item) => {
        const sameCategory =
          item?.category?.trim().toLowerCase() ===
          product?.category?.trim().toLowerCase();

        const differentProduct =
          String(getProductId(item)) !== String(id);

        return sameCategory && differentProduct;
      })
      .slice(0, 4);
  }, [products, product, id]);

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = () => {
    if (!product || !isInStock) {
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  // =====================================================
  // BUY NOW
  // =====================================================

  const handleBuyNow = () => {
    if (!product || !isInStock) {
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    navigate("/cart");
  };

  // =====================================================
  // QUANTITY
  // =====================================================

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  const increaseQuantity = () => {
    if (
      stock !== null &&
      Number.isFinite(Number(stock)) &&
      quantity >= Number(stock)
    ) {
      return;
    }

    setQuantity((current) => current + 1);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-white">

        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="flex flex-col items-center justify-center">

            <div
              className="
                h-12
                w-12
                animate-spin
                rounded-full
                border-4
                border-t-transparent
              "
              style={{
                borderColor: theme.border,
                borderTopColor: theme.primary,
              }}
            />

            <p
              className="mt-5 text-sm font-medium"
              style={{
                color: theme.muted,
              }}
            >
              Loading product...
            </p>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // ERROR / PRODUCT NOT FOUND
  // =====================================================

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">

        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">

          <div className="max-w-md text-center">

            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
              "
              style={{
                backgroundColor: `${theme.primary}12`,
                color: theme.primary,
              }}
            >
              <FiPackage className="text-3xl" />
            </div>

            <h1
              className="
                mt-6
                text-2xl
                font-bold
              "
              style={{
                color: theme.black,
              }}
            >
              Product Not Found
            </h1>

            <p
              className="
                mt-3
                text-sm
                leading-6
              "
              style={{
                color: theme.muted,
              }}
            >
              The product you're looking for may have
              been removed or is no longer available.
            </p>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-full
                px-6
                py-3
                text-sm
                font-bold
                text-white
                transition-all
                duration-300
                hover:scale-105
              "
              style={{
                backgroundColor: theme.primary,
              }}
            >
              <FiArrowLeft />
              Go Back
            </button>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <main
      className="min-h-screen bg-white"
      style={{
        color: theme.black,
      }}
    >

      {/* =================================================
          TOP BAR
      ================================================= */}

      <div className="border-b" style={{ borderColor: theme.border }}>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              group
              flex
              items-center
              gap-2
              text-sm
              font-bold
              transition-colors
              duration-300
            "
            style={{
              color: theme.black,
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.color =
                theme.primary;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color =
                theme.black;
            }}
          >
            <FiArrowLeft
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />

            Back
          </button>

          <div
            className="
              hidden
              items-center
              gap-2
              text-xs
              font-bold
              uppercase
              tracking-widest
              sm:flex
            "
            style={{
              color: theme.muted,
            }}
          >
            Home
            <FiArrowRight className="text-[10px]" />
            {category}
            <FiArrowRight className="text-[10px]" />
            Product
          </div>

        </div>

      </div>


      {/* =================================================
          PRODUCT SECTION
      ================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-14">

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">


          {/* =================================================
              LEFT - IMAGE GALLERY
          ================================================= */}

          <div>

            {/* Main Image */}
            <div
              className="
                relative
                flex
                h-[360px]
                items-center
                justify-center
                overflow-hidden
                rounded-3xl
                border
                p-8
                sm:h-[480px]
                lg:h-[540px]
              "
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.border,
              }}
            >

              {/* Decorative Glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-64
                  w-64
                  rounded-full
                  blur-3xl
                "
                style={{
                  backgroundColor: `${theme.primary}12`,
                }}
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-20
                  -left-20
                  h-64
                  w-64
                  rounded-full
                  blur-3xl
                "
                style={{
                  backgroundColor: `${theme.primary}08`,
                }}
              />

              {/* Category Badge */}
              <div
                className="
                  absolute
                  left-5
                  top-5
                  z-10
                  rounded-full
                  px-4
                  py-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-widest
                  text-white
                "
                style={{
                  backgroundColor: theme.primary,
                }}
              >
                {category}
              </div>

              {/* Heart */}
              <button
                type="button"
                onClick={() => setLiked(!liked)}
                className="
                  absolute
                  right-5
                  top-5
                  z-10
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  bg-white
                  transition-all
                  duration-300
                  hover:scale-105
                "
                style={{
                  borderColor: theme.border,
                  color: liked
                    ? theme.primary
                    : theme.muted,
                }}
                aria-label="Add to wishlist"
              >
                <FiHeart
                  className={
                    liked ? "fill-current" : ""
                  }
                />
              </button>

              {/* Image */}
              {images.length > 0 ? (
                <img
                  src={images[selectedImage]}
                  alt={productName}
                  className="
                    relative
                    z-[1]
                    max-h-full
                    max-w-full
                    object-contain
                    transition-transform
                    duration-500
                    hover:scale-105
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
                  "
                >
                  <FiPackage
                    className="text-7xl"
                    style={{
                      color: theme.border,
                    }}
                  />
                </div>
              )}

            </div>


            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">

                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() =>
                      setSelectedImage(index)
                    }
                    className="
                      flex
                      h-20
                      w-20
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-xl
                      border-2
                      bg-white
                      p-2
                      transition-all
                      duration-300
                      sm:h-24
                      sm:w-24
                    "
                    style={{
                      borderColor:
                        selectedImage === index
                          ? theme.primary
                          : theme.border,
                    }}
                  >
                    <img
                      src={image}
                      alt={`${productName} ${index + 1}`}
                      className="
                        h-full
                        w-full
                        object-contain
                      "
                    />
                  </button>
                ))}

              </div>
            )}

          </div>


          {/* =================================================
              RIGHT - PRODUCT INFORMATION
          ================================================= */}

          <div className="flex flex-col justify-center">

            {/* Brand */}
            <div className="flex items-center gap-2">

              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: theme.primary,
                }}
              />

              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.25em]
                "
                style={{
                  color: theme.primary,
                }}
              >
                {brand}
              </span>

            </div>


            {/* Product Name */}
            <h1
              className="
                mt-4
                text-3xl
                font-black
                leading-tight
                tracking-tight
                sm:text-4xl
                lg:text-5xl
              "
              style={{
                color: theme.black,
              }}
            >
              {productName}
            </h1>


            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-4">

              <div className="flex items-center gap-1">

                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className="
                      fill-current
                      text-sm
                    "
                    style={{
                      color: theme.primary,
                      opacity:
                        star <= Math.round(rating)
                          ? 1
                          : 0.25,
                    }}
                  />
                ))}

              </div>

              <span
                className="text-sm font-bold"
                style={{
                  color: theme.black,
                }}
              >
                {rating.toFixed(1)}
              </span>

              <span
                className="text-sm"
                style={{
                  color: theme.muted,
                }}
              >
                ({reviewCount} reviews)
              </span>

            </div>


            {/* Divider */}
            <div
              className="my-7 h-px w-full"
              style={{
                backgroundColor: theme.border,
              }}
            />


            {/* Price */}
            <div className="flex flex-wrap items-end gap-3">

              <span
                className="
                  text-3xl
                  font-black
                  sm:text-4xl
                "
                style={{
                  color: theme.primary,
                }}
              >
                {formatPrice(price)}
              </span>

              {oldPrice &&
                Number(oldPrice) > Number(price) && (
                  <span
                    className="
                      mb-1
                      text-sm
                      line-through
                    "
                    style={{
                      color: theme.lightText,
                    }}
                  >
                    {formatPrice(oldPrice)}
                  </span>
                )}

            </div>


            {/* Savings */}
            {oldPrice &&
              Number(oldPrice) > Number(price) && (
                <div className="mt-2">

                  <span
                    className="
                      rounded-full
                      px-3
                      py-1
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                    "
                    style={{
                      backgroundColor: `${theme.primary}12`,
                      color: theme.primary,
                    }}
                  >
                    Save{" "}
                    {formatPrice(
                      Number(oldPrice) -
                        Number(price)
                    )}
                  </span>

                </div>
              )}


            {/* Description */}
            <p
              className="
                mt-6
                text-sm
                leading-7
                sm:text-base
              "
              style={{
                color: theme.muted,
              }}
            >
              {description}
            </p>


            {/* Stock */}
            <div className="mt-6">

              {isInStock ? (
                <div className="flex items-center gap-2">

                  <span
                    className="
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                    "
                    style={{
                      backgroundColor: `${theme.primary}12`,
                      color: theme.primary,
                    }}
                  >
                    <FiCheck className="text-xs" />
                  </span>

                  <span
                    className="text-sm font-bold"
                    style={{
                      color: theme.black,
                    }}
                  >
                    In Stock
                  </span>

                  {stock !== null && (
                    <span
                      className="text-xs"
                      style={{
                        color: theme.muted,
                      }}
                    >
                      ({stock} available)
                    </span>
                  )}

                </div>
              ) : (
                <div
                  className="text-sm font-bold"
                  style={{
                    color: theme.primary,
                  }}
                >
                  Out of Stock
                </div>
              )}

            </div>


            {/* Quantity + Cart */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              {/* Quantity */}
              <div
                className="
                  flex
                  h-14
                  items-center
                  justify-between
                  rounded-full
                  border
                  px-2
                  sm:w-36
                "
                style={{
                  borderColor: theme.border,
                }}
              >

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    transition-all
                    duration-300
                    hover:bg-gray-100
                  "
                  style={{
                    color: theme.black,
                  }}
                >
                  <FiMinus />
                </button>

                <span
                  className="text-sm font-bold"
                  style={{
                    color: theme.black,
                  }}
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    transition-all
                    duration-300
                    hover:bg-gray-100
                  "
                  style={{
                    color: theme.black,
                  }}
                >
                  <FiPlus />
                </button>

              </div>


              {/* Add To Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!isInStock}
                className="
                  flex
                  h-14
                  flex-1
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  px-6
                  text-sm
                  font-bold
                  text-white
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
                style={{
                  backgroundColor: theme.primary,
                }}
              >
                <FiShoppingCart className="text-lg" />

                Add to Cart
              </button>

            </div>


            {/* Buy Now */}
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!isInStock}
              className="
                mt-3
                flex
                h-14
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                border-2
                text-sm
                font-bold
                transition-all
                duration-300
                hover:scale-[1.01]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
              style={{
                borderColor: theme.black,
                color: theme.black,
              }}
            >
              Buy Now
              <FiArrowRight />
            </button>


            {/* Product Features */}
            <div
              className="
                mt-8
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-3
              "
            >

              {/* Delivery */}
              <div
                className="
                  rounded-2xl
                  border
                  p-4
                "
                style={{
                  borderColor: theme.border,
                }}
              >
                <FiTruck
                  className="text-xl"
                  style={{
                    color: theme.primary,
                  }}
                />

                <p
                  className="
                    mt-3
                    text-xs
                    font-bold
                  "
                  style={{
                    color: theme.black,
                  }}
                >
                  Fast Delivery
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                  "
                  style={{
                    color: theme.muted,
                  }}
                >
                  Quick & secure shipping
                </p>
              </div>


              {/* Warranty */}
              <div
                className="
                  rounded-2xl
                  border
                  p-4
                "
                style={{
                  borderColor: theme.border,
                }}
              >
                <FiShield
                  className="text-xl"
                  style={{
                    color: theme.primary,
                  }}
                />

                <p
                  className="
                    mt-3
                    text-xs
                    font-bold
                  "
                  style={{
                    color: theme.black,
                  }}
                >
                  Warranty
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                  "
                  style={{
                    color: theme.muted,
                  }}
                >
                  Product warranty included
                </p>
              </div>


              {/* Genuine */}
              <div
                className="
                  rounded-2xl
                  border
                  p-4
                "
                style={{
                  borderColor: theme.border,
                }}
              >
                <FiCheck
                  className="text-xl"
                  style={{
                    color: theme.primary,
                  }}
                />

                <p
                  className="
                    mt-3
                    text-xs
                    font-bold
                  "
                  style={{
                    color: theme.black,
                  }}
                >
                  Genuine Product
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                  "
                  style={{
                    color: theme.muted,
                  }}
                >
                  Verified components
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          SPECIFICATIONS
      ================================================= */}

      <section
        className="border-y"
        style={{
          borderColor: theme.border,
          backgroundColor: theme.surface,
        }}
      >

        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">

            {/* Left */}
            <div>

              <div className="flex items-center gap-3">

                <span
                  className="h-1 w-8 rounded-full"
                  style={{
                    backgroundColor: theme.primary,
                  }}
                />

                <span
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.25em]
                  "
                  style={{
                    color: theme.primary,
                  }}
                >
                  Specifications
                </span>

              </div>

              <h2
                className="
                  mt-4
                  text-3xl
                  font-black
                  tracking-tight
                "
                style={{
                  color: theme.black,
                }}
              >
                Product Details
              </h2>

              <p
                className="
                  mt-4
                  max-w-md
                  text-sm
                  leading-7
                "
                style={{
                  color: theme.muted,
                }}
              >
                Everything you need to know about
                this component before adding it to
                your PC build.
              </p>

              <div
                className="
                  mt-7
                  h-1
                  w-20
                  rounded-full
                "
                style={{
                  backgroundColor: theme.primary,
                }}
              />

            </div>


            {/* Right */}
            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                bg-white
              "
              style={{
                borderColor: theme.border,
              }}
            >

              {/* Basic Info */}
              <div
                className="
                  grid
                  grid-cols-1
                  divide-y
                  sm:grid-cols-2
                  sm:divide-x
                  sm:divide-y-0
                "
                style={{
                  borderColor: theme.border,
                }}
              >

                <div className="p-5">

                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                    "
                    style={{
                      color: theme.muted,
                    }}
                  >
                    Brand
                  </p>

                  <p
                    className="mt-2 text-sm font-bold"
                    style={{
                      color: theme.black,
                    }}
                  >
                    {brand}
                  </p>

                </div>

                <div className="p-5">

                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                    "
                    style={{
                      color: theme.muted,
                    }}
                  >
                    Model
                  </p>

                  <p
                    className="mt-2 text-sm font-bold"
                    style={{
                      color: theme.black,
                    }}
                  >
                    {model}
                  </p>

                </div>

              </div>


              {/* Dynamic Specifications */}
              {specifications.length > 0 && (
                <div
                  className="border-t"
                  style={{
                    borderColor: theme.border,
                  }}
                >

                  {specifications.map(
                    (specification, index) => (
                      <div
                        key={`${specification.name}-${index}`}
                        className="
                          grid
                          grid-cols-1
                          gap-2
                          border-b
                          p-5
                          last:border-b-0
                          sm:grid-cols-2
                        "
                        style={{
                          borderColor: theme.border,
                        }}
                      >

                        <span
                          className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-wider
                          "
                          style={{
                            color: theme.muted,
                          }}
                        >
                          {specification.name}
                        </span>

                        <span
                          className="
                            break-words
                            text-sm
                            font-semibold
                          "
                          style={{
                            color: theme.black,
                          }}
                        >
                          {specification.value}
                        </span>

                      </div>
                    )
                  )}

                </div>
              )}

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          RELATED PRODUCTS
      ================================================= */}

      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6">

          {/* Header */}
          <div className="mb-8 flex items-end justify-between">

            <div>

              <div className="flex items-center gap-3">

                <span
                  className="h-1 w-8 rounded-full"
                  style={{
                    backgroundColor: theme.primary,
                  }}
                />

                <span
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.25em]
                  "
                  style={{
                    color: theme.primary,
                  }}
                >
                  You May Also Like
                </span>

              </div>

              <h2
                className="
                  mt-3
                  text-2xl
                  font-black
                  sm:text-3xl
                "
                style={{
                  color: theme.black,
                }}
              >
                Related Components
              </h2>

            </div>

          </div>


          {/* Products */}
          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >

            {relatedProducts.map((item) => {

              const itemImages =
                getProductImages(item);

              const itemId =
                getProductId(item);

              return (
                <div
                  key={itemId}
                  className="
                    group
                    overflow-hidden
                    rounded-2xl
                    border
                    bg-white
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_12px_30px_rgba(229,9,47,0.10)]
                  "
                  style={{
                    borderColor: theme.border,
                  }}
                >

                  {/* Image */}
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/product/${itemId}`
                      )
                    }
                    className="
                      flex
                      h-48
                      w-full
                      items-center
                      justify-center
                      bg-[#F5F5F5]
                      p-5
                    "
                  >

                    {itemImages.length > 0 ? (
                      <img
                        src={itemImages[0]}
                        alt={
                          item.name ||
                          item.productName
                        }
                        className="
                          h-full
                          w-full
                          object-contain
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <FiPackage
                        className="text-5xl"
                        style={{
                          color: theme.border,
                        }}
                      />
                    )}

                  </button>


                  {/* Info */}
                  <div className="p-5">

                    <p
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                      "
                      style={{
                        color: theme.primary,
                      }}
                    >
                      {item.category ||
                        "Component"}
                    </p>

                    <h3
                      className="
                        mt-2
                        line-clamp-2
                        min-h-[48px]
                        text-sm
                        font-bold
                        leading-6
                      "
                      style={{
                        color: theme.black,
                      }}
                    >
                      {item.name ||
                        item.productName}
                    </h3>

                    <div className="mt-4 flex items-center justify-between">

                      <span
                        className="font-black"
                        style={{
                          color: theme.primary,
                        }}
                      >
                        {formatPrice(
                          item.price
                        )}
                      </span>

                      <button
                        type="button"
                        title="View product"
                        onClick={() =>
                          navigate(
                            `/product/${itemId}`
                          )
                        }
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          text-white
                          transition-all
                          duration-300
                          hover:scale-105
                        "
                        style={{
                          backgroundColor:
                            theme.primary,
                        }}
                      >
                        <FiArrowRight />
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </section>
      )}


      {/* =================================================
          BOTTOM TRUST BAR
      ================================================= */}

      <section
        className="border-t"
        style={{
          borderColor: theme.border,
        }}
      >

        <div
          className="
            mx-auto
            grid
            max-w-7xl
            grid-cols-1
            divide-y
            px-5
            sm:grid-cols-3
            sm:divide-x
            sm:divide-y-0
            sm:px-6
          "
        >

          <div className="flex items-center gap-4 p-6">

            <FiTruck
              className="text-2xl"
              style={{
                color: theme.primary,
              }}
            />

            <div>

              <p
                className="text-sm font-bold"
                style={{
                  color: theme.black,
                }}
              >
                Fast Delivery
              </p>

              <p
                className="mt-1 text-xs"
                style={{
                  color: theme.muted,
                }}
              >
                Get your components quickly
              </p>

            </div>

          </div>


          <div className="flex items-center gap-4 p-6">

            <FiShield
              className="text-2xl"
              style={{
                color: theme.primary,
              }}
            />

            <div>

              <p
                className="text-sm font-bold"
                style={{
                  color: theme.black,
                }}
              >
                Secure Shopping
              </p>

              <p
                className="mt-1 text-xs"
                style={{
                  color: theme.muted,
                }}
              >
                Safe and reliable experience
              </p>

            </div>

          </div>


          <div className="flex items-center gap-4 p-6">

            <FiPackage
              className="text-2xl"
              style={{
                color: theme.primary,
              }}
            />

            <div>

              <p
                className="text-sm font-bold"
                style={{
                  color: theme.black,
                }}
              >
                Quality Components
              </p>

              <p
                className="mt-1 text-xs"
                style={{
                  color: theme.muted,
                }}
              >
                Genuine PC hardware
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default ProductDetails;