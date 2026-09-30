import React from "react";
import { Link, NavLink } from "react-router";
import { FaShoppingCart } from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import Logo from "../logo/Logo";
import { useCart } from "../../hooks/useCart";

const Navbar = () => {
  const { user, logOut } = useAuth();

  // IMPORTANT:
  // CartProvider provides "cartItemCount"
  const { cartItemCount } = useCart();

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  // =========================
  // ALL NAVBAR LINKS
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
      name: "Custom Build",
      path: "/custom-build",
    },
    {
      name: "My Orders",
      path: "/my-orders",
    },
    {
      name: "About Us",
      path: "/about-us",
    },
  ];

  // =========================
  // DESKTOP NAVLINK STYLE
  // =========================

  const navLinkClass = ({ isActive }) =>
    `relative rounded px-4 py-2 text-sm font-semibold
    transition-all duration-300
    ${
      isActive
        ? "bg-primary text-primary-content shadow-md"
        : "text-secondary-content hover:bg-secondary-content/10 hover:text-primary"
    }`;

  // =========================
  // MOBILE NAVLINK STYLE
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
            NAVBAR START
        ========================== */}

        <div className="navbar-start">

          {/* MOBILE MENU */}

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

            {/* MOBILE DROPDOWN */}

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

          {/* LOGO */}

          <Logo />
        </div>

        {/* =========================
            DESKTOP MENU
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
            NAVBAR END
        ========================== */}

        <div className="navbar-end">

          <div className="flex items-center gap-2 sm:gap-3">

            {/* =========================
                CART BUTTON
            ========================== */}

            <Link
              to="/cart"
              title="Shopping Cart"
              aria-label={`Shopping Cart${
                cartItemCount > 0
                  ? `, ${cartItemCount} items`
                  : ""
              }`}
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-secondary-content/10
                bg-secondary
                text-secondary-content
                transition-all
                duration-300
                hover:border-primary
                hover:bg-primary
                hover:text-primary-content
                hover:shadow-md
                active:scale-95
                sm:h-11
                sm:w-11
              "
            >
              <FaShoppingCart className="text-base sm:text-lg" />

              {/* CART COUNT */}

              {cartItemCount > 0 && (
                <span
                  className="
                    absolute
                    -right-1.5
                    -top-1.5
                    flex
                    min-h-5
                    min-w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    px-1
                    text-[10px]
                    font-extrabold
                    leading-none
                    text-primary-content
                    shadow-md
                    ring-2
                    ring-secondary
                  "
                >
                  {cartItemCount > 99
                    ? "99+"
                    : cartItemCount}
                </span>
              )}
            </Link>

            {/* =========================
                USER
            ========================== */}

            {user ? (
              <>
                {/* PROFILE IMAGE */}

                <div
                  className="
                    h-10
                    w-10
                    overflow-hidden
                    rounded-full
                    border-2
                    border-primary-content
                    bg-base-200
                    shadow-md
                    sm:h-11
                    sm:w-11
                    hover:cursor-pointer
                  "
                  title={user.displayName || user.email}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={
                        user.displayName ||
                        "User profile"
                      }
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
                      {(
                        user.displayName ||
                        user.email ||
                        "U"
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                </div>

                {/* LOGOUT */}

                <button
                  type="button"
                  onClick={handleLogOut}
                  className="
                    px-5
                    py-2
                    rounded
                    bg-primary
                    text-primary-content
                    font-bold
                    transition-all
                    duration-300
                    hover:bg-accent
                    hover:shadow-md
                    hover:cursor-pointer
                  "
                >
                  Log Out
                </button>
              </>
            ) : (
              /* LOGIN */

              <Link
                to="/login"
                className="
                  px-6
                  py-2
                  rounded
                  bg-primary
                  text-primary-content
                  font-bold
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
    </div>
  );
};

export default Navbar;