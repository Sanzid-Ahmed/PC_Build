import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useLocation } from "react-router";

import {
  FaBolt,
  FaCheckCircle,
  FaChevronRight,
  FaCogs,
  FaDesktop,
  FaExclamationTriangle,
  FaGamepad,
  FaHdd,
  FaMemory,
  FaMicrochip,
  FaPlus,
  FaServer,
  FaTimes,
} from "react-icons/fa";

import ComponentSelector from "./ComponentSelector/ComponentSelector";
import BuildPreview from "./BuildPreview/BuildPreview";
import AISuggestionBar from "./AISuggestionBar/AISuggestionBar";
import BuildSummary from "./BuildSummary/BuildSummary";

import {
  checkBuildCompatibility,
} from "./compatibility/compatibility";

// ============================================================
// BUILD STORAGE
// ============================================================

const BUILD_STORAGE_KEY = "custom-pc-build";

// ============================================================
// EMPTY BUILD
// ============================================================

const EMPTY_BUILD = {
  processor: null,
  motherboard: null,
  ram: null,
  gpu: null,
  storage: null,
  psu: null,
  case: null,
};

// ============================================================
// COMPONENT INFORMATION
// GPU IS OPTIONAL
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
// LOAD BUILD FROM LOCAL STORAGE
// ============================================================

const loadSavedBuild = () => {
  try {
    const savedBuild = localStorage.getItem(
      BUILD_STORAGE_KEY
    );

    if (!savedBuild) {
      return { ...EMPTY_BUILD };
    }

    const parsedBuild = JSON.parse(savedBuild);

    return {
      ...EMPTY_BUILD,
      ...(parsedBuild || {}),
    };
  } catch (error) {
    console.error(
      "Failed to load custom build:",
      error
    );

    return { ...EMPTY_BUILD };
  }
};

// ============================================================
// CUSTOM BUILD PAGE
// ============================================================

