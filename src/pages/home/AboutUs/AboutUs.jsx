import React from "react";
import {
  FaCheckCircle,
  FaSearchDollar,
  FaTools,
  FaHandshake,
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const AboutUs = () => {
  return (
    <section className="w-full mb-10">
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
                bg-[#DDA15E]/20
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
                border-[#606C38]/20
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
                border-[#E5E1D0]
                bg-white
                shadow-[0_15px_40px_rgba(40,54,24,0.10)]
                sm:h-[440px]
              "
            >
              {/* Replace this div with your actual image */}

              <img
                src="/about-pc.jpg"
                alt="PC components and custom PC building"
                className="
                  h-full
                  w-full
                  object-cover
                "
              />

              {/* Image Overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#283618]/80
                  via-transparent
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
                    bg-white/10
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
                      text-[#DDA15E]
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
                border-[#E5E1D0]
                bg-white
                px-5
                py-3
                shadow-lg
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
                  bg-[#606C38]/10
                  text-[#606C38]
                "
              >
                <FaTools />
              </div>

              <div>
                <p className="text-sm font-bold text-[#283618]">
                  Smart Builds
                </p>

                <p className="text-xs text-[#6B705C]">
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
              <span className="h-px w-8 bg-[#DDA15E]" />

              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-[#BC6C25]
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
                text-[#283618]
                sm:text-4xl
                lg:text-5xl
              "
            >
              Building PCs Shouldn't
              <span className="text-[#606C38]"> Break the Budget.</span>
            </h2>

            {/* Description */}

            <p
              className="
                mt-5
                max-w-xl
                text-sm
                leading-7
                text-[#6B705C]
                sm:text-base
              "
            >
              ThriftBuild is designed to make PC building simpler, smarter,
              and more affordable. We bring component information and prices
              from different retailers together so you can make better
              decisions for your build.
            </p>

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-7
                text-[#6B705C]
                sm:text-base
              "
            >
              Instead of searching through multiple stores one by one,
              ThriftBuild helps you discover components, compare prices, and
              create a balanced system around your performance and budget.
            </p>

            {/* =================================================
                FEATURES
            ================================================== */}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {/* Feature 1 */}

              <div className="flex items-start gap-3">
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
                    bg-[#606C38]/10
                    text-[#606C38]
                  "
                >
                  <FaSearchDollar />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#283618]">
                    Compare Prices
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#6B705C]">
                    Find competitive prices across different retailers.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}

              <div className="flex items-start gap-3">
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
                    bg-[#DDA15E]/15
                    text-[#BC6C25]
                  "
                >
                  <FaCheckCircle />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#283618]">
                    Smart Selection
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#6B705C]">
                    Choose components that work well together.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}

              <div className="flex items-start gap-3">
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
                    bg-[#DDA15E]/15
                    text-[#BC6C25]
                  "
                >
                  <FaHandshake />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#283618]">
                    Trusted Retailers
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#6B705C]">
                    Discover products from multiple technology retailers.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}

              <div className="flex items-start gap-3">
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
                    bg-[#606C38]/10
                    text-[#606C38]
                  "
                >
                  <FaTools />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#283618]">
                    Build Your Way
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#6B705C]">
                    Create a system around your needs and budget.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                CTA
            ================================================== */}

            <div className="mt-9">
              <button
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[#606C38]
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_8px_20px_rgba(96,108,56,0.20)]
                  transition-all
                  duration-300
                  hover:bg-[#283618]
                  hover:shadow-[0_10px_25px_rgba(40,54,24,0.25)]
                "
              >
                Explore Components

                <FiArrowRight
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM STAT STRIP
        ================================================== */}

      </div>
    </section>
  );
};

export default AboutUs;