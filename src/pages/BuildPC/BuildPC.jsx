import React, { useState } from "react";
import axios from "axios";

import BuildHeader from "./BuildHeader/BuildHeader";
import BuildQuestions from "./BuildQuestions/BuildQuestions";
import BuildResult from "./BuildResult/BuildResult";

const API_URL = "https://pc-builder-api-eabc.onrender.com/api/build-pc";

const BuildPC = () => {
  const [step, setStep] = useState(1);

  const [requirements, setRequirements] = useState({
    type: "",
    budget: "",
    priority: "",
    ram: "",
    storage: "",
  });

  const [generated, setGenerated] = useState(false);

  const [buildData, setBuildData] = useState(null);

  const [generating, setGenerating] = useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // Update Requirement
  // ==========================================

  const updateRequirement = (field, value) => {
    setRequirements((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear old error when user changes something
    setError("");
  };

  // ==========================================
  // Next Step
  // ==========================================

  const nextStep = () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };

  // ==========================================
  // Previous Step
  // ==========================================

  const previousStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // ==========================================
  // Convert Budget
  // ==========================================

  const getBudgetNumber = (budgetText) => {
    if (!budgetText) {
      return 0;
    }

    const numbers = budgetText.match(
      /\d+(?:,\d+)?/g
    );

    if (!numbers || numbers.length === 0) {
      return 0;
    }

    const first = Number(
      numbers[0].replace(/,/g, "")
    );

    // Example:
    // ৳50,000 - ৳70,000
    //
    // For the AI builder we use the
    // upper limit of the selected range.

    if (numbers.length >= 2) {
      const second = Number(
        numbers[1].replace(/,/g, "")
      );

      return second;
    }

    // Example:
    // ৳200,000+
    return first;
  };

  // ==========================================
  // Generate Build
  // ==========================================

  const generateBuild = async () => {
    try {
      setGenerating(true);
      setError("");

      const budgetNumber = getBudgetNumber(
        requirements.budget
      );

      if (!budgetNumber) {
        setError(
          "Please select a valid budget."
        );

        setGenerating(false);
        return;
      }

      const requestData = {
        type: requirements.type,
        budget: budgetNumber,
        priority: requirements.priority,
        ram: requirements.ram,
        storage: requirements.storage,
      };

      console.log(
        "Sending build requirements:",
        requestData
      );

      const response = await axios.post(
        API_URL,
        requestData,
        {
          timeout: 120000,
        }
      );

      console.log(
        "AI Build Response:",
        response.data
      );

      if (!response.data?.success) {
        throw new Error(
          "Invalid build response from server."
        );
      }

      // Save complete backend response
      setBuildData(response.data);

      // Show result page
      setGenerated(true);

    } catch (err) {
      console.error(
        "AI Build Error:",
        err
      );

      let message =
        "Failed to generate your PC build.";

      // ----------------------------------------
      // FastAPI validation error
      // ----------------------------------------

      if (
        err.response?.data?.detail
      ) {
        const detail =
          err.response.data.detail;

        if (
          typeof detail === "string"
        ) {
          message = detail;
        } else if (
          detail?.message
        ) {
          message = detail.message;

          if (
            Array.isArray(detail.errors) &&
            detail.errors.length > 0
          ) {
            message +=
              "\n\n" +
              detail.errors
                .map(
                  (item) => `• ${item}`
                )
                .join("\n");
          }
        }
      } else if (err.message) {
        message = err.message;
      }

      setError(message);

    } finally {
      setGenerating(false);
    }
  };

  // ==========================================
  // Start Again
  // ==========================================

  const startAgain = () => {
    setStep(1);
    setGenerated(false);
    setBuildData(null);
    setError("");

    setRequirements({
      type: "",
      budget: "",
      priority: "",
      ram: "",
      storage: "",
    });
  };

  // ==========================================
  // Loading Screen
  // ==========================================

  if (generating) {
    return (
      <section className="min-h-screen bg-[#FFFEF7] px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
        <div className="mx-auto w-full max-w-6xl">
          <BuildHeader step={5} />

          <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-[#E5E1D0] bg-white p-10 text-center shadow-[0_10px_40px_rgba(40,54,24,0.06)] sm:p-16">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F7F5EA]">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#E5E1D0] border-t-[#606C38]" />
            </div>

            <p className="mt-7 text-sm font-black uppercase tracking-widest text-[#BC6C25]">
              AI PC Builder
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#283618] sm:text-4xl">
              Building your PC...
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#6B705C] sm:text-base">
              We're analyzing your requirements,
              checking available shop products,
              and creating a suitable configuration.
            </p>

            <div className="mx-auto mt-8 max-w-md">
              <div className="h-2 overflow-hidden rounded-full bg-[#E5E1D0]">
                <div className="h-full w-2/3 animate-pulse rounded-full bg-[#606C38]" />
              </div>
            </div>

            <p className="mt-5 text-xs font-semibold text-[#9A978B]">
              This may take a few seconds...
            </p>

          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Main UI
  // ==========================================

  return (
    <section className="min-h-screen bg-[#FFFEF7] px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto w-full max-w-6xl">

        <BuildHeader
          step={generated ? 5 : step}
        />

        {/* Error */}
        {error && !generated && (
          <div className="mx-auto mb-6 max-w-5xl whitespace-pre-line rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {!generated ? (
          <BuildQuestions
            step={step}
            requirements={requirements}
            updateRequirement={updateRequirement}
            nextStep={nextStep}
            previousStep={previousStep}
            generateBuild={generateBuild}
          />
        ) : (
          <BuildResult
            requirements={requirements}
            buildData={buildData}
            startAgain={startAgain}
          />
        )}

      </div>
    </section>
  );
};

export default BuildPC;