const CustomBuildPage = () => {
  const location = useLocation();

  // ==========================================================
  // SELECTED COMPONENTS
  // ==========================================================

  const [
    selectedComponents,
    setSelectedComponents,
  ] = useState(loadSavedBuild);

  // ==========================================================
  // NEW BUILD MODAL
  // ==========================================================

  const [
    showNewBuildConfirm,
    setShowNewBuildConfirm,
  ] = useState(false);

  // ==========================================================
  // AUTO SAVE BUILD
  // ==========================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        BUILD_STORAGE_KEY,
        JSON.stringify(selectedComponents)
      );
    } catch (error) {
      console.error(
        "Failed to save custom build:",
        error
      );
    }
  }, [selectedComponents]);

  // ==========================================================
  // LOAD BUILD FROM NAVIGATION STATE
  // ==========================================================

  useEffect(() => {
    const build = location.state?.build;

    if (!build) {
      return;
    }

    const components = {
      ...EMPTY_BUILD,
      ...(build.components || {}),
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedComponents(components);

    try {
      localStorage.setItem(
        BUILD_STORAGE_KEY,
        JSON.stringify(components)
      );
    } catch (error) {
      console.error(
        "Failed to save loaded build:",
        error
      );
    }

    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );
  }, [location.state]);

  // ==========================================================
  // SELECT PRODUCT
  // ==========================================================

  const selectProduct = (
    componentType,
    product
  ) => {
    if (!componentType || !product) {
      return;
    }

    setSelectedComponents((previous) => ({
      ...previous,
      [componentType]: product,
    }));
  };

  // ==========================================================
  // REMOVE COMPONENT
  // ==========================================================

  const removeComponent = (
    componentType
  ) => {
    setSelectedComponents((previous) => ({
      ...previous,
      [componentType]: null,
    }));
  };

  // ==========================================================
  // SELECTED COUNT
  // ==========================================================

  const selectedCount = useMemo(() => {
    return Object.values(
      selectedComponents
    ).filter(Boolean).length;
  }, [selectedComponents]);

  // ==========================================================
  // REQUIRED SELECTED COUNT
  // ==========================================================

  const requiredSelectedCount = useMemo(() => {
    return REQUIRED_COMPONENTS.filter(
      (component) =>
        Boolean(
          selectedComponents[
            component.id
          ]
        )
    ).length;
  }, [selectedComponents]);

  // ==========================================================
  // BUILD COMPLETE
  // GPU IS OPTIONAL
  // ==========================================================

  const isBuildComplete =
    requiredSelectedCount ===
    REQUIRED_COMPONENTS.length;

  // ==========================================================
  // MISSING REQUIRED COMPONENTS
  // ==========================================================

  const missingComponents = useMemo(() => {
    return REQUIRED_COMPONENTS.filter(
      (component) =>
        !selectedComponents[
          component.id
        ]
    );
  }, [selectedComponents]);

  // ==========================================================
  // COMPATIBILITY
  // ==========================================================

  const compatibility = useMemo(() => {
    return checkBuildCompatibility(
      selectedComponents
    );
  }, [selectedComponents]);

  // ==========================================================
  // BUILD PROGRESS
  // ==========================================================

  const progressPercentage = Math.round(
    (requiredSelectedCount /
      REQUIRED_COMPONENTS.length) *
      100
  );

  // ==========================================================
  // RESET BUILD
  // ==========================================================

  const resetBuild = () => {
    setSelectedComponents({
      ...EMPTY_BUILD,
    });

    try {
      localStorage.removeItem(
        BUILD_STORAGE_KEY
      );
    } catch (error) {
      console.error(
        "Failed to clear custom build:",
        error
      );
    }
  };

  // ==========================================================
  // START NEW BUILD
  // ==========================================================

  const handleStartNewBuild = () => {
    resetBuild();
    setShowNewBuildConfirm(false);
  };

  // ==========================================================
  // COMPATIBILITY STATUS
  // ==========================================================

  const incompatibleResults =
    compatibility.results?.filter(
      (result) =>
        result.status === "incompatible"
    ) || [];

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-base-200 mt-20">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <header className="border-b border-base-300 bg-base-100">

        <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

          {/* ==================================================
              TOP HEADER
          ================================================== */}

          <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* TITLE */}

            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FaCogs className="text-lg" />
              </div>

              <div className="min-w-0">

                <h1 className="truncate text-xl font-bold sm:text-2xl lg:text-3xl">
                  Custom PC Builder
                </h1>

                <p className="mt-0.5 text-xs text-base-content/55 sm:text-sm">
                  Configure your PC component by component.
                </p>

              </div>

            </div>

            {/* HEADER ACTIONS */}

            <div className="flex items-center gap-2">

              {/* PROGRESS */}

              <div
                className={`
                  flex min-w-0 items-center gap-2 rounded-xl
                  border px-3 py-2
                  ${
                    isBuildComplete
                      ? "border-success/25 bg-success/5"
                      : "border-base-300 bg-base-200"
                  }
                `}
              >

                {isBuildComplete ? (
                  <FaCheckCircle className="shrink-0 text-success" />
                ) : (
                  <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">

                    <svg
                      className="h-5 w-5 -rotate-90"
                      viewBox="0 0 36 36"
                    >

                      <path
                        className="text-base-300"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        d="
                          M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0-31.831
                        "
                      />

                      <path
                        className="text-primary"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray={`${progressPercentage}, 100`}
                        d="
                          M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0-31.831
                        "
                      />

                    </svg>

                  </div>
                )}

                <div className="min-w-0">

                  <p className="text-[10px] uppercase tracking-wide text-base-content/45">
                    Progress
                  </p>

                  <p className="text-xs font-bold">
                    {requiredSelectedCount}/
                    {REQUIRED_COMPONENTS.length}
                  </p>

                </div>

              </div>

              {/* NEW BUILD */}

              {selectedCount > 0 && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline gap-2"
                  onClick={() =>
                    setShowNewBuildConfirm(true)
                  }
                >
                  <FaPlus className="text-xs" />

                  <span className="hidden sm:inline">
                    New Build
                  </span>

                  <span className="sm:hidden">
                    New
                  </span>
                </button>
              )}

            </div>

          </div>

          {/* PROGRESS BAR */}

          <div className="mt-5">

            <div className="mb-2 flex items-center justify-between">

              <span className="text-[11px] font-medium text-base-content/50">
                {isBuildComplete
                  ? "Core configuration complete"
                  : "Required component progress"}
              </span>

              <span className="text-[11px] font-bold">
                {progressPercentage}%
              </span>

            </div>

            <progress
              className={`
                progress w-full
                ${
                  isBuildComplete
                    ? "progress-success"
                    : "progress-primary"
                }
              `}
              value={requiredSelectedCount}
              max={REQUIRED_COMPONENTS.length}
            />

          </div>

        </div>

      </header>

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="mx-auto w-full max-w-7xl min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">

        {/* AUTO SAVE STATUS */}

        {selectedCount > 0 && (
          <div className="mb-5">

            <div className="flex min-w-0 items-center gap-3 rounded-xl border border-info/20 bg-info/5 px-3.5 py-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-info/10 text-info">
                <FaCheckCircle className="text-sm" />
              </div>

              <div className="min-w-0">

                <p className="text-xs font-semibold sm:text-sm">
                  Build progress saved
                </p>

                <p className="mt-0.5 text-[10px] leading-4 text-base-content/50 sm:text-xs">
                  Leave this page anytime. Your current selections will remain when you return.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* AI ASSISTANT */}

        <section className="mb-5 min-w-0">

          <AISuggestionBar
            selectedComponents={
              selectedComponents
            }
            onSelectComponent={
              selectProduct
            }
          />

        </section>

        {/* BUILD STATUS */}

        {selectedCount > 0 && (
          <section className="mb-5 min-w-0">

            {/* COMPLETE + COMPATIBLE */}

            {isBuildComplete &&
              compatibility.status ===
                "compatible" && (

                <div className="flex min-w-0 items-start gap-3 rounded-xl border border-success/20 bg-success/5 p-3.5">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
                    <FaCheckCircle />
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-sm font-bold">
                      Build complete and compatible
                    </h3>

                    <p className="mt-0.5 text-xs leading-5 text-base-content/55">
                      All required components are selected and the compatibility checks passed.
                    </p>

                  </div>

                </div>
              )}

            {/* CONTINUE BUILDING */}

            {!isBuildComplete &&
              compatibility.status ===
                "compatible" && (

                <div className="flex min-w-0 items-start gap-3 rounded-xl border border-primary/15 bg-primary/5 p-3.5">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FaChevronRight />
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-sm font-bold">
                      Continue building
                    </h3>

                    <p className="mt-0.5 text-xs leading-5 text-base-content/55">

                      {missingComponents.length} required{" "}

                      {missingComponents.length === 1
                        ? "component is"
                        : "components are"}{" "}

                      still missing.

                      {selectedComponents?.gpu &&
                        " Your optional GPU is already selected."}

                    </p>

                  </div>

                </div>
              )}

            {/* PARTIALLY CHECKED */}

            {compatibility.status ===
              "partially_checked" && (

              <div className="flex min-w-0 items-start gap-3 rounded-xl border border-warning/20 bg-warning/5 p-3.5">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/10 text-warning">
                  <FaExclamationTriangle />
                </div>

                <div className="min-w-0">

                  <h3 className="text-sm font-bold">
                    Compatibility partially checked
                  </h3>

                  <p className="mt-0.5 text-xs leading-5 text-base-content/55">
                    Some compatibility information is unavailable for the selected products.
                  </p>

                </div>

              </div>
            )}

            {/* INCOMPATIBLE */}

            {compatibility.status ===
              "incompatible" && (

              <div className="min-w-0 rounded-xl border border-error/20 bg-error/5 p-3.5">

                <div className="flex min-w-0 items-start gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-error/10 text-error">
                    <FaTimes />
                  </div>

                  <div className="min-w-0 flex-1">

                    <h3 className="text-sm font-bold">
                      Compatibility issue detected
                    </h3>

                    <div className="mt-2 space-y-1.5">

                      {incompatibleResults.map(
                        (
                          result,
                          index
                        ) => (

                          <div
                            key={index}
                            className="rounded-lg border border-error/10 bg-base-100/60 px-3 py-2"
                          >

                            <p className="break-words text-xs leading-5">

                              <span className="font-semibold">
                                {result.rule}:
                              </span>{" "}

                              {result.reason}

                            </p>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                </div>

              </div>
            )}

          </section>
        )}

        {/* BUILDER AREA */}

        <section className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-3">

          {/* COMPONENT SELECTOR */}

          <div className="min-w-0 lg:col-span-2">

            <ComponentSelector
              selectedComponents={
                selectedComponents
              }
              onSelect={
                selectProduct
              }
            />

          </div>

          {/* BUILD PREVIEW */}

          <div className="min-w-0 lg:sticky lg:top-5 lg:h-fit">

            <BuildPreview
              selectedComponents={
                selectedComponents
              }
              onRemove={
                removeComponent
              }
              onResetBuild={
                resetBuild
              }
            />

          </div>

        </section>

        {/* BUILD SUMMARY */}

        <section className="mt-5 min-w-0">

          <BuildSummary
            selectedComponents={
              selectedComponents
            }
          />

        </section>

      </main>

      {/* ======================================================
          NEW BUILD MODAL
      ====================================================== */}

      {showNewBuildConfirm && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-build-title"
        >

          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-2xl">

            {/* MODAL HEADER */}

            <div className="border-b border-base-300 p-4 sm:p-5">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning/10 text-warning">
                  <FaExclamationTriangle />
                </div>

                <div className="min-w-0 flex-1">

                  <h3
                    id="new-build-title"
                    className="text-base font-bold sm:text-lg"
                  >
                    Start a new build?
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-base-content/55 sm:text-sm">

                    Your current configuration contains{" "}

                    <strong className="text-base-content">
                      {selectedCount}
                    </strong>{" "}

                    selected{" "}

                    {selectedCount === 1
                      ? "component"
                      : "components"}.

                  </p>

                </div>

                <button
                  type="button"
                  className="btn btn-ghost btn-sm btn-circle shrink-0"
                  onClick={() =>
                    setShowNewBuildConfirm(false)
                  }
                  aria-label="Close"
                >
                  <FaTimes className="text-xs" />
                </button>

              </div>

            </div>

            {/* MODAL BODY */}

            <div className="p-4 sm:p-5">

              <p className="text-sm leading-6 text-base-content/65">
                Starting a new build will remove the current selections from the builder.
              </p>

              {/* CURRENT PROGRESS */}

              <div className="mt-4 rounded-xl bg-base-200 p-3.5">

                <div className="flex items-center justify-between">

                  <span className="text-xs text-base-content/50">
                    Current progress
                  </span>

                  <span className="text-xs font-bold">
                    {requiredSelectedCount}/
                    {REQUIRED_COMPONENTS.length}
                  </span>

                </div>

                <progress
                  className="progress progress-primary mt-2 w-full"
                  value={requiredSelectedCount}
                  max={REQUIRED_COMPONENTS.length}
                />

              </div>

              {/* WARNING */}

              <div className="mt-3 flex gap-2.5 rounded-xl border border-warning/20 bg-warning/5 p-3">

                <FaExclamationTriangle className="mt-0.5 shrink-0 text-warning" />

                <p className="text-[11px] leading-5 text-base-content/55">
                  This action clears the current build from the builder. It will not add the components to your cart.
                </p>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="flex flex-col-reverse gap-2 border-t border-base-300 p-3 sm:flex-row sm:justify-end sm:p-4">

              <button
                type="button"
                className="btn btn-ghost"
                onClick={() =>
                  setShowNewBuildConfirm(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-error"
                onClick={
                  handleStartNewBuild
                }
              >
                Start New Build
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default CustomBuildPage;