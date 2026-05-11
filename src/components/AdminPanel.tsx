import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ShoppingBag, List, ShoppingCart, Users, Palette, 
  Star, Ticket, Landmark, Settings, LogOut, Search, Plus, 
  TrendingUp, DollarSign, Package as PackageIcon, UserPlus,
  CheckCircle2, Clock, AlertTriangle, X, Upload, Video, 
  ChevronDown, MessageSquare, Trash2, Edit2, Zap, Truck
} from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { Product, Category, Order, Review } from '../types';
import { CATEGORIES } from '../constants';

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onLogout: () => void;
}

type Section = 'Dashboard' | 'Produtos' | 'Categorias' | 'Pedidos' | 'Clientes' | 'Aparência' | 'Avaliações' | 'Cupons' | 'Financeiro' | 'Configurações';

export const AdminPanel: React.FC<AdminPanelProps> = ({ products, setProducts, onLogout }) => {
  const [activeSection, setActiveSection] = useState<Section>('Dashboard');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showConfigToast, setShowConfigToast] = useState(false);

  // Categories State
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);

  const [newCategory, setNewCategory] = useState<Partial<Category>>({ name: '', icon: '' });

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>([
    { 
      id: 'rev1', 
      productId: '1', 
      userName: 'Ricardo S.', 
      rating: 5, 
      comment: 'Ferramenta excelente, aguentou o tranco no sítio.', 
      date: '10/02/2026', 
      isVerified: true 
    }
  ]);

  const [newReview, setNewReview] = useState<Partial<Review>>({
    userName: '',
    rating: 5,
    comment: '',
    productId: products[0]?.id || '',
    date: new Date().toLocaleDateString('pt-BR'),
    isVerified: true
  });

  // Orders State (Mocking Real Data flow)
  const [orders, setOrders] = useState<Order[]>([
    { 
      id: 'ORD-8293', 
      userId: 'user1', 
      customerEmail: 'cliente_antonio@gmail.com', 
      items: [], 
      total: 1249.90, 
      status: 'paid', 
      paymentMethod: 'pix', 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString(),
      address: { street: 'Av. Paulista', number: '1000', neighborhood: 'Bela Vista', city: 'São Paulo', state: 'SP', zipCode: '01310-000' }
    }
  ]);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'Motosserra',
    price: 0,
    originalPrice: 0,
    images: [],
    videoUrl: '',
    stock: 10,
    hasFreeShipping: false,
    hasFastDelivery: false,
    isOfferOfDay: false,
    specs: {},
    description: ''
  });

  const [tempSpecKey, setTempSpecKey] = useState('');
  const [tempSpecValue, setTempSpecValue] = useState('');

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Deseja realmente excluir este produto?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? (newProduct as Product) : p));
      setEditingProduct(null);
    } else {
      const p: Product = {
        ...newProduct as Product,
        id: Math.random().toString(36).substr(2, 9),
        rating: 5,
        reviewCount: 0
      };
      setProducts(prev => [p, ...prev]);
    }
    setShowAddProductModal(false);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setShowAddProductModal(true);
  };

  const handleAddSpec = () => {
    if (tempSpecKey && tempSpecValue) {
      setNewProduct(prev => ({
        ...prev,
        specs: { ...prev.specs, [tempSpecKey]: tempSpecValue }
      }));
      setTempSpecKey('');
      setTempSpecValue('');
    }
  };

  // Category Logic
  const handleSaveCategory = () => {
    if (editingCategory) {
      setCategories(prev => prev.map(c => c.id === editingCategory.id ? { ...editingCategory, ...newCategory } as Category : c));
    } else {
      const cat: Category = {
        id: Math.random().toString(36).substr(2, 9),
        name: newCategory.name || '',
        icon: newCategory.icon || 'Box',
        subcategories: []
      };
      setCategories(prev => [...prev, cat]);
    }
    setShowCategoryModal(false);
    setEditingCategory(null);
    setNewCategory({ name: '', icon: '' });
  };

  const handleEditCategory = (cat: Category) => {
    setEditingCategory(cat);
    setNewCategory(cat);
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm('Excluir esta categoria?')) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  // Review Logic
  const handleSaveReview = () => {
    const rev: Review = {
      ...newReview as Review,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString('pt-BR')
    };
    setReviews(prev => [rev, ...prev]);
    setNewReview({
      userName: '',
      rating: 5,
      comment: '',
      productId: products[0]?.id || '',
      date: new Date().toLocaleDateString('pt-BR'),
      isVerified: true
    });
  };

  // File Upload Simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'images' | 'video' | 'avatar') => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          if (type === 'images') {
            setNewProduct(prev => ({ ...prev, images: [...(prev.images || []), result] }));
          } else if (type === 'video') {
            setNewProduct(prev => ({ ...prev, videoUrl: result }));
          } else if (type === 'avatar') {
            setNewReview(prev => ({ ...prev, userAvatar: result }));
          }
        };
        reader.readAsDataURL(file as Blob);
      });
    }
  };

  const removeSpec = (key: string) => {
    const newSpecs = { ...newProduct.specs };
    delete newSpecs[key];
    setNewProduct(prev => ({ ...prev, specs: newSpecs }));
  };

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard' as Section },
    { icon: ShoppingBag, label: 'Produtos' as Section },
    { icon: List, label: 'Categorias' as Section },
    { icon: ShoppingCart, label: 'Pedidos' as Section },
    { icon: Users, label: 'Clientes' as Section },
    { icon: Palette, label: 'Aparência' as Section },
    { icon: Star, label: 'Avaliações' as Section },
    { icon: Ticket, label: 'Cupons' as Section },
    { icon: Landmark, label: 'Financeiro' as Section },
    { icon: Settings, label: 'Configurações' as Section },
  ];

  const handleSaveConfig = () => {
    setShowConfigToast(true);
    setTimeout(() => setShowConfigToast(false), 3000);
  };

  // Dashboard Stats calculation
  const totalRevenue = orders.filter(o => o.status === 'paid').reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalStockValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const totalReviews = reviews.length;
  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0.0';

  return (
    <div className="fixed inset-0 z-[100] flex bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0D1B2A] text-white flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF5A00] rounded-lg flex items-center justify-center font-black italic text-xl">S</div>
            <span className="font-black italic text-xl tracking-tighter uppercase">Admin Panel</span>
          </div>
          <button onClick={onLogout} className="text-white/40 hover:text-red-400 transition-colors">
            <LogOut size={20} />
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveSection(item.label)}
              className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-bold transition-all border-l-4 ${
                activeSection === item.label 
                  ? 'bg-white/5 border-[#FF5A00] text-white' 
                  : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-2xl font-black text-[#0D1B2A] uppercase italic tracking-tighter">{activeSection}</h1>
          <div className="flex items-center gap-4">
             <span className="text-xs font-black text-[#FF5A00] uppercase italic tracking-[2px]">SMB MÁQUINAS OFFICIAL CMS</span>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
          
          {activeSection === 'Dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard title="Vendas Gerais" value={totalRevenue} isCurrency icon={DollarSign} color="bg-[#FF5A00]" />
                 <StatCard title="Total Pedidos" value={totalOrders} icon={ShoppingCart} color="bg-[#0D1B2A]" />
                 <StatCard title="Total Avaliações" value={totalReviews} icon={MessageSquare} color="bg-blue-600" />
                 <StatCard title="Média Avaliação" value={avgRating} icon={Star} color="bg-green-600" />
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-black uppercase italic tracking-tighter text-[#0D1B2A]">Atividade em Tempo Real</h3>
                </div>
                <div className="p-6 h-64 flex items-center justify-center text-gray-300">
                   <TrendingUp size={48} className="opacity-20" />
                   <span className="ml-4 font-bold uppercase italic tracking-widest text-[10px]">Gráfico de vendas integrando...</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'Produtos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-[#0D1B2A] uppercase italic tracking-tighter">Estoque e Produtos</h3>
                <button 
                   onClick={() => { setNewProduct({}); setEditingProduct(null); setShowAddProductModal(true); }}
                   className="bg-[#FF5A00] text-white px-6 py-2.5 rounded-xl font-black uppercase italic tracking-widest flex items-center gap-2 hover:bg-[#E65100] transition-all shadow-lg"
                >
                  <Plus size={20} /> Adicionar Novo
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase italic">Produto</th>
                      <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase italic">Categoria</th>
                      <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase italic">Preços</th>
                      <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase italic">Estoque</th>
                      <th className="text-right py-4 px-6 text-[10px] font-black text-gray-400 uppercase italic">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 italic">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                           <div className="flex items-center gap-3">
                              <img src={p.images[0]} className="w-10 h-10 object-contain rounded bg-gray-50 p-1" />
                              <span className="font-bold text-sm text-[#0D1B2A]">{p.name}</span>
                           </div>
                        </td>
                        <td className="py-4 px-6 text-xs font-bold text-gray-500 uppercase">{p.category}</td>
                        <td className="py-4 px-6">
                           <div className="flex flex-col">
                              {p.originalPrice && <span className="text-[10px] line-through text-gray-400">{formatCurrency(p.originalPrice)}</span>}
                              <span className="text-sm font-black text-[#FF5A00]">{formatCurrency(p.price)}</span>
                           </div>
                        </td>
                        <td className="py-4 px-6">
                           <span className={`px-2 py-0.5 rounded text-[10px] font-black ${p.stock < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                             {p.stock} EM ESTOQUE
                           </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                           <div className="flex justify-end gap-2 text-gray-400">
                              <button onClick={() => handleEditClick(p)} className="hover:text-[#FF5A00] transition-colors"><Edit2 size={16} /></button>
                              <button onClick={() => handleDeleteProduct(p.id)} className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'Categorias' && (
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-[#0D1B2A] uppercase italic tracking-tighter">Gestão de Categorias</h3>
                  <button 
                    onClick={() => { setEditingCategory(null); setNewCategory({ name: '', icon: '' }); setShowCategoryModal(true); }}
                    className="bg-[#0D1B2A] text-white px-6 py-2.5 rounded-xl font-black uppercase italic tracking-widest flex items-center gap-2 hover:bg-black transition-all shadow-lg"
                  >
                    <Plus size={20} /> Nova Categoria
                  </button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map(cat => (
                    <div key={cat.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group overflow-hidden">
                       <div className="absolute top-0 right-0 w-2 h-full bg-[#FF5A00] opacity-20 group-hover:opacity-100 transition-opacity" />
                       <h4 className="text-lg font-black text-[#0D1B2A] uppercase italic mb-1">{cat.name}</h4>
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[2px]">{products.filter(p => p.category === cat.name).length} Produtos Vinculados</p>
                       <div className="mt-4 flex gap-3">
                          <button onClick={() => handleEditCategory(cat)} className="text-[10px] font-black text-[#FF5A00] uppercase italic hover:underline">Editar</button>
                          <button onClick={() => handleDeleteCategory(cat.id)} className="text-[10px] font-black text-red-500 uppercase italic hover:underline">Excluir</button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeSection === 'Avaliações' && (
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-[#0D1B2A] uppercase italic tracking-tighter">Gerenciar Avaliações (Fakes / Reais)</h3>
               </div>
               
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Form to create review */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                     <h4 className="text-xs font-black uppercase italic tracking-widest text-[#FF5A00]">Criar Avaliação em Massa</h4>
                     <Field label="Nome do Perfil" value={newReview.userName} onChange={(v: string) => setNewReview({...newReview, userName: v})} placeholder="Ex: João da Silva" />
                     
                     <div className="space-y-1.5 flex flex-col">
                        <label className="text-[10px] font-black uppercase text-gray-400 italic">Produto Alvo</label>
                        <select 
                          value={newReview.productId} 
                          onChange={e => setNewReview({...newReview, productId: e.target.value})}
                          className="p-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none font-bold text-sm italic"
                        >
                           {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                     </div>

                     <div className="flex gap-4">
                        <div className="flex-1">
                           <label className="text-[10px] font-black uppercase text-gray-400 italic">Estrelas (1-5)</label>
                           <input type="number" min="1" max="5" value={newReview.rating} onChange={e => setNewReview({...newReview, rating: parseInt(e.target.value)})} className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none font-bold italic" />
                        </div>
                        <div className="flex-1 flex flex-col justify-end">
                           <Toggle label="Verificada" active={!!newReview.isVerified} onToggle={() => setNewReview({...newReview, isVerified: !newReview.isVerified})} icon={CheckCircle2} />
                        </div>
                     </div>

                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-gray-400 italic block">Foto de Perfil</label>
                        <input type="file" onChange={(e) => handleFileUpload(e, 'avatar')} className="text-[10px] italic" />
                        {newReview.userAvatar && <img src={newReview.userAvatar} className="w-10 h-10 rounded-full mt-2" />}
                     </div>

                     <Field label="Comentário" isTextarea value={newReview.comment} onChange={(v: string) => setNewReview({...newReview, comment: v})} />

                     <button 
                       onClick={handleSaveReview}
                       className="w-full bg-[#FF5A00] text-white py-3 rounded-xl font-black uppercase italic tracking-widest hover:bg-[#E65100] transition-all shadow-lg"
                     >
                        Publicar Avaliação
                     </button>
                  </div>

                  {/* List of reviews */}
                  <div className="lg:col-span-2 space-y-4">
                     {reviews.map(rev => (
                       <div key={rev.id} className="bg-white p-5 rounded-2xl border border-gray-100 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
                          <img src={rev.userAvatar || `https://ui-avatars.com/api/?name=${rev.userName}`} className="w-12 h-12 rounded-full border-2 border-gray-50" />
                          <div className="flex-1">
                             <div className="flex items-center justify-between mb-1">
                                <h5 className="font-black text-[#0D1B2A] uppercase italic text-sm">{rev.userName}</h5>
                                <span className="text-[10px] font-bold text-gray-400">{rev.date}</span>
                             </div>
                             <div className="flex text-[#FFB800] mb-2">
                                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < rev.rating ? "currentColor" : "none"} />)}
                             </div>
                             <p className="text-xs text-gray-600 font-medium italic">{rev.comment}</p>
                             <div className="mt-3 flex items-center justify-between">
                                <span className="text-[9px] font-black text-blue-600 uppercase italic">Para: {products.find(p => p.id === rev.productId)?.name}</span>
                                <button className="text-[9px] font-black text-red-500 uppercase italic hover:underline">Excluir</button>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          )}

          {activeSection === 'Pedidos' && (
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-[#0D1B2A] uppercase italic tracking-tighter">Controle de Pedidos</h3>
               </div>
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full">
                     <thead className="bg-[#0D1B2A] text-white">
                       <tr>
                         <th className="py-4 px-6 text-left text-[10px] font-black uppercase italic tracking-widest">PEDIDO</th>
                         <th className="py-4 px-6 text-left text-[10px] font-black uppercase italic tracking-widest">CLIENTE</th>
                         <th className="py-4 px-6 text-left text-[10px] font-black uppercase italic tracking-widest">VALOR</th>
                         <th className="py-4 px-6 text-left text-[10px] font-black uppercase italic tracking-widest">STATUS</th>
                         <th className="py-4 px-6 text-right text-[10px] font-black uppercase italic tracking-widest">DETALHES</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100 italic">
                        {orders.map(order => (
                          <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-6 font-black text-[#0D1B2A]">{order.id}</td>
                            <td className="py-4 px-6">
                               <div className="flex flex-col">
                                  <span className="text-sm font-bold">{order.customerEmail}</span>
                                  <span className="text-[10px] text-gray-400 font-bold uppercase">{order.address.city}, {order.address.state}</span>
                               </div>
                            </td>
                            <td className="py-4 px-6 font-black text-[#FF5A00]">{formatCurrency(order.total)}</td>
                            <td className="py-4 px-6">
                               <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase italic ${order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                 {order.status}
                               </span>
                            </td>
                            <td className="py-4 px-6 text-right">
                               <button className="text-[10px] font-black text-blue-600 uppercase italic hover:underline">Ver Pedido →</button>
                            </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          )}

          {!['Dashboard', 'Produtos', 'Categorias', 'Pedidos', 'Avaliações'].includes(activeSection) && (
            <div className="bg-white p-20 rounded-2xl text-center shadow-inner border border-gray-100">
               <AlertTriangle size={48} className="mx-auto text-gray-200 mb-4" />
               <h3 className="text-xl font-black uppercase italic tracking-tighter text-gray-400">Modulo em implementação</h3>
               <p className="text-sm text-gray-300 font-bold italic uppercase mt-2">Equipe de engenharia está finalizando esta feature.</p>
            </div>
          )}

        </div>
      </main>

      {/* Advanced Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0D1B2A]/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col italic">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-[#FF5A00] rounded-lg flex items-center justify-center text-white"><PackageIcon size={20} /></div>
                 <h2 className="text-xl font-black text-[#0D1B2A] uppercase italic tracking-tighter">
                   {editingProduct ? `Editando: ${editingProduct.name}` : 'Cadastrar Novo Produto SMB'}
                 </h2>
              </div>
              <button onClick={() => setShowAddProductModal(false)} className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors transition-colors"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Basic Info */}
                  <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase italic tracking-[3px] text-[#FF5A00] border-b border-orange-100 pb-2">Informações Básicas</h3>
                    <div className="space-y-4">
                      <Field label="Nome do Produto" value={newProduct.name} onChange={v => setNewProduct({...newProduct, name: v})} placeholder="Ex: Moto serra Profissional" />
                      
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-1.5 flex flex-col">
                            <label className="text-[10px] font-black uppercase text-gray-400 italic">Categoria</label>
                            <select 
                              value={newProduct.category} 
                              onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                              className="p-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#FF5A00] font-bold text-sm uppercase italic"
                            >
                               {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                            </select>
                         </div>
                         <div className="space-y-1.5 flex flex-col">
                            <label className="text-[10px] font-black uppercase text-gray-400 italic">Subcategoria</label>
                            <select 
                              value={newProduct.subcategory} 
                              onChange={e => setNewProduct({...newProduct, subcategory: e.target.value})}
                              className="p-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#FF5A00] font-bold text-sm uppercase italic"
                            >
                               <option value="">Selecione...</option>
                               {categories.find(c => c.name === newProduct.category)?.subcategories?.map(s => (
                                 <option key={s} value={s}>{s}</option>
                               ))}
                            </select>
                         </div>
                         <Field label="Estoque Inicial" type="number" value={newProduct.stock} onChange={v => setNewProduct({...newProduct, stock: parseInt(v)})} />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="relative">
                            <Field label="Preço de Venda (R$)" type="number" value={newProduct.price} onChange={v => setNewProduct({...newProduct, price: parseFloat(v)})} />
                            {newProduct.originalPrice && newProduct.originalPrice > (newProduct.price || 0) && (
                              <span className="absolute -top-1 right-0 bg-green-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                                {Math.round(((newProduct.originalPrice - (newProduct.price || 0)) / newProduct.originalPrice) * 100)}% DESCONTO
                              </span>
                            )}
                         </div>
                         <Field label="Preço Antigo (R$)" type="number" value={newProduct.originalPrice} onChange={v => setNewProduct({...newProduct, originalPrice: parseFloat(v)})} placeholder="P/ Riscado" />
                      </div>

                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black uppercase text-gray-400 italic">Descrição Técnica</label>
                         <textarea 
                           className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#FF5A00] font-bold text-xs h-32 italic leading-relaxed"
                           placeholder="Descreva as principais qualidades..."
                           value={newProduct.description}
                           onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                         />
                      </div>
                    </div>
                  </div>

                  {/* Media & Specs */}
                  <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase italic tracking-[3px] text-[#FF5A00] border-b border-orange-100 pb-2">Mídia e Atributos</h3>
                    
                    <div className="space-y-4">
                       <Field label="Imagens (Um link por linha)" isTextarea value={newProduct.images?.join('\n')} onChange={v => setNewProduct({...newProduct, images: v.split('\n').filter(l => l.trim())})} />
                       <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 italic">Ou subir do computador:</label>
                          <input type="file" multiple onChange={(e) => handleFileUpload(e, 'images')} className="text-[10px] italic" />
                       </div>
                       <Field label="URL do Vídeo (YouTube/Vimeo)" value={newProduct.videoUrl} onChange={v => setNewProduct({...newProduct, videoUrl: v})} placeholder="https://..." icon={Video} />
                       <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 italic">Ou subir vídeo:</label>
                          <input type="file" onChange={(e) => handleFileUpload(e, 'video')} className="text-[10px] italic" />
                       </div>
                       
                       <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200">
                          <label className="text-[10px] font-black uppercase text-[#0D1B2A] italic mb-4 block underline decoration-[#FF5A00] underline-offset-4">FICHA TÉCNICA AVANÇADA</label>
                          
                          {/* Quick Presets */}
                          <div className="mb-4">
                            <label className="text-[9px] font-bold text-gray-400 uppercase mb-2 block">Sugestões de Atributos:</label>
                            <div className="flex flex-wrap gap-2">
                               {['Potência (HP)', 'Cilindrada', 'Peso (kg)', 'Tanque (L)', 'Garantia', 'Voltagem'].map(s => (
                                 <button key={s} type="button" onClick={() => setTempSpecKey(s)} className="text-[9px] font-black px-2 py-1 bg-gray-200 rounded hover:bg-[#FF5A00] hover:text-white transition-colors uppercase italic">{s}</button>
                               ))}
                            </div>
                          </div>

                          <div className="flex gap-2 mb-4">
                             <input value={tempSpecKey} onChange={e => setTempSpecKey(e.target.value)} placeholder="Ex: Rotação Máxima" className="flex-1 p-3 bg-white border border-gray-200 rounded-xl text-xs uppercase font-black italic shadow-inner" />
                             <input value={tempSpecValue} onChange={e => setTempSpecValue(e.target.value)} placeholder="Ex: 12.000 RPM" className="flex-1 p-3 bg-white border border-gray-200 rounded-xl text-xs font-bold italic shadow-inner" />
                             <button type="button" onClick={handleAddSpec} className="px-4 bg-[#FF5A00] text-white rounded-xl shadow-lg shadow-orange-100"><Plus size={20} /></button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                             {Object.entries(newProduct.specs || {}).map(([k, v]) => (
                               <div key={k} className="bg-white border border-gray-100 p-3 rounded-xl flex items-center justify-between group shadow-sm">
                                  <div className="flex flex-col">
                                     <span className="text-[9px] font-black uppercase text-[#FF5A00] italic">{k}</span>
                                     <span className="text-[11px] font-bold italic text-gray-700">{v}</span>
                                  </div>
                                  <button type="button" onClick={() => removeSpec(k)} className="text-gray-300 hover:text-red-500 transition-colors"><X size={14} /></button>
                                </div>
                             ))}
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <Toggle label="Frete Grátis" active={!!newProduct.hasFreeShipping} onToggle={() => setNewProduct({...newProduct, hasFreeShipping: !newProduct.hasFreeShipping})} icon={Truck} />
                          <Toggle label="Entrega Rápida" active={!!newProduct.hasFastDelivery} onToggle={() => setNewProduct({...newProduct, hasFastDelivery: !newProduct.hasFastDelivery})} icon={Zap} />
                          <Toggle label="Oferta do Dia" active={!!newProduct.isOfferOfDay} onToggle={() => setNewProduct({...newProduct, isOfferOfDay: !newProduct.isOfferOfDay})} icon={Clock} />
                          <Toggle label="Destaque" active={!!newProduct.isFeatured} onToggle={() => setNewProduct({...newProduct, isFeatured: !newProduct.isFeatured})} icon={Star} />
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-4 shrink-0">
               <button onClick={() => setShowAddProductModal(false)} className="flex-1 bg-white border-2 border-gray-200 py-3 rounded-xl font-black uppercase italic tracking-widest hover:bg-gray-100 transition-all">Cancelar</button>
               <button onClick={handleSaveProduct} className="flex-1 bg-[#FF5A00] text-white py-3 rounded-xl font-black uppercase italic tracking-widest hover:bg-[#E65100] transition-all shadow-xl shadow-orange-100">
                 {editingProduct ? 'Confirmar Atualização' : 'Finalizar Cadastro'}
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0D1B2A]/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6 italic">
            <h2 className="text-xl font-black text-[#0D1B2A] uppercase italic tracking-tighter">
              {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
            </h2>
            <div className="space-y-4">
              <Field label="Nome da Categoria (Exibição)" value={newCategory.name} onChange={(v: string) => setNewCategory({...newCategory, name: v})} placeholder="Ex: Roçadeiras" />
              <Field label="Ícone (Lucide Icon Name)" value={newCategory.icon} onChange={(v: string) => setNewCategory({...newCategory, icon: v})} placeholder="Ex: Scissors, Settings, Box" />
            </div>
            <div className="flex gap-4 pt-4">
              <button onClick={() => setShowCategoryModal(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-black uppercase text-[11px] italic tracking-widest">Cancelar</button>
              <button onClick={handleSaveCategory} className="flex-1 py-3 bg-[#FF5A00] text-white rounded-xl font-black uppercase text-[11px] italic tracking-widest shadow-lg">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, isCurrency, icon: Icon, color }: any) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-lg transition-all duration-300">
    <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:rotate-6 transition-transform`}>
      <Icon size={32} strokeWidth={2.5} />
    </div>
    <div>
      <p className="text-gray-400 text-[10px] font-black uppercase tracking-[3px] mb-1 italic">{title}</p>
      <p className="text-3xl font-black text-[#0D1B2A] tracking-tighter italic">
        {isCurrency ? formatCurrency(value) : value.toLocaleString('pt-BR')}
      </p>
    </div>
  </div>
);

const Field = ({ label, value, onChange, type = "text", placeholder, isTextarea, icon: Icon }: any) => (
  <div className="space-y-1.5 flex flex-col">
    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 italic">{label}</label>
    <div className="relative italic">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />}
      {isTextarea ? (
        <textarea 
          className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#FF5A00] font-bold text-xs h-24 italic leading-relaxed"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input 
          type={type} 
          className={`w-full ${Icon ? 'pl-12' : 'px-4'} py-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#FF5A00] font-bold text-sm italic`}
          value={value === undefined ? '' : value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  </div>
);

const Toggle = ({ label, active, onToggle, icon: Icon }: any) => (
  <button 
    onClick={onToggle}
    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${active ? 'bg-orange-50 border-[#FF5A00] text-[#FF5A00]' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
  >
    <Icon size={18} />
    <span className="text-[10px] font-black uppercase italic tracking-tight">{label}</span>
  </button>
);
