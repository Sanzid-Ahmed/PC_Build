
/* eslint-disable no-unused-vars */

import React from "react";
import { Outlet } from "react-router";
import Logo from "../components/logo/Logo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="mb-8 flex justify-center bg-secondary p-5">
          <Logo />
        </div>

        {/* Auth Content */}
        <div className="grid min-h-[calc(100vh-140px)] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          
          {/* Form */}
          <div className="flex w-full justify-center">
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </div>

          {/* Image / Illustration Area */}
          <div className="hidden items-center justify-center lg:flex">
            <div className="flex h-[500px] w-full max-w-lg items-center justify-center rounded-3xl border border-base-300 bg-base-200">
              
              {/* Add auth image here later */}
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-4xl font-extrabold text-primary-content">
                  TB
                </div>

                <h2 className="text-3xl font-extrabold text-base-content">
                  Build Smarter.
                </h2>

                <p className="mt-3 max-w-sm text-base leading-7 text-base-content/60">
                  Find the right PC components, compare prices, and build
                  your perfect PC with ThriftBuild.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthLayout;