import React from "react";

const Collaborate = () => {
  const partners = [
    {
      name: "Star Tech",
      logo: "data:image/jpeg;base64,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", // Add logo path here
    },
    {
      name: "Computer Village",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvZE7rkFLQ6PvMyAaNQrtvM9VX3Dr_r5Jdwa1RDG0N_w&s=10",
    },
    {
      name: "Ryans Computers",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2KyWSb6IsWFzrHlDzl8E9uopNmog_e1n4zygmnavbhg&s=10",
    },
    {
      name: "TechLand BD",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJCngsNWW_TTrKgIu4HQoxuLLT6yh6bwXFOuJgCMzkXg&s=10",
    },
    {
      name: "UCC",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSWQF4Xi5sLjzafdMva8CzwMBdlQBZa2Ei6QkW5ccWpA&s=10",
    },
    {
      name: "Global Brand",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCCXduopasa50xldrR6m4eVK44NZK4mscWEU6WyZMnew&s=10",
    },
    {
      name: "Skyland Computers",
      logo: "data:image/png;base64,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",
    },
    {
      name: "PC House",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2NMqxvlY2xsUAJiOjJvSBQRysYu0_Rb1PH07lZhfcHA&s=10",
    },
  ];

  const PartnerCard = ({ partner }) => (
    <div
      className="
        group mx-4 flex h-[100px] w-[220px] shrink-0
        items-center justify-center
        rounded-2xl
        border border-base-300
        bg-base-100
        px-6
        shadow-[0_4px_20px_rgba(10,10,10,0.06)]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-primary
        hover:shadow-[0_12px_30px_rgba(229,9,47,0.12)]
        sm:mx-6
        sm:h-[110px]
        sm:w-[250px]
      "
    >
      <div className="flex w-full items-center gap-4">
        {/* Logo Area */}
        <div
          className="
            flex h-14 w-14 shrink-0
            items-center justify-center
            rounded-xl
            border border-base-300
            bg-base-200
            p-2
            transition-all duration-300
            group-hover:border-primary/50
            group-hover:bg-primary/5
          "
        >
          {partner.logo ? (
            <img
              src={partner.logo}
              alt={`${partner.name} logo`}
              className="
                h-full
                w-full
                object-contain
              "
            />
          ) : (
            <div
              className="
                flex h-8 w-8
                items-center justify-center
                rounded-lg
                bg-primary
                text-xs
                font-black
                text-white
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              PC
            </div>
          )}
        </div>

        {/* Partner Name */}
        <div className="min-w-0">
          <p
            className="
              whitespace-nowrap
              text-sm
              font-bold
              text-base-content
              transition-colors
              duration-300
              group-hover:text-primary
              sm:text-base
            "
          >
            {partner.name}
          </p>

          <div
            className="
              mt-2
              h-[2px]
              w-8
              rounded-full
              bg-primary
              transition-all
              duration-300
              group-hover:w-12
            "
          />
        </div>
      </div>
    </div>
  );

  return (
    <section
      className="
        my-5
        w-full
        overflow-hidden
        bg-base-100
        py-12
        sm:py-14
      "
    >
      {/* ================= HEADING ================= */}

      <div className="mb-10 px-6 text-center">
        {/* Small Label */}
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-primary" />

          <span
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.3em]
              text-primary
            "
          >
            Our Partners
          </span>

          <span className="h-px w-8 bg-primary" />
        </div>

        {/* Heading */}
        <h2
          className="
            text-3xl
            font-extrabold
            tracking-tight
            text-base-content
            sm:text-4xl
          "
        >
          Collaborate With
          <span className=""> Us</span>
        </h2>

        {/* Description */}
        <p
          className="
            mx-auto
            mt-3
            max-w-2xl
            text-sm
            leading-relaxed
            text-base-content/60
            sm:text-base
          "
        >
          We connect with trusted technology retailers to help you discover
          quality PC components at competitive prices.
        </p>
      </div>

      {/* ================= MOVING AREA ================= */}

      <div className="relative w-full overflow-hidden">
        {/* Left Fade */}
        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-10
            h-full
            w-24
            bg-gradient-to-r
            from-base-100
            via-base-100/90
            to-transparent
            sm:w-48
          "
        />

        {/* Right Fade */}
        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-10
            h-full
            w-24
            bg-gradient-to-l
            from-base-100
            via-base-100/90
            to-transparent
            sm:w-48
          "
        />

        {/* Moving Track */}
        <div className="flex w-max animate-[marquee_28s_linear_infinite]">
          {/* FIRST SET */}
          {partners.map((partner, index) => (
            <div
              key={`first-${index}`}
              className="flex items-center"
            >
              <PartnerCard partner={partner} />

              {/* Separator */}
              <div className="mx-2 flex items-center justify-center">
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-primary
                  "
                />
              </div>
            </div>
          ))}

          {/* SECOND SET */}
          {partners.map((partner, index) => (
            <div
              key={`second-${index}`}
              className="flex items-center"
            >
              <PartnerCard partner={partner} />

              {/* Separator */}
              <div className="mx-2 flex items-center justify-center">
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-primary
                  "
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= BOTTOM ACCENT ================= */}

      <div className="mt-10 flex justify-center">
        <div
          className="
            h-1
            w-16
            rounded-full
            bg-primary
            shadow-[0_0_12px_rgba(229,9,47,0.35)]
          "
        />
      </div>

      {/* ================= ANIMATION ================= */}

      <style>
        {`
          @keyframes marquee {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Collaborate;