export interface RiskAnalysis {
  usesDelegatecall: boolean;
  usesLowLevelCall: boolean;
  usesTxOrigin: boolean;
  usesSelfDestruct: boolean;
  hasReentrancyGuard: boolean;
  externalCallCount: number;
}

export function analyzeRisks(sourceCode: string): RiskAnalysis {
  if (!sourceCode) {
    return {
      usesDelegatecall: false,
      usesLowLevelCall: false,
      usesTxOrigin: false,
      usesSelfDestruct: false,
      hasReentrancyGuard: false,
      externalCallCount: 0,
    };
  }

  const lower = sourceCode.toLowerCase();

  const usesDelegatecall = lower.includes(".delegatecall(");
  const usesLowLevelCall =
    lower.includes(".call(") ||
    lower.includes(".staticcall(") ||
    lower.includes(".call{");

  const usesTxOrigin = lower.includes("tx.origin");
  const usesSelfDestruct = lower.includes("selfdestruct(") || lower.includes("suicide(");

  const hasReentrancyGuard =
    lower.includes("reentrancyguard") || lower.includes("nonreentrant");

  const externalCallMatches =
    lower.match(/\.(call|delegatecall|staticcall)\(/g) || [];

  const externalCallCount = externalCallMatches.length;

  return {
    usesDelegatecall,
    usesLowLevelCall,
    usesTxOrigin,
    usesSelfDestruct,
    hasReentrancyGuard,
    externalCallCount,
  };
}
