// ============================================================
// Compatibility Rules
// ============================================================

// ------------------------------------------------------------
// Helper
// ------------------------------------------------------------

const normalize = (value) => {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim().toLowerCase();
};

// ------------------------------------------------------------
// CPU ↔ Motherboard
// ------------------------------------------------------------

export const isCpuMotherboardCompatible = (cpu, motherboard) => {
  if (!cpu || !motherboard) {
    return {
      compatible: true,
      status: "unknown",
      reason: "",
    };
  }

  const cpuSocket = normalize(
    cpu.socket ||
      cpu.cpu_socket ||
      cpu.socket_type
  );

  const motherboardSocket = normalize(
    motherboard.socket ||
      motherboard.cpu_socket ||
      motherboard.socket_type
  );

  // We cannot determine compatibility
  if (!cpuSocket || !motherboardSocket) {
    return {
      compatible: true,
      status: "unknown",
      reason: "Socket information is not available.",
    };
  }

  if (cpuSocket === motherboardSocket) {
    return {
      compatible: true,
      status: "compatible",
      reason: `Both use ${cpuSocket}.`,
    };
  }

  return {
    compatible: false,
    status: "incompatible",
    reason: `CPU uses ${cpuSocket}, but motherboard uses ${motherboardSocket}.`,
  };
};

// ------------------------------------------------------------
// CPU ↔ RAM
// ------------------------------------------------------------

export const isCpuRamCompatible = (cpu, ram) => {
  if (!cpu || !ram) {
    return {
      compatible: true,
      status: "unknown",
      reason: "",
    };
  }

  const cpuMemoryType = normalize(
    cpu.memory_type ||
      cpu.ram_type ||
      cpu.memory_support
  );

  const ramType = normalize(
    ram.memory_type ||
      ram.ram_type ||
      ram.type
  );

  if (!cpuMemoryType || !ramType) {
    return {
      compatible: true,
      status: "unknown",
      reason: "Memory type information is not available.",
    };
  }

  // Some products may contain multiple supported types
  const supportedTypes = cpuMemoryType
    .split(/[,/|]/)
    .map((item) => normalize(item));

  if (
    supportedTypes.includes(ramType) ||
    cpuMemoryType.includes(ramType)
  ) {
    return {
      compatible: true,
      status: "compatible",
      reason: `CPU supports ${ramType}.`,
    };
  }

  return {
    compatible: false,
    status: "incompatible",
    reason: `CPU supports ${cpuMemoryType}, but RAM is ${ramType}.`,
  };
};

// ------------------------------------------------------------
// Motherboard ↔ RAM
// ------------------------------------------------------------

export const isMotherboardRamCompatible = (motherboard, ram) => {
  if (!motherboard || !ram) {
    return {
      compatible: true,
      status: "unknown",
      reason: "",
    };
  }

  const motherboardMemoryType = normalize(
    motherboard.memory_type ||
      motherboard.ram_type ||
      motherboard.memory_support
  );

  const ramType = normalize(
    ram.memory_type ||
      ram.ram_type ||
      ram.type
  );

  if (!motherboardMemoryType || !ramType) {
    return {
      compatible: true,
      status: "unknown",
      reason: "Memory type information is not available.",
    };
  }

  if (
    motherboardMemoryType.includes(ramType) ||
    motherboardMemoryType
      .split(/[,/|]/)
      .map((item) => normalize(item))
      .includes(ramType)
  ) {
    return {
      compatible: true,
      status: "compatible",
      reason: `Motherboard supports ${ramType}.`,
    };
  }

  return {
    compatible: false,
    status: "incompatible",
    reason: `Motherboard supports ${motherboardMemoryType}, but RAM is ${ramType}.`,
  };
};

// ------------------------------------------------------------
// Motherboard ↔ Case
// ------------------------------------------------------------

export const isMotherboardCaseCompatible = (
  motherboard,
  pcCase
) => {
  if (!motherboard || !pcCase) {
    return {
      compatible: true,
      status: "unknown",
      reason: "",
    };
  }

  const motherboardFormFactor = normalize(
    motherboard.form_factor ||
      motherboard.motherboard_form_factor ||
      motherboard.size
  );

  const caseSupport = normalize(
    pcCase.form_factor ||
      pcCase.motherboard_support ||
      pcCase.supported_motherboards ||
      pcCase.size
  );

  if (!motherboardFormFactor || !caseSupport) {
    return {
      compatible: true,
      status: "unknown",
      reason: "Form factor information is not available.",
    };
  }

  if (caseSupport.includes(motherboardFormFactor)) {
    return {
      compatible: true,
      status: "compatible",
      reason: `Case supports ${motherboardFormFactor}.`,
    };
  }

  return {
    compatible: false,
    status: "incompatible",
    reason: `Motherboard is ${motherboardFormFactor}, but the case does not support it.`,
  };
};

// ------------------------------------------------------------
// GPU ↔ PSU
// ------------------------------------------------------------

export const isGpuPsuCompatible = (gpu, psu) => {
  if (!gpu || !psu) {
    return {
      compatible: true,
      status: "unknown",
      reason: "",
    };
  }

  const gpuPower = Number(
    gpu.power_requirement ||
      gpu.required_psu ||
      gpu.recommended_psu ||
      gpu.tdp ||
      0
  );

  const psuPower = Number(
    psu.wattage ||
      psu.power ||
      psu.capacity ||
      0
  );

  if (!gpuPower || !psuPower) {
    return {
      compatible: true,
      status: "unknown",
      reason: "Power information is not available.",
    };
  }

  if (psuPower >= gpuPower) {
    return {
      compatible: true,
      status: "compatible",
      reason: `PSU has enough power.`,
    };
  }

  return {
    compatible: false,
    status: "incompatible",
    reason: `GPU requires approximately ${gpuPower}W, but PSU provides ${psuPower}W.`,
  };
};