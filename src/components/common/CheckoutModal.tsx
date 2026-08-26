import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useFlavor } from '../../context/FlavorContext';
import { X, ShieldCheck, CreditCard, Lock, Truck, PackageCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    items,
    finalTotal,
    clearCart,
  } = useCart();
  const { currentFlavor } = useFlavor();

  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: 'Alex Mercer',
    email: 'alex.mercer@athletic.com',
    address: '742 Evergreen Terrace',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    paymentMethod: 'card',
  });

  if (!isCheckoutModalOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    setTimeout(() => {
      setStep('success');
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E69D45', '#F59E0B', '#38BDF8', '#FFFFFF', '#10B981'],
      });
      clearCart();
    }, 1500);
  };

  const handleClose = () => {
    setIsCheckoutModalOpen(false);
    setStep('form');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-lg rounded-3xl bg-[#0D111A] border border-white/15 shadow-2xl p-6 sm:p-8 z-10">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentFlavor.accentColor }} />
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                SECURE FAST CHECKOUT
              </span>
            </div>
            <h3 className="font-display font-black text-2xl text-white mb-6">
              Complete Your Order
            </h3>

            <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Order Total ({items.length} items)</div>
                <div className="font-display font-black text-xl text-white">
                  ${finalTotal.toFixed(2)}
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <Truck className="w-3.5 h-3.5" /> Fast Dispatch
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Shipping Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Zip Code</label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-medium text-slate-400 mb-2">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      formData.paymentMethod === 'card'
                        ? 'bg-white/15 border-amber-400 text-white'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" /> Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'apple' })}
                    className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      formData.paymentMethod === 'apple'
                        ? 'bg-white/15 border-amber-400 text-white'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    Apple Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'google' })}
                    className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      formData.paymentMethod === 'google'
                        ? 'bg-white/15 border-amber-400 text-white'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    Google Pay
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-4 rounded-2xl font-display font-bold text-sm uppercase tracking-wider text-black flex items-center justify-center gap-2 transition-all duration-300 hover:brightness-110 active:scale-95 shadow-xl cursor-pointer"
                style={{
                  backgroundColor: currentFlavor.accentColor,
                  boxShadow: `0 0 25px ${currentFlavor.accentGlow}`,
                }}
              >
                <Lock className="w-4 h-4" />
                <span>PAY ${finalTotal.toFixed(2)} & SHIP ORDER</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted 256-Bit Sandbox Simulation • Instant Confirmation</span>
              </div>
            </form>
          </div>
        )}

        {step === 'processing' && (
          <div className="py-16 text-center space-y-4">
            <div
              className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin mx-auto"
              style={{
                borderColor: `${currentFlavor.accentColor}30`,
                borderTopColor: currentFlavor.accentColor,
              }}
            />
            <h4 className="font-display font-bold text-xl text-white">
              Processing Your Order...
            </h4>
            <p className="text-xs text-slate-400">
              Allocating fresh protein inventory & generating tracking manifest.
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-8 text-center space-y-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto text-black"
              style={{
                backgroundColor: currentFlavor.accentColor,
                boxShadow: `0 0 35px ${currentFlavor.accentGlow}`,
              }}
            >
              <PackageCheck className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
                ORDER #AETH-2026-X84 CONFIRMED
              </span>
              <h3 className="font-display font-black text-2xl text-white mt-1">
                Fuel Is On Its Way!
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. A confirmation email with cold-chain tracking has been dispatched to <strong>{formData.email}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Shipping Carrier:</span>
                <span className="text-white font-medium">FedEx Priority Cold-Chain</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Arrival:</span>
                <span className="text-emerald-400 font-bold">In 2 Business Days</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Taste Guarantee:</span>
                <span className="text-white font-medium">100% Protected for 30 Days</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-black transition-all cursor-pointer"
              style={{ backgroundColor: currentFlavor.accentColor }}
            >
              CONTINUE EXPLORING
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
