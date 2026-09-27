import React, { useMemo, useState } from "react";

import { useCart } from "../../../hooks/useCart";

import {
  FaBolt,
  FaCheckCircle,
  FaChevronRight,
  FaDesktop,
  FaExclamationTriangle,
  FaGamepad,
  FaHdd,
  FaMicrochip,
  FaMemory,
  FaMinus,
  FaPlus,
  FaServer,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";

// ============================================================
// COMPONENT CONFIGURATION
// ============================================================

const COMPONENTS = [
  {
    id: "processor",
    name: "Processor",
    shortName: "CPU",
    icon: FaMicrochip,
    required: true,
  },
  {
    id: "motherboard",
    name: "Motherboard",
    shortName: "Motherboard",
    icon: FaServer,
    required: true,
  },
  {
    id: "ram",
    name: "Memory",
    shortName: "RAM",
    icon: FaMemory,
    required: true,
  },
  {
    id: "gpu",
    name: "Graphics Card",
    shortName: "GPU",
    icon: FaGamepad,
    required: false,
  },
  {
    id: "storage",
    name: "Storage",
    shortName: "Storage",
    icon: FaHdd,
    required: true,
  },
  {
    id: "psu",
    name: "Power Supply",
    shortName: "PSU",
    icon: FaBolt,
    required: true,
  },
  {
    id: "case",
    name: "PC Case",
    shortName: "Case",
    icon: FaDesktop,
    required: true,
  },
];

const REQUIRED_COMPONENTS = COMPONENTS.filter(
  (component) => component.required
);

// ============================================================
// BUILD PREVIEW
// ============================================================

const BuildPreview = ({
  selectedComponents,
  onRemove,
  onResetBuild,
}) => {
  const { addToCart } = useCart();

  // ==========================================================
  // STATE
  // ==========================================================

  const [showIncompleteModal, setShowIncompleteModal] =
    useState(false);

  const [addingToCart, setAddingToCart] =
    useState(false);

  const [cartMessage, setCartMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("success");

  // ==========================================================
  // SELECTED COUNT
  // ==========================================================

  const selectedCount = useMemo(() => {
    return Object.values(
      selectedComponents || {}
    ).filter(Boolean).length;
  }, [selectedComponents]);

  // ==========================================================
  // REQUIRED SELECTED COUNT
  // ==========================================================

  const requiredSelectedCount = useMemo(() => {
    return REQUIRED_COMPONENTS.filter(
      (component) =>
        Boolean(
          selectedComponents?.[component.id]
        )
    ).length;
  }, [selectedComponents]);

  // ==========================================================
  // BUILD COMPLETE
  // GPU IS OPTIONAL
  // ==========================================================

  const isComplete =
    requiredSelectedCount ===
    REQUIRED_COMPONENTS.length;

  // ==========================================================
  // MISSING REQUIRED COMPONENTS
  // ==========================================================

  const missingComponents = useMemo(() => {
    return REQUIRED_COMPONENTS.filter(
      (component) =>
        !selectedComponents?.[component.id]
    );
  }, [selectedComponents]);

  // ==========================================================
  // SELECTED PRODUCTS
  // ==========================================================

  const selectedProducts = useMemo(() => {
    return COMPONENTS.map(
      (component) =>
        selectedComponents?.[component.id]
    ).filter(Boolean);
  }, [selectedComponents]);

  // ==========================================================
  // TOTAL PRICE
  // ==========================================================

  const totalPrice = useMemo(() => {
    return selectedProducts.reduce(
      (total, product) => {
        const price = Number(product?.price);

        if (!Number.isFinite(price)) {
          return total;
        }

        return total + price;
      },
      0
    );
  }, [selectedProducts]);

  // ==========================================================
  // PROGRESS
  // Required components control completion.
  // GPU does not affect completion.
  // ==========================================================

  const progressPercentage = Math.round(
    (requiredSelectedCount /
      REQUIRED_COMPONENTS.length) *
      100
  );

  // ==========================================================
  // FORMAT PRICE
  // ==========================================================

  const formattedPrice =
    totalPrice.toLocaleString("en-BD");

  // ==========================================================
  // ADD PRODUCTS TO CART
  // ==========================================================

  const addBuildToCart = () => {
    if (selectedProducts.length === 0) {
      return;
    }

    setAddingToCart(true);
    setCartMessage("");

    try {
      selectedProducts.forEach((product) => {
        addToCart(product);
      });

      setMessageType("success");

      setCartMessage(
        `${selectedProducts.length} component${
          selectedProducts.length > 1
            ? "s"
            : ""
        } added to cart.`
      );

      setShowIncompleteModal(false);

      // ======================================================
      // RESET BUILDER AFTER ADDING TO CART
      // ======================================================

      if (typeof onResetBuild === "function") {
        onResetBuild();
      }

      window.setTimeout(() => {
        setCartMessage("");
      }, 4000);
    } catch (error) {
      console.error(
        "Add build to cart error:",
        error
      );

      setMessageType("error");

      setCartMessage(
        "Could not add the build to cart."
      );
    } finally {
      setAddingToCart(false);
    }
  };

  // ==========================================================
  // MAIN CART BUTTON
  // ==========================================================

  const handleAddToCart = () => {
    if (selectedProducts.length === 0) {
      return;
    }

    // Complete build
    if (isComplete) {
      addBuildToCart();
      return;
    }

    // Incomplete build
    setShowIncompleteModal(true);
  };

  // ==========================================================
  // CONTINUE BUILDING
  // ==========================================================

  const handleContinueBuilding = () => {
    setShowIncompleteModal(false);
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      {/* ======================================================
          BUILD PREVIEW CARD
      ====================================================== */}

      <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="border-b border-base-300 p-4 sm:p-5">

          <div className="flex min-w-0 items-start justify-between gap-3">

            <div className="flex min-w-0 items-center gap-3">

              {/* Header Icon */}

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">

                <FaDesktop className="text-lg" />

              </div>

              {/* Header Text */}

              <div className="min-w-0">

                <h2 className="truncate text-lg font-bold sm:text-xl">
                  Build Preview
                </h2>

                <p className="mt-0.5 text-xs text-base-content/55 sm:text-sm">

                  {isComplete
                    ? "Your core PC configuration is complete."
                    : `${requiredSelectedCount} of ${REQUIRED_COMPONENTS.length} required components selected.`}

                </p>

              </div>

            </div>

            {/* Status */}

            <div
              className={`
                shrink-0 rounded-full px-2.5 py-1
                text-[10px] font-bold tracking-wide
                sm:px-3 sm:text-xs
                ${
                  isComplete
                    ? "bg-success/10 text-success"
                    : "bg-base-200 text-base-content/60"
                }
              `}
            >
              {isComplete
                ? "COMPLETE"
                : `${progressPercentage}%`}
            </div>

          </div>

          {/* ==================================================
              PROGRESS
          ================================================== */}

          <div className="mt-4">

            <div className="mb-1.5 flex items-center justify-between">

              <span className="text-[11px] text-base-content/50">
                Build progress
              </span>

              <span className="text-[11px] font-semibold">
                {requiredSelectedCount}/
                {REQUIRED_COMPONENTS.length}
              </span>

            </div>

            <progress
              className={`
                progress w-full
                ${
                  isComplete
                    ? "progress-success"
                    : "progress-primary"
                }
              `}
              value={requiredSelectedCount}
              max={REQUIRED_COMPONENTS.length}
            />

          </div>

          {/* Optional GPU indicator */}

          {selectedComponents?.gpu && (
            <div className="mt-2 flex items-center gap-2 text-[11px] text-base-content/50">

              <FaCheckCircle className="text-success" />

              <span>
                Optional GPU included in this build
              </span>

            </div>
          )}

        </div>

        {/* ====================================================
            CART MESSAGE
        ==================================================== */}

        {cartMessage && (
          <div className="px-4 pt-4">

            <div
              className={`
                flex items-center gap-2 rounded-xl border px-3 py-2.5
                ${
                  messageType === "success"
                    ? "border-success/20 bg-success/5 text-success"
                    : "border-error/20 bg-error/5 text-error"
                }
              `}
            >

              {messageType === "success" ? (
                <FaCheckCircle className="shrink-0" />
              ) : (
                <FaExclamationTriangle className="shrink-0" />
              )}

              <span className="min-w-0 text-xs font-medium">
                {cartMessage}
              </span>

            </div>

          </div>
        )}

        {/* ====================================================
            COMPONENT LIST
        ==================================================== */}

        <div className="p-3 sm:p-4">

          <div className="space-y-2">

            {COMPONENTS.map((component) => {
              const product =
                selectedComponents?.[
                  component.id
                ];

              const selected =
                Boolean(product);

              const Icon = component.icon;

              return (
                <div
                  key={component.id}
                  className={`
                    min-w-0 rounded-xl border p-2.5
                    transition-colors
                    ${
                      selected
                        ? "border-primary/20 bg-primary/[0.035]"
                        : "border-base-300 bg-base-100"
                    }
                  `}
                >

                  <div className="flex min-w-0 items-center gap-2.5">

                    {/* =================================================
                        COMPONENT ICON
                    ================================================= */}

                    <div
                      className={`
                        flex h-9 w-9 shrink-0 items-center justify-center
                        rounded-lg
                        ${
                          selected
                            ? "bg-primary/10 text-primary"
                            : "bg-base-200 text-base-content/45"
                        }
                      `}
                    >

                      <Icon className="text-sm" />

                    </div>

                    {/* =================================================
                        PRODUCT INFORMATION
                    ================================================= */}

                    <div className="min-w-0 flex-1">

                      <div className="flex min-w-0 items-center gap-2">

                        <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-base-content/45 sm:text-[10px]">
                          {component.shortName}
                        </span>

                        {selected && (
                          <span className="flex shrink-0 items-center gap-1 text-[9px] font-semibold text-success sm:text-[10px]">

                            <FaCheckCircle />

                            Selected

                          </span>
                        )}

                      </div>

                      {selected ? (
                        <div className="mt-0.5 min-w-0">

                          <p className="line-clamp-1 break-words text-xs font-semibold leading-5 sm:text-sm">
                            {product.name}
                          </p>

                          <p className="mt-0.5 text-xs font-bold text-base-content/80">
                            ৳
                            {Number(
                              product.price || 0
                            ).toLocaleString(
                              "en-BD"
                            )}
                          </p>

                        </div>
                      ) : (
                        <p className="mt-0.5 truncate text-xs text-base-content/35">
                          {component.name} not selected
                        </p>
                      )}

                    </div>

                    {/* =================================================
                        REMOVE BUTTON
                    ================================================= */}

                    {selected && (
                      <button
                        type="button"
                        className="btn btn-ghost btn-xs btn-circle shrink-0 text-base-content/35 hover:bg-error/10 hover:text-error"
                        onClick={() =>
                          onRemove(
                            component.id
                          )
                        }
                        title={`Remove ${component.name}`}
                        aria-label={`Remove ${component.name}`}
                      >
                        <FaTimes className="text-[10px]" />
                      </button>
                    )}

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* ====================================================
            MISSING COMPONENTS
        ==================================================== */}

        {!isComplete &&
          selectedCount > 0 && (
            <div className="mx-3 mb-3 rounded-xl border border-warning/20 bg-warning/5 p-3 sm:mx-4 sm:mb-4">

              <div className="flex min-w-0 gap-2.5">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-warning/10 text-warning">

                  <FaExclamationTriangle className="text-sm" />

                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-xs font-bold">
                    Required components missing
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1.5">

                    {missingComponents.map(
                      (component) => {
                        const Icon =
                          component.icon;

                        return (
                          <span
                            key={
                              component.id
                            }
                            className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-warning/20 bg-base-100 px-2 py-1 text-[10px] font-medium text-base-content/65"
                          >

                            <Icon className="shrink-0 text-warning" />

                            <span className="break-words">
                              {component.name}
                            </span>

                          </span>
                        );
                      }
                    )}

                  </div>

                </div>

              </div>

            </div>
          )}

        {/* ====================================================
            TOTAL
        ==================================================== */}

        <div className="border-t border-base-300 bg-base-200/30 p-4 sm:p-5">

          <div className="flex items-end justify-between gap-3">

            <div className="min-w-0">

              <p className="text-[10px] font-medium uppercase tracking-wider text-base-content/45">
                Estimated Total
              </p>

              <p className="mt-0.5 truncate text-2xl font-black sm:text-3xl">
                ৳{formattedPrice}
              </p>

            </div>

            <div className="shrink-0 text-right">

              <p className="text-[10px] text-base-content/45">
                Selected
              </p>

              <p className="mt-0.5 text-sm font-bold">
                {selectedCount} / 7
              </p>

            </div>

          </div>

        </div>

        {/* ====================================================
            ADD TO CART
        ==================================================== */}

        <div className="border-t border-base-300 p-3 sm:p-4">

          <button
            type="button"
            className={`
              btn w-full gap-2
              ${
                isComplete
                  ? "btn-primary"
                  : "btn-outline btn-primary"
              }
            `}
            disabled={
              selectedCount === 0 ||
              addingToCart
            }
            onClick={handleAddToCart}
          >

            {addingToCart ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Adding to Cart...
              </>
            ) : isComplete ? (
              <>
                <FaShoppingCart />
                Add Complete Build to Cart
              </>
            ) : (
              <>
                <FaShoppingCart />
                Add Build to Cart
              </>
            )}

          </button>

          {!isComplete &&
            selectedCount > 0 && (
              <p className="mt-2 text-center text-[10px] leading-4 text-base-content/45">
                You can add the current components to your cart or continue building.
              </p>
            )}

        </div>

      </div>

      {/* ========================================================
          INCOMPLETE BUILD MODAL
      ======================================================== */}

      {showIncompleteModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="incomplete-build-title"
        >

          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-2xl">

            {/* ==================================================
                MODAL HEADER
            ================================================== */}

            <div className="border-b border-base-300 p-4 sm:p-5">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning/10 text-warning">

                  <FaExclamationTriangle />

                </div>

                <div className="min-w-0 flex-1">

                  <h3
                    id="incomplete-build-title"
                    className="text-base font-bold sm:text-lg"
                  >
                    Build not complete
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-base-content/55 sm:text-sm">

                    You have selected{" "}

                    <strong className="text-base-content">
                      {selectedCount}
                    </strong>{" "}

                    of 7 components.

                  </p>

                </div>

                <button
                  type="button"
                  className="btn btn-ghost btn-sm btn-circle shrink-0"
                  onClick={
                    handleContinueBuilding
                  }
                  aria-label="Close"
                >
                  <FaTimes className="text-xs" />
                </button>

              </div>

            </div>

            {/* ==================================================
                MODAL BODY
            ================================================== */}

            <div className="p-4 sm:p-5">

              <p className="text-sm leading-6 text-base-content/65">
                Your current selection can be added to the cart now, or you can continue building your PC.
              </p>

              {/* =================================================
                  BUILD STATUS
              ================================================= */}

              <div className="mt-4 rounded-xl bg-base-200 p-3.5">

                <div className="flex items-center justify-between gap-3">

                  <span className="text-xs font-semibold text-base-content/60">
                    Required components
                  </span>

                  <span className="text-xs font-bold">
                    {requiredSelectedCount}/
                    {REQUIRED_COMPONENTS.length}
                  </span>

                </div>

                <progress
                  className="progress progress-primary mt-2 w-full"
                  value={
                    requiredSelectedCount
                  }
                  max={
                    REQUIRED_COMPONENTS.length
                  }
                />

              </div>

              {/* =================================================
                  MISSING COMPONENTS
              ================================================= */}

              <div className="mt-3 rounded-xl border border-base-300 p-3.5">

                <p className="text-[10px] font-bold uppercase tracking-wider text-base-content/45">
                  Still needed
                </p>

                <div className="mt-2 space-y-1.5">

                  {missingComponents.map(
                    (component) => {
                      const Icon =
                        component.icon;

                      return (
                        <div
                          key={
                            component.id
                          }
                          className="flex min-w-0 items-center gap-2.5"
                        >

                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-base-200 text-base-content/45">

                            <Icon className="text-xs" />

                          </div>

                          <span className="min-w-0 truncate text-xs font-medium">
                            {component.name}
                          </span>

                        </div>
                      );
                    }
                  )}

                </div>

              </div>

              {/* =================================================
                  INFORMATION
              ================================================= */}

              <div className="mt-3 flex gap-2.5 rounded-xl border border-info/20 bg-info/5 p-3">

                <FaCheckCircle className="mt-0.5 shrink-0 text-info" />

                <p className="text-[11px] leading-5 text-base-content/55">
                  If you add this build to your cart, the builder will reset so you can start a new build.
                </p>

              </div>

            </div>

            {/* ==================================================
                MODAL ACTIONS
            ================================================== */}

            <div className="flex flex-col-reverse gap-2 border-t border-base-300 p-3 sm:flex-row sm:justify-end sm:p-4">

              <button
                type="button"
                className="btn btn-ghost"
                onClick={
                  handleContinueBuilding
                }
              >
                Continue Building
              </button>

              <button
                type="button"
                className="btn btn-primary gap-2"
                disabled={addingToCart}
                onClick={
                  addBuildToCart
                }
              >

                {addingToCart ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Adding...
                  </>
                ) : (
                  <>
                    <FaShoppingCart />
                    Add Incomplete Build
                  </>
                )}

              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
};

export default BuildPreview;