import React from "react";

const BuildResult = ({ buildData, requirements, buildAgain }) => {
  if (!buildData || !buildData.products) {
    return (
      <div className="mx-auto max-w-5xl rounded-3xl border border-[#E5E1D0] bg-white p-10 text-center shadow-[0_10px_40px_rgba(40,54,24,0.06)]">
        <h2 className="text-2xl font-black text-[#283618]">
          No Build Found
        </h2>

        <p className="mt-2 text-[#6B705C]">
          We could not generate a PC configuration.
        </p>

        <button
          type="button"
          onClick={buildAgain}
          className="mt-6 rounded-xl bg-[#606C38] px-6 py-3 font-bold text-white transition hover:bg-[#4F5A2E]"
        >
          ← Build Again
        </button>
      </div>
    );
  }

  const products = buildData.products;

  // Use the total calculated by the backend.
  const totalPrice = Number(buildData.total_price || 0);

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-BD");
  };

  const parseImages = (images) => {
    if (!images) return [];

    if (Array.isArray(images)) {
      return images;
    }

    try {
      const parsed = JSON.parse(images);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  return (
    <div className="mx-auto max-w-6xl">

      {/* ==========================================
          RESULT HEADER
      ========================================== */}

      <div className="mb-8 text-center">
        <span className="text-sm font-black tracking-widest text-[#BC6C25]">
          05
        </span>

        <h1 className="mt-2 text-3xl font-black text-[#283618] sm:text-4xl">
          Your PC Recommendation
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6B705C] sm:text-base">
          This configuration was generated using your requirements
          and real products from the shop.
        </p>
      </div>

      {/* ==========================================
          TOTAL
      ========================================== */}

      <div className="mb-8 rounded-3xl border border-[#E5E1D0] bg-white p-6 shadow-[0_10px_40px_rgba(40,54,24,0.06)] sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-semibold text-[#6B705C]">
              Estimated Total
            </p>

            <h2 className="mt-1 text-3xl font-black text-[#283618] sm:text-4xl">
              ৳{formatPrice(totalPrice)}
            </h2>
          </div>

          <div className="rounded-2xl bg-[#F7F5EA] px-5 py-4">
            <p className="text-xs font-semibold text-[#6B705C]">
              Your Budget
            </p>

            <p className="mt-1 font-black text-[#283618]">
              {requirements.budget}
            </p>
          </div>

        </div>
      </div>

      {/* ==========================================
          REQUIREMENTS
      ========================================== */}

      <div className="mb-8 rounded-3xl border border-[#E5E1D0] bg-white p-6 shadow-[0_10px_40px_rgba(40,54,24,0.06)] sm:p-8">

        <h2 className="text-xl font-black text-[#283618]">
          Your Requirements
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <Requirement
            title="PC Type"
            value={requirements.type}
          />

          <Requirement
            title="Budget"
            value={requirements.budget}
          />

          <Requirement
            title="Priority"
            value={requirements.priority}
          />

          <Requirement
            title="RAM"
            value={requirements.ram}
          />

          <Requirement
            title="Storage"
            value={requirements.storage}
          />

        </div>
      </div>

      {/* ==========================================
          COMPONENTS
      ========================================== */}

      <div className="mb-8">

        <div className="mb-5">
          <h2 className="text-2xl font-black text-[#283618]">
            Recommended Components
          </h2>

          <p className="mt-1 text-sm text-[#6B705C]">
            Real products selected from the shop database.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {products.map((product, index) => {

            const imageList = parseImages(product.images);

            const image =
              imageList.length > 0
                ? imageList[0]
                : null;

            const price = Number(product.price || 0);

            const category =
              product.selected_category ||
              product.category ||
              "Component";

            return (
              <div
                key={`${product.id}-${index}`}
                className="group overflow-hidden rounded-2xl border border-[#E5E1D0] bg-white shadow-[0_8px_30px_rgba(40,54,24,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Image */}

                <div className="flex h-56 items-center justify-center bg-[#F8F7F1] p-5">

                  {image ? (
                    <img
                      src={image}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="text-5xl">
                      🖥️
                    </div>
                  )}

                </div>

                {/* Content */}

                <div className="p-5">

                  <div className="mb-3 flex items-center justify-between gap-3">

                    <span className="text-xs font-black uppercase tracking-wide text-[#BC6C25]">
                      {category}
                    </span>

                    {product.status && (
                      <span
                        className={`text-xs font-bold ${
                          String(product.status)
                            .toLowerCase()
                            .includes("out")
                            ? "text-red-500"
                            : "text-[#606C38]"
                        }`}
                      >
                        {product.status}
                      </span>
                    )}

                  </div>

                  <h3 className="min-h-[52px] text-lg font-black leading-6 text-[#283618]">
                    {product.name}
                  </h3>

                  {product.brand && (
                    <p className="mt-2 text-sm text-[#6B705C]">
                      Brand:{" "}
                      <span className="font-bold">
                        {product.brand}
                      </span>
                    </p>
                  )}

                  {/* Price */}

                  <div className="mt-5 border-t border-[#E5E1D0] pt-4">

                    <p className="text-xs font-semibold text-[#6B705C]">
                      Price
                    </p>

                    <p className="mt-1 text-2xl font-black text-[#283618]">
                      ৳{formatPrice(price)}
                    </p>

                    {product.old_price &&
                      Number(product.old_price) > price && (
                        <p className="text-sm text-[#9A978B] line-through">
                          ৳{formatPrice(product.old_price)}
                        </p>
                      )}

                  </div>

                  {/* View Product */}

                  {product.url && (
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 block rounded-xl bg-[#F7F5EA] px-4 py-3 text-center text-sm font-bold text-[#283618] transition hover:bg-[#EDEAD8]"
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

      {/* ==========================================
          FINAL SUMMARY
      ========================================== */}

      <div className="rounded-3xl border border-[#E5E1D0] bg-white p-6 shadow-[0_10px_40px_rgba(40,54,24,0.06)] sm:p-8">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-sm text-[#6B705C]">
              Estimated Total
            </p>

            <h2 className="mt-1 text-3xl font-black text-[#283618]">
              ৳{formatPrice(totalPrice)}
            </h2>

            <p className="mt-1 text-sm text-[#6B705C]">
              {products.length} components selected
            </p>

          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={buildAgain}
              className="rounded-xl border border-[#E5E1D0] px-6 py-3 font-bold text-[#6B705C] transition hover:border-[#606C38] hover:bg-[#F7F5EA] hover:text-[#283618]"
            >
              ← Build Again
            </button>

            <button
              type="button"
              onClick={() => {
                alert(
                  "Entire build added to cart!"
                );
              }}
              className="rounded-xl bg-[#BC6C25] px-6 py-3 font-bold text-white shadow-md transition hover:bg-[#A75E20]"
            >
              🛒 Add Entire Build to Cart
            </button>

          </div>

        </div>

        <div className="mt-6 flex items-center gap-2 rounded-xl bg-[#F7F5EA] px-4 py-3 text-sm font-semibold text-[#606C38]">
          <span>✓</span>
          Based on real shop inventory
        </div>

      </div>

    </div>
  );
};


// ==========================================
// REQUIREMENT CARD
// ==========================================

const Requirement = ({ title, value }) => {
  return (
    <div className="rounded-xl bg-[#F8F7F1] p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-[#8A877A]">
        {title}
      </p>

      <p className="mt-1 font-bold text-[#283618]">
        {value || "Not specified"}
      </p>
    </div>
  );
};

export default BuildResult;