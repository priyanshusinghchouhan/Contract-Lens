import { fetchContractFromExplorer } from "./fetchContractFromExplorer.js";
import { SUPPORTED_CHAINS } from "../config.js";
import { JsonRpcProvider } from "ethers";
import { ContractData } from "../types/contractData.js";

type DetectionResult =
  | { type: "SUCCESS"; data: ContractData }
  | { type: "NOT_VERIFIED"; chainId: number }
  | { type: "NOT_FOUND" };

const PRIORITY_CHAINS = [
  1,        
  42161,         
  137,     
  11155111, 
];

async function isSmartContract(address: string, rpcUrl: string) {
  const provider = new JsonRpcProvider(rpcUrl);
  const code = await provider.getCode(address);
  return code !== "0x";
}

export async function detectChainAndFetch(
  address: string
): Promise<DetectionResult> {
  for (const chainId of PRIORITY_CHAINS) {
    const chain = SUPPORTED_CHAINS[chainId];
    if (!chain) continue;

    try {
      const isContract = await isSmartContract(address, chain.rpcUrl);
      if (!isContract) continue;

      const contractData = await fetchContractFromExplorer(
        address,
        chain.chainId
      );

      if (!contractData) {
        return {
          type: "NOT_VERIFIED",
          chainId: chain.chainId,
        };
      }

      return {
        type: "SUCCESS",
        data: contractData,
      };

    } catch {
      continue;
    }
  }

  return { type: "NOT_FOUND" };
}