'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Animation variables
    let time = 0
    const grid = 40
    const animate = () => {
      time += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + Math.sin(time) * 0.02})`
      ctx.lineWidth = 1

      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += grid) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += grid) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => window.removeEventListener('resize', setCanvasSize)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />

      {/* Glow effects */}
      <motion.div
        className="glow-gradient glow-large"
        style={{
          top: '10%',
          left: '10%',
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, 30, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="glow-gradient h-80 w-80"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 72%)',
          top: '58%',
          right: '8%',
        }}
        animate={{
          x: [0, -26, 20, 0],
          y: [0, -24, 16, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="glow-gradient h-64 w-64"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 72%)',
          top: '22%',
          left: '68%',
        }}
        animate={{
          x: [0, 18, -14, 0],
          y: [0, 16, -10, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="glow-gradient h-72 w-72"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 74%)',
          bottom: '12%',
          left: '18%',
        }}
        animate={{
          x: [0, 12, -10, 0],
          y: [0, -12, 10, 0],
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
