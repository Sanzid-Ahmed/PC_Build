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
      <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:mt-10 sm:gap-2">

        {/* PREVIOUS */}
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(
              (page) => page - 1
            )
          }
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E5E1D0] bg-white text-[#606C38] transition hover:bg-[#F7F5EA] disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
        >
          <FaChevronLeft className="text-[10px] sm:text-xs" />
        </button>

        {/* NUMBERS */}
        {pageNumbers.map(
          (page, index) =>
            page === "..." ? (
              <span
                key={`dots-${index}`}
                className="flex h-9 w-7 items-center justify-center text-sm text-[#6B705C] sm:h-10 sm:w-10"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() =>
                  setCurrentPage(page)
                }
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition sm:h-10 sm:w-10 sm:text-sm ${
                  currentPage === page
                    ? "bg-[#606C38] text-white shadow-md"
                    : "border border-[#E5E1D0] bg-white text-[#606C38] hover:bg-[#F7F5EA]"
                }`}
              >
                {page}
              </button>
            )
        )}

        {/* NEXT */}
        <button
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            setCurrentPage(
              (page) => page + 1
            )
          }
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E5E1D0] bg-white text-[#606C38] transition hover:bg-[#F7F5EA] disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
        >
          <FaChevronRight className="text-[10px] sm:text-xs" />
        </button>

      </div>

      {/* PAGE INFO */}
      <p className="mt-4 text-center text-xs text-[#6B705C]">
        Page {currentPage} of{" "}
        {totalPages}
      </p>
    </>
  );
};

export default Pagination;