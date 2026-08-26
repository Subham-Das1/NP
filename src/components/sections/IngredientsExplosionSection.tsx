import React, { useState } from 'react';
import { useFlavor } from '../../context/FlavorContext';
import { BAR_LAYERS } from '../../data/bundleData';
import { Layers, Sparkles, Zap, Flame, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const IngredientsExplosionSection: React.FC = () => {
  const { currentFlavor } = useFlavor();
  const [activeLayer, setActiveLayer] = useState(1);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return Sparkles;
      case 'Zap':
        return Zap;
      case 'Flame':
        return Flame;
      case 'ShieldCheck':
      default:
        return ShieldCheck;
    }
  };

  const selectedLayerData = BAR_LAYERS.find((l) => l.layerNumber === activeLayer) || BAR_LAYERS[0];
  const IconComponent = getIcon(selectedLayerData.iconName);

  return (
    <section id="ingredients" className="py-24 relative overflow-hidden bg-[#07080B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" style={{ color: currentFlavor.accentColor }} />
            <span>TRANSPARENT PRODUCT ARCHITECTURE</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            DECONSTRUCTING <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, #FFFFFF 30%, ${currentFlavor.accentColor} 100%)`,
              }}
            >
              THE ANATOMY OF EXCELLENCE.
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            Every layer serves a biological purpose: instant amino availability, digestive harmony, and extraordinary texture.
          </p>
        </div>

        {/* Interactive Layer Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Layer Selector Stack (Left) */}
          <div className="lg:col-span-5 space-y-3">
            {BAR_LAYERS.map((layer) => {
              const isCurrent = layer.layerNumber === activeLayer;
              const LayerIcon = getIcon(layer.iconName);

              return (
                <button
                  key={layer.layerNumber}
                  onClick={() => setActiveLayer(layer.layerNumber)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isCurrent
                      ? 'bg-[#141926] border-white/30 shadow-xl'
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/15'
                  }`}
                  style={{
                    borderColor: isCurrent ? currentFlavor.accentColor : undefined,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: isCurrent ? currentFlavor.accentColor : 'rgba(255,255,255,0.05)',
                        color: isCurrent ? '#000000' : '#FFFFFF',
                      }}
                    >
                      0{layer.layerNumber}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-white">
                        {layer.name}
                      </h4>
                      <p className="text-xs text-slate-400">{layer.tagline}</p>
                    </div>
                  </div>

                  <LayerIcon
                    className="w-5 h-5 transition-colors"
                    style={{ color: isCurrent ? currentFlavor.accentColor : '#64748B' }}
                  />
                </button>
              );
            })}
          </div>

          {/* Layer Detailed Deep Dive (Right) */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-[#121622] to-[#0A0D15] border border-white/10 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Aura */}
            <div
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[120px] opacity-20 pointer-events-none"
              style={{ backgroundColor: currentFlavor.accentColor }}
            />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-white/10 text-white">
                    LAYER 0{selectedLayerData.layerNumber} OF 04
                  </span>
                  <span
                    className="text-xs font-mono font-bold uppercase tracking-wider"
                    style={{ color: currentFlavor.accentColor }}
                  >
                    // {selectedLayerData.tagline}
                  </span>
                </div>

                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                  style={{
                    backgroundColor: `${currentFlavor.accentColor}20`,
                    borderColor: `${currentFlavor.accentColor}40`,
                  }}
                >
                  <IconComponent
                    className="w-6 h-6"
                    style={{ color: currentFlavor.accentColor }}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-3">
                  {selectedLayerData.name}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedLayerData.description}
                </p>
              </div>

              {/* Functional Advantage Callout Card */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3.5">
                <CheckCircle2
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: currentFlavor.accentColor }}
                />
                <div>
                  <div className="text-xs font-mono uppercase text-slate-400 font-bold mb-0.5">
                    PHYSIOLOGICAL & METABOLIC BENEFIT:
                  </div>
                  <div className="text-sm font-medium text-white">
                    {selectedLayerData.macroBenefit}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
