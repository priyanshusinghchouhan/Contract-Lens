import { RiskScoreResult } from "../types/riskAnalysis.js";
import { RiskAnalysis } from "../types/riskAnalysis.js";

export function calculateRiskScore(risks: RiskAnalysis): RiskScoreResult {
  let score = 0;
  const breakdown: Record<string, number> = {};

  if (risks.usesSelfDestruct) {
    score += 3;
    breakdown.selfDestruct = 3;
  }

  if (risks.usesDelegatecall) {
    score += 3;
    breakdown.delegatecall = 3;
  }

  if (risks.usesTxOrigin) {
    score += 2;
    breakdown.txOrigin = 2;
  }

  if (risks.usesLowLevelCall) {
    score += 2;
    breakdown.lowLevelCall = 2;
  }

  if (risks.externalCallCount > 5) {
    score += 3;
    breakdown.externalCallDensity = 3;
  } else if (risks.externalCallCount >= 3) {
    score += 2;
    breakdown.externalCallDensity = 2;
  } else if (risks.externalCallCount >= 1) {
    score += 1;
    breakdown.externalCallDensity = 1;
  }

  if (risks.hasReentrancyGuard) {
    score -= 1;
    breakdown.reentrancyMitigation = -1;
  }

  if (score < 0) score = 0;

  let level: "Low" | "Medium" | "High";

  if (score >= 6) level = "High";
  else if (score >= 3) level = "Medium";
  else level = "Low";

  return { score, level, breakdown };
}