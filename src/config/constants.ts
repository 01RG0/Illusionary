export const MODELS = [
  { id: 'flux', label: 'Flux (Default)' },
  { id: 'sdxl', label: 'Stable Diffusion XL' },
];

export const DIMENSIONS: Array<{ width: number; height: number; label: string }> = [
  { width: 1024, height: 1024, label: 'Square (1024×1024)' },
  { width: 1280, height: 720, label: 'Landscape HD (1280×720)' },
  { width: 1920, height: 1080, label: 'Landscape FHD (1920×1080)' },
  { width: 720, height: 1280, label: 'Portrait HD (720×1280)' },
];

export const API_BASE_URL = 'https://image.pollinations.ai/prompt/';