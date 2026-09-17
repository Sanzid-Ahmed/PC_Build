import React from "react";
import Coverage from "./Coverage/Coverage";
import { useLoaderData } from "react-router";

const AboutUs = () => {
  const serviceCenters = useLoaderData();

  return (
    <div className="bg-white text-[#0A0A0A]">

      {/* =====================================================
          01 — COVERAGE
      ====================================================== */}
      <section className="px-5 md:px-10 lg:px-20 py-16 md:py-20">

        <div className="max-w-7xl mx-auto">

          <Coverage serviceCenters={serviceCenters} />

        </div>

      </section>


      {/* =====================================================
          02 — OUR MISSION
      ====================================================== */}
      <section className="px-5 md:px-10 lg:px-20 py-20 md:py-28">

        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">

            {/* LEFT */}
            <div>

              <div className="flex items-center gap-3 mb-6">

                <span className="w-10 h-[2px] bg-[#E5092F]"></span>

                <span className="text-[#E5092F] font-bold tracking-[0.2em] uppercase text-sm">
                  About PC Building
                </span>

              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05]">
                Your PC.
                <br />

                <span className="text-[#E5092F]">
                  Your Choice.
                </span>

                <br />

                Our Job to Find the Price.
              </h2>

              <p className="mt-8 text-gray-600 text-lg leading-8 max-w-xl">
                Building a PC shouldn't mean visiting dozens of stores,
                checking hundreds of products, and comparing prices manually.
              </p>

              <p className="mt-5 text-gray-600 text-lg leading-8 max-w-xl">
                We collect PC component information from different sellers
                and markets across Bangladesh and bring it together in one
                simple platform.
              </p>

              <div className="mt-10 flex flex-wrap gap-5">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-[#E5092F] text-white flex items-center justify-center font-bold">
                    ✓
                  </div>

                  <span className="font-semibold">
                    Compare Prices
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-bold">
                    ✓
                  </div>

                  <span className="font-semibold">
                    Explore Components
                  </span>

                </div>

              </div>

            </div>


            {/* RIGHT */}
            <div className="relative">

              <div className="absolute -top-5 -right-5 w-32 h-32 bg-[#E5092F] rounded-full opacity-10"></div>

              <div className="relative bg-[#F5F5F5] rounded-3xl p-6 md:p-8 border border-[#E5E5E5]">

                <div className="flex justify-between items-center mb-7">

                  <div>

                    <p className="text-sm text-gray-500">
                      Example Price Comparison
                    </p>

                    <h3 className="text-2xl font-bold mt-1">
                      RTX 4060
                    </h3>

                  </div>

                  <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center text-sm font-bold">
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
                    className="bg-white rounded-2xl p-5 mb-3 border border-[#E5E5E5]"
                  >

                    <div className="flex justify-between items-center">

                      <div>

                        <p className="font-bold">
                          {seller}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          Available
                        </p>

                      </div>

                      <p className="font-bold">
                        {price}
                      </p>

                    </div>

                  </div>

                ))}


                <div className="mt-6 bg-[#E5092F] text-white rounded-2xl p-5">

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="text-sm opacity-80">
                        Lowest Available Price
                      </p>

                      <p className="text-3xl font-black mt-1">
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
      <section className="bg-[#F5F5F5] px-5 md:px-10 lg:px-20 py-20 md:py-28">

        <div className="max-w-7xl mx-auto">

          <div className="max-w-2xl">

            <div className="flex items-center gap-3 mb-6">

              <span className="w-10 h-[2px] bg-[#E5092F]"></span>

              <span className="text-[#E5092F] font-bold tracking-[0.2em] uppercase text-sm">
                How It Works
              </span>

            </div>

            <h2 className="text-4xl md:text-5xl font-black leading-tight">

              From hundreds of sellers
              <span className="text-[#E5092F]">
                {" "}to one simple experience.
              </span>

            </h2>

            <p className="mt-6 text-gray-600 text-lg leading-8">
              We make finding PC components easier by bringing product
              information and prices together.
            </p>

          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">

            {[
              {
                number: "01",
                title: "Collect",
                text: "We gather PC component information from different sellers and markets across Bangladesh.",
              },
              {
                number: "02",
                title: "Compare",
                text: "Products and prices are organized so you can quickly explore different options.",
              },
              {
                number: "03",
                title: "Build",
                text: "Select your CPU, GPU, RAM, motherboard, storage and other components.",
              },
              {
                number: "04",
                title: "Buy",
                text: "Once your configuration is ready, choose the components you want and complete your purchase.",
              },
            ].map((step, index) => (

              <div
                key={step.number}
                className={`group rounded-3xl p-7 border transition-all duration-300 ${
                  index === 3
                    ? "bg-[#0A0A0A] text-white border-[#0A0A0A] hover:bg-[#E5092F]"
                    : "bg-white border-[#E5E5E5] hover:border-[#E5092F]"
                }`}
              >

                <div className="w-14 h-14 rounded-2xl bg-[#E5092F] text-white flex items-center justify-center text-xl font-black">
                  {step.number}
                </div>

                <h3 className="text-2xl font-bold mt-8">
                  {step.title}
                </h3>

                <p
                  className={`leading-7 mt-4 ${
                    index === 3
                      ? "text-gray-300 group-hover:text-white"
                      : "text-gray-500"
                  }`}
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
      <section className="px-5 md:px-10 lg:px-20 py-20 md:py-28">

        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 items-start">

            {/* LEFT */}
            <div>

              <div className="flex items-center gap-3 mb-6">

                <span className="w-10 h-[2px] bg-[#E5092F]"></span>

                <span className="text-[#E5092F] font-bold tracking-[0.2em] uppercase text-sm">
                  Build Your Way
                </span>

              </div>

              <h2 className="text-4xl md:text-5xl font-black leading-tight">

                Build around your
                <span className="text-[#E5092F]">
                  {" "}budget.
                </span>

              </h2>

              <p className="mt-6 text-gray-600 text-lg leading-8">
                Everyone has different requirements. A gaming PC,
                workstation, programming machine, and everyday computer
                don't need the same components.
              </p>

              <button className="mt-8 bg-[#E5092F] hover:bg-[#FF334F] text-white px-7 py-3.5 rounded-xl font-bold transition-all duration-300">
                Start Building →
              </button>

            </div>


            {/* RIGHT */}
            <div className="space-y-5">

              {[
                {
                  icon: "🎮",
                  label: "Performance",
                  title: "Gaming",
                  text: "Create a powerful gaming setup with the right combination of CPU, GPU, RAM, storage and other components.",
                },
                {
                  icon: "💻",
                  label: "Everyday",
                  title: "Work & Study",
                  text: "Build a balanced and reliable PC for programming, university work, office tasks and everyday use.",
                },
                {
                  icon: "🧠",
                  label: "Professional",
                  title: "Power Users",
                  text: "Choose powerful hardware for software development, content creation, AI workloads and demanding applications.",
                },
              ].map((item) => (

                <div
                  key={item.title}
                  className="group border border-[#E5E5E5] rounded-3xl p-7 md:p-9 hover:border-[#E5092F] transition-all duration-300"
                >

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

                    <div className="flex items-center gap-5">

                      <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#0A0A0A] text-white flex items-center justify-center text-2xl group-hover:bg-[#E5092F] transition-colors">
                        {item.icon}
                      </div>

                      <div>

                        <p className="text-sm text-[#E5092F] font-bold uppercase tracking-widest">
                          {item.label}
                        </p>

                        <h3 className="text-2xl md:text-3xl font-black mt-1">
                          {item.title}
                        </h3>

                      </div>

                    </div>

                    <span className="text-3xl group-hover:text-[#E5092F] transition-colors">
                      →
                    </span>

                  </div>

                  <p className="text-gray-500 leading-7 mt-6">
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
      <section className="px-5 md:px-10 lg:px-20 pb-20">

        <div className="max-w-7xl mx-auto">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#0A0A0A] text-white px-7 md:px-14 py-14 md:py-20">

            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#E5092F] opacity-20"></div>

            <div className="absolute -left-20 -bottom-32 w-80 h-80 rounded-full border-[50px] border-[#E5092F] opacity-10"></div>

            <div className="relative z-10 max-w-3xl">

              <p className="text-[#E5092F] uppercase tracking-[0.2em] font-bold text-sm">
                Ready to build?
              </p>

              <h2 className="text-4xl md:text-6xl font-black leading-tight mt-4">
                Your next PC
                <br />
                starts here.
              </h2>

              <p className="text-gray-400 text-lg leading-8 mt-6 max-w-xl">
                Explore components, compare prices and build a PC
                that fits your needs and budget.
              </p>

              <button className="mt-8 bg-[#E5092F] hover:bg-[#FF334F] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300">
                Explore Components →
              </button>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default AboutUs;