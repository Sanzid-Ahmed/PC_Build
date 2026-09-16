import React, { useEffect, useState } from "react";

import hero1 from "../../../assets/hero1.jpg";
import hero2 from "../../../assets/hero2.jpg";
import hero3 from "../../../assets/hero3.jpg";
import hero4 from "../../../assets/hero4.jpg";
import hero5 from "../../../assets/hero5.jpg";

const Banner = () => {
  const slides = [
    {
      image: hero1,
      title: "Build Your Dream PC",
      description:
        "Find the right components, compare prices, and build a powerful PC without overspending.",
      buttonText: "Build Now",
    },
    {
      image: hero2,
      title: "Find The Best Components",
      description:
        "Explore CPUs, GPUs, RAM, storage, and other components from different markets.",
      buttonText: "Explore Components",
    },
    {
      image: hero3,
      title: "Compare Prices Easily",
      description:
        "Compare component prices from multiple sellers and discover better deals for your build.",
      buttonText: "Compare Prices",
    },
    {
      image: hero4,
      title: "Build Smarter, Spend Less",
      description:
        "Create a balanced PC configuration while keeping your budget under control.",
      buttonText: "Start Building",
    },
    {
      image: hero5,
      title: "Your PC. Your Choice.",
      description:
        "Choose the components you need and create a system designed around your performance and budget.",
      buttonText: "Get Started",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[420px] w-full overflow-hidden bg-secondary sm:h-[460px] md:h-[500px] lg:h-[540px]">

      {/* ================= SLIDES ================= */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            current === index
              ? "z-10 opacity-100"
              : "z-0 opacity-0"
          }`}
        >

          {/* ================= IMAGE ================= */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[7000ms] ${
              current === index ? "scale-105" : "scale-100"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />

          {/* ================= OVERLAY ================= */}
          <div className="absolute inset-0 bg-secondary/2" />

          {/* Green gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/55 to-transparent" />

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent" />

          {/* ================= CONTENT ================= */}
          <div className="relative z-20 flex h-full items-center px-6 text-left text-white sm:px-10 md:px-16 lg:px-20">

            <div className="max-w-3xl">

              {/* Small Label */}
              <div
                className={`mb-4 transition-all delay-100 duration-700 ${
                  current === index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <span className="rounded-full border border-soft-accent/50 bg-soft-accent/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-soft-accent">
                  ThriftBuild
                </span>
              </div>

              {/* ================= TITLE ================= */}
              <h1
                className={`text-3xl font-bold leading-tight tracking-tight transition-all duration-1000 sm:text-4xl md:text-5xl lg:text-6xl ${
                  current === index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                {slide.title}
              </h1>

              {/* ================= DESCRIPTION ================= */}
              <p
                className={`mt-4 max-w-2xl text-sm leading-relaxed text-base-200 transition-all delay-200 duration-1000 sm:text-base md:text-lg ${
                  current === index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                {slide.description}
              </p>

              {/* ================= BUTTON ================= */}
              <button
                className={`mt-7 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all delay-300 duration-700 hover:scale-105 hover:bg-accent sm:px-8 sm:py-3 sm:text-base ${
                  current === index
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-8 scale-95 opacity-0"
                }`}
              >
                {slide.buttonText}
              </button>

            </div>
          </div>
        </div>
      ))}

      {/* ================= INDICATORS ================= */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">

        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-500 ${
              current === index
                ? "w-8 bg-soft-accent"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}

      </div>

    </section>
  );
};

export default Banner;