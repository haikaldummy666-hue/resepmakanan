
import { GoogleGenAI } from "@google/genai";

export async function getRecipeSuggestions(ingredients: string) {
  // Always use direct initialization with process.env.API_KEY as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Saran resep untuk bahan: ${ingredients}. Berikan 3 ide unik dalam Bahasa Indonesia.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Friendly fallback message if quota is exceeded
    if (error?.message?.includes('quota') || error?.status === 429) {
      return "Waduh, dapur AI kami sedang sangat ramai! Tapi jangan khawatir, dengan bahan " + ingredients + ", anda biasanya bisa membuat tumisan sayur campur, nasi goreng spesial, atau omelet telur yang lezat. Coba lagi nanti ya untuk resep lebih detail dari AI!";
    }
    
    return "Maaf, asisten dapur sedang istirahat sebentar. Silakan coba lagi beberapa saat lagi!";
  }
}
