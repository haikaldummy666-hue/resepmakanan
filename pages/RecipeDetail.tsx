
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, Users, Share2, Printer, Heart, ArrowLeft, 
  Play, CheckCircle2, Timer, Flame, Dumbbell, 
  Sparkles, Scale, Info, ChefHat, TimerOff,
  BarChart3
} from 'lucide-react';
import { MOCK_RECIPES } from '../data/recipes';
import { Recipe } from '../types';
import RecipeCard from '../components/RecipeCard';
import RecipeImage from '../components/RecipeImage';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [kitchenMode, setKitchenMode] = useState(false);

  useEffect(() => {
    const found = MOCK_RECIPES.find(r => r.id === id);
    if (found) {
      setRecipe(found);
      setServingMultiplier(1);
    }
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    let interval: any;
    if (isTimerActive && timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      // Optional: Play sound or notification
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  if (!recipe) return (
    <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
        <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Mempersiapkan Bahan...</p>
      </div>
    </div>
  );

  const startTimer = (seconds: number) => {
    setTimeLeft(seconds);
    setIsTimerActive(true);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const convertAmount = (amount: number, unit: string) => {
    if (unitSystem === 'metric') return { amount, unit };
    if (unit.toLowerCase() === 'g' || unit.toLowerCase() === 'gr') {
      return { amount: Number((amount * 0.035274).toFixed(1)), unit: 'oz' };
    }
    if (unit.toLowerCase() === 'kg') {
      return { amount: Number((amount * 2.20462).toFixed(1)), unit: 'lb' };
    }
    return { amount, unit };
  };

  const relatedRecipes = MOCK_RECIPES.filter(r => r.category === recipe.category && r.id !== recipe.id).slice(0, 3);

  return (
    <div className={`pt-24 pb-20 transition-colors duration-700 ${kitchenMode ? 'bg-slate-900 text-white' : 'bg-slate-50 dark:bg-slate-900'}`}>
      <div className="container mx-auto px-4">
        {/* Navigation & Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
          <Link to="/recipes" className="flex items-center gap-2 text-slate-500 hover:text-primary-500 font-black text-xs uppercase tracking-widest transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali Ke Daftar
          </Link>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setKitchenMode(!kitchenMode)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${kitchenMode ? 'bg-primary-500 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700'}`}
            >
              <ChefHat className="w-4 h-4" /> {kitchenMode ? 'Matikan Kitchen Mode' : 'Aktifkan Kitchen Mode'}
            </button>
            <div className="flex gap-2">
              <button className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-md hover:text-red-500 transition-all border border-slate-100 dark:border-slate-700">
                <Heart className="w-5 h-5" />
              </button>
              <button onClick={() => window.print()} className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-md hover:text-primary-500 transition-all border border-slate-100 dark:border-slate-700">
                <Printer className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary-500/20 blur-[100px] -z-10 rounded-full" />
            <div className="relative overflow-hidden rounded-[4rem] h-[450px] sm:h-[650px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-white dark:border-slate-800">
              <RecipeImage 
                src={recipe.thumbnail} 
                alt={recipe.title} 
                className="w-full h-full transform transition-transform duration-1000 group-hover:scale-110"
              />
              {recipe.videoUrl && (
                <button className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all backdrop-blur-[2px]">
                  <div className="w-24 h-24 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary-500 shadow-2xl transform transition-transform group-hover:scale-110">
                    <Play className="w-10 h-10 fill-current ml-1" />
                  </div>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-primary-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full">
                {recipe.category}
              </span>
              <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full">
                {recipe.cuisine}
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black mb-10 leading-[0.9] tracking-tighter">
              {recipe.title}
            </h1>
            <p className={`text-xl mb-12 leading-relaxed max-w-xl font-medium ${kitchenMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {recipe.description}
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: 'Total Waktu', val: `${recipe.prepTime + recipe.cookTime}m`, icon: Clock },
                { label: 'Porsi', val: `${recipe.servings * servingMultiplier}p`, icon: Users },
                { label: 'Kesulitan', val: recipe.difficulty, icon: Timer },
                { label: 'Kalori', val: `${recipe.nutrition.calories}k`, icon: Flame },
              ].map((item, i) => (
                <div key={i} className={`p-6 rounded-[2.5rem] shadow-xl border transition-all ${kitchenMode ? 'bg-slate-800 border-slate-700' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}>
                   <item.icon className="w-6 h-6 text-primary-500 mb-3" />
                   <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">{item.label}</p>
                   <p className="font-black text-xl">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Ingredients */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-10">
              <div className={`p-10 rounded-[3.5rem] shadow-2xl transition-all ${kitchenMode ? 'bg-slate-800' : 'bg-white dark:bg-slate-800'}`}>
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-3xl font-black tracking-tighter">Bahan Utama</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setUnitSystem(u => u === 'metric' ? 'imperial' : 'metric')}
                      className="p-3 bg-slate-50 dark:bg-slate-700 rounded-2xl hover:bg-primary-500 hover:text-white transition-all"
                    >
                      <Scale className="w-5 h-5" />
                    </button>
                    <div className="flex items-center bg-slate-50 dark:bg-slate-700 rounded-2xl p-1 px-3 gap-3 border border-slate-100 dark:border-slate-600">
                      <button onClick={() => setServingMultiplier(prev => Math.max(1, prev - 1))} className="text-lg font-black">-</button>
                      <span className="text-xs font-black">{servingMultiplier}x</span>
                      <button onClick={() => setServingMultiplier(prev => prev + 1)} className="text-lg font-black">+</button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {recipe.ingredients.map((ing, idx) => {
                    const converted = convertAmount(ing.amount * servingMultiplier, ing.unit);
                    return (
                      <div key={idx} className={`p-6 rounded-3xl border transition-all ${kitchenMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 dark:bg-slate-900/50 border-transparent hover:border-primary-200'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-lg">{ing.item}</span>
                          <span className="font-black text-primary-500">
                            {converted.amount} {converted.unit}
                          </span>
                        </div>
                        {ing.prepTimeSeconds && ing.prepTimeSeconds > 0 && (
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
                            <Clock className="w-3 h-3" /> Persiapan: {Math.round(ing.prepTimeSeconds / 60)} Menit
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 pt-10 border-t border-slate-100 dark:border-slate-700">
                  {/* Added BarChart3 to lucide-react imports above */}
                  <h4 className="font-black mb-8 flex items-center gap-3 text-sm uppercase tracking-[0.2em]">
                    <BarChart3 className="text-primary-500" /> Analisis Gizi
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { l: 'Protein', v: `${recipe.nutrition.protein}g`, c: 'text-blue-500' },
                      { l: 'Lemak', v: `${recipe.nutrition.fat}g`, c: 'text-red-500' },
                      { l: 'Karbo', v: `${recipe.nutrition.carbs}g`, c: 'text-orange-500' },
                      { l: 'Energi', v: `${recipe.nutrition.calories}k`, c: 'text-primary-500' },
                    ].map((n, i) => (
                      <div key={i} className={`p-5 rounded-[2rem] border ${kitchenMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800'}`}>
                        <p className="text-[10px] text-slate-400 uppercase font-black mb-1">{n.l}</p>
                        <p className={`font-black text-xl ${n.c}`}>{n.v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-4xl font-black tracking-tighter flex items-center gap-4">
                <ChefHat className="text-primary-500 w-10 h-10" /> Alur Pembuatan
              </h3>
              {isTimerActive && timeLeft !== null && (
                <div className="bg-primary-500 text-white px-8 py-4 rounded-full font-black text-2xl animate-pulse shadow-2xl flex items-center gap-3">
                   <Timer className="w-6 h-6" /> {formatTime(timeLeft)}
                </div>
              )}
            </div>

            <div className="space-y-10">
              {recipe.instructions.map((step, idx) => (
                <div 
                  key={idx}
                  className={`relative p-12 rounded-[4rem] border transition-all duration-700 overflow-hidden ${activeStep === idx ? 'bg-white dark:bg-slate-800 border-primary-500 shadow-2xl scale-[1.02] z-10' : 'bg-white/40 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 opacity-60 blur-[1px] hover:opacity-100 hover:blur-0 cursor-pointer'}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full -mr-16 -mt-16" />
                  <div className="flex flex-col sm:flex-row items-start gap-10">
                    <div className={`w-20 h-20 rounded-[2rem] flex flex-shrink-0 items-center justify-center font-black text-4xl shadow-2xl transition-all ${activeStep === idx ? 'bg-primary-500 text-white rotate-6' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <p className={`text-2xl leading-relaxed font-bold ${kitchenMode && activeStep === idx ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>
                        {step.text}
                      </p>
                      {step.timerSeconds && step.timerSeconds > 0 && (
                        <div className="mt-10">
                          <button 
                            onClick={(e) => { e.stopPropagation(); startTimer(step.timerSeconds!); }}
                            className={`flex items-center gap-4 py-5 px-10 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl transition-all active:scale-95 ${isTimerActive && timeLeft !== null ? 'bg-slate-900 text-white' : 'bg-primary-500 text-white hover:bg-primary-600'}`}
                          >
                            <Timer className={`w-6 h-6 ${isTimerActive ? 'animate-pulse' : ''}`} />
                            {isTimerActive && timeLeft !== null ? 'Hentikan Timer' : `Mulai Timer (${step.timerSeconds / 60}m)`}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendation Grid */}
            <div className="pt-32 border-t border-slate-200 dark:border-slate-800">
               <h3 className="text-3xl font-black mb-12 tracking-tighter">Mungkin Anda Suka...</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {relatedRecipes.map(r => <RecipeCard key={r.id} recipe={r} viewMode="grid" />)}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
