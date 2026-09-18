/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */

import React from "react";
import { useForm } from "react-hook-form";

import useAuth from "../../../hooks/useAuth";
import useApi from "../../../hooks/useApi";

import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

import axios from "axios";

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

  const handleRegistration = async (data) => {
    try {
      // ==========================================
      // 1. Register user in Firebase
      // ==========================================

      const result = await registerUser(
        data.email,
        data.password
      );

      const firebaseUser = result.user;

      console.log("Firebase User:", firebaseUser);

      // ==========================================
      // 2. Upload profile image to ImgBB
      // ==========================================

      const profileImg = data.photo[0];

      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imageResponse = await axios.post(
        image_API_URL,
        formData
      );

      const imageURL = imageResponse.data.data.url;

      console.log("Uploaded Image:", imageURL);

      // ==========================================
      // 3. Update Firebase profile
      // ==========================================

      const userProfile = {
        displayName: data.name,
        photoURL: imageURL,
      };

      await updateUserProfile(userProfile);

      // ==========================================
      // 4. Get Firebase ID Token
      // ==========================================

      const token = await firebaseUser.getIdToken();

      // ==========================================
      // 5. Send user data to Backend
      // ==========================================

      const backendData = {
        firebase_id: firebaseUser.uid,
        email: firebaseUser.email,
        name: data.name,

        // User account
        role: "admin",

        // Normal users get 10 builds
        build_limit: 1000,
      };

      console.log("Sending to Backend:", backendData);

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
        "Backend Response:",
        response.data
      );

      // ==========================================
      // 6. Navigate
      // ==========================================

      navigate(location.state || "/");

    } catch (error) {
      console.error(
        "Registration failed:",
        error
      );

      if (error?.response) {
        console.error(
          "Backend Error:",
          error.response.data
        );
      }

      if (error?.code) {
        console.error(
          "Firebase Error:",
          error.code
        );
      }
    }
  };

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
        {/* Header */}

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

        {/* Registration Form */}

        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="space-y-4"
        >
          <fieldset className="space-y-4">

            {/* Name */}

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

              {errors.name?.type === "required" && (
                <p className="mt-1.5 text-xs font-medium text-error">
                  Name is required.
                </p>
              )}
            </div>

            {/* Photo */}

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
                  w-full
                  border-base-300
                  bg-base-100
                  text-base-content
                  file-input-sm
                  focus:border-primary
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary/20
                "
              />

              {errors.photo?.type === "required" && (
                <p className="mt-1.5 text-xs font-medium text-error">
                  Profile photo is required.
                </p>
              )}
            </div>

            {/* Email */}

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

              {errors.email?.type === "required" && (
                <p className="mt-1.5 text-xs font-medium text-error">
                  Email is required.
                </p>
              )}
            </div>

            {/* Password */}

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
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{6,}$/,
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
                <p className="mt-1.5 text-xs font-medium leading-5 text-error">
                  Password must contain at least one uppercase letter,
                  one lowercase letter, one number, and one special character.
                </p>
              )}
            </div>

            {/* Register Button */}

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
              "
            >
              Register
            </button>
          </fieldset>

          {/* Login Link */}

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

        {/* Social Login */}

        <div className="mt-6">
          <SocialLogin role="admin" />
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;