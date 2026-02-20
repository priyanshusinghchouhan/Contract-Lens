export type UpgradePattern =
  | "Transparent"
  | "UUPS"
  | "Beacon"
  | "Unknown"
  | null;

export function detectUpgradeability(
  abi: any[],
  sourceCode: string,
  proxyFlag: boolean,
) {
  if (!proxyFlag) {
    return {
      isProxy: false,
      pattern: null,
      usesDelegateCall: false,
    };
  }

  const functionNames = abi
    .filter((item) => item.type === "function")
    .map((fn) => fn.name);

  const usesDelegatecall = sourceCode.includes("delegatecall");

  const hasUpgradeTo = functionNames.includes("upgradeTo");
  const hasUpgradeToAndCall = functionNames.includes("upgradeToAndCall");
  const hasProxiableUUID = functionNames.includes("proxiableUUID");

  const hasAdmin = functionNames.includes("admin");
  const hasImplementation = functionNames.includes("implementation");
  const hasChangeAdmin = functionNames.includes("changeAdmin");

  // UUPS detection
  if (hasUpgradeTo || hasUpgradeToAndCall || hasProxiableUUID) {
    return {
      isProxy: true,
      pattern: "UUPS",
      usesDelegatecall,
    };
  }

  // Transparent detection
  if (hasAdmin && hasImplementation) {
    return {
      isProxy: true,
      pattern: "Transparent",
      usesDelegatecall,
    };
  }

  return {
    isProxy: true,
    pattern: "Unknown",
    usesDelegatecall,
  };
}
