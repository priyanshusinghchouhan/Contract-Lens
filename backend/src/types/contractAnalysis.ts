export interface ContractAnalysis{
    contractName: string;
    functions: Array<{
        name: string;
        stateMutability: string;
        inputs: string[];
        outputs: string[];
    }>;
    accessControl: {
        isOwnable: boolean,
        hasOnlyOwnerModifier: boolean,
        hasOwnerFunction: boolean,
        hasRenounceOwnership: boolean,
        hasTransferOwnership: boolean
    };
    upgradeability: {
        isProxy: boolean,
        pattern: string | null,
        usesDelegatecall: boolean
    };
    riskAnalysis: {
        usesDelegatecall: boolean,
        usesLowLevelCall: boolean,
        usesTxOrigin: boolean,
        usesSelfDestruct: boolean,
        hasReentrancyGuard: boolean,
        externalCallCount: number
    };
    riskScore: {
        score: number,
        level: string,
        breakdown: {
            delegatecall: number,
            lowLevelCall: number,
            externalCallDensity: number,
            reentrancyMitigation: number
        }
    }
}