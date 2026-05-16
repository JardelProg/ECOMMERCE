import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap, Wrench, Leaf, Car, Battery, Wind,
  Droplets, Palette, ShieldCheck, Hammer, Ruler, LayoutGrid, X
} from 'lucide-react';
import { CATEGORIES } from '../constants';

const ICON_MAP: Record<string, React.ElementType> = {
  eletricas:       Zap,
  manuais:         Wrench,
  jardim:          Leaf,
  autocenter:      Car,
  'auto-eletrica': Battery,
  pneumaticas:     Wind,
  limpeza:         Droplets,
  funilaria:       Palette,
  epi:             ShieldCheck,
  construcao:      Hammer,
  medicao:         Ruler,
};

interface CategoryDockProps {
  onNavigateCategory: (categoryId: string, subcategory?: string) => void;
}

export const CategoryDock: React.FC<CategoryDockProps> = ({ onNavigateCategory }) => {
  const [visible, setVisible]       = useState(false);
  const [hoveredId, setHoveredId]   = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [dismissed, setDismissed]   = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY <= 80) { setDismissed(false); setExpandedId(null); }
      setVisible(!dismissed && window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
        setExpandedId(null);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const dismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
    setVisible(false);
    setExpandedId(null);
  };

  const navigate = (catId: string, sub?: string) => {
    onNavigateCategory(catId, sub);
    setExpandedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="dock-root"
          ref={wrapRef}
          initial={{ y: 120, opacity: 0, scale: 0.92 }}
          animate={{ y: 0,   opacity: 1, scale: 1    }}
          exit={{   y: 120, opacity: 0, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          className="fixed bottom-16 left-0 right-0 flex justify-center z-[60] pointer-events-none"
        >
          <div className="flex flex-col items-center pointer-events-auto">

            {/* Flyup subcategories */}
            <AnimatePresence>
              {expandedId && (() => {
                const cat = CATEGORIES.find(c => c.id === expandedId);
                if (!cat?.subcategories) return null;
                return (
                  <motion.div
                    key={`fly-${expandedId}`}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0,  scale: 1    }}
                    exit={{   opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="mb-4 w-max max-w-[90vw] rounded-2xl px-5 py-4 bg-[#0D1B2A] border border-white/10 shadow-2xl"
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#FF5A00] mb-3">
                      {cat.name}
                    </p>
                    <div className="flex flex-wrap gap-2 max-w-[640px]">
                      <button
                        onClick={() => navigate(cat.id)}
                        className="text-[12px] font-bold text-white bg-[#FF5A00] hover:bg-[#e04e00] px-4 py-1.5 rounded-full transition-colors"
                      >
                        Ver todos →
                      </button>
                      {cat.subcategories.map(sub => (
                        <button
                          key={sub}
                          onClick={() => navigate(cat.id, sub)}
                          className="text-[12px] font-semibold text-white/70 hover:text-white bg-white/8 hover:bg-white/15 px-4 py-1.5 rounded-full transition-colors whitespace-nowrap border border-white/10"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* Dock + Reflection wrapper */}
            <div className="relative">

              {/* ── Main Dock ── */}
              <div className="flex items-end gap-3 px-6 py-4 rounded-[32px] bg-[#0D1B2A] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

                {/* Brand pill */}
                <div className="flex flex-col items-center justify-center pr-4 mr-1 border-r border-white/10 self-center gap-1">
                  <span className="bg-[#FF5A00] text-white font-black text-[12px] px-2.5 py-0.5 rounded leading-none tracking-tighter">
                    SMB
                  </span>
                  <span className="text-white/35 text-[8px] font-bold uppercase tracking-widest">categ.</span>
                </div>

                {/* Category icons */}
                {CATEGORIES.map(cat => {
                  const Icon     = ICON_MAP[cat.id] ?? LayoutGrid;
                  const isActive = expandedId === cat.id;
                  const isHov    = hoveredId  === cat.id;
                  return (
                    <div
                      key={cat.id}
                      className="relative flex flex-col items-center"
                      onMouseEnter={() => setHoveredId(cat.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* Tooltip */}
                      <AnimatePresence>
                        {isHov && !expandedId && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{   opacity: 0, y: 6 }}
                            transition={{ duration: 0.1 }}
                            className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 pointer-events-none z-20"
                          >
                            <div className="bg-[#0D1B2A] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap border border-white/10 shadow-lg">
                              {cat.name}
                            </div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0D1B2A] rotate-45 border-r border-b border-white/10" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.button
                        onClick={() => setExpandedId(p => p === cat.id ? null : cat.id)}
                        whileTap={{ scale: 0.85 }}
                        animate={{
                          scale: isActive ? 1.2 : isHov ? 1.12 : 1,
                          y:     isActive ? -8  : isHov ? -4   : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 26 }}
                        className={`relative flex items-center justify-center w-14 h-14 rounded-[20px] transition-colors duration-200 ${
                          isActive
                            ? 'bg-[#FF5A00] shadow-[0_6px_24px_rgba(255,90,0,0.5)]'
                            : 'bg-white/8 hover:bg-white/14'
                        }`}
                      >
                        <Icon
                          size={24}
                          className={isActive ? 'text-white' : 'text-white/65'}
                          strokeWidth={isActive ? 2.2 : 1.8}
                        />
                        {isActive && (
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FFF100] rounded-full shadow-[0_0_8px_rgba(255,241,0,0.9)]" />
                        )}
                      </motion.button>
                    </div>
                  );
                })}

                {/* Dismiss */}
                <button
                  onClick={dismiss}
                  className="self-center ml-1 pl-4 border-l border-white/10 text-white/25 hover:text-white/60 transition-colors w-8 h-8 flex items-center justify-center"
                >
                  <X size={15} />
                </button>
              </div>

              {/* ── Reflection ── */}
              <div
                className="absolute top-full left-0 right-0 pointer-events-none overflow-hidden"
                style={{ height: 60 }}
              >
                <div
                  className="flex items-start gap-3 px-6 py-4 rounded-[32px] bg-[#0D1B2A]"
                  style={{
                    transform: 'scaleY(-1)',
                    opacity: 0.35,
                    maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
                  }}
                >
                  {/* Brand ghost */}
                  <div className="flex flex-col items-center justify-center pr-4 mr-1 border-r border-white/10 self-center gap-1">
                    <span className="bg-[#FF5A00]/50 text-white/50 font-black text-[12px] px-2.5 py-0.5 rounded leading-none tracking-tighter">SMB</span>
                    <span className="text-white/20 text-[8px] font-bold uppercase tracking-widest">categ.</span>
                  </div>
                  {CATEGORIES.map(cat => {
                    const Icon = ICON_MAP[cat.id] ?? LayoutGrid;
                    return (
                      <div key={`r-${cat.id}`} className="flex items-center justify-center w-14 h-14 rounded-[20px] bg-white/5">
                        <Icon size={24} className="text-white/30" strokeWidth={1.6} />
                      </div>
                    );
                  })}
                  <div className="self-center ml-1 pl-4 w-8 h-8" />
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};