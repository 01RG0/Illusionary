import React, { useState } from 'react';
import { Share2, Copy, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Toast } from '../common/Toast';
import { ShareModal } from '../modals/ShareModal';

interface ShareButtonProps {
  imageUrl: string;
  prompt: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ imageUrl, prompt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleShare = () => {
    setIsModalOpen(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(imageUrl);
      setToastMessage('Link copied to clipboard!');
      setShowToast(true);
    } catch (error) {
      setToastMessage('Failed to copy link. Please try again.');
      setShowToast(true);
    }
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: Copy,
      onClick: handleCopyLink,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      onClick: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `Check out this AI-generated image: "${prompt}"\n\n${imageUrl}`
          )}`,
          '_blank'
        );
      },
    },
    {
      name: 'Facebook',
      icon: Facebook,
      onClick: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`,
          '_blank'
        );
      },
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      onClick: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(imageUrl)}`,
          '_blank'
        );
      },
    },
  ];

  return (
    <>
      <button
        onClick={handleShare}
        className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors relative group"
        aria-label="Share image"
      >
        <Share2 className="w-6 h-6 text-white" />
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Share image
        </span>
      </button>
      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shareOptions={shareOptions}
      />
      <Toast 
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};