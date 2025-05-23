import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black py-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} MovieExplorer. Thaheshan All rights reserved.
          </p>
          
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 flex items-center">
              Made by Thaheshan
              with <Heart className="w-4 h-4 text-red-500 ml-1" />
              using TMDb API
            </span>
          </div>
          
          <div className="mt-4 md:mt-0 text-sm text-gray-500 dark:text-gray-500">
            This product uses the TMDb API but is not certified by TMDb.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;