import React from "react";
import { Link, useLoaderData } from "react-router";

import Coverage from "./Coverage/Coverage";

const AboutUs = () => {
  const serviceCenters = useLoaderData();

  return (
    <div className="bg-base-100 text-base-content">

      {/* =====================================================
          01 — COVERAGE
      ====================================================== */}

      <Coverage serviceCenters={serviceCenters} />


      {/* =====================================================
          02 — OUR MISSION
      ====================================================== */}

      <section
        className="
          px-5
          py-20
          sm:px-6
          md:px-10
          md:py-28
          lg:px-20
        "
      >
        <div className="mx-auto w-full xl:w-10/12">

          <div
            className="
              grid
              items-center
              gap-14
              lg:grid-cols-2
              lg:gap-24
            "
          >

            {/* LEFT */}

            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-[2px] w-10 bg-primary" />

                <span
                  className="
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-primary
                  "
                >
                  About PC Building
                </span>
              </div>

              <h2
                className="
                  text-4xl
                  font-black
                  leading-[1.05]
                  text-base-content
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Your PC.
                <br />

                <span className="text-primary">
                  Your Choice.
                </span>

                <br />

                Our Job to Find the Price.
              </h2>

              <p
                className="
                  mt-8
                  max-w-xl
                  text-lg
                  leading-8
                  text-base-content/60
                "
              >
                Building a PC shouldn't mean visiting
                dozens of stores, checking hundreds of
                products, and comparing prices manually.
              </p>

              <p
                className="
                  mt-5
                  max-w-xl
                  text-lg
                  leading-8
                  text-base-content/60
                "
              >
                We collect PC component information from
                different sellers and markets across
                Bangladesh and bring it together in one
                simple platform.
              </p>

              <div className="mt-10 flex flex-wrap gap-5">

                {/* Compare Prices */}

                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-primary
                      font-bold
                      text-primary-content
                    "
                  >
                    ✓
                  </div>

                  <span className="font-semibold text-base-content">
                    Compare Prices
                  </span>
                </div>

                {/* Explore Components */}

                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-secondary
                      font-bold
                      text-secondary-content
                    "
                  >
                    ✓
                  </div>

                  <span className="font-semibold text-base-content">
                    Explore Components
                  </span>
                </div>

              </div>
            </div>


            {/* RIGHT */}

            <div className="relative">

              <div
                className="
                  absolute
                  -right-5
                  -top-5
                  h-32
                  w-32
                  rounded-full
                  bg-primary
                  opacity-10
                "
              />

              <div
                className="
                  relative
                  rounded-3xl
                  border
                  border-base-300
                  bg-base-200
                  p-6
                  md:p-8
                "
              >

                <div
                  className="
                    mb-7
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div>
                    <p className="text-sm text-base-content/50">
                      Example Price Comparison
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-base-content">
                      RTX 4060
                    </h3>
                  </div>

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-secondary
                      text-sm
                      font-bold
                      text-secondary-content
                    "
                  >
                    GPU
                  </div>
                </div>


                {[
                  ["Seller 01", "৳42,000"],
                  ["Seller 02", "৳39,500"],
                  ["Seller 03", "৳41,200"],
                ].map(([seller, price]) => (
                  <div
                    key={seller}
                    className="
                      mb-3
                      rounded-2xl
                      border
                      border-base-300
                      bg-base-100
                      p-5
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <div>
                        <p className="font-bold text-base-content">
                          {seller}
                        </p>

                        <p className="mt-1 text-sm text-base-content/50">
                          Available
                        </p>
                      </div>

                      <p className="font-bold text-base-content">
                        {price}
                      </p>
                    </div>
                  </div>
                ))}


                {/* Lowest Price */}

                <div
                  className="
                    mt-6
                    rounded-2xl
                    bg-primary
                    p-5
                    text-primary-content
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div>
                      <p className="text-sm opacity-80">
                        Lowest Available Price
                      </p>

                      <p className="mt-1 text-3xl font-black">
                        ৳39,500
                      </p>
                    </div>

                    <span className="text-3xl">
                      ↓
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          03 — HOW IT WORKS
      ====================================================== */}

      <section
        className="
          bg-base-200
          px-5
          py-20
          sm:px-6
          md:px-10
          md:py-28
          lg:px-20
        "
      >
        <div className="mx-auto w-full xl:w-10/12">

          <div className="max-w-2xl">

            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-primary" />

              <span
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-primary
                "
              >
                How It Works
              </span>
            </div>

            <h2
              className="
                text-4xl
                font-black
                leading-tight
                text-base-content
                sm:text-5xl
              "
            >
              From hundreds of sellers

              <span className="text-primary">
                {" "}to one simple experience.
              </span>
            </h2>

            <p
              className="
                mt-6
                text-lg
                leading-8
                text-base-content/60
              "
            >
              We make finding PC components easier by
              bringing product information and prices
              together.
            </p>

          </div>


          <div
            className="
              mt-14
              grid
              gap-5
              md:grid-cols-2
              lg:grid-cols-4
            "
          >
            {[
              {
                number: "01",
                title: "Collect",
                text:
                  "We gather PC component information from different sellers and markets across Bangladesh.",
              },
              {
                number: "02",
                title: "Compare",
                text:
                  "Products and prices are organized so you can quickly explore different options.",
              },
              {
                number: "03",
                title: "Build",
                text:
                  "Select your CPU, GPU, RAM, motherboard, storage and other components.",
              },
              {
                number: "04",
                title: "Buy",
                text:
                  "Once your configuration is ready, choose the components you want and complete your purchase.",
              },
            ].map((step, index) => (
              <div
                key={step.number}
                className={`
                  group
                  rounded-3xl
                  border
                  p-7
                  transition-all
                  duration-300
                  ${
                    index === 3
                      ? "border-secondary bg-secondary text-secondary-content hover:bg-primary"
                      : "border-base-300 bg-base-100 text-base-content hover:border-primary"
                  }
                `}
              >
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-primary
                    text-xl
                    font-black
                    text-primary-content
                  "
                >
                  {step.number}
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {step.title}
                </h3>

                <p
                  className={`
                    mt-4
                    leading-7
                    ${
                      index === 3
                        ? "text-secondary-content/70 group-hover:text-primary-content/90"
                        : "text-base-content/60"
                    }
                  `}
                >
                  {step.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =====================================================
          04 — BUILD AROUND YOUR BUDGET
      ====================================================== */}

      <section
        className="
          px-5
          py-20
          sm:px-6
          md:px-10
          md:py-28
          lg:px-20
        "
      >
        <div className="mx-auto w-full xl:w-10/12">

          <div
            className="
              grid
              items-start
              gap-14
              lg:grid-cols-[1fr_1.4fr]
            "
          >

            {/* LEFT */}

            <div>

              <div className="mb-6 flex items-center gap-3">
                <span className="h-[2px] w-10 bg-primary" />

                <span
                  className="
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-primary
                  "
                >
                  Build Your Way
                </span>
              </div>

              <h2
                className="
                  text-4xl
                  font-black
                  leading-tight
                  text-base-content
                  sm:text-5xl
                "
              >
                Build around your

                <span className="text-primary">
                  {" "}budget.
                </span>
              </h2>

              <p
                className="
                  mt-6
                  text-lg
                  leading-8
                  text-base-content/60
                "
              >
                Everyone has different requirements.
                A gaming PC, workstation, programming
                machine, and everyday computer don't need
                the same components.
              </p>

              <Link
                to="/build-pc"
                className="
                  mt-8
                  inline-flex
                  rounded-xl
                  bg-primary
                  px-7
                  py-3.5
                  font-bold
                  text-primary-content
                  shadow-md
                  shadow-primary/20
                  transition-all
                  duration-300
                  hover:bg-accent
                  hover:shadow-lg
                "
              >
                Start Building →
              </Link>

            </div>


            {/* RIGHT */}

            <div className="space-y-5">

              {[
                {
                  icon: "🎮",
                  label: "Performance",
                  title: "Gaming",
                  text:
                    "Create a powerful gaming setup with the right combination of CPU, GPU, RAM, storage and other components.",
                },
                {
                  icon: "💻",
                  label: "Everyday",
                  title: "Work & Study",
                  text:
                    "Build a balanced and reliable PC for programming, university work, office tasks and everyday use.",
                },
                {
                  icon: "🧠",
                  label: "Professional",
                  title: "Power Users",
                  text:
                    "Choose powerful hardware for software development, content creation, AI workloads and demanding applications.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="
                    group
                    rounded-3xl
                    border
                    border-base-300
                    p-7
                    transition-all
                    duration-300
                    hover:border-primary
                    md:p-9
                  "
                >

                  <div
                    className="
                      flex
                      flex-col
                      justify-between
                      gap-6
                      sm:flex-row
                      sm:items-center
                    "
                  >

                    <div className="flex items-center gap-5">

                      <div
                        className="
                          flex
                          h-16
                          w-16
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          bg-secondary
                          text-2xl
                          text-secondary-content
                          transition-colors
                          group-hover:bg-primary
                          group-hover:text-primary-content
                        "
                      >
                        {item.icon}
                      </div>

                      <div>
                        <p
                          className="
                            text-sm
                            font-bold
                            uppercase
                            tracking-widest
                            text-primary
                          "
                        >
                          {item.label}
                        </p>

                        <h3
                          className="
                            mt-1
                            text-2xl
                            font-black
                            text-base-content
                            md:text-3xl
                          "
                        >
                          {item.title}
                        </h3>
                      </div>

                    </div>

                    <span
                      className="
                        text-3xl
                        text-base-content/50
                        transition-colors
                        group-hover:text-primary
                      "
                    >
                      →
                    </span>

                  </div>

                  <p
                    className="
                      mt-6
                      leading-7
                      text-base-content/60
                    "
                  >
                    {item.text}
                  </p>

                </div>
              ))}

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          05 — FINAL CTA
      ====================================================== */}

      <section
        className="
          px-5
          pb-20
          sm:px-6
          md:px-10
          lg:px-20
        "
      >
        <div className="mx-auto w-full xl:w-10/12">

          <div
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              bg-secondary
              px-7
              py-14
              text-secondary-content
              md:px-14
              md:py-20
            "
          >

            <div
              className="
                absolute
                -right-20
                -top-20
                h-72
                w-72
                rounded-full
                bg-primary
                opacity-20
              "
            />

            <div
              className="
                absolute
                -bottom-32
                -left-20
                h-80
                w-80
                rounded-full
                border-[50px]
                border-primary
                opacity-10
              "
            />

            <div className="relative z-10 max-w-3xl">

              <p
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-primary
                "
              >
                Ready to build?
              </p>

              <h2
                className="
                  mt-4
                  text-4xl
                  font-black
                  leading-tight
                  md:text-6xl
                "
              >
                Your next PC
                <br />
                starts here.
              </h2>

              <p
                className="
                  mt-6
                  max-w-xl
                  text-lg
                  leading-8
                  text-secondary-content/60
                "
              >
                Explore components, compare prices and
                build a PC that fits your needs and budget.
              </p>

              <Link
                to="/components"
                className="
                  mt-8
                  inline-flex
                  rounded-xl
                  bg-primary
                  px-8
                  py-4
                  text-lg
                  font-bold
                  text-primary-content
                  shadow-md
                  shadow-primary/20
                  transition-all
                  duration-300
                  hover:bg-accent
                  hover:shadow-lg
                "
              >
                Explore Components →
              </Link>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;