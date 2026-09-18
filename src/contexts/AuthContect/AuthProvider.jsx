import React, { useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "../../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==============================
  // REGISTER
  // ==============================

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // ==============================
  // LOGIN
  // ==============================

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // ==============================
  // GOOGLE LOGIN
  // ==============================

  const signInGoogle = () => {
    return signInWithPopup(
      auth,
      googleProvider
    );
  };

  // ==============================
  // LOGOUT
  // ==============================

  const logOut = () => {
    return signOut(auth);
  };

  // ==============================
  // UPDATE PROFILE
  // ==============================

  const updateUserProfile = (profile) => {
    if (!auth.currentUser) {
      return Promise.reject(
        new Error("No authenticated user found.")
      );
    }

    return updateProfile(
      auth.currentUser,
      profile
    );
  };

  // ==============================
  // FIREBASE AUTH LISTENER
  // ==============================

  useEffect(() => {
    console.log("AuthProvider: starting auth listener...");

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        console.log(
          "AuthProvider: Firebase user:",
          currentUser
        );

        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error(
          "AuthProvider: auth listener error:",
          error
        );

        setUser(null);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // ==============================
  // AUTH CONTEXT
  // ==============================

  const authInfo = {
    registerUser,
    signInUser,
    signInGoogle,
    logOut,
    updateUserProfile,
    loading,
    user,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;