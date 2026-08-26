import React from 'react';
import { ProteinBarCanvas } from '../3d/ProteinBarCanvas';
import { useFlavor } from '../../context/FlavorContext';
import { useCart } from '../../context/CartContext';
import { ArrowRight, Sparkles, Shield, Flame, Award, ChevronDown } from 'lucide-react';
import { FLAVOR_LIST } from '../../data/flavorData';

export const HeroSection: React.FC = () => {
  const { currentFlavor, setFlavor } = useFlavor();
  const { addItem } = useCart();

  const handleQuickShop = () => {
    addItem({
      flavorId: currentFlavor.id,
      flavorName: currentFlavor.name,
      bundleId: 'box-12',
      bundleName: 'Starter 12-Pack',
      barsCount: 12,
      price: 38.99,
      quantity: 1,
      isSubscription: false,
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden">
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[140px] opacity-25 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: currentFlavor.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-md transition-colors duration-500"
              style={{
                backgroundColor: `${currentFlavor.accentColor}15`,
                borderColor: `${currentFlavor.accentColor}40`,
              }}
            >
              <Sparkles
                className="w-4 h-4"
                style={{ color: currentFlavor.accentColor }}
              />
              <span
                className="text-xs font-mono font-bold tracking-wider uppercase"
                style={{ color: currentFlavor.accentColor }}
              >
                NEXT-GEN BIOAVAILABLE PERFORMANCE
              </span>
            </div>

            <h1 className="font-display font-black text-5xl sm:text-6xl xl:text-7xl tracking-tight text-white leading-[1.05]">
              FUEL YOUR <br />
              <span
                className="bg-clip-text text-transparent transition-all duration-700 inline-block"
                style={{
                  backgroundImage: `linear-gradient(135deg, #FFFFFF 20%, ${currentFlavor.accentColor} 90%)`,
                }}
              >
                NEXT LEVEL.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-lg leading-relaxed">
              20g of protein. Incredible taste. Zero compromise.
            </p>

            <div className="grid grid-cols-3 gap-3 w-full max-w-md py-2">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                <div
                  className="font-display font-black text-2xl"
                  style={{ color: currentFlavor.accentColor }}
                >
                  20G
                </div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  ISOLATE WHEY
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                <div className="font-display font-black text-2xl text-white">
                  0G
                </div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  ADDED SUGAR
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                <div className="font-display font-black text-2xl text-white">
                  3G
                </div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  NET CARBS
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={handleQuickShop}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-display font-black text-sm uppercase tracking-wider text-black flex items-center justify-center gap-3 transition-all duration-300 hover:brightness-110 active:scale-95 shadow-xl group cursor-pointer"
                style={{
                  backgroundColor: currentFlavor.accentColor,
                  boxShadow: `0 0 30px ${currentFlavor.accentGlow}`,
                }}
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection('flavors')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-display font-bold text-sm uppercase tracking-wider text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 backdrop-blur-md transition-all active:scale-95 text-center cursor-pointer"
              >
                EXPLORE FLAVORS
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>NON-GMO</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>INFORMED SPORT</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-cyan-400" />
                <span>KETO CLEAN</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: currentFlavor.accentColor }}
                />
                <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  ACTIVE 3D PRODUCT: {currentFlavor.name}
                </span>
              </div>
              <span
                className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase"
                style={{
                  backgroundColor: `${currentFlavor.accentColor}15`,
                  borderColor: `${currentFlavor.accentColor}40`,
                  color: currentFlavor.accentColor,
                }}
              >
                {currentFlavor.badge}
              </span>
            </div>

            <div className="relative p-2 ">
              <ProteinBarCanvas />
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FLAVOR_LIST.map((flv) => {
                const isSelected = flv.id === currentFlavor.id;
                return (
                  <button
                    key={flv.id}
                    onClick={() => setFlavor(flv.id)}
                    className={`p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-white/10 border-white/40 shadow-lg scale-[1.02]'
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: flv.accentColor,
                          boxShadow: isSelected ? `0 0 8px ${flv.accentColor}` : 'none',
                        }}
                      />
                      <span className="text-[10px] font-mono text-slate-400">FLAVOR</span>
                    </div>
                    <div className="font-display font-bold text-xs text-white truncate">
                      {flv.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex justify-center mt-12">
        <button
          onClick={() => scrollToSection('benefits')}
          className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-white transition-colors cursor-pointer"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">DISCOVER ARCHITECTURE</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
