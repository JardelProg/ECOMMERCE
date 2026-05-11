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

const DISCOUNTS = [17, 6, 10, 15];

export const FeaturedOffers: React.FC<FeaturedOffersProps> = ({ products, onProductClick, onNavigateCategory }) => {
  const { addToCart } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);

  const mainProducts = products.slice(0, 4);
  const sideBannerTop = products[4] || products[0];
  const sideBannerBottom = products[5] || products[1];

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
                  const barColor = '#333333';
                  
                  return (
                    <div
                      key={product.id}
                      className="min-w-[210px] sm:min-w-[230px] flex flex-col cursor-pointer group hover:brightness-105 transition-all relative border border-[#FF5A00]/20 rounded-xl overflow-hidden bg-[#FF5A00] shadow-md"
                      onClick={() => onProductClick(product)}
                    >
                      {/* Top Color Bar with Discount */}
                      <div className="h-14 flex items-center px-4" style={{ backgroundColor: barColor }}>
                         <div className="flex items-center gap-2 text-white">
                           <span className="text-4xl font-black leading-none">{discount}%</span>
                           <div className="flex flex-col leading-none translate-y-[2px]">
                             <span className="text-[10px] font-black uppercase opacity-80">DE</span>
                             <span className="text-[10px] font-black uppercase">DESCONTO</span>
                           </div>
                         </div>
                      </div>

                      {/* Image Area */}
                      <div className="flex items-center justify-center px-6 py-6 bg-white h-[180px] m-3 rounded-lg">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
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
                      
                      {/* Ribbon indicator under top bar */}
                      <div className="absolute top-14 left-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px]" style={{ borderTopColor: barColor }}></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right sidebar banners ── */}
          <div className="lg:w-[340px] flex flex-col gap-4 w-full">
            {/* Top banner (Orange highlight) */}
            <div
              className="flex-1 bg-[#FF5A00] rounded-xl p-6 flex flex-col items-stretch cursor-pointer hover:brightness-110 transition-all shadow-xl relative overflow-hidden group"
              onClick={() => onProductClick(sideBannerTop)}
            >
              <div className="flex items-center gap-2 text-white mb-4">
                 <span className="text-5xl font-black leading-none italic tracking-tighter">49%</span>
                 <div className="flex flex-col leading-none translate-y-[2px]">
                   <span className="text-[12px] font-black uppercase opacity-90 italic">DE</span>
                   <span className="text-[12px] font-black uppercase italic">DESCONTO</span>
                 </div>
              </div>
              
              <div className="flex items-center gap-4">
                 <div className="flex-1 pb-2">
                    <h4 className="text-white text-[15px] font-poppins font-normal leading-tight line-clamp-2 mb-4 tracking-tight">
                      {sideBannerTop.name}
                    </h4>
                    <p className="text-white/70 text-[11px] line-through font-bold">
                      DE: {formatCurrency(sideBannerTop.price * 2)}
                    </p>
                    <div className="flex items-baseline gap-1 text-white">
                      <span className="text-xs font-black">R$</span>
                      <span className="text-3xl font-black tracking-tighter italic">
                        {sideBannerTop.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#4ADE80] font-black uppercase mt-1 italic tracking-tight">à vista no Pix ou Boleto</p>
                 </div>
                 <div className="w-28 h-28 bg-white rounded-lg p-2 flex items-center justify-center shadow-inner shrink-0 self-center">
                    <img src={sideBannerTop.images[0]} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                 </div>
              </div>
              
              <div className="mt-4 bg-[#28A745] text-white py-2 text-center rounded-lg font-black text-[11px] uppercase italic tracking-widest flex items-center justify-center gap-2">
                 <Truck size={14} /> Frete Grátis
              </div>
            </div>

            {/* Bottom banner (Deep dark) */}
            <div
              className="flex-1 bg-[#0D1B2A] rounded-xl p-5 flex items-stretch gap-4 cursor-pointer hover:brightness-125 transition-all shadow-lg"
              onClick={() => onProductClick(sideBannerBottom)}
            >
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="text-white text-[15px] font-poppins font-normal leading-tight mb-4 tracking-tight line-clamp-2 uppercase italic">
                  {sideBannerBottom.name}
                </h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-[#FF5A00] text-sm font-black italic">R$</span>
                  <span className="text-white text-3xl font-black tracking-tighter italic">
                    {sideBannerBottom.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="text-[11px] text-[#FF5A00] font-black uppercase mt-1 italic tracking-tight underline underline-offset-4 decoration-2">à vista no Pix ou Boleto</p>
              </div>
              <div className="w-24 h-24 bg-white rounded-lg p-2 flex items-center justify-center shrink-0 self-center shadow-lg">
                <img src={sideBannerBottom.images[0]} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
