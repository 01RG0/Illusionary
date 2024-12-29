import React from 'react';
import { X } from 'lucide-react';

interface ShareOption {
  name: string;
  icon: React.FC<{ className?: string }>;
  onClick: () => void;
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareOptions: ShareOption[];
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, shareOptions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
          aria-label="Close share modal"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold text-white mb-4">Share Image</h2>
        <div className="grid grid-cols-2 gap-4">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => {
                option.onClick();
                onClose();
              }}
              className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors"
            >
              <option.icon className="w-5 h-5 text-white" />
              <span className="text-white">{option.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};