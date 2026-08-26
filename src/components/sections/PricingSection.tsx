import React, { useState } from 'react';
import { useFlavor } from '../../context/FlavorContext';
import { useCart } from '../../context/CartContext';
import { BUNDLE_OPTIONS } from '../../data/bundleData';
import { FLAVOR_LIST } from '../../data/flavorData';
import type { FlavorId } from '../../types';
import { Check, ShoppingBag, ShieldCheck, Gift } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { currentFlavor, setFlavor } = useFlavor();
  const { addItem } = useCart();

  const [selectedBundleId, setSelectedBundleId] = useState('box-24');
  const [isSubscription, setIsSubscription] = useState(true);
  const [selectedFlavors, setSelectedFlavors] = useState<FlavorId[]>([
    'chocolate-fudge',
    'peanut-butter',
  ]);

  const selectedBundle = BUNDLE_OPTIONS.find((b) => b.id === selectedBundleId) || BUNDLE_OPTIONS[1];
  const price = isSubscription ? selectedBundle.subscriptionPrice : selectedBundle.oneTimePrice;

  const handleAddToCart = () => {
    const primaryFlavor = FLAVOR_LIST.find((f) => f.id === selectedFlavors[0]) || currentFlavor;

    addItem({
      flavorId: primaryFlavor.id,
      flavorName: selectedBundle.boxesCount > 1 ? `${primaryFlavor.name} (Custom Mix)` : primaryFlavor.name,
      bundleId: selectedBundle.id,
      bundleName: selectedBundle.name,
      barsCount: selectedBundle.barsCount,
      price: price,
      quantity: 1,
      isSubscription: isSubscription,
    });
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#07080B]">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] opacity-15 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentFlavor.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 uppercase tracking-widest">
            <Gift className="w-3.5 h-3.5" style={{ color: currentFlavor.accentColor }} />
            <span>DIRECT-TO-ATHLETE PRICING</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            CHOOSE YOUR FUEL SUPPLY. <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, #FFFFFF 30%, ${currentFlavor.accentColor} 100%)`,
              }}
            >
              SAVE UP TO 35% TODAY.
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            Guaranteed fresh batches shipped directly from our temperature-controlled facility.
          </p>

          <div className="pt-4 flex items-center justify-center">
            <div className="p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-1 backdrop-blur-md">
              <button
                onClick={() => setIsSubscription(true)}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSubscription
                    ? 'bg-white/15 text-white shadow-md border border-white/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Subscribe & Save (20% OFF)</span>
                <span className="text-[10px] font-mono font-black text-black bg-emerald-400 px-1.5 py-0.2 rounded-full">
                  FREE SHIP
                </span>
              </button>
              <button
                onClick={() => setIsSubscription(false)}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  !isSubscription
                    ? 'bg-white/15 text-white shadow-md border border-white/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                One-Time Purchase
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {BUNDLE_OPTIONS.map((bundle) => {
            const isSelected = bundle.id === selectedBundleId;
            const currentPrice = isSubscription ? bundle.subscriptionPrice : bundle.oneTimePrice;
            const currentPerBar = currentPrice / bundle.barsCount;

            return (
              <div
                key={bundle.id}
                onClick={() => setSelectedBundleId(bundle.id)}
                className={`rounded-3xl p-6 sm:p-8 border transition-all duration-300 relative flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#121724] border-white/40 shadow-2xl scale-[1.02]'
                    : 'bg-[#0A0E17]/80 border-white/[0.08] hover:bg-white/[0.03] hover:border-white/20'
                }`}
                style={{
                  borderColor: isSelected ? currentFlavor.accentColor : undefined,
                  boxShadow: isSelected ? `0 0 40px -10px ${currentFlavor.accentGlow}` : undefined,
                }}
              >
                {bundle.badge && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full font-mono text-[10px] font-black tracking-widest uppercase text-black shadow-lg"
                    style={{ backgroundColor: currentFlavor.accentColor }}
                  >
                    {bundle.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-black text-xl text-white">
                      {bundle.name}
                    </h3>
                    <span className="text-xs font-mono text-slate-400 font-bold">
                      {bundle.barsCount} BARS
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-display font-black text-4xl text-white">
                      ${currentPrice.toFixed(2)}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      (${currentPerBar.toFixed(2)}/bar)
                    </span>
                  </div>

                  <ul className="space-y-2.5 pt-4 border-t border-white/5 text-xs text-slate-300">
                    {bundle.perks.map((perk, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: currentFlavor.accentColor }}
                        />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5">
                  <div
                    className={`w-full py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-center transition-all ${
                      isSelected
                        ? 'text-black font-black'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                    style={{
                      backgroundColor: isSelected ? currentFlavor.accentColor : undefined,
                    }}
                  >
                    {isSelected ? 'SELECTED BUNDLE' : 'SELECT BUNDLE'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-3xl bg-[#0F131E] border border-white/10 p-6 sm:p-8 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentFlavor.accentColor }} />
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                CUSTOMIZE FLAVORS FOR: {selectedBundle.name}
              </span>
            </div>
            <h4 className="font-display font-black text-xl text-white">
              Choose your box combination:
            </h4>
            <p className="text-xs text-slate-400">
              Select flavors for your pack. 3D model above previews your primary chosen flavor.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {FLAVOR_LIST.map((flv) => {
                const isCurrent = flv.id === currentFlavor.id;
                return (
                  <button
                    key={flv.id}
                    onClick={() => {
                      setFlavor(flv.id);
                      setSelectedFlavors([flv.id]);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-white/15 border-white/40 text-white font-bold'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: flv.accentColor }} />
                      <span className="truncate">{flv.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full lg:w-auto flex-shrink-0 flex flex-col items-center lg:items-end space-y-3">
            <div className="text-right">
              <div className="text-xs font-mono text-slate-400">TOTAL WITH PROMO SAVINGS:</div>
              <div className="font-display font-black text-3xl sm:text-4xl text-white">
                ${price.toFixed(2)}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl font-display font-black text-sm uppercase tracking-wider text-black flex items-center justify-center gap-3 transition-all duration-300 hover:brightness-110 active:scale-95 shadow-xl cursor-pointer"
              style={{
                backgroundColor: currentFlavor.accentColor,
                boxShadow: `0 0 30px ${currentFlavor.accentGlow}`,
              }}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO CART • ${price.toFixed(2)}</span>
            </button>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>30-Day No-Questions-Asked Taste Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
