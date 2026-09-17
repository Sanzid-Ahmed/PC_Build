import React, { useRef, useState } from "react";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const Coverage = ({ serviceCenters }) => {
  const position = [23.685, 90.3563];

  const mapRef = useRef(null);

  const [searchError, setSearchError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const location =
      e.target.location.value.trim();

    if (!location) {
      setSearchError(
        "Please enter a district name."
      );
      return;
    }

    const district = serviceCenters.find((center) =>
      center.district
        .toLowerCase()
        .includes(location.toLowerCase())
    );

    if (district) {
      const coord = [
        district.latitude,
        district.longitude,
      ];

      if (mapRef.current) {
        mapRef.current.flyTo(coord, 14, {
          duration: 1.5,
        });
      }

      setSearchError("");
    } else {
      setSearchError(
        `No service center found for "${location}".`
      );
    }
  };

  return (
    <section
      className="
        bg-base-100
        px-4
        pb-16
        pt-[104px]
        sm:px-6
        sm:pb-20
        sm:pt-[112px]
        lg:px-8
      "
    >
      <div className="mx-auto w-full xl:w-10/12">

        {/* =========================
            Header
        ========================== */}

        <div className="mb-8 text-center sm:mb-10">
          <p
            className="
              text-xs
              font-black
              uppercase
              tracking-[0.25em]
              text-primary
              sm:text-sm
            "
          >
            Our Coverage
          </p>

          <h2
            className="
              mt-2
              text-3xl
              font-black
              leading-tight
              text-base-content
              sm:text-4xl
              md:text-5xl
            "
          >
            We are available in{" "}
            <span className="text-primary">
              64 districts
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-base-content/60
              sm:text-base
            "
          >
            Find your nearest ThriftBuild service area
            and explore the districts we currently cover.
          </p>
        </div>

        {/* =========================
            Search
        ========================== */}

        <div className="mx-auto mb-6 max-w-2xl">
          <form
            onSubmit={handleSearch}
            className="
              flex
              flex-col
              gap-2
              sm:flex-row
            "
          >
            <label
              className="
                input
                flex
                w-full
                items-center
                gap-2
                rounded-xl
                border
                border-base-300
                bg-base-100
                shadow-sm
                focus-within:border-primary
                focus-within:outline-none
              "
            >
              <svg
                className="
                  h-5
                  w-5
                  shrink-0
                  text-base-content/40
                "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                  />

                  <path d="m21 21-4.3-4.3" />
                </g>
              </svg>

              <input
                type="search"
                name="location"
                placeholder="Search district..."
                className="
                  grow
                  bg-transparent
                  text-sm
                  text-base-content
                  outline-none
                  placeholder:text-base-content/40
                "
                onChange={() => {
                  if (searchError) {
                    setSearchError("");
                  }
                }}
              />
            </label>

            <button
              type="submit"
              className="
                rounded-xl
                bg-primary
                px-6
                py-3
                text-sm
                font-bold
                text-primary-content
                shadow-md
                shadow-primary/20
                transition-all
                duration-200
                hover:bg-accent
                hover:shadow-lg
                sm:px-8
              "
            >
              Search
            </button>
          </form>

          {searchError && (
            <p
              className="
                mt-2
                text-center
                text-xs
                font-semibold
                text-error
                sm:text-sm
              "
            >
              {searchError}
            </p>
          )}
        </div>

        {/* =========================
            Map
        ========================== */}

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-base-300
            bg-base-200
            shadow-lg
            shadow-base-content/5
            sm:rounded-3xl
          "
        >
          <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={false}
            className="
              h-[500px]
              w-full
              sm:h-[650px]
              lg:h-[800px]
              z-1
            "
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCenters.map((center, index) => (
              <Marker
                key={index}
                position={[
                  center.latitude,
                  center.longitude,
                ]}
              >
                <Popup>
                  <div className="min-w-[180px]">
                    <strong className="text-base-content">
                      {center.district}
                    </strong>

                    <br />

                    <span className="text-sm">
                      Service Area:{" "}
                      {Array.isArray(
                        center.covered_area
                      )
                        ? center.covered_area.join(", ")
                        : center.covered_area}
                      .
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default Coverage;