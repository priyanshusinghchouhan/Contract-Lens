import { ABI } from "./abi.js";

export interface ContractData {
  contractName: string;
  abi: ABI;
  sourceCode: string;
  compilerVersion: string;
  proxy: boolean;
  implementations: string | null;
  chainId: number;
}