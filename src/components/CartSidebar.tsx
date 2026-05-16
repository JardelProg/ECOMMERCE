import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { formatCurrency } from '../lib/utils';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[70]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-white z-[80] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-[#FF5A00] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} />
                <span className="font-bold text-lg uppercase tracking-tight">Meu Carrinho</span>
              </div>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p className="font-medium text-lg">Seu carrinho está vazio</p>
                  <button 
                    onClick={onClose}
                    className="text-[#FF5A00] font-bold underline uppercase text-sm"
                  >
                    Começar a comprar
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                    <div className="w-20 h-20 bg-gray-50 rounded p-1">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-bold text-gray-800 line-clamp-1 mb-1">{item.name}</h4>
                      <p className="text-[#FF5A00] font-black text-lg">{formatCurrency(item.price)}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 rounded">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 p-1 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500 font-medium">Subtotal:</span>
                  <span className="text-2xl font-black text-gray-900">{formatCurrency(totalPrice)}</span>
                </div>
                <button className="w-full bg-[#FF5A00] hover:bg-[#E65100] text-white py-4 rounded-lg font-black uppercase text-lg tracking-tighter shadow-lg shadow-orange-200 transition-all active:scale-95">
                  Finalizar Compra
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};