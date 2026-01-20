
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Sparkles, Utensils, Award } from 'lucide-react';
import { MOCK_RECIPES, CATEGORIES } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';
import RecipeImage from '../components/RecipeImage';

const Home: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const featuredRecipes = MOCK_RECIPES.filter(r => r.isPopular).slice(0, 5);
  const indonesianRecipes = MOCK_RECIPES.filter(r => r.cuisine === 'Indonesia').slice(0, 6);

  useEffect(() => {
    if (featuredRecipes.length === 0) return;
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % featuredRecipes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredRecipes.length]);

  return (
    <div className="pt-20 pb-16 bg-white dark:bg-slate-900">
      {/* Hero Carousel */}
      <section className="relative h-[600px] sm:h-[750px] overflow-hidden">
        {featuredRecipes.map((recipe, idx) => (
          <div 
            key={recipe.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10" />
            <RecipeImage 
              src={recipe.thumbnail} 
              alt={recipe.title}
              className="w-full h-full"
            />
            <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-end pb-24 sm:pb-32">
              <div className="max-w-3xl animate-in slide-in-from-bottom-20 duration-1000">
                <div className="flex items-center gap-2 mb-6">
                   <div className="h-[2px] w-12 bg-primary-500" />
                   <span className="text-primary-500 text-xs font-black uppercase tracking-[0.3em]">Resep Terpopuler</span>
                </div>
                <h1 className="text-5xl sm:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
                  {recipe.title}
                </h1>
                <p className="text-slate-200 text-xl mb-12 line-clamp-2 max-w-xl font-medium leading-relaxed">
                  {recipe.description}
                </p>
                <div className="flex flex-wrap gap-5">
                  <Link 
                    to={`/recipe/${recipe.id}`}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-black py-5 px-12 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-2xl text-lg"
                  >
                    Masak Sekarang
                  </Link>
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white border border-white/30 font-black py-5 px-12 rounded-full transition-all text-lg">
                    Simpan Nanti
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {featuredRecipes.map((_, i) => (
            <button 
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-1.5 transition-all duration-500 rounded-full ${i === activeSlide ? 'w-12 bg-primary-500' : 'w-4 bg-white/30'}`}
            />
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <section className="container mx-auto px-4 mt-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-4 flex items-center justify-center gap-3">
            <Utensils className="text-primary-500 w-10 h-10" /> Pilih Menu Favorit
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Berbagai kategori masakan yang dirancang khusus untuk memenuhi selera makan Anda hari ini.</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
          {CATEGORIES.map(cat => (
            <Link 
              key={cat.id}
              to={`/recipes?category=${cat.id}`}
              className="group bg-slate-50 dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center transition-all hover:bg-white dark:hover:bg-slate-700 hover:shadow-2xl hover:-translate-y-3"
            >
              <span className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-500 drop-shadow-md">{cat.icon}</span>
              <span className="font-black text-xs uppercase tracking-widest text-slate-400 group-hover:text-primary-500 transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Local Cuisine Section - PRIORITAS INDONESIA */}
      <section className="bg-slate-900 py-32 mt-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[150px] -mr-64 -mt-64" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                 <Award className="text-primary-400 w-6 h-6" />
                 <span className="text-primary-400 text-xs font-black uppercase tracking-[0.3em]">Warisan Budaya</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black mb-4">Cita Rasa Nusantara</h2>
              <p className="text-slate-400 text-xl max-w-xl">Nikmati koleksi resep terbaik dari berbagai penjuru Indonesia, dirancang agar mudah diikuti oleh siapa saja.</p>
            </div>
            <Link to="/recipes?search=indonesia" className="bg-white text-slate-900 font-black py-4 px-10 rounded-full hover:bg-primary-500 hover:text-white transition-all shadow-2xl">
              Lihat Semua Resep Indonesia
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {indonesianRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} viewMode="grid" />
            ))}
          </div>
        </div>
      </section>

      {/* Global Explorer */}
      <section className="container mx-auto px-4 mt-32">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl font-black flex items-center gap-3">
            <TrendingUp className="text-primary-500 w-10 h-10" /> Pilihan Dunia
          </h2>
          <Link to="/recipes" className="text-primary-500 font-black text-sm uppercase tracking-widest hover:underline">Jelajahi Semua &rarr;</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MOCK_RECIPES.filter(r => r.cuisine !== 'Indonesia').slice(0, 6).map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} viewMode="grid" />
          ))}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="container mx-auto px-4 mt-40">
        <div className="bg-primary-500 rounded-[4rem] p-12 sm:p-24 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-16 shadow-[0_50px_100px_-20px_rgba(20,184,166,0.5)]">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
          
          <div className="relative z-10 max-w-2xl text-white">
            <h2 className="text-5xl sm:text-7xl font-black mb-8 leading-[0.9]">Dapatkan Inspirasi Masak Tiap Minggu</h2>
            <p className="text-primary-100 text-xl mb-12 font-medium">Bergabunglah dengan 50,000+ pecinta kuliner lainnya dan terima resep eksklusif langsung di inbox Anda.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg">
              <input 
                type="email" 
                placeholder="Email aktif anda..."
                className="flex-1 bg-white/20 border border-white/30 rounded-full py-5 px-8 text-white placeholder:text-white/60 focus:outline-none focus:bg-white focus:text-slate-900 transition-all text-lg"
              />
              <button className="bg-white text-primary-600 font-black py-5 px-10 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all text-lg whitespace-nowrap">
                Daftar Gratis
              </button>
            </form>
          </div>
          
          <div className="hidden lg:block relative z-10">
            <div className="w-80 h-80 bg-white/10 backdrop-blur-2xl rounded-[3rem] p-10 rotate-12 flex flex-col items-center justify-center border border-white/20 shadow-2xl">
               <div className="w-24 h-24 bg-white rounded-full mb-6 flex items-center justify-center text-primary-500 shadow-inner">
                  <Utensils className="w-12 h-12" />
               </div>
               <span className="text-white font-black text-4xl mb-2">50+</span>
               <span className="text-primary-100 font-bold uppercase tracking-widest text-xs">Resep Terpilih</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
