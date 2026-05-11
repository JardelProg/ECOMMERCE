import React from 'react';
import { Percent, Truck, TrendingUp, Trophy, Megaphone, Building2, Store } from 'lucide-react';

interface CategoryCirclesProps {
  onNavigateCategory?: (categoryId: string, subcategory?: string) => void;
}

const quickLinks = [
  { icon: Percent,    label: 'Cupom de Desconto', action: () => alert('Em breve: Cupons de Desconto') },
  { icon: Truck,      label: 'Frete Grátis', action: (nav?: any) => nav?.('eletricas') }, // Exemplo: navega para elétricas como demonstração
  { icon: TrendingUp, label: 'Melhores Descontos', action: () => alert('Em breve: Melhores Descontos') },
  { icon: Trophy,     label: 'Campeões de Vendas', action: () => alert('Em breve: Campeões de Vendas') },
  { icon: Megaphone,  label: 'Lançamentos', action: () => alert('Em breve: Lançamentos') },
  { icon: Building2,  label: 'Consórcio', action: () => alert('Em breve: Consórcio') },
  { icon: Store,      label: 'Nossas Lojas', action: () => alert('Em breve: Nossas Lojas') },
];

export const CategoryCircles: React.FC<CategoryCirclesProps> = ({ onNavigateCategory }) => (
  <section className="bg-white py-8 border-b border-gray-100">
    <div className="container mx-auto px-4">
      <h2 className="text-[13px] font-black uppercase text-[#222] tracking-tight mb-6 text-center italic">
        Aproveite as Promoções
      </h2>
      <div className="flex items-start justify-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar pb-2">
        {quickLinks.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <div
              key={i}
              className="flex flex-col items-center gap-2 min-w-[72px] sm:min-w-[90px] cursor-pointer"
              onClick={() => cat.action(onNavigateCategory)}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center transition-all shadow-sm hover:border-[#FF5A00] hover:shadow-md">
                <Icon
                  size={28}
                  strokeWidth={1.8}
                  className="text-[#FF5A00] hover:scale-125 transition-transform duration-300"
                />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase text-center text-gray-700 tracking-tight leading-tight max-w-[80px]">
                {cat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
