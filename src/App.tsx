import React, { useState } from 'react';
import { Header } from './components/Header';
import { GeneratorForm } from './components/GeneratorForm';
import { ImagePreview } from './components/ImagePreview';
import { useTheme } from './hooks/useTheme';
import { ImageGenerationParams, GenerationResult } from './types';
import { generateImageUrl } from './utils/imageGeneration';
import './styles/theme.css';

function App() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult>();

  const handleGenerate = async (params: ImageGenerationParams) => {
    setIsLoading(true);
    try {
      const url = generateImageUrl(params);
      
      const img = new Image();
      img.src = url;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      setResult({
        url,
        params,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className={`min-h-screen transition-colors ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 to-black text-white'
        : 'bg-gradient-to-br from-gray-50 to-white text-gray-900'
    }`}>
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className={`backdrop-blur-lg rounded-lg p-6 border ${
              theme === 'dark' 
                ? 'bg-black/10 border-white/10' 
                : 'bg-white/60 border-black/10 shadow-lg'
            }`}>
              <h2 className="text-xl font-semibold mb-4">Generate Image</h2>
              <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className={`backdrop-blur-lg rounded-lg p-6 border ${
              theme === 'dark' 
                ? 'bg-black/10 border-white/10' 
                : 'bg-white/60 border-black/10 shadow-lg'
            }`}>
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <ImagePreview result={result} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;