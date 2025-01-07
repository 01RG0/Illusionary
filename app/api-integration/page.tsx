"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ApiIntegration() {
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-8"
      >
        Pollinations.AI API Integration
      </motion.h1>
      <Tabs defaultValue="image" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="image">Image Generation</TabsTrigger>
          <TabsTrigger value="text">Text Generation</TabsTrigger>
        </TabsList>
        <TabsContent value="image">
          <Card>
            <CardHeader>
              <CardTitle>Image Generation API</CardTitle>
              <CardDescription>Generate stunning images with Pollinations.AI</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                {`
fetch('https://api.pollinations.ai/v1/image', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    prompt: 'A beautiful sunset over a futuristic city',
    width: 512,
    height: 512,
    model: 'stable-diffusion-v1-5'
  })
})
.then(response => response.json())
.then(data => console.log(data))
                `}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>Text Generation API</CardTitle>
              <CardDescription>Generate creative text with Pollinations.AI</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                {`
fetch('https://api.pollinations.ai/v1/text', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    prompt: 'Write a short story about a time traveler',
    max_tokens: 100,
    model: 'gpt-3.5-turbo'
  })
})
.then(response => response.json())
.then(data => console.log(data))
                `}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

