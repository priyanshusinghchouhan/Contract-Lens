'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductPreview } from './product-preview'
import { slideUp, slideDown, fadeIn } from '@/lib/animations'
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Headline area */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="space-y-6 text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto inline-block"
            >
              <div className="rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300 backdrop-blur-sm">
                ✨ Powered by Advanced AI Analysis
              </div>
            </motion.div>

            {/* Main headline */}
            <div className="space-y-4">
              <motion.h1
                variants={slideUp}
                custom={1}
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              >
                <span className="block text-white">Intelligent Security for</span>
                <span className="block bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
                  Smart Contracts
                </span>
              </motion.h1>

              <motion.p
                variants={slideUp}
                custom={2}
                className="mx-auto max-w-2xl text-lg text-zinc-400 sm:text-xl"
              >
                Analyze, audit, and understand smart contracts with deterministic risk assessment powered by AI. Protect your investments with confidence.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              variants={slideUp}
              custom={3}
              className="flex flex-col gap-4 sm:flex-row justify-center pt-4"
            >
              <Button size="lg" className="gap-2" asChild>
                <Link href="/analyze" className='flex items-center gap-2'>Get Started <ArrowRight className=" h-4 w-4" /></Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-zinc-700 text-white hover:bg-zinc-900 hover:border-zinc-600"
              >
                <Play className="h-4 w-4" /> Watch Demo
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={slideUp}
              custom={4}
              className="flex items-center justify-center gap-8 pt-6 text-sm text-zinc-500"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Real-time Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Enterprise Grade</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Product Preview */}
          <ProductPreview />
        </div>
      </div>

      {/* Bottom glow with controlled fade into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30rem] bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.22)_0%,rgba(220,38,38,0.12)_36%,rgba(220,38,38,0.05)_55%,rgba(0,0,0,0)_78%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-black/40 to-black" />
    </section>
  )
}
