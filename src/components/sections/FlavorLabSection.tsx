import React from 'react';
import { useFlavor } from '../../context/FlavorContext';
import { useCart } from '../../context/CartContext';
import { FLAVOR_LIST } from '../../data/flavorData';
import type { FlavorId } from '../../types';
import { ShoppingBag, Sliders } from 'lucide-react';

export const FlavorLabSection: React.FC = () => {
  const { currentFlavor, setFlavor, selectedFlavorId } = useFlavor();
  const { addItem } = useCart();

  const handleAddFlavorToCart = (flavorId: FlavorId) => {
    const flv = FLAVOR_LIST.find((f) => f.id === flavorId) || currentFlavor;
    addItem({
      flavorId: flv.id,
      flavorName: flv.name,
      bundleId: 'box-12',
      bundleName: 'Starter 12-Pack',
      barsCount: 12,
      price: 38.99,
      quantity: 1,
      isSubscription: false,
    });
  };

  return (
    <section id="flavors" className="py-24 relative overflow-hidden bg-[#0A0D14]">
      <div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentFlavor.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 uppercase tracking-widest">
              <Sliders className="w-3.5 h-3.5" style={{ color: currentFlavor.accentColor }} />
              <span>FLAVOR ARCHITECTURE & SENSORY LAB</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              FOUR OBSESSIVELY CRAFTED <br />
              <span
                className="bg-clip-text text-transparent transition-all duration-700"
                style={{
                  backgroundImage: `linear-gradient(135deg, #FFFFFF 20%, ${currentFlavor.accentColor} 90%)`,
                }}
              >
                GOURMET PROFILES.
              </span>
            </h2>
          </div>

          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            Click any flavor to transform the 3D model, examine the macro breakdown, and explore the sensory profile.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {FLAVOR_LIST.map((flv) => {
            const isSelected = flv.id === selectedFlavorId;
            return (
              <button
                key={flv.id}
                onClick={() => setFlavor(flv.id)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  isSelected
                    ? 'bg-[#151B27] border-white/40 shadow-xl scale-[1.02]'
                    : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/20'
                }`}
              >
                {isSelected && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: flv.accentColor }}
                  />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span
                    className="w-3 h-3 rounded-full transition-transform group-hover:scale-125"
                    style={{
                      backgroundColor: flv.accentColor,
                      boxShadow: isSelected ? `0 0 12px ${flv.accentColor}` : 'none',
                    }}
                  />
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase"
                    style={{
                      backgroundColor: `${flv.accentColor}15`,
                      borderColor: `${flv.accentColor}30`,
                      color: flv.accentColor,
                    }}
                  >
                    {flv.badge}
                  </span>
                </div>

                <div className="font-display font-black text-base sm:text-lg text-white mb-1">
                  {flv.name}
                </div>
                <div className="text-xs text-slate-400 line-clamp-1">
                  {flv.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl bg-[#10141E]/90 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span
                className="w-3.5 h-3.5 rounded-full animate-ping"
                style={{ backgroundColor: currentFlavor.accentColor }}
              />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
                ACTIVE FLAVOR SPOTLIGHT
              </span>
            </div>

            <div>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white mb-2">
                {currentFlavor.name}
              </h3>
              <p
                className="text-base font-semibold mb-3"
                style={{ color: currentFlavor.accentColor }}
              >
                {currentFlavor.subtitle}
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentFlavor.description}
              </p>
            </div>

            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                Key Bioactive Ingredients:
              </div>
              <div className="flex flex-wrap gap-2">
                {currentFlavor.ingredients.slice(0, 5).map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => handleAddFlavorToCart(currentFlavor.id)}
                className="px-6 py-3.5 rounded-2xl font-display font-bold text-xs uppercase tracking-wider text-black flex items-center gap-2 transition-all duration-300 hover:brightness-110 active:scale-95 shadow-xl cursor-pointer"
                style={{
                  backgroundColor: currentFlavor.accentColor,
                  boxShadow: `0 0 20px ${currentFlavor.accentGlow}`,
                }}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD 12-PACK TO CART ($38.99)</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('pricing');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold font-display uppercase tracking-wider text-white transition-all cursor-pointer"
              >
                CUSTOMIZE BUNDLE
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 bg-white/[0.02] p-6 sm:p-8 rounded-2xl border border-white/5">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Macro Verification (Per 60g Bar):
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div
                    className="font-display font-black text-xl"
                    style={{ color: currentFlavor.accentColor }}
                  >
                    {currentFlavor.nutrition.protein}G
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Protein</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-display font-black text-xl text-white">
                    {currentFlavor.nutrition.netCarbs}G
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Net Carbs</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-display font-black text-xl text-white">
                    {currentFlavor.nutrition.sugar}G
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Sugar</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-display font-black text-xl text-white">
                    {currentFlavor.nutrition.calories}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Calories</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Sensory Tasting Notes Radar:
              </div>

              {[
                { label: 'Richness & Depth', val: currentFlavor.tastingNotes.richness },
                { label: 'Sweetness Balance', val: currentFlavor.tastingNotes.sweetness },
                { label: 'Crisp Crunch Factor', val: currentFlavor.tastingNotes.crunch },
                { label: 'Chewiness & Density', val: currentFlavor.tastingNotes.chewiness },
              ].map((meter, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300">{meter.label}</span>
                    <span className="font-mono text-slate-400">{meter.val}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${meter.val}%`,
                        backgroundColor: currentFlavor.accentColor,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
