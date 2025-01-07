const GEMINI_API_KEY = 'AIzaSyCah2ltj0rzPBztKvZVjWLHw567gTPC4_M'
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent'

export async function enhancePrompt(prompt: string, style?: string): Promise<string> {
  try {
    const stylePrompt = style && style !== 'none'
      ? `Enhance this image generation prompt by adding more details and making it match the ${style} style while keeping the original intent. Prompt: ${prompt}`
      : `Enhance this image generation prompt by adding more details, artistic style, and visual elements. Make it more descriptive and specific, but keep the original intent. Prompt: ${prompt}`

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: stylePrompt
          }]
        }]
      })
    })

    const data = await response.json()
    return data.candidates[0].content.parts[0].text
  } catch (error) {
    console.error('Error enhancing prompt:', error)
    return prompt // Return original prompt if enhancement fails
  }
}

