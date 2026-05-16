import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    imageUrl: 'https://i.ibb.co/rGxDTfNB/BANNER-3.png',
    alt: 'Banner SMB Máquinas - Promoção Especial',
  },
  {
    id: 2,
    imageUrl: 'https://i.ibb.co/bg4Lr9tP/BANNER-SMB-2.png',
    alt: 'Banner SMB Máquinas - Novidades',
  },
];

export const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative w-full overflow-hidden bg-[#0D1B2A]">
      {/* Slides Container */}
      <div className="relative w-full">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`transition-opacity duration-1000 ease-in-out ${
              i === current ? 'relative opacity-100' : 'absolute inset-0 opacity-0'
            }`}
          >
            <img
              src={s.imageUrl}
              alt={s.alt}
              className="w-full h-auto block"
            />
          </div>
        ))}
      </div>

      {/* Left/Right arrows - Only show if more than 1 slide */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
            className="absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 lg:w-12 lg:h-12 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % slides.length)}
            className="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 lg:w-12 lg:h-12 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md border border-white/10"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots - Only show if more than 1 slide */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'w-8 h-2 bg-[#FF5A00]' : 'w-2 h-2 bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};