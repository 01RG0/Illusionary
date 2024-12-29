import { ImageGenerationParams } from '../types';

export const generateImageUrl = (params: ImageGenerationParams): string => {
  const baseUrl = 'https://image.pollinations.ai/prompt/';
  const encodedPrompt = encodeURIComponent(params.prompt);
  
  const queryParams = new URLSearchParams();
  if (params.model) queryParams.append('model', params.model);
  if (params.seed) queryParams.append('seed', params.seed.toString());
  if (params.width) queryParams.append('width', params.width.toString());
  if (params.height) queryParams.append('height', params.height.toString());
  if (params.nologo) queryParams.append('nologo', 'true');
  if (params.private) queryParams.append('private', 'true');
  if (params.enhance) queryParams.append('enhance', 'true');
  if (params.safe) queryParams.append('safe', 'true');

  const queryString = queryParams.toString();
  return `${baseUrl}${encodedPrompt}${queryString ? `?${queryString}` : ''}`;
};

export const generateRandomSeed = (): number => {
  return Math.floor(Math.random() * 1000000);
};