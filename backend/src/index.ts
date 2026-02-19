import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contractRouter from "./routes/contract.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contract", contractRouter);

const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
