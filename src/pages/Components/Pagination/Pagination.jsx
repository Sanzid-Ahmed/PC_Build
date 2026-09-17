import React from "react";

import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Pagination = ({
  currentPage,
  totalPages,
  pageNumbers,
  setCurrentPage,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <>
      {/* ================= PAGINATION ================= */}

      <div
        className="
          mt-8
          flex
          flex-wrap
          items-center
          justify-center
          gap-1.5
          sm:mt-10
          sm:gap-2
        "
      >

        {/* PREVIOUS */}

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((page) => page - 1)
          }
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            border
            border-base-300
            bg-base-100
            text-base-content/70
            transition-all
            duration-200
            hover:border-primary
            hover:bg-primary/5
            hover:text-primary
            disabled:cursor-not-allowed
            disabled:opacity-40
            disabled:hover:border-base-300
            disabled:hover:bg-base-100
            disabled:hover:text-base-content/70
            sm:h-10
            sm:w-10
          "
        >
          <FaChevronLeft className="text-[10px] sm:text-xs" />
        </button>


        {/* ================= PAGE NUMBERS ================= */}

        {pageNumbers.map(
          (page, index) =>
            page === "..." ? (
              <span
                key={`dots-${index}`}
                className="
                  flex
                  h-9
                  w-7
                  items-center
                  justify-center
                  text-sm
                  text-base-content/50
                  sm:h-10
                  sm:w-10
                "
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition-all duration-200 sm:h-10 sm:w-10 sm:text-sm ${
                  currentPage === page
                    ? "bg-primary text-primary-content shadow-md shadow-primary/20"
                    : "border border-base-300 bg-base-100 text-base-content/70 hover:border-primary hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {page}
              </button>
            )
        )}


        {/* NEXT */}

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((page) => page + 1)
          }
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            border
            border-base-300
            bg-base-100
            text-base-content/70
            transition-all
            duration-200
            hover:border-primary
            hover:bg-primary/5
            hover:text-primary
            disabled:cursor-not-allowed
            disabled:opacity-40
            disabled:hover:border-base-300
            disabled:hover:bg-base-100
            disabled:hover:text-base-content/70
            sm:h-10
            sm:w-10
          "
        >
          <FaChevronRight className="text-[10px] sm:text-xs" />
        </button>

      </div>


      {/* ================= PAGE INFO ================= */}

      <p className="mt-4 text-center text-xs text-base-content/50">
        Page {currentPage} of {totalPages}
      </p>
    </>
  );
};

export default Pagination;
