import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import {
  Menu,
  Bell,
  Search,
  LogOut,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import Sidebar from "../pages/Admin/Sidebar/Sidebar";

const AdminLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      setShowProfileMenu(false);
      navigate("/"); // Navigates to login page after logging out
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-base-300 text-base-content flex font-sans selection:bg-primary selection:text-primary-content">
      {/* Sidebar Component */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-base-content/10 bg-base-100/70 px-4 sm:px-6 backdrop-blur-md">
          {/* Left Header Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="btn btn-ghost btn-square btn-sm lg:hidden border border-base-content/10 hover:bg-base-200"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5 text-base-content/80" />
            </button>

            {/* Global Search Bar */}
            <div className="relative hidden md:block w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40" />
              <input
                type="text"
                placeholder="Search admin dashboard..."
                className="input input-sm w-full pl-9 text-xs bg-base-200/50 border border-base-content/10 focus:border-primary/50 focus:bg-base-100 focus:outline-none transition-all rounded-lg"
              />
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            {/* Quick Status / Notifications */}
            <button className="btn btn-ghost btn-circle btn-sm relative border border-base-content/10 hover:bg-base-200">
              <Bell className="h-4 w-4 text-base-content/70" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
            </button>

            <div className="h-5 w-px bg-base-content/10" />

            {/* Profile Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="flex items-center gap-2.5 rounded-xl border border-base-content/10 bg-base-200/40 p-1.5 transition hover:bg-base-200 hover:border-base-content/20"
              >
                <div className="avatar">
                  <div className="w-7 h-7 rounded-lg ring-1 ring-primary/40">
                    <img
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co/mR4q4Yq/user-placeholder.png"
                      }
                      alt={user?.displayName || "Admin Avatar"}
                    />
                  </div>
                </div>

                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold leading-tight flex items-center gap-1">
                    {user?.displayName || "Admin User"}
                    <Sparkles className="w-3 h-3 text-primary inline" />
                  </span>
                  <span className="text-[10px] text-base-content/50 max-w-[120px] truncate">
                    {user?.email || "admin@system.com"}
                  </span>
                </div>

                <ChevronDown
                  className={`hidden sm:block h-3.5 w-3.5 text-base-content/50 transition-transform duration-200 ${
                    showProfileMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Menu Overlay */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-base-content/10 bg-base-100 shadow-2xl z-50 backdrop-blur-xl">
                  {/* User Details */}
                  <div className="border-b border-base-content/10 p-4 bg-base-200/30">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-xl ring-2 ring-primary/30">
                          <img
                            src={
                              user?.photoURL ||
                              "https://i.ibb.co/mR4q4Yq/user-placeholder.png"
                            }
                            alt={user?.displayName || "Admin Avatar"}
                          />
                        </div>
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">
                          {user?.displayName || "Admin User"}
                        </p>
                        <p className="truncate text-xs text-base-content/50">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-error transition hover:bg-error/10 hover:border hover:border-error/20"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-error/10">
                        <LogOut className="h-3.5 w-3.5" />
                      </div>
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Nested Route Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;