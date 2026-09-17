import React from "react";

const BuildQuestions = ({
  step,
  requirements,
  updateRequirement,
  nextStep,
  previousStep,
  generateBuild,
}) => {
  const types = [
    {
      value: "Gaming",
      emoji: "🎮",
      description:
        "Gaming, FPS, AAA games and high performance",
    },
    {
      value: "Professional",
      emoji: "💼",
      description:
        "Office, programming, business and productivity",
    },
    {
      value: "AI & ML",
      emoji: "🤖",
      description:
        "AI development, machine learning and data science",
    },
    {
      value: "Content Creation",
      emoji: "🎬",
      description:
        "Video editing, rendering and creative work",
    },
    {
      value: "General",
      emoji: "🖥️",
      description:
        "Everyday use, browsing, study and entertainment",
    },
  ];

  const budgets = [
    "৳50,000 - ৳70,000",
    "৳70,000 - ৳100,000",
    "৳100,000 - ৳150,000",
    "৳150,000 - ৳200,000",
    "৳200,000+",
  ];

  const priorities = [
    "Maximum Performance",
    "Best Value for Money",
    "Future Upgradeability",
    "Low Power Consumption",
    "Balanced Build",
  ];

  const ramOptions = [
    "8GB",
    "16GB",
    "32GB",
    "64GB",
  ];

  // Only offer storage options that currently
  // have realistic support in the database.
  const storageOptions = [
    "512GB SSD",
    "1TB SSD + 1TB HDD",
  ];

  const canContinue = () => {
    if (step === 1) {
      return requirements.type !== "";
    }

    if (step === 2) {
      return requirements.budget !== "";
    }

    if (step === 3) {
      return requirements.priority !== "";
    }

    if (step === 4) {
      return (
        requirements.ram !== "" &&
        requirements.storage !== ""
      );
    }

    return true;
  };

  return (
    <div className="mx-auto max-w-5xl rounded-3xl border border-[#E5E1D0] bg-white p-5 shadow-[0_10px_40px_rgba(40,54,24,0.06)] sm:p-8 md:p-10">

      {/* ======================================
          STEP 1
      ====================================== */}

      {step === 1 && (
        <div>
          <QuestionTitle
            number="01"
            title="What type of PC do you want?"
            description="Choose what you mainly want to use your computer for."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {types.map((item) => {
              const selected =
                requirements.type === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    updateRequirement(
                      "type",
                      item.value
                    )
                  }
                  className={`rounded-2xl border p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                    selected
                      ? "border-[#606C38] bg-[#F7F5EA] ring-2 ring-[#606C38]/20"
                      : "border-[#E5E1D0] bg-white hover:border-[#BC6C25]"
                  }`}
                >
                  <div className="text-3xl">
                    {item.emoji}
                  </div>

                  <h3 className="mt-4 font-bold text-[#283618]">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-sm leading-5 text-[#6B705C]">
                    {item.description}
                  </p>

                  <div
                    className={`mt-4 h-5 w-5 rounded-full border-2 ${
                      selected
                        ? "border-[#606C38] bg-[#606C38]"
                        : "border-[#D5D1C0]"
                    }`}
                  >
                    {selected && (
                      <div className="m-1 h-2.5 w-2.5 rounded-full bg-white" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================
          STEP 2
      ====================================== */}

      {step === 2 && (
        <div>
          <QuestionTitle
            number="02"
            title="What's your budget?"
            description="We'll use your budget to find the best combination of components."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {budgets.map((budget) => {
              const selected =
                requirements.budget === budget;

              return (
                <button
                  key={budget}
                  type="button"
                  onClick={() =>
                    updateRequirement(
                      "budget",
                      budget
                    )
                  }
                  className={`rounded-2xl border p-6 text-left transition-all ${
                    selected
                      ? "border-[#606C38] bg-[#F7F5EA] ring-2 ring-[#606C38]/20"
                      : "border-[#E5E1D0] hover:border-[#BC6C25] hover:shadow-md"
                  }`}
                >
                  <p className="text-sm font-medium text-[#6B705C]">
                    Estimated budget
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-[#283618]">
                    {budget}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================
          STEP 3
      ====================================== */}

      {step === 3 && (
        <div>
          <QuestionTitle
            number="03"
            title="What's most important to you?"
            description="Tell us what the build should prioritize."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {priorities.map((priority) => {
              const selected =
                requirements.priority === priority;

              return (
                <button
                  key={priority}
                  type="button"
                  onClick={() =>
                    updateRequirement(
                      "priority",
                      priority
                    )
                  }
                  className={`rounded-2xl border p-5 text-left transition-all ${
                    selected
                      ? "border-[#606C38] bg-[#F7F5EA] ring-2 ring-[#606C38]/20"
                      : "border-[#E5E1D0] hover:border-[#BC6C25] hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#283618]">
                      {priority}
                    </span>

                    <span
                      className={`h-5 w-5 rounded-full border-2 ${
                        selected
                          ? "border-[#606C38] bg-[#606C38]"
                          : "border-[#D5D1C0]"
                      }`}
                    >
                      {selected && (
                        <span className="m-1 block h-2.5 w-2.5 rounded-full bg-white" />
                      )}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================
          STEP 4
      ====================================== */}

      {step === 4 && (
        <div>
          <QuestionTitle
            number="04"
            title="Tell us your requirements"
            description="These preferences will help us create a more suitable build."
          />

          <div className="grid gap-8 md:grid-cols-2">

            {/* RAM */}

            <div>
              <label className="mb-3 block text-sm font-bold text-[#283618]">
                Preferred RAM
              </label>

              <div className="grid grid-cols-2 gap-3">
                {ramOptions.map((ram) => {
                  const selected =
                    requirements.ram === ram;

                  return (
                    <button
                      key={ram}
                      type="button"
                      onClick={() =>
                        updateRequirement(
                          "ram",
                          ram
                        )
                      }
                      className={`rounded-xl border p-4 font-semibold transition-all ${
                        selected
                          ? "border-[#606C38] bg-[#F7F5EA] text-[#283618]"
                          : "border-[#E5E1D0] text-[#6B705C] hover:border-[#BC6C25]"
                      }`}
                    >
                      {ram}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STORAGE */}

            <div>
              <label className="mb-3 block text-sm font-bold text-[#283618]">
                Preferred Storage
              </label>

              <div className="grid gap-3">
                {storageOptions.map((storage) => {
                  const selected =
                    requirements.storage === storage;

                  return (
                    <button
                      key={storage}
                      type="button"
                      onClick={() =>
                        updateRequirement(
                          "storage",
                          storage
                        )
                      }
                      className={`rounded-xl border p-4 text-left font-semibold transition-all ${
                        selected
                          ? "border-[#606C38] bg-[#F7F5EA] text-[#283618]"
                          : "border-[#E5E1D0] text-[#6B705C] hover:border-[#BC6C25]"
                      }`}
                    >
                      {storage}
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 text-xs leading-5 text-[#8A877A]">
                Storage options are based on products currently
                available in our product database.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================
          NAVIGATION
      ====================================== */}

      <div className="mt-10 flex flex-col-reverse gap-3 border-t border-[#E5E1D0] pt-6 sm:flex-row sm:items-center sm:justify-between">

        {/* Back */}

        <button
          type="button"
          onClick={previousStep}
          disabled={step === 1}
          className={`rounded-xl px-6 py-3 font-semibold transition ${
            step === 1
              ? "cursor-not-allowed text-[#B5B2A4]"
              : "text-[#6B705C] hover:bg-[#F7F5EA] hover:text-[#283618]"
          }`}
        >
          ← Back
        </button>

        {/* Continue / Generate */}

        {step < 4 ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={!canContinue()}
            className={`rounded-xl px-8 py-3 font-bold transition ${
              canContinue()
                ? "bg-[#606C38] text-white shadow-md hover:bg-[#4F5A2E]"
                : "cursor-not-allowed bg-[#E5E1D0] text-[#9A978B]"
            }`}
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            onClick={generateBuild}
            disabled={!canContinue()}
            className={`rounded-xl px-8 py-3 font-bold transition ${
              canContinue()
                ? "bg-[#BC6C25] text-white shadow-md hover:bg-[#A75E20]"
                : "cursor-not-allowed bg-[#E5E1D0] text-[#9A978B]"
            }`}
          >
            Generate My PC ✨
          </button>
        )}
      </div>
    </div>
  );
};


// ==========================================
// Question Title
// ==========================================

const QuestionTitle = ({
  number,
  title,
  description,
}) => {
  return (
    <div className="mb-8">
      <span className="text-sm font-black tracking-widest text-[#BC6C25]">
        {number}
      </span>

      <h2 className="mt-2 text-2xl font-black text-[#283618] sm:text-3xl">
        {title}
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B705C] sm:text-base">
        {description}
      </p>
    </div>
  );
};

export default BuildQuestions;