import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Truck, Zap } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../lib/utils';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  showTodayOnlyBadge?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, onClick, showTodayOnlyBadge }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const priceParts = product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }).split(',');

  return (
    <div 
      className="bg-white border-2 border-transparent hover:border-gray-200 rounded-xl p-3 transition-all group flex flex-col h-full cursor-pointer relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Wishlist Button */}
      <button className={`absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-md text-gray-400 hover:text-red-500 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <Heart size={18} />
      </button>

      {/* Image Area */}
      <div className="relative aspect-[4/3] mb-2 flex items-center justify-center p-2">
        <img 
          src={product.images[0]} 
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-0 left-0 z-10 flex flex-col gap-1">
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="bg-[#FF5A00] text-white text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter w-fit italic">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
          
          {product.hasFreeShipping && (
            <div className="flex items-center gap-1 bg-[#16A34A] text-white px-2 py-0.5 rounded-sm w-fit italic">
              <Truck size={10} />
              <span className="text-[9px] font-black uppercase tracking-tight">Frete Grátis</span>
            </div>
          )}

          {product.hasFastDelivery && (
            <div className="flex items-center gap-1 bg-[#007BFF] text-white px-2 py-0.5 rounded-sm w-fit italic">
              <Zap size={10} />
              <span className="text-[9px] font-black uppercase tracking-tight">Entrega Rápida</span>
            </div>
          )}

          {showTodayOnlyBadge && (
            <div className="bg-red-600 text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter w-fit rounded-sm italic">
              RECEBA EM 48H
            </div>
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        <div className="flex text-[#FFD700]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={11} fill={i < 4 ? "currentColor" : "none"} strokeWidth={2.5} />
          ))}
        </div>
        <span className="text-[10px] text-gray-400 font-bold uppercase">(15)</span>
      </div>

      {/* Title */}
      <h3 className="text-[11px] text-[#222] font-poppins font-normal line-clamp-2 mb-2 leading-snug h-8 tracking-tight">
        {product.name}
      </h3>

        {/* Price Section */}
        <div className="mt-auto">
          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-[10px] text-gray-400 line-through font-bold mb-0.5">
              DE: {formatCurrency(product.originalPrice)}
            </p>
          )}
          
          <div className="flex items-baseline gap-0.5 leading-none mb-0.5">
            <span className="text-[#FF5A00] font-black text-[11px]">R$</span>
            <span className="text-[#222] text-[18px] font-black tracking-tighter leading-none">
              {priceParts[0]}
            </span>
            <span className="text-[#222] text-sm font-black tracking-tighter leading-none">
              ,{priceParts[1]}
            </span>
          </div>

          <p className="text-[10px] text-[#16A34A] font-black uppercase mb-0.5 italic">
            à vista no Pix ou Boleto
          </p>

          <p className="text-[10px] text-gray-500 font-semibold mb-1 italic">
            ou 10x de{' '}
            <span className="font-black text-gray-700">
              {formatCurrency(product.price / 10)}
            </span>{' '}
            sem juros no cartão
          </p>

          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="w-full mt-2 border-2 border-[#28A745] text-[#28A745] py-1.5 rounded-lg font-black text-[9px] uppercase tracking-tighter hover:bg-[#28A745] hover:text-white transition-all"
          >
            Adicionar ao carrinho
          </button>
        </div>
    </div>
  );
});