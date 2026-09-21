import React, { useState } from "react";

import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaShoppingCart,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaCheck,
} from "react-icons/fa";

import { Link } from "react-router";

import { useCart } from "../../hooks/useCart";

const Cart = () => {
  const {
    cartItems,
    cartItemCount,
    selectedItemCount,
    cartTotal,
    allSelected,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    toggleSelection,
    selectAll,
    deselectAll,
  } = useCart();





    const [showSuccessPopup, setShowSuccessPopup] = useState(false);


      const handleCheckout = () => {
    if (selectedItemCount === 0) {
      return;
    }

    setShowSuccessPopup(true);
  };


  // =====================================================
  // SELECT ALL / DESELECT ALL
  // =====================================================

  const handleSelectAll = () => {
    if (allSelected) {
      deselectAll();
    } else {
      selectAll();
    }
  };

  // =====================================================
  // EMPTY CART
  // =====================================================

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

  // =====================================================
  // CART
  // =====================================================

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
              {cartItemCount}{" "}
              {cartItemCount === 1 ? "item" : "items"} in your cart
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
            SELECT ALL BAR
        ===================================================== */}

        <div
          className="
            mb-5
            flex
            flex-col
            gap-3
            rounded-2xl
            border
            border-base-300
            bg-base-200/50
            px-4
            py-3
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-5
          "
        >
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAll}
              className="checkbox checkbox-primary checkbox-sm"
            />

            <span className="text-sm font-bold text-base-content">
              {allSelected ? "Deselect All" : "Select All"}
            </span>
          </label>

          <div className="text-sm text-base-content/60">
            <span className="font-bold text-primary">
              {selectedItemCount}
            </span>{" "}
            {selectedItemCount === 1 ? "item" : "items"} selected for purchase
          </div>
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

              // =================================================
              // IMAGE
              // =================================================

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

              // =================================================
              // PRICE
              // =================================================

              const price =
                Number(item.numericPrice) ||
                Number(item.price) ||
                0;

              const bottleneckPercentage =
                Number(item.bottleneck_percentage) || 0;

              const bottleneckAmount =
                Number(item.bottleneck_amount) ||
                0;

              const adjustedPrice =
                Number(item.totalPrice) ||
                price;

              const quantityTotal =
                adjustedPrice * item.quantity;

              return (
                <div
                  key={item.id}
                  className={`
                    overflow-hidden
                    rounded-2xl
                    border
                    bg-base-100
                    shadow-sm
                    transition-all
                    duration-200
                    ${
                      item.selected
                        ? "border-primary/50 ring-1 ring-primary/10"
                        : "border-base-300"
                    }
                  `}
                >

                  {/* =================================================
                      PRODUCT
                  ================================================= */}

                  <div className="flex gap-3 p-4 sm:gap-4 sm:p-5">

                    {/* =================================================
                        CHECKBOX
                    ================================================= */}

                    <div className="flex shrink-0 items-start pt-1">
                      <input
                        type="checkbox"
                        checked={item.selected === true}
                        onChange={() => toggleSelection(item.id)}
                        className="checkbox checkbox-primary checkbox-sm sm:checkbox-md"
                        aria-label={`Select ${item.name} for purchase`}
                      />
                    </div>

                    {/* =================================================
                        IMAGE
                    ================================================= */}

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

                    {/* =================================================
                        INFORMATION
                    ================================================= */}

                    <div className="min-w-0 flex-1">

                      {/* PRODUCT TITLE + REMOVE */}

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

                          {/* SELECTED STATUS */}

                          {item.selected ? (
                            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
                              <FaCheck className="text-[8px]" />
                              Selected for purchase
                            </div>
                          ) : (
                            <p className="mt-2 text-[11px] font-medium text-base-content/40">
                              Saved in cart
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

                      {/* =================================================
                          PRICE + QUANTITY
                      ================================================= */}

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

                        {/* PRICE */}

                        <div>

                          <p className="text-lg font-extrabold text-primary">
                            ৳ {price.toLocaleString()}
                          </p>

                          {bottleneckPercentage > 0 && (
                            <p className="mt-1 text-xs text-base-content/50">
                              Bottleneck ({bottleneckPercentage}%): +৳{" "}
                              {bottleneckAmount.toLocaleString("en-BD", {
                                maximumFractionDigits: 0,
                              })}
                            </p>
                          )}

                          {bottleneckPercentage > 0 && (
                            <p className="mt-1 text-sm font-bold text-base-content">
                              Adjusted: ৳{" "}
                              {adjustedPrice.toLocaleString("en-BD", {
                                maximumFractionDigits: 0,
                              })}
                            </p>
                          )}

                          {item.quantity > 1 && (
                            <p className="mt-1 text-xs text-base-content/50">
                              ৳{" "}
                              {quantityTotal.toLocaleString("en-BD", {
                                maximumFractionDigits: 0,
                              })}{" "}
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

                  {/* =====================================================
                      VIEW PRODUCT
                  ===================================================== */}

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

              {/* CART ITEMS */}

              <div className="flex items-center justify-between text-sm">
                <span className="text-base-content/60">
                  Cart Items
                </span>

                <span className="font-bold text-base-content">
                  {cartItemCount}
                </span>
              </div>

              {/* SELECTED ITEMS */}

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-base-content/60">
                  Selected Items
                </span>

                <span className="font-bold text-primary">
                  {selectedItemCount}
                </span>
              </div>

              {/* SUBTOTAL */}

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-base-content/60">
                  Selected Subtotal
                </span>

                <span className="font-bold text-base-content">
                  ৳ {cartTotal.toLocaleString()}
                </span>
              </div>

              {/* SHIPPING */}

              <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                <span className="text-base-content/60">
                  Shipping
                </span>

                <span className="text-right font-semibold text-success">
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
                onClick={handleCheckout}
                disabled={selectedItemCount === 0}
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
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  hover:cursor-pointer
                "
              >
                {selectedItemCount === 0
                  ? "Select Items to Checkout"
                  : `Proceed to Checkout (${selectedItemCount})`}
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
      {showSuccessPopup && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            px-4
            backdrop-blur-sm
          "
          onClick={() => setShowSuccessPopup(false)}
        >
          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-base-300
              bg-base-100
              p-6
              text-center
              shadow-2xl
              sm:p-8
            "
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-success/10
                text-success
              "
            >
              <FaCheck className="text-2xl" />
            </div>

            <h2
              className="
                mt-5
                text-2xl
                font-extrabold
                text-base-content
              "
            >
              Request Sent Successfully
            </h2>

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-base-content/60
              "
            >
              Your PC build request has been sent successfully.
              Our admin will review your selected components and
              respond to your request.
            </p>

            <div
              className="
                mt-5
                rounded-2xl
                bg-base-200
                px-4
                py-3
                text-sm
                font-semibold
                text-base-content/70
              "
            >
              ⏳ Waiting for admin response
            </div>

            <button
              type="button"
              onClick={() => setShowSuccessPopup(false)}
              className="
                mt-6
                w-full
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
                hover:cursor-pointer
              "
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;