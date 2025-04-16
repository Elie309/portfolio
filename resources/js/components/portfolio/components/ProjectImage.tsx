import React, { useState } from 'react';

interface ProjectImageProps {
  image: string | undefined;
  title: string;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({ image, title }) => {
  const [isLoading, setIsLoading] = useState(!!image);
  
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative flex-shrink-0 overflow-hidden h-52">
      {image ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            className={`h-full w-full object-cover transition-all duration-700 ease-in-out hover:scale-110 hover:saturate-150 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            src={image}
            alt={title}
            onLoad={handleImageLoad}
            onError={(e) => {
              // Replace the img element with our placeholder SVG when image fails to load
              setIsLoading(false);
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parentElement = target.parentElement;
              if (parentElement) {
                const placeholderDiv = document.createElement('div');
                placeholderDiv.className = 'h-full w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center';
                placeholderDiv.innerHTML = `
                  <svg class="h-32 w-32 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 120 120">
                    <rect width="120" height="120" fill="currentColor" fillOpacity="0.2" rx="8" />
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M30 40h60M30 60h60M30 80h60" />
                    <text x="60" y="55" dominant-baseline="middle" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">Product</text>
                    <text x="60" y="70" dominant-baseline="middle" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">Image</text>
                  </svg>
                `;
                parentElement.appendChild(placeholderDiv);
              }
            }}
          />
        </>
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
          <svg className="h-32 w-32 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 120 120">
            <rect width="120" height="120" fill="currentColor" fillOpacity="0.2" rx="8" />
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M30 40h60M30 60h60M30 80h60" />
            <text x="60" y="55" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">Product</text>
            <text x="60" y="70" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">Image</text>
          </svg>
        </div>
      )}

      {/* Gradient overlay that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
    </div>
  );
};
