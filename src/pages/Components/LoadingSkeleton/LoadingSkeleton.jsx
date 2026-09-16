import React from "react";

const LoadingSkeleton = () => {
  return (
    <section className="min-h-screen bg-[#FFFEF7] px-4 pb-20 pt-24 sm:px-5 sm:pt-28">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 sm:mb-10">
          <div className="h-8 w-56 max-w-full animate-pulse rounded-lg bg-[#E5E1D0]" />

          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded-lg bg-[#E5E1D0]" />
        </div>

        {/* CONTENT */}
        <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)]">

          {/* SIDEBAR */}
          <div className="h-[500px] animate-pulse rounded-2xl bg-[#F7F5EA] lg:h-[650px]" />

          {/* PRODUCTS */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="h-[390px] animate-pulse rounded-2xl bg-[#F7F5EA]"
              />
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingSkeleton;