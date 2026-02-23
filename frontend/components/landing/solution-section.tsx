'use client'

import { motion } from 'framer-motion'
import { Brain, Shield, Zap, Database } from 'lucide-react'
import { slideUp, staggerContainer } from '@/lib/animations'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Our deterministic AI model analyzes every line of code, identifying vulnerabilities and optimization opportunities.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Military-grade encryption and SOC 2 compliance ensure your code analysis stays completely private and secure.',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get comprehensive analysis in seconds, not weeks. Deploy with confidence backed by real-time intelligence.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: Database,
    title: 'Historical Insights',
    description: 'Learn from patterns across thousands of audited contracts and industry benchmarks in one platform.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
]

export function SolutionSection() {
  return (
    <section className="relative space-y-16 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideUp}
        className="space-y-4 text-center"
      >
        <h2 className="text-3xl font-bold sm:text-4xl">
          The Future of Smart Contract Security
        </h2>
        <p className="mx-auto max-w-2xl text-zinc-400">
          ContractLens combines advanced AI with security expertise to deliver unmatched intelligence.
        </p>
      </motion.div>

      {/* Features grid 2x2 */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid gap-6 md:grid-cols-2"
      >
        {features.map((feature, idx) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={idx}
              variants={slideUp}
              custom={idx}
              className="premium-card"
            >
              <div className={`mb-4 inline-flex rounded-lg ${feature.bg} p-3`}>
                <Icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
