import React from "react";
import {
  FaMicrochip,
  FaMemory,
  FaHdd,
  FaBolt,
  FaDesktop,
  FaKeyboard,
  FaMouse,
  FaFan,
} from "react-icons/fa";
import { BsMotherboard } from "react-icons/bs";
import { MdStorage, MdDeveloperBoard } from "react-icons/md";
import { FiArrowRight, FiShoppingCart } from "react-icons/fi";

const ComponentPills = () => {
  // ================= CATEGORY DATA =================

  const rowOne = [
    {
      name: "Processor",
      icon: FaMicrochip,
    },
    {
      name: "Graphics Card",
      icon: FaDesktop,
    },
    {
      name: "Motherboard",
      icon: BsMotherboard,
    },
    {
      name: "RAM",
      icon: FaMemory,
    },
    {
      name: "SSD",
      icon: MdStorage,
    },
    {
      name: "HDD",
      icon: FaHdd,
    },
  ];

  const rowTwo = [
    {
      name: "Power Supply",
      icon: FaBolt,
    },
    {
      name: "CPU Cooler",
      icon: FaFan,
    },
    {
      name: "Casing",
      icon: MdDeveloperBoard,
    },
    {
      name: "Monitor",
      icon: FaDesktop,
    },
    {
      name: "Keyboard",
      icon: FaKeyboard,
    },
    {
      name: "Mouse",
      icon: FaMouse,
    },
  ];

  // ================= COMPONENT DATA =================

  const components = [
    {
      name: "AMD Ryzen 5 5600",
      category: "Processor",
      price: "৳13,500",
      oldPrice: "৳14,200",
      image: "",
      badge: "Popular",
    },
    {
      name: "NVIDIA GeForce RTX 4060",
      category: "Graphics Card",
      price: "৳38,500",
      oldPrice: "৳41,000",
      image: "",
      badge: "Best Deal",
    },
    {
      name: "Corsair Vengeance 16GB",
      category: "RAM",
      price: "৳5,200",
      oldPrice: "৳5,800",
      image: "",
      badge: "Popular",
    },
    {
      name: "Samsung 990 EVO 1TB",
      category: "SSD",
      price: "৳10,500",
      oldPrice: "৳11,200",
      image: "",
      badge: "New",
    },
  ];

  // ================= PILL COMPONENT =================

  const Pill = ({ item }) => {
    const Icon = item.icon;

    return (
      <div
        className="
          group
          mx-2
          flex
          h-14
          shrink-0
          items-center
          gap-3
          rounded-full
          border
          border-[#E5E1D0]
          bg-white
          px-5
          shadow-[0_4px_15px_rgba(40,54,24,0.06)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[#DDA15E]
          hover:shadow-[0_8px_25px_rgba(40,54,24,0.12)]
          sm:mx-3
          sm:h-16
          sm:px-6
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#F7F5EA]
            text-[#606C38]
            transition-all
            duration-300
            group-hover:bg-[#606C38]
            group-hover:text-white
          "
        >
          <Icon className="text-sm sm:text-base" />
        </div>

        <span
          className="
            whitespace-nowrap
            text-sm
            font-bold
            text-[#283618]
            transition-colors
            duration-300
            group-hover:text-[#606C38]
            sm:text-base
          "
        >
          {item.name}
        </span>

        <span className="h-1.5 w-1.5 rounded-full bg-[#DDA15E]" />
      </div>
    );
  };

  // ================= PRODUCT CARD =================

  const ComponentCard = ({ component }) => {
    return (
      <div
        className="
          group
          overflow-hidden
          rounded-2xl
          border
          border-[#E5E1D0]
          bg-white
          shadow-[0_5px_20px_rgba(40,54,24,0.06)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[#DDA15E]/60
          hover:shadow-[0_12px_30px_rgba(40,54,24,0.12)]
        "
      >
        {/* ================= IMAGE ================= */}

        <div
          className="
            relative
            flex
            h-52
            items-center
            justify-center
            overflow-hidden
            bg-[#F7F5EA]
            p-6
          "
        >
          {/* Badge */}
          <span
            className="
              absolute
              left-4
              top-4
              z-10
              rounded-full
              bg-[#606C38]
              px-3
              py-1
              text-[10px]
              font-bold
              uppercase
              tracking-wider
              text-white
            "
          >
            {component.badge}
          </span>

          {/* Product Image */}

          {component.image ? (
            <img
              src={component.image}
              alt={component.name}
              className="
                h-full
                w-full
                object-contain
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          ) : (
            <div
              className="
                flex
                h-32
                w-32
                items-center
                justify-center
                rounded-2xl
                border
                border-[#E5E1D0]
                bg-white
                text-[#606C38]
              "
            >
              <FaMicrochip className="text-5xl" />
            </div>
          )}
        </div>

        {/* ================= INFORMATION ================= */}

        <div className="p-5">
          {/* Category */}

          <p
            className="
              mb-2
              text-[11px]
              font-bold
              uppercase
              tracking-wider
              text-[#BC6C25]
            "
          >
            {component.category}
          </p>

          {/* Name */}

          <h3
            className="
              min-h-[48px]
              text-base
              font-bold
              leading-6
              text-[#283618]
              transition-colors
              group-hover:text-[#606C38]
            "
          >
            {component.name}
          </h3>

          {/* Price */}

          <div className="mt-4 flex items-end gap-2">
            <span className="text-xl font-bold text-[#606C38]">
              {component.price}
            </span>

            <span className="mb-0.5 text-xs text-[#6B705C] line-through">
              {component.oldPrice}
            </span>
          </div>

          {/* Bottom */}

          <div className="mt-5 flex items-center justify-between border-t border-[#E5E1D0] pt-4">
            <button
              className="
                flex
                items-center
                gap-2
                text-xs
                font-bold
                text-[#283618]
                transition-colors
                duration-300
                hover:text-[#606C38]
              "
            >
              View Details
              <FiArrowRight />
            </button>

            <button
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-[#606C38]
                text-white
                transition-all
                duration-300
                hover:bg-[#283618]
              "
              aria-label="Add to cart"
            >
              <FiShoppingCart className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      className="
        my-10
        w-full
        overflow-hidden
        bg-[#FFFEF7]
        py-14
      "
    >
      {/* =====================================================
          HEADING
      ====================================================== */}

      <div className="mb-10 px-6 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
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
            PC Components
          </span>

          <span className="h-px w-8 bg-[#DDA15E]" />
        </div>

        <h2
          className="
            text-3xl
            font-bold
            tracking-tight
            text-[#283618]
            sm:text-4xl
          "
        >
          Everything You Need
        </h2>

        <p
          className="
            mx-auto
            mt-3
            max-w-2xl
            text-sm
            leading-relaxed
            text-[#6B705C]
            sm:text-base
          "
        >
          Explore PC components from different categories and find the right
          parts for your next build.
        </p>
      </div>

      {/* =====================================================
          ANIMATED CATEGORY PILLS
      ====================================================== */}

      {/* ROW 1 */}

      <div className="relative mb-5 w-full overflow-hidden">
        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-10
            h-full
            w-20
            bg-gradient-to-r
            from-[#FFFEF7]
            to-transparent
            sm:w-40
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-10
            h-full
            w-20
            bg-gradient-to-l
            from-[#FFFEF7]
            to-transparent
            sm:w-40
          "
        />

        <div className="flex w-max animate-[componentLeft_25s_linear_infinite]">
          {rowOne.map((item, index) => (
            <Pill key={`row1-first-${index}`} item={item} />
          ))}

          {rowOne.map((item, index) => (
            <Pill key={`row1-second-${index}`} item={item} />
          ))}
        </div>
      </div>

      {/* ROW 2 */}

      <div className="relative w-full overflow-hidden">
        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-10
            h-full
            w-20
            bg-gradient-to-r
            from-[#FFFEF7]
            to-transparent
            sm:w-40
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-10
            h-full
            w-20
            bg-gradient-to-l
            from-[#FFFEF7]
            to-transparent
            sm:w-40
          "
        />

        <div className="flex w-max animate-[componentRight_28s_linear_infinite]">
          {rowTwo.map((item, index) => (
            <Pill key={`row2-first-${index}`} item={item} />
          ))}

          {rowTwo.map((item, index) => (
            <Pill key={`row2-second-${index}`} item={item} />
          ))}
        </div>
      </div>

      {/* =====================================================
          FEATURED COMPONENTS
      ====================================================== */}

      <div className="mx-auto mt-16 max-w-7xl px-6">
        {/* Section Header */}

        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#BC6C25]" />

              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#BC6C25]
                "
              >
                Featured
              </span>
            </div>

            <h3
              className="
                text-2xl
                font-bold
                text-[#283618]
                sm:text-3xl
              "
            >
              Popular Components
            </h3>

            <p className="mt-1 text-sm text-[#6B705C]">
              Some popular choices for your next PC build.
            </p>
          </div>

          {/* View All */}

          <button
            className="
              group
              flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-[#606C38]
              px-5
              py-2.5
              text-sm
              font-bold
              text-[#606C38]
              transition-all
              duration-300
              hover:bg-[#606C38]
              hover:text-white
            "
          >
            View All Components

            <FiArrowRight
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </button>
        </div>

        {/* Product Cards */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {components.map((component, index) => (
            <ComponentCard
              key={index}
              component={component}
            />
          ))}
        </div>
      </div>

      {/* =====================================================
          BOTTOM ACCENT
      ====================================================== */}

      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#DDA15E]" />

          <span className="h-1.5 w-12 rounded-full bg-[#606C38]" />

          <span className="h-1.5 w-1.5 rounded-full bg-[#DDA15E]" />
        </div>
      </div>

      {/* =====================================================
          ANIMATIONS
      ====================================================== */}

      <style>
        {`
          @keyframes componentLeft {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-50%);
            }
          }

          @keyframes componentRight {
            from {
              transform: translateX(-50%);
            }

            to {
              transform: translateX(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default ComponentPills;