/ eslint-disable no-unused-vars /

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

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      // 1. Google/Firebase login
      const result = await signInGoogle();

      // 2. Get Firebase user
      const firebaseUser = result.user;

      console.log("Firebase User:", firebaseUser);

      // 3. Get Firebase ID token
      const token = await firebaseUser.getIdToken();

      // 4. Determine build limit from role
      const buildLimit = role === "user" ? 10 : null;

      // 5. Send Firebase user data + role + build limit
      const response = await api.post(
        "/api/users/sync",
        {
          firebase_id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || "Google User",
          role: role,
          build_limit: buildLimit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Backend Response:", response.data);

      // 6. Navigate
      navigate(location.state || "/");

    } catch (error) {
      console.error("Google login failed:", error);

      if (error.response) {
        console.error("Backend Error:", error.response.data);
      }

      if (error.code) {
        console.error("Firebase Error:", error.code);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-8 text-center">
      <p className="mb-2">OR</p>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="
          btn
          w-full
          bg-white
          text-black
          border-[#e5e5e5]
          hover:bg-gray-100
          disabled:opacity-60
        "
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path
              d="m0 0H512V512H0"
              fill="#fff"
            />

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

        {loading ? "Connecting..." : "Login with Google"}
      </button>
    </div>
  );
};

export default SocialLogin;