'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { slideUp } from '@/lib/animations'

const trustPoints = [
  'Audited by leading security firms',
  '256-bit military-grade encryption',
  'SOC 2 Type II compliant',
  'Zero-knowledge architecture',
  'Trusted by Fortune 500 companies',
  'Open-source transparency',
]

export function TrustSection() {
  return (
    <section className="relative space-y-16 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideUp}
        className="mx-auto max-w-3xl space-y-8 text-center"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Enterprise-Grade Security You Can Trust
          </h2>
          <p className="text-lg text-zinc-400">
            Built from the ground up with security and privacy as first principles. Your code analysis never leaves our secure infrastructure.
          </p>
        </div>

        {/* Trust points grid */}
        <div className="grid gap-4 sm:grid-cols-2 text-left">
          {trustPoints.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-3"
            >
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-zinc-300">{point}</span>
            </motion.div>
          ))}
        </div>

        {/* Certification section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4 rounded-lg border border-zinc-800/50 bg-zinc-900/30 p-6"
        >
          <p className="text-sm text-zinc-500">Verified by industry leaders</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {['ISO 27001', 'SOC 2', 'GDPR'].map((cert) => (
              <div key={cert} className="text-xs font-semibold text-white">
                ✓ {cert}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
