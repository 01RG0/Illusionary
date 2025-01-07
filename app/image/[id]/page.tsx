"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Download, Share } from 'lucide-react'
import { toast } from 'sonner'

interface SharedImage {
  id: string
  url: string
  prompt: string
  timestamp: number
}

export default function SharedImage() {
  const { id } = useParams()
  const [image, setImage] = useState<SharedImage | null>(null)

  useEffect(() => {
    fetch(`/api/images`)
      .then(res => res.json())
      .then(images => setImage(images.find((img: SharedImage) => img.id === id) || null))
      .catch(console.error)
  }, [id])

  const handleDownload = async () => {
    if (!image) return

    try {
      const response = await fetch(image.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `illusionary-${image.id}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('Image downloaded successfully!')
    } catch (err) {
      toast.error('Failed to download image')
    }
  }

  const handleShare = async () => {
    if (!image) return

    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Share link copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy share link')
    }
  }

  if (!image) {
    return <div className="container mx-auto py-12 px-4 text-center">Image not found</div>
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Shared Image
        </h1>
        
        <Card className="overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={image.url}
              alt={image.prompt}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 space-y-4">
            <p className="text-lg">{image.prompt}</p>
            <div className="flex gap-2">
              <Button onClick={handleDownload} variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button onClick={handleShare} variant="outline" className="flex-1">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

