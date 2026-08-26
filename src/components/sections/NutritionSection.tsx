import React, { useState } from 'react';
import { useFlavor } from '../../context/FlavorContext';
import { COMPARISON_DATA } from '../../data/bundleData';
import { Activity, Check, X, Scale } from 'lucide-react';

export const NutritionSection: React.FC = () => {
  const { currentFlavor } = useFlavor();
  const [servingMode, setServingMode] = useState<'single' | 'box'>('single');

  const multiplier = servingMode === 'single' ? 1 : 12;
  const n = currentFlavor.nutrition;

  return (
    <section id="nutrition" className="py-24 relative overflow-hidden bg-[#0A0D14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5" style={{ color: currentFlavor.accentColor }} />
            <span>CLINICALLY FORMULATED MACROS</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            TRANSPARENT NUTRITION. <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, #FFFFFF 30%, ${currentFlavor.accentColor} 100%)`,
              }}
            >
              ZERO HIDDEN GIMMICKS.
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            Every gram accounted for. Clean, micro-filtered protein without the digestive sabotage of cheap fillers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-white text-black p-6 sm:p-8 rounded-3xl shadow-2xl font-sans border-4 border-black">
            <div className="flex items-center justify-between border-b-8 border-black pb-2 mb-2">
              <h3 className="font-black text-3xl sm:text-4xl tracking-tight leading-none">
                Nutrition Facts
              </h3>
              <div className="flex gap-1 bg-neutral-100 p-1 rounded-lg border border-neutral-300">
                <button
                  onClick={() => setServingMode('single')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                    servingMode === 'single' ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  1 Bar (60g)
                </button>
                <button
                  onClick={() => setServingMode('box')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                    servingMode === 'box' ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  12-Box
                </button>
              </div>
            </div>

            <div className="text-sm font-semibold text-neutral-800 pb-1">
              Serving size: <span className="font-bold">{servingMode === 'single' ? '1 Bar (60g)' : '12 Bars (720g)'}</span>
            </div>
            <div className="text-xs text-neutral-600 pb-3 border-b-4 border-black">
              Flavor: <span className="font-bold uppercase text-black">{currentFlavor.name}</span>
            </div>

            <div className="flex items-baseline justify-between py-2 border-b-8 border-black">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">Amount per serving</span>
                <div className="font-black text-4xl leading-none">Calories</div>
              </div>
              <div className="font-black text-5xl tracking-tight">
                {n.calories * multiplier}
              </div>
            </div>

            <div className="text-right text-[11px] font-bold py-1 border-b border-black">
              % Daily Value*
            </div>

            <div className="divide-y divide-neutral-300 text-sm">
              <div className="flex justify-between py-1.5 font-bold">
                <span>Total Fat {(n.fat * multiplier).toFixed(1)}g</span>
                <span>{Math.round((n.fat * multiplier * 100) / 78)}%</span>
              </div>
              <div className="flex justify-between py-1 pl-4 text-xs">
                <span>Saturated Fat {(2.5 * multiplier).toFixed(1)}g</span>
                <span className="font-bold">{Math.round((2.5 * multiplier * 100) / 20)}%</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span>Sodium {(140 * multiplier)}mg</span>
                <span>{Math.round((140 * multiplier * 100) / 2300)}%</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span>Total Carbohydrate {(n.totalCarbs * multiplier)}g</span>
                <span>{Math.round((n.totalCarbs * multiplier * 100) / 275)}%</span>
              </div>
              <div className="flex justify-between py-1 pl-4 text-xs font-medium">
                <span>Dietary Prebiotic Fiber {(n.fiber * multiplier)}g</span>
                <span className="font-bold">{Math.round((n.fiber * multiplier * 100) / 28)}%</span>
              </div>
              <div className="flex justify-between py-1 pl-4 text-xs font-medium">
                <span>Total Sugars {(n.sugar * multiplier)}g</span>
                <span></span>
              </div>
              <div className="flex justify-between py-1 pl-8 text-xs text-neutral-700 italic">
                <span>Includes 0g Added Sugars</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="flex justify-between py-1 pl-4 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 rounded">
                <span>Net Impact Carbs {(n.netCarbs * multiplier).toFixed(1)}g</span>
                <span className="font-mono uppercase font-black">Keto Clean</span>
              </div>
              <div className="flex justify-between py-2 font-black text-base border-t-8 border-black">
                <span>Protein {(n.protein * multiplier)}g</span>
                <span>{Math.round((n.protein * multiplier * 100) / 50)}%</span>
              </div>
              <div className="flex justify-between py-1.5 text-xs text-neutral-700 font-medium">
                <span>Branched Chain Amino Acids (BCAAs)</span>
                <span className="font-bold">{(n.bcaa * multiplier).toFixed(1)}g</span>
              </div>
            </div>

            <div className="pt-3 border-t-4 border-black text-[10px] text-neutral-500 leading-tight">
              * The % Daily Value tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
            </div>
          </div>

          <div className="lg:col-span-7 rounded-3xl bg-[#111521] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span
                  className="text-xs font-mono font-bold tracking-widest uppercase"
                  style={{ color: currentFlavor.accentColor }}
                >
                  // INDUSTRY BENCHMARK
                </span>
                <h3 className="font-display font-black text-2xl text-white mt-1">
                  CJ Protein Snacks vs Legacy Brands
                </h3>
              </div>
              <Scale className="w-6 h-6 text-slate-400" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-[11px]">
                    <th className="pb-3 pr-4">Attribute</th>
                    <th className="pb-3 px-3 text-white font-bold" style={{ color: currentFlavor.accentColor }}>
                      CJ PROTEIN SNACKS
                    </th>
                    <th className="pb-3 pl-3 text-slate-500">
                      Standard Protein Bar
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {COMPARISON_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 pr-4 font-semibold text-slate-300">
                        {row.metric}
                      </td>
                      <td className="py-3.5 px-3 font-bold text-white flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{row.aether}</span>
                      </td>
                      <td className="py-3.5 pl-3 text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                          <span>{row.traditional}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-slate-400 leading-relaxed">
              💡 <strong className="text-slate-200">Zero Maltitol Guarantee:</strong> Most commercial "low sugar" bars rely heavily on cheap maltitol syrup, which has a glycemic index similar to regular table sugar and causes severe abdominal discomfort. CJ Protein Snacks uses 100% all-natural monkfruit extract and organic prebiotic plant fiber.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
