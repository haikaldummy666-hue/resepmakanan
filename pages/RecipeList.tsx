
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_RECIPES, CATEGORIES } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import { Search, Filter, LayoutGrid, List as ListIcon, SlidersHorizontal, Utensils } from 'lucide-react';

const RecipeList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  
  const currentCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  const filteredRecipes = useMemo(() => {
    return MOCK_RECIPES.filter(recipe => {
      const matchesCategory = currentCategory === 'all' || recipe.category === currentCategory;
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            recipe.ingredients.some(i => i.item.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.reviews - a.reviews;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'alphabet') return a.title.localeCompare(b.title);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [currentCategory, searchQuery, sortBy]);

  return (
    <div className="pt-28 pb-32 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Page Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16 border-b border-slate-200 dark:border-slate-800 pb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <Utensils className="text-primary-500 w-5 h-5" />
               <span className="text-primary-500 font-black text-[10px] uppercase tracking-[0.3em]">Library Resep</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter mb-4">Koleksi <span className="text-primary-500">Global</span></h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Menampilkan {filteredRecipes.length} resep masakan dari seluruh dunia.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white dark:bg-slate-800 p-2 rounded-3xl border border-slate-100 dark:border-slate-700 flex shadow-sm">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-2xl transition-all ${viewMode === 'grid' ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-2xl transition-all ${viewMode === 'list' ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <ListIcon className="w-5 h-5" />
              </button>
            </div>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-3xl px-8 py-4 text-sm font-black uppercase tracking-widest outline-none focus:border-primary-500 transition-all shadow-sm"
            >
              <option value="newest">Terbaru</option>
              <option value="popular">Terpopuler</option>
              <option value="rating">Rating</option>
              <option value="alphabet">A - Z</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Enhanced Sidebar Filter */}
          <aside className="lg:w-80 flex-shrink-0 space-y-12">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-xl">
              <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-3">
                <Filter className="w-4 h-4" /> Filter Kategori
              </h3>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setSearchParams({ category: 'all' })}
                  className={`text-left px-6 py-4 rounded-2xl font-bold transition-all border-2 ${currentCategory === 'all' ? 'bg-primary-500 border-primary-500 text-white shadow-xl shadow-primary-500/20' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                  Semua Resep
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSearchParams({ category: cat.id })}
                    className={`text-left px-6 py-4 rounded-2xl font-bold transition-all border-2 flex items-center gap-3 ${currentCategory === cat.id ? 'bg-primary-500 border-primary-500 text-white shadow-xl shadow-primary-500/20' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                  >
                    <span className="text-xl">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-primary-600 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group cursor-pointer">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
               <h4 className="font-black text-xs uppercase tracking-widest mb-4">Ingin Kreasi Sendiri?</h4>
               <p className="text-primary-100 text-sm mb-6 leading-relaxed">Gunakan fitur Kitchen Builder untuk merancang resep unik Anda.</p>
               <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
                  Coba Sekarang &rarr;
               </div>
            </div>
          </aside>

          {/* Main Content Grid */}
          <div className="flex-1">
            {filteredRecipes.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10' : 'flex flex-col gap-8'}>
                {filteredRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-[4rem] p-24 text-center flex flex-col items-center border border-slate-100 dark:border-slate-700 shadow-2xl">
                <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mb-8">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <h2 className="text-3xl font-black mb-4">Hanya Ada Debu di Sini...</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-sm text-lg font-medium">Kami tidak menemukan resep yang Anda cari. Coba gunakan kata kunci lain!</p>
                <button 
                  onClick={() => setSearchParams({ category: 'all' })}
                  className="bg-primary-500 text-white font-black py-5 px-12 rounded-full shadow-2xl hover:bg-primary-600 transition-all uppercase tracking-widest text-xs"
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
