'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { slideUp } from '@/lib/animations'

export function CTASection() {
  return (
    <section className="relative space-y-8 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideUp}
        className="rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/50 to-black p-8 text-center sm:p-12"
      >
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          Ready to Secure Your Smart Contracts?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-400">
          Get instant access to enterprise-grade smart contract analysis. Start your free trial today.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row justify-center sm:gap-4">
          <Button size="lg" className="gap-2">
            Start Free Trial <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-zinc-700 text-white hover:bg-zinc-900 hover:border-zinc-600"
          >
            Schedule Demo
          </Button>
        </div>

        <p className="mt-6 text-sm text-zinc-500">
          No credit card required. Analyze one contract for free.
        </p>
      </motion.div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4 text-center"
      >
        <p className="text-sm text-zinc-500">
          Questions? <a href="#contact" className="text-white hover:text-zinc-300 transition-colors">Contact us</a>
        </p>
      </motion.div>
    </section>
  )
}
