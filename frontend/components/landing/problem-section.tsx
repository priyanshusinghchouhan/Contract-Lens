'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Clock, Eye } from 'lucide-react'
import { slideUp, staggerContainer } from '@/lib/animations'

const problems = [
  {
    icon: AlertTriangle,
    title: 'Hidden Vulnerabilities',
    description: 'Existing audits miss complex attack vectors and edge cases that expose your capital to risk.',
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
  {
    icon: Clock,
    title: 'Slow Manual Reviews',
    description: 'Traditional audits take weeks and cost thousands. Get instant analysis with AI-powered insights.',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  {
    icon: Eye,
    title: 'Incomplete Transparency',
    description: 'Understand exactly what your smart contracts do and identify potential security gaps before deployment.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
]

export function ProblemSection() {
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
          Smart Contracts Deserve Better Security
        </h2>
        <p className="mx-auto max-w-2xl text-zinc-400">
          Current audit methods are incomplete, expensive, and slow. We're changing that.
        </p>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid gap-6 md:grid-cols-3"
      >
        {problems.map((problem, idx) => {
          const Icon = problem.icon
          return (
            <motion.div
              key={idx}
              variants={slideUp}
              custom={idx}
              className="premium-card group"
            >
              <div className={`mb-4 inline-flex rounded-lg ${problem.bg} p-3`}>
                <Icon className={`h-6 w-6 ${problem.color}`} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{problem.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{problem.description}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
