import { Router } from "express";
import {isAddress} from "ethers";
import { fetchContractFromEtherscan } from "../services/etherscan.js";
import { parseABI } from "../services/parser.js";
import { analyzeAccessControl } from "../services/analyzer.js";

const router: Router = Router();

router.get("/:address", async(req , res ) => {
    try {
        const { address } = req.params;

        if(!isAddress(address)) {
            return res.status(404).json("Invalid Ethereum Address");
        }

        const contractData = await fetchContractFromEtherscan(address);

        if(!contractData) {
            return res.status(404).json("Contract not found or not verfied");
        }

        const { contractName, abi, sourceCode } = contractData;

        const functions = parseABI(abi);
        const accessControl = analyzeAccessControl(abi, sourceCode);

        return res.json({
            name: contractName,
            functions,
            accessControl
        })

    }catch(e) {
        console.log(e);
        return res.status(500).json({e: "Internal Server Error"});
    }
});

export default router;