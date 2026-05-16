import React, { useState, useEffect, useRef } from 'react';
import { useMotionValue, animate, motion } from 'framer-motion';

// ── InfiniteSlider (inline) ──────────────────────────────────────────────────
function InfiniteSlider({ children, gap = 16, speed = 25, speedOnHover }: {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
}) {
  const [currentDuration, setCurrentDuration] = useState(speed);
  const [containerWidth, setContainerWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (ref.current) setContainerWidth(ref.current.offsetWidth);
  }, []);

  useEffect(() => {
    const size = containerWidth;
    const contentSize = size + gap;
    const from = 0;
    const to = -contentSize / 2;

    let controls: any;
    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => { setIsTransitioning(false); setKey(k => k + 1); },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => { translation.set(from); },
      });
    }
    return controls?.stop;
  }, [key, translation, currentDuration, containerWidth, gap, isTransitioning]);

  const hoverProps = speedOnHover ? {
    onHoverStart: () => { setIsTransitioning(true); setCurrentDuration(speedOnHover); },
    onHoverEnd:   () => { setIsTransitioning(true); setCurrentDuration(speed); },
  } : {};

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={ref}
        className="flex w-max"
        style={{ x: translation, gap: `${gap}px` }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// ── ProgressiveBlur (inline) ─────────────────────────────────────────────────
function ProgressiveBlur({ direction = 'left', blurLayers = 8, blurIntensity = 0.25, className = '' }: {
  direction?: 'left' | 'right';
  blurLayers?: number;
  blurIntensity?: number;
  className?: string;
}) {
  const angle = direction === 'left' ? 270 : 90;
  const segmentSize = 1 / (blurLayers + 1);

  return (
    <div className={`relative ${className}`}>
      {Array.from({ length: blurLayers }).map((_, i) => {
        const stops = [i, i+1, i+2, i+3].map((s, si) =>
          `rgba(238,238,238,${si === 1 || si === 2 ? 1 : 0}) ${s * segmentSize * 100}%`
        );
        const gradient = `linear-gradient(${angle}deg, ${stops.join(', ')})`;
        return (
          <div
            key={i}
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ maskImage: gradient, WebkitMaskImage: gradient, backdropFilter: `blur(${i * blurIntensity}px)` }}
          />
        );
      })}
    </div>
  );
}

// ── Brands data ───────────────────────────────────────────────────────────────
const brands = [
  { name: 'Vulcan',     logo: 'https://i.ibb.co/DH54dyTc/vulcan-trent-4911927.png' },
  { name: 'Toyama',     logo: 'https://i.ibb.co/1fKnGvzW/Toyama-Power-Products-Logo-Vector-svg.png' },
  { name: 'Vonder',     logo: 'https://i.ibb.co/ds3qcTXq/vonder-logo-3.png' },
  { name: 'Bosch',      logo: 'https://i.ibb.co/G3HXVBsf/Bosch-Logo-PNG-Image.png' },
  { name: 'Makita',     logo: 'https://i.ibb.co/tMLLxrhz/Makita-logo.png' },
  { name: 'Dewalt',     logo: 'https://i.ibb.co/gbsdDZtj/dewalt-logo-2.png' },
  { name: 'Tramontina', logo: 'https://i.ibb.co/wNBBDBjh/TRAMONTINA-qo-AO8056n8-Pycs-Es-HYQi-N.png' },
  { name: 'Menegotti',  logo: 'https://i.ibb.co/FbYZ3rsN/Menegotti.png' },
];

// ── Main export ───────────────────────────────────────────────────────────────
export const BrandCarousel: React.FC<{
  onNavigateCategory?: (categoryId: string, subcategory?: string) => void;
}> = () => {
  return (
    <section className="pt-2 pb-16">
      <div className="container mx-auto px-4">
        <div>
          <h2 className="text-lg font-black text-[#0D1B2A] uppercase italic tracking-tighter mb-8 border-l-4 border-[#FF5A00] pl-4 leading-none">
            Nossas Marcas
          </h2>

          <div className="relative">
            <InfiniteSlider gap={42} speed={60} speedOnHover={20}>
              {brands.map((brand) => (
                <div key={brand.name} className="flex flex-col items-center gap-3 shrink-0">
                  <div className="w-28 h-16 flex items-center justify-center">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest italic">
                    {brand.name}
                  </span>
                </div>
              ))}
            </InfiniteSlider>

            <ProgressiveBlur
              blurIntensity={1}
              className="pointer-events-none absolute top-0 left-0 h-full w-[120px]"
              direction="left"
            />
            <ProgressiveBlur
              blurIntensity={1}
              className="pointer-events-none absolute top-0 right-0 h-full w-[120px]"
              direction="right"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
