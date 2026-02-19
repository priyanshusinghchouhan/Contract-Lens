export function analyzeAccessControl(abi: any[], sourceCode: string) {
    const functionNames = abi
        .filter((item) => item.type === "function")
        .map((fn) => fn.name);

    const hasOwnerFunction = functionNames.includes("owner");
    const hasTransferOwnership = functionNames.includes("transferOwnership");
    const hasRenounceOwnership = functionNames.includes("renounceOwnership");

    const hasOnlyOwnerModifier = sourceCode.includes("onlyOwner");

    const isOwnable = 
        hasOwnerFunction ||
        hasTransferOwnership ||
        hasRenounceOwnership ||
        hasOnlyOwnerModifier;
    

    return {
        isOwnable,
        hasOnlyOwnerModifier,
        hasOwnerFunction,
        hasRenounceOwnership,
        hasTransferOwnership
    }

}