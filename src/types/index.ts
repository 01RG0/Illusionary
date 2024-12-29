export interface ImageGenerationParams {
  prompt: string;
  model?: string;
  seed?: number;
  width?: number;
  height?: number;
  nologo?: boolean;
  private?: boolean;
  enhance?: boolean;
  safe?: boolean;
}

export interface GenerationResult {
  url: string;
  params: ImageGenerationParams;
  timestamp: number;
}

export type Dimension = {
  width: number;
  height: number;
  label: string;
};