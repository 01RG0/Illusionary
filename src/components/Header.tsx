import React from 'react';
import { ImageIcon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <header className={`w-full backdrop-blur-lg border-b transition-colors ${
      theme === 'dark' 
        ? 'bg-black/10 border-white/10' 
        : 'bg-white/60 border-gray-200 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ImageIcon className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} />
          <h1 className={`text-2xl font-bold bg-gradient-to-r ${
            theme === 'dark' 
              ? 'from-purple-400 to-pink-400' 
              : 'from-purple-600 to-pink-600'
          } bg-clip-text text-transparent`}>
            AI Image Generator
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className={`hover:text-opacity-100 transition-colors ${
                  theme === 'dark' ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}>
                  Gallery
                </a>
              </li>
              <li>
                <a href="#" className={`hover:text-opacity-100 transition-colors ${
                  theme === 'dark' ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}>
                  About
                </a>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};