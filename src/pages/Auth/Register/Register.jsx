/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import useAuth from "../../../hooks/useAuth";
import useApi from "../../../hooks/useApi";

import { Link, useLocation, useNavigate } from "react-router";

import SocialLogin from "../SocialLogin/SocialLogin";

import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();

  const api = useApi();

  const location = useLocation();
  const navigate = useNavigate();

  const [registering, setRegistering] = useState(false);
  const [registerError, setRegisterError] = useState("");

  // =====================================================
  // HANDLE REGISTRATION
  // =====================================================

  const handleRegistration = async (data) => {
    if (registering) return;

    setRegistering(true);
    setRegisterError("");

    try {
      // =================================================
      // 1. CREATE FIREBASE USER
      // =================================================

      const result = await registerUser(
        data.email,
        data.password
      );

      const firebaseUser = result.user;

      console.log("Firebase User:", firebaseUser);

      // =================================================
      // 2. UPLOAD IMAGE
      // =================================================

      const profileImg = data.photo?.[0];

      let imageURL = "";

      if (profileImg) {
        const formData = new FormData();

        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        const imageResponse = await axios.post(
          image_API_URL,
          formData
        );

        imageURL = imageResponse.data.data.url;

        console.log("Uploaded Image:", imageURL);
      }

      // =================================================
      // 3. UPDATE FIREBASE PROFILE
      // =================================================

      await updateUserProfile({
        displayName: data.name,
        photoURL: imageURL,
      });

      console.log("Firebase profile updated.");

      // =================================================
      // 4. GET FIREBASE TOKEN
      // =================================================

      const token = await firebaseUser.getIdToken();

      // =================================================
      // 5. PREPARE BACKEND DATA
      // =================================================

      const backendData = {
        firebase_id: firebaseUser.uid,
        email: firebaseUser.email,
        name: data.name,
        role: "user",
        build_limit: 10,
      };

      console.log(
        "Sending to Backend:",
        backendData
      );

      // =================================================
      // 6. START BACKEND SYNC
      // =================================================
      //
      // IMPORTANT:
      // We don't make the user wait for Render.
      //
      // The request starts here and navigation happens
      // immediately afterward.
      //
      // =================================================

      api
        .post(
          "/api/users/sync",
          backendData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(
            "Backend Response:",
            response.data
          );
        })
        .catch((error) => {
          console.error(
            "Backend Sync Failed:",
            error.response?.data || error.message
          );
        });

      // =================================================
      // 7. NAVIGATE IMMEDIATELY
      // =================================================

      const redirectPath =
        location.state?.from?.pathname ||
        location.state?.pathname ||
        "/";

      navigate(redirectPath, {
        replace: true,
      });

    } catch (error) {
      console.error(
        "Registration failed:",
        error
      );

      // =================================================
      // FIREBASE ERRORS
      // =================================================

      if (
        error?.code ===
        "auth/email-already-in-use"
      ) {
        setRegisterError(
          "This email is already registered. Please login instead."
        );
      } else if (
        error?.code ===
        "auth/invalid-email"
      ) {
        setRegisterError(
          "Please enter a valid email address."
        );
      } else if (
        error?.code ===
        "auth/weak-password"
      ) {
        setRegisterError(
          "Your password is too weak. Please use a stronger password."
        );
      } else if (
        error?.code ===
        "auth/network-request-failed"
      ) {
        setRegisterError(
          "Network error. Please check your internet connection and try again."
        );
      } else if (error?.response) {
        setRegisterError(
          error.response.data?.detail ||
            "Unable to create your account."
        );
      } else {
        setRegisterError(
          error?.message ||
            "Registration failed. Please try again."
        );
      }

      setRegistering(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="w-full">
      <div
        className="
          rounded-2xl
          border
          border-base-300
          bg-base-100
          p-5
          shadow-xl
          sm:p-7
        "
      >

        {/* ============================================
            HEADER
        ============================================ */}

        <div className="mb-6 text-center">

          <h3
            className="
              text-3xl
              font-extrabold
              tracking-tight
              text-base-content
            "
          >
            Welcome to ThriftBuild
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-base-content/60
            "
          >
            Create your account to start building
          </p>

        </div>

        {/* ============================================
            ERROR
        ============================================ */}

        {registerError && (
          <div
            className="
              mb-5
              rounded-xl
              border
              border-error/20
              bg-error/5
              px-4
              py-3
              text-sm
              font-semibold
              leading-5
              text-error
            "
          >
            {registerError}
          </div>
        )}

        {/* ============================================
            REGISTRATION FORM
        ============================================ */}

        <form
          onSubmit={handleSubmit(
            handleRegistration
          )}
          className="space-y-4"
        >

          <fieldset
            disabled={registering}
            className="space-y-4"
          >

            {/* ========================================
                NAME
            ======================================== */}

            <div>

              <label
                htmlFor="name"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-base-content
                "
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Your name"
                {...register("name", {
                  required: true,
                })}
                className="
                  input
                  w-full
                  border-base-300
                  bg-base-100
                  text-base-content
                  placeholder:text-base-content/40
                  focus:border-primary
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary/20
                "
              />

              {errors.name?.type ===
                "required" && (
                <p className="mt-1.5 text-xs font-medium text-error">
                  Name is required.
                </p>
              )}

            </div>

            {/* ========================================
                PHOTO
            ======================================== */}

            <div>

              <label
                htmlFor="photo"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-base-content
                "
              >
                Profile Photo
              </label>

              <input
                id="photo"
                type="file"
                accept="image/*"
                {...register("photo", {
                  required: true,
                })}
                className="
                  file-input
                  file-input-sm
                  w-full
                  border-base-300
                  bg-base-100
                  text-base-content
                  focus:border-primary
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary/20
                "
              />

              {errors.photo?.type ===
                "required" && (
                <p className="mt-1.5 text-xs font-medium text-error">
                  Profile photo is required.
                </p>
              )}

            </div>

            {/* ========================================
                EMAIL
            ======================================== */}

            <div>

              <label
                htmlFor="email"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-base-content
                "
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                })}
                className="
                  input
                  w-full
                  border-base-300
                  bg-base-100
                  text-base-content
                  placeholder:text-base-content/40
                  focus:border-primary
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary/20
                "
              />

              {errors.email?.type ===
                "required" && (
                <p className="mt-1.5 text-xs font-medium text-error">
                  Email is required.
                </p>
              )}

            </div>

            {/* ========================================
                PASSWORD
            ======================================== */}

            <div>

              <label
                htmlFor="password"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-base-content
                "
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Create a password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]).{6,}$/,
                })}
                className="
                  input
                  w-full
                  border-base-300
                  bg-base-100
                  text-base-content
                  placeholder:text-base-content/40
                  focus:border-primary
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary/20
                "
              />

              {errors.password?.type ===
                "required" && (
                <p className="mt-1.5 text-xs font-medium text-error">
                  Password is required.
                </p>
              )}

              {errors.password?.type ===
                "minLength" && (
                <p className="mt-1.5 text-xs font-medium text-error">
                  Password must be 6 characters or longer.
                </p>
              )}

              {errors.password?.type ===
                "pattern" && (
                <p
                  className="
                    mt-1.5
                    text-xs
                    font-medium
                    leading-5
                    text-error
                  "
                >
                  Password must contain at least one
                  uppercase letter, one lowercase
                  letter, one number, and one special
                  character.
                </p>
              )}

            </div>

            {/* ========================================
                REGISTER BUTTON
            ======================================== */}

            <button
              type="submit"
              className="
                btn
                w-full
                border-none
                bg-primary
                text-primary-content
                shadow-md
                transition-all
                duration-200
                hover:bg-accent
                hover:shadow-lg
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >

              {registering ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Creating account...
                </>
              ) : (
                "Register"
              )}

            </button>

          </fieldset>

          {/* ==========================================
              LOGIN LINK
          ========================================== */}

          <p
            className="
              pt-2
              text-center
              text-sm
              text-base-content/60
            "
          >
            Already have an account?{" "}

            <Link
              state={location.state}
              to="/login"
              className="
                font-bold
                text-primary
                transition-colors
                hover:text-accent
              "
            >
              Login
            </Link>

          </p>

        </form>

        {/* ============================================
            SOCIAL LOGIN
        ============================================ */}

        <div className="mt-6">
          <SocialLogin role="user" />
        </div>

      </div>
    </div>
  );
};

export default Register;