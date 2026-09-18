import React from "react";
import { Outlet, useNavigate } from "react-router";
import {
  FaArrowLeft,
  FaShieldAlt,
  FaLock,
  FaServer,
} from "react-icons/fa";

import Logo from "../components/logo/Logo";

const AdminAuthLayout = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070709] font-sans selection:bg-primary selection:text-white">
      {/* Dynamic Glowing Ambient Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[35rem] w-[35rem] rounded-full bg-primary/20 blur-[150px] animate-pulse" />
        <div className="absolute -bottom-32 -right-32 h-[35rem] w-[35rem] rounded-full bg-primary/15 blur-[150px] animate-pulse" />

        {/* Tactical Grid Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Radial Orbit Lines */}
        <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 opacity-40" />
        <div className="absolute left-1/2 top-1/2 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 opacity-20" />
      </div>

      {/* Top Header Navigation */}
      <header className="absolute left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-6 lg:px-12">
        <div>
          <Logo />
        </div>

        <button
          type="button"
          onClick={handleGoBack}
          className="group inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:bg-primary/20 active:scale-95"
        >
          <FaArrowLeft className="text-[11px] transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to Main</span>
        </button>
      </header>

      {/* Main Authentication Container */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <div className="w-full max-w-[480px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          
          {/* Top Glowing Accent Line */}
          <div className="h-1 w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50 shadow-[0_0_20px_rgba(229,9,47,0.8)]" />

          {/* Portal Header */}
          <div className="px-6 pt-8 sm:px-10 sm:pt-10">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-[0_8px_25px_rgba(229,9,47,0.4)]">
                <FaShieldAlt className="text-lg" />
              </div>

              <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary shadow-[0_0_15px_rgba(229,9,47,0.2)]">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                <FaLock className="text-[9px]" />
                Encrypted
              </div>
            </div>

            <h1 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Admin Portal
            </h1>

            <p className="mt-2 text-xs leading-relaxed text-white/50">
              Authenticated access point for system parameters and management tools.
            </p>
          </div>

          {/* Dynamic Auth Route Content (Login/Register Forms) */}
          <div className="px-6 pb-8 pt-6 sm:px-10 sm:pb-10">
            <Outlet />
          </div>

          {/* Security Status Bar */}
          <div className="border-t border-white/5 bg-white/[0.02] px-6 py-4 sm:px-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <FaServer className="text-xs" />
                </div>

                <div>
                  <p className="text-[11px] font-bold text-white/80">
                    Protected System Zone
                  </p>
                  <p className="text-[10px] text-white/40">
                    Authorized personnel only
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                System Online
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAuthLayout;