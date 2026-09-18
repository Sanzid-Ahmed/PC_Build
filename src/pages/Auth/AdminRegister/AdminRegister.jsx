import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useApi from "../../../hooks/useApi";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import {
  FaUserShield,
  FaCamera,
  FaEnvelope,
  FaLock,
  FaUser,
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

const AdminRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();

  const api = useApi();

  const location = useLocation();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistration = async (data) => {
    if (loading) return;

    try {
      setLoading(true);
      setErrorMessage("");

      // ==========================================
      // 1. Register Admin in Firebase
      // ==========================================

      const result = await registerUser(
        data.email,
        data.password
      );

      const firebaseUser = result.user;

      console.log("Firebase Admin:", firebaseUser);

      // ==========================================
      // 2. Upload Profile Image to ImgBB
      // ==========================================

      const profileImg = data.photo?.[0];

      if (!profileImg) {
        throw new Error("Please select a profile photo.");
      }

      const formData = new FormData();

      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

      const imageResponse = await axios.post(
        image_API_URL,
        formData
      );

      const imageURL = imageResponse.data.data.url;

      console.log("Uploaded Admin Image:", imageURL);

      // ==========================================
      // 3. Update Firebase Profile
      // ==========================================

      await updateUserProfile({
        displayName: data.name,
        photoURL: imageURL,
      });

      console.log("Admin Firebase profile updated.");

      // ==========================================
      // 4. Get Firebase ID Token
      // ==========================================

      const token = await firebaseUser.getIdToken();

      // ==========================================
      // 5. Prepare Backend Data
      // ==========================================

      const backendData = {
        firebase_id: firebaseUser.uid,
        email: firebaseUser.email,
        name: data.name,

        // Admin account
        role: "admin",

        // Admin gets 1000 builds
        build_limit: 1000,
      };

      console.log(
        "Sending Admin Data to Backend:",
        backendData
      );

      // ==========================================
      // 6. Sync With Backend
      // ==========================================

      try {
        const response = await api.post(
          "/api/users/sync",
          backendData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(
          "Admin Backend Response:",
          response.data
        );
      } catch (backendError) {
        /*
          Firebase registration has already succeeded.

          If Render is sleeping or temporarily unavailable,
          don't treat the Firebase account as failed.
        */

        console.error(
          "Admin backend sync failed:",
          backendError
        );

        console.warn(
          "Admin Firebase account created successfully, but backend sync failed."
        );
      }

      // ==========================================
      // 7. Determine Redirect Location
      // ==========================================

      const redirectPath =
        location.state?.from?.pathname ||
        location.state?.pathname ||
        (typeof location.state === "string"
          ? location.state
          : "/");

      // ==========================================
      // 8. Navigate
      // ==========================================

      navigate(redirectPath, {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Admin registration failed:",
        error
      );

      // ==========================================
      // Firebase Errors
      // ==========================================

      if (error?.code) {
        console.error(
          "Firebase Error:",
          error.code
        );

        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMessage(
              "This email is already registered. Please login instead."
            );
            break;

          case "auth/invalid-email":
            setErrorMessage(
              "Please enter a valid email address."
            );
            break;

          case "auth/weak-password":
            setErrorMessage(
              "The password is too weak."
            );
            break;

          case "auth/network-request-failed":
            setErrorMessage(
              "Network error. Please check your internet connection."
            );
            break;

          default:
            setErrorMessage(
              "Admin registration failed. Please try again."
            );
        }

        return;
      }

      // ==========================================
      // Backend Errors
      // ==========================================

      if (error?.response) {
        console.error(
          "Backend Error:",
          error.response.data
        );

        setErrorMessage(
          error.response.data?.detail ||
            "Unable to connect with the server."
        );

        return;
      }

      // ==========================================
      // ImgBB / Other Errors
      // ==========================================

      if (error?.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-base-content/10
          bg-base-100
          shadow-xl
        "
      >
        {/* =================================================
            ADMIN HEADER
        ================================================== */}

        <div
          className="
            relative
            overflow-hidden
            border-b
            border-base-content/10
            bg-[#0A0A0A]
            px-5
            py-6
            sm:px-7
            sm:py-7
          "
        >
          {/* Red glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-20
              h-40
              w-40
              rounded-full
              bg-primary/20
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-20
              -left-16
              h-40
              w-40
              rounded-full
              bg-primary/10
              blur-3xl
            "
          />

          <div className="relative z-10">
            {/* Admin Badge */}

            <div
              className="
                mb-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-primary/30
                bg-primary/10
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-primary
              "
            >
              <FaUserShield />

              Admin Portal
            </div>

            {/* Title */}

            <h3
              className="
                text-2xl
                font-black
                tracking-tight
                text-white
                sm:text-3xl
              "
            >
              Create Admin Account
            </h3>

            <p
              className="
                mt-2
                max-w-sm
                text-sm
                leading-6
                text-white/50
              "
            >
              Set up an administrator account to manage
              PC Build and its platform operations.
            </p>
          </div>
        </div>

        {/* =================================================
            FORM CONTENT
        ================================================== */}

        <div className="p-5 sm:p-7">
          {/* Security Info */}

          <div
            className="
              mb-6
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-primary/10
              bg-primary/5
              p-3.5
            "
          >
            <div
              className="
                mt-0.5
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-primary/10
                text-primary
              "
            >
              <FaShieldAlt className="text-sm" />
            </div>

            <div>
              <p className="text-xs font-bold text-base-content">
                Administrator account
              </p>

              <p className="mt-0.5 text-[11px] leading-5 text-base-content/50">
                This account will have administrative
                privileges on the PC Build platform.
              </p>
            </div>
          </div>

          {/* Error Message */}

          {errorMessage && (
            <div
              className="
                mb-5
                rounded-xl
                border
                border-error/20
                bg-error/10
                px-4
                py-3
                text-sm
                font-medium
                text-error
              "
            >
              {errorMessage}
            </div>
          )}

          {/* Registration Form */}

          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="space-y-4"
          >
            <fieldset
              disabled={loading}
              className="space-y-4"
            >
              {/* ==========================================
                  NAME
              =========================================== */}

              <div>
                <label
                  htmlFor="name"
                  className="
                    mb-2
                    block
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-base-content/70
                  "
                >
                  Full Name
                </label>

                <div className="relative">
                  <FaUser
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-xs
                      text-base-content/30
                    "
                  />

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter administrator name"
                    {...register("name", {
                      required: true,
                    })}
                    className="
                      input
                      w-full
                      border-base-300
                      bg-base-100
                      pl-10
                      text-base-content
                      placeholder:text-base-content/30
                      focus:border-primary
                      focus:outline-none
                      focus:ring-2
                      focus:ring-primary/20
                    "
                  />
                </div>

                {errors.name?.type === "required" && (
                  <p className="mt-1.5 text-xs font-medium text-error">
                    Name is required.
                  </p>
                )}
              </div>

              {/* ==========================================
                  PROFILE PHOTO
              =========================================== */}

              <div>
                <label
                  htmlFor="photo"
                  className="
                    mb-2
                    block
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-base-content/70
                  "
                >
                  Profile Photo
                </label>

                <div className="relative">
                  <FaCamera
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      z-10
                      -translate-y-1/2
                      text-xs
                      text-base-content/30
                    "
                  />

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
                      pl-10
                      text-base-content
                      focus:border-primary
                      focus:outline-none
                      focus:ring-2
                      focus:ring-primary/20
                    "
                  />
                </div>

                {errors.photo?.type === "required" && (
                  <p className="mt-1.5 text-xs font-medium text-error">
                    Profile photo is required.
                  </p>
                )}
              </div>

              {/* ==========================================
                  EMAIL
              =========================================== */}

              <div>
                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-base-content/70
                  "
                >
                  Admin Email
                </label>

                <div className="relative">
                  <FaEnvelope
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-xs
                      text-base-content/30
                    "
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    {...register("email", {
                      required: true,
                    })}
                    className="
                      input
                      w-full
                      border-base-300
                      bg-base-100
                      pl-10
                      text-base-content
                      placeholder:text-base-content/30
                      focus:border-primary
                      focus:outline-none
                      focus:ring-2
                      focus:ring-primary/20
                    "
                  />
                </div>

                {errors.email?.type === "required" && (
                  <p className="mt-1.5 text-xs font-medium text-error">
                    Email is required.
                  </p>
                )}
              </div>

              {/* ==========================================
                  PASSWORD
              =========================================== */}

              <div>
                <label
                  htmlFor="password"
                  className="
                    mb-2
                    block
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-base-content/70
                  "
                >
                  Password
                </label>

                <div className="relative">
                  <FaLock
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-xs
                      text-base-content/30
                    "
                  />

                  <input
                    id="password"
                    type="password"
                    placeholder="Create a secure password"
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
                      pl-10
                      text-base-content
                      placeholder:text-base-content/30
                      focus:border-primary
                      focus:outline-none
                      focus:ring-2
                      focus:ring-primary/20
                    "
                  />
                </div>

                {errors.password?.type === "required" && (
                  <p className="mt-1.5 text-xs font-medium text-error">
                    Password is required.
                  </p>
                )}

                {errors.password?.type === "minLength" && (
                  <p className="mt-1.5 text-xs font-medium text-error">
                    Password must be 6 characters or longer.
                  </p>
                )}

                {errors.password?.type === "pattern" && (
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
                    uppercase letter, one lowercase letter,
                    one number, and one special character.
                  </p>
                )}
              </div>

              {/* ==========================================
                  REGISTER BUTTON
              =========================================== */}

              <button
                type="submit"
                className="
                  group
                  btn
                  mt-2
                  h-12
                  w-full
                  border-none
                  bg-primary
                  text-primary-content
                  shadow-md
                  transition-all
                  duration-300
                  hover:bg-accent
                  hover:shadow-lg
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>

                    Creating Admin Account...
                  </>
                ) : (
                  <>
                    Create Admin Account

                    <FaArrowRight
                      className="
                        text-xs
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </>
                )}
              </button>
            </fieldset>

            {/* ==========================================
                LOGIN LINK
            =========================================== */}

            <div
              className="
                mt-5
                border-t
                border-base-content/10
                pt-5
              "
            >
              <p
                className="
                  text-center
                  text-sm
                  text-base-content/50
                "
              >
                Already have an admin account?{" "}

                <Link
                  state={location.state}
                  to="/admin/login"
                  className="
                    font-bold
                    text-primary
                    transition-colors
                    hover:text-accent
                  "
                >
                  Admin Login
                </Link>
              </p>
            </div>
          </form>

          {/* ==========================================
              ADMIN FEATURES
          =========================================== */}

          <div
            className="
              mt-5
              grid
              grid-cols-2
              gap-2
              border-t
              border-base-content/10
              pt-5
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                text-[10px]
                font-medium
                text-base-content/40
              "
            >
              <FaCheckCircle className="text-primary" />

              Secure Access
            </div>

            <div
              className="
                flex
                items-center
                justify-end
                gap-2
                text-[10px]
                font-medium
                text-base-content/40
              "
            >
              <FaCheckCircle className="text-primary" />

              Admin Privileges
            </div>
          </div>

          {/* Social Login */}

          <div className="mt-5">
            <SocialLogin role="admin" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;