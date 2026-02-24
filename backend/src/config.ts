export type SupportedChain = {
  chainId: number;
  name: string;
  apiUrl: string;
  apiKeyEnv: string;
};

export const SUPPORTED_CHAINS: Record<number, SupportedChain> = {
  1: {
    chainId: 1,
    name: "Ethereum",
    apiUrl: "https://api.etherscan.io/v2/api",
    apiKeyEnv: "ETHERSCAN_API_KEY",
  },
  11155111: {
    chainId: 11155111,
    name: "Sepolia",
    apiUrl: "https://api.etherscan.io/v2/api",
    apiKeyEnv: "ETHERSCAN_API_KEY",
  },
  42161: {
    chainId: 42161,
    name: "Arbitrum",
    apiUrl: "https://api.etherscan.io/v2/api",
    apiKeyEnv: "ARBISCAN_API_KEY",
  },
  10: {
    chainId: 10,
    name: "Optimism",
    apiUrl: "https://api.etherscan.io/v2/api",
    apiKeyEnv: "OPTIMISMSCAN_API_KEY",
  },
  8453: {
    chainId: 8453,
    name: "Base",
    apiUrl: "https://api.etherscan.io/v2/api",
    apiKeyEnv: "BASESCAN_API_KEY",
  },
  137: {
    chainId: 137,
    name: "Polygon",
    apiUrl: "https://api.etherscan.io/v2/api",
    apiKeyEnv: "POLYGONSCAN_API_KEY",
  },
};