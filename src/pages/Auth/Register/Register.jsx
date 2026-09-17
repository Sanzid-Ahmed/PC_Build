/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */

import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
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

  const location = useLocation();
  const navigate = useNavigate();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        // 1. Store the image in FormData
        const formData = new FormData();
        formData.append("image", profileImg);

        // 2. Upload the photo to ImgBB
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios
          .post(image_API_URL, formData)
          .then((res) => {
            // 3. Update Firebase user profile
            const userProfile = {
              displayName: data.name,
              photoURL: res.data.data.url,
            };

            updateUserProfile(userProfile)
              .then(() => {
                navigate(location.state || "/");
              })
              .catch((error) => {
                console.error("Profile update failed:", error);
              });
          })
          .catch((error) => {
            console.error("Image upload failed:", error);
          });
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-xl sm:p-7">

        {/* Header */}
        <div className="mb-6 text-center">
          <h3 className="text-3xl font-extrabold tracking-tight text-base-content">
            Welcome to ThriftBuild
          </h3>

          <p className="mt-2 text-sm text-base-content/60">
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
                className="mb-2 block text-sm font-semibold text-base-content"
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
                  input w-full
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
                className="mb-2 block text-sm font-semibold text-base-content"
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
                  file-input w-full
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
                className="mb-2 block text-sm font-semibold text-base-content"
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
                  input w-full
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
                className="mb-2 block text-sm font-semibold text-base-content"
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
                  input w-full
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
                btn w-full
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
          <p className="pt-2 text-center text-sm text-base-content/60">
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
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;