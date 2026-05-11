import React, { useState, useEffect, useRef } from 'react';
import { Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

interface TodayOnlySectionProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onNavigateCategory?: (categoryId: string, subcategory?: string) => void;
}

const CircularTimerUnit = ({ value, label, total, color = "#FF5A00" }: { value: number, label: string, total: number, color?: string }) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / total) * circumference;
  
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="transparent"
            stroke="#FFE5D9"
            strokeWidth="8"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <span className="absolute text-xl font-black text-[#222]">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{label}</span>
    </div>
  );
};

export const TodayOnlySection: React.FC<TodayOnlySectionProps> = ({ products, onProductClick, onNavigateCategory }) => {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      
      setTime({
        h: Math.floor(diff / (1000 * 60 * 60)),
        m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((diff % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const offerProducts = products.filter(p => p.isOfferOfDay);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-[#eeeeee] border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-8">
          <div className="flex items-center gap-4">
             <div className="w-2 h-10 bg-[#FF5A00] rounded-sm" />
             <div className="flex flex-col">
               <h2 className="text-[28px] font-black text-[#0D1B2A] flex items-center gap-3 uppercase italic tracking-tighter leading-none">
                 SÓ HOJE
               </h2>
               <p className="text-xs font-bold text-gray-400 uppercase italic tracking-widest">Ofertas que desaparecem em:</p>
             </div>
          </div>
          
          <div className="flex items-center gap-6">
            <CircularTimerUnit value={time.h} label="HRS" total={24} />
            <CircularTimerUnit value={time.m} label="MIN" total={60} />
            <CircularTimerUnit value={time.s} label="SEG" total={60} />
          </div>
        </div>

        <div className="relative group">
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl text-[#FF5A00] transition-all hover:scale-110 active:scale-95 border-2 border-[#FF5A00]/10"
          >
            <ChevronLeft size={28} strokeWidth={3} />
          </button>
          
          <div className="relative overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-[#eeeeee] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-[#eeeeee] to-transparent z-10 pointer-events-none" />
            
            <div ref={scrollRef} className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-1">
              {offerProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0" style={{ width: 'calc((100% - 48px) / 5)' }}>
                  <ProductCard 
                    product={product} 
                    onClick={() => onProductClick(product)}
                    showTodayOnlyBadge={true}
                  />
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl text-[#FF5A00] transition-all hover:scale-110 active:scale-95 border-2 border-[#FF5A00]/10"
          >
            <ChevronRight size={28} strokeWidth={3} />
          </button>
        </div>
        
        <div className="mt-8 flex justify-end">
           <button 
             onClick={() => onNavigateCategory?.('eletricas')}
             className="text-[#FF5A00] font-black uppercase text-sm italic tracking-widest hover:underline transition-all"
           >
             confira mais ofertas →
           </button>
        </div>
      </div>
    </section>
  );
};
