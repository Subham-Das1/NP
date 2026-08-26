import React, { useState, useEffect } from 'react';
import { useFlavor } from '../../context/FlavorContext';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Menu, X, Zap} from 'lucide-react';
import { FLAVOR_LIST } from '../../data/flavorData';

export const Navbar: React.FC = () => {
  const { currentFlavor, setFlavor } = useFlavor();
  const { totalCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#07080B]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-black transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundColor: currentFlavor.accentColor,
                boxShadow: `0 0 20px ${currentFlavor.accentGlow}`,
              }}
            >
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-wider text-white flex items-center gap-1.5">
                CJ PROTEIN SNACKS
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            <button
              onClick={() => scrollToSection('flavors')}
              className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              Flavors
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection('ingredients')}
              className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              Anatomy
            </button>
            <button
              onClick={() => scrollToSection('nutrition')}
              className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              Nutrition
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              Shop Packs
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              Athletes
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.08] transition-all text-white group cursor-pointer"
              title="Open Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
              {totalCount > 0 && (
                <span
                  className="px-1.5 py-0.2 rounded-full text-[11px] font-bold font-mono text-black transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: currentFlavor.accentColor }}
                >
                  {totalCount}
                </span>
              )}
            </button>

            <button
              onClick={() => scrollToSection('pricing')}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-black transition-all duration-300 hover:brightness-110 active:scale-95 shadow-lg cursor-pointer"
              style={{
                backgroundColor: currentFlavor.accentColor,
                boxShadow: `0 0 20px ${currentFlavor.accentGlow}`,
              }}
            >
              <span>SHOP NOW</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#07080B]/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection('flavors')}
                className="text-left py-2 text-base font-semibold text-slate-200 hover:text-white border-b border-white/5"
              >
                Flavors & Profiles
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-left py-2 text-base font-semibold text-slate-200 hover:text-white border-b border-white/5"
              >
                Performance Benefits
              </button>
              <button
                onClick={() => scrollToSection('ingredients')}
                className="text-left py-2 text-base font-semibold text-slate-200 hover:text-white border-b border-white/5"
              >
                Core Anatomy
              </button>
              <button
                onClick={() => scrollToSection('nutrition')}
                className="text-left py-2 text-base font-semibold text-slate-200 hover:text-white border-b border-white/5"
              >
                Nutrition Facts
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-left py-2 text-base font-semibold text-slate-200 hover:text-white border-b border-white/5"
              >
                Shop Bundles
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className="text-left py-2 text-base font-semibold text-slate-200 hover:text-white border-b border-white/5"
              >
                Athlete Reviews
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left py-2 text-base font-semibold text-slate-200 hover:text-white border-b border-white/5"
              >
                FAQ & Guarantee
              </button>
            </div>

            <div className="pt-2">
              <div className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
                Select Active Flavor:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {FLAVOR_LIST.map((flv) => (
                  <button
                    key={flv.id}
                    onClick={() => {
                      setFlavor(flv.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold ${
                      flv.id === currentFlavor.id
                        ? 'bg-white/10 border-white/30 text-white'
                        : 'bg-white/[0.02] border-white/5 text-slate-400'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: flv.accentColor }}
                    />
                    <span className="truncate">{flv.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => scrollToSection('pricing')}
              className="w-full py-3 rounded-xl font-display font-bold text-sm uppercase tracking-wider text-black text-center mt-2 shadow-lg"
              style={{ backgroundColor: currentFlavor.accentColor }}
            >
              EXPLORE BUNDLES & BUY
            </button>
          </div>
        )}
      </header>
    </>
  );
};
