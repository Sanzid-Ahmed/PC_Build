import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FiArrowRight, FiX } from "react-icons/fi";
import { FaMicrochip, FaShoppingCart } from "react-icons/fa";

const GlobalPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check whether the popup has already been shown
    // during this browser session.
    const popupShown = sessionStorage.getItem("thriftbuild-popup-shown");

    if (popupShown) {
      return;
    }

    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("thriftbuild-popup-shown", "true");
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Close popup
  const closePopup = () => {
    setIsOpen(false);
  };

  // Close when clicking backdrop
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
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-secondary/70
        px-4
        py-6
        backdrop-blur-sm
      "
    >
      <div
        className="
          relative
          w-full
          max-w-4xl
          overflow-hidden
          rounded-3xl
          border
          border-base-300
          bg-base-100
          shadow-2xl
        "
      >
        {/* =========================
            Close Button
        ========================== */}

        <button
          type="button"
          onClick={closePopup}
          aria-label="Close popup"
          className="
            absolute
            right-4
            top-4
            z-20
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-secondary-content/10
            bg-secondary
            text-secondary-content
            transition-all
            duration-200
            hover:bg-primary
            hover:text-primary-content
          "
        >
          <FiX className="text-lg" />
        </button>

        {/* =========================
            Main Content
        ========================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left Content */}
          <div className="relative overflow-hidden bg-secondary p-7 text-secondary-content sm:p-10 lg:p-12">

            {/* Decorative Circle */}
            <div
              className="
                absolute
                -right-20
                -top-20
                h-56
                w-56
                rounded-full
                bg-primary/20
                blur-2xl
              "
            />

            <div
              className="
                absolute
                -bottom-24
                -left-24
                h-64
                w-64
                rounded-full
                bg-primary/10
                blur-3xl
              "
            />

            <div className="relative z-10">

              {/* Small Label */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />

                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  ThriftBuild
                </span>
              </div>

              {/* Heading */}
              <h2 className="max-w-lg text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Build Your
                <span className="block text-primary">
                  Dream PC.
                </span>
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-md text-sm leading-7 text-secondary-content/65 sm:text-base">
                Find the right components, compare prices, and create a PC
                build that fits your needs and budget.
              </p>

              {/* Features */}
              <div className="mt-7 space-y-3">

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-content">
                    <FaMicrochip />
                  </div>

                  <span className="text-sm font-semibold">
                    Smart component selection
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-content">
                    <FaShoppingCart />
                  </div>

                  <span className="text-sm font-semibold">
                    Compare component prices
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* Right Content */}
          <div className="flex items-center justify-center bg-base-200 p-7 sm:p-10 lg:p-12">

            <div className="w-full max-w-sm text-center">

              {/* Icon */}
              <div
                className="
                  mx-auto
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-2xl
                  bg-primary
                  text-4xl
                  text-primary-content
                  shadow-lg
                "
              >
                🖥️
              </div>

              <h3 className="mt-6 text-2xl font-extrabold text-base-content">
                Ready to Build?
              </h3>

              <p className="mt-3 text-sm leading-6 text-base-content/60">
                Tell us what you need, choose your budget, and let
                ThriftBuild help you create your PC.
              </p>

              {/* CTA */}
              <Link
                to="/build-pc"
                onClick={closePopup}
                className="
                  mt-7
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-primary
                  px-5
                  py-3.5
                  text-sm
                  font-bold
                  text-primary-content
                  shadow-md
                  transition-all
                  duration-300
                  hover:bg-accent
                  hover:shadow-lg
                "
              >
                Build My PC

                <FiArrowRight className="text-lg" />
              </Link>

              {/* Secondary Action */}
              <button
                type="button"
                onClick={closePopup}
                className="
                  mt-3
                  w-full
                  rounded-xl
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-base-content/60
                  transition-colors
                  duration-200
                  hover:bg-base-300
                  hover:text-base-content
                "
              >
                Maybe Later
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GlobalPopup;