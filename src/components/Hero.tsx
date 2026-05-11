import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    badge: 'MEGA OFERTA',
    title: 'ROÇADEIRAS',
    highlight: '40% OFF',
    sub: 'Frete Grátis acima de R$ 299 • Até 12x sem juros',
    cta: 'APROVEITAR',
    ctaColor: 'bg-[#FF5A00]',
    bg: 'from-[#0D1B2A] to-[#1e3a5f]',
    accent: '#FF5A00',
    imgSeed: 'brushcutter',
  },
  {
    id: 2,
    badge: 'LANÇAMENTO',
    title: 'FERRAMENTAS ELÉTRICAS',
    highlight: 'MELHORES PREÇOS',
    sub: 'As melhores marcas com garantia SMB de 12 meses',
    cta: 'VER OFERTAS',
    ctaColor: 'bg-[#28A745]',
    bg: 'from-[#1a1a1a] to-[#3d1a00]',
    accent: '#FFD700',
    imgSeed: 'drills',
  },
  {
    id: 3,
    badge: 'MAIS VENDIDOS',
    title: 'COMPRESSORES DE AR',
    highlight: 'ENTREGA RÁPIDA',
    sub: 'Para todo o Brasil com rastreamento em tempo real',
    cta: 'COMPRAR AGORA',
    ctaColor: 'bg-[#FF5A00]',
    bg: 'from-[#0a2a0a] to-[#1a4a1a]',
    accent: '#4ADE80',
    imgSeed: 'compressor',
  },
];

export const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className={`relative w-full overflow-hidden bg-gradient-to-r ${slide.bg} h-[240px] lg:h-[360px] transition-all duration-700`}>

      {/* Background overlay pattern */}
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px'}} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      {/* Left/Right arrows */}
      <button
        onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
        className="absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 lg:w-11 lg:h-11 bg-white/10 hover:bg-white/25 border border-white/20 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={() => setCurrent((c) => (c + 1) % slides.length)}
        className="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 lg:w-11 lg:h-11 bg-white/10 hover:bg-white/25 border border-white/20 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm"
      >
        <ChevronRight size={22} />
      </button>

      <div className="container mx-auto px-4 h-full relative z-10 flex items-center">
        {/* Text */}
        <div className="flex-1 max-w-xl text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="bg-[#FF5A00] text-white text-[10px] font-black uppercase px-3 py-1 rounded-lg tracking-widest">
              {slide.badge}
            </span>
          </div>

          <h1
            className="font-black italic uppercase leading-none mb-3 tracking-tighter"
            style={{ fontSize: 'clamp(28px, 5vw, 56px)', color: slide.accent }}
          >
            {slide.title}
          </h1>
          <h2
            className="font-black italic uppercase leading-none mb-4 text-white"
            style={{ fontSize: 'clamp(20px, 3.5vw, 42px)' }}
          >
            {slide.highlight}
          </h2>

          <div className="inline-block bg-[#FFD700] text-[#0D1B2A] px-4 py-1.5 rounded-lg font-black uppercase text-[11px] lg:text-[13px] mb-5 tracking-tight">
            {slide.sub}
          </div>

          <div>
            <button className={`${slide.ctaColor} text-white px-8 lg:px-12 py-3 rounded-lg font-black uppercase text-sm lg:text-base tracking-tighter hover:opacity-90 transition-opacity shadow-lg`}>
              {slide.cta}
            </button>
          </div>
        </div>

        {/* Product image */}
        <div className="hidden lg:flex flex-1 items-center justify-center h-full">
          <img
            src={`https://picsum.photos/seed/${slide.imgSeed}/600/500`}
            alt="Produto em destaque"
            className="max-h-[90%] max-w-full object-contain drop-shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2.5 bg-[#FF5A00]' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </div>
  );
};
