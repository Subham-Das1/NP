export type FlavorId = 'chocolate-fudge' | 'peanut-butter' | 'cookies-cream' | 'salted-caramel';

export interface FlavorInfo {
  id: FlavorId;
  name: string;
  subtitle: string;
  tagline: string;
  badge: string;
  description: string;
  accentColor: string; // Hex color for primary UI
  accentSecondary: string;
  accentGlow: string; // rgba
  foilBgColor: string; // For 3D wrapper
  foilAccentColor: string;
  textColor: string;
  nutrition: {
    calories: number;
    protein: number; // in grams
    netCarbs: number;
    totalCarbs: number;
    fiber: number;
    sugar: number;
    fat: number;
    bcaa: number;
  };
  tastingNotes: {
    richness: number; // 1-100
    sweetness: number;
    crunch: number;
    chewiness: number;
  };
  ingredients: string[];
  allergens: string[];
  keyHighlights: string[];
  packagingText: {
    topCode: string;
    mainTitle: string;
    subTitle: string;
    flavorBadge: string;
  };
}

export interface BundleOption {
  id: string;
  name: string;
  barsCount: number;
  boxesCount: number;
  oneTimePrice: number;
  subscriptionPrice: number;
  badge?: string;
  savingsPercentage: number;
  popular?: boolean;
  perks: string[];
}

export interface CartItem {
  id: string;
  flavorId: FlavorId;
  flavorName: string;
  bundleId: string;
  bundleName: string;
  barsCount: number;
  price: number;
  quantity: number;
  isSubscription: boolean;
  frequencyMonths?: number;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  achievement: string;
  avatar: string;
  rating: number;
  flavorFav: FlavorId;
  review: string;
  verifiedBuyer: boolean;
  date: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'nutrition' | 'shipping' | 'taste' | 'ingredients';
}

export interface LayerIngredient {
  layerNumber: number;
  name: string;
  tagline: string;
  description: string;
  macroBenefit: string;
  iconName: string;
}
