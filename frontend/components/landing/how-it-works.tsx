'use client'

import { motion } from 'framer-motion'
import { Upload, Zap, CheckCircle } from 'lucide-react'
import { slideUp, staggerContainer } from '@/lib/animations'

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload Your Code',
    description: 'Submit your smart contract in Solidity, Rust, or other blockchain languages. Our platform securely processes your code.',
  },
  {
    number: '02',
    icon: Zap,
    title: 'AI Analysis',
    description: 'Our deterministic AI analyzes every function, variable, and interaction. Identifies vulnerabilities instantly.',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Get Insights',
    description: 'Receive detailed reports with risk scores, recommendations, and optimization suggestions for deployment.',
  },
]

export function HowItWorks() {
  return (
    <section className="relative space-y-16 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideUp}
        className="space-y-4 text-center"
      >
        <h2 className="text-3xl font-bold sm:text-4xl">How It Works</h2>
        <p className="mx-auto max-w-2xl text-zinc-400">
          Three simple steps to secure your smart contracts with enterprise-grade analysis.
        </p>
      </motion.div>

      {/* Steps */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-8"
      >
        {steps.map((step, idx) => {
          const Icon = step.icon
          return (
            <motion.div key={idx} variants={slideUp} custom={idx}>
              <div className="flex gap-6">
                {/* Number and icon */}
                <div className="flex flex-col items-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500/30 bg-red-500/10">
                    <Icon className="h-8 w-8 text-red-500" />
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="mb-4 h-12 w-0.5 bg-gradient-to-b from-red-500/50 to-transparent" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="space-y-2">
                    <span className="text-sm font-semibold text-red-500">{step.number}</span>
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                    <p className="text-zinc-400">{step.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
