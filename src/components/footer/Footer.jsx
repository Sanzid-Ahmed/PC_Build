import React from "react";

import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaSearchDollar,
  FaTools,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

import { FiArrowUpRight } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-white">

      {/* ================= MAIN FOOTER ================= */}

      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* ================= BRAND ================= */}

          <div className="sm:col-span-2 lg:col-span-1">

            {/* Logo */}

            <h2 className="text-2xl font-extrabold tracking-tight">
              Thrift
              <span className="text-[#E5092F]">Build</span>
            </h2>

            {/* Description */}

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">
              Build your dream PC without overspending. Compare components,
              discover better prices, and create a system that fits your
              needs and budget.
            </p>

            {/* Small Red Line */}

            <div className="mt-6 h-1 w-12 rounded-full bg-[#E5092F]" />

            {/* Social Links */}

            <div className="mt-6 flex gap-3">

              {/* Facebook */}

              <a
                href="#"
                aria-label="Facebook"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-white/10
                  bg-white/5
                  text-white/60
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#E5092F]
                  hover:bg-[#E5092F]
                  hover:text-white
                  hover:shadow-[0_8px_20px_rgba(229,9,47,0.25)]
                "
              >
                <FaFacebookF size={14} />
              </a>

              {/* X */}

              <a
                href="#"
                aria-label="X"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-white/10
                  bg-white/5
                  text-sm font-bold
                  text-white/60
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#E5092F]
                  hover:bg-[#E5092F]
                  hover:text-white
                  hover:shadow-[0_8px_20px_rgba(229,9,47,0.25)]
                "
              >
                X
              </a>

              {/* LinkedIn */}

              <a
                href="#"
                aria-label="LinkedIn"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-white/10
                  bg-white/5
                  text-white/60
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#E5092F]
                  hover:bg-[#E5092F]
                  hover:text-white
                  hover:shadow-[0_8px_20px_rgba(229,9,47,0.25)]
                "
              >
                <FaLinkedinIn size={14} />
              </a>

              {/* YouTube */}

              <a
                href="#"
                aria-label="YouTube"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-white/10
                  bg-white/5
                  text-white/60
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#E5092F]
                  hover:bg-[#E5092F]
                  hover:text-white
                  hover:shadow-[0_8px_20px_rgba(229,9,47,0.25)]
                "
              >
                <FaYoutube size={15} />
              </a>

            </div>
          </div>


          {/* ================= QUICK LINKS ================= */}

          <div>

            <h3
              className="
                text-sm
                font-bold
                uppercase
                tracking-[0.18em]
                text-white
              "
            >
              Quick Links
            </h3>

            <div className="mt-3 h-px w-8 bg-[#E5092F]" />

            <ul className="mt-5 space-y-3 text-sm">

              <li>
                <a
                  href="#"
                  className="
                    group flex items-center gap-1
                    text-white/55
                    transition-colors duration-300
                    hover:text-[#E5092F]
                  "
                >
                  Home
                  <FiArrowUpRight
                    className="
                      opacity-0
                      transition-all duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                  />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    group flex items-center gap-1
                    text-white/55
                    transition-colors duration-300
                    hover:text-[#E5092F]
                  "
                >
                  PC Builder
                  <FiArrowUpRight
                    className="
                      opacity-0
                      transition-all duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                  />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    group flex items-center gap-1
                    text-white/55
                    transition-colors duration-300
                    hover:text-[#E5092F]
                  "
                >
                  Components
                  <FiArrowUpRight
                    className="
                      opacity-0
                      transition-all duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                  />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    group flex items-center gap-1
                    text-white/55
                    transition-colors duration-300
                    hover:text-[#E5092F]
                  "
                >
                  Compare Prices
                  <FiArrowUpRight
                    className="
                      opacity-0
                      transition-all duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                  />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    group flex items-center gap-1
                    text-white/55
                    transition-colors duration-300
                    hover:text-[#E5092F]
                  "
                >
                  About Us
                  <FiArrowUpRight
                    className="
                      opacity-0
                      transition-all duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                  />
                </a>
              </li>

            </ul>
          </div>


          {/* ================= SERVICES ================= */}

          <div>

            <h3
              className="
                text-sm
                font-bold
                uppercase
                tracking-[0.18em]
                text-white
              "
            >
              Services
            </h3>

            <div className="mt-3 h-px w-8 bg-[#E5092F]" />

            <ul className="mt-5 space-y-3 text-sm">

              <li>
                <a
                  href="#"
                  className="
                    text-white/55
                    transition-colors duration-300
                    hover:text-[#E5092F]
                  "
                >
                  PC Building
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    text-white/55
                    transition-colors duration-300
                    hover:text-[#E5092F]
                  "
                >
                  Price Comparison
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    text-white/55
                    transition-colors duration-300
                    hover:text-[#E5092F]
                  "
                >
                  Component Search
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    text-white/55
                    transition-colors duration-300
                    hover:text-[#E5092F]
                  "
                >
                  Build Consultation
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    text-white/55
                    transition-colors duration-300
                    hover:text-[#E5092F]
                  "
                >
                  Market Partners
                </a>
              </li>

            </ul>
          </div>


          {/* ================= CONTACT ================= */}

          <div>

            <h3
              className="
                text-sm
                font-bold
                uppercase
                tracking-[0.18em]
                text-white
              "
            >
              Get In Touch
            </h3>

            <div className="mt-3 h-px w-8 bg-[#E5092F]" />

            <div className="mt-5 space-y-5 text-sm">

              {/* Email */}

              <div className="flex items-start gap-3">

                <div
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-[#E5092F]/10
                    text-[#E5092F]
                  "
                >
                  <FaEnvelope size={13} />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    Email
                  </p>

                  <a
                    href="mailto:hello@thriftbuild.com"
                    className="
                      mt-1 block
                      text-white/55
                      transition-colors
                      hover:text-[#E5092F]
                    "
                  >
                    hello@thriftbuild.com
                  </a>
                </div>

              </div>


              {/* Phone */}

              <div className="flex items-start gap-3">

                <div
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-[#E5092F]/10
                    text-[#E5092F]
                  "
                >
                  <FaPhone size={13} />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    Phone
                  </p>

                  <a
                    href="tel:+8801000000000"
                    className="
                      mt-1 block
                      text-white/55
                      transition-colors
                      hover:text-[#E5092F]
                    "
                  >
                    +880 1000-000000
                  </a>
                </div>

              </div>


              {/* Location */}

              <div className="flex items-start gap-3">

                <div
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-[#E5092F]/10
                    text-[#E5092F]
                  "
                >
                  <FaMapMarkerAlt size={13} />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    Location
                  </p>

                  <p className="mt-1 text-white/55">
                    Dhaka, Bangladesh
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>


      {/* ================= BOTTOM BAR ================= */}

      <div className="border-t border-white/10">

        <div
          className="
            mx-auto flex max-w-7xl
            flex-col gap-4
            px-6 py-6
            text-xs text-white/45
            sm:px-8
            md:flex-row
            md:items-center
            md:justify-between
            lg:px-10
          "
        >

          <p>
            © {new Date().getFullYear()} ThriftBuild. All rights reserved.
          </p>

          <div className="flex gap-5">

            <a
              href="#"
              className="
                transition-colors
                hover:text-[#E5092F]
              "
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="
                transition-colors
                hover:text-[#E5092F]
              "
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
