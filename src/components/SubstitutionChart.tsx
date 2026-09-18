import React, { useState } from 'react';
import { RefreshCw, ShieldAlert, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export const SubstitutionChart: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const substitutions = [
    {
      original: 'Dahi (Yogurt)',
      substitute: '1 Bara Chamach Taaza Leemo Ka Ras ya Sirka',
      reason: 'Khatta-pan aur tenderizing ke liye bilkul aik jaisa asar deta hai.',
      category: 'Dairy',
    },
    {
      original: 'Kasuri Methi (Dried Fenugreek)',
      substitute: 'Bareek kata taaza sabz dhania + aadha chammach bhuna zeera',
      reason: 'Khushboo aur earthy aroma ko bahaal rakhta hai.',
      category: 'Herbs & Masalay',
    },
    {
      original: 'Heavy Cream ya Malai',
      substitute: 'Ghar ke garam doodh ki taaza jhaag/malai + 1 chamach Makhan',
      reason: 'Gravy mein wohi makhmali creamy texture paida karega.',
      category: 'Dairy',
    },
    {
      original: 'Paneer Cubes',
      substitute: 'Uble hue motay Aloo ke tukray ya Fried Tofu',
      reason: 'Aloo Makhani banayein jo Paneer Butter Masala ki tarah lajawab lagti hai.',
      category: 'Protein / Veg',
    },
    {
      original: 'Lehsan Adrak Paste',
      substitute: 'Bareek crush kiya hua taaza lehsan aur adrak powder (Sonth)',
      reason: 'Zaiqay ki gehrai aur aroma pura faraham karta hai.',
      category: 'Aromatics',
    },
    {
      original: 'Desi Ghee',
      substitute: 'Aam Cooking Oil + 1 bara chamach taaza Makhan (Butter)',
      reason: 'Karahi aur salan mein shahi dhaba khushboo aur roghan laata hai.',
      category: 'Fats',
    },
  ];

  const safetyRules = [
    {
      title: 'Shinwari Mein Pyaz Ka Nuqsan',
      desc: 'Asli Shinwari karahi mein pyaz shamil karne se gravy meethi ho jati hai aur dhaba style spicy crust nahi banti.',
    },
    {
      title: 'Dahi Phutne Se Bachayein',
      desc: 'Dahi ko hamesha pehle achhi tarah phent lein aur aanch dheemi karke salan mein dalein taakay dahi ke dane na banein.',
    },
    {
      title: 'Gosht Ki Bhunai Ka Sunehra Qanoon',
      desc: 'Jab tak tail gravy se poori tarah alag (roghan) na ho jaye, bhunai jaari rakhein. Is se kacha-pan khatam hota hai.',
    },
  ];

  const filteredSubs = substitutions.filter((item) =>
    item.original.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.substitute.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="substitution-chart" className="flex flex-col gap-6 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F59E0B]/15 pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#F59E0B] text-xs font-bold uppercase tracking-wider">
            <RefreshCw className="w-4 h-4" />
            <span>Zero-Waste Desi Kitchen Guide</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
            Ustad Ji Ka Mutabaadul Masala Chart
          </h2>
        </div>
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Ingredient talaash karein..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-[#1C1A17] border border-[#F59E0B]/20 text-xs text-[#FAF7F2] placeholder-[#D4C9BC]/50 focus:outline-none focus:border-[#C2410C]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Substitutions Matrix Table */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredSubs.map((sub, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#1C1A17] border border-[#F59E0B]/15 flex flex-col justify-between hover:border-[#F59E0B]/30 transition-all shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-red-300">
                      ❌ Agar {sub.original} Na Ho:
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#26231F] text-[#D4C9BC]">
                      {sub.category}
                    </span>
                  </div>

                  <div className="mt-2 text-sm font-bold text-[#10B981] flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>To Istemal Karein: {sub.substitute}</span>
                  </div>

                  <p className="text-xs text-[#D4C9BC] mt-2 leading-relaxed">
                    {sub.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Khana Kharaab Honay Se Bachayein (Chef cautionary rules) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="p-5 rounded-2xl bg-[#1C1A17] border border-[#F59E0B]/20 shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#F59E0B]">
              <ShieldAlert className="w-5 h-5 text-[#C2410C]" />
              <h3 className="font-serif text-lg font-bold text-[#FAF7F2]">
                Khana Kharab Hone Se Bachayein
              </h3>
            </div>
            <p className="text-xs text-[#D4C9BC]">
              Ustad Ji ke yeh teen sunehre usool yaad rakhein:
            </p>

            <div className="space-y-3">
              {safetyRules.map((rule, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#121110] border border-[#F59E0B]/10 flex flex-col gap-1">
                  <span className="text-xs font-bold text-[#FAF7F2] flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-[#C2410C]" />
                    {rule.title}
                  </span>
                  <p className="text-[11px] text-[#D4C9BC] leading-relaxed pl-5">
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
