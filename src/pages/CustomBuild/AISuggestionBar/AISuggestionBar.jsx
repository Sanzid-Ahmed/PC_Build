import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router";

import {
  FaArrowRight,
  FaCheckCircle,
  FaMicrochip,
  FaRedo,
  FaRobot,
  FaWrench,
} from "react-icons/fa";

import useApi from "../../../hooks/useApi";

// ============================================================
// COMPONENT LABELS
// ============================================================

const COMPONENT_LABELS = {
  processor: "Processor",
  motherboard: "Motherboard",
  ram: "RAM",
  gpu: "GPU",
  storage: "Storage",
  psu: "PSU",
  case: "Case",
};

// ============================================================
// COMPONENT ORDER
// ============================================================

const COMPONENT_ORDER = [
  "processor",
  "motherboard",
  "ram",
  "gpu",
  "storage",
  "psu",
  "case",
];

// ============================================================
// SUGGESTION BUTTON ORDER
// ============================================================

const SUGGESTION_COMPONENT_ORDER = [
  "motherboard",
  "ram",
  "gpu",
  "storage",
  "psu",
  "case",
  "processor",
];

// ============================================================
// REQUIRED COMPONENTS
// ============================================================

const REQUIRED_COMPONENTS = [
  "processor",
  "motherboard",
  "ram",
  "storage",
  "psu",
  "case",
];

// ============================================================
// PRODUCT HELPERS
// ============================================================

const getProductId = (product) => {
  if (!product) {
    return null;
  }

  return (
    product.id ??
    product.product_id ??
    product._id ??
    product.productCode ??
    product.product_code ??
    null
  );
};

// ============================================================
// PRODUCT NAME
// ============================================================

const getProductName = (product) => {
  if (!product) {
    return "Unknown Product";
  }

  return (
    product.name ??
    product.product_name ??
    product.title ??
    "Unknown Product"
  );
};

// ============================================================
// PRODUCT IMAGE
// ============================================================

const getProductImage = (product) => {
  if (!product) {
    return null;
  }

  const images = product.images;

  if (Array.isArray(images)) {
    return (
      images[0] ||
      null
    );
  }

  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);

      if (Array.isArray(parsed)) {
        return parsed[0] || null;
      }
    } catch {
      if (images.trim()) {
        return images.trim();
      }
    }
  }

  return (
    product.image ||
    product.image_url ||
    product.thumbnail ||
    null
  );
};

// ============================================================
// PAYLOAD
// ============================================================

const createBuildPayload = (
  selectedComponents
) => {
  return {
    processor:
      selectedComponents?.processor ||
      null,

    motherboard:
      selectedComponents?.motherboard ||
      null,

    ram:
      selectedComponents?.ram ||
      null,

    gpu:
      selectedComponents?.gpu ||
      null,

    storage:
      selectedComponents?.storage ||
      null,

    psu:
      selectedComponents?.psu ||
      null,

    case:
      selectedComponents?.case ||
      null,
  };
};

// ============================================================
// AI SUGGESTION BAR
// ============================================================

