import React from "react";

const BuildResult = ({
  requirements,
  buildData,
  startAgain,
}) => {
  const products = buildData?.products || [];

  const parseImages = (images) => {
    try {
      if (Array.isArray(images)) {
        return images;
      }

      if (typeof images === "string") {
        const parsed = JSON.parse(images);

        if (Array.isArray(parsed)) {
          return parsed;
        }
      }

      return [];
    } catch (error) {
      console.error("Image parsing error:", error);
      return [];
    }
  };

  const formatPrice = (price) => {
    return `৳${Number(price || 0).toLocaleString()}`;
  };

  const getStatusClass = (status) => {
    const value = String(status || "").toLowerCase();

    if (value.includes("out")) {
      return "bg-red-100 text-red-700";
    }

    if (
      value.includes("up coming") ||
      value.includes("upcoming") ||
      value.includes("coming")
    ) {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-green-100 text-green-700";
  };

  const handleAddEntireBuild = () => {
    /*
      Cart integration will be connected here next.

      For now, we keep the complete AI-generated build
      available in buildData so it can be connected to
      your existing cart system.
    */

    console.log("Build to add to cart:", buildData);

    alert("Build selected! Cart integration will be connected next.");
  };

  if (!buildData || products.length === 0) {
    return (
      <section className="mt-10">
        <div className="rounded-3xl border border-red-200 bg-white p-8 text-center shadow-lg">
          <h2 className="text-2xl font-black text-[#283618]">
            No build available
          </h2>

          <p className="mt-3 text-[#6B705C]">
            We couldn't find a generated PC build.
          </p>

          <button
            type="button"
            onClick={startAgain}
            className="mt-6 rounded-xl bg-[#606C38] px-6 py-3 font-bold text-white transition hover:bg-[#4F5A2F]"
          >
            Build Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10 pb-10">
      {/* ================================
          RESULT HEADER
      ================================= */}
      <div className="rounded-3xl border border-[#E5E1D0] bg-white p-6 shadow-lg sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center rounded-full bg-[#606C38]/10 px-4 py-2 text-sm font-bold text-[#606C38]">
              Build Generated
            </div>

            <h1 className="mt-4 text-3xl font-black text-[#283618] sm:text-4xl">
              Your PC Recommendation
            </h1>

            <p className="mt-3 max-w-2xl text-[#6B705C]">
              This configuration was generated using your requirements
              and real products from the shop.
            </p>
          </div>

          <div className="rounded-2xl bg-[#F3F1E7] p-5 lg:min-w-[220px]">
            <p className="text-sm font-semibold text-[#6B705C]">
              Estimated Total
            </p>

            <p className="mt-1 text-3xl font-black text-[#283618]">
              {formatPrice(buildData.total_price)}
            </p>
          </div>
        </div>
      </div>

      {/* ================================
          REQUIREMENTS
      ================================= */}
      <div className="mt-6 rounded-3xl border border-[#E5E1D0] bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-black text-[#283618]">
          Your Requirements
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-2xl bg-[#F8F7F0] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-[#6B705C]">
              PC Type
            </p>

            <p className="mt-2 font-black text-[#283618]">
              {requirements?.type || "—"}
            </p>
          </div>

          <div className="rounded-2xl bg-[#F8F7F0] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-[#6B705C]">
              Budget
            </p>

            <p className="mt-2 font-black text-[#283618]">
              {requirements?.budget || "—"}
            </p>
          </div>

          <div className="rounded-2xl bg-[#F8F7F0] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-[#6B705C]">
              Priority
            </p>

            <p className="mt-2 font-black text-[#283618]">
              {requirements?.priority || "—"}
            </p>
          </div>

          <div className="rounded-2xl bg-[#F8F7F0] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-[#6B705C]">
              RAM
            </p>

            <p className="mt-2 font-black text-[#283618]">
              {requirements?.ram || "—"}
            </p>
          </div>

          <div className="rounded-2xl bg-[#F8F7F0] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-[#6B705C]">
              Storage
            </p>

            <p className="mt-2 font-black text-[#283618]">
              {requirements?.storage || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* ================================
          COMPONENTS
      ================================= */}
      <div className="mt-6">
        <div className="mb-5">
          <h2 className="text-2xl font-black text-[#283618]">
            Recommended Components
          </h2>

          <p className="mt-2 text-[#6B705C]">
            Real products selected from the shop database.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const images = parseImages(product.images);
            const image = images[0];

            return (
              <div
                key={product.id}
                className="group overflow-hidden rounded-3xl border border-[#E5E1D0] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Product Image */}
                <div className="flex h-64 items-center justify-center bg-[#F8F7F0] p-5">
                  {image ? (
                    <img
                      src={image}
                      alt={product.name}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-[#6B705C]">
                      No image available
                    </div>
                  )}
                </div>

                {/* Product Information */}
                <div className="p-5">
                  {/* Category */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#606C38]/10 px-3 py-1 text-xs font-black text-[#606C38]">
                      {product.category}
                    </span>

                    {product.status && (
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                          product.status
                        )}`}
                      >
                        {product.status}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="mt-4 line-clamp-3 min-h-[72px] text-lg font-black leading-6 text-[#283618]">
                    {product.name}
                  </h3>

                  {/* Brand */}
                  {product.brand && (
                    <p className="mt-3 text-sm text-[#6B705C]">
                      Brand:{" "}
                      <span className="font-bold text-[#283618]">
                        {product.brand}
                      </span>
                    </p>
                  )}

                  {/* Price */}
                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-[#6B705C]">
                        Price
                      </p>

                      <p className="mt-1 text-2xl font-black text-[#283618]">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    {product.old_price &&
                      Number(product.old_price) >
                        Number(product.price) && (
                        <p className="text-sm text-gray-400 line-through">
                          {formatPrice(product.old_price)}
                        </p>
                      )}
                  </div>

                  {/* Product Link */}
                  {product.url && (
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 block rounded-xl border border-[#606C38] px-4 py-3 text-center text-sm font-black text-[#606C38] transition hover:bg-[#606C38] hover:text-white"
                    >
                      View Product →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================================
          TOTAL
      ================================= */}
      <div className="mt-8 rounded-3xl bg-[#283618] p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white/70">
              Estimated Total
            </p>

            <p className="mt-1 text-4xl font-black">
              {formatPrice(buildData.total_price)}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-sm text-white/70">
              {products.length} components selected
            </p>

            <p className="mt-1 text-sm font-semibold text-white/90">
              Based on real shop inventory
            </p>
          </div>
        </div>
      </div>

      {/* ================================
          ACTIONS
      ================================= */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddEntireBuild}
          className="flex-1 rounded-2xl bg-[#606C38] px-6 py-4 text-base font-black text-white shadow-lg transition hover:bg-[#4F5A2F] hover:shadow-xl"
        >
          🛒 Add Entire Build to Cart
        </button>

        <button
          type="button"
          onClick={startAgain}
          className="rounded-2xl border-2 border-[#606C38] px-6 py-4 text-base font-black text-[#606C38] transition hover:bg-[#606C38] hover:text-white"
        >
          ← Build Again
        </button>
      </div>
    </section>
  );
};

export default BuildResult;