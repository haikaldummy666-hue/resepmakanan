
import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ChefHat, Moon, Sun, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  language: 'id' | 'en';
  toggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary-500 p-2.5 rounded-2xl text-white shadow-lg shadow-primary-500/20">
            <ChefHat className="w-6 h-6" />
          </div>
          <span className={`font-black text-2xl hidden sm:block tracking-tighter ${isScrolled || isDarkMode ? 'text-slate-900 dark:text-white' : 'text-slate-800'}`}>
            Resep<span className="text-primary-500">Makanan</span>
          </span>
        </Link>

        {/* Global Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <input
            type="text"
            placeholder={language === 'id' ? "Cari resep hari ini..." : "Search recipes..."}
            className="w-full bg-slate-100 dark:bg-slate-800/80 rounded-full py-3 px-12 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-bold text-sm shadow-inner"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-3 text-slate-400 w-5 h-5" />
        </form>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className="hover:text-primary-500 font-black text-xs uppercase tracking-widest transition-colors">Home</Link>
          <Link to="/recipes" className="hover:text-primary-500 font-black text-xs uppercase tracking-widest transition-colors">Resep</Link>
          <Link to="/builder" className="hover:text-primary-500 font-black text-xs uppercase tracking-widest transition-colors">Kitchen Builder</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={toggleLanguage} className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
            <Globe className="w-5 h-5" />
          </button>
          <button onClick={toggleDarkMode} className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-2xl py-8 px-6 animate-in fade-in slide-in-from-top-4 duration-500 border-t border-slate-100 dark:border-slate-800">
          <form onSubmit={handleSearch} className="mb-8 relative">
            <input
              type="text"
              placeholder="Cari resep..."
              className="w-full bg-slate-100 dark:bg-slate-800 rounded-2xl py-4 px-12 focus:outline-none font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-4 text-slate-400" />
          </form>
          <nav className="flex flex-col gap-6">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-sm font-black uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-4">Beranda</Link>
            <Link to="/recipes" onClick={() => setIsMenuOpen(false)} className="text-sm font-black uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-4">Daftar Resep</Link>
            <Link to="/builder" onClick={() => setIsMenuOpen(false)} className="text-sm font-black uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-4">Kitchen Builder</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
