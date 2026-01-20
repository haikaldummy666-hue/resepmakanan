
export type Difficulty = 'Pemula' | 'Menengah' | 'Ahli';
export type Cuisine = 'Indonesia' | 'Asia' | 'Eropa' | 'Amerika' | 'Vegan' | 'Healthy';

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Ingredient {
  item: string;
  amount: number;
  unit: string;
  prepTimeSeconds?: number; // Waktu persiapan spesifik untuk bahan ini
}

export interface Instruction {
  step: number;
  text: string;
  timerSeconds?: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  reviews: number;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: Difficulty;
  cuisine: Cuisine;
  category: string;
  tags: string[];
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutrition: Nutrition;
  videoUrl?: string;
  isPopular?: boolean;
  createdAt: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  favorites: string[];
}
