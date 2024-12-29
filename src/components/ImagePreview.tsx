import React from 'react';
import { Loader } from 'lucide-react';
import { GenerationResult } from '../types';
import { DownloadButton } from './buttons/DownloadButton';
import { ShareButton } from './buttons/ShareButton';

interface ImagePreviewProps {
  result?: GenerationResult;
  isLoading: boolean;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full aspect-square bg-white/5 rounded-lg flex items-center justify-center">
        <Loader className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="w-full aspect-square bg-white/5 rounded-lg flex items-center justify-center">
        <p className="text-white/60">Your generated image will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative group">
        <img
          src={result.url}
          alt={result.params.prompt}
          className="w-full rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
          <DownloadButton imageUrl={result.url} prompt={result.params.prompt} />
          <ShareButton imageUrl={result.url} prompt={result.params.prompt} />
        </div>
      </div>
      <div className="bg-white/5 rounded-lg p-4">
        <h3 className="font-medium text-white mb-2">Generation Details</h3>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <dt className="text-white/60">Model</dt>
          <dd className="text-white">{result.params.model || 'flux'}</dd>
          <dt className="text-white/60">Dimensions</dt>
          <dd className="text-white">{result.params.width}×{result.params.height}</dd>
          <dt className="text-white/60">Seed</dt>
          <dd className="text-white">{result.params.seed}</dd>
        </dl>
      </div>
    </div>
  );
};