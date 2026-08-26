import React, { useState } from 'react';
import { useFlavor } from '../../context/FlavorContext';
import { FAQS } from '../../data/bundleData';
import { ChevronDown, HelpCircle, ShieldCheck, HeartHandshake } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { currentFlavor } = useFlavor();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFaqs = activeCategory === 'all'
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#07080B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-10 mb-20 bg-gradient-to-r from-[#121824] via-[#1A2234] to-[#121824] border border-white/15 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[140px] opacity-20 pointer-events-none"
            style={{ backgroundColor: currentFlavor.accentColor }}
          />

          <div className="flex items-center gap-6">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex-shrink-0 flex items-center justify-center border text-black shadow-xl"
              style={{
                backgroundColor: currentFlavor.accentColor,
                borderColor: `${currentFlavor.accentColor}80`,
              }}
            >
              <HeartHandshake className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  100% LOVE-IT TASTE GUARANTEE
                </span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                Best Tasting Bar You’ve Ever Had, Or It’s Free.
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                If you don’t genuinely love your first box of CJ Protein Snacks, let us know within 30 days. We’ll issue a complete, instant refund—no questions asked and no return necessary.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-mono font-bold text-white uppercase tracking-wider">
              30-DAY RISK FREE TRIAL
            </div>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" style={{ color: currentFlavor.accentColor }} />
            <span>COMMONLY ASKED QUESTIONS</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            FREQUENTLY ASKED <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, #FFFFFF 30%, ${currentFlavor.accentColor} 100%)`,
              }}
            >
              QUESTIONS & ANSWERS.
            </span>
          </h2>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {[
            { id: 'all', label: 'All Topics' },
            { id: 'nutrition', label: 'Nutrition & Macros' },
            { id: 'taste', label: 'Texture & Taste' },
            { id: 'ingredients', label: 'Ingredients & Nootropics' },
            { id: 'shipping', label: 'Shipping & Guarantee' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white/15 text-white border border-white/30 shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0E121B] border border-white/[0.08] hover:border-white/20 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-white/10 text-white' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
