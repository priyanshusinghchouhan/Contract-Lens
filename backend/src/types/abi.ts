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
  
export interface ABIEvent {
    type: "event";
    name: string;
    inputs?: ABIParameter[];
}
  
export interface ABIConstructor {
    type: "constructor";
    inputs?: ABIParameter[];
    stateMutability?: "nonpayable" | "payable";
}
  
export type ABIItem = ABIFunction | ABIEvent | ABIConstructor;
  
export type ABI = ABIItem[];