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
        : "text-white hover:bg-white/10 hover:text-primary"
    }`;

  // =========================
  // Mobile NavLink Style
  // =========================
  const mobileNavLinkClass = ({ isActive }) =>
    `rounded-lg px-4 py-3 text-sm font-semibold
    transition-all duration-300
    ${
      isActive
        ? "bg-primary text-white shadow-md"
        : "text-white hover:bg-white/10 hover:text-primary"
    }`;

  return (
    <div
      className="
        fixed
        left-1/2
        top-0
        z-50
        w-full
        -translate-x-1/2
        border-b
        border-white/10
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
                text-white
                hover:bg-white/10
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
                border-white/10
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
          <Link
            to="/"
            className="
              group
              flex
              items-center
              gap-2
              px-2
              text-xl
              font-extrabold
              tracking-tight
            "
          >
            <span
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                bg-primary
                text-sm
                font-black
                text-primary-content
                shadow-md
                transition-all
                duration-300
                group-hover:scale-105
                group-hover:shadow-primary/30
              "
            >
              PC
            </span>

            <span className="text-white">
              PC<span className="text-primary">Builder</span>
            </span>
          </Link>
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
          <NavLink
            to="/build"
            className="
              btn
              rounded-lg
              border-none
              bg-primary
              px-5
              font-bold
              text-primary-content
              shadow-md
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-white
              hover:text-secondary
              hover:shadow-lg
              sm:px-6
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