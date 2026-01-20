
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import RecipeBuilder from './pages/Dashboard';

const SiteFooter: React.FC = () => (
  <footer className="bg-slate-900 text-white py-24 mt-40 relative overflow-hidden">
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-blue-500 to-purple-500" />
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-20 relative z-10">
      <div className="col-span-1 md:col-span-2 space-y-8">
        <h2 className="text-4xl font-black tracking-tighter">Resep<span className="text-primary-500">Makanan</span></h2>
        <p className="text-slate-400 text-lg leading-relaxed max-w-sm font-medium">Platform informasi kuliner nomor satu untuk pecinta masak di seluruh dunia. Masak jadi lebih mudah, presisi, dan menyenangkan.</p>
        <div className="flex gap-4">
          {['FB', 'IG', 'TW', 'YT'].map(s => (
            <div key={s} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-primary-500 transition-all cursor-pointer text-xs font-black shadow-xl">
              {s}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-8">
        <h3 className="font-black text-sm uppercase tracking-[0.3em] text-primary-400">Navigasi</h3>
        <ul className="space-y-5 text-slate-400 font-bold">
          <li className="hover:text-primary-400 cursor-pointer transition-colors">Semua Koleksi</li>
          <li className="hover:text-primary-400 cursor-pointer transition-colors">Kitchen Builder</li>
          <li className="hover:text-primary-400 cursor-pointer transition-colors">Tips & Trik</li>
          <li className="hover:text-primary-400 cursor-pointer transition-colors">Kebijakan Privasi</li>
        </ul>
      </div>
      <div className="space-y-8">
        <h3 className="font-black text-sm uppercase tracking-[0.3em] text-primary-400">Masakan Dunia</h3>
        <ul className="space-y-5 text-slate-400 font-bold">
          <li className="hover:text-primary-400 cursor-pointer transition-colors">Indonesia</li>
          <li className="hover:text-primary-400 cursor-pointer transition-colors">Asia Explorer</li>
          <li className="hover:text-primary-400 cursor-pointer transition-colors">Eropa Klasik</li>
          <li className="hover:text-primary-400 cursor-pointer transition-colors">Sehat & Vegan</li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto px-4 mt-24 pt-10 border-t border-white/5 text-center text-slate-500 font-bold text-xs uppercase tracking-widest">
      <p>&copy; 2024 ResepMakananLengkap.com • Didesain dengan penuh cita rasa</p>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'id' | 'en'>('id');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleLanguage = () => setLanguage(prev => (prev === 'id' ? 'en' : 'id'));

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-500">
        <Header 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
          language={language}
          toggleLanguage={toggleLanguage}
        />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/builder" element={<RecipeBuilder />} />
            <Route path="/dashboard" element={<RecipeBuilder />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Chatbot />
        <SiteFooter />
      </div>
    </Router>
  );
};

export default App;
