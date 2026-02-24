'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Github } from '@/components/ui/github'

export function Navbar() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="rounded-lg bg-red-600/10 p-2">
              <Shield className="h-5 w-5 text-red-500" />
            </div>
            <span className="text-lg font-semibold text-white">ContractLens</span>
          </motion.div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <Link
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-white hover:bg-zinc-900/50"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2">
      
          <Button className="hidden sm:flex">
            <Github />
            <a href="https://github.com/priyanshusinghchouhan/Contract-Lens" target='blank'>View on GitHub</a></Button>
        </div>
      </nav>
    </header>
  )
}
