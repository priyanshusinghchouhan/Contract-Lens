"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowRight, Loader2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { AnimatedGrid } from "@/components/landing/animated-grid";
import { useRef } from "react";
import { motion } from "framer-motion";
import { slideUp } from "@/lib/animations";

export const metadata = {
  title: "ContractLens - Deterministic Analyzer of Smart Contracts",
};

type RiskScore = {
  score: number;
  level: string;
  breakdown: Record<string, number | string>;
};

type Function = {
  name: string;
  stateMutability: string;
  inputs: string[];
  outputs: string[];
};

type AccessControl = {
  isOwnable: boolean;
  hasOnlyOwnerModifier: boolean;
  hasOwnerFunction: boolean;
  hasRenounceOwnership: boolean;
  hasTransferOwnership: boolean;
};

type Upgradeability = {
  isProxy: boolean;
  pattern: string | null;
  usesDelegatecall: boolean;
};

type RiskAnalysis = {
  usesDelegatecall: boolean;
  usesLowLevelCall: boolean;
  usesTxOrigin: boolean;
  usesSelfDestruct: boolean;
  hasReentrancyGuard: boolean;
  externalCallCount: number;
}

type AnalyzeResponse = {
  name: string;
  functions: Function;
  accessControl: AccessControl;
  upgradeability: Upgradeability;
  riskAnalysis: RiskAnalysis;
  riskScore: RiskScore;
};

