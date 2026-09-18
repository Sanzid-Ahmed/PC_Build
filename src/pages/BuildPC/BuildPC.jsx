import React, { useEffect, useState } from "react";

import BuildHeader from "./BuildHeader/BuildHeader";
import BuildQuestions from "./BuildQuestions/BuildQuestions";
import BuildResult from "./BuildResult/BuildResult";

import useAuth from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";

const BuildPC = () => {
  const { user, loading: authLoading } = useAuth();
  const api = useApi();

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
  // BUILD LIMIT
  // null = unlimited
  // number = remaining builds
  // ==========================================
  const [buildLimit, setBuildLimit] = useState(null);
  const [limitLoading, setLimitLoading] = useState(true);
  const [limitError, setLimitError] = useState("");

  // ==========================================
  // FIREBASE UID
  // ==========================================
  const firebaseId =
    user?.uid ||
    user?.firebase_id ||
    null;

  // ==========================================
  // FETCH BUILD LIMIT
  // ==========================================
  useEffect(() => {
    let cancelled = false;

    const fetchBuildLimit = async () => {
      // ----------------------------------------
      // Wait for Firebase auth initialization
      // ----------------------------------------
      if (authLoading) {
        return;
      }

      // ----------------------------------------
      // Firebase finished but no user
      // ----------------------------------------
      if (!firebaseId) {
        if (!cancelled) {
          setBuildLimit(0);
          setLimitError(
            "You must be logged in to use the PC Builder."
          );
          setLimitLoading(false);
        }

        return;
      }

      // ----------------------------------------
      // Start loading
      // ----------------------------------------
      if (!cancelled) {
        setLimitLoading(true);
        setLimitError("");
      }

      // ----------------------------------------
      // Retry backend request
      // Useful for Render cold start
      // ----------------------------------------
      const maxAttempts = 3;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        if (cancelled) return;

        try {
          console.log(
            `Checking build limit... Attempt ${attempt}/${maxAttempts}`
          );

          const response = await api.get(
            `/api/build-limit/${firebaseId}`,
            {
              timeout: 30000,
            }
          );

          console.log(
            "Build Limit Response:",
            response.data
          );

          if (cancelled) return;

          if (response.data?.success) {
            if (response.data.unlimited === true) {
              // Admin
              setBuildLimit(null);
            } else {
              // Normal user
              setBuildLimit(
                response.data.build_limit ?? 0
              );
            }

            setLimitError("");
            setLimitLoading(false);

            return;
          }

          throw new Error(
            "Invalid build limit response."
          );
        } catch (err) {
          console.error(
            `Build limit attempt ${attempt} failed:`,
            err
          );

          if (attempt === maxAttempts) {
            if (!cancelled) {
              setLimitError(
                err.response?.data?.detail ||
                  "Unable to load your build limit. Please try again."
              );

              setLimitLoading(false);
            }

            return;
          }

          // --------------------------------------
          // Wait before retry
          // --------------------------------------
          await new Promise((resolve) =>
            setTimeout(resolve, 2000)
          );
        }
      }
    };

    fetchBuildLimit();

    return () => {
      cancelled = true;
    };
  }, [firebaseId, authLoading]);

  // ==========================================
  // BUILD STATUS
  // ==========================================
  const isUnlimited = buildLimit === null;

  const canBuild =
    isUnlimited ||
    (typeof buildLimit === "number" &&
      buildLimit > 0);

  // ==========================================
  // UPDATE REQUIREMENT
  // ==========================================
  const updateRequirement = (field, value) => {
    setRequirements((prev) => ({
      ...prev,
      [field]: value,
    }));

    setError("");
  };

  // ==========================================
  // NEXT STEP
  // ==========================================
  const nextStep = () => {
    if (!canBuild) {
      setError(
        "You have reached your build limit. Please contact an admin to get more builds."
      );

      return;
    }

    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };

  // ==========================================
  // PREVIOUS STEP
  // ==========================================
  const previousStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // ==========================================
  // CONVERT BUDGET
  // ==========================================
  const getBudgetNumber = (budgetText) => {
    if (!budgetText) {
      return 0;
    }

    const numbers =
      budgetText.match(/\d+(?:,\d+)?/g);

    if (!numbers || numbers.length === 0) {
      return 0;
    }

    const first = Number(
      numbers[0].replace(/,/g, "")
    );

    // Example:
    // ৳50,000 - ৳70,000
    // Use upper limit
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
  // USE ONE BUILD
  // ==========================================
  const consumeBuild = async () => {
    if (!firebaseId) {
      throw new Error(
        "You must be logged in to use the PC Builder."
      );
    }

    // ========================================
    // ADMIN / UNLIMITED
    // ========================================
    if (isUnlimited) {
      console.log(
        "Unlimited user. Build limit will not decrease."
      );

      return {
        success: true,
        unlimited: true,
        build_limit: null,
      };
    }

    // ========================================
    // SAFETY CHECK
    // ========================================
    if (buildLimit <= 0) {
      throw new Error(
        "You have reached your build limit."
      );
    }

    // ========================================
    // DECREASE LIMIT
    // ========================================
    const response = await api.post(
      `/api/build-limit/${firebaseId}/use`
    );

    console.log(
      "Build Limit After Use:",
      response.data
    );

    if (!response.data?.success) {
      throw new Error(
        "Unable to update build limit."
      );
    }

    // ========================================
    // UPDATE FRONTEND NUMBER
    // ========================================
    if (response.data.unlimited === true) {
      setBuildLimit(null);
    } else {
      setBuildLimit(
        response.data.build_limit ?? 0
      );
    }

    return response.data;
  };

  // ==========================================
  // GENERATE BUILD
  // ==========================================
  const generateBuild = async () => {
    try {
      setGenerating(true);
      setError("");

      // ========================================
      // CHECK AUTH
      // ========================================
      if (!firebaseId) {
        setError(
          "Please login before generating a PC build."
        );

        return;
      }

      // ========================================
      // CHECK BUILD LIMIT
      // ========================================
      if (!canBuild) {
        setError(
          "You have reached your build limit. Please contact an admin to get more builds."
        );

        return;
      }

      // ========================================
      // VALIDATE BUDGET
      // ========================================
      const budgetNumber =
        getBudgetNumber(
          requirements.budget
        );

      if (!budgetNumber) {
        setError(
          "Please select a valid budget."
        );

        return;
      }

      // ========================================
      // BUILD REQUEST
      // ========================================
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

      // ========================================
      // CALL BUILD API
      // ========================================
      const response = await api.post(
        "/api/build-pc",
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

      // ========================================
      // CONSUME ONE BUILD
      // ONLY AFTER SUCCESS
      // ========================================
      await consumeBuild();

      // ========================================
      // SAVE BUILD DATA
      // ========================================
      setBuildData(response.data);

      // ========================================
      // SHOW RESULT
      // ========================================
      setGenerated(true);
    } catch (err) {
      console.error(
        "AI Build Error:",
        err
      );

      let message =
        "Failed to generate your PC build.";

      // ========================================
      // FASTAPI ERROR
      // ========================================
      if (err.response?.data?.detail) {
        const detail =
          err.response.data.detail;

        if (typeof detail === "string") {
          message = detail;
        } else if (detail?.message) {
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
  // START AGAIN
  // ==========================================
  const startAgain = () => {
    if (!canBuild) {
      setGenerated(false);
      setStep(1);
      setBuildData(null);

      setError(
        "You have reached your build limit. Please contact an admin to get more builds."
      );

      return;
    }

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
  // AUTH LOADING SCREEN
  // ==========================================
  if (authLoading) {
    return (
      <section
        className="
          min-h-screen
          bg-base-100
          px-4
          pb-16
          pt-24
          sm:px-6
          sm:pt-28
        "
      >
        <div className="mx-auto w-full max-w-6xl">
          <BuildHeader step={1} />

          <div
            className="
              mx-auto
              mt-8
              max-w-3xl
              rounded-3xl
              border
              border-base-300
              bg-base-100
              p-10
              text-center
              shadow-lg
              shadow-base-content/5
              sm:p-16
            "
          >
            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-primary/5
              "
            >
              <div
                className="
                  h-12
                  w-12
                  animate-spin
                  rounded-full
                  border-4
                  border-base-300
                  border-t-primary
                "
              />
            </div>

            <p
              className="
                mt-7
                text-sm
                font-black
                uppercase
                tracking-widest
                text-primary
              "
            >
              ThriftBuild
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-black
                text-base-content
                sm:text-4xl
              "
            >
              Checking your account...
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-sm
                leading-6
                text-base-content/60
                sm:text-base
              "
            >
              Please wait while we verify your
              account.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // GENERATING LOADING SCREEN
  // ==========================================
  if (generating) {
    return (
      <section
        className="
          min-h-screen
          bg-base-100
          px-4
          pb-16
          pt-24
          sm:px-6
          sm:pt-28
        "
      >
        <div className="mx-auto w-full max-w-6xl">
          <BuildHeader step={5} />

          <div
            className="
              mx-auto
              mt-8
              max-w-3xl
              rounded-3xl
              border
              border-base-300
              bg-base-100
              p-10
              text-center
              shadow-lg
              shadow-base-content/5
              sm:p-16
            "
          >
            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-primary/5
              "
            >
              <div
                className="
                  h-12
                  w-12
                  animate-spin
                  rounded-full
                  border-4
                  border-base-300
                  border-t-primary
                "
              />
            </div>

            <p
              className="
                mt-7
                text-sm
                font-black
                uppercase
                tracking-widest
                text-primary
              "
            >
              AI PC Builder
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-black
                text-base-content
                sm:text-4xl
              "
            >
              Building your PC...
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-sm
                leading-6
                text-base-content/60
                sm:text-base
              "
            >
              We're analyzing your requirements,
              checking available shop products,
              and creating a suitable configuration.
            </p>

            <div className="mx-auto mt-8 max-w-md">
              <div
                className="
                  h-2
                  overflow-hidden
                  rounded-full
                  bg-base-300
                "
              >
                <div
                  className="
                    h-full
                    w-2/3
                    animate-pulse
                    rounded-full
                    bg-primary
                  "
                />
              </div>
            </div>

            <p
              className="
                mt-5
                text-xs
                font-semibold
                text-base-content/40
              "
            >
              This may take a few seconds...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================
  return (
    <section
      className="
        min-h-screen
        bg-base-100
        px-4
        pb-16
        pt-24
        sm:px-6
        sm:pt-28
      "
    >
      <div className="mx-auto w-full max-w-6xl">
        <BuildHeader
          step={generated ? 5 : step}
        />

        {/* ======================================
            BUILD LIMIT
        ====================================== */}
        <div className="mx-auto mt-6 max-w-5xl">
          {/* LOADING */}
          {limitLoading && (
            <div
              className="
                flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-base-300
                bg-base-100
                px-5
                py-4
                shadow-sm
              "
            >
              <span
                className="
                  h-5
                  w-5
                  animate-spin
                  rounded-full
                  border-2
                  border-base-300
                  border-t-primary
                "
              />

              <span
                className="
                  text-sm
                  font-semibold
                  text-base-content/60
                "
              >
                Checking your build limit...
              </span>
            </div>
          )}

          {/* ERROR */}
          {!limitLoading && limitError && (
            <div
              className="
                rounded-2xl
                border
                border-error/20
                bg-error/5
                px-5
                py-4
                text-sm
                font-semibold
                text-error
              "
            >
              {limitError}

              <button
                type="button"
                onClick={() => {
                  window.location.reload();
                }}
                className="
                  ml-3
                  font-black
                  underline
                  underline-offset-2
                "
              >
                Retry
              </button>
            </div>
          )}

          {/* UNLIMITED */}
          {!limitLoading &&
            !limitError &&
            isUnlimited && (
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-primary/20
                  bg-primary/5
                  px-5
                  py-4
                  shadow-sm
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-primary
                      text-xl
                      font-black
                      text-primary-content
                    "
                  >
                    ∞
                  </div>

                  <div>
                    <p
                      className="
                        text-xs
                        font-black
                        uppercase
                        tracking-widest
                        text-primary
                      "
                    >
                      Build Access
                    </p>

                    <h3
                      className="
                        mt-0.5
                        text-lg
                        font-black
                        text-base-content
                      "
                    >
                      Unlimited Builds
                    </h3>

                    <p
                      className="
                        mt-0.5
                        text-sm
                        text-base-content/60
                      "
                    >
                      You can generate as many PC
                      builds as you need.
                    </p>
                  </div>
                </div>
              </div>
            )}

          {/* USER WITH BUILDS */}
          {!limitLoading &&
            !limitError &&
            !isUnlimited &&
            buildLimit > 0 && (
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-primary/20
                  bg-primary/5
                  px-5
                  py-4
                  shadow-sm
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-4
                    "
                  >
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-primary
                        text-xl
                        font-black
                        text-primary-content
                      "
                    >
                      {buildLimit}
                    </div>

                    <div>
                      <p
                        className="
                          text-xs
                          font-black
                          uppercase
                          tracking-widest
                          text-primary
                        "
                      >
                        Build Limit
                      </p>

                      <h3
                        className="
                          mt-0.5
                          text-lg
                          font-black
                          text-base-content
                        "
                      >
                        {buildLimit}{" "}
                        {buildLimit === 1
                          ? "Build"
                          : "Builds"}{" "}
                        Remaining
                      </h3>

                      <p
                        className="
                          mt-0.5
                          text-sm
                          text-base-content/60
                        "
                      >
                        Each successful build uses
                        one build credit.
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      hidden
                      rounded-full
                      bg-primary/10
                      px-4
                      py-2
                      text-xs
                      font-bold
                      text-primary
                      sm:block
                    "
                  >
                    {buildLimit} left
                  </div>
                </div>
              </div>
            )}

          {/* ZERO */}
          {!limitLoading &&
            !limitError &&
            !isUnlimited &&
            buildLimit <= 0 && (
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-error/30
                  bg-error/5
                  px-5
                  py-5
                  shadow-sm
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-error
                      text-xl
                      font-black
                      text-error-content
                    "
                  >
                    0
                  </div>

                  <div>
                    <p
                      className="
                        text-xs
                        font-black
                        uppercase
                        tracking-widest
                        text-error
                      "
                    >
                      Build Limit Reached
                    </p>

                    <h3
                      className="
                        mt-1
                        text-lg
                        font-black
                        text-base-content
                      "
                    >
                      You have no builds remaining
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm
                        leading-6
                        text-base-content/60
                      "
                    >
                      You cannot generate another PC
                      build right now. Please contact
                      an administrator to increase your
                      build limit.
                    </p>
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* ======================================
            GENERAL ERROR
        ====================================== */}
        {error && !generated && (
          <div
            className="
              mx-auto
              mt-6
              max-w-5xl
              whitespace-pre-line
              rounded-2xl
              border
              border-error/20
              bg-error/5
              p-5
              text-sm
              font-semibold
              text-error
            "
          >
            {error}
          </div>
        )}

        {/* ======================================
            BUILDER / RESULT
        ====================================== */}
        {!limitLoading &&
        !limitError &&
        !canBuild ? (
          <div
            className="
              mx-auto
              mt-8
              max-w-3xl
              rounded-3xl
              border
              border-base-300
              bg-base-100
              p-8
              text-center
              shadow-lg
              sm:p-12
            "
          >
            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-error/10
                text-3xl
                font-black
                text-error
              "
            >
              0
            </div>

            <h2
              className="
                mt-6
                text-2xl
                font-black
                text-base-content
                sm:text-3xl
              "
            >
              Build Limit Reached
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-lg
                text-sm
                leading-6
                text-base-content/60
              "
            >
              You have used all of your available
              PC build credits. Contact an administrator
              if you need additional builds.
            </p>

            <div
              className="
                mx-auto
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-error/10
                px-5
                py-2.5
                text-sm
                font-bold
                text-error
              "
            >
              0 builds remaining
            </div>
          </div>
        ) : !generated ? (
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
            buildAgain={startAgain}
          />
        )}
      </div>
    </section>
  );
};

export default BuildPC;