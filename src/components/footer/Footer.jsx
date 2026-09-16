import React from "react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-base-100">

      {/* ================= MAIN FOOTER ================= */}
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* ================= BRAND ================= */}
          <div className="sm:col-span-2 lg:col-span-1">

            <h2 className="text-2xl font-bold tracking-tight text-base-100">
              Thrift
              <span className="text-soft-accent">Build</span>
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-base-300">
              Build your dream PC without overspending. Compare components,
              discover better prices, and create a system that fits your needs.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-base-300/20
                  bg-neutral/60
                  text-sm font-semibold
                  text-base-300
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-primary
                  hover:bg-primary
                  hover:text-white
                "
              >
                f
              </a>

              <a
                href="#"
                aria-label="X"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-base-300/20
                  bg-neutral/60
                  text-sm font-semibold
                  text-base-300
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-primary
                  hover:bg-primary
                  hover:text-white
                "
              >
                X
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-base-300/20
                  bg-neutral/60
                  text-sm font-semibold
                  text-base-300
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-primary
                  hover:bg-primary
                  hover:text-white
                "
              >
                in
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-base-300/20
                  bg-neutral/60
                  text-sm font-semibold
                  text-base-300
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-accent
                  hover:bg-accent
                  hover:text-white
                "
              >
                ▶
              </a>

            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-base-100">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-sm">

              <li>
                <a
                  href="#"
                  className="text-base-300 transition-colors duration-300 hover:text-soft-accent"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-base-300 transition-colors duration-300 hover:text-soft-accent"
                >
                  PC Builder
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-base-300 transition-colors duration-300 hover:text-soft-accent"
                >
                  Components
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-base-300 transition-colors duration-300 hover:text-soft-accent"
                >
                  Compare Prices
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-base-300 transition-colors duration-300 hover:text-soft-accent"
                >
                  About Us
                </a>
              </li>

            </ul>
          </div>

          {/* ================= SERVICES ================= */}
          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-base-100">
              Services
            </h3>

            <ul className="mt-5 space-y-3 text-sm">

              <li>
                <a
                  href="#"
                  className="text-base-300 transition-colors duration-300 hover:text-soft-accent"
                >
                  PC Building
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-base-300 transition-colors duration-300 hover:text-soft-accent"
                >
                  Price Comparison
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-base-300 transition-colors duration-300 hover:text-soft-accent"
                >
                  Component Search
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-base-300 transition-colors duration-300 hover:text-soft-accent"
                >
                  Build Consultation
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-base-300 transition-colors duration-300 hover:text-soft-accent"
                >
                  Market Partners
                </a>
              </li>

            </ul>
          </div>

          {/* ================= CONTACT ================= */}
          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-base-100">
              Get In Touch
            </h3>

            <div className="mt-5 space-y-5 text-sm">

              {/* Email */}
              <div>
                <p className="text-soft-accent font-medium">
                  Email
                </p>

                <a
                  href="mailto:hello@thriftbuild.com"
                  className="
                    mt-1 block
                    text-base-300
                    transition-colors
                    hover:text-base-100
                  "
                >
                  hello@thriftbuild.com
                </a>
              </div>

              {/* Phone */}
              <div>
                <p className="text-soft-accent font-medium">
                  Phone
                </p>

                <a
                  href="tel:+8801000000000"
                  className="
                    mt-1 block
                    text-base-300
                    transition-colors
                    hover:text-base-100
                  "
                >
                  +880 1000-000000
                </a>
              </div>

              {/* Location */}
              <div>
                <p className="text-soft-accent font-medium">
                  Location
                </p>

                <p className="mt-1 text-base-300">
                  Dhaka, Bangladesh
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="border-t border-base-300/20">

        <div
          className="
            mx-auto flex max-w-7xl
            flex-col gap-3
            px-6 py-6
            text-xs text-base-300
            sm:px-8
            md:flex-row md:items-center md:justify-between
            lg:px-10
          "
        >

          <p>
            © {new Date().getFullYear()} ThriftBuild. All rights reserved.
          </p>

          <div className="flex gap-5">

            <a
              href="#"
              className="transition-colors hover:text-soft-accent"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition-colors hover:text-soft-accent"
            >
              Terms of Service
            </a>

          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;