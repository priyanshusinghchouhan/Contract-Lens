import { fetchContractFromExplorer } from "./fetchContractFromExplorer.js";

const PRIORITY_CHAINS = [
  1,        
  42161,    
  10,      
  8453,     
  137,     
  11155111, 
];

export async function detectChainAndFetch(address: string) {
  for (const chainId of PRIORITY_CHAINS) {
    const result = await fetchContractFromExplorer(address, chainId);
    if (result) {
      return result;
    }
  }

  return null;
}