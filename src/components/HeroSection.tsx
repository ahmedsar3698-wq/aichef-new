import React from 'react';
import { Sparkles, ShieldCheck, Flame, Award } from 'lucide-react';
import { APP_IMAGES } from '../data/defaults';

interface HeroSectionProps {
  onStartScanning: () => void;
  onOpenAskChef: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartScanning, onOpenAskChef }) => {
  return (
    <section className="relative flex flex-col gap-6 lg:gap-8 pt-6 sm:pt-10">
      {/* Aura Badges */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1A17] border border-[#10B981]/30 text-[#10B981] text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          Senior AI Kitchen Ustad
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#26231F] border border-[#F59E0B]/25 text-[#F59E0B] text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          AI Vision Ingredient Recognition
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1C1A17] text-[#D4C9BC] text-xs font-medium">
          🇵🇰 Pakistani Karahi & Handi
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1C1A17] text-[#D4C9BC] text-xs font-medium">
          🇮🇳 Indian Paneer & Daal Specials
        </span>
      </div>

      {/* Main Grid: Editorial Typography & Senior Chef Vignette */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Column: Heading & Description in Roman Urdu */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#F59E0B] text-xs font-bold tracking-widest uppercase">
              Ustad Ji Ka Farmaan
            </span>
            <span className="h-px flex-1 bg-[#F59E0B]/20 max-w-[100px]"></span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-bold text-[#FAF7F2] leading-[1.2] tracking-tight">
            Khush Aamdeed! <span className="italic text-[#ffb59d]">Kitchen Ki Cheezein</span> Dikhayein, Lajawab Recipe Banwayein.
          </h1>

          <p className="text-base sm:text-lg text-[#D4C9BC] max-w-2xl leading-relaxed">
            Apne fridge ya kitchen counter par mojood ingredients ki tasveer upload karein. Hamara AI Vision foran pehchanega aur behtareen Pakistani aur Indian recipes batayega!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartScanning}
              className="px-6 py-3 rounded-xl bg-[#C2410C] hover:bg-[#ea580c] text-white font-semibold text-sm sm:text-base shadow-[0_6px_20px_rgba(194,65,12,0.4)] transition-all flex items-center gap-2 active:scale-95"
            >
              <Flame className="w-5 h-5 text-amber-300" />
              <span>Ingredients Scan Karein</span>
            </button>
            <button
              onClick={onOpenAskChef}
              className="px-5 py-3 rounded-xl bg-[#26231F] hover:bg-[#332E29] text-[#FAF7F2] border border-[#F59E0B]/25 font-semibold text-sm sm:text-base transition-all flex items-center gap-2"
            >
              <span>Ustad Ji Se Mushawarat</span>
            </button>
          </div>
        </div>

        {/* Right Column: Senior Chef Persona Card */}
        <div className="lg:col-span-4">
          <div className="p-5 rounded-2xl bg-[#1C1A17] border border-[#F59E0B]/20 shadow-2xl flex items-center gap-4 relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#C2410C]/10 blur-xl pointer-events-none"></div>

            <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#F59E0B]/40 bg-[#26231F] flex items-center justify-center shadow-lg">
              <img
                src={APP_IMAGES.logo}
                alt="Ustad Bashir Chishti"
                className="w-full h-full object-cover scale-110"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#10B981] border-2 border-[#1C1A17]"></span>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg font-bold text-[#FAF7F2] truncate">
                  Ustad Bashir Chishti
                </span>
                <Award className="w-4 h-4 text-[#F59E0B] shrink-0" />
              </div>
              <p className="text-xs text-[#F59E0B] font-medium truncate">
                42 Saal Purana Khandani Baawarchi Khana
              </p>
              <p className="text-xs text-[#D4C9BC] italic mt-1.5 leading-snug">
                “Khaaney mein sab se pehla masla mohabbat aur aanch ka hota hai.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
