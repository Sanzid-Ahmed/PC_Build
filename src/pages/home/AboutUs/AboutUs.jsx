import React from "react";

import {
  FaCheckCircle,
  FaSearchDollar,
  FaTools,
  FaHandshake,
} from "react-icons/fa";

import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";

const AboutUs = () => {
  return (
    <section className="mb-10 w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ================= MAIN CONTENT ================= */}

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* =================================================
              LEFT - IMAGE
          ================================================== */}

          <div className="relative">

            {/* Decorative Background */}

            <div
              className="
                absolute
                -left-4
                -top-4
                h-24
                w-24
                rounded-2xl
                bg-[#E5092F]/10
                sm:-left-6
                sm:-top-6
              "
            />

            <div
              className="
                absolute
                -bottom-4
                -right-4
                h-28
                w-28
                rounded-2xl
                border
                border-[#E5092F]/20
                sm:-bottom-6
                sm:-right-6
              "
            />

            {/* Image Container */}

            <div
              className="
                relative
                h-[380px]
                overflow-hidden
                rounded-3xl
                border
                border-[#E5E5E5]
                bg-white
                shadow-[0_15px_40px_rgba(10,10,10,0.10)]
                sm:h-[440px]
              "
            >

              {/* Actual Image */}

              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ20HlvJ4kWGPKnuC-1OjzP3711OhMgxKgzXlAGOd93Ig&s=10"
                alt="PC components and custom PC building"
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />

              {/* Image Overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#0A0A0A]/85
                  via-[#0A0A0A]/10
                  to-transparent
                "
              />

              {/* Bottom Label */}

              <div className="absolute bottom-6 left-6 right-6">

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/20
                    bg-black/20
                    p-5
                    backdrop-blur-md
                  "
                >
                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[#FF334F]
                    "
                  >
                    ThriftBuild
                  </p>

                  <p className="mt-1 text-lg font-bold text-white">
                    Build Smarter. Spend Better.
                  </p>
                </div>

              </div>
            </div>

            {/* Floating Badge */}

            <div
              className="
                absolute
                -bottom-5
                -right-2
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-[#E5E5E5]
                bg-white
                px-5
                py-3
                shadow-[0_8px_25px_rgba(10,10,10,0.10)]
                sm:-right-5
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[#E5092F]/10
                  text-[#E5092F]
                "
              >
                <FaTools />
              </div>

              <div>
                <p className="text-sm font-bold text-[#0A0A0A]">
                  Smart Builds
                </p>

                <p className="text-xs text-[#666666]">
                  Better component choices
                </p>
              </div>

            </div>
          </div>

          {/* =================================================
              RIGHT - CONTENT
          ================================================== */}

          <div>

            {/* Label */}

            <div className="mb-4 flex items-center gap-3">

              <span className="h-px w-8 bg-[#E5092F]" />

              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-[#E5092F]
                "
              >
                About Us
              </span>

            </div>

            {/* Heading */}

            <h2
              className="
                max-w-xl
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-[#0A0A0A]
                sm:text-4xl
                lg:text-5xl
              "
            >
              Building PCs Shouldn't
              <span className="text-[#E5092F]">
                {" "}Break the Budget.
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mt-5
                max-w-xl
                text-sm
                leading-7
                text-[#666666]
                sm:text-base
              "
            >
              ThriftBuild is designed to make PC building
              simpler, smarter, and more affordable. We bring
              component information and prices from different
              retailers together so you can make better
              decisions for your build.
            </p>

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-7
                text-[#666666]
                sm:text-base
              "
            >
              Instead of searching through multiple stores one
              by one, ThriftBuild helps you discover components,
              compare prices, and create a balanced system around
              your performance and budget.
            </p>

            {/* =================================================
                FEATURES
            ================================================== */}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              {/* Feature 1 */}

              <div className="group flex items-start gap-3">

                <div
                  className="
                    mt-0.5
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#E5092F]/10
                    text-[#E5092F]
                    transition-all
                    duration-300
                    group-hover:bg-[#E5092F]
                    group-hover:text-white
                  "
                >
                  <FaSearchDollar />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#0A0A0A]">
                    Compare Prices
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#666666]">
                    Find competitive prices across different
                    retailers.
                  </p>
                </div>

              </div>

              {/* Feature 2 */}

              <div className="group flex items-start gap-3">

                <div
                  className="
                    mt-0.5
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#E5092F]/10
                    text-[#E5092F]
                    transition-all
                    duration-300
                    group-hover:bg-[#E5092F]
                    group-hover:text-white
                  "
                >
                  <FaCheckCircle />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#0A0A0A]">
                    Smart Selection
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#666666]">
                    Choose components that work well together.
                  </p>
                </div>

              </div>

              {/* Feature 3 */}

              <div className="group flex items-start gap-3">

                <div
                  className="
                    mt-0.5
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#E5092F]/10
                    text-[#E5092F]
                    transition-all
                    duration-300
                    group-hover:bg-[#E5092F]
                    group-hover:text-white
                  "
                >
                  <FaHandshake />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#0A0A0A]">
                    Trusted Retailers
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#666666]">
                    Discover products from multiple technology
                    retailers.
                  </p>
                </div>

              </div>

              {/* Feature 4 */}

              <div className="group flex items-start gap-3">

                <div
                  className="
                    mt-0.5
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#E5092F]/10
                    text-[#E5092F]
                    transition-all
                    duration-300
                    group-hover:bg-[#E5092F]
                    group-hover:text-white
                  "
                >
                  <FaTools />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#0A0A0A]">
                    Build Your Way
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#666666]">
                    Create a system around your needs and budget.
                  </p>
                </div>

              </div>

            </div>

            {/* =================================================
                CTA
            ================================================== */}

            <div className="mt-9">

              <Link to="/about-us">
                <button
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[#E5092F]
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_8px_20px_rgba(229,9,47,0.20)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#0A0A0A]
                  hover:shadow-[0_10px_25px_rgba(10,10,10,0.20)]
                "
              >
                Explore About Us 

                <FiArrowRight
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>
              </Link>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;