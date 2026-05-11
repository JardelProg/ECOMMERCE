import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const brands = [
  { name: 'Raven', logo: 'https://picsum.photos/seed/raven/200/200' },
  { name: 'V8 Brasil', logo: 'https://picsum.photos/seed/v8/200/200' },
  { name: 'Bovenau', logo: 'https://picsum.photos/seed/bovenau/200/200' },
  { name: 'Escaleve', logo: 'https://picsum.photos/seed/escaleve/200/200' },
  { name: 'Lar Plásticos', logo: 'https://picsum.photos/seed/lar/200/200' },
  { name: 'Metalpama', logo: 'https://picsum.photos/seed/metalpama/200/200' },
  { name: 'Dewalt', logo: 'https://picsum.photos/seed/dewalt/200/200' },
  { name: 'Bosch', logo: 'https://picsum.photos/seed/bosch/200/200' },
  { name: 'Makita', logo: 'https://picsum.photos/seed/makita/200/200' },
];

export const BrandCarousel: React.FC<{ 
  onNavigateCategory?: (categoryId: string, subcategory?: string) => void 
}> = ({ onNavigateCategory }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gray-50/50 rounded-xl p-8 border border-gray-100">
          <h2 className="text-lg font-black text-[#0D1B2A] uppercase italic tracking-tighter mb-8 border-l-4 border-[#FF5A00] pl-4 leading-none">
            Aproveite as promoções
          </h2>

          <div className="relative group">
            <button 
              onClick={() => scroll('left')}
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg text-[#FF5A00] transition-all hover:scale-110 active:scale-95 border-2 border-[#FF5A00]/10"
            >
              <ChevronLeft size={24} strokeWidth={3} />
            </button>

            <div className="relative overflow-hidden">
               <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-gray-50/50 to-transparent z-10 pointer-events-none" />
               <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-gray-50/50 to-transparent z-10 pointer-events-none" />
               
               <div ref={scrollRef} className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth py-4 px-8">
                 {brands.map((brand, i) => (
                   <div 
                     key={i} 
                     className="flex flex-col items-center gap-3 cursor-pointer group shrink-0"
                     onClick={() => onNavigateCategory?.('eletricas')} // Demonstração: navega para elétricas ao clicar na marca
                   >
                     <div className="w-28 h-28 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center p-4 transition-all">
                       <img 
                         src={brand.logo} 
                         alt={brand.name} 
                         className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 hover:scale-110 transition-all cursor-pointer" 
                         referrerPolicy="no-referrer"
                       />
                     </div>
                     <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-hover:text-[#0D1B2A] transition-colors italic">
                       {brand.name}
                     </span>
                   </div>
                 ))}
               </div>
            </div>

            <button 
              onClick={() => scroll('right')}
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-xl text-[#FF5A00] transition-all hover:scale-110 active:scale-95 border-2 border-[#FF5A00]/10"
            >
              <ChevronRight size={24} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
