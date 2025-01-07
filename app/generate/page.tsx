"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import Image from 'next/image'
import { Download, Loader2, Share, Sparkles } from 'lucide-react'
import { enhancePrompt } from '@/utils/enhance-prompt'
import { toast } from 'sonner'

const DIMENSION_PRESETS = {
  'square': { width: '1024', height: '1024', label: 'Square (1:1)' },
  'portrait': { width: '1024', height: '1536', label: 'Portrait (2:3)' },
  'landscape': { width: '1536', height: '1024', label: 'Landscape (3:2)' },
  'wide': { width: '1920', height: '1080', label: 'Wide (16:9)' },
  'custom': { width: '', height: '', label: 'Custom' }
}

const ARTISTIC_STYLES = [
  { value: 'photorealistic', label: 'Photorealistic' },
  { value: 'anime', label: 'Anime/Manga' },
  { value: 'oil-painting', label: 'Oil Painting' },
  { value: 'watercolor', label: 'Watercolor' },
  { value: 'digital-art', label: 'Digital Art' },
  { value: 'pixel-art', label: '8-bit Pixel Art' },
  { value: 'cyberpunk', label: 'Cyberpunk' },
  { value: 'steampunk', label: 'Steampunk' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'abstract', label: 'Abstract' },
  { value: '3d-render', label: '3D Render' },
  { value: 'pencil-sketch', label: 'Pencil Sketch' },
]

export default function Generate() {
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState('flux')
  const [dimensionPreset, setDimensionPreset] = useState('square')
  const [width, setWidth] = useState(DIMENSION_PRESETS.square.width)
  const [height, setHeight] = useState(DIMENSION_PRESETS.square.height)
  const [seed, setSeed] = useState('')
  const [style, setStyle] = useState('none')
  const [enhanceWithGemini, setEnhanceWithGemini] = useState(true)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [enhancedPrompt, setEnhancedPrompt] = useState<string | null>(null)

  const handleDimensionPresetChange = (value: string) => {
    setDimensionPreset(value)
    if (value !== 'custom') {
      setWidth(DIMENSION_PRESETS[value as keyof typeof DIMENSION_PRESETS].width)
      setHeight(DIMENSION_PRESETS[value as keyof typeof DIMENSION_PRESETS].height)
    }
  }

  const handleDownload = async () => {
    if (!result) return

    try {
      const response = await fetch(result)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `illusionary-${Date.now()}.png`
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
    if (!result) return

    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: result, prompt, timestamp: Date.now() }),
      })

      if (response.ok) {
        const { id } = await response.json()
        const shareUrl = `${window.location.origin}/image/${id}`
        await navigator.clipboard.writeText(shareUrl)
        toast.success('Share link copied to clipboard!')
      } else {
        throw new Error('Failed to share image')
      }
    } catch (err) {
      toast.error('Failed to share image')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    setEnhancedPrompt(null)

    try {
      let finalPrompt = prompt
      if (enhanceWithGemini) {
        const enhanced = await enhancePrompt(prompt, style !== 'none' ? style : undefined)
        setEnhancedPrompt(enhanced)
        finalPrompt = enhanced
      }

      // Increased loading time to 8 seconds
      await new Promise(resolve => setTimeout(resolve, 13000))

      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?` + 
        new URLSearchParams({
          width,
          height,
          model,
          ...(seed && { seed }),
          nologo: 'true',
        }).toString()
    
      setResult(imageUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Create Your Image
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label htmlFor="prompt" className="text-white">Prompt</Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to create..."
                  required
                  className="min-h-[100px] bg-white/20 border-white/20 text-white placeholder-white/50"
                />
              </motion.div>

              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Switch
                  id="enhance"
                  checked={enhanceWithGemini}
                  onCheckedChange={setEnhanceWithGemini}
                />
                <Label htmlFor="enhance" className="cursor-pointer text-white">
                  Enhance prompt with Gemini AI
                </Label>
              </motion.div>

              {enhanceWithGemini && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="style" className="text-white">Artistic Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="bg-white/20 border-white/20 text-white">
                      <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No specific style</SelectItem>
                      {ARTISTIC_STYLES.map(style => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              )}
              
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Label htmlFor="model" className="text-white">Model</Label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className="bg-white/20 border-white/20 text-white">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flux">Flux (Default)</SelectItem>
                    <SelectItem value="sdxl">Stable Diffusion XL</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Label htmlFor="dimensions" className="text-white">Dimensions</Label>
                <Select value={dimensionPreset} onValueChange={handleDimensionPresetChange}>
                  <SelectTrigger className="bg-white/20 border-white/20 text-white">
                    <SelectValue placeholder="Select dimensions" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(DIMENSION_PRESETS).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              {dimensionPreset === 'custom' && (
                <motion.div
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="width" className="text-white">Width</Label>
                    <Input
                      id="width"
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      min="64"
                      max="2048"
                      step="64"
                      placeholder="Width (px)"
                      className="bg-white/20 border-white/20 text-white placeholder-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-white">Height</Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      min="64"
                      max="2048"
                      step="64"
                      placeholder="Height (px)"
                      className="bg-white/20 border-white/20 text-white placeholder-white/50"
                    />
                  </div>
                </motion.div>
              )}

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Label htmlFor="seed" className="text-white">Seed (Optional)</Label>
                <Input
                  id="seed"
                  type="number"
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  placeholder="Enter a seed for reproducible results"
                  className="bg-white/20 border-white/20 text-white placeholder-white/50"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate
                      <Sparkles className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Result</h2>
              {/* {enhancedPrompt && (
                <motion.div
                  className="bg-white/20 p-4 rounded-lg text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="font-medium mb-2 text-white">Enhanced Prompt:</p>
                  <p className="text-gray-200">{enhancedPrompt}</p>
                </motion.div>
              )} */}
              {error && (
                <motion.div
                  className="text-red-400 bg-red-900/50 p-4 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {error}
                </motion.div>
              )}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    className="flex flex-col items-center justify-center p-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative w-64 h-64">
                      <motion.div
                        className="absolute inset-0 border-4 border-purple-500 rounded-full"
                        style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div
                        className="absolute inset-2 border-4 border-pink-500 rounded-full"
                        style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div
                        className="absolute inset-4 border-4 border-blue-500 rounded-full"
                        style={{ borderBottomColor: 'transparent', borderRightColor: 'transparent' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                    <p className="mt-4 text-lg font-semibold text-white">Creating your masterpiece...</p>
                    <p className="text-sm text-gray-300 mt-2">This might take a few moments</p>
                  </motion.div>
                )}
              </AnimatePresence>
              {result && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-white/20">
                    <Image
                      src={result}
                      alt="Generated image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      onClick={handleShare}
                      variant="outline"
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20"
                    >
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </motion.div>
              )}
              {!loading && !error && !result && (
                <div className="text-center text-gray-300 p-8">
                  Your generated image will appear here
                </div>
              )}
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}

