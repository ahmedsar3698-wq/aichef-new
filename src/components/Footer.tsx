import React from 'react';
import { ChefHat, Heart } from 'lucide-react';
import { APP_IMAGES } from '../data/defaults';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0D0C0B] border-t border-[#F59E0B]/15 py-10 mt-16 text-[#D4C9BC] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#F59E0B]/30 bg-[#1C1A17] flex items-center justify-center shrink-0">
            <img
              src={APP_IMAGES.logo}
              alt="Pakwan AI"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-serif text-base font-bold text-[#FAF7F2]">
              Pakwan <span className="text-[#C2410C]">AI</span>
            </span>
            <p className="text-[11px] text-[#D4C9BC]/80">
              Senior Desi Chef & AI Vision Recipe Platform (Roman Urdu)
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-center">
          <span className="px-2.5 py-1 rounded bg-[#1C1A17] border border-[#F59E0B]/10 text-[#F59E0B]">
            🇵🇰 Pakistani Karahi & Handi
          </span>
          <span className="px-2.5 py-1 rounded bg-[#1C1A17] border border-[#F59E0B]/10 text-[#10B981]">
            🇮🇳 Indian Shahi Makhani & Paneer
          </span>
          <span className="px-2.5 py-1 rounded bg-[#1C1A17] border border-[#F59E0B]/10 text-white">
            100% Roman Urdu Support
          </span>
        </div>

        <div className="text-center md:text-right flex items-center gap-1.5 text-[11px] text-[#D4C9BC]/70">
          <span>Khaalis Desi Swaad & Mohabbat Ke Sath</span>
          <Heart className="w-3.5 h-3.5 text-[#C2410C] fill-current" />
        </div>
      </div>
    </footer>
  );
};
