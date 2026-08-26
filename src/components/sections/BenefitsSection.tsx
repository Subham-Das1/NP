import React from 'react';
import { useFlavor } from '../../context/FlavorContext';
import { Zap, ShieldCheck, Flame, Brain, Sparkles, HeartPulse, ArrowUpRight } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const { currentFlavor } = useFlavor();

  const benefits = [
    {
      icon: Zap,
      badge: 'BIOAVAILABILITY',
      title: '100% Cold-Filtered Whey Isolate',
      description: 'Micro-filtered at sub-ambient temperatures to preserve intact native immunoglobulins. Absorbs in minutes with zero lactose intolerance or heavy stomach load.',
      stat: '20G',
      statLabel: 'Pure Isolate / Bar',
      colSpan: 'lg:col-span-8',
    },
    {
      icon: ShieldCheck,
      badge: 'METABOLIC HEALTH',
      title: 'Zero Sugar & Clean Keto Matrix',
      description: 'Sweetened exclusively with organic monkfruit extract and allulose. Zero glycemic index spikes, zero insulin crashes.',
      stat: '0G',
      statLabel: 'Added Sugar',
      colSpan: 'lg:col-span-4',
    },
    {
      icon: Flame,
      badge: 'MUSCLE SYNTHESIS',
      title: '4.6g Naturally Occurring BCAAs',
      description: 'Rich in L-Leucine, L-Isoleucine, and L-Valine at the optimal 2:1:1 ratio to ignite mTOR signaling and accelerate muscular repair.',
      stat: '4.6G',
      statLabel: 'Intact BCAAs',
      colSpan: 'lg:col-span-4',
    },
    {
      icon: HeartPulse,
      badge: 'DIGESTIVE EASE',
      title: 'Prebiotic Bio-Fiber Foundation',
      description: '100% plant-derived soluble tapioca fiber nourishes healthy gut bacteria. Zero bloating maltitol or cheap polyols.',
      stat: '12G',
      statLabel: 'Gut-Friendly Fiber',
      colSpan: 'lg:col-span-4',
    },
    {
      icon: Brain,
      badge: 'COGNITIVE FOCUS',
      title: 'Functional Nootropics Infusion',
      description: 'Formulated with organic Lion’s Mane mushroom and KSM-66 Ashwagandha to promote mental sharpness and post-workout calm.',
      stat: '500MG',
      statLabel: 'Active Nootropics',
      colSpan: 'lg:col-span-4',
    },
  ];

  return (
    <section id="benefits" className="py-24 relative overflow-hidden bg-[#07080B]">
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" style={{ color: currentFlavor.accentColor }} />
            <span>UNCOMPROMISED PHYSIOLOGY</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            ENGINEERED FOR <br className="hidden sm:inline" />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, #FFFFFF 30%, ${currentFlavor.accentColor} 100%)`,
              }}
            >
              PEAK ATHLETIC SUPREMACY.
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            We tore down traditional protein bar recipes and rebuilt every molecule from scratch. No chalky fillers, no chemical sugar alcohols, no shortcuts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {benefits.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className={`${item.colSpan} relative rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-[#111520]/80 to-[#0A0D14]/80 border border-white/[0.08] hover:border-white/20 transition-all duration-500 group overflow-hidden`}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top left, ${currentFlavor.accentColor} 0%, transparent 70%)`,
                  }}
                />

                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${currentFlavor.accentColor}15`,
                      borderColor: `${currentFlavor.accentColor}40`,
                    }}
                  >
                    <IconComponent
                      className="w-6 h-6"
                      style={{ color: currentFlavor.accentColor }}
                    />
                  </div>

                  <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                    {item.badge}
                  </span>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3 group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-baseline justify-between">
                    <div>
                      <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                        {item.stat}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 tracking-wide uppercase">
                        {item.statLabel}
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
