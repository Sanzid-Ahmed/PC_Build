import React from "react";
import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Settings,
  LogOut,
  X,
  Cpu,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    // {
    //   name: "Dashboard",
    //   path: "/admin",
    //   icon: LayoutDashboard,
    //   end: true,
    // },
    // {
    //   name: "Manage Users",
    //   path: "/admin/users",
    //   icon: Users,
    // },
    {
      name: "Manage Users",
      path: "/admin",
      icon: Users,
      end: true,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 transform bg-base-100/90 backdrop-blur-xl border-r border-base-content/10 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Header / Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-base-content/10">
            <NavLink to="/admin" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-content shadow-lg shadow-primary/20">
                <Cpu className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-base-content text-sm">
                  System Admin
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-primary uppercase">
                  Control Center
                </span>
              </div>
            </NavLink>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="btn btn-ghost btn-sm btn-square lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-base-content/40">
              Navigation
            </div>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.end}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
                        : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-base-content/10 space-y-2">
          <div className="flex items-center gap-3 rounded-xl bg-base-200/50 p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-xs font-bold text-base-content">
                Administrator
              </span>
              <span className="text-[10px] text-base-content/50">
                Active Session
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-error hover:bg-error/10 transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;