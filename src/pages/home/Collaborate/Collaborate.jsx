import React from "react";

const Collaborate = () => {
  const partners = [
    {
      name: "Star Tech",
      logo: "", // Add logo path here
    },
    {
      name: "Computer Village",
      logo: "",
    },
    {
      name: "Ryans Computers",
      logo: "",
    },
    {
      name: "TechLand BD",
      logo: "",
    },
    {
      name: "UCC",
      logo: "",
    },
    {
      name: "Global Brand",
      logo: "",
    },
    {
      name: "Skyland Computers",
      logo: "",
    },
    {
      name: "PC House",
      logo: "",
    },
  ];

  const PartnerCard = ({ partner }) => (
    <div
      className="
        group mx-4 flex h-[100px] w-[220px] shrink-0
        items-center justify-center
        rounded-2xl
        border border-[#E5E1D0]
        bg-white
        px-6
        shadow-[0_4px_20px_rgba(40,54,24,0.06)]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-[#DDA15E]
        hover:shadow-[0_10px_30px_rgba(40,54,24,0.12)]
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
            border border-[#E5E1D0]
            bg-[#F7F5EA]
            p-2
            transition-all duration-300
            group-hover:border-[#DDA15E]/60
            group-hover:bg-[#FFF8ED]
          "
        >
          {partner.logo ? (
            <img
              src={partner.logo}
              alt={`${partner.name} logo`}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="h-8 w-8 rounded-lg bg-[#E5E1D0]" />
          )}
        </div>

        {/* Partner Name */}
        <div className="min-w-0">
          <p
            className="
              whitespace-nowrap
              text-sm font-bold
              text-[#283618]
              transition-colors duration-300
              group-hover:text-[#606C38]
              sm:text-base
            "
          >
            {partner.name}
          </p>

          <div className="mt-2 h-[2px] w-8 rounded-full bg-[#DDA15E] transition-all duration-300 group-hover:w-12" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="my-5 w-full overflow-hidden py-12 sm:py-14">
      {/* ================= HEADING ================= */}
      <div className="mb-10 px-6 text-center">
        {/* Small Label */}
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#DDA15E]" />

          <span
            className="
              text-xs font-bold
              uppercase tracking-[0.3em]
              text-[#BC6C25]
            "
          >
            Our Partners
          </span>

          <span className="h-px w-8 bg-[#DDA15E]" />
        </div>

        {/* Heading */}
        <h2
          className="
            text-3xl font-bold
            tracking-tight
            text-[#283618]
            sm:text-4xl
          "
        >
          Collaborate With
        </h2>

        {/* Description */}
        <p
          className="
            mx-auto mt-3
            max-w-2xl
            text-sm leading-relaxed
            text-[#6B705C]
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
            absolute left-0 top-0 z-10
            h-full w-24
            bg-gradient-to-r
            from-[#F7F5EA]
            via-[#F7F5EA]/90
            to-transparent
            sm:w-48
          "
        />

        {/* Right Fade */}
        <div
          className="
            pointer-events-none
            absolute right-0 top-0 z-10
            h-full w-24
            bg-gradient-to-l
            from-[#F7F5EA]
            via-[#F7F5EA]/90
            to-transparent
            sm:w-48
          "
        />

        {/* ================= MOVING TRACK ================= */}
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
                <span className="h-1.5 w-1.5 rounded-full bg-[#DDA15E]" />
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
                <span className="h-1.5 w-1.5 rounded-full bg-[#DDA15E]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= BOTTOM ACCENT ================= */}
      <div className="mt-10 flex justify-center">
        <div className="h-1 w-16 rounded-full bg-[#606C38]" />
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