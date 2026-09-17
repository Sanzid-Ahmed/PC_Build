/* eslint-disable no-unused-vars */

import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-xl sm:p-7">

        {/* Header */}
        <div className="mb-6 text-center">
          <h3 className="text-3xl font-extrabold tracking-tight text-base-content">
            Welcome Back
          </h3>

          <p className="mt-2 text-sm text-base-content/60">
            Login to continue to ThriftBuild
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-4"
        >
          <fieldset className="space-y-4">

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
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                  minLength: 6,
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
            </div>

            {/* Login Button */}
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
              Login
            </button>
          </fieldset>

          {/* Register */}
          <p className="pt-2 text-center text-sm text-base-content/60">
            New to ThriftBuild?{" "}
            <Link
              state={location.state}
              to="/register"
              className="
                font-bold
                text-primary
                transition-colors
                hover:text-accent
              "
            >
              Create an account
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

export default Login;