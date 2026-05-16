import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../lib/utils';

interface PromotionPopupProps {
  onProductClick: (product: Product) => void;
  products: Product[];
}

export const PromotionPopup: React.FC<PromotionPopupProps> = ({ onProductClick, products }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [canShowNext, setCanShowNext] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!canShowNext || products.length === 0) return;
    const show = setTimeout(() => {
      const allowedProducts = products.filter(p => !['prod10', 'prod11', 'prod16', 'prod21'].includes(p.id));
      const p = allowedProducts[Math.floor(Math.random() * allowedProducts.length)];
      setCurrentProduct(p);
      setProgress(100);
      setIsVisible(true);
      const hide = setTimeout(() => handleClose(), 30000);
      return () => clearTimeout(hide);
    }, 5000);
    return () => clearTimeout(show);
  }, [canShowNext]);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p <= 0) { handleClose(); return 0; }
        return p - (100 / 300);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setCanShowNext(false);
    setTimeout(() => setCanShowNext(true), 60000);
  };

  if (!currentProduct) return null;

  const priceParts = currentProduct.price
    .toLocaleString('pt-BR', { minimumFractionDigits: 2 })
    .split(',');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 120, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 120, scale: 0.95 }}
          transition={{ type: 'spring', damping: 22, stiffness: 200 }}
          className="fixed bottom-6 right-6 z-[200] w-[300px] bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,90,0,0.1)' }}
        >
          {/* Progress bar */}
          <div className="h-[3px] bg-gray-100">
            <div
              className="h-full bg-[#FF5A00] transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Header */}
          <div className="bg-[#0D1B2A] px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#FF5A00] rounded flex items-center justify-center">
                <Zap size={11} fill="white" className="text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                Oferta Relâmpago
              </span>
            </div>
            <button
              onClick={handleClose}
              className="text-white/40 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="flex gap-3 mb-4">
              <div className="w-20 h-20 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center shrink-0 p-2">
                <img
                  src={currentProduct.images[0]}
                  alt={currentProduct.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <h4 className="text-[11px] font-bold text-[#222] line-clamp-2 leading-tight mb-1.5">
                  {currentProduct.name}
                </h4>
                <p className="text-[9px] text-gray-400 line-through font-bold">
                  DE: {formatCurrency(currentProduct.price * 1.25)}
                </p>
                <div className="flex items-baseline gap-0.5 leading-none">
                  <span className="text-[#FF5A00] text-[10px] font-black">R$</span>
                  <span className="text-[#222] text-xl font-black tracking-tighter">
                    {priceParts[0]}
                  </span>
                  <span className="text-[#222] text-xs font-black">,{priceParts[1]}</span>
                </div>
                <p className="text-[9px] text-[#16A34A] font-bold mt-0.5">
                  à vista no Pix ou Boleto
                </p>
              </div>
            </div>

            <button
              onClick={() => { onProductClick(currentProduct); handleClose(); }}
              className="w-full bg-[#FF5A00] hover:bg-[#E65100] text-white py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart size={13} />
              Ver oferta
            </button>

            <p className="text-center text-[8px] text-gray-400 font-bold uppercase tracking-wider mt-2">
              Estoque limitado para sua região
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};