import axios from "axios";
import { ABI } from "../types/abi.js";
import { SUPPORTED_CHAINS } from "../config.js";

export async function fetchContractFromExplorer(
  address: string,
  chainId: number
) {
  const chain = SUPPORTED_CHAINS[chainId];
  if (!chain) return null;

  const apiKey = process.env[chain.apiKeyEnv];
  if (!apiKey) {
    return null;
  }

  try {
    const response = await axios.get(chain.apiUrl, {
      timeout: 8000, 
      params: {
        chainid: chain.chainId,
        module: "contract",
        action: "getsourcecode",
        address,
        apikey: apiKey,
      },
    });

    if (response.data.status !== "1") {
      return null;
    }

    const result = response.data.result?.[0];
    if (!result) return null;

    if (!result.SourceCode || result.SourceCode.trim() === "") {
      return null;
    }

    if (
      result.ABI === "Contract source code not verified" ||
      !result.ABI
    ) {
      return null;
    }

    let parsedAbi: ABI;

    try {
      parsedAbi = JSON.parse(result.ABI) as ABI;
    } catch {
      return null;
    }

    return {
      contractName: result.ContractName || "Unknown",
      abi: parsedAbi,
      sourceCode: result.SourceCode,
      compilerVersion: result.CompilerVersion || "Unknown",
      proxy: result.Proxy === "1",
      implementations: result.Implementation || null,
      chainId,
    };
  } catch (error: any) {
    if (error.code === "ECONNABORTED") {
      console.warn(`Explorer timeout on chain ${chainId}`);
    }

    return null;
  }
}