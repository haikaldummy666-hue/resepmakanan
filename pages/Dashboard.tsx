
import React, { useState, useEffect } from 'react';
import { 
  Plus, Image as ImageIcon, Trash2, Save, 
  Flame, Dumbbell, Zap, ListOrdered, Timer,
  CheckCircle, ChefHat, Info, Clock, BarChart3,
  Coffee, UtensilsCrossed
} from 'lucide-react';
import { CATEGORIES } from '../data/recipes';
import { Ingredient, Instruction, Nutrition } from '../types';

const RecipeBuilder: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // State for Dynamic Form
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ item: '', amount: 0, unit: 'g', prepTimeSeconds: 0 }]);
  const [instructions, setInstructions] = useState<Instruction[]>([{ step: 1, text: '', timerSeconds: 0 }]);
  const [nutrition, setNutrition] = useState<Nutrition>({ calories: 0, protein: 0, carbs: 0, fat: 0 });

  // Intelligent Nutrition & Prep Time Calculation
  useEffect(() => {
    let cal = 0, prot = 0, carb = 0, fat = 0;
    
    ingredients.forEach(ing => {
      const amt = Number(ing.amount) || 0;
      const name = ing.item.toLowerCase();

      // Better heuristic logic for nutrition estimation
      if (name.includes('ayam') || name.includes('daging') || name.includes('ikan') || name.includes('telur')) {
        cal += amt * 2.5; prot += amt * 0.25; fat += amt * 0.15;
      } else if (name.includes('nasi') || name.includes('tepung') || name.includes('gula') || name.includes('roti') || name.includes('kentang')) {
        cal += amt * 3.5; carb += amt * 0.75;
      } else if (name.includes('minyak') || name.includes('mentega') || name.includes('santan') || name.includes('keju')) {
        cal += amt * 8.5; fat += amt * 0.85;
      } else if (name.includes('sayur') || name.includes('buah') || name.includes('tomat') || name.includes('bawang')) {
        cal += amt * 0.4; carb += amt * 0.08;
      } else if (name.includes('kacang') || name.includes('tempe') || name.includes('tahu')) {
        cal += amt * 1.8; prot += amt * 0.15; fat += amt * 0.08;
      } else {
        cal += amt * 1.2; prot += amt * 0.04; carb += amt * 0.15;
      }
    });

    setNutrition({
      calories: Math.round(cal),
      protein: Math.round(prot),
      carbs: Math.round(carb),
      fat: Math.round(fat)
    });
  }, [ingredients]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addIngredient = () => setIngredients([...ingredients, { item: '', amount: 0, unit: 'g', prepTimeSeconds: 0 }]);
  const removeIngredient = (index: number) => setIngredients(ingredients.filter((_, i) => i !== index));
  
  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    const newIngs = [...ingredients];
    newIngs[index] = { ...newIngs[index], [field]: value };
    setIngredients(newIngs);
  };

  const addInstruction = () => setInstructions([...instructions, { step: instructions.length + 1, text: '', timerSeconds: 0 }]);
  const removeInstruction = (index: number) => {
    const filtered = instructions.filter((_, i) => i !== index);
    setInstructions(filtered.map((step, i) => ({ ...step, step: i + 1 })));
  };

  const updateInstruction = (index: number, field: keyof Instruction, value: string | number) => {
    const newSteps = [...instructions];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setInstructions(newSteps);
  };

  const totalPrepFromIngredients = Math.round(ingredients.reduce((acc, curr) => acc + (curr.prepTimeSeconds || 0), 0) / 60);

  return (
    <div className="pt-28 pb-32 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 bg-primary-100 dark:bg-primary-900/30 px-6 py-3 rounded-full text-primary-600 dark:text-primary-400 font-black text-xs uppercase tracking-[0.2em] mb-6">
            <ChefHat className="w-5 h-5" /> Creative Kitchen Builder
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-6 text-slate-900 dark:text-white tracking-tighter">
            Rancang Mahakarya <span className="text-primary-500">Kulinermu</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Masukkan detail resep di bawah ini. Sistem kami akan secara otomatis menghitung estimasi nutrisi dan waktu persiapan total untuk Anda.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-[4rem] p-8 sm:p-16 shadow-2xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <form className="space-y-20">
            {/* 1. Informasi Utama */}
            <section className="space-y-10">
              <h2 className="text-2xl font-black flex items-center gap-4">
                <span className="w-10 h-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm">01</span>
                Informasi Dasar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Judul Resep</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Salmon Panggang Lemon" 
                    className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-primary-500 rounded-3xl p-6 outline-none font-bold text-xl shadow-inner transition-all"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Kategori Menu</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-primary-500 rounded-3xl p-6 outline-none font-bold text-xl shadow-inner transition-all appearance-none">
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Foto Utama (HD)</label>
                <div className="relative group overflow-hidden rounded-[3rem]">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  <div className={`h-[450px] border-4 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center transition-all bg-slate-50/50 dark:bg-slate-900/50 ${previewImage ? 'border-none' : 'group-hover:border-primary-500 group-hover:bg-primary-50/10'}`}>
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover shadow-2xl transition-transform group-hover:scale-105" />
                    ) : (
                      <>
                        <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl flex items-center justify-center mb-6 text-primary-500 group-hover:scale-110 transition-all">
                          <ImageIcon className="w-12 h-12" />
                        </div>
                        <p className="font-black text-slate-400 uppercase tracking-widest text-sm">Drop foto atau klik untuk memilih</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Bahan & Persiapan */}
            <section className="space-y-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-black flex items-center gap-4">
                  <span className="w-10 h-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm">02</span>
                  Bahan & Waktu Persiapan
                </h2>
                <button type="button" onClick={addIngredient} className="bg-primary-500 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-primary-600 shadow-lg shadow-primary-500/20 active:scale-95 transition-all">
                  <Plus className="w-4 h-4" /> Tambah Bahan
                </button>
              </div>
              
              <div className="space-y-4">
                {ingredients.map((ing, idx) => (
                  <div key={idx} className="group bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-transparent hover:border-primary-200 dark:hover:border-primary-800 transition-all flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                    <div className="flex-1 w-full space-y-2">
                      <p className="text-[10px] font-black uppercase text-slate-400 ml-1">Nama Bahan</p>
                      <input 
                        type="text" 
                        placeholder="Contoh: Bawang Merah" 
                        className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary-500 outline-none font-bold"
                        value={ing.item}
                        onChange={(e) => updateIngredient(idx, 'item', e.target.value)}
                      />
                    </div>
                    <div className="flex gap-4 w-full lg:w-auto">
                      <div className="w-24 space-y-2">
                         <p className="text-[10px] font-black uppercase text-slate-400 ml-1">Jml</p>
                         <input 
                          type="number" 
                          className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary-500 outline-none font-bold text-center"
                          value={ing.amount || ''}
                          onChange={(e) => updateIngredient(idx, 'amount', e.target.value)}
                        />
                      </div>
                      <div className="w-24 space-y-2">
                         <p className="text-[10px] font-black uppercase text-slate-400 ml-1">Unit</p>
                         <select 
                          className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary-500 outline-none font-bold"
                          value={ing.unit}
                          onChange={(e) => updateIngredient(idx, 'unit', e.target.value)}
                        >
                          <option value="g">g</option>
                          <option value="kg">kg</option>
                          <option value="ml">ml</option>
                          <option value="butir">butir</option>
                          <option value="siung">siung</option>
                        </select>
                      </div>
                      <div className="flex-1 lg:w-48 space-y-2">
                         <p className="text-[10px] font-black uppercase text-slate-400 ml-1">Persiapan (Detik)</p>
                         <div className="relative">
                            <input 
                              type="number" 
                              placeholder="60"
                              className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary-500 outline-none font-bold pr-12"
                              value={ing.prepTimeSeconds || ''}
                              onChange={(e) => updateIngredient(idx, 'prepTimeSeconds', Number(e.target.value))}
                            />
                            <Clock className="absolute right-4 top-4 w-5 h-5 text-slate-300" />
                         </div>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeIngredient(idx)}
                      className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all self-end lg:self-center"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Advanced Real-time Analytics Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                {/* Nutrition Card */}
                <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <h4 className="font-black text-primary-400 mb-8 flex items-center gap-3 uppercase tracking-widest text-sm">
                      <BarChart3 className="w-6 h-6" /> Analitik Nutrisi Real-time
                    </h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 font-black uppercase">Total Kalori</p>
                        <p className="text-4xl font-black">{nutrition.calories} <span className="text-xs font-normal text-slate-500 uppercase">kcal</span></p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 font-black uppercase">Protein</p>
                        <p className="text-4xl font-black text-blue-400">{nutrition.protein}<span className="text-xs font-normal text-slate-500">g</span></p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 font-black uppercase">Karbohidrat</p>
                        <p className="text-4xl font-black text-orange-400">{nutrition.carbs}<span className="text-xs font-normal text-slate-500">g</span></p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 font-black uppercase">Lemak</p>
                        <p className="text-4xl font-black text-red-400">{nutrition.fat}<span className="text-xs font-normal text-slate-500">g</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary Card */}
                <div className="bg-primary-500 text-white p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <h4 className="font-black text-primary-100 mb-8 flex items-center gap-3 uppercase tracking-widest text-sm">
                      <Clock className="w-6 h-6" /> Estimasi Waktu Dapur
                    </h4>
                    <div className="space-y-6">
                      <div>
                        <p className="text-[10px] text-primary-100 font-black uppercase mb-1">Total Waktu Persiapan Bahan</p>
                        <p className="text-5xl font-black">{totalPrepFromIngredients} <span className="text-lg">Menit</span></p>
                      </div>
                      <div className="flex items-center gap-3 text-primary-100 font-bold bg-white/10 p-4 rounded-2xl">
                         <Info className="w-5 h-5 flex-shrink-0" />
                         <p className="text-xs leading-relaxed">Waktu ini dihitung berdasarkan total persiapan setiap bahan yang Anda masukkan di atas.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Instruksi Memasak */}
            <section className="space-y-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black flex items-center gap-4">
                  <span className="w-10 h-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm">03</span>
                  Langkah-Langkah
                </h2>
                <button type="button" onClick={addInstruction} className="text-primary-600 font-black text-sm flex items-center gap-2 hover:bg-primary-50 p-2 rounded-xl transition-all">
                  <Plus className="w-4 h-4" /> Tambah Langkah
                </button>
              </div>

              <div className="space-y-8">
                {instructions.map((step, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[3rem] border-2 border-transparent focus-within:border-primary-500 transition-all flex gap-8">
                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-3xl shadow-xl flex items-center justify-center font-black text-2xl text-primary-500 flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1 space-y-6">
                      <textarea 
                        placeholder="Jelaskan proses langkah ini dengan detail..."
                        className="w-full bg-white dark:bg-slate-800 border-none rounded-3xl p-6 outline-none font-medium min-h-[150px] shadow-sm focus:ring-2 focus:ring-primary-500"
                        value={step.text}
                        onChange={(e) => updateInstruction(idx, 'text', e.target.value)}
                      />
                      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                        <div className="flex items-center gap-3">
                           <Timer className="w-5 h-5 text-slate-400" />
                           <span className="text-[10px] font-black uppercase text-slate-400">Set Timer Otomatis</span>
                        </div>
                        <input 
                          type="number" 
                          placeholder="Jumlah detik (cth: 300)" 
                          className="bg-white dark:bg-slate-800 border-none rounded-2xl px-6 py-4 outline-none font-bold w-full sm:w-64 shadow-sm"
                          value={step.timerSeconds || ''}
                          onChange={(e) => updateInstruction(idx, 'timerSeconds', Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <button type="button" onClick={() => removeInstruction(idx)} className="text-slate-300 hover:text-red-500 transition-colors self-start">
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Final Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-6 pt-16 border-t border-slate-100 dark:border-slate-800">
               <button type="button" className="px-12 py-6 rounded-full font-black text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all uppercase tracking-[0.2em] text-xs">
                  Bersihkan Form
               </button>
               <button type="submit" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-16 py-6 rounded-full font-black shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs">
                  <Save className="w-5 h-5" /> Publikasikan Resep
               </button>
            </div>
          </form>
        </div>

        {/* Pro Tip Section */}
        <div className="mt-20 bg-gradient-to-r from-slate-900 to-slate-800 p-12 rounded-[4rem] text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
           <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-10 h-10 text-primary-400" />
           </div>
           <div>
              <h3 className="text-2xl font-black mb-3">Kitchen Pro Tip!</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Resep yang baik bukan hanya tentang rasa, tapi kejelasan instruksi. Pastikan setiap langkah memiliki subjek yang jelas dan waktu timer yang akurat untuk membantu koki pemula.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeBuilder;
