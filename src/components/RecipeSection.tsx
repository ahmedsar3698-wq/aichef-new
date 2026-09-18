import React, { useState } from 'react';
import { Clock, Flame, Users, Sparkles, ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeSectionProps {
  recipes: Recipe[];
  isFood: boolean;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const RecipeSection: React.FC<RecipeSectionProps> = ({
  recipes,
  isFood,
  onSelectRecipe,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pakistani' | 'indian' | 'veg'>('all');

  const filteredRecipes = recipes.filter((recipe) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pakistani') return recipe.cuisine === 'Pakistani' || recipe.category.toLowerCase().includes('karahi');
    if (activeFilter === 'indian') return recipe.cuisine === 'Indian' || recipe.category.toLowerCase().includes('handi');
    if (activeFilter === 'veg') return recipe.isVegetarian;
    return true;
  });

  return (
    <section
      id="recipes-section"
      className={`flex flex-col gap-6 scroll-mt-24 transition-opacity duration-300 ${
        !isFood ? 'opacity-40 pointer-events-none' : ''
      }`}
    >
      {/* Section Heading & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#F59E0B]/15 pb-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[#F59E0B] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>Ustad Ji Ki Muntakhab Kardah Recipes</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
            Aapke Ingredients Se Tayyar Honay Walay Shahi Pakwan
          </h2>
          <p className="text-sm sm:text-base text-[#D4C9BC]">
            Yeh dishes aapki mojooda sabziyon aur masalon ko 100% istemaal karne ke liye design ki gayi hain.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#1C1A17] border border-[#F59E0B]/15 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-[#C2410C] text-white shadow'
                : 'text-[#D4C9BC] hover:text-[#FAF7F2] hover:bg-[#26231F]'
            }`}
          >
            Sab Recipes ({recipes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('pakistani')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'pakistani'
                ? 'bg-[#C2410C] text-white shadow'
                : 'text-[#D4C9BC] hover:text-[#FAF7F2] hover:bg-[#26231F]'
            }`}
          >
            🇵🇰 Pakistani Karahi
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('indian')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'indian'
                ? 'bg-[#C2410C] text-white shadow'
                : 'text-[#D4C9BC] hover:text-[#FAF7F2] hover:bg-[#26231F]'
            }`}
          >
            🇮🇳 Indian Paneer
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('veg')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'veg'
                ? 'bg-[#10B981] text-white shadow'
                : 'text-[#D4C9BC] hover:text-[#FAF7F2] hover:bg-[#26231F]'
            }`}
          >
            🥬 Vegetarian
          </button>
        </div>
      </div>

      {/* Dual Recipe Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="group rounded-2xl bg-[#1C1A17] border border-[#F59E0B]/20 overflow-hidden shadow-xl flex flex-col justify-between hover:border-[#F59E0B]/50 transition-all duration-300"
          >
            <div>
              {/* Food Image with Overlays */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#121110]">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17] via-transparent to-transparent"></div>

                {/* Cultural Badge & Popular tag */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#121110]/90 text-[#F59E0B] text-xs font-bold backdrop-blur border border-[#F59E0B]/30 shadow">
                    {recipe.badge || (recipe.cuisine === 'Pakistani' ? '🇵🇰 Pakistani Dhaba' : '🇮🇳 Indian Classic')}
                  </span>
                  {recipe.isPopular && (
                    <span className="px-3 py-1 rounded-full bg-[#C2410C] text-white text-xs font-bold shadow flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      Most Popular
                    </span>
                  )}
                  {recipe.isVegetarian && (
                    <span className="px-2.5 py-1 rounded-full bg-[#10B981] text-white text-xs font-bold shadow flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      Shuddh Veg
                    </span>
                  )}
                </div>

                {/* Available Ingredients Fit Pill */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-[#121110]/95 text-[#10B981] text-xs font-bold backdrop-blur border border-[#10B981]/30 flex items-center gap-1.5 shadow">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {recipe.detectedIngredientsUsed?.length || 5} Ingredients Maujood
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 sm:p-6 flex flex-col gap-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2] group-hover:text-[#ffb59d] transition-colors">
                    {recipe.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D4C9BC] mt-1.5 leading-relaxed">
                    {recipe.shortDescription}
                  </p>
                </div>

                {/* Culinary Metrics Bar */}
                <div className="grid grid-cols-4 gap-2 py-2 px-3 rounded-xl bg-[#121110] border border-[#F59E0B]/10 text-center">
                  <div className="flex flex-col py-0.5">
                    <span className="text-[11px] text-[#D4C9BC]/80">Prep Time</span>
                    <span className="text-xs sm:text-sm text-[#FAF7F2] font-semibold">{recipe.prepTime}</span>
                  </div>
                  <div className="flex flex-col py-0.5">
                    <span className="text-[11px] text-[#D4C9BC]/80">Pakana</span>
                    <span className="text-xs sm:text-sm text-[#FAF7F2] font-semibold">{recipe.cookTime}</span>
                  </div>
                  <div className="flex flex-col py-0.5">
                    <span className="text-[11px] text-[#D4C9BC]/80">Mushkil</span>
                    <span className={`text-xs sm:text-sm font-semibold ${
                      recipe.difficulty === 'Aasan' ? 'text-[#10B981]' : 'text-[#F59E0B]'
                    }`}>{recipe.difficulty}</span>
                  </div>
                  <div className="flex flex-col py-0.5">
                    <span className="text-[11px] text-[#D4C9BC]/80">Afrad</span>
                    <span className="text-xs sm:text-sm text-[#F59E0B] font-semibold">{recipe.servings}</span>
                  </div>
                </div>

                {/* Senior Chef Secret Tip Callout */}
                <div className="p-3.5 rounded-xl bg-[#26231F] border border-[#F59E0B]/15 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                  <div className="flex flex-col text-xs leading-relaxed">
                    <span className="font-bold text-[#F59E0B] mb-0.5">
                      Ustad Ji Ka Khaas Nuskha:
                    </span>
                    <span className="text-[#D4C9BC]">
                      {recipe.chefTips}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-5 sm:p-6 pt-0">
              <button
                type="button"
                onClick={() => onSelectRecipe(recipe)}
                className="w-full py-3 px-4 rounded-xl bg-[#C2410C] hover:bg-[#ea580c] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <span>Pori Recipe & Instructions Dekhein</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
