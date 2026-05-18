import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, Truck } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../lib/utils';
import { useCart } from '../contexts/CartContext';

interface FeaturedOffersProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onNavigateCategory?: (categoryId: string, subcategory?: string) => void;
}

const DISCOUNTS = [10, 10, 10, 10];

export const FeaturedOffers: React.FC<FeaturedOffersProps> = ({ products, onProductClick, onNavigateCategory }) => {
  const { addToCart } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Wait until we have enough products to render safely
  if (products.length < 6) return null;

  const mainProducts = products.slice(0, 4);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 bg-[#eeeeee]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-4">

          <div className="flex-1 relative">
            <div className="border-2 border-[#FF5A00] rounded-xl bg-transparent relative pt-6">

              {/* Title badge */}
              <div className="absolute -top-[14px] left-0 flex items-center gap-4">
                <div className="bg-[#0D1B2A] text-white px-6 py-1 font-black uppercase text-[10px] tracking-widest border-2 border-[#FF5A00] rounded-lg shadow-lg">
                  OFERTAS EM DESTAQUE
                </div>
                <button 
                  onClick={() => onNavigateCategory?.('eletricas')} 
                  className="bg-white/90 hover:bg-white text-[#FF5A00] text-[10px] font-black uppercase px-3 py-1 rounded-full border border-orange-200 transition-all hover:scale-105"
                >
                  Ver todas →
                </button>
              </div>

              {/* Left arrow */}
              <button
                onClick={(e) => { e.stopPropagation(); scroll('left'); }}
                className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white border-2 border-[#FF5A00] rounded-full flex items-center justify-center shadow-lg text-[#FF5A00] hover:bg-[#FF5A00] hover:text-white transition-all transform active:scale-95"
              >
                <ChevronLeft size={24} strokeWidth={3} />
              </button>

              {/* Right arrow */}
              <button
                onClick={(e) => { e.stopPropagation(); scroll('right'); }}
                className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white border-2 border-[#FF5A00] rounded-full flex items-center justify-center shadow-lg text-[#FF5A00] hover:bg-[#FF5A00] hover:text-white transition-all transform active:scale-95"
              >
                <ChevronRight size={24} strokeWidth={3} />
              </button>

              {/* Cards */}
              <div ref={scrollRef} className="flex overflow-x-auto no-scrollbar gap-3 p-3">
                {mainProducts.map((product, i) => {
                  const discount = DISCOUNTS[i] ?? 10;
                  const oldPrice = product.price * (1 + discount / 100);
                  const priceParts = product.price
                    .toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                    .split(',');
                  return (
                    <div
                      key={product.id}
                      className="min-w-[210px] sm:min-w-[230px] flex flex-col cursor-pointer group hover:brightness-105 transition-all relative border border-[#FF5A00]/20 rounded-xl overflow-hidden bg-[#FF5A00] shadow-md"
                      onClick={() => onProductClick(product)}
                    >
                      {/* Top Design Bar with Discount Image */}
                      <div className="h-14 overflow-hidden flex items-center justify-center bg-[#FF5A00]">
                         <img 
                           src={i === 2 ? "https://i.ibb.co/bj1Tcbvz/EXCLL.png" : "https://i.ibb.co/G3tYdx7P/10-OFF.png"} 
                           className="w-full h-full object-cover" 
                           alt={i === 2 ? "EXCLUSIVO" : "10% OFF"}
                         />
                      </div>

                      {/* Image Area */}
                      <div className="flex items-center justify-center px-6 py-6 bg-white h-[180px] m-3 rounded-lg">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Info */}
                      <div className="px-5 pb-4 flex flex-col flex-1">
                        <h3 className="text-[15px] text-white font-poppins font-normal leading-snug line-clamp-2 mb-3 h-11 transition-colors tracking-tight">
                          {product.name}
                        </h3>
                        <div className="mt-auto">
                          <p className="text-[11px] text-white/60 line-through font-bold">
                            DE: {formatCurrency(oldPrice)}
                          </p>
                          <div className="flex items-baseline gap-0.5 leading-none my-1">
                            <span className="text-[#0D1B2A] text-sm font-black italic">R$</span>
                            <span className="text-white text-3xl font-black tracking-tighter">
                              {priceParts[0]}
                            </span>
                            <span className="text-white text-lg font-black">,{priceParts[1]}</span>
                          </div>
                          <p className="text-[11px] text-[#0D1B2A] font-black uppercase mb-1 italic">
                            à vista no Pix ou Boleto
                          </p>
                          <p className="text-[10px] text-white/80 font-bold italic">
                            ou 10x de {formatCurrency(product.price / 10)} sem juros
                          </p>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="px-3 pb-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                          className="w-full bg-[#0D1B2A] text-white text-[11px] font-black uppercase tracking-wider py-2.5 rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2"
                        >
                          <Truck size={14} />
                          Para todo o Brasil
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right sidebar banner (Single Vertical) ── */}
          <div className="lg:w-[340px] w-full">
            <div
              className="h-full cursor-pointer hover:brightness-105 transition-all group relative"
              onClick={() => onNavigateCategory?.('eletricas')}
            >
              <img 
                src="https://i.ibb.co/20fNnX53/vertical2.png" 
                className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-700" 
                alt="Promoção Especial SMB"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};