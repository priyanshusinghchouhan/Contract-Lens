import type { Metadata } from "next";
import AnalyzeClient from "./analyze";

export const metadata: Metadata = {
  title: "Analyze Smart Contract",
};

export default function AnalyzePage() {
  return <AnalyzeClient />;
}