import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { rateLimit } from '@/lib/rate-limit'

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 users per minute
})

// Update the type definition
let images: { id: string; url: string; prompt: string; timestamp: number }[] = []

export async function GET() {
  const currentTime = Date.now()
  const fortyEightHoursAgo = currentTime - 48 * 60 * 60 * 1000
  
  // Filter out images older than 48 hours
  const recentImages = images.filter(img => img.timestamp > fortyEightHoursAgo)
  
  return NextResponse.json(recentImages)
}

export async function POST(req: Request) {
  try {
    await limiter.check(req, 10, 'CACHE_TOKEN') // 10 requests per minute
  } catch {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  const { url, prompt } = await req.json()
  const id = uuidv4()
  const timestamp = Date.now()
  const newImage = { id, url, prompt, timestamp }
  images.push(newImage)
  return NextResponse.json(newImage, { status: 201 })
}

