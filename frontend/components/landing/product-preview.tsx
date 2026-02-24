"use client";

import { motion } from "framer-motion";
import { BarChart3, Activity, TrendingUp } from "lucide-react";

export function ProductPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative mx-auto max-w-3xl"
    >
      {/* Browser frame */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 shadow-2xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/50 px-4 py-3">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/50" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
            <div className="h-3 w-3 rounded-full bg-green-500/50" />
          </div>
          <div className="ml-auto flex-1 text-center">
            <p className="text-xs text-zinc-500">contractlens.ai/dashboard</p>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="relative overflow-hidden bg-black/40 p-6 sm:p-8">
          {/* Grid background inside */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          <div className="relative space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-zinc-400">
                  Smart Contract Analysis
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Real-time risk assessment
                </p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg bg-red-600/20 px-3 py-1 text-xs text-red-400 hover:bg-red-600/30">
                  High Risk
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  label: "Risk Score",
                  value: "7.2/10",
                  icon: Activity,
                  color: "text-red-500",
                },
                {
                  label: "External Calls",
                  value: "12",
                  icon: BarChart3,
                  color: "text-blue-500",
                },
                {
                  label: "Updates",
                  value: "4h ago",
                  icon: TrendingUp,
                  color: "text-green-500",
                },
              ].map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                    className="rounded-lg border border-zinc-800/50 bg-zinc-900/30 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-zinc-500">{metric.label}</p>
                        <p className="mt-2 text-xl font-bold text-white">
                          {metric.value}
                        </p>
                      </div>
                      <Icon className={`h-5 w-5 ${metric.color}`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Chart area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-5 space-y-5"
            >
              {/* Risk Breakdown */}
              <div>
                <p className="text-xs text-zinc-500 mb-3">Risk Breakdown</p>

                {[
                  { label: "Access Control", value: 70 },
                  { label: "Upgradeability", value: 60 },
                  { label: "Low-level Calls", value: 50 },
                  { label: "Complexity", value: 30 },
                ].map((item, idx) => (
                  <div key={idx} className="mb-3">
                    <div className="flex justify-between text-xs text-zinc-400 mb-1">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-2 w-full rounded bg-zinc-800">
                      <div
                        className="h-2 rounded bg-red-500/70"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-zinc-800" />

              {/* Detected Signals */}
              <div>
                <p className="text-xs text-zinc-500 mb-3">Detected Signals</p>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-md bg-zinc-900/40 border border-zinc-800 p-2 text-red-400">
                    ⚠ Uses delegatecall
                  </div>

                  <div className="rounded-md bg-zinc-900/40 border border-zinc-800 p-2 text-yellow-400">
                    ⚠ Upgradeable (UUPS)
                  </div>

                  <div className="rounded-md bg-zinc-900/40 border border-zinc-800 p-2 text-green-400">
                    ✓ Reentrancy Guard
                  </div>

                  <div className="rounded-md bg-zinc-900/40 border border-zinc-800 p-2 text-red-400">
                    ⚠ Admin can upgrade
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating glow */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-red-600/5 blur-3xl" />
    </motion.div>
  );
}
