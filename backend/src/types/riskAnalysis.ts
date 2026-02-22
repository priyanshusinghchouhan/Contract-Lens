export interface RiskAnalysis {
  usesDelegatecall: boolean;
  usesLowLevelCall: boolean;
  usesTxOrigin: boolean;
  usesSelfDestruct: boolean;
  hasReentrancyGuard: boolean;
  externalCallCount: number;
}

export interface RiskScoreResult {
  score: number;
  level: "Low" | "Medium" | "High";
  breakdown: Record<string, number>;
}