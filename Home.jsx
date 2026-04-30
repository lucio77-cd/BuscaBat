import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [busca, setBusca] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col overflow-x-hidden">
      
      {/* NAVBAR: No celular as margens diminuem */}
      <nav className="flex justify-between items-center px-4 md:px-12 py-6">
        <div className="text-xl md:text-2xl font-bold">
          BUSCA<span className="text-[#FF4500]">BAT</span>
        </div>
        <div className="flex gap-4 md:gap-8 items-center text-xs md:text-sm text-gray-400">
          <a href="#contato" className="hidden sm:block hover:text-white">Contato</a>
          <button 
            onClick={() => navigate('/login')} 
            className="border border-[#FF4500] text-[#FF4500] px-4 py-1.5 rounded-full hover:bg-[#FF4500] hover:text-white transition"
          >
            Entrar
          </button>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        
        {/* Raio com brilho adaptável */}
        <div className="mb-6 md:mb-10 animate-pulse">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-[#FF4500]/20 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,69,0,0.4)]">
            <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-14 md:h-14 text-[#FF4500] fill-current">
              <path d="M13 10V3L4 14H11V21L20 10H13Z" />
            </svg>
          </div>
        </div>

        {/* Título: Tamanho da fonte muda no mobile (text-2xl) vs desktop (text-5xl) */}
        <h1 className="text-2xl md:text-5xl font-bold mb-8 leading-tight">
          Encontre a bateria certa.<br className="md:hidden" /> 
          <span className="text-[#FF4500]"> Vapt-Vupt.</span>
        </h1>

        {/* BARRA DE BUSCA: No mobile o botão pode ir para baixo ou encolher */}
        <form className="w-full max-w-2xl">
          <div className="flex flex-col md:flex-row gap-2 bg-[#1a1a1a] p-2 rounded-2xl border border-gray-800 shadow-2xl">
            <input 
              type="text" 
              placeholder="Ex: Heliar 60Ah, Bateria Titan 160..."
              className="flex-1 bg-transparent py-3 px-4 outline-none text-gray-200 placeholder:text-gray-600 text-sm md:text-base"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-[#991b1b] hover:bg-[#7f1d1d] text-white font-bold py-3 md:py-2 px-8 rounded-xl transition-all"
            >
              BUSCAR
            </button>
          </div>
        </form>

        {/* CATEGORIAS: No celular ficam mais próximas */}
        <div className="flex justify-center gap-8 md:gap-16 mt-12 md:mt-16">
          {['Carros', 'Motos', 'Caminhões'].map((cat) => (
            <div key={cat} className="flex flex-col items-center group cursor-pointer">
              <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-[#1a1a1a] group-hover:bg-[#FF4500]/10 border border-gray-800 group-hover:border-[#FF4500] transition">
                 {/* Ícones genéricos aqui */}
                 <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-600 group-hover:bg-[#FF4500]"></div>
              </div>
              <span className="text-[10px] md:text-xs text-gray-500 mt-3 uppercase tracking-widest">{cat}</span>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Simples para Mobile */}
      <footer className="py-6 text-center text-[10px] text-gray-700 uppercase tracking-tighter">
        © 2026 BuscaBat - Treze Tílias - SC
      </footer>
    </div>
  );
};

export default Home;

