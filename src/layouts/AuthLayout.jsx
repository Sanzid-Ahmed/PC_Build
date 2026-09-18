import React, { useState } from "react";

import {
  Outlet,
  useNavigate,
} from "react-router";

import Logo from "../components/logo/Logo";

import AuthImage from "../assets/Auth.jpg";


const ADMIN_PASSCODE = "admin1234";
console.log(ADMIN_PASSCODE);


const AuthLayout = () => {

  const navigate = useNavigate();

  const [showAdminModal, setShowAdminModal] =
    useState(false);

  const [adminPassword, setAdminPassword] =
    useState("");

  const [error, setError] =
    useState("");


  // ==========================================
  // Open Admin Password Modal
  // ==========================================

  const openAdminAccess = () => {

    setAdminPassword("");
    setError("");

    setShowAdminModal(true);

  };


  // ==========================================
  // Verify Admin Password
  // ==========================================

  const handleAdminAccess = (e) => {

    e.preventDefault();


    if (
      adminPassword === ADMIN_PASSCODE
    ) {

      setShowAdminModal(false);

      setAdminPassword("");

      setError("");

      navigate("/admin/login");

    } else {

      setError(
        "Incorrect admin access password."
      );

    }

  };


  return (

    <div className="relative min-h-screen">


      {/* ================= LOGO ================= */}

      <div
        className="
          absolute
          left-6
          top-6
          z-30
          lg:left-10
          lg:top-8
        "
      >

        <Logo />

      </div>


      {/* ================= GO BACK ================= */}

      <button
        onClick={() => navigate(-1)}
        className="
          absolute
          right-6
          top-6
          z-30
          inline-flex
          cursor-pointer
          items-center
          gap-2
          rounded-lg
          bg-secondary
          px-4
          py-2
          text-sm
          font-bold
          text-primary-content
          transition-all
          duration-300
          hover:bg-primary
          hover:text-white
          lg:right-10
          lg:top-8
        "
      >

        <span className="text-lg">
          ←
        </span>

        Go Back

      </button>


      {/* ================= ADMIN ACCESS ================= */}

      <button
        type="button"
        onClick={openAdminAccess}
        className="
          absolute
          right-6
          top-20
          z-30
          inline-flex
          cursor-pointer
          items-center
          gap-2
          rounded-lg
          border
          border-primary/40
          bg-black/70
          px-4
          py-2
          text-sm
          font-semibold
          text-white
          backdrop-blur-md
          transition-all
          duration-300
          hover:border-primary
          hover:bg-primary
          lg:right-10
          lg:top-20
        "
      >

        <span>
          ⚙
        </span>

        Admin Access

      </button>


      {/* ================= CENTER ================= */}

      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          border-2
          border-base-content/10
          px-4
          py-24
          sm:px-8
        "
      >


        {/* ================= TWO PANELS ================= */}

        <div
          className="
            flex
            w-full
            max-w-6xl
            flex-col
            overflow-hidden
            rounded-2xl
            shadow-2xl
            lg:h-[620px]
            lg:flex-row
          "
        >


          {/* ================= IMAGE PANEL ================= */}

          <div
            className="
              relative
              h-[350px]
              w-full
              overflow-hidden
              lg:h-full
              lg:w-1/2
            "
          >

            {/* Image */}

            <img
              src={AuthImage}
              alt="PC Building"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />


            {/* Black + Red Gradient */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-black/90
                via-black/50
                to-primary/70
              "
            />


            {/* Red Glow */}

            <div
              className="
                absolute
                -bottom-32
                -left-32
                h-[400px]
                w-[400px]
                rounded-full
                bg-primary/30
                blur-[100px]
              "
            />


            {/* Image Text */}

            <div
              className="
                relative
                z-10
                flex
                h-full
                flex-col
                justify-end
                p-8
                sm:p-10
                lg:p-12
              "
            >

              <p
                className="
                  mb-3
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-primary
                  animate-[fadeUp_0.8s_ease-out]
                "
              >
                Build. Compare. Choose.
              </p>


              <h1
                className="
                  text-4xl
                  font-extrabold
                  leading-tight
                  text-white
                  sm:text-5xl
                  animate-[fadeUp_1s_ease-out]
                "
              >

                Build Your

                <span
                  className="
                    block
                    text-primary
                  "
                >
                  Dream PC.
                </span>

              </h1>


              <p
                className="
                  mt-5
                  max-w-lg
                  text-sm
                  leading-6
                  text-white/65
                  sm:text-base
                  sm:leading-7
                  animate-[fadeUp_1.2s_ease-out]
                "
              >
                Find the right components, compare prices,
                and create a PC that perfectly matches your
                needs, performance, and budget.
              </p>


              {/* Red Line */}

              <div
                className="
                  mt-6
                  h-1
                  w-20
                  rounded-full
                  bg-primary
                  shadow-[0_0_20px_rgba(229,9,47,0.7)]
                  animate-[expandLine_1.4s_ease-out]
                "
              />

            </div>

          </div>


          {/* ================= FORM PANEL ================= */}

          <div
            className="
              relative
              flex
              min-h-[500px]
              w-full
              items-center
              justify-center
              bg-primary-content
              p-8
              sm:p-10
              lg:h-full
              lg:w-1/2
            "
          >

            <div
              className="
                w-full
                max-w-md
                animate-[fadeUp_0.8s_ease-out]
              "
            >

              <Outlet />

            </div>

          </div>

        </div>

      </div>


      {/* ================= ADMIN PASSWORD MODAL ================= */}

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
            backdrop-blur-sm
          "
        >

          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              border
              border-gray-800
              bg-[#111]
              p-7
              shadow-2xl
            "
          >

            {/* Icon */}

            <div
              className="
                mx-auto
                mb-5
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-xl
                bg-primary/10
                text-2xl
              "
            >
              🔐
            </div>


            {/* Title */}

            <h2
              className="
                text-center
                text-2xl
                font-bold
                text-white
              "
            >
              Admin Access
            </h2>


            <p
              className="
                mt-2
                text-center
                text-sm
                text-gray-500
              "
            >
              Enter the admin access password
              to continue.
            </p>


            {/* Form */}

            <form
              onSubmit={handleAdminAccess}
              className="mt-6"
            >

              <input
                type="password"
                value={adminPassword}
                onChange={(e) => {

                  setAdminPassword(
                    e.target.value
                  );

                  setError("");

                }}
                placeholder="Enter access password"
                autoFocus
                className="
                  input
                  input-bordered
                  w-full
                  border-gray-700
                  bg-[#0A0A0A]
                  text-white
                  placeholder:text-gray-600
                  focus:border-primary
                "
              />


              {/* Error */}

              {error && (

                <p
                  className="
                    mt-2
                    text-sm
                    text-red-500
                  "
                >
                  {error}
                </p>

              )}


              {/* Buttons */}

              <div
                className="
                  mt-6
                  flex
                  gap-3
                "
              >

                <button
                  type="button"
                  onClick={() => {

                    setShowAdminModal(false);
                    setAdminPassword("");
                    setError("");

                  }}
                  className="
                    btn
                    flex-1
                    border-gray-700
                    bg-transparent
                    text-gray-300
                    hover:bg-gray-800
                  "
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="
                    btn
                    flex-1
                    border-primary
                    bg-primary
                    text-white
                    hover:bg-[#c70727]
                  "
                >
                  Continue
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* ================= ANIMATIONS ================= */}

      <style>
        {`

          @keyframes fadeUp {

            from {
              opacity: 0;
              transform: translateY(30px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }

          }


          @keyframes expandLine {

            from {
              width: 0;
              opacity: 0;
            }

            to {
              width: 80px;
              opacity: 1;
            }

          }

        `}
      </style>

    </div>

  );

};


export default AuthLayout;