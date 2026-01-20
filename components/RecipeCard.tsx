
import React from 'react';
import { Star, Clock, Users, ChevronRight, Heart } from 'lucide-react';
import { Recipe } from '../types';
import { Link } from 'react-router-dom';
import RecipeImage from './RecipeImage';

interface RecipeCardProps {
  recipe: Recipe;
  viewMode: 'grid' | 'list';
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, viewMode }) => {
  const isGrid = viewMode === 'grid';

  return (
    <div className={`group relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-slate-100 dark:border-slate-700 ${isGrid ? 'flex flex-col' : 'flex flex-row gap-4 h-64'}`}>
      {/* Thumbnail */}
      <div className={`relative overflow-hidden ${isGrid ? 'aspect-[4/3] w-full' : 'w-1/3 h-full'}`}>
        <RecipeImage 
          src={recipe.thumbnail} 
          alt={recipe.title}
          className="w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        <button className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full text-slate-400 hover:text-red-500 transition-colors z-20">
          <Heart className="w-5 h-5" />
        </button>
        <div className="absolute bottom-4 left-4 flex gap-2 z-20">
          <span className="bg-primary-500/90 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm">
            {recipe.cuisine}
          </span>
          <span className="bg-slate-900/60 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm">
            {recipe.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`p-5 flex flex-col justify-between ${isGrid ? 'flex-1' : 'w-2/3'}`}>
        <div>
          <div className="flex items-center gap-1 text-yellow-500 mb-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold">{recipe.rating}</span>
            <span className="text-xs text-slate-400">({recipe.reviews})</span>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors line-clamp-1">{recipe.title}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.prepTime + recipe.cookTime} m</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings} porsi</span>
            </div>
          </div>
          
          <Link 
            to={`/recipe/${recipe.id}`}
            className="flex items-center gap-1 text-primary-600 dark:text-primary-400 font-bold text-sm hover:underline"
          >
            Masak <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
