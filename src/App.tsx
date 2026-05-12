import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/Header';
import { CategoryCircles } from './components/CategoryCircles';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { CartSidebar } from './components/CartSidebar';
import { FeaturedOffers } from './components/FeaturedOffers';
import { TodayOnlySection } from './components/TodayOnlySection';
import { FreeShippingSection } from './components/FreeShippingSection';
import { BrandCarousel } from './components/BrandCarousel';
import { LoginModal } from './components/LoginModal';
import { AdminPanel } from './components/AdminPanel';
import { PromotionPopup } from './components/PromotionPopup';
import { CategoryPage } from './components/CategoryPage';
import { Product } from './types';
import { formatCurrency } from './lib/utils';
import { 
  ChevronRight, ChevronDown, ShieldCheck, Truck, Clock, Phone, MapPin, 
  Instagram, Facebook, Youtube, CreditCard, Apple, Wallet,
  Star, Minus, Plus, Share2, Heart, CheckCircle2, Wrench, Users,
  Flame, Search, ShoppingCart, Package
} from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES } from './constants';

const TrustBadge = ({ icon: Icon, title, sub }: { icon: any, title: string, sub: string }) => (
  <div className="flex items-center gap-3 py-4 lg:py-6 group cursor-pointer hover:bg-white/5 transition-colors px-4 border-r border-gray-100 last:border-r-0 flex-1 min-w-[200px]">
    <Icon className="text-[#FF5A00] group-hover:scale-110 transition-transform" size={32} strokeWidth={1.5} />
    <div className="leading-tight">
      <p className="text-[12px] font-black uppercase text-[#222] tracking-tighter">{title}</p>
      <p className="text-[10px] text-gray-500 font-bold uppercase">{sub}</p>
    </div>
  </div>
);

const mockReviews = [
  { name: 'Antonio Carlos M.', date: '05/03/2026', rating: 5, text: 'Produto chegou rápido e em perfeito estado. Recomendo muito!' },
  { name: 'Adeilson F.', date: '18/09/2025', rating: 5, text: 'Ótima qualidade, superou minhas expectativas.' },
  { name: 'Leonardo M.', date: '26/05/2025', rating: 3, text: 'Produto bom, mas a embalagem chegou um pouco amassada.' },
];

