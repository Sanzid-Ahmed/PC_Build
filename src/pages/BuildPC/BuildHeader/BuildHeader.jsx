import React from "react";

const BuildHeader = ({ step }) => {
  const steps = [
    "PC Type",
    "Budget",
    "Preferences",
    "Requirements",
    "Result",
  ];

  return (
    <div className="mb-10">
      <div className="mb-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          ThriftBuild
        </p>

        <h1 className="mt-2 text-3xl font-black text-base-content sm:text-4xl md:text-5xl">
          Build Your PC
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-base-content/60 sm:text-base">
          Tell us what you need, and we'll help you create the perfect PC
          configuration.
        </p>
      </div>

      <div className="mx-auto mt-8 flex max-w-4xl items-center justify-between">
        {steps.map((item, index) => {
          const number = index + 1;
          const active = step >= number;

          return (
            <React.Fragment key={item}>
              <div className="flex min-w-0 flex-col items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                    active
                      ? "bg-primary text-primary-content shadow-md shadow-primary/20"
                      : "border border-base-300 bg-base-100 text-base-content/60"
                  }`}
                >
                  {number}
                </div>

                <span
                  className={`mt-2 hidden text-xs font-semibold sm:block ${
                    active
                      ? "text-base-content"
                      : "text-base-content/60"
                  }`}
                >
                  {item}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`mx-2 h-1 flex-1 rounded-full transition-all duration-300 ${
                    step > number
                      ? "bg-primary"
                      : "bg-base-300"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default BuildHeader;