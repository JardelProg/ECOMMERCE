import React, { useState, useMemo } from 'react';
import { 
  ChevronRight, Star, Package, 
  LayoutGrid, List, Search 
} from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES } from '../constants';
import { ProductCard } from './ProductCard';

interface CategoryPageProps {
  category: typeof CATEGORIES[0];
  subcategory: string | null;
  products: Product[];
  onProductClick: (product: Product) => void;
  onNavigateHome: () => void;
  onNavigateCategory: (categoryId: string, subcategory?: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  subcategory: initialSubcategory,
  products,
  onProductClick,
  onNavigateHome,
  onNavigateCategory,
}) => {
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(initialSubcategory);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [gridView, setGridView] = useState<'grid' | 'list'>('grid');

  // Sync subcategory when prop changes
  React.useEffect(() => {
    setActiveSubcategory(initialSubcategory);
  }, [initialSubcategory]);

  // Reset brand filter when subcategory changes
  React.useEffect(() => {
    setSelectedBrand(null);
  }, [activeSubcategory]);

  // Strict case-insensitive match — no includes() to avoid cross-contamination
  // e.g. "Parafusadeiras" must NOT match products with subcategory "Furadeiras"
  const subcategoryMatches = (productSubcategory: string | undefined, selected: string): boolean => {
    if (!productSubcategory) return false;
    return productSubcategory.toLowerCase().trim() === selected.toLowerCase().trim();
  };

  // Extract unique brands from category products
  const brands = useMemo(() => {
    const brandCount: Record<string, number> = {};
    
    // Filter by subcategory first — same logic as filteredProducts
    let productsInSub = products.filter(p => p != null);
    if (activeSubcategory) {
      productsInSub = productsInSub.filter(p => subcategoryMatches(p.subcategory, activeSubcategory));
    }

    productsInSub.forEach(p => {
      const brand = p.specs?.Marca || p.name.split(' ').slice(-1)[0];
      if (brand) {
        brandCount[brand] = (brandCount[brand] || 0) + 1;
      }
    });
    return Object.entries(brandCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [products, activeSubcategory]);

  // Filter products — strictly by subcategory to prevent cross-contamination
  const filteredProducts = useMemo(() => {
    // Defensive: remove any undefined/null entries
    let result = products.filter((p): p is Product => p != null);
    
    // Strict subcategory filter (case-insensitive exact match)
    if (activeSubcategory) {
      result = result.filter(p => subcategoryMatches(p.subcategory, activeSubcategory));
    }
    
    // Filter by brand
    if (selectedBrand) {
      result = result.filter(p => {
        const brand = p.specs?.Marca || '';
        return brand.toLowerCase().includes(selectedBrand.toLowerCase());
      });
    }
    
    // Sorting
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    
    return result;
  }, [products, activeSubcategory, selectedBrand, sortBy]);

  return (
    <div className="bg-[#eeeeee] min-h-screen">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-[11px] text-gray-500 font-medium py-4">
          <span onClick={onNavigateHome} className="cursor-pointer hover:underline">Home</span>
          <ChevronRight size={10} />
          <span className="cursor-pointer hover:underline" onClick={() => onNavigateCategory(category.id)}>{category.name}</span>
          {activeSubcategory && (
            <>
              <ChevronRight size={10} />
              <span className="text-gray-400">{activeSubcategory}</span>
            </>
          )}
        </nav>

        <h1 className="text-[22px] font-black uppercase text-[#222] tracking-tight mb-4">{category.name}</h1>

        {/* BRANDS PILLS */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-black uppercase text-gray-500">Marcas:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {brands.map(brand => (
              <button
                key={brand.name}
                onClick={() => setSelectedBrand(brand.name === selectedBrand ? null : brand.name)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                  selectedBrand === brand.name 
                    ? 'bg-[#FF5A00] text-white border-[#FF5A00]' 
                    : 'bg-white text-[#222] border-gray-200 hover:border-[#FF5A00] hover:text-[#FF5A00]'
                }`}
              >
                {brand.name} ({brand.count})
              </button>
            ))}
          </div>
        </div>

        {/* SUBCATEGORIES */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="mb-6">
            <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2">
              {category.subcategories.map(sub => (
                <button
                  key={sub}
                  onClick={() => setActiveSubcategory(sub === activeSubcategory ? null : sub)}
                  className={`bg-white rounded-xl px-4 py-3 min-w-[140px] border shrink-0 text-center transition-all ${
                    sub === activeSubcategory 
                      ? 'border-[#FF5A00] shadow-sm' 
                      : 'border-white hover:border-gray-200'
                  }`}
                >
                  <p className={`text-[12px] font-bold ${sub === activeSubcategory ? 'text-[#FF5A00]' : 'text-[#222]'}`}>
                    {sub}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SORT BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <p className="text-[12px] text-gray-500">{filteredProducts.length} produtos encontrados</p>
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-bold text-gray-600">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-[12px] border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-[#FF5A00] font-bold"
            >
              <option value="relevance">+ Vendidos</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="rating">Melhor Avaliados</option>
            </select>
            <div className="flex gap-1">
              <button 
                onClick={() => setGridView('grid')} 
                className={`p-2 rounded ${gridView === 'grid' ? 'bg-[#FF5A00] text-white' : 'bg-white text-gray-400 border border-gray-200'}`}
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                onClick={() => setGridView('list')} 
                className={`p-2 rounded ${gridView === 'list' ? 'bg-[#FF5A00] text-white' : 'bg-white text-gray-400 border border-gray-200'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* PRODUCT GRID/LIST */}
        {filteredProducts.length > 0 ? (
          gridView === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={() => onProductClick(product)} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3 mb-12">
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  onClick={() => onProductClick(product)}
                  className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 cursor-pointer hover:shadow-md transition-all group"
                >
                  <div className="w-32 h-32 shrink-0 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                    <img 
                      src={product.images?.[0]} 
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" 
                      alt={product.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-[14px] font-medium text-[#222] leading-tight mb-1 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4,5].map(i => (
                          <Star 
                            key={i} 
                            size={11} 
                            fill={i <= Math.round(product.rating) ? '#FBBF24' : 'none'} 
                            stroke="#FBBF24" 
                          />
                        ))}
                        <span className="text-[11px] text-gray-400 ml-1">({product.reviewCount})</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[#FF5A00] font-black text-[11px]">R$</span>
                        <span className="text-[22px] font-black text-[#222] tracking-tighter">{Math.floor(product.price).toLocaleString('pt-BR')}</span>
                        <span className="text-[14px] font-black text-[#222]">,{(product.price % 1).toFixed(2).split('.')[1]}</span>
                      </div>
                      {product.hasFreeShipping && (
                        <span className="text-[11px] font-bold text-[#16A34A]">✓ Frete Grátis</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button className="bg-[#16A34A] hover:bg-[#149141] text-white px-4 py-2 rounded-lg font-bold text-[12px] uppercase transition-all whitespace-nowrap">
                      Adicionar ao carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 mb-12">
            <Package size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-[16px] font-bold text-gray-400">Nenhum produto encontrado nesta categoria</p>
            <p className="text-[13px] text-gray-300 mt-1">Tente selecionar outra marca ou subcategoria</p>
          </div>
        )}
      </div>
    </div>
  );
};