import axios from "axios";

const BASE_URL = "https://api.etherscan.io/v2/api";

export async function fetchContractFromEtherscan(address:string) {
    try {
        console.log("hello00");
        const response = await axios.get(BASE_URL, {
            params: {
                chainid: 11155111,
                module: "contract",
                action: "getsourcecode",
                address,
                apikey: process.env.ETHERSCAN_API_KEY,
            }
        });

        console.log("hello011");

        const result = response.data.result?.[0];
        console.log("result: ",result.data);
        console.log("result: ",result.ContractName);
        console.log("result: ",result);

        console.log("hello012");

        if(!result || !result.SourceCode) {
            console.log("no source code");
            return null;
        }

        console.log("hello013");

        if (result.ABI === "Contract source code not verified") {
            return null;
        }

        console.log("hello0114");

        return {
            contractName: result.ContractName,
            abi: JSON.parse(result.ABI),
            sourceCode: result.SourceCode,
            compilerVersion: result.CompilerVersion,
            proxy: result.Proxy === "1",
        };

    }catch(e) {
        console.log("Etherscan fetch error: ", e);
        throw new Error("Failed to fetch contract");
    }
}