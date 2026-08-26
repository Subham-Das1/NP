import React from 'react';
import { useFlavor } from '../../context/FlavorContext';
import { Zap, ShieldCheck, Award, Heart, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { currentFlavor, setFlavor } = useFlavor();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-white/10 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="font-display font-bold text-white text-xs">Informed Sport Tested</div>
              <div className="text-[10px] text-slate-500">100% Banned-Substance Free</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <div>
              <div className="font-display font-bold text-white text-xs">Non-GMO Project</div>
              <div className="text-[10px] text-slate-500">Pure Clean Ingredients</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-cyan-400 flex-shrink-0" />
            <div>
              <div className="font-display font-bold text-white text-xs">Cold Micro-Filtered</div>
              <div className="text-[10px] text-slate-500">90%+ Native Protein Purity</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-rose-400 flex-shrink-0" />
            <div>
              <div className="font-display font-bold text-white text-xs">30-Day Taste Guarantee</div>
              <div className="text-[10px] text-slate-500">Love It Or It’s On Us</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-black"
                style={{ backgroundColor: currentFlavor.accentColor }}
              >
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className="font-display font-black text-lg tracking-wider text-white">
                CJ PROTEIN SNACKS
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              cjproteinsnacks — Pioneering hyper-pure athletic nutrition. Engineered with cold-filtered isolate protein, prebiotic fiber, and culinary dessert technology.
            </p>
            <div className="text-[11px] font-mono text-slate-500">
              CJ PROTEIN SNACKS LABS INC. • AUSTIN, TX • LAB BATCH #2026-CJ-PROTO
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><a href="#flavors" className="hover:text-white transition-colors">Flavors</a></li>
              <li><a href="#benefits" className="hover:text-white transition-colors">Performance Benefits</a></li>
              <li><a href="#ingredients" className="hover:text-white transition-colors">Core Anatomy</a></li>
              <li><a href="#nutrition" className="hover:text-white transition-colors">Nutrition Facts</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Shop Bundles</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Athlete Reviews</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
              3D Flavors
            </h4>
            <ul className="space-y-2">
              {['chocolate-fudge', 'peanut-butter', 'cookies-cream', 'salted-caramel'].map((fId) => (
                <li key={fId}>
                  <button
                    onClick={() => {
                      setFlavor(fId as any);
                      scrollToTop();
                    }}
                    className="hover:text-white transition-colors capitalize text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{fId.replace('-', ' ')}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-600" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
              Support & Legal
            </h4>
            <ul className="space-y-2">
              <li><a href="#faq" className="hover:text-white transition-colors">Help & FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Shipment</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Wholesale & Gyms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © 2026 CJ PROTEIN SNACKS LABS (CJPROTEINSNACKS). ALL RIGHTS RESERVED.
          </div>
          <div>
            ENGINEERED WITH REACT + THREE.JS + TAILWIND CSS
          </div>
        </div>
      </div>
    </footer>
  );
};
