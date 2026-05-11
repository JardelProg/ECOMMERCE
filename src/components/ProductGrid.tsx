import React, { useRef } from 'react';
import { ProductCard } from './ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGridProps {
  title: string;
  subtitle?: string;
  products: Product[];
  onProductClick: (product: Product) => void;
  onNavigateCategory?: (categoryId: string, subcategory?: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ title, subtitle, products, onProductClick, onNavigateCategory }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayProducts = products;

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-[#eeeeee]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 pb-4">
          <div className="w-2 h-10 bg-[#FF5A00] rounded-sm" />
          <div>
            <h2 className="text-[28px] font-black text-[#222] uppercase tracking-tighter italic leading-none">
              {title}
            </h2>
            <div className="flex items-center justify-between mt-1">
              {subtitle && <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{subtitle}</p>}
              <button 
                onClick={() => onNavigateCategory?.('eletricas')} 
                className="text-[#FF5A00] text-[12px] font-bold hover:underline"
              >
                Ver todos →
              </button>
            </div>
          </div>
        </div>

        <div className="relative group">
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl text-[#FF5A00] opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={28} strokeWidth={3} />
          </button>
          
          <div ref={scrollRef} className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-4">
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0" style={{ width: 'calc((100% - 48px) / 5)' }}>
                <ProductCard product={product} onClick={() => onProductClick(product)} />
              </div>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl text-[#FF5A00] opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={28} strokeWidth={3} />
          </button>
        </div>
      </div>
    </section>
  );
};
