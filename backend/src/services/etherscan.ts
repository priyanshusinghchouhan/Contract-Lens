import axios from "axios";

const BASE_URL = "https://api.etherscan.io/v2/api";

export async function fetchContractFromEtherscan(address:string) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                chainid: 1,
                module: "contract",
                action: "getsourcecode",
                address,
                apikey: process.env.ETHERSCAN_API_KEY,
            }
        });

        const result = response.data.result?.[0];

        if(!result || !result.SourceCode) {
            console.log("no source code");
            return null;
        }

        if (result.ABI === "Contract source code not verified") {
            return null;
        }

        console.log("Implemetations: ", result.Implementation);

        return {
            contractName: result.ContractName,
            abi: JSON.parse(result.ABI),
            sourceCode: result.SourceCode,
            compilerVersion: result.CompilerVersion,
            proxy: result.Proxy === "1",
            implementations: result.Implementation || null
        };

    }catch(e) {
        console.log("Etherscan fetch error: ", e);
        throw new Error("Failed to fetch contract");
    }
}