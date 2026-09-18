import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import {
  FaUserShield,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (data) => {
    if (loading) return;

    try {
      setLoading(true);
      setErrorMessage("");

      // 1. Firebase Login
      const result = await signInUser(data.email, data.password);
      console.log("Admin Firebase User:", result.user);

      // 2. Determine Redirect Location
      const redirectPath =
        location.state?.from?.pathname ||
        location.state?.pathname ||
        (typeof location.state === "string" ? location.state : "/");

      // 3. Navigate
      navigate("/admin", {
      replace: true,
    });
    } catch (error) {
      console.error("Admin login failed:", error);
      console.error("Firebase Error:", error?.code);

      // Firebase Error Handling
      switch (error?.code) {
        case "auth/invalid-credential":
        case "auth/invalid-login-credentials":
          setErrorMessage("Invalid email or password.");
          break;
        case "auth/user-not-found":
          setErrorMessage("No account was found with this email.");
          break;
        case "auth/wrong-password":
          setErrorMessage("Incorrect password.");
          break;
        case "auth/too-many-requests":
          setErrorMessage("Too many login attempts. Please try again later.");
          break;
        case "auth/network-request-failed":
          setErrorMessage("Network error. Please check your internet connection.");
          break;
        case "auth/user-disabled":
          setErrorMessage("This account has been disabled.");
          break;
        default:
          setErrorMessage("Login failed. Please check your credentials and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-2 sm:p-4">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-base-100/80 backdrop-blur-xl shadow-2xl transition-all">
        
        {/* Decorative Top Accent Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-primary to-transparent blur-[1px]" />

        {/* ================= HEADER ================= */}
        <div className="relative overflow-hidden bg-gradient-to-b from-base-300/60 via-base-200/30 to-transparent px-6 pt-8 pb-6 text-center sm:px-8">
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -left-12 -top-12 h-36 w-36 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-secondary/15 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Badge */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <FaUserShield className="text-sm" />
              <span>SYSTEM ADMIN</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">
              Admin Gateway
            </h3>
            <p className="mt-1.5 max-w-xs text-xs text-base-content/60 leading-relaxed">
              Authenticate to manage your system ecosystem and platform controls.
            </p>
          </div>
        </div>

        {/* ================= FORM BODY ================= */}
        <div className="px-6 pb-8 pt-2 sm:px-8">
          {/* Security Notice Card */}
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-3.5">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FaShieldAlt className="text-xs" />
            </div>
            <div>
              <p className="text-xs font-semibold text-base-content">
                Protected Session Entry
              </p>
              <p className="mt-0.5 text-[11px] leading-4 text-base-content/60">
                All administrative authentication attempts are monitored and encrypted.
              </p>
            </div>
          </div>

          {/* Global Error Banner */}
          {errorMessage && (
            <div className="mb-5 flex items-center gap-2.5 rounded-2xl border border-error/20 bg-error/10 p-3.5 text-xs text-error">
              <FaExclamationCircle className="shrink-0 text-sm" />
              <p className="font-medium">{errorMessage}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <fieldset disabled={loading} className="space-y-4">
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-base-content/70">
                  Admin Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-base-content/40" />
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    autoComplete="email"
                    {...register("email", { required: true })}
                    className={`input input-bordered h-11 w-full bg-base-200/50 pl-10 text-xs transition-all focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                      errors.email ? "input-error" : ""
                    }`}
                  />
                </div>
                {errors.email?.type === "required" && (
                  <p className="mt-1 text-[11px] text-error font-medium">Email is required.</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-base-content/70">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-base-content/40" />
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••••••"
                    autoComplete="current-password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                    className={`input input-bordered h-11 w-full bg-base-200/50 pl-10 text-xs transition-all focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                      errors.password ? "input-error" : ""
                    }`}
                  />
                </div>
                {errors.password?.type === "required" && (
                  <p className="mt-1 text-[11px] text-error font-medium">Password is required.</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="mt-1 text-[11px] text-error font-medium">
                    Password must be at least 6 characters.
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group btn btn-primary h-12 w-full mt-2 rounded-xl text-xs font-bold tracking-wider uppercase shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="loading loading-spinner loading-sm" />
                    Authenticating...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    Sign In to Dashboard
                    <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                )}
              </button>
            </fieldset>
          </form>

          {/* Social Login Option */}
          <div className="mt-6">
            <SocialLogin role="admin" />
          </div>

          {/* Registration Navigation Link */}
          <div className="mt-6 border-t border-base-content/10 pt-4 text-center">
            <p className="text-xs text-base-content/60">
              Need administrative access?{" "}
              <Link
                state={location.state}
                to="/admin-register"
                className="font-bold text-primary hover:underline"
              >
                Request an account
              </Link>
            </p>
          </div>

          {/* Security Features Footnote */}
          <div className="mt-5 flex items-center justify-between border-t border-base-content/5 pt-4 text-[11px] font-medium text-base-content/40">
            <div className="flex items-center gap-1.5">
              <FaCheckCircle className="text-primary text-xs" />
              <span>256-bit Connection</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaCheckCircle className="text-primary text-xs" />
              <span>Identity Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;