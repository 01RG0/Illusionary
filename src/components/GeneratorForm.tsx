import React, { useState } from 'react';
import { Wand2Icon } from 'lucide-react';
import { MODELS, DIMENSIONS } from '../config/constants';
import { ImageGenerationParams } from '../types';
import { generateRandomSeed } from '../utils/imageGeneration';

interface GeneratorFormProps {
  onGenerate: (params: ImageGenerationParams) => void;
  isLoading: boolean;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('flux');
  const [dimension, setDimension] = useState(DIMENSIONS[0]);
  const [seed, setSeed] = useState<number>(generateRandomSeed());
  const [enhance, setEnhance] = useState(false);
  const [nologo, setNologo] = useState(false);
  const [safe, setSafe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    onGenerate({
      prompt: prompt.trim(),
      model,
      seed,
      width: dimension.width,
      height: dimension.height,
      enhance,
      nologo,
      safe,
    });
  };

  const handleRandomSeed = () => {
    setSeed(generateRandomSeed());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-white/80 mb-2">
          Prompt
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-24 bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Describe the image you want to generate..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-white/80 mb-2">
            Model
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white [&>option]:bg-gray-900"
          >
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dimensions" className="block text-sm font-medium text-white/80 mb-2">
            Dimensions
          </label>
          <select
            id="dimensions"
            value={`${dimension.width}x${dimension.height}`}
            onChange={(e) => {
              const [width, height] = e.target.value.split('x').map(Number);
              setDimension({ width, height, label: '' });
            }}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white [&>option]:bg-gray-900"
          >
            {DIMENSIONS.map((d) => (
              <option key={`${d.width}x${d.height}`} value={`${d.width}x${d.height}`}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <label htmlFor="seed" className="block text-sm font-medium text-white/80 mb-2">
            Seed
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              id="seed"
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value))}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2 text-white"
            />
            <button
              type="button"
              onClick={handleRandomSeed}
              className="px-3 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              🎲
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={enhance}
            onChange={(e) => setEnhance(e.target.checked)}
            className="w-4 h-4 rounded border-white/10 text-purple-500 focus:ring-purple-500"
          />
          <span className="text-sm text-white/80">Enhance prompt</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={nologo}
            onChange={(e) => setNologo(e.target.checked)}
            className="w-4 h-4 rounded border-white/10 text-purple-500 focus:ring-purple-500"
          />
          <span className="text-sm text-white/80">Hide logo</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={safe}
            onChange={(e) => setSafe(e.target.checked)}
            className="w-4 h-4 rounded border-white/10 text-purple-500 focus:ring-purple-500"
          />
          <span className="text-sm text-white/80">Safe mode</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wand2Icon className="w-5 h-5" />
        <span>{isLoading ? 'Generating...' : 'Generate Image'}</span>
      </button>
    </form>
  );
};