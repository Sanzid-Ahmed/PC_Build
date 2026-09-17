import React from "react";
import { FaStore } from "react-icons/fa";

const StoreFilter = ({
  stores,
  storeCounts,
  selectedStore,
  setSelectedStore,
  setCurrentPage,
}) => {
  return (
    <div className="mt-7 sm:mt-8">
      {/* HEADER */}

      <div className="mb-3 flex items-center gap-2">
        <FaStore className="text-sm text-primary" />

        <h3 className="text-sm font-bold uppercase tracking-wide text-base-content">
          Store
        </h3>
      </div>

      <div className="space-y-1.5">

        {/* ALL STORES */}

        <button
          onClick={() => {
            setSelectedStore("All");
            setCurrentPage(1);
          }}
          className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${
            selectedStore === "All"
              ? "bg-primary text-primary-content"
              : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
          }`}
        >
          <span className="truncate">
            All Stores
          </span>

          <span className="shrink-0 font-medium">
            {stores.reduce(
              (total, store) =>
                total + (storeCounts[store] || 0),
              0
            )}
          </span>
        </button>


        {/* STORES */}

        {stores.map((store) => (
          <button
            key={store}
            onClick={() => {
              setSelectedStore(store);
              setCurrentPage(1);
            }}
            className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${
              selectedStore === store
                ? "bg-primary text-primary-content"
                : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
            }`}
          >
            <span className="min-w-0 truncate">
              {store}
            </span>

            <span className="shrink-0 font-medium">
              {storeCounts[store] || 0}
            </span>
          </button>
        ))}

      </div>
    </div>
  );
};

export default StoreFilter;
