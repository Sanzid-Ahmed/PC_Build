import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import {
  FaUserShield,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaShieldAlt,
  FaCheck,
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

      // ==========================================
      // 1. Firebase Login
      // ==========================================
      const result = await signInUser(data.email, data.password);

      console.log("Admin Firebase User:", result.user);

      // ==========================================
      // 2. Determine Redirect Location
      // ==========================================
      const redirectPath =
        location.state?.from?.pathname ||
        location.state?.pathname ||
        (typeof location.state === "string" ? location.state : "/");

      // ==========================================
      // 3. Navigate
      // ==========================================
      navigate(redirectPath, {
        replace: true,
      });
    } catch (error) {
      console.error("Admin login failed:", error);
      console.error("Firebase Error:", error?.code);

      // ==========================================
      // Firebase Error Handling
      // ==========================================
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
    <div className="w-full max-w-md mx-auto">
      {/* =====================================================
          TOP HEADER
      ====================================================== */}
      <div className="mb-10 text-center">
        {/* ICON & BADGE */}
        <div className="flex flex-col items-center justify-center gap-4 mb-6">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-900 shadow-xl shadow-slate-900/20">
            <div className="absolute inset-0 rounded-2xl border border-white/10"></div>
            <FaUserShield className="text-4xl text-white" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
              System Admin
            </span>
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Admin Gateway
        </h1>
        <p className="mt-3 text-sm font-medium text-slate-500">
          Authenticate to manage your PC Build ecosystem.
        </p>
      </div>

      {/* =====================================================
          ERROR MESSAGE
      ====================================================== */}
      {errorMessage && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border-l-4 border-red-500 bg-red-50 p-4 shadow-sm">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
            <span className="text-red-500 font-bold text-sm">!</span>
          </div>
          <p className="text-sm font-semibold text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* =====================================================
          FORM
      ====================================================== */}
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
        <fieldset disabled={loading} className="space-y-5">
          {/* EMAIL */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-bold tracking-wide text-slate-700"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <FaEnvelope className="text-slate-400" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="admin@example.com"
                autoComplete="email"
                {...register("email", { required: true })}
                className="block w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 transition-colors focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-0"
              />
            </div>
            {errors.email?.type === "required" && (
              <p className="text-xs font-semibold text-red-500 mt-1">
                Email is required.
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-bold tracking-wide text-slate-700"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <FaLock className="text-slate-400" />
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                className="block w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 transition-colors focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-0"
              />
            </div>
            {errors.password?.type === "required" && (
              <p className="text-xs font-semibold text-red-500 mt-1">
                Password is required.
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-xs font-semibold text-red-500 mt-1">
                Password must be at least 6 characters.
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 py-4 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </fieldset>

        {/* REGISTER LINK */}
        <div className="text-center">
          <p className="text-sm text-slate-500">
            Need administrative access?{" "}
            <Link
              state={location.state}
              to="/admin/register"
              className="font-bold text-slate-900 underline decoration-slate-300 decoration-2 underline-offset-4 transition-colors hover:decoration-slate-900"
            >
              Request an account
            </Link>
          </p>
        </div>
      </form>

      {/* =====================================================
          DIVIDER
      ====================================================== */}
      <div className="my-8 flex items-center">
        <div className="flex-grow border-t border-slate-200" />
        <span className="mx-4 text-xs font-bold uppercase tracking-widest text-slate-400">
          Or Access With
        </span>
        <div className="flex-grow border-t border-slate-200" />
      </div>

      {/* =====================================================
          SOCIAL LOGIN
      ====================================================== */}
      <div className="rounded-xl border border-slate-200 bg-white p-1">
        <SocialLogin role="admin" />
      </div>

      {/* =====================================================
          SECURITY FOOTER
      ====================================================== */}
      <div className="mt-10 flex items-center justify-center gap-3 rounded-2xl bg-slate-50 py-4 border border-slate-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
          <FaShieldAlt className="text-sm text-emerald-600" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-700">
            256-bit Secure Connection
          </span>
          <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
            <FaCheck className="text-emerald-500" /> Identity verified
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;