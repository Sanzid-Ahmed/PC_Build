import React from "react";
import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaShoppingCart,
  FaArrowLeft,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { Link } from "react-router";
import { useCart } from "../../hooks/useCart";


const Cart = () => {
  const {
    cartItems,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  /* =====================================================
     EMPTY CART
  ===================================================== */

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-base-100 px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-3xl border border-base-300 bg-base-100 p-8 text-center shadow-sm sm:p-12">
            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-primary/10
                text-primary
              "
            >
              <FaShoppingCart className="text-3xl" />
            </div>

            <h1 className="mt-6 text-2xl font-extrabold text-base-content sm:text-3xl">
              Your Cart is Empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-base-content/60 sm:text-base">
              You haven't added any components yet. Browse our components and
              add the products you want to your cart.
            </p>

            <Link
              to="/components"
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-primary
                px-6
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
              <FaArrowLeft />
              Browse Components
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-100 px-3 pb-16 pt-28 sm:px-5 sm:pb-20 sm:pt-32">
      <div className="mx-auto w-full xl:w-10/12">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-primary">
              ThriftBuild Cart
            </p>

            <h1 className="mt-1 text-3xl font-extrabold text-base-content sm:text-4xl">
              Your Cart
            </h1>

            <p className="mt-2 text-sm text-base-content/60 sm:text-base">
              {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              border-error/30
              bg-base-100
              px-4
              py-2.5
              text-sm
              font-bold
              text-error
              transition-all
              duration-200
              hover:bg-error
              hover:text-error-content
            "
          >
            <FaTrash />
            Clear Cart
          </button>
        </div>

        {/* =====================================================
            CART LAYOUT
        ===================================================== */}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* ===================================================
              PRODUCTS
          =================================================== */}

          <div className="space-y-4">
            {cartItems.map((item) => {
              /* -----------------------------------------------
                 IMAGE
              ------------------------------------------------ */

              let images = item.images;

              if (typeof images === "string") {
                try {
                  images = JSON.parse(images);
                } catch {
                  images = [];
                }
              }

              const image =
                Array.isArray(images) && images.length > 0
                  ? images[0]
                  : null;

              /* -----------------------------------------------
                 PRICE
              ------------------------------------------------ */

              const price =
                Number(item.numericPrice) ||
                Number(item.price) ||
                0;

              return (
                <div
                  key={item.id}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-base-300
                    bg-base-100
                    shadow-sm
                  "
                >
                  <div className="flex gap-4 p-4 sm:p-5">
                    {/* PRODUCT IMAGE */}

                    <div
                      className="
                        flex
                        h-24
                        w-24
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-xl
                        bg-base-200
                        p-2
                        sm:h-28
                        sm:w-28
                      "
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <FaShoppingCart className="text-2xl text-primary" />
                      )}
                    </div>

                    {/* PRODUCT INFORMATION */}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          {item.store && (
                            <p className="mb-1 truncate text-xs font-bold text-primary">
                              {item.store}
                            </p>
                          )}

                          <h2 className="line-clamp-2 text-sm font-bold leading-5 text-base-content sm:text-base">
                            {item.name}
                          </h2>

                          {item.brand && (
                            <p className="mt-1 truncate text-xs text-base-content/60">
                              {item.brand}
                            </p>
                          )}
                        </div>

                        {/* REMOVE */}

                        <button
                          type="button"
                          title="Remove from cart"
                          onClick={() => removeFromCart(item.id)}
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            text-base-content/40
                            transition-all
                            duration-200
                            hover:bg-error/10
                            hover:text-error
                          "
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>

                      {/* PRICE + QUANTITY */}

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-lg font-extrabold text-primary">
                            ৳ {price.toLocaleString()}
                          </p>

                          {item.quantity > 1 && (
                            <p className="text-xs text-base-content/50">
                              ৳{" "}
                              {(price * item.quantity).toLocaleString()}{" "}
                              total
                            </p>
                          )}
                        </div>

                        {/* QUANTITY */}

                        <div
                          className="
                            flex
                            items-center
                            overflow-hidden
                            rounded-xl
                            border
                            border-base-300
                            bg-base-200
                          "
                        >
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.id)}
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              text-base-content
                              transition-all
                              hover:bg-base-300
                              hover:text-primary
                            "
                          >
                            <FaMinus className="text-[10px]" />
                          </button>

                          <span
                            className="
                              flex
                              h-9
                              min-w-10
                              items-center
                              justify-center
                              border-x
                              border-base-300
                              bg-base-100
                              px-2
                              text-sm
                              font-bold
                              text-base-content
                            "
                          >
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              text-base-content
                              transition-all
                              hover:bg-base-300
                              hover:text-primary
                            "
                          >
                            <FaPlus className="text-[10px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* VIEW PRODUCT */}

                  {item.url && (
                    <div className="border-t border-base-300 px-4 py-3 sm:px-5">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          items-center
                          gap-2
                          text-xs
                          font-bold
                          text-primary
                          transition-colors
                          hover:text-accent
                        "
                      >
                        View Product
                        <FaExternalLinkAlt className="text-[9px]" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ===================================================
              ORDER SUMMARY
          =================================================== */}

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div
              className="
                rounded-2xl
                border
                border-base-300
                bg-base-100
                p-5
                shadow-sm
                sm:p-6
              "
            >
              <h2 className="text-xl font-extrabold text-base-content">
                Cart Summary
              </h2>

              <div className="my-5 h-px bg-base-300" />

              {/* ITEMS */}

              <div className="flex items-center justify-between text-sm">
                <span className="text-base-content/60">
                  Items
                </span>

                <span className="font-bold text-base-content">
                  {cartCount}
                </span>
              </div>

              {/* SUBTOTAL */}

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-base-content/60">
                  Subtotal
                </span>

                <span className="font-bold text-base-content">
                  ৳ {cartTotal.toLocaleString()}
                </span>
              </div>

              {/* SHIPPING */}

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-base-content/60">
                  Shipping
                </span>

                <span className="font-semibold text-success">
                  Calculated by store
                </span>
              </div>

              <div className="my-5 h-px bg-base-300" />

              {/* TOTAL */}

              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-base-content">
                  Total
                </span>

                <span className="text-2xl font-extrabold text-primary">
                  ৳ {cartTotal.toLocaleString()}
                </span>
              </div>

              {/* CHECKOUT */}

              <button
                type="button"
                className="
                  mt-6
                  w-full
                  rounded-xl
                  bg-primary
                  px-5
                  py-3.5
                  text-sm
                  font-bold
                  text-primary-content
                  transition-all
                  duration-200
                  hover:bg-accent
                  hover:shadow-md
                "
              >
                Proceed to Checkout
              </button>

              {/* CONTINUE SHOPPING */}

              <Link
                to="/components"
                className="
                  mt-3
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-base-300
                  bg-base-100
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-base-content
                  transition-all
                  duration-200
                  hover:border-primary
                  hover:text-primary
                "
              >
                <FaArrowLeft />
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Cart;