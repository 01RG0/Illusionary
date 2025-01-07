"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sparkles, ArrowRight, Zap } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  // const [time, setTime] = useState(0)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTime(prevTime => prevTime + 0.1)
  //   }, 50)
  //   return () => clearInterval(interval)
  // }, [])

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900">
      {/* Smooth, automatic background animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-screen filter blur-xl opacity-10"
            style={{
              background: `radial-gradient(circle, rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.8) 0%, rgba(0,0,0,0) 70%)`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: Math.random() * 10 + 10,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 relative z-10 max-w-4xl mx-auto"
      >
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Image
            src="https://i.imghippo.com/files/YRb1365vU.png"
            alt="Illusionary"
            width={600}
            height={150}
            className="mx-auto"
            priority
          />
        </motion.div>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Unleash Your Imagination
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl text-gray-200 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Create stunning AI-generated images with enhanced prompts and share your creations with the world
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button asChild size="lg" className="group bg-purple-600 hover:bg-purple-700 text-white">
            <Link href="/generate">
              Start Creating
              <Sparkles className="ml-2 h-5 w-5 transition-transform group-hover:scale-125" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="group bg-white/10 hover:bg-white/20 text-white border-white/20">
            <Link href="/gallery">
              Explore Gallery
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-0 right-0 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <p className="text-lg font-semibold text-gray-300 mb-2">Powered by cutting-edge AI</p>
        <Zap className="inline-block h-6 w-6 text-yellow-400 animate-pulse" />
      </motion.div>
    </div>
  )
}

