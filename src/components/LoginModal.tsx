import React, { useState } from 'react';
import { X, Lock, Mail, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onAdminLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onAdminLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'smbmaquinas-admin@gmail.com' && password === 'SMBmaquinas2026!') {
      onAdminLogin();
    } else {
      setError('Email ou senha incorretos');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#0D1B2A] transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-100">
              <Lock className="text-[#FF5A00]" size={32} />
            </div>
            <h2 className="text-2xl font-black text-[#0D1B2A] uppercase italic tracking-tighter">Entrar na conta</h2>
            <p className="text-gray-500 text-sm mt-1">Acesse sua conta ou painel administrativo</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-[#0D1B2A] uppercase mb-1.5 ml-1 italic">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-100 focus:border-[#FF5A00] outline-none transition-all text-sm font-medium"
                  placeholder="exemplo@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-[#0D1B2A] uppercase mb-1.5 ml-1 italic">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-100 focus:border-[#FF5A00] outline-none transition-all text-sm font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg text-xs font-bold border border-red-100 animate-shake">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-[#FF5A00] text-white py-4 rounded-xl font-black uppercase italic tracking-widest hover:bg-[#E65100] transition-all shadow-lg hover:shadow-orange-200"
            >
              Entrar
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6 font-medium">
            Esqueceu sua senha? <button className="text-[#FF5A00] font-bold underline">Recuperar</button>
          </p>
        </div>
      </div>
    </div>
  );
};
