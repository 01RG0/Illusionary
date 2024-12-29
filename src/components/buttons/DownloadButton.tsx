import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Toast } from '../common/Toast';

interface DownloadButtonProps {
  imageUrl: string;
  prompt: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl, prompt }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${prompt.slice(0, 30).toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setToastMessage('Image downloaded successfully!');
      setShowToast(true);
    } catch (error) {
      setToastMessage('Failed to download image. Please try again.');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors relative group"
        aria-label="Download image"
      >
        <Download className={`w-6 h-6 text-white ${isLoading ? 'animate-pulse' : ''}`} />
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Download image
        </span>
      </button>
      <Toast 
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};