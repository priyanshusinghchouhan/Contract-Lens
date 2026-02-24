import { Router } from "express";
import {isAddress} from "ethers";
import { fetchContractFromEtherscan } from "../services/etherscan.js";
import { parseABI } from "../services/parser.js";
import { analyzeAccessControl } from "../services/analyzer.js";
import { detectUpgradeability } from "../services/detectUpgradeability.js";
import { analyzeRisks } from "../services/riskAnalyzer.js";
import { ABI, ABIFunction } from "../types/abi.js";
import { calculateRiskScore } from "../services/riskScoring.js";
import { explainContract } from "../services/claude.js";

const router: Router = Router();

function containsBusinessLogic(abi: ABI) {
  const functionNames = abi
    .filter((item):item is ABIFunction => item.type === "function")
    .map((f) => f.name);

  return (
    functionNames.includes("transfer") ||
    functionNames.includes("approve") ||
    functionNames.includes("mint") ||
    functionNames.includes("balanceOf")
  );
}


async function resolveFinalImplementation(address: string) {
  let current = await fetchContractFromEtherscan(address);
  if (!current) return null;

  while (current.proxy && current.implementations) {
    const next = await fetchContractFromEtherscan(current.implementations);
    if (!next) break;

    if (containsBusinessLogic(next.abi)) {
      return next;
    }

    current = next;
  }

  return current;
}

router.get("/:address", async(req , res ) => {
    try {
        const { address } = req.params;

        if(!isAddress(address)) {
            return res.status(400).json({error : "Invalid Ethereum Address"});
        }

        let contractData = await resolveFinalImplementation(address);

        if(!contractData) {
            return res.status(404).json("Contract not found or not verfied");
        }

        const { contractName, abi, sourceCode } = contractData;

        const functions = parseABI(abi);
        const accessControl = analyzeAccessControl(abi, sourceCode);
        const upgradeability = detectUpgradeability(abi, sourceCode, contractData.proxy)
        const riskAnalysis = analyzeRisks(sourceCode);
        const {score, level, breakdown } = calculateRiskScore(riskAnalysis);

        return res.json({
            name: contractName,
            functions,
            accessControl,
            upgradeability,
            riskAnalysis,
            riskScore: {
              score,
              level,
              breakdown
            },
        })

    }catch(e) {
        console.log(e);
        return res.status(500).json({e: "Internal Server Error"});
    }
});

router.post("/:address/explain", async (req, res) => {
  try {
    const { address } = req.params;

    if (!isAddress(address)) {
      return res.status(400).json({ error: "Invalid Ethereum Address" });
    }

    let contractData = await resolveFinalImplementation(address);

    if (!contractData) {
      return res.status(404).json({ error: "Contract not found or not verified" });
    }

    const { contractName, abi, sourceCode } = contractData;

    const functions = parseABI(abi);
    const accessControl = analyzeAccessControl(abi, sourceCode);
    const upgradeability = detectUpgradeability(
      abi,
      sourceCode,
      contractData.proxy
    );
    const riskAnalysis = analyzeRisks(sourceCode);
    const { score, level, breakdown } = calculateRiskScore(riskAnalysis);

    const explanation = await explainContract({
      contractName,
      functions,
      accessControl,
      upgradeability,
      riskAnalysis,
      riskScore: {
        score,
        level,
        breakdown,
      },
    });

    return res.json({ explanation });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;