import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FiArrowRight, FiX } from "react-icons/fi";
import { FaMicrochip, FaShoppingCart } from "react-icons/fa";

const GlobalPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const popupShown = sessionStorage.getItem("thriftbuild-popup-shown");

    if (popupShown) {
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("thriftbuild-popup-shown", "true");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closePopup();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={handleBackdropClick}
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/60
        px-4 py-6
        backdrop-blur-sm
      "
    >
      {/* Popup */}
      <div
        className="
          relative
          w-full
          max-w-2xl
          overflow-hidden
          rounded-2xl
          border border-base-300
          bg-base-100
          shadow-2xl
          animate-[popupIn_0.25s_ease-out]
        "
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close popup"
          className="
            absolute
            right-3 top-3
            z-30
            flex h-9 w-9
            items-center justify-center
            rounded-full
            bg-secondary
            text-secondary-content
            shadow-md
            transition-all duration-200
            hover:scale-105
            hover:bg-primary
            hover:text-primary-content
          "
        >
          <FiX className="text-base" />
        </button>

        {/* Main Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-[1.15fr_0.85fr]">

          {/* =========================
              LEFT SIDE
          ========================== */}
          <div
            className="
              relative
              overflow-hidden
              bg-secondary
              px-6 py-7
              text-secondary-content
              sm:px-7 sm:py-8
            "
          >
            {/* Decorative circles */}
            <div
              className="
                pointer-events-none
                absolute
                -right-20 -top-20
                h-48 w-48
                rounded-full
                bg-primary/20
                blur-3xl
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-24 -left-20
                h-48 w-48
                rounded-full
                bg-primary/10
                blur-3xl
              "
            />

            <div className="relative z-10">

              {/* Brand Label */}
              <div
                className="
                  mb-4
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border border-primary/30
                  bg-primary/10
                  px-2.5 py-1
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-primary
                  "
                >
                  ThriftBuild
                </span>
              </div>

              {/* Heading */}
              <h2
                className="
                  max-w-sm
                  text-2xl
                  font-extrabold
                  leading-tight
                  sm:text-3xl
                "
              >
                Build Your
                <span className="block text-primary">
                  Dream PC.
                </span>
              </h2>

              {/* Description */}
              <p
                className="
                  mt-3
                  max-w-sm
                  text-xs
                  leading-5
                  text-secondary-content/65
                  sm:text-sm
                "
              >
                Find the right components, compare prices, and
                build a PC that fits your needs and budget.
              </p>

              {/* Features */}
              <div className="mt-5 space-y-2.5">

                {/* Feature 1 */}
                <div className="flex items-center gap-2.5">
                  <div
                    className="
                      flex h-8 w-8 shrink-0
                      items-center justify-center
                      rounded-lg
                      bg-primary
                      text-primary-content
                    "
                  >
                    <FaMicrochip className="text-xs" />
                  </div>

                  <span className="text-xs font-semibold sm:text-sm">
                    Smart component selection
                  </span>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-2.5">
                  <div
                    className="
                      flex h-8 w-8 shrink-0
                      items-center justify-center
                      rounded-lg
                      bg-primary
                      text-primary-content
                    "
                  >
                    <FaShoppingCart className="text-xs" />
                  </div>

                  <span className="text-xs font-semibold sm:text-sm">
                    Compare component prices
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* =========================
              RIGHT SIDE
          ========================== */}
          <div
            className="
              flex
              items-center
              justify-center
              bg-base-200
              px-6 py-7
              sm:px-6 sm:py-8
            "
          >
            <div className="w-full max-w-xs text-center">

              {/* PC Icon */}
              <div
                className="
                  mx-auto
                  flex
                  h-14 w-14
                  items-center justify-center
                  rounded-xl
                  bg-primary
                  text-2xl
                  shadow-lg
                  sm:h-16 sm:w-16
                  sm:text-3xl
                "
              >
                🖥️
              </div>

              {/* Heading */}
              <h3
                className="
                  mt-4
                  text-xl
                  font-extrabold
                  text-base-content
                  sm:text-2xl
                "
              >
                Ready to Build?
              </h3>

              {/* Description */}
              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-base-content/60
                  sm:text-sm
                "
              >
                Tell us what you need, choose your budget,
                and let ThriftBuild help you create your PC.
              </p>

              {/* CTA */}
              <Link
                to="/build-pc"
                onClick={closePopup}
                className="
                  mt-5
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-primary
                  px-4 py-3
                  text-xs
                  font-bold
                  text-primary-content
                  shadow-md
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-accent
                  hover:shadow-lg
                  sm:text-sm
                "
              >
                Build My PC

                <FiArrowRight className="text-base" />
              </Link>

              {/* Maybe Later */}
              <button
                type="button"
                onClick={closePopup}
                className="
                  mt-2
                  w-full
                  rounded-xl
                  px-4 py-2.5
                  text-xs
                  font-semibold
                  text-base-content/50
                  transition-all duration-200
                  hover:bg-base-300
                  hover:text-base-content
                  sm:text-sm
                "
              >
                Maybe Later
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* Popup Animation */}
      <style>
        {`
          @keyframes popupIn {
            from {
              opacity: 0;
              transform: scale(0.94) translateY(8px);
            }

            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default GlobalPopup;