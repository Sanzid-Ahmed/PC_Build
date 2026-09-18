import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import hero1 from "../../../assets/hero1.jpg";
import hero2 from "../../../assets/hero2.jpg";
import hero3 from "../../../assets/hero3.jpg";
import hero4 from "../../../assets/hero4.jpg";
import hero5 from "../../../assets/hero5.jpg";

const Banner = () => {
  const navigate = useNavigate();

  // Text styles
  const titleStyle = `
    text-xl
    sm:text-2xl
    md:text-3xl
    lg:text-3xl
    xl:text-[2.5rem]
    font-extrabold
    leading-[1.08]
    tracking-[-0.02em]
  `;

  const descriptionStyle = `
    sm:text-base
    font-medium
    leading-7
    sm:leading-7
    md:leading-8
    tracking-wide
    text-white/70
  `;

  const buttonStyle = `
    text-sm
    sm:text-base
    font-bold
    tracking-wide
  `;

  // Banner slides
  const slides = [
    {
      image: hero1,
      title: "Build Your Dream PC",
      description:
        "Find the right components, compare prices, and build a powerful PC without overspending.",
      buttonText: "Build Now",
      path: "/build-pc",
    },
    {
      image: hero2,
      title: "Find The Best Components",
      description:
        "Explore CPUs, GPUs, RAM, storage, and other components from different markets.",
      buttonText: "Explore Components",
      path: "/components",
    },
    {
      image: hero3,
      title: "Compare Prices Easily",
      description:
        "Compare component prices from multiple sellers and discover better deals for your build.",
      buttonText: "Compare Prices",
      path: "/components",
    },
    {
      image: hero4,
      title: "Build Smarter, Spend Less",
      description:
        "Create a balanced PC configuration while keeping your budget under control.",
      buttonText: "Start Building",
      path: "/build-pc",
    },
    {
      image: hero5,
      title: "Your PC. Your Choice.",
      description:
        "Choose the components you need and create a system designed around your performance and budget.",
      buttonText: "Get Started",
      path: "/build-pc",
    },
  ];

  // Current slide number
  const [currentSlide, setCurrentSlide] = useState(0);

  // Change slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((previousSlide) => {
        return (previousSlide + 1) % slides.length;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      className="
        relative
        mt-18
        h-[420px]
        w-full
        overflow-hidden
        bg-secondary
        sm:h-[460px]
        md:h-[500px]
        lg:h-[540px]
      "
    >
      {/* Slides */}
      {slides.map((slide, index) => {
        const isActive = currentSlide === index;

        return (
          <div
            key={index}
            className={`
              absolute inset-0
              transition-opacity duration-700
              ${isActive ? "z-10 opacity-100" : "z-0 opacity-0"}
            `}
          >
            {/* Background Image */}
            <div
              className={`
                absolute inset-0
                bg-cover bg-center
                transition-transform duration-[7000ms]
                ${isActive ? "scale-105" : "scale-100"}
              `}
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/25" />

            {/* Left dark gradient */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-r
                from-black/95
                via-black/65
                to-transparent
              "
            />

            {/* Red gradient */}
            <div
              className="
                absolute inset-y-0 left-0
                w-[45%]
                bg-gradient-to-r
                from-primary/10
                to-transparent
              "
            />

            {/* Bottom dark gradient */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-black/80
                via-transparent
                to-transparent
              "
            />

            {/* Text Content */}
            <div
              className="
                relative z-20
                flex h-full items-center
                px-6
                text-left
                text-white
                sm:px-10
                md:px-16
                lg:px-20
                xl:px-24
              "
            >
              <div className="max-w-3xl">

                {/* Title */}
                <h1
                  className={`
                    max-w-3xl
                    text-white
                    transition-all
                    duration-1000
                    ${titleStyle}
                    ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                  `}
                >
                  {slide.title}
                </h1>

                {/* Red Line */}
                <div
                  className={`
                    mt-5
                    h-[3px]
                    rounded-full
                    bg-primary
                    shadow-[0_0_12px_rgba(229,9,47,0.5)]
                    transition-all
                    duration-1000
                    ${isActive ? "w-16 opacity-100" : "w-0 opacity-0"}
                  `}
                />

                {/* Description */}
                <p
                  className={`
                    mt-5
                    max-w-xl
                    transition-all
                    delay-200
                    duration-1000
                    ${descriptionStyle}
                    ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-7 opacity-0"
                    }
                  `}
                >
                  {slide.description}
                </p>

                {/* Button */}
                <button
                  onClick={() => navigate(slide.path)}
                  className={`
                    group
                    mt-7
                    inline-flex
                    items-center
                    gap-2
                    rounded-sm
                    border
                    border-primary
                    bg-primary
                    px-1
                    py-1
                    text-white
                    shadow-lg
                    shadow-primary/20
                    transition-all
                    delay-300
                    duration-700
                    hover:-translate-y-1
                    hover:bg-white
                    hover:text-secondary
                    hover:shadow-xl
                    sm:px-5
                    sm:py-2.5
                    hover:cursor-pointer
                    ${buttonStyle}
                    ${
                      isActive
                        ? "translate-y-0 scale-100 opacity-100"
                        : "translate-y-7 scale-95 opacity-0"
                    }
                  `}
                >
                  {slide.buttonText}

                  <span
                    className="
                      text-lg
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom red line */}
      <div
        className="
          absolute
          bottom-0
          left-0
          z-30
          h-1
          w-full
          bg-gradient-to-r
          from-primary
          via-primary/40
          to-transparent
        "
      />
    </section>
  );
};

export default Banner;