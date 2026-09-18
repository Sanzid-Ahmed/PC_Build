import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useApi from "../../../hooks/useApi";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = ({ role }) => {
  const { signInGoogle } = useAuth();
  const api = useApi();

  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGoogleSignIn = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setErrorMessage("");

      // -----------------------------------------
      // 1. Google / Firebase Login
      // -----------------------------------------
      const result = await signInGoogle();
      const firebaseUser = result.user;

      console.log("Firebase User:", firebaseUser);

      // -----------------------------------------
      // 2. Get Firebase ID Token
      // -----------------------------------------
      const token = await firebaseUser.getIdToken();

      // -----------------------------------------
      // 3. Build Limit
      // -----------------------------------------
      const buildLimit = role === "user" ? 10 : null;

      const backendData = {
        firebase_id: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || "Google User",
        role: role,
        build_limit: buildLimit,
      };

      console.log("Sending to Backend:", backendData);

      // -----------------------------------------
      // 4. Sync User With Backend
      // -----------------------------------------
      try {
        const response = await api.post("/api/users/sync", backendData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Backend Response:", response.data);
      } catch (backendError) {
        console.error("Backend sync failed:", backendError);

        // Firebase login already succeeded.
        // Don't log the user out just because Render/backend
        // is temporarily unavailable.
        console.warn(
          "Firebase login successful, but backend sync could not be completed.",
        );
      }

      // -----------------------------------------
      // 5. Determine Redirect Location
      // -----------------------------------------
      let redirectPath;

      if (role === "admin") {
        redirectPath = "/admin";
      } else {
        redirectPath =
          location.state?.from?.pathname ||
          location.state?.pathname ||
          (typeof location.state === "string" ? location.state : "/");
      }

      // -----------------------------------------
      // 6. Navigate
      // -----------------------------------------
      navigate(redirectPath, {
        replace: true,
      });
    } catch (error) {
      console.error("Google login failed:", error);

      // Firebase errors
      if (error?.code) {
        console.error("Firebase Error:", error.code);

        switch (error.code) {
          case "auth/popup-closed-by-user":
            setErrorMessage("Google login was cancelled.");
            break;

          case "auth/popup-blocked":
            setErrorMessage("Google login popup was blocked by your browser.");
            break;

          case "auth/cancelled-popup-request":
            setErrorMessage("Google login was cancelled.");
            break;

          case "auth/network-request-failed":
            setErrorMessage(
              "Network error. Please check your internet connection.",
            );
            break;

          default:
            setErrorMessage("Google login failed. Please try again.");
        }

        return;
      }

      // Backend errors
      if (error?.response) {
        console.error("Backend Error:", error.response.data);

        setErrorMessage(
          error.response.data?.detail || "Unable to connect with the server.",
        );

        return;
      }

      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-8 text-center">
      <p className="mb-3 text-sm text-base-content/60">OR</p>

      {errorMessage && (
        <p className="mb-3 rounded-lg bg-error/10 px-3 py-2 text-sm font-medium text-error">
          {errorMessage}
        </p>
      )}

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="
          btn
          w-full
          border-[#e5e5e5]
          bg-white
          text-black
          shadow-sm
          transition-all
          duration-200
          hover:bg-gray-100
          hover:shadow-md
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Connecting...
          </>
        ) : (
          <>
            <svg
              aria-label="Google logo"
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff" />

                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                />

                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                />

                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                />

                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                />
              </g>
            </svg>
            Login with Google
          </>
        )}
      </button>
    </div>
  );
};

export default SocialLogin;
