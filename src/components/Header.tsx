import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CATEGORIES, OTHER_LINKS } from '../constants';
import { 
  Search, ShoppingCart, User, MapPin, Phone, Package, ChevronDown, Menu, X, Tag, Truck, Gift, Briefcase, Users, Building2, Store, Headphones, LayoutGrid 
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const quickLinks = [
  { label: 'Cupons de Desconto', icon: Tag },
  { label: 'Frete Grátis', icon: Truck },
  { label: 'Consórcio', icon: Gift },
  { label: 'Afiliados', icon: Users },
  { label: 'Vendas Corporativas', icon: Briefcase },
  { label: 'Monte seu Negócio', icon: Building2 },
  { label: 'Nossas Lojas', icon: Store },
  { label: 'Atendimento', icon: Headphones },
];

export const Header: React.FC<{ 
  onOpenCart: () => void;
  onNavigateCategory?: (categoryId: string, subcategory?: string) => void;
  onNavigateHome?: () => void;
}> = ({ onOpenCart, onNavigateCategory, onNavigateHome }) => {
  const { totalItems } = useCart();
  const { profile } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);

  return (
    <>
      {/* Categories Mega Modal */}
      {isCategoriesModalOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCategoriesModalOpen(false)} />
          <div className="relative min-h-screen flex items-start justify-center p-4 py-16">
            <div className="bg-white w-full max-w-7xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
                <h2 className="text-2xl font-black text-[#222] uppercase tracking-tighter italic">Navegue pelo site</h2>
                <button 
                  onClick={() => setIsCategoriesModalOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="space-y-4">
                    <div className="flex items-center gap-2 border-b-2 border-[#FF5A00] pb-2">
                      <h3 
                        className="font-black text-[#222] text-[14px] uppercase tracking-tight cursor-pointer hover:text-[#FF5A00]"
                        onClick={() => {
                          onNavigateCategory?.(cat.id);
                          setIsCategoriesModalOpen(false);
                        }}
                      >
                        {cat.name}
                      </h3>
                    </div>
                    <ul className="space-y-1.5">
                      {cat.subcategories?.map((sub) => (
                        <li key={sub}>
                          <button 
                            onClick={() => {
                              onNavigateCategory?.(cat.id, sub);
                              setIsCategoriesModalOpen(false);
                            }}
                            className="text-[12px] text-gray-500 hover:text-[#FF5A00] transition-colors flex items-center gap-2 group text-left"
                          >
                            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full group-hover:bg-[#FF5A00]" />
                            {sub}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Other links section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b-2 border-[#0D1B2A] pb-2">
                    <h3 className="font-black text-[#222] text-[14px] uppercase tracking-tight">Outros links</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {OTHER_LINKS.slice(0, 15).map((link) => (
                      <li key={link}>
                        <button 
                          onClick={() => {
                            // As these are search terms, we'll just close modal for now or navigate home
                            onNavigateHome?.();
                            setIsCategoriesModalOpen(false);
                          }}
                          className="text-[12px] text-left text-gray-500 hover:text-[#FF5A00] transition-colors flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-200 rounded-full group-hover:bg-[#FF5A00]" />
                          {link}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#FFF100] text-[#222] py-2.5 relative overflow-hidden">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <div className="text-[11px] sm:text-[13px] font-black uppercase tracking-widest">
            🚀 Ganhe 10% de desconto na primeira compra! Use o cupom: <span className="font-bold">SMB10OFF</span> 🚀
          </div>
        </div>
      </div>

      {/* 2. QUICK LINKS BAR */}
      <div className="bg-[#1a1a1a] hidden lg:block border-b border-white/5">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center flex-wrap">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <a href="#" className="flex items-center gap-1.5 text-[11px] font-semibold text-white/65 hover:text-white py-1.5 px-3 hover:bg-white/5 transition-colors whitespace-nowrap uppercase tracking-tight">
                    <Icon size={11} />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <header className="sticky top-0 z-50 shadow-md">

        {/* 3. MAIN ORANGE HEADER */}
        <div className="bg-[#FF5A00]">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 lg:gap-4 py-2.5">

              {/* Logo */}
              <div 
                onClick={() => onNavigateHome?.()} 
                className="flex items-center gap-1 flex-shrink-0 cursor-pointer"
              >
                <span className="bg-white text-[#FF5A00] font-black text-xl lg:text-2xl px-2 py-0.5 rounded-sm leading-none tracking-tighter">SMB</span>
                <span className="text-white font-black text-xl lg:text-2xl italic uppercase tracking-tighter leading-none ml-1">MÁQUINAS</span>
              </div>

              {/* CEP */}
              <div className="hidden xl:flex items-center gap-1.5 text-white cursor-pointer hover:opacity-80 border-l border-white/20 pl-4 ml-1">
                <MapPin size={18} className="opacity-80 flex-shrink-0" />
                <div className="leading-tight">
                  <p className="text-[9px] uppercase opacity-65 font-bold">Enviar para:</p>
                  <p className="text-[11px] font-black uppercase underline decoration-dashed underline-offset-2">Informe o CEP</p>
                </div>
              </div>

              {/* Search */}
              <div className="flex-1 relative hidden md:flex">
                <input
                  type="text"
                  placeholder="Buscar produtos, marcas e muito mais..."
                  className="w-full h-10 pl-4 pr-14 rounded-sm bg-white text-gray-800 text-[13px] font-medium border-none outline-none"
                />
                <button className="absolute right-0 top-0 h-10 w-11 flex items-center justify-center bg-[#0D1B2A] rounded-r-sm text-white hover:bg-black transition-colors">
                  <Search size={17} />
                </button>
              </div>

              {/* Right: Televendas / Pedidos / Conta / Carrinho */}
              <div className="flex items-center text-white ml-auto">

                <a href="tel:1199999999" className="hidden lg:flex flex-col items-center justify-center px-3 py-1 hover:bg-white/10 transition-colors cursor-pointer text-center gap-0.5 h-10">
                  <Phone size={18} />
                  <span className="text-[9px] uppercase opacity-70 leading-none">Televendas</span>
                  <span className="text-[10px] font-black leading-none">(11) 9999-9999</span>
                </a>

                <a href="#" className="hidden lg:flex flex-col items-center justify-center px-3 py-1 hover:bg-white/10 transition-colors cursor-pointer text-center gap-0.5 h-10 border-l border-white/20">
                  <Package size={18} />
                  <span className="text-[9px] font-black uppercase leading-none">Meus Pedidos</span>
                </a>

                <a href="#" className="flex flex-col items-center justify-center px-3 py-1 hover:bg-white/10 transition-colors cursor-pointer text-center gap-0.5 h-10 border-l border-white/20">
                  <User size={18} />
                  <span className="text-[9px] uppercase leading-none hidden sm:block">
                    {profile ? `Olá, ${profile.displayName.split(' ')[0]}` : 'Entre ou'}
                  </span>
                  <span className="text-[9px] uppercase opacity-70 leading-none hidden sm:block">Cadastre-se</span>
                </a>

                <button
                  onClick={onOpenCart}
                  className="flex flex-col items-center justify-center px-3 py-1 hover:bg-white/10 transition-colors cursor-pointer text-center gap-0.5 h-10 border-l border-white/20 relative"
                >
                  <div className="relative">
                    <ShoppingCart size={20} />
                    {totalItems > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-[#0D1B2A] text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                        {totalItems}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] uppercase leading-none hidden sm:block">Carrinho</span>
                </button>

                <button
                  className="lg:hidden px-2 py-1 hover:bg-white/10 transition-colors border-l border-white/20 ml-0"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden pb-2.5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="w-full h-9 pl-4 pr-11 rounded-sm bg-white text-gray-800 text-[13px] border-none outline-none"
                />
                <button className="absolute right-0 top-0 h-9 w-10 flex items-center justify-center bg-[#0D1B2A] rounded-r-sm text-white">
                  <Search size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 4. CATEGORY NAV BAR (SCROLLS AWAY) */}
      <div className="bg-white border-b border-gray-200 hidden lg:block shadow-sm">
        <div className="container mx-auto px-4">
            <nav className="flex items-center">
              <button 
                onClick={() => setIsCategoriesModalOpen(true)}
                className="flex items-center gap-2 text-[#222] px-4 h-8 font-black text-[10px] uppercase tracking-tighter hover:text-[#FF5A00] transition-colors flex-shrink-0 cursor-pointer"
              >
                <LayoutGrid size={16} />
                CATEGORIAS
                <ChevronDown size={14} />
              </button>
              <ul className="flex items-stretch overflow-x-auto no-scrollbar">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id} className="relative group flex-shrink-0">
                    <button
                      onClick={() => onNavigateCategory?.(cat.id)}
                      className="flex items-center gap-1 px-3 h-8 text-[10px] font-bold text-[#444] hover:text-[#FF5A00] transition-colors uppercase tracking-tight whitespace-nowrap border-b-2 border-transparent hover:border-[#FF5A00]"
                      onMouseEnter={() => setHoveredNav(cat.id)}
                      onMouseLeave={() => setHoveredNav(null)}
                    >
                      {cat.name}
                      {cat.subcategories && cat.subcategories.length > 0 && <ChevronDown size={10} className="opacity-40" />}
                    </button>
                    {/* Dropdown */}
                    {cat.subcategories && cat.subcategories.length > 0 && hoveredNav === cat.id && (
                      <div
                        className="absolute top-full left-0 bg-white shadow-xl border border-gray-100 rounded-b-sm min-w-[220px] py-2 z-50 block"
                        onMouseEnter={() => setHoveredNav(cat.id)}
                        onMouseLeave={() => setHoveredNav(null)}
                      >
                        {cat.subcategories.slice(0, 8).map((sub) => (
                          <button 
                            key={sub} 
                            onClick={() => onNavigateCategory?.(cat.id, sub)}
                            className="w-full text-left block px-4 py-1.5 text-[10px] font-bold text-gray-700 hover:bg-gray-50 hover:text-[#FF5A00] transition-colors"
                          >
                            {sub}
                          </button>
                        ))}
                        <button 
                          onClick={() => {
                            onNavigateCategory?.(cat.id);
                            setIsCategoriesModalOpen(true);
                          }}
                          className="w-full text-left block px-4 py-1.5 text-[10px] font-black text-[#FF5A00] hover:bg-gray-50 transition-colors border-t border-gray-100 mt-1 uppercase italic tracking-tighter"
                        >
                          Ver todos →
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <ul className="space-y-0.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => {
                      onNavigateCategory?.(cat.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between py-2.5 px-3 text-[13px] font-bold text-gray-800 hover:bg-gray-50 hover:text-[#FF5A00] transition-colors uppercase rounded text-left"
                  >
                    {cat.name}
                    {cat.subcategories && cat.subcategories.length > 0 && <ChevronDown size={14} className="opacity-50" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
