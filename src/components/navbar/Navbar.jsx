import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-base-100">
      <div className="navbar xl:w-10/12 mx-auto">

        {/* Navbar Start */}
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

            {/* Mobile Dropdown */}
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 text-secondary rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-base-300"
            >
              <li>
                <a className="hover:bg-primary/10 hover:text-primary">
                  Home
                </a>
              </li>

              <li>
                <a className="hover:bg-primary/10 hover:text-primary">
                  Components
                </a>

                <ul className="p-2">
                  <li>
                    <a className="hover:bg-primary/10 hover:text-primary">
                      Products
                    </a>
                  </li>

                  <li>
                    <a className="hover:bg-primary/10 hover:text-primary">
                      Build PC
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <a className="hover:bg-primary/10 hover:text-primary">
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <a className="btn btn-ghost text-xl font-bold text-secondary hover:bg-primary/10">
            PC Builder
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-secondary font-medium">

            <li>
              <a className="hover:bg-primary/10 hover:text-primary">
                Home
              </a>
            </li>

            <li>
              <details>
                <summary className="hover:bg-primary/10 hover:text-primary">
                  Components
                </summary>

                <ul className="p-2 bg-base-100 text-secondary w-40 z-50 shadow-lg border border-base-300 rounded-box">
                  <li>
                    <a className="hover:bg-primary/10 hover:text-primary">
                      CPU
                    </a>
                  </li>

                  <li>
                    <a className="hover:bg-primary/10 hover:text-primary">
                      GPU
                    </a>
                  </li>

                  <li>
                    <a className="hover:bg-primary/10 hover:text-primary">
                      RAM
                    </a>
                  </li>

                  <li>
                    <a className="hover:bg-primary/10 hover:text-primary">
                      Storage
                    </a>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <a className="hover:bg-primary/10 hover:text-primary">
                Build PC
              </a>
            </li>

            <li>
              <a className="hover:bg-primary/10 hover:text-primary">
                Reviews
              </a>
            </li>

          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          <a
            className="
              btn
              bg-primary
              hover:bg-secondary
              text-white
              border-none
              font-bold
              px-6
              transition-colors
              duration-300
            "
          >
            Build Now
          </a>
        </div>

      </div>
    </div>
  );
};

export default Navbar;