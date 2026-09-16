import React from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {

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
      name: "Reviews",
      path: "/reviews",
    },
  ];

  // =========================
  // NavLink Style
  // =========================

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-300 ${
      isActive
        ? "bg-primary/10 text-primary font-bold"
        : "text-secondary hover:bg-primary/10 hover:text-primary"
    }`;

  return (
    <div className="fixed top-0 left-0 z-50 w-full border-b border-base-300 bg-base-100 shadow-sm">

      <div className="navbar mx-auto xl:w-10/12">

        {/* =========================
            Navbar Start
        ========================== */}

        <div className="navbar-start">

          {/* Mobile Menu */}

          <div className="dropdown">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-secondary hover:bg-primary/10"
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

            {/* Mobile Links */}

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content z-50 mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 text-secondary shadow-lg"
            >

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

          {/* Logo */}

          <Link
            to="/"
            className="btn btn-ghost text-xl font-bold text-secondary hover:bg-primary/10"
          >
            PC Builder
          </Link>

        </div>

        {/* =========================
            Desktop Menu
        ========================== */}

        <div className="navbar-center hidden lg:flex">

          <ul className="menu menu-horizontal px-1 font-medium">

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

          <NavLink
            to="/build"
            className="
              btn
              border-none
              bg-primary
              px-6
              font-bold
              text-white
              transition-colors
              duration-300
              hover:bg-secondary
            "
          >
            Build Now
          </NavLink>

        </div>

      </div>

    </div>
  );
};

export default Navbar;