function Storefront() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [view, setView] = useState<'home' | 'product' | 'category' | 'checkout'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedThumb, setSelectedThumb] = useState(0);

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedThumb(0);
    setView('product');
    window.scrollTo(0,0);
  };

  const navigateToCategory = (categoryId: string, subcategory?: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(subcategory || null);
    setView('category');
    window.scrollTo(0, 0);
  };

  if (isAdmin) {
    return (
      <AdminPanel 
        products={products} 
        setProducts={setProducts} 
        onLogout={() => setIsAdmin(false)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#eeeeee] font-sans">
      <Header 
        onOpenCart={() => setIsCartOpen(true)} 
        onNavigateCategory={navigateToCategory}
        onNavigateHome={() => { setView('home'); window.scrollTo(0,0); }}
      />
      
      {isLoginOpen && (
        <LoginModal 
          onClose={() => setIsLoginOpen(false)} 
          onAdminLogin={() => { setIsAdmin(true); setIsLoginOpen(false); }} 
        />
      )}

      <main>
        {view === 'home' && (
          <>
            <Hero />
            
            {/* Trust Badges Bar */}
            <div className="bg-white border-b border-gray-200">
              <div className="container mx-auto">
                <div className="flex overflow-x-auto no-scrollbar">
                  <TrustBadge icon={Truck} title="Frete Grátis" sub="Consulte as condições" />
                  <TrustBadge icon={CreditCard} title="Até 12x Sem Juros" sub="No cartão de crédito" />
                  <TrustBadge icon={ShieldCheck} title="Compra Segura" sub="Certificado SSL" />
                  <TrustBadge icon={Clock} title="Entrega Rápida" sub="Agilidade e segurança" />
                  <TrustBadge icon={MapPin} title="Retirada Loja" sub="+ de 100 pontos" />
                </div>
              </div>
            </div>

            <CategoryCircles onNavigateCategory={navigateToCategory} />
            
            <FeaturedOffers 
              products={products.filter(p => p != null && !p.hasFreeShipping)} 
              onProductClick={navigateToProduct}
              onNavigateCategory={navigateToCategory}
            />

            <ProductGrid 
              title="Mais Procurados" 
              subtitle="Confira as ferramentas preferidas dos profissionais" 
              products={products}
              onProductClick={navigateToProduct}
              onNavigateCategory={navigateToCategory}
            />

            {/* Banners Below Mais Procurados */}
            <section className="py-8 container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group overflow-hidden rounded-xl cursor-pointer relative aspect-[16/6] md:aspect-[16/5]">
                  <img src="https://picsum.photos/seed/tool1/1200/400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" alt="" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center px-8">
                     <div className="text-white">
                        <span className="bg-[#FF5A00] px-2 py-0.5 rounded text-[10px] font-black uppercase italic">Oferta Especial</span>
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter mt-1">Máquinas de Corte</h3>
                        <p className="text-xs font-bold opacity-80 uppercase italic tracking-widest mt-1">Até 40% OFF no Pix</p>
                     </div>
                  </div>
                </div>
                <div className="group overflow-hidden rounded-xl cursor-pointer relative aspect-[16/6] md:aspect-[16/5]">
                  <img src="https://picsum.photos/seed/tool2/1200/400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" alt="" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center px-8">
                     <div className="text-white">
                        <span className="bg-[#0D1B2A] px-2 py-0.5 rounded text-[10px] font-black uppercase italic">Lançamento</span>
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter mt-1">Nova Linha SMB Pro</h3>
                        <p className="text-xs font-bold opacity-80 uppercase italic tracking-widest mt-1">Tecnologia Alemã</p>
                     </div>
                  </div>
                </div>
              </div>
            </section>

            <FreeShippingSection 
              products={products}
              onProductClick={navigateToProduct}
              onNavigateCategory={navigateToCategory}
            />
            <TodayOnlySection 
              products={products}
              onProductClick={navigateToProduct}
              onNavigateCategory={navigateToCategory}
            />

            {/* Video Banner Below Só Hoje */}
            <section className="py-8 bg-[#eeeeee]">
              <div className="container mx-auto px-4">
                <div className="relative aspect-[21/9] lg:aspect-[32/9] rounded-xl overflow-hidden bg-black group cursor-pointer shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=2000" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" 
                    alt="Processo Industrial"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FF5A00] transition-all duration-300">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-white ml-1"></div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-white text-xl md:text-2xl font-black uppercase italic tracking-tighter mb-1">Confira nossas máquinas em ação</h3>
                      <p className="text-white/60 text-xs font-bold uppercase tracking-widest italic">Assista ao vídeo institucional SMB Máquinas</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <BrandCarousel onNavigateCategory={navigateToCategory} />

            {/* Mid Banners */}
            <section className="py-8 container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group overflow-hidden rounded-xl cursor-pointer relative aspect-[16/6] md:aspect-[16/5]">
                  <img src="https://picsum.photos/seed/promo1/1200/400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" alt="" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="group overflow-hidden rounded-xl cursor-pointer relative aspect-[16/6] md:aspect-[16/5]">
                  <img src="https://picsum.photos/seed/promo2/1200/400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" alt="" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
              </div>
            </section>
          </>
        )}

        {view === 'category' && selectedCategory && (() => {
          const category = CATEGORIES.find(c => c.id === selectedCategory);
          if (!category) return null;
          // Strict category filter — CategoryPage handles subcategory filtering internally
          const categoryProducts = products.filter(p => p != null && p.category === selectedCategory);
          return (
            <CategoryPage
              category={category}
              subcategory={selectedSubcategory}
              products={categoryProducts}
              onProductClick={navigateToProduct}
              onNavigateHome={() => { setView('home'); window.scrollTo(0, 0); }}
              onNavigateCategory={(catId, sub) => navigateToCategory(catId, sub)}
            />
          );
        })()}

        {view === 'product' && selectedProduct && (
          <div className="bg-white">
            <div className="container mx-auto px-4 max-w-[1240px] py-4">
            {/* Breadcrumb - Matches Loja do Mecânico style */}
            <nav className="flex items-center gap-2 text-[11px] text-gray-500 font-medium mb-6">
              <span className="cursor-pointer hover:underline" onClick={() => setView('home')}>Home</span>
              <ChevronRight size={10} className="text-gray-300" />
              <span className="cursor-pointer hover:underline" onClick={() => navigateToCategory(selectedProduct.category)}>{selectedProduct.category}</span>
              <ChevronRight size={10} className="text-gray-300" />
              <span className="text-gray-400 font-normal">{selectedProduct.name}</span>
            </nav>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_minmax(300px,400px)_minmax(280px,340px)] gap-8 mb-12">
                
                {/* 1. LEFT: Images Area */}
                <div className="space-y-4">
                  <div className="relative bg-white border border-gray-100 rounded-lg p-8 group">
                    <img 
                      src={selectedProduct.images[selectedThumb] || selectedProduct.images[0]} 
                      alt={selectedProduct.name} 
                      className="w-full aspect-square object-contain" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                       <button className="p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 border border-gray-100"><Heart size={20} /></button>
                       <button className="p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-blue-500 border border-gray-100"><Share2 size={20} /></button>
                    </div>
                  </div>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
                    {selectedProduct.images.map((img, i) => (
                      <button 
                        key={i}
                        onClick={() => setSelectedThumb(i)}
                        className={`w-20 h-20 bg-white border rounded-md p-1 flex items-center justify-center transition-all shrink-0 ${
                          selectedThumb === i ? 'border-[#FF5A00] ring-1 ring-[#FF5A00]' : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <img src={img} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                    {/* Placeholder placeholders if less than 5 */}
                    {[...Array(Math.max(0, 4 - selectedProduct.images.length))].map((_, i) => (
                      <div key={i} className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-md flex items-center justify-center text-gray-200 shrink-0 italic text-[10px] font-black">
                        +{i+3}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. CENTER: Product Info */}
                <div className="flex flex-col font-poppins">
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="bg-[#FF5A00] text-white px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 uppercase">
                      <Flame size={10} fill="white" />
                      Mais vendido
                    </div>
                    <span className="text-[11px] text-[#007BFF] font-medium hover:underline cursor-pointer">
                      8º Lugar em {selectedProduct.category}
                    </span>
                  </div>

                  <h1 className="text-[17px] lg:text-[18px] font-normal text-[#222] leading-[1.2] mb-1.5">
                    {selectedProduct.name}
                  </h1>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex text-yellow-400">
                      {[1,2,3,4,5].map(i => <Star key={i} size={12} fill={i <= 4 ? "currentColor" : "none"} strokeWidth={2} />)}
                    </div>
                    <span className="text-[12px] text-gray-500 font-medium">4.7 <span className="text-gray-300 mx-0.5">(135)</span></span>
                    <span className="text-[10px] text-gray-400 font-medium ml-auto uppercase">COD. {4436335 + selectedProduct.id} <span className="font-bold text-red-600">LYNUS</span></span>
                  </div>

                  <div className="border-t border-gray-200 my-2" />

                  {/* Variation Selectors */}
                  <div className="mb-3">
                    <p className="text-[12px] font-bold text-gray-600 mb-1.5">Tensão:</p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border-2 border-[#FF5A00] rounded text-[13px] font-bold text-[#222] relative bg-white">
                        110/220
                        <div className="absolute -bottom-1 -right-1 bg-[#FF5A00] text-white rounded-full p-0.5">
                          <CheckCircle2 size={8} />
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 my-2" />

                  {/* Pricing */}
                  <div className="mb-3 leading-[1.1]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[26px] font-bold text-[#222]">R$ {Math.floor(selectedProduct.price).toLocaleString('pt-BR')}</span>
                      <span className="text-[14px] font-bold text-[#222]">,{ (selectedProduct.price % 1).toFixed(2).split('.')[1] }</span>
                    </div>
                    <p className="text-[12px] text-gray-600 mt-1">
                      já com <span className="font-bold text-[#222]">10% de desconto</span> à vista no Pix ou boleto
                    </p>
                    <p className="text-[12px] text-gray-600">
                      <span className="font-bold text-[#222]">R$ {(selectedProduct.price * 1.1).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span> em até <span className="font-bold text-[#222]">10x de {((selectedProduct.price * 1.1) / 10).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span> sem juros no cartão
                    </p>
                  </div>

                  <div className="border-t border-gray-200 my-2" />

                  <div className="pt-1 space-y-3">
                    <button className="flex items-center justify-between w-full h-10 hover:bg-gray-50 px-3 rounded-md group transition-colors border border-transparent hover:border-gray-100">
                      <div className="flex items-center gap-3">
                        <CreditCard size={18} className="text-gray-400 group-hover:text-[#FF5A00]" />
                        <span className="text-[12px] font-bold text-[#222] uppercase tracking-tight">Mais formas de pagamento</span>
                      </div>
                      <ChevronRight size={14} className="text-gray-300" />
                    </button>
                    
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium pb-2 border-b border-gray-200">
                      <Users size={14} />
                      Programa de Afiliados. <span className="text-[#007BFF] cursor-pointer hover:underline uppercase text-[10px] font-black">Ver regras</span>
                    </div>
                  </div>
                </div>

                {/* 3. RIGHT: Purchase Box */}
                <div className="space-y-4">
                  <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex flex-col gap-5">
                    
                    {/* Free Shipping Badge */}
                    <div className="bg-[#E7F6ED] text-[#16A34A] py-2 px-4 rounded-lg flex items-center gap-2">
                      <Truck size={18} />
                      <p className="text-[12px] font-bold">Frete Grátis <span className="font-normal">Para - todo o Brasil</span></p>
                    </div>

                    {/* Shipping Calc */}
                    <div className="relative group">
                      <input 
                        type="text" 
                        placeholder="Digite o CEP para simular o frete" 
                        className="w-full h-11 pl-4 pr-10 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#FF5A00] transition-colors"
                      />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>

                    <div className="flex items-center justify-between">
                       <p className="text-[11px] text-gray-500 font-medium">Produto elegível para entrega <span className="text-[#007BFF] font-black uppercase italic tracking-tighter">RÁPIDA</span></p>
                    </div>

                    {/* Qty Selector */}
                    <div className="flex items-center justify-between">
                       <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-9">
                        <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="w-9 h-full flex items-center justify-center hover:bg-gray-50 text-gray-400"><Minus size={14} strokeWidth={3} /></button>
                        <span className="w-10 text-center text-sm font-bold">{quantity}</span>
                        <button onClick={() => setQuantity(q => q+1)} className="w-9 h-full flex items-center justify-center hover:bg-gray-50 text-[#FF5A00]"><Plus size={14} strokeWidth={3} /></button>
                       </div>
                       <p className="text-[12px] text-gray-500">Quantidade: <span className="font-bold text-[#222]">{quantity} unidade</span></p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button className="w-full bg-[#16A34A] hover:bg-[#149141] text-white py-3.5 rounded-lg font-bold text-[15px] transition-all shadow-lg shadow-green-50 uppercase">
                        Comprar Agora
                      </button>
                      <button className="w-full border-2 border-[#16A34A] text-[#16A34A] py-3 rounded-lg font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-green-50 transition-all">
                        <ShoppingCart size={18} />
                        Adicionar ao carrinho
                      </button>
                    </div>

                    <p className="text-[11px] text-gray-400 text-center">Vendido e entregue por <span className="font-bold text-red-600">Loja do Mecânico</span></p>
                  </div>
                </div>
              </div>

              {/* Bottom Sections: Description and Cross-Sell */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 mb-8">
                {/* Description Card */}
                <div className="bg-white border border-gray-100 rounded-lg overflow-hidden flex flex-col shadow-sm">
                   <div className="flex items-center gap-2 p-4 border-b border-gray-50 bg-gray-50/20">
                      <Package size={16} className="text-[#FF5A00]" />
                      <h3 className="font-bold text-[#222] text-[14px] uppercase tracking-tight">Descrição do produto</h3>
                   </div>
                   <div className="p-6 font-poppins">
                      <p className="text-[13px] font-bold text-gray-900 mb-4 leading-relaxed">{selectedProduct.description}</p>
                      <div className="text-[12px] text-gray-600 leading-relaxed space-y-4">
                        <p>A máquina de solda multiprocesso é o tipo de equipamento que simplifica a vida de quem solda: com um único inversor, você consegue realizar diferentes tipos de soldagem, alternando a fonte de corrente elétrica conforme o processo e o material. A Power 160A Bivolt Automático foi pensada para entregar essa flexibilidade com praticidade, sendo uma máquina de solda inversora compacta, fácil de transportar e indicada para você que precisa trabalhar em diferentes locais, mantendo desempenho e controle.</p>
                        <p>No dia a dia, isso significa ter uma soldadora multiprocesso capaz de executar soldagem MIG/MAG, TIG e eletrodo revestido (MMA), além de aplicações citadas como arco submerso, sem a necessidade de investir em vários equipamentos separados. O conjunto traz Euro Conector, é compatível com diversos tipos de arames e eletrodos e aceita suporte de arame de 15 kgf, aumentando a autonomia em trabalhos contínuos. A faixa de corrente da máquina inversora chega a 160A em MIG/MAG (220V), com opções adequadas também para MMA/TIG.</p>
                        <p>A parte elétrica e de proteção da máquina de solda inversora reforça o uso seguro e consistente: tensão sem carga de 68V, eficiência de 85%, grau de proteção IP21S e conformidade com IEC 60974-1. O equipamento trabalha com frequência 60 Hz, tem dimensões 320×150×280 mm, pesa 6,7 kgf, possui alça para transporte e display digital, facilitando ajustes com leitura clara.</p>
                      </div>
                   </div>
                </div>

                {/* Compre Junto Vertical Card */}
                <div className="bg-white border border-gray-100 rounded-lg p-5 flex flex-col h-fit shadow-sm">
                   <h3 className="font-bold text-[#222] text-[14px] mb-6 uppercase border-b border-gray-100 pb-2">Compre Junto</h3>
                   <div className="space-y-6">
                      {/* Products visual */}
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-14 h-14 bg-white rounded border border-gray-100 p-1">
                          <img src={selectedProduct.images[0]} className="w-full h-full object-contain" />
                        </div>
                        <Plus size={12} className="text-gray-300" />
                        <div className="w-14 h-14 bg-white rounded border border-gray-100 p-1">
                          <img src={MOCK_PRODUCTS[4].images[0]} className="w-full h-full object-contain" />
                        </div>
                        <Plus size={12} className="text-gray-300" />
                        <div className="w-14 h-14 bg-white rounded border border-gray-200 p-1">
                          <img src={MOCK_PRODUCTS[5].images[0]} className="w-full h-full object-contain" />
                        </div>
                      </div>

                      {/* Information List */}
                      <div className="space-y-4">
                        {[
                          { name: selectedProduct.name, price: selectedProduct.price, checked: true },
                          { name: 'Rolo Arame de Solda MIG E71T-GS sem Gás 0,8mm 1Kg LYNUS-LAM-08', price: 34.90, checked: true },
                          { name: 'Máscara de Solda Automática com Regulagem 9 a 13 LYNUS-MSL-500', price: 79.90, checked: true }
                        ].map((bundle, i) => (
                          <div key={i} className="flex items-start gap-2 group cursor-pointer">
                             <input type="checkbox" defaultChecked={bundle.checked} className="mt-1 accent-[#FF5A00] w-3.5 h-3.5" />
                             <div className="flex-1 flex items-center justify-between">
                                <p className="text-[10px] font-medium text-gray-500 line-clamp-2 leading-tight group-hover:text-[#FF5A00] transition-colors max-w-[160px] uppercase">{bundle.name} <span className="font-bold text-[#222]">por {bundle.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
                                <ChevronRight size={10} className="text-gray-300" />
                             </div>
                          </div>
                        ))}
                      </div>

                      {/* Total and Action */}
                      <div className="pt-6 border-t border-gray-100">
                        <p className="text-[12px] text-gray-500 mb-1 font-medium">Compre os <span className="font-bold text-[#222]">3 itens</span> por</p>
                        <div className="flex items-baseline gap-1">
                           <span className="text-[20px] font-black text-[#222]">R$ 1.243</span>
                           <span className="text-[12px] font-black text-[#222]">,70</span>
                        </div>
                        <button className="w-full mt-4 border border-[#FF5A00] text-[#FF5A00] hover:bg-orange-50 py-2.5 rounded text-[12px] font-bold uppercase transition-all tracking-tight">
                          Comprar junto
                        </button>
                      </div>
                   </div>
                </div>
              </div>

              {/* 4. Specifications Section */}
              <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm mb-12">
                 <div className="flex items-center justify-between p-5 border-b border-gray-50 bg-gray-50/50">
                    <div className="flex items-center gap-2">
                      <Wrench size={18} className="text-[#FF5A00]" />
                      <h3 className="font-bold text-[#222] text-[15px] uppercase">Ficha Técnica</h3>
                    </div>
                 </div>
                 <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t border-l border-gray-100">
                       {Object.entries(selectedProduct.specs || {
                         'Marca': 'SMB Pro',
                         'Modelo': 'LIM-160',
                         'Potência': '160A',
                         'Garantia': '12 Meses',
                         'Peso': '8.5kg',
                         'Dimensões': '40x20x30cm'
                       }).map(([key, val], idx) => (
                         <div key={key} className={`flex justify-between py-3 px-4 border-r border-b border-gray-100 ${idx % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'}`}>
                           <span className="text-[12px] font-bold text-gray-400 uppercase tracking-tight">{key}</span>
                           <span className="text-[12px] font-black text-[#222]">{val}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* 5. Similar Products */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <Package size={20} className="text-[#FF5A00]" />
                  <h3 className="font-bold text-[#222] text-[18px] uppercase tracking-tight">Quem viu este produto, viu também</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {MOCK_PRODUCTS.filter(p => p.id !== selectedProduct.id).slice(0, 5).map(p => (
                    <div key={p.id} className="bg-white border border-gray-100 p-4 rounded-xl cursor-pointer hover:shadow-lg transition-all group" onClick={() => navigateToProduct(p)}>
                       <div className="aspect-square mb-3 flex items-center justify-center">
                         <img src={p.images[0]} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                       </div>
                       <h4 className="text-[11px] font-medium text-gray-700 line-clamp-2 h-8 mb-2">{p.name}</h4>
                       <div className="flex items-baseline gap-1">
                          <span className="text-[#FF5A00] font-black text-[10px]">R$</span>
                          <span className="text-[#222] text-[16px] font-black tracking-tighter leading-none">{Math.floor(p.price).toLocaleString('pt-BR')}</span>
                          <span className="text-[#222] text-[11px] font-black tracking-tighter leading-none">,{(p.price % 1).toFixed(2).split('.')[1]}</span>
                       </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Reviews Section */}
              <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm mb-12 p-8">
                 <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-gray-50 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#222] uppercase tracking-tight mb-2">Avaliações do produto</h3>
                      <div className="flex items-center gap-2">
                         <div className="flex text-yellow-400">
                           <Star size={18} fill="currentColor" />
                           <Star size={18} fill="currentColor" />
                           <Star size={18} fill="currentColor" />
                           <Star size={18} fill="currentColor" />
                           <Star size={18} fill="none" strokeWidth={2} />
                         </div>
                         <span className="text-[18px] font-black text-[#222]">4.7 <span className="text-[12px] text-gray-400 font-normal ml-1">votos</span></span>
                      </div>
                    </div>
                    <button className="bg-[#0D1B2A] text-white px-8 py-3 rounded-lg font-bold text-xs hover:bg-black transition-all uppercase tracking-widest">
                      Avaliar este produto
                    </button>
                 </div>

                 <div className="space-y-6">
                    {mockReviews.map((review, i) => (
                      <div key={i} className="pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                         <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 text-sm">{review.name[0]}</div>
                               <div>
                                  <p className="text-[13px] font-bold text-[#222]">{review.name}</p>
                                  <p className="text-[10px] text-gray-400 font-bold">{review.date}</p>
                               </div>
                            </div>
                            <div className="flex text-yellow-400 gap-0.5">
                               {Array.from({ length: 5 }).map((_, idx) => (
                                 <Star key={idx} size={11} fill={idx < review.rating ? "currentColor" : "none"} strokeWidth={2.5} />
                               ))}
                            </div>
                         </div>
                         <p className="text-[13px] text-gray-600 leading-relaxed italic">"{review.text}"</p>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-[#f5f5f5] border-t border-gray-200 mt-8 font-poppins">

  {/* Bloco de credibilidade */}
  <div className="bg-white py-12 border-b border-gray-200">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-[#222] mb-2">
        Compre na maior loja de máquinas e ferramentas do Brasil
      </h2>
      <div className="w-16 h-0.5 bg-[#FF5A00] mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: Wrench, title: 'Desde 1993', text: 'Somos referência no segmento, unindo tradição, confiança e experiência de quem realmente entende do assunto.' },
          { icon: MapPin, title: 'Perto de você', text: 'Faça suas compras direto na loja, retire, troque ou devolva produtos com facilidade e conte com atendimento especializado.' },
          { icon: Users, title: 'Gente que entende', text: 'Somos cerca de 1500 colaboradores dedicados a garantir a melhor experiência, desde o atendimento até a entrega.' },
          { icon: ShieldCheck, title: 'Entrega garantida', text: 'São mais de 100 milhões de pedidos entregues, prova da confiança e da preferência de quem sabe onde comprar.' },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title}>
            <Icon size={28} className="text-[#FF5A00] mb-3" strokeWidth={1.5} />
            <h4 className="font-bold text-[#222] mb-2 text-sm">{title}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-8 leading-relaxed max-w-3xl">
        A SMB Máquinas é uma das maiores lojas de ferramentas e máquinas do Brasil. 
        Fundada com o propósito de democratizar o acesso a ferramentas profissionais de qualidade, 
        atendemos profissionais e entusiastas em todo o território nacional.
      </p>
    </div>
  </div>

  {/* Links do rodapé */}
  <div className="bg-white py-12 border-b border-gray-100">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Institucional */}
        <div>
          <h4 className="font-bold text-[#222] mb-4 text-sm border-b border-[#FF5A00] pb-2">Institucional</h4>
          <ul className="space-y-2">
            {['Atendimento','Central de Ajuda','Trocas e Devoluções','Minha Conta','Acompanhe seus pedidos','Consórcio','Como Comprar','Entrega','Formas de Pagamento','Nosso Blog','Trabalhe Conosco','LGPD','Garantia Estendida'].map(item => (
              <li key={item}><a href="#" className="text-xs text-gray-500 hover:text-[#FF5A00] transition-colors">› {item}</a></li>
            ))}
          </ul>
        </div>

        {/* Televendas + Corporativo */}
        <div className="space-y-8">
          <div>
            <h4 className="font-bold text-[#222] mb-4 text-sm border-b border-[#FF5A00] pb-2">Televendas</h4>
            <p className="text-xs text-gray-500 mb-2">Todas as localidades</p>
            <div className="flex items-center gap-2 text-[#222] font-bold text-sm">
              <Phone size={14} className="text-[#FF5A00]" />
              (11) 3508-9979
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[#222] mb-4 text-sm border-b border-[#FF5A00] pb-2">Vendas corporativas</h4>
            <div className="flex items-center gap-2 text-[#222] font-bold text-sm mb-2">
              <Phone size={14} className="text-[#FF5A00]" />
              (11) 3185-6786
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>✉</span>
              corporativo@smbmaquinas.com.br
            </div>
          </div>
        </div>

        {/* Categorias */}
        <div>
          <h4 className="font-bold text-[#222] mb-4 text-sm border-b border-[#FF5A00] pb-2">Veja todas as categorias</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => navigateToCategory(cat.id)}
                className="text-xs text-left text-gray-500 hover:text-[#FF5A00] transition-colors"
              >
                › {cat.name}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  </div>

  {/* Marcas */}
  <div className="bg-white py-3 border-b border-gray-100">
    <div className="container mx-auto px-4">
      <p className="text-[10px] text-gray-400 text-center">
        <span className="font-bold text-gray-500 mr-2">Navegue pelas marcas:</span>
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((l, i) => (
          <span key={l}>
            <a href="#" className="hover:text-[#FF5A00] transition-colors">{l}</a>
            {i < 25 && <span className="mx-1 text-gray-300">-</span>}
          </span>
        ))}
      </p>
    </div>
  </div>

  {/* Base do rodapé */}
  <div className="bg-[#0D1B2A] py-6">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-1">
        <span className="bg-[#FF5A00] text-white font-black text-lg px-2 py-0.5 rounded-sm">SMB</span>
        <span className="text-white font-black text-lg italic uppercase tracking-tighter ml-1">MÁQUINAS</span>
      </div>
      <p className="text-[10px] text-white/30 font-black uppercase tracking-widest text-center leading-relaxed">
        SMB Máquinas e Equipamentos LTDA | CNPJ: 12.345.678/0001-90<br />
        São Paulo - SP | Todos os direitos reservados © 2026
      </p>
      <div className="flex gap-3">
        <Instagram size={18} className="text-white/40 hover:text-[#FF5A00] transition-colors cursor-pointer" />
        <Facebook size={18} className="text-white/40 hover:text-[#FF5A00] transition-colors cursor-pointer" />
        <Youtube size={18} className="text-white/40 hover:text-[#FF5A00] transition-colors cursor-pointer" />
      </div>
    </div>
  </div>

</footer>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <PromotionPopup onProductClick={navigateToProduct} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Storefront />
      </CartProvider>
    </AuthProvider>
  );
}