const AISuggestionBar = ({
  selectedComponents,
  onSelectComponent,
}) => {
  const navigate = useNavigate();
  const api = useApi();

  // ==========================================================
  // STATE
  // ==========================================================

  const [
    suggestions,
    setSuggestions,
  ] = useState([]);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    activeComponent,
    setActiveComponent,
  ] = useState(null);

  // ==========================================================
  // BUILD SIGNATURE
  // ==========================================================

  const buildSignature = useMemo(() => {
    return COMPONENT_ORDER.map(
      (component) => {
        const product =
          selectedComponents?.[
            component
          ];

        return `${component}:${
          product
            ? getProductId(product)
            : "empty"
        }`;
      }
    ).join("|");
  }, [selectedComponents]);

  // ==========================================================
  // SELECTED COUNT
  // ==========================================================

  const selectedComponentCount =
    useMemo(() => {
      return COMPONENT_ORDER.filter(
        (component) =>
          Boolean(
            selectedComponents?.[
              component
            ]
          )
      ).length;
    }, [buildSignature]);

  const hasAnySelection =
    selectedComponentCount > 0;

  // ==========================================================
  // MISSING REQUIRED COMPONENTS
  // ==========================================================

  const missingRequiredComponents =
    useMemo(() => {
      return REQUIRED_COMPONENTS.filter(
        (component) =>
          !selectedComponents?.[
            component
          ]
      );
    }, [buildSignature]);

  const isRequiredBuildComplete =
    missingRequiredComponents.length === 0;

  // ==========================================================
  // GROUP SUGGESTIONS
  // ==========================================================

  const groupedSuggestions = useMemo(() => {
    const groups = {};

    for (const suggestion of suggestions) {
      const component =
        suggestion?.component;

      if (!component) {
        continue;
      }

      if (!groups[component]) {
        groups[component] = [];
      }

      groups[component].push(
        suggestion
      );
    }

    return SUGGESTION_COMPONENT_ORDER
      .filter(
        (component) =>
          groups[component]?.length
      )
      .map((component) => ({
        component,
        suggestions:
          groups[component],
      }));
  }, [suggestions]);

  // ==========================================================
  // AVAILABLE COMPONENT BUTTONS
  // ==========================================================

  const availableSuggestionComponents =
    useMemo(() => {
      return groupedSuggestions.map(
        (group) => group.component
      );
    }, [groupedSuggestions]);

  // ==========================================================
  // LOAD AI SUGGESTIONS
  // ==========================================================

  useEffect(() => {
    if (!hasAnySelection) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuggestions([]);
      setMessage("");
      setError("");
      setLoading(false);
      setActiveComponent(null);
      return;
    }

    if (isRequiredBuildComplete) {
      setSuggestions([]);
      setMessage(
        "All required components are selected. Review your build before adding it to the cart."
      );
      setError("");
      setLoading(false);
      setActiveComponent(null);
      return;
    }

    const controller =
      new AbortController();

    const loadSuggestions =
      async () => {
        try {
          setLoading(true);
          setError("");
          setSuggestions([]);

          const payload =
            createBuildPayload(
              selectedComponents
            );

          const response =
            await api.post(
              "/api/custom-build/ai-suggestions",
              payload,
              {
                timeout: 120000,
                signal:
                  controller.signal,
              }
            );

          if (
            controller.signal.aborted
          ) {
            return;
          }

          const data =
            response?.data || {};

          const newSuggestions =
            Array.isArray(
              data.suggestions
            )
              ? data.suggestions
              : [];

          setSuggestions(
            newSuggestions
          );

          setMessage(
            data.message ||
              "AI analyzed your current build and found suitable products."
          );

          // --------------------------------------------------
          // Select first available component automatically
          // --------------------------------------------------

          if (
            newSuggestions.length > 0
          ) {
            const firstComponent =
              newSuggestions.find(
                (item) =>
                  item?.component
              )?.component;

            if (firstComponent) {
              setActiveComponent(
                firstComponent
              );
            }
          } else {
            setActiveComponent(null);
          }
        } catch (err) {
          if (
            controller.signal.aborted ||
            err?.code ===
              "ERR_CANCELED" ||
            err?.name ===
              "CanceledError"
          ) {
            return;
          }

          console.error(
            "AI suggestion error:",
            err
          );

          setError(
            err?.response?.data
              ?.detail ||
              "Unable to get AI suggestions right now."
          );
        } finally {
          if (
            !controller.signal.aborted
          ) {
            setLoading(false);
          }
        }
      };

    loadSuggestions();

    return () => {
      controller.abort();
    };
  }, [
    buildSignature,
    hasAnySelection,
    isRequiredBuildComplete,
  ]);

  // ==========================================================
  // OPEN FULL AI BUILDER
  // ==========================================================

  const handleOpenAIBuilder = () => {
    navigate("/build-pc");
  };

  // ==========================================================
  // SELECT SUGGESTION
  // ==========================================================

  const handleUseSuggestion = (
    suggestion
  ) => {
    if (!suggestion) {
      return;
    }

    const component =
      suggestion.component;

    if (
      !COMPONENT_LABELS[
        component
      ]
    ) {
      return;
    }

    const product =
      suggestion.product ||
      suggestion.product_data ||
      suggestion.item;

    if (!product) {
      return;
    }

    onSelectComponent?.(
      component,
      product
    );
  };

  // ==========================================================
  // RETRY
  // ==========================================================

  const handleRetry = async () => {
    if (
      !hasAnySelection ||
      isRequiredBuildComplete
    ) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuggestions([]);
      setActiveComponent(null);

      const payload =
        createBuildPayload(
          selectedComponents
        );

      const response =
        await api.post(
          "/api/custom-build/ai-suggestions",
          payload,
          {
            timeout: 120000,
          }
        );

      const data =
        response?.data || {};

      const newSuggestions =
        Array.isArray(
          data.suggestions
        )
          ? data.suggestions
          : [];

      setSuggestions(
        newSuggestions
      );

      setMessage(
        data.message ||
          "AI analyzed your current build and found suitable products."
      );

      if (
        newSuggestions.length > 0
      ) {
        const firstComponent =
          newSuggestions.find(
            (item) =>
              item?.component
          )?.component;

        if (firstComponent) {
          setActiveComponent(
            firstComponent
          );
        }
      }
    } catch (err) {
      console.error(
        "AI retry error:",
        err
      );

      setError(
        err?.response?.data?.detail ||
          "Unable to get AI suggestions right now."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // NOTHING SELECTED
  // ==========================================================

  if (!hasAnySelection) {
    return (
      <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">

        <div className="flex min-w-0 flex-col items-center px-5 py-8 text-center sm:px-8 sm:py-10">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FaRobot className="text-2xl" />
          </div>

          <h3 className="mt-4 text-base font-bold sm:text-lg">
            AI Assistant
          </h3>

          <p className="mt-1.5 max-w-xl text-xs leading-5 text-base-content/55 sm:text-sm">
            Select at least one component and AI will recommend other parts based on your current build.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">

            <div className="flex items-center gap-1.5 rounded-full bg-base-200 px-3 py-1.5 text-xs text-base-content/55">
              <FaMicrochip />
              Any component can start AI
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-base-200 px-3 py-1.5 text-xs text-base-content/55">
              <FaCheckCircle />
              Compatibility-aware
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">

            <button
              type="button"
              onClick={
                handleOpenAIBuilder
              }
              className="btn btn-primary btn-sm gap-2"
            >
              <FaRobot />
              Open Full AI Builder
              <FaArrowRight />
            </button>

          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // SELECTED COMPONENTS
  // ==========================================================

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">

      {/* ====================================================
          AI HEADER
      ==================================================== */}

      <div className="border-b border-base-300 px-4 py-4 sm:px-5">

        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FaRobot />
            </div>

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2">

                <h3 className="text-base font-bold">
                  AI Recommendations
                </h3>

                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
                  AI Assisted
                </span>

              </div>

              <p className="mt-0.5 text-xs text-base-content/50">
                Choose a component to see AI suggestions
              </p>

            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">

            <span className="rounded-full bg-base-200 px-2.5 py-1 text-xs font-semibold text-base-content/50">
              {selectedComponentCount}/7
            </span>

            {!isRequiredBuildComplete &&
              !loading && (
                <button
                  type="button"
                  onClick={
                    handleRetry
                  }
                  className="btn btn-ghost btn-xs gap-1.5"
                  title="Refresh AI suggestions"
                >
                  <FaRedo />
                  Refresh
                </button>
              )}

          </div>
        </div>

        {/* ==================================================
            COMPONENT BUTTONS
        ================================================== */}

        {availableSuggestionComponents.length > 0 && (
          <div className="mt-4 flex min-w-0 gap-2 overflow-x-auto pb-1">

            {availableSuggestionComponents.map(
              (component) => {
                const isActive =
                  activeComponent ===
                  component;

                return (
                  <button
                    key={component}
                    type="button"
                    onClick={() =>
                      setActiveComponent(
                        component
                      )
                    }
                    className={`
                      btn btn-sm shrink-0 gap-2
                      ${
                        isActive
                          ? "btn-primary"
                          : "btn-ghost border border-base-300"
                      }
                    `}
                  >
                    {COMPONENT_LABELS[
                      component
                    ]}
                  </button>
                );
              }
            )}

          </div>
        )}
      </div>

      {/* ====================================================
          AI CONTENT
      ==================================================== */}

      <div className="p-4 sm:p-5">

        {/* ==================================================
            LOADING
        ================================================== */}

        {loading && (
          <div>

            <div className="mb-4 flex items-center gap-3 rounded-xl bg-base-200/60 p-4">

              <span className="loading loading-spinner loading-sm text-primary" />

              <div>
                <p className="text-sm font-semibold">
                  AI is analyzing your build...
                </p>

                <p className="mt-0.5 text-xs text-base-content/50">
                  Finding compatible components.
                </p>
              </div>

            </div>

            <div className="space-y-2">

              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={item}
                    className="flex h-16 items-center gap-3 rounded-xl border border-base-300 px-3"
                  >
                    <div className="skeleton h-11 w-11 shrink-0 rounded-lg" />

                    <div className="min-w-0 flex-1">
                      <div className="skeleton h-3 w-3/4" />
                    </div>

                    <div className="skeleton h-8 w-16 shrink-0 rounded-lg" />
                  </div>
                )
              )}

            </div>
          </div>
        )}

        {/* ==================================================
            ERROR
        ================================================== */}

        {!loading && error && (
          <div className="flex flex-col gap-3 rounded-xl border border-error/20 bg-error/5 p-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex min-w-0 items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-error/10 text-error">
                <FaWrench />
              </div>

              <div className="min-w-0">

                <p className="text-sm font-semibold text-error">
                  AI suggestions unavailable
                </p>

                <p className="mt-1 break-words text-xs leading-5 text-base-content/55">
                  {error}
                </p>

              </div>
            </div>

            <button
              type="button"
              onClick={
                handleRetry
              }
              className="btn btn-sm btn-outline shrink-0 gap-2"
            >
              <FaRedo />
              Try Again
            </button>

          </div>
        )}

        {/* ==================================================
            COMPLETE BUILD
        ================================================== */}

        {!loading &&
          !error &&
          isRequiredBuildComplete && (
            <div className="flex min-w-0 items-start gap-3 rounded-xl border border-success/20 bg-success/5 p-4">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
                <FaCheckCircle />
              </div>

              <div className="min-w-0">

                <p className="text-sm font-semibold">
                  All required components selected
                </p>

                <p className="mt-1 break-words text-xs leading-5 text-base-content/55 sm:text-sm">
                  {message ||
                    "Your required components are selected. Review compatibility, power and total price before adding your build to the cart."}
                </p>

              </div>
            </div>
          )}

        {/* ==================================================
            NO SUGGESTIONS
        ================================================== */}

        {!loading &&
          !error &&
          !isRequiredBuildComplete &&
          suggestions.length === 0 && (
            <div className="rounded-xl border border-base-300 bg-base-200/40 px-5 py-8 text-center">

              <FaWrench className="mx-auto text-xl text-base-content/30" />

              <p className="mt-3 text-sm font-semibold">
                No recommendations found
              </p>

              <p className="mx-auto mt-1 max-w-lg text-xs leading-5 text-base-content/50 sm:text-sm">
                AI could not find suitable products from the currently available inventory.
              </p>

              <button
                type="button"
                onClick={
                  handleRetry
                }
                className="btn btn-sm btn-outline mt-4 gap-2"
              >
                <FaRedo />
                Try Again
              </button>

            </div>
          )}

        {/* ==================================================
            SUGGESTIONS
        ================================================== */}

        {!loading &&
          !error &&
          !isRequiredBuildComplete &&
          suggestions.length > 0 && (

            <div>

              {/* AI MESSAGE */}

              {message && (
                <p className="mb-4 text-xs text-base-content/50">
                  {message}
                </p>
              )}

              {/* ACTIVE COMPONENT */}

              {activeComponent &&
                (() => {
                  const activeGroup =
                    groupedSuggestions.find(
                      (group) =>
                        group.component ===
                        activeComponent
                    );

                  if (
                    !activeGroup
                  ) {
                    return null;
                  }

                  return (
                    <div>

                      {/* SECTION TITLE */}

                      <div className="mb-3 flex items-center justify-between">

                        <h4 className="text-sm font-bold">
                          {
                            COMPONENT_LABELS[
                              activeGroup.component
                            ]
                          }
                        </h4>

                        <span className="text-[11px] text-base-content/40">
                          {
                            activeGroup
                              .suggestions
                              .length
                          }{" "}
                          suggestions
                        </span>

                      </div>

                      {/* PRODUCT ROWS */}

                      <div className="space-y-2">

                        {activeGroup.suggestions.map(
                          (
                            suggestion,
                            index
                          ) => {

                            const product =
                              suggestion?.product ||
                              suggestion?.product_data ||
                              suggestion?.item;

                            if (
                              !product
                            ) {
                              return null;
                            }

                            const productId =
                              getProductId(
                                product
                              );

                            const productName =
                              getProductName(
                                product
                              );

                            const productImage =
                              getProductImage(
                                product
                              );

                            return (
                              <div
                                key={`${activeGroup.component}-${productId ?? index}`}
                                className="flex min-w-0 items-center gap-3 rounded-xl border border-base-300 bg-base-100 p-2.5 transition-colors hover:border-primary/30"
                              >

                                {/* IMAGE */}

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-base-200">

                                  {productImage ? (
                                    <img
                                      src={
                                        productImage
                                      }
                                      alt={
                                        productName
                                      }
                                      className="h-full w-full object-contain"
                                      loading="lazy"
                                    />
                                  ) : (
                                    <FaMicrochip className="text-base-content/25" />
                                  )}

                                </div>

                                {/* NAME */}

                                <div className="min-w-0 flex-1">

                                  <p className="line-clamp-2 break-words text-xs font-semibold leading-5 sm:text-sm">
                                    {productName}
                                  </p>

                                </div>

                                {/* SELECT */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUseSuggestion(
                                      suggestion
                                    )
                                  }
                                  className="btn btn-primary btn-xs shrink-0 sm:btn-sm"
                                >
                                  Select
                                </button>

                              </div>
                            );
                          }
                        )}

                      </div>
                    </div>
                  );
                })()}

            </div>
          )}

      </div>
    </div>
  );
};

export default AISuggestionBar;