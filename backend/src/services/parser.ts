import { ABI, ABIFunction } from "../types/abi.js";

export function parseABI(abi: ABI) {
    if(!Array.isArray(abi)){
        return []
    }

    return abi
        .filter((item): item is ABIFunction => item.type === "function")
        .map((fn) => ({
            name: fn.name,
            stateMutability: fn.stateMutability,
            inputs: fn.inputs?.map((input: any) => input.type) || [],
            outputs: fn.outputs?.map((output: any) => output.type) || []
        }));
}