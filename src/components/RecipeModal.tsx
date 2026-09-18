import React, { useState, useEffect } from 'react';
import { X, Check, Printer, Clock, Users, Flame, Award, Lightbulb, ChefHat } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  if (!recipe) return null;

  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  // Reset checked state and listen for Escape key
  useEffect(() => {
    setCheckedIngredients({});
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [recipe?.id, onClose]);

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const ingredients = recipe.ingredientsRequired || [];
  const instructions = recipe.instructions || [];
  const substitutions = recipe.substitutions || [];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 bg-[#121110]/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#1C1A17] border border-[#F59E0B]/30 shadow-2xl p-5 sm:p-8 flex flex-col gap-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Modal band karein"
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#26231F] hover:bg-[#332E29] text-[#FAF7F2] border border-[#F59E0B]/20 flex items-center justify-center transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col gap-2 pr-12 border-b border-[#F59E0B]/15 pb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#C2410C] text-white text-xs font-bold shadow">
              {recipe.badge || (recipe.cuisine === 'Pakistani' ? '🇵🇰 Pakistani Special' : '🇮🇳 Indian Classic')}
            </span>
            <span className="text-xs text-[#F59E0B] font-semibold">
              Step-by-Step Cooking Guide
            </span>
          </div>

          <h2 id="recipe-modal-title" className="font-serif text-2xl sm:text-4xl font-bold text-[#FAF7F2] leading-tight">
            {recipe.name}
          </h2>

          {recipe.shortDescription && (
            <p className="text-sm text-[#D4C9BC] leading-relaxed">
              {recipe.shortDescription}
            </p>
          )}

          {/* Metrics bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium">
            {recipe.prepTime && (
              <span className="flex items-center gap-1 text-[#D4C9BC]">
                <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                Prep: {recipe.prepTime}
              </span>
            )}
            {recipe.cookTime && (
              <span className="flex items-center gap-1 text-[#D4C9BC]">
                <Flame className="w-3.5 h-3.5 text-[#C2410C]" />
                Pakana: {recipe.cookTime}
              </span>
            )}
            {recipe.servings && (
              <span className="flex items-center gap-1 text-[#D4C9BC]">
                <Users className="w-3.5 h-3.5 text-[#10B981]" />
                Afrad: {recipe.servings}
              </span>
            )}
            {recipe.difficulty && (
              <span className="flex items-center gap-1 text-[#ffb59d]">
                <Award className="w-3.5 h-3.5" />
                Mushkil: {recipe.difficulty}
              </span>
            )}
          </div>
        </div>

        {/* Ingredients Checklist */}
        {ingredients.length > 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-[#F59E0B]" />
                <span>Darkaar Ingredients (Checklist)</span>
              </h3>
              <span className="text-xs text-[#D4C9BC]">
                Click karke mark karein
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ingredients.map((ing, idx) => {
                const isChecked = !!checkedIngredients[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#10B981]'
                        : 'bg-[#121110] border-[#F59E0B]/10 hover:border-[#F59E0B]/30 text-[#FAF7F2]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                        isChecked
                          ? 'bg-[#10B981] border-[#10B981] text-white'
                          : 'border-[#F59E0B]/30 bg-[#26231F]'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className={`text-xs sm:text-sm select-none ${isChecked ? 'line-through opacity-80' : ''}`}>
                      {ing}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step-by-Step Instructions */}
        {instructions.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#C2410C]" />
              <span>Pakanay Ka Tareeqa (Step-by-Step Instructions)</span>
            </h3>

            <div className="flex flex-col gap-3">
              {instructions.map((step, sIdx) => (
                <div
                  key={step.stepNumber || sIdx}
                  className="p-4 rounded-2xl bg-[#121110] border border-[#F59E0B]/15 flex gap-4 items-start shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C2410C] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-md">
                    {step.stepNumber || sIdx + 1}
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-sm font-bold text-[#FAF7F2]">
                      {step.title}
                    </span>
                    <p className="text-xs sm:text-sm text-[#D4C9BC] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Senior Chef Secret Tips / Nuskha */}
        {recipe.chefTips && (
          <div className="p-4 rounded-2xl bg-[#26231F] border border-[#F59E0B]/30 flex items-start gap-3 shadow-inner">
            <Lightbulb className="w-6 h-6 text-[#F59E0B] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-xs sm:text-sm font-bold text-[#F59E0B]">
                Ustad Ji Ka Khaas Nuskha:
              </span>
              <p className="text-xs sm:text-sm text-[#FAF7F2] italic leading-relaxed">
                {recipe.chefTips}
              </p>
            </div>
          </div>
        )}

        {/* Ingredient Substitutions */}
        {substitutions.length > 0 && (
          <div className="p-4 rounded-2xl bg-[#121110] border border-[#F59E0B]/15 flex flex-col gap-2">
            <span className="text-xs font-bold text-[#D4C9BC] uppercase tracking-wider">
              Agar Koi Cheez Maujood Na Ho:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {substitutions.map((sub, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-[#1C1A17] border border-[#F59E0B]/10 flex flex-col">
                  <span className="text-[#C2410C] font-semibold">{sub.missingItem}</span>
                  <span className="text-[#FAF7F2] mt-0.5">↳ {sub.substitute}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2 border-t border-[#F59E0B]/15">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#26231F] hover:bg-[#332E29] text-[#FAF7F2] text-xs sm:text-sm font-semibold border border-[#F59E0B]/20 transition-all"
          >
            Band Karein
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#ea580c] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Recipe Print / Save Karein</span>
          </button>
        </div>
      </div>
    </div>
  );
};
