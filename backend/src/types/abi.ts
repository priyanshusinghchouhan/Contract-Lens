// src/types/abi.ts

/**
 * Minimal ABI Type Definitions
 * Covers only what's needed for current usage
 */

export interface ABIParameter {
    type: string;
    name?: string;
  }
  
  export interface ABIFunction {
    type: "function";
    name: string;
    stateMutability: "pure" | "view" | "nonpayable" | "payable";
    inputs?: ABIParameter[];
    outputs?: ABIParameter[];
  }
  
  export interface ABIItem {
    type: string;
    name?: string;
  }
  
  export type ABI = ABIItem[];