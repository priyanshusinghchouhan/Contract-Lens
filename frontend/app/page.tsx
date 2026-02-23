import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { AnimatedGrid } from '@/components/landing/animated-grid'
import { HeroSection } from '@/components/landing/hero-section'
import { ProblemSection } from '@/components/landing/problem-section'
import { SolutionSection } from '@/components/landing/solution-section'
import { HowItWorks } from '@/components/landing/how-it-works'
import { TrustSection } from '@/components/landing/trust-section'
import { CTASection } from '@/components/landing/cta-section'

export const metadata: Metadata = {
  title: 'ContractLens - AI-Powered Smart Contract Security',
  description: 'Analyze and audit smart contracts with deterministic AI-powered risk assessment. Protect your investments with enterprise-grade security intelligence.',
  openGraph: {
    title: 'ContractLens - Smart Contract Security',
    description: 'Enterprise-grade AI-powered smart contract analysis and security intelligence.',
    type: 'website',
  },
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="pointer-events-none absolute inset-0 z-0">
        <AnimatedGrid />
      </div>

      <Navbar />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroSection />

        <section id="features">
          <ProblemSection />
          <SolutionSection />
          <HowItWorks />
          <TrustSection />
          <CTASection />
        </section>

        <footer className="border-t border-zinc-800 py-12 text-center text-sm text-zinc-500">
          <p>© 2026 ContractLens. All rights reserved. | Enterprise Security for Smart Contracts</p>
        </footer>
      </div>
    </main>
  )
}
