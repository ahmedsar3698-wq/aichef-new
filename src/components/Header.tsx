import React from 'react';
import { APP_IMAGES } from '../data/defaults';
import { MessageSquare, Sparkles, Volume2 } from 'lucide-react';

interface HeaderProps {
  onOpenAskChef: () => void;
  onScrollToScanner: () => void;
  onScrollToRecipes: () => void;
  onScrollToTips: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAskChef,
  onScrollToScanner,
  onScrollToRecipes,
  onScrollToTips,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#121110]/95 backdrop-blur-xl border-b border-[#F59E0B]/15 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Senior Chef Emblem */}
        <div className="flex items-center gap-3.5 shrink-0 cursor-pointer" onClick={onScrollToScanner}>
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#F59E0B]/40 bg-[#1C1A17] flex items-center justify-center shadow-md">
            <img
              src={APP_IMAGES.logo}
              alt="Pakwan AI Brand Emblem"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback if network blocked
                (e.target as HTMLImageElement).src = APP_IMAGES.logo;
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FAF7F2]">
                Pakwan <span className="text-[#C2410C]">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-[#26231F] text-[#F59E0B] text-xs font-semibold tracking-wide border border-[#F59E0B]/20">
                🇵🇰 & 🇮🇳 Authentic Desi
              </span>
            </div>
            <span className="text-xs text-[#D4C9BC]/80 tracking-wide">
              Senior Desi Chef & Food Recognition Assistant
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links in Roman Urdu */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={onScrollToScanner}
            className="px-3 py-1.5 rounded-lg text-[#FAF7F2] bg-[#C2410C]/20 text-[#ffb59d] border border-[#C2410C]/30 hover:bg-[#C2410C]/30 transition-colors"
          >
            Chef Scanner (Image AI)
          </button>
          <button
            onClick={onScrollToRecipes}
            className="px-3 py-1.5 rounded-lg text-[#D4C9BC] hover:text-[#FAF7F2] hover:bg-[#26231F] transition-colors"
          >
            Shahi Recipes
          </button>
          <button
            onClick={onScrollToTips}
            className="px-3 py-1.5 rounded-lg text-[#D4C9BC] hover:text-[#FAF7F2] hover:bg-[#26231F] transition-colors"
          >
            Mutabaadul Masala Chart
          </button>
          <button
            onClick={onScrollToTips}
            className="px-3 py-1.5 rounded-lg text-[#D4C9BC] hover:text-[#FAF7F2] hover:bg-[#26231F] transition-colors"
          >
            Ustad Ji Ke Nuskhe
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* AI Status Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1A17] border border-[#10B981]/30">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-xs font-medium text-[#10B981]">
              AI Vision Tayyar Hai
            </span>
          </div>

          {/* Roman Urdu indicator */}
          <div className="hidden sm:flex items-center px-2 py-0.5 rounded bg-[#26231F] border border-[#F59E0B]/20 text-xs font-medium text-[#F59E0B]">
            Roman Urdu
          </div>

          {/* Ask Chef Button */}
          <button
            type="button"
            onClick={onOpenAskChef}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#C2410C] hover:bg-[#ea580c] text-white font-medium text-sm rounded-lg shadow-[0_4px_16px_rgba(194,65,12,0.4)] transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-white" />
            <span>Ustad Ji Se Poohein</span>
          </button>
        </div>
      </div>
    </header>
  );
};
