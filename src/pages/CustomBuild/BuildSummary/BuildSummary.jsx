import React, { useMemo } from "react";

const COMPONENT_LABELS = {
  processor: "Processor",
  motherboard: "Motherboard",
  ram: "RAM",
  gpu: "GPU",
  storage: "Storage",
  psu: "Power Supply",
  case: "PC Case",
};

const COMMON_PSU_WATTAGES = [
  300,
  350,
  400,
  450,
  500,
  550,
  600,
  650,
  700,
  750,
  800,
  850,
  900,
  1000,
  1200,
  1300,
  1500,
  1600,
];

const parseJSON = (value) => {
  if (!value) return {};

  if (typeof value === "object") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
};

const parseFeatures = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value;
  }

  try {
    const parsed = JSON.parse(value);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const normalize = (value) => {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ");
};

const getProductText = (product) => {
  const features = parseFeatures(product?.features);
  const specifications = parseJSON(product?.specifications);

  return normalize(
    [
      product?.name,
      product?.brand,
      product?.category,
      ...features,
      ...Object.entries(specifications || {}).flatMap(
        ([key, value]) => [key, value]
      ),
    ].join(" ")
  );
};

const getSpecification = (product, possibleNames) => {
  const specifications = parseJSON(product?.specifications);

  if (
    !specifications ||
    typeof specifications !== "object"
  ) {
    return "";
  }

  for (const [key, value] of Object.entries(specifications)) {
    const normalizedKey = normalize(key);

    for (const name of possibleNames) {
      const normalizedName = normalize(name);

      if (
        normalizedKey === normalizedName ||
        normalizedKey.includes(normalizedName)
      ) {
        return String(value || "");
      }
    }
  }

  return "";
};

const extractNumber = (value) => {
  if (value === null || value === undefined) {
    return 0;
  }

  const match = String(value).replace(/,/g, "").match(
    /(\d+(?:\.\d+)?)/
  );

  return match ? Number(match[1]) : 0;
};

const getPowerValue = (product, possibleNames) => {
  const specification = getSpecification(
    product,
    possibleNames
  );

  if (specification) {
    const number = extractNumber(specification);

    if (number > 0) {
      return number;
    }
  }

  const text = getProductText(product);

  for (const name of possibleNames) {
    const normalizedName = normalize(name);

    const regex = new RegExp(
      `${normalizedName.replace(/\s+/g, "\\s+")}.{0,30}(\\d+(?:\\.\\d+)?)\\s*(?:w|watt|watts)`,
      "i"
    );

    const match = text.match(regex);

    if (match) {
      const number = Number(match[1]);

      if (number > 0) {
        return number;
      }
    }
  }

  return 0;
};

const getCpuPower = (product) => {
  if (!product) return 0;

  const power = getPowerValue(product, [
    "tdp",
    "processor tdp",
    "cpu tdp",
    "thermal design power",
    "power consumption",
  ]);

  if (power > 0 && power <= 500) {
    return power;
  }

  return 65;
};

const getGpuPower = (product) => {
  if (!product) return 0;

  const power = getPowerValue(product, [
    "tdp",
    "gpu tdp",
    "graphics card tdp",
    "power consumption",
    "power requirement",
    "recommended psu",
    "recommended power supply",
  ]);

  if (power > 0 && power <= 1500) {
    return power;
  }

  return 150;
};

const getRamPower = (product) => {
  if (!product) return 0;

  const specifications = parseJSON(
    product?.specifications
  );

  const text = getProductText(product);

  let moduleCount = 1;

  for (const [key, value] of Object.entries(
    specifications || {}
  )) {
    const normalizedKey = normalize(key);

    if (
      normalizedKey.includes("module") ||
      normalizedKey.includes("kit")
    ) {
      const number = extractNumber(value);

      if (number >= 1 && number <= 8) {
        moduleCount = number;
      }
    }
  }

  const moduleMatch = text.match(
    /\b(1|2|4|6|8)\s*(?:x|×|module|stick)\b/i
  );

  if (moduleMatch) {
    moduleCount = Number(moduleMatch[1]);
  }

  return Math.max(5, moduleCount * 5);
};

const getStoragePower = (product) => {
  if (!product) return 0;

  const power = getPowerValue(product, [
    "power consumption",
    "power consumption typical",
    "power",
  ]);

  if (power > 0 && power <= 100) {
    return power;
  }

  const text = getProductText(product);

  if (
    text.includes("nvme") ||
    text.includes("m.2")
  ) {
    return 7;
  }

  if (
    text.includes("ssd") ||
    text.includes("solid state")
  ) {
    return 5;
  }

  if (
    text.includes("hdd") ||
    text.includes("hard disk")
  ) {
    return 10;
  }

  return 8;
};

const getMotherboardPower = (product) => {
  if (!product) return 0;

  const power = getPowerValue(product, [
    "power consumption",
    "tdp",
  ]);

  if (power > 0 && power <= 200) {
    return power;
  }

  return 50;
};

const getSelectedPsuWattage = (product) => {
  if (!product) return 0;

  const power = getPowerValue(product, [
    "wattage",
    "psu wattage",
    "power supply wattage",
    "power capacity",
    "capacity",
    "output power",
    "maximum power",
  ]);

  if (power > 0 && power <= 3000) {
    return power;
  }

  const text = getProductText(product);

  const match = text.match(
    /\b(300|350|400|450|500|550|600|650|700|750|800|850|900|1000|1200|1300|1500|1600)\s*(?:w|watt|watts)\b/i
  );

  return match ? Number(match[1]) : 0;
};

const getRecommendedPsuWattage = (estimatedPower) => {
  const requiredPower = Math.ceil(
    estimatedPower * 1.3
  );

  return (
    COMMON_PSU_WATTAGES.find(
      (wattage) => wattage >= requiredPower
    ) ||
    Math.ceil(requiredPower / 100) * 100
  );
};

const BuildSummary = ({
  selectedComponents,
}) => {
  const summary = useMemo(() => {
    const {
      processor,
      motherboard,
      ram,
      gpu,
      storage,
      psu,
    } = selectedComponents || {};

    const components = [
      {
        type: "processor",
        product: processor,
        power: getCpuPower(processor),
      },
      {
        type: "motherboard",
        product: motherboard,
        power: getMotherboardPower(motherboard),
      },
      {
        type: "ram",
        product: ram,
        power: getRamPower(ram),
      },
      {
        type: "gpu",
        product: gpu,
        power: getGpuPower(gpu),
      },
      {
        type: "storage",
        product: storage,
        power: getStoragePower(storage),
      },
    ];

    const selectedComponentsList =
      components.filter(
        (component) => component.product
      );

    const totalPrice = Object.values(
      selectedComponents || {}
    ).reduce((total, product) => {
      if (!product) return total;

      const price = Number(product.price);

      return total + (Number.isFinite(price) ? price : 0);
    }, 0);

    const estimatedPower =
      selectedComponentsList.reduce(
        (total, component) =>
          total + component.power,
        0
      );

    const recommendedPsu =
      getRecommendedPsuWattage(
        estimatedPower
      );

    const selectedPsuWattage =
      getSelectedPsuWattage(psu);

    let psuStatus = "not_selected";

    if (psu) {
      if (!selectedPsuWattage) {
        psuStatus = "unknown";
      } else if (
        selectedPsuWattage >= recommendedPsu
      ) {
        psuStatus = "sufficient";
      } else {
        psuStatus = "insufficient";
      }
    }

    return {
      components: selectedComponentsList,
      totalPrice,
      estimatedPower,
      recommendedPsu,
      selectedPsuWattage,
      psuStatus,
    };
  }, [selectedComponents]);

  const selectedCount = Object.values(
    selectedComponents || {}
  ).filter(Boolean).length;

  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 shadow-sm overflow-hidden">

      <div className="p-5 border-b border-base-300">
        <div className="flex items-center gap-3">
          <div className="text-2xl">
            📊
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Build Summary
            </h2>

            <p className="text-sm text-base-content/60">
              Price and estimated power information for your current build.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="rounded-xl bg-base-200 p-4">
            <p className="text-xs uppercase tracking-wide font-semibold text-base-content/50">
              Total Price
            </p>

            <p className="text-2xl font-bold mt-2">
              ৳{summary.totalPrice.toLocaleString("en-BD")}
            </p>
          </div>

          <div className="rounded-xl bg-base-200 p-4">
            <p className="text-xs uppercase tracking-wide font-semibold text-base-content/50">
              Estimated Power
            </p>

            <p className="text-2xl font-bold mt-2">
              {summary.estimatedPower}W
            </p>
          </div>

          <div className="rounded-xl bg-base-200 p-4">
            <p className="text-xs uppercase tracking-wide font-semibold text-base-content/50">
              Recommended PSU
            </p>

            <p className="text-2xl font-bold mt-2">
              {summary.recommendedPsu}W
            </p>
          </div>

        </div>

        {summary.components.length > 0 && (
          <div className="mt-6">

            <h3 className="font-bold mb-3">
              Estimated Power Breakdown
            </h3>

            <div className="space-y-2">

              {summary.components.map(
                (component) => (
                  <div
                    key={component.type}
                    className="flex items-center justify-between rounded-lg border border-base-300 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {
                          COMPONENT_LABELS[
                            component.type
                          ]
                        }
                      </p>

                      <p className="text-xs text-base-content/50 truncate">
                        {component.product.name}
                      </p>
                    </div>

                    <span className="font-semibold text-sm ml-3">
                      ~{component.power}W
                    </span>
                  </div>
                )
              )}

            </div>

          </div>
        )}

        <div className="mt-6 rounded-xl border border-base-300 p-4">

          <div className="flex items-center justify-between gap-3">

            <div>
              <h3 className="font-bold">
                Power Supply Check
              </h3>

              <p className="text-sm text-base-content/60 mt-1">
                {summary.selectedPsuWattage
                  ? `Selected PSU: ${summary.selectedPsuWattage}W`
                  : "No PSU has been selected yet."}
              </p>
            </div>

            {summary.psuStatus ===
              "sufficient" && (
              <span className="badge badge-success">
                ✓ Sufficient
              </span>
            )}

            {summary.psuStatus ===
              "insufficient" && (
              <span className="badge badge-error">
                ✕ Too Low
              </span>
            )}

            {summary.psuStatus ===
              "unknown" && (
              <span className="badge badge-warning">
                ⚠ Unknown
              </span>
            )}

            {summary.psuStatus ===
              "not_selected" && (
              <span className="badge badge-outline">
                Not Selected
              </span>
            )}

          </div>

          <div className="mt-4 text-sm">

            <div className="flex justify-between">
              <span className="text-base-content/60">
                Estimated system power
              </span>

              <span className="font-semibold">
                ~{summary.estimatedPower}W
              </span>
            </div>

            <div className="flex justify-between mt-2">
              <span className="text-base-content/60">
                Recommended PSU
              </span>

              <span className="font-semibold">
                {summary.recommendedPsu}W
              </span>
            </div>

          </div>

        </div>

        <div className="mt-4 text-xs text-base-content/50">
          ⚠ Power consumption is an estimate. When product power specifications are unavailable, the builder uses conservative default estimates.
        </div>

        <div className="mt-4 text-sm text-base-content/60">
          Components selected:{" "}
          <span className="font-semibold text-base-content">
            {selectedCount} / 7
          </span>
        </div>

      </div>
    </div>
  );
};

export default BuildSummary;