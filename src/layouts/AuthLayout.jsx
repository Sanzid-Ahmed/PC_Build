import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import {
  FaArrowLeft,
  FaCog,
  FaLock,
  FaTimes,
  FaShieldAlt,
} from "react-icons/fa";

import Logo from "../components/logo/Logo";
import AuthImage from "../assets/Auth.jpg";

const ADMIN_PASSCODE = "admin1234";

const AuthLayout = () => {
  const navigate = useNavigate();

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");

  // =========================================================
  // BACK BUTTON
  // =========================================================

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  // =========================================================
  // ADMIN ACCESS MODAL
  // =========================================================

  const openAdminAccess = () => {
    setAdminPassword("");
    setError("");
    setShowAdminModal(true);
  };

  const closeAdminAccess = () => {
    setShowAdminModal(false);
    setAdminPassword("");
    setError("");
  };

  // =========================================================
  // ADMIN VERIFICATION
  // =========================================================

  const handleAdminAccess = (e) => {
    e.preventDefault();

    if (adminPassword === ADMIN_PASSCODE) {
      closeAdminAccess();

      // Go to separate admin authentication layout
      navigate("/admin-login");
    } else {
      setError("Incorrect admin access password.");
    }
  };

  // =========================================================
  // ESCAPE KEY
  // =========================================================

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showAdminModal) {
        closeAdminAccess();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showAdminModal]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-base-200">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -left-40
            -top-40
            h-[28rem]
            w-[28rem]
            rounded-full
            bg-primary/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            -bottom-40
            -right-40
            h-[30rem]
            w-[30rem]
            rounded-full
            bg-primary/10
            blur-[130px]
          "
        />
      </div>

      {/* =====================================================
          TOP NAVIGATION
      ====================================================== */}

      <header
        className="
          absolute
          left-0
          right-0
          top-0
          z-40
          flex
          items-center
          justify-between
          px-4
          py-4
          sm:px-6
          sm:py-5
          lg:px-10
          lg:py-7
        "
      >
        {/* LOGO */}

        <div className="shrink-0">
          <Logo />
        </div>

        {/* ACTIONS */}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* ADMIN ACCESS */}

          <button
            type="button"
            onClick={openAdminAccess}
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-primary/30
              bg-black/60
              px-3
              py-2
              text-xs
              font-semibold
              text-white
              shadow-lg
              backdrop-blur-md
              transition-all
              duration-300
              hover:border-primary
              hover:bg-primary
              hover:shadow-primary/20
              active:scale-95
              sm:px-4
              sm:py-2.5
              sm:text-sm
            "
          >
            <FaCog
              className="
                text-[11px]
                transition-transform
                duration-300
                group-hover:rotate-90
                sm:text-xs
              "
            />

            <span className="hidden sm:inline">
              Admin Access
            </span>

            <span className="sm:hidden">
              Admin
            </span>
          </button>

          {/* BACK */}

          <button
            type="button"
            onClick={handleGoBack}
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-base-content/10
              bg-base-100/90
              px-3
              py-2
              text-xs
              font-bold
              text-base-content
              shadow-lg
              backdrop-blur-md
              transition-all
              duration-300
              hover:border-primary/30
              hover:bg-primary
              hover:text-primary-content
              hover:shadow-primary/20
              active:scale-95
              sm:px-4
              sm:py-2.5
              sm:text-sm
            "
          >
            <FaArrowLeft
              className="
                shrink-0
                text-[10px]
                transition-transform
                duration-300
                group-hover:-translate-x-1
                sm:text-xs
              "
            />

            <span>Back</span>
          </button>
        </div>
      </header>

      {/* =====================================================
          MAIN AUTH AREA
      ====================================================== */}

      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          px-3
          pb-6
          pt-24
          sm:px-6
          sm:pb-8
          sm:pt-28
          lg:px-10
          lg:pb-10
          lg:pt-32
        "
      >
        <div
          className="
            relative
            flex
            w-full
            max-w-[1180px]
            flex-col
            overflow-hidden
            rounded-[1.5rem]
            border
            border-base-content/10
            bg-base-100
            shadow-[0_25px_80px_rgba(0,0,0,0.20)]
            lg:min-h-[650px]
            lg:flex-row
            lg:rounded-[2rem]
          "
        >
          {/* =================================================
              IMAGE PANEL
          ================================================== */}

          <section
            className="
              relative
              h-[300px]
              w-full
              overflow-hidden
              sm:h-[380px]
              lg:h-auto
              lg:w-1/2
            "
          >
            <img
              src={AuthImage}
              alt="PC Building"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-[1500ms]
                hover:scale-105
              "
            />

            {/* OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-black/95
                via-black/65
                to-primary/70
              "
            />

            {/* RED LIGHT */}

            <div
              className="
                absolute
                -bottom-40
                -left-40
                h-[32rem]
                w-[32rem]
                rounded-full
                bg-primary/25
                blur-[120px]
              "
            />

            {/* TOP LINE */}

            <div
              className="
                absolute
                left-0
                right-0
                top-0
                h-1
                bg-primary
                shadow-[0_0_25px_rgba(229,9,47,0.8)]
              "
            />

            {/* CONTENT */}

            <div
              className="
                relative
                z-10
                flex
                h-full
                flex-col
                justify-end
                p-6
                sm:p-9
                lg:p-12
              "
            >
              <div
                className="
                  mb-3
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-primary
                  sm:text-xs
                  sm:tracking-[0.3em]
                "
              >
                <span className="h-px w-7 bg-primary sm:w-10" />

                Build. Compare. Choose.
              </div>

              <h1
                className="
                  max-w-xl
                  text-[clamp(2rem,4vw,4rem)]
                  font-black
                  leading-[1.05]
                  tracking-tight
                  text-white
                "
              >
                Build Your

                <span className="block text-primary">
                  Dream PC.
                </span>
              </h1>

              <p
                className="
                  mt-4
                  max-w-lg
                  text-[clamp(0.75rem,1vw,1rem)]
                  leading-relaxed
                  text-white/65
                  sm:mt-5
                "
              >
                Find the right components, compare prices,
                and create a PC that perfectly matches your
                needs, performance, and budget.
              </p>

              <div className="mt-6 flex items-center gap-3 sm:mt-8">
                <div
                  className="
                    h-1
                    w-12
                    rounded-full
                    bg-primary
                    shadow-[0_0_20px_rgba(229,9,47,0.7)]
                    sm:w-16
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-white/40
                    sm:text-xs
                  "
                >
                  Smart PC Building
                </span>
              </div>
            </div>
          </section>

          {/* =================================================
              USER FORM PANEL
          ================================================== */}

          <section
            className="
              relative
              flex
              min-h-[500px]
              w-full
              items-center
              justify-center
              bg-primary-content
              px-5
              py-10
              sm:px-10
              sm:py-12
              lg:min-h-0
              lg:w-1/2
              lg:px-12
              xl:px-16
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                right-0
                top-0
                h-40
                w-40
                rounded-full
                bg-primary/5
                blur-3xl
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                bottom-0
                left-0
                h-40
                w-40
                rounded-full
                bg-primary/5
                blur-3xl
              "
            />

            <div
              className="
                relative
                z-10
                w-full
                max-w-md
                animate-[fadeUp_0.7s_ease-out]
              "
            >
              <Outlet />
            </div>
          </section>
        </div>
      </main>

      {/* =====================================================
          ADMIN PASSWORD MODAL
      ====================================================== */}

      {showAdminModal && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/80
            px-4
            backdrop-blur-md
          "
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeAdminAccess();
            }
          }}
        >
          <div
            className="
              relative
              w-full
              max-w-[430px]
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-[#111111]
              shadow-[0_30px_100px_rgba(0,0,0,0.6)]
              animate-[modalIn_0.25s_ease-out]
            "
          >
            {/* RED LINE */}

            <div
              className="
                absolute
                left-0
                right-0
                top-0
                h-1
                bg-primary
                shadow-[0_0_20px_rgba(229,9,47,0.7)]
              "
            />

            <div className="p-6 sm:p-8">
              {/* CLOSE */}

              <button
                type="button"
                onClick={closeAdminAccess}
                className="
                  absolute
                  right-4
                  top-4
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  text-gray-500
                  transition-all
                  hover:bg-white/5
                  hover:text-white
                  active:scale-95
                "
                aria-label="Close"
              >
                <FaTimes />
              </button>

              {/* ICON */}

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-primary/20
                  bg-primary/10
                  text-primary
                "
              >
                <FaShieldAlt className="text-2xl" />
              </div>

              {/* TITLE */}

              <h2
                className="
                  mt-5
                  text-center
                  text-2xl
                  font-extrabold
                  tracking-tight
                  text-white
                "
              >
                Admin Access
              </h2>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-xs
                  text-center
                  text-sm
                  leading-6
                  text-gray-500
                "
              >
                Enter your access password to
                continue to the administration panel.
              </p>

              {/* FORM */}

              <form
                onSubmit={handleAdminAccess}
                className="mt-6"
              >
                <label
                  className="
                    mb-2
                    block
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-gray-400
                  "
                >
                  Access Password
                </label>

                <div className="relative">
                  <FaLock
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-sm
                      text-gray-600
                    "
                  />

                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter access password"
                    autoFocus
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-gray-800
                      bg-[#0A0A0A]
                      pl-11
                      pr-4
                      text-sm
                      text-white
                      outline-none
                      transition-all
                      placeholder:text-gray-600
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  />
                </div>

                {/* ERROR */}

                {error && (
                  <div
                    className="
                      mt-3
                      rounded-lg
                      border
                      border-red-500/20
                      bg-red-500/5
                      px-3
                      py-2
                      text-xs
                      font-medium
                      text-red-400
                    "
                  >
                    {error}
                  </div>
                )}

                {/* BUTTONS */}

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={closeAdminAccess}
                    className="
                      h-12
                      rounded-xl
                      border
                      border-gray-800
                      bg-transparent
                      px-4
                      text-sm
                      font-bold
                      text-gray-400
                      transition-all
                      hover:border-gray-700
                      hover:bg-white/5
                      hover:text-white
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="
                      h-12
                      rounded-xl
                      border
                      border-primary
                      bg-primary
                      px-4
                      text-sm
                      font-bold
                      text-white
                      shadow-[0_8px_25px_rgba(229,9,47,0.18)]
                      transition-all
                      hover:bg-[#c70727]
                      hover:shadow-[0_10px_30px_rgba(229,9,47,0.3)]
                    "
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ANIMATIONS
      ====================================================== */}

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AuthLayout;