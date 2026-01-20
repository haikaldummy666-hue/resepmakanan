
import React, { useState, useEffect } from 'react';
import { Loader2, Utensils } from 'lucide-react';

interface RecipeImageProps {
  src: string;
  alt: string;
  className?: string;
}

const RecipeImage: React.FC<RecipeImageProps> = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    setImageSrc(src);
    setStatus('loading');
  }, [src]);

  const handleImageError = () => {
    // Jika ID spesifik gagal (jarang terjadi), gunakan foto makanan umum yang estetik
    if (status !== 'error') {
      const genericFoodFallback = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80`;
      setImageSrc(genericFoodFallback);
      setStatus('error'); // Tandai agar tidak looping
    }
  };

  return (
    <div className={`relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden ${className}`}>
      {status === 'loading' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-sm">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500 mb-2" />
        </div>
      )}
      
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-700 ${status === 'success' ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setStatus('success')}
        onError={handleImageError}
      />

      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 dark:text-slate-600 p-4">
          <Utensils className="w-12 h-12 mb-2 opacity-30" />
          <span className="text-[10px] font-black uppercase tracking-widest text-center">{alt}</span>
        </div>
      )}
    </div>
  );
};

export default RecipeImage;
