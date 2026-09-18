import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useApi from "../../../hooks/useApi";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
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
  FaExclamationCircle,
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

      // 1. Register Admin in Firebase
      const result = await registerUser(data.email, data.password);
      const firebaseUser = result.user;

      // 2. Upload Profile Image to ImgBB
      const profileImg = data.photo?.[0];
      if (!profileImg) {
        throw new Error("Please select a profile photo.");
      }

      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      const imageResponse = await axios.post(image_API_URL, formData);
      const imageURL = imageResponse.data.data.url;

      // 3. Update Firebase Profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: imageURL,
      });

      // 4. Get Firebase ID Token
      const token = await firebaseUser.getIdToken();

      // 5. Sync With Backend
      const backendData = {
        firebase_id: firebaseUser.uid,
        email: firebaseUser.email,
        name: data.name,
        role: "admin",
        build_limit: 1000,
      };

      navigate("/admin/login")

      try {
        await api.post("/api/users/sync", backendData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (backendError) {
        console.error("Admin backend sync failed:", backendError);
      }

      // 6. Navigate
      const redirectPath =
        location.state?.from?.pathname ||
        location.state?.pathname ||
        (typeof location.state === "string" ? location.state : "/");

      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error("Admin registration failed:", error);

      if (error?.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMessage("This email is already registered. Please login instead.");
            break;
          case "auth/invalid-email":
            setErrorMessage("Please enter a valid email address.");
            break;
          case "auth/weak-password":
            setErrorMessage("The password is too weak.");
            break;
          case "auth/network-request-failed":
            setErrorMessage("Network error. Please check your connection.");
            break;
          default:
            setErrorMessage("Admin registration failed. Please try again.");
        }
        return;
      }

      if (error?.response) {
        setErrorMessage(
          error.response.data?.detail || "Unable to connect with the server."
        );
        return;
      }

      setErrorMessage(error?.message || "Something went wrong. Please try again.");
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
              <FaUserShield className="text-sm" />
              <span>ADMIN PORTAL</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">
              Create Administrator
            </h3>
            <p className="mt-1.5 max-w-xs text-xs text-base-content/60 leading-relaxed">
              Set up full access privileges to oversee platform operations and manage systems.
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
                Elevated Account Security
              </p>
              <p className="mt-0.5 text-[11px] leading-4 text-base-content/60">
                Admin status provides access to sensitive controls and resource allocations.
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

          {/* Registration Form */}
          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
            <fieldset disabled={loading} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-base-content/70">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-base-content/40" />
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Alex Vance"
                    {...register("name", { required: true })}
                    className={`input input-bordered h-11 w-full bg-base-200/50 pl-10 text-xs transition-all focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                      errors.name ? "input-error" : ""
                    }`}
                  />
                </div>
                {errors.name?.type === "required" && (
                  <p className="mt-1 text-[11px] text-error font-medium">Name is required.</p>
                )}
              </div>

              {/* Profile Photo */}
              <div>
                <label htmlFor="photo" className="mb-1.5 block text-xs font-semibold text-base-content/70">
                  Profile Photo
                </label>
                <div className="relative">
                  <FaCamera className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-base-content/40 z-10" />
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    {...register("photo", { required: true })}
                    className={`file-input file-input-bordered file-input-sm h-11 w-full bg-base-200/50 pl-10 text-xs transition-all focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                      errors.photo ? "file-input-error" : ""
                    }`}
                  />
                </div>
                {errors.photo?.type === "required" && (
                  <p className="mt-1 text-[11px] text-error font-medium">Profile photo is required.</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-base-content/70">
                  Admin Email
                </label>
                <div className="relative">
                  <FaEnvelope className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-base-content/40" />
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@domain.com"
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
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]).{6,}$/,
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
                  <p className="mt-1 text-[11px] text-error font-medium">Password must be at least 6 characters.</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="mt-1 text-[11px] leading-4 text-error font-medium">
                    Must include upper & lower case, number, and special symbol.
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group btn btn-primary h-12 w-full mt-2 rounded-xl text-xs font-bold tracking-wider uppercase shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating Account...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    Create Admin Account
                    <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                )}
              </button>
            </fieldset>
          </form>

          {/* Social Register Option */}
          <div className="mt-6">
            <SocialLogin role="admin" />
          </div>

          {/* Navigation Link */}
          <div className="mt-6 border-t border-base-content/10 pt-4 text-center">
            <p className="text-xs text-base-content/60">
              Already have an admin account?{" "}
              <Link
                state={location.state}
                to="/admin-login"
                className="font-bold text-primary hover:underline"
              >
                Admin Login
              </Link>
            </p>
          </div>

          {/* Key Features Indicator */}
          <div className="mt-5 flex items-center justify-between border-t border-base-content/5 pt-4 text-[11px] font-medium text-base-content/40">
            <div className="flex items-center gap-1.5">
              <FaCheckCircle className="text-primary text-xs" />
              <span>Full System Controls</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaCheckCircle className="text-primary text-xs" />
              <span>Encrypted Credentials</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;