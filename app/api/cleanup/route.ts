import { NextResponse } from 'next/server'

// This is a reference to the images array in the images route
// In a real application, this would be a database
declare const images: { id: string; url: string; prompt: string; timestamp: number }[]

export async function GET() {
  const currentTime = Date.now()
  const fortyEightHoursAgo = currentTime - 48 * 60 * 60 * 1000
  
  // Remove images older than 48 hours
  const initialLength = images.length
  images = images.filter(img => img.timestamp > fortyEightHoursAgo)
  const removedCount = initialLength - images.length

  return NextResponse.json({ message: `Removed ${removedCount} old images` })
}

