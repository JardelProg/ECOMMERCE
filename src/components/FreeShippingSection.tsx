import React, { useRef } from 'react';
import { Truck, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

interface FreeShippingSectionProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onNavigateCategory?: (categoryId: string, subcategory?: string) => void;
}

export const FreeShippingSection: React.FC<FreeShippingSectionProps> = ({ products, onProductClick, onNavigateCategory }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const freeShippingProducts = products.filter(p => p.hasFreeShipping);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-[#eeeeee] border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-10 bg-[#16A34A] rounded-sm" />
            <h2 className="text-2xl font-black text-[#0D1B2A] flex items-center gap-2 uppercase italic tracking-tighter">
              <Truck className="text-[#16A34A]" size={28} />
              Produtos com Frete Grátis
            </h2>
          </div>
          <button 
            onClick={() => onNavigateCategory?.('jardim')} 
            className="text-[#FF5A00] text-[12px] font-bold hover:underline"
          >
            Ver todos →
          </button>
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
              {freeShippingProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0" style={{ width: 'calc((100% - 48px) / 5)' }}>
                  <ProductCard 
                    product={product} 
                    onClick={() => onProductClick(product)}
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
      </div>
    </section>
  );
};
