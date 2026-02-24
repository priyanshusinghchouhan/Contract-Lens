import Anthropic from "@anthropic-ai/sdk";
import { ContractAnalysis } from "../types/contractAnalysis.js";
import dotenv from "dotenv";
dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function explainContract(
  analysis: ContractAnalysis,
): Promise<string> {
  const {
    contractName,
    functions,
    accessControl,
    upgradeability,
    riskAnalysis,
    riskScore,
  } = analysis;

  const prompt = `You are a smart contract security expert. 
                    Analyze this Ethereum contract and explain it in simple terms.
                    
    Contract Name: ${contractName}
    
    Key Funtions (showing first 15):
    ${functions
      .slice(0, 15)
      .map((f) => `• ${f.name}() - ${f.stateMutability}`)
      .join("\n")}
    ${functions.length > 15 ? `\n... and ${functions.length - 15} more functions` : ""}
    
    Access Control Analysis : 
    - Has Ownable pattern: ${accessControl.isOwnable ? "Yes" : "No"}
    - Has onlyOwner modifier: ${accessControl.hasOnlyOwnerModifier ? "Yes" : "No"}
    
    Upgradebility Analysis :
    - Is a proxy contract: ${upgradeability.isProxy ? "Yes" : "No"}
    ${upgradeability.isProxy ? `• Proxy pattern: ${upgradeability.pattern}` : ""}
    - Uses delegateCall: ${upgradeability.usesDelegatecall ? "Yes" : "No"}

    Security Risk Analysis:
    - Uses delegatecall: ${riskAnalysis.usesDelegatecall ? "Yes" : " No"}
    - Uses low-level call: ${riskAnalysis.usesLowLevelCall ? "Yes" : " No"}
    - Uses tx.origin: ${riskAnalysis.usesTxOrigin ? "Yes (dangerous)" : " No"}
    - Uses selfdestruct: ${riskAnalysis.usesSelfDestruct ? "Yes" : " No"}
    - Has reentrancy guard: ${riskAnalysis.hasReentrancyGuard ? "Yes" : " No"}
    - External call count: ${riskAnalysis.externalCallCount}

    Risk Scoring:
    - Score: ${riskScore.score}
    - Level: ${riskScore.level}

    Your task:
    1. Explain what this contract does in 3-4 sentences (think: what would you tell a friend?)
    2. List 3-4 key features (what can users do with it?)
    3. Explain the risk score in simple terms (why is it ${riskScore.level ? riskScore.level.toLowerCase() : ""} risk?)

    Rules:
    - Use simple words, no jargon
    - If you must use technical terms (like "reentrancy"), explain them briefly
    - Be honest about risks but not alarmist
    - Keep response under 200 words total
    - Do NOT use asterisks (* or **).
    - Use clear, professional language.
    - Avoid analogies (e.g., "like eBay").
    - Avoid marketing tone.
    - CRITICAL: Your explanation must be understandable by someone who has never written a smart contract. Imagine explaining to a friend who just heard about blockchain yesterday.

    Example good explanation:
    "What it does: This is a token swap contract...
    Key features: • Swap tokens • Add liquidity...
    Risk level: Low risk because..."

    Keep your response under 250-300 words. Be direct and clear. Use plain English, not jargon.`;
  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    });

    let responseText =
      message.content[0]?.type === "text"
        ? message.content[0].text
        : "Unable to generate explanation";

    responseText = responseText
      .replace(/\*\*([^*]*)\*\*/g, "$1")

    return responseText;
  } catch (error) {
    console.error("Claude API error:", error);
    return "Unable to generate explanation at this time. Please try again later.";
  }
}
