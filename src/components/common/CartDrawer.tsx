import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useFlavor } from '../../context/FlavorContext';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { FLAVORS } from '../../data/flavorData';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    finalTotal,
    discountPercent,
    promoCode,
    promoError,
    applyPromoCode,
    removePromoCode,
    freeShippingThreshold,
    amountUntilFreeShipping,
    setIsCheckoutModalOpen,
  } = useCart();

  const { currentFlavor } = useFlavor();
  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      const success = applyPromoCode(promoInput);
      if (success) setPromoInput('');
    }
  };

  const freeShippingProgress = Math.min(100, Math.max(0, ((freeShippingThreshold - amountUntilFreeShipping) / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0C0F17] border-l border-white/10 shadow-2xl flex flex-col">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-lg text-white">YOUR CART</h2>
              <span
                className="text-xs font-mono font-bold px-2 py-0.5 rounded-full text-black"
                style={{ backgroundColor: currentFlavor.accentColor }}
              >
                {items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-white/[0.02] border-b border-white/5 px-5 py-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-300 font-medium">
                {amountUntilFreeShipping === 0 ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> FREE EXPEDITED SHIPPING UNLOCKED!
                  </span>
                ) : (
                  <span>Add <strong className="text-white">${amountUntilFreeShipping.toFixed(2)}</strong> for FREE Shipping</span>
                )}
              </span>
              <span className="font-mono text-slate-400 text-[11px]">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${freeShippingProgress}%`,
                  backgroundColor: currentFlavor.accentColor,
                }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-500">
                  <Tag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-white font-bold text-base mb-1">Your cart is empty</p>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Choose your favorite hyper-fuel flavors and start elevating your daily macros.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-display font-bold text-xs uppercase text-black cursor-pointer"
                  style={{ backgroundColor: currentFlavor.accentColor }}
                >
                  SHOP FLAVORS
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemFlavor = FLAVORS[item.flavorId] || currentFlavor;
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex gap-3 relative group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center border"
                      style={{
                        backgroundColor: `${itemFlavor.accentColor}15`,
                        borderColor: `${itemFlavor.accentColor}40`,
                      }}
                    >
                      <span
                        className="w-4 h-4 rounded-full shadow-lg"
                        style={{ backgroundColor: itemFlavor.accentColor }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-display font-bold text-sm text-white truncate">
                            {itemFlavor.name}
                          </h4>
                          <p className="text-[11px] font-mono text-slate-400">
                            {item.bundleName} ({item.barsCount} Bars)
                          </p>
                          {item.isSubscription && (
                            <span className="inline-block mt-0.5 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                              Subscribe & Save
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-bold text-white px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="font-display font-bold text-sm text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <div className="text-[10px] font-mono text-slate-400">
                            ${(item.price / item.barsCount).toFixed(2)}/bar
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {items.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-[#090C12] space-y-4">
              {discountPercent > 0 ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <Tag className="w-4 h-4" />
                    <span>Coupon <strong>{promoCode}</strong> applied ({discountPercent}% OFF)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-xs text-red-400 hover:underline font-medium cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. NEXTLEVEL20)"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && <p className="text-[11px] text-amber-400 mt-1">{promoError}</p>}

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className="font-mono text-white">
                    {shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline text-white">
                  <span className="font-display font-bold text-base">Total</span>
                  <span className="font-display font-black text-xl text-white">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutModalOpen(true);
                }}
                className="w-full py-3.5 rounded-xl font-display font-bold text-sm uppercase tracking-wider text-black flex items-center justify-center gap-2 transition-all duration-300 hover:brightness-110 active:scale-95 shadow-xl cursor-pointer"
                style={{
                  backgroundColor: currentFlavor.accentColor,
                  boxShadow: `0 0 25px ${currentFlavor.accentGlow}`,
                }}
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit SSL Encrypted • 30-Day Taste Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
