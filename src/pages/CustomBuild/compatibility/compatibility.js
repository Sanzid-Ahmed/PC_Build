import {
  isCpuMotherboardCompatible,
  isCpuRamCompatible,
  isMotherboardRamCompatible,
  isMotherboardCaseCompatible,
  isGpuPsuCompatible,
} from "../compatibilityRules/compatibilityRules.js";

// ============================================================
// Check Complete Build
// ============================================================

export const checkBuildCompatibility = (selectedComponents) => {
  const {
    processor,
    motherboard,
    ram,
    gpu,
    psu,
    case: pcCase,
  } = selectedComponents;

  const results = [];

  // ----------------------------------------------------------
  // CPU ↔ Motherboard
  // ----------------------------------------------------------

  if (processor && motherboard) {
    results.push({
      rule: "CPU ↔ Motherboard",
      ...isCpuMotherboardCompatible(
        processor,
        motherboard
      ),
    });
  }

  // ----------------------------------------------------------
  // CPU ↔ RAM
  // ----------------------------------------------------------

  if (processor && ram) {
    results.push({
      rule: "CPU ↔ RAM",
      ...isCpuRamCompatible(processor, ram),
    });
  }

  // ----------------------------------------------------------
  // Motherboard ↔ RAM
  // ----------------------------------------------------------

  if (motherboard && ram) {
    results.push({
      rule: "Motherboard ↔ RAM",
      ...isMotherboardRamCompatible(
        motherboard,
        ram
      ),
    });
  }

  // ----------------------------------------------------------
  // Motherboard ↔ Case
  // ----------------------------------------------------------

  if (motherboard && pcCase) {
    results.push({
      rule: "Motherboard ↔ Case",
      ...isMotherboardCaseCompatible(
        motherboard,
        pcCase
      ),
    });
  }

  // ----------------------------------------------------------
  // GPU ↔ PSU
  // ----------------------------------------------------------

  if (gpu && psu) {
    results.push({
      rule: "GPU ↔ PSU",
      ...isGpuPsuCompatible(gpu, psu),
    });
  }

  // ----------------------------------------------------------
  // Overall result
  // ----------------------------------------------------------

  const incompatible = results.filter(
    (result) => result.status === "incompatible"
  );

  const unknown = results.filter(
    (result) => result.status === "unknown"
  );

  return {
    compatible: incompatible.length === 0,

    status:
      incompatible.length > 0
        ? "incompatible"
        : unknown.length > 0
        ? "partially_checked"
        : "compatible",

    results,

    incompatibleCount: incompatible.length,

    unknownCount: unknown.length,
  };
};

// ============================================================
// Check Whether A Product Can Be Added
// ============================================================

export const checkProductCompatibility = (
  componentType,
  product,
  selectedComponents
) => {
  const testBuild = {
    ...selectedComponents,
    [componentType]: product,
  };

  return checkBuildCompatibility(testBuild);
};