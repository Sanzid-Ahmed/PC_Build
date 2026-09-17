import React from "react";

import { Link, NavLink } from "react-router";

import useAuth from "../../hooks/useAuth";

import Logo from "../logo/Logo";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  // =========================
  // All Navbar Links
  // =========================
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Components",
      path: "/components",
    },
    {
      name: "Build PC",
      path: "/build-pc",
    },
    {
      name: "About Us",
      path: "/about-us",
    },
  ];

  // =========================
  // Desktop NavLink Style
  // =========================
  const navLinkClass = ({ isActive }) =>
    `relative rounded-lg px-4 py-2 text-sm font-semibold
    transition-all duration-300
    ${
      isActive
        ? "bg-primary text-primary-content shadow-md"
        : "text-secondary-content hover:bg-secondary-content/10 hover:text-primary"
    }`;

  // =========================
  // Mobile NavLink Style
  // =========================
  const mobileNavLinkClass = ({ isActive }) =>
    `rounded-lg px-4 py-3 text-sm font-semibold
    transition-all duration-300
    ${
      isActive
        ? "bg-primary text-primary-content shadow-md"
        : "text-secondary-content hover:bg-secondary-content/10 hover:text-primary"
    }`;

  return (
    <div
      className="
        fixed
        left-1/2
        top-0
        z-55
        w-full
        -translate-x-1/2
        border-b
        border-secondary-content/10
        bg-secondary
        shadow-lg
        backdrop-blur-md
        xl:w-10/12
      "
    >
      <div
        className="
          navbar
          mx-auto
          min-h-[72px]
          px-4
          sm:px-6
          xl:px-6
        "
      >
        {/* =========================
            Navbar Start
        ========================== */}

        <div className="navbar-start">

          {/* Mobile Menu */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="
                btn
                btn-ghost
                mr-1
                text-secondary-content
                hover:bg-secondary-content/10
                hover:text-primary
                lg:hidden
              "
            >
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            {/* Mobile Dropdown */}
            <ul
              tabIndex={-1}
              className="
                menu
                menu-sm
                dropdown-content
                z-50
                mt-3
                w-56
                rounded-xl
                border
                border-secondary-content/10
                bg-secondary
                p-2
                shadow-2xl
              "
            >
              {links.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={mobileNavLinkClass}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <Logo />
        </div>

        {/* =========================
            Desktop Menu
        ========================== */}

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center gap-1 px-1">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={navLinkClass}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* =========================
            Navbar End
        ========================== */}

        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Profile Image */}
              <div
                className="
                  h-10
                  w-10
                  overflow-hidden
                  rounded-full
                  border-2
                  border-primary
                  bg-base-200
                  shadow-md
                "
                title={user.displayName || user.email}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      bg-primary
                      text-sm
                      font-bold
                      text-primary-content
                    "
                  >
                    {(user.displayName || user.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
              </div>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogOut}
                className="
                  btn
                  border-none
                  bg-primary
                  text-primary-content
                  transition-all
                  duration-300
                  hover:bg-accent
                  hover:shadow-md
                "
              >
                Log Out
              </button>

            </div>
          ) : (
            <Link
              to="/login"
              className="
                btn
                border-none
                bg-primary
                text-primary-content
                transition-all
                duration-300
                hover:bg-accent
                hover:shadow-md
              "
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;