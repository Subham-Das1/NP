import React, { useState } from 'react';
import { useFlavor } from '../../context/FlavorContext';
import { useCart } from '../../context/CartContext';
import { ArrowRight, Check, Copy, Zap } from 'lucide-react';

export const CtaSection: React.FC = () => {
  const { currentFlavor } = useFlavor();
  const { applyPromoCode } = useCart();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      applyPromoCode('NEXTLEVEL20');
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('NEXTLEVEL20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#0A0D14]">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-1000"
        style={{
          background: `radial-gradient(ellipse at center, ${currentFlavor.accentGlow} 0%, rgba(7, 8, 11, 0) 70%)`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#141926] to-[#0D1018] border border-white/15 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5" style={{ color: currentFlavor.accentColor }} />
            <span>JOIN OVER 14,000+ HIGH-PERFORMANCE ATHLETES</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight max-w-2xl mx-auto">
            READY TO FUEL YOUR <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, #FFFFFF 20%, ${currentFlavor.accentColor} 100%)`,
              }}
            >
              HIGHEST POTENTIAL?
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Upgrade your daily nutrition with 20g isolate protein and zero sugar crash. Claim 20% off your initial order today.
          </p>

          <div className="max-w-md mx-auto">
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for 20% OFF..."
                  className="flex-1 bg-white/5 border border-white/15 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl font-display font-bold text-xs uppercase tracking-wider text-black flex items-center justify-center gap-2 transition-all duration-300 hover:brightness-110 active:scale-95 shadow-xl cursor-pointer"
                  style={{
                    backgroundColor: currentFlavor.accentColor,
                    boxShadow: `0 0 20px ${currentFlavor.accentGlow}`,
                  }}
                >
                  <span>CLAIM 20%</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-bold font-mono">
                  <Check className="w-4 h-4" /> 20% DISCOUNT APPLIED TO YOUR CART!
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono font-black text-lg text-white tracking-widest bg-black/40 px-3 py-1 rounded-xl border border-white/10">
                    NEXTLEVEL20
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={scrollToPricing}
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
            >
              <span>OR JUMP DIRECTLY TO BUNDLES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
