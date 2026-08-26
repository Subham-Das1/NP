import React from 'react';
import { FlavorProvider } from './context/FlavorContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/common/Navbar';
import { CartDrawer } from './components/common/CartDrawer';
import { CheckoutModal } from './components/common/CheckoutModal';
import { HeroSection } from './components/sections/HeroSection';
import { BenefitsSection } from './components/sections/BenefitsSection';
import { FlavorLabSection } from './components/sections/FlavorLabSection';
import { IngredientsExplosionSection } from './components/sections/IngredientsExplosionSection';
import { NutritionSection } from './components/sections/NutritionSection';
import { PricingSection } from './components/sections/PricingSection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { FaqSection } from './components/sections/FaqSection';
import { CtaSection } from './components/sections/CtaSection';
import { Footer } from './components/sections/Footer';

export const AppContent: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#07080B] text-slate-100 overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <HeroSection />
        <BenefitsSection />
        <FlavorLabSection />
        <IngredientsExplosionSection />
        <NutritionSection />
        <PricingSection />
        <ReviewsSection />
        <FaqSection />
        <CtaSection />
      </main>

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <CheckoutModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <FlavorProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </FlavorProvider>
  );
}

export default App;