const API_BASE_URL =process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AnalyzePage() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const explanationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!explanationRef.current) return;
  
    window.scrollTo({
      top: explanationRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [displayedText]);

  useEffect(() => {
    if (!aiExplanation) return;
  
    let currentLength = 0;
  
    const interval = setInterval(() => {
      currentLength++;
  
      if (currentLength > aiExplanation.length) {
        clearInterval(interval);
        return;
      }
  
      setDisplayedText(aiExplanation.slice(0, currentLength));
    }, 15);
  
    return () => clearInterval(interval);
  }, [aiExplanation]);

  async function handleAnalyze() {
    const trimmed = address.trim();
    if (!trimmed) {
      setError("Please enter a contract address.");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    setAiExplanation(null);
    setDisplayedText("");
    try {
      const res = await axios.get<AnalyzeResponse>(
        `${API_BASE_URL}/api/contract/${trimmed}`,
      );
      setData(res.data);
    } catch (e: any) {
      const message =
        e?.response?.data?.error ||
        e?.message ||
        "Something went wrong while analyzing the contract.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAIExplanation() {
    const trimmed = address.trim();

    if (!trimmed || !data) {
      setError("Run an analysis before generating an explanation.");
      return;
    }

    setAiLoading(true);
    setError(null);

    try {
      const res = await axios.post<{ explanation: string }>(
        `${API_BASE_URL}/api/contract/${trimmed}/explain`,
      );
      setAiExplanation(res.data.explanation);
    } catch (e: any) {
      const message =
        e?.response?.data?.error ||
        e?.message ||
        "Something went wrong while generating the explanation.";
      setError(message);
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-black text-white ">
      <div className="pointer-events-none absolute inset-0 z-0">
        <AnimatedGrid />
      </div>

      <Navbar />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <motion.section initial="hidden" animate="visible" variants={slideUp} className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-start">
          <motion.div variants={slideUp} custom={1} className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Analyze a Smart Contract
              </h1>
              <p className="max-w-xl text-sm text-zinc-400 sm:text-base">
                Paste any verified Ethereum contract address to run a
                deterministic risk assessment and upgradeability check using the
                same engine that powers the landing page demo.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-lg shadow-red-500/5 backdrop-blur">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-zinc-300">
                  Contract address
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    placeholder="0xA0b8...  (must be verified on Etherscan)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm outline-none ring-0 transition focus:border-red-500 focus:bg-zinc-950"
                  />
                  <Button
                    size="lg"
                    className="gap-2"
                    disabled={loading}
                    onClick={handleAnalyze}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Analyze <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-xs text-zinc-500">
                  We never store your inputs. Analysis is deterministic and
                  based solely on the verified source and ABI.
                </p>
              </div>

              {error && (
                <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}
            </div>

            <div className="space-y-3 rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-950/90 to-zinc-900 p-5 text-sm text-zinc-400">
              <p className="font-medium text-zinc-200">What you’ll see here</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Deterministic risk score with a clear risk level badge.</li>
                <li>
                  Breakdown of key risk factors and upgradeability signals.
                </li>
                <li>
                  Optional AI explanation that summarizes the contract in plain
                  English.
                </li>
              </ul>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              variants={slideUp}
              custom={2}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 min-h-56 shadow-lg shadow-red-500/5 flex items-center justify-center"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Risk summary</h2>
                  <p className="mt-1 text-xs text-zinc-500">
                    Overall security posture based on static analysis.
                  </p>
                </div>

                <div>
                  <div className="text-2xl font-bold">
                    {data ? `${data.riskScore.score}/10` : "--/10"}
                  </div>

                  {data ? (
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs ${
                        data.riskScore.level === "High"
                          ? "bg-red-600/20 text-red-400"
                          : data.riskScore.level === "Medium"
                            ? "bg-yellow-600/20 text-yellow-300"
                            : "bg-green-600/20 text-green-400"
                      }`}
                    >
                      {data.riskScore.level} risk
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                      Awaiting analysis
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div variants={slideUp} custom={3} className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 max-h-59 overflow-auto hide-scrollbar">
              <h2 className="text-lg font-semibold">Risk breakdown</h2>
              <p className="mt-1 text-xs text-zinc-500 ">
                Individual dimensions that contribute to the overall score.
              </p>

              {data ? (
                <ul className="mt-4 space-y-2 text-sm text-zinc-300 ">
                  {Object.entries(data.riskScore.breakdown).map(
                    ([key, value]: any) => (
                      <li key={key} className="flex justify-between">
                        <span className="capitalize text-zinc-400">
                          {key.replace(/([A-Z])/g, " $1")}
                        </span>
                        <span className="font-medium">{value}</span>
                      </li>
                    ),
                  )}
                </ul>
              ) : (
                <div className="mt-4 text-sm text-zinc-500 overflow-auto hide-scrollbar">
                  <ul className=" list-disc mt-4 space-y-2 text-sm text-zinc-300">
                    <li>Breaks down the individual security signals that influence the overall risk score.</li>
                <li>
                  Detects potentially dangerous patterns such as delegatecall, low-level calls, and tx.origin usage.
                </li>
                <li>Identifies destructive capabilities like selfdestruct that may impact contract safety.</li>
                <li>
                  Evaluates external call density and interaction complexity.
                </li>
                  </ul>
                </div>
              )}
            </motion.div>
          </div>

          <motion.div variants={slideUp} custom={4} className="rounded-2xl border border-zinc-800 w-272 bg-zinc-900/80 p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">AI explanation</h2>
                <p className="mt-1 text-xs text-zinc-500">
                  A natural-language summary of what this contract does and why
                  the risk score looks the way it does.
                </p>
              </div>
              {!aiExplanation && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={aiLoading || !data}
                  onClick={handleAIExplanation}
                >
                  {aiLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Generate explanation"
                  )}
                </Button>
              )}
            </div>

            {aiExplanation ? (
              <div ref={explanationRef} className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 text-sm text-zinc-200 whitespace-pre-wrap">
                {displayedText}
              </div>
            ) : (
              <p className="text-sm text-zinc-500">
                After running an analysis you can optionally generate an AI
                explanation to help non-technical teammates understand the
                contract.
              </p>
            )}
          </motion.div>
        </motion.section>

        <footer className="mt-16 border-t border-zinc-800 pt-8 text-center text-xs text-zinc-500">
          <p>
            © 2026 ContractLens. Deterministic analysis first, AI assist on top.
          </p>
        </footer>
      </div>
    </main>
  );
}
