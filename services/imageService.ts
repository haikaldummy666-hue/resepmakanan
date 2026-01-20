
/**
 * Service to handle recipe image fallbacks using internet-based static images.
 * Since the Gemini API quota was exceeded, we now use Unsplash's featured search
 * to provide high-quality, relevant images for any recipe.
 */
export async function generateRecipeImage(prompt: string): Promise<string | null> {
  // Instead of calling Gemini API, we generate a search-based Unsplash URL.
  // This ensures we always have a high-quality image without hitting API limits.
  const keyword = encodeURIComponent(prompt.toLowerCase().replace(/[^a-z0-9]/g, ','));
  return `https://images.unsplash.com/featured/?food,${keyword}&auto=format&fit=crop&w=1200&q=80`;
}
