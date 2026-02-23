export interface RiskAnalysis {
  usesDelegatecall: boolean;
  usesLowLevelCall: boolean;
  usesTxOrigin: boolean;
  usesSelfDestruct: boolean;
  hasReentrancyGuard: boolean;
  externalCallCount: number;
}

export interface RiskBreakdown {
  selfDestruct: number;
  delegatecall: number;
  txOrigin: number;
  lowLevelCall: number;
  externalCallDensity: number;
  reentrancyMitigation: number;
}

export interface RiskScoreResult {
  score: number;
  level: "Low" | "Medium" | "High";
  breakdown: RiskBreakdown;
}