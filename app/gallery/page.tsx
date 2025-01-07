"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

interface SharedImage {
  id: string
  url: string
  prompt: string
  timestamp: number
}

export default function Gallery() {
  const [images, setImages] = useState<SharedImage[]>([])

  useEffect(() => {
    fetch('/api/images')
      .then(res => res.json())
      .then(setImages)
      .catch(console.error)
  }, [])

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Image Gallery
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map(image => (
            <Card key={image.id} className="overflow-hidden">
              <Link href={`/image/${image.id}`}>
                <div className="relative aspect-square">
                  <Image
                    src={image.url}
                    alt={image.prompt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 truncate">{image.prompt}</p>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

