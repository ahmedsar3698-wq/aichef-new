import React, { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';
import { COMMON_PANTRY_ITEMS } from '../data/defaults';

interface AddIngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: string[];
  onToggleItem: (item: string) => void;
  onAddNewCustomItem: (item: string) => void;
}

export const AddIngredientModal: React.FC<AddIngredientModalProps> = ({
  isOpen,
  onClose,
  selectedItems,
  onToggleItem,
  onAddNewCustomItem,
}) => {
  if (!isOpen) return null;

  const [customInput, setCustomInput] = useState('');

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      onAddNewCustomItem(customInput.trim());
      setCustomInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#121110]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#1C1A17] border border-[#F59E0B]/30 p-6 flex flex-col gap-5 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#26231F] text-[#FAF7F2] flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col gap-1">
          <h3 className="font-serif text-xl font-bold text-[#FAF7F2]">
            Kitchen Ke Mazeed Ingredients Shamil Karein
          </h3>
          <p className="text-xs text-[#D4C9BC]">
            Agar aapke paas gosht, paneer ya koi khaas masala mojood hai to select karein:
          </p>
        </div>

        {/* Custom Input Form */}
        <form onSubmit={handleAddCustom} className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Naya item likhein (e.g. Machhli, Daal Chana)..."
            className="flex-1 px-3.5 py-2 rounded-xl bg-[#121110] border border-[#F59E0B]/20 text-xs text-[#FAF7F2] placeholder-[#D4C9BC]/50 focus:outline-none focus:border-[#C2410C]"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#C2410C] hover:bg-[#ea580c] text-white text-xs font-semibold flex items-center gap-1 shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Karein</span>
          </button>
        </form>

        {/* Common Quick Chips */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-[#F59E0B]">
            Pantry ke aam items:
          </span>
          <div className="flex flex-wrap gap-2">
            {COMMON_PANTRY_ITEMS.map((item) => {
              const isSelected = selectedItems.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onToggleItem(item)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#C2410C] text-white shadow'
                      : 'bg-[#26231F] text-[#D4C9BC] hover:text-[#FAF7F2] border border-[#F59E0B]/15'
                  }`}
                >
                  {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-[#F59E0B]/15">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#C2410C] hover:bg-[#ea580c] text-white text-xs font-bold shadow transition-all"
          >
            Mukammal (Done)
          </button>
        </div>
      </div>
    </div>
  );
};
