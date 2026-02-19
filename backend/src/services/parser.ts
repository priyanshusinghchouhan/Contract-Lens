export function parseABI(abi: any[]) {
    if(!Array.isArray(abi)){
        return []
    }

    return abi
        .filter((item) => item.type === "function")
        .map((fn) => ({
            name: fn.name,
            stateMutability: fn.stateMutability,
            inputs: fn.inputs?.map((input: any) => input.type) || [],
            outputs: fn.outputs?.map((output: any) => output.type) || []
        }));
}