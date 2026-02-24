import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { AnimatedGrid } from "@/components/landing/animated-grid";
import { HeroSection } from "@/components/landing/hero-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { SolutionSection } from "@/components/landing/solution-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CTASection } from "@/components/landing/cta-section";

export const metadata: Metadata = {
  title: "Deteministic Analysis of Smart Contracts",
  description:
    "Analyze and understand smart contracts with deterministic risk assessment powered by AI. Power your learning.",
  openGraph: {
    title: "Deteministic Analysis of Smart Contracts",
    description:
      "Analyze and understand smart contracts with deterministic risk assessment powered by AI. Power your learning.",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="pointer-events-none absolute inset-0 z-0">
        <AnimatedGrid />
      </div>

      <Navbar />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <ProblemSection />

        <section id="features" className="scroll-mt-10">
          <SolutionSection />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30rem] bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.22)_0%,rgba(220,38,38,0.12)_36%,rgba(220,38,38,0.05)_55%,rgba(0,0,0,0)_78%)] blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-black/40 to-black" />
          <section id="how-it-works" className="scroll-mt-10">
            <HowItWorks />
          </section>

          <section id="contact" className="scroll-mt-10">
            <CTASection />
          </section>
        </section>

        <footer className="border-t border-zinc-800 py-12 text-center text-sm text-zinc-500">
          <p>
            © 2026 ContractLens. All rights reserved. | Enterprise Security for
            Smart Contracts
          </p>
        </footer>
      </div>
    </main>
  );
}
