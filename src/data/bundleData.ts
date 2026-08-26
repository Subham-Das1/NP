import type { BundleOption, Testimonial, FaqItem, LayerIngredient } from '../types';

export const BUNDLE_OPTIONS: BundleOption[] = [
  {
    id: 'box-12',
    name: 'Starter 12-Pack',
    barsCount: 12,
    boxesCount: 1,
    oneTimePrice: 38.99,
    subscriptionPrice: 31.19,
    savingsPercentage: 20,
    perks: [
      '1 Box (12 Protein Bars)',
      'Single Flavor Choice',
      'Free Carbon-Neutral Shipping over $50',
      '100% Taste Guarantee',
    ],
  },
  {
    id: 'box-24',
    name: 'Athlete 24-Pack',
    barsCount: 24,
    boxesCount: 2,
    oneTimePrice: 68.99,
    subscriptionPrice: 55.19,
    badge: 'MOST POPULAR',
    popular: true,
    savingsPercentage: 25,
    perks: [
      '2 Boxes (24 Protein Bars)',
      'Mix & Match Up to 2 Flavors',
      'Free Priority Shipping Included',
      'Free CJ Matte Steel Shaker ($22 value)',
      '100% Taste Guarantee',
    ],
  },
  {
    id: 'box-48',
    name: 'Champion 48-Pack Case',
    barsCount: 48,
    boxesCount: 4,
    oneTimePrice: 124.99,
    subscriptionPrice: 99.99,
    badge: 'BEST VALUE',
    savingsPercentage: 35,
    perks: [
      '4 Boxes (48 Protein Bars)',
      'Full Variety Pack (All 4 Flavors)',
      'Free 2-Day Express Shipping',
      'Free Gym Kit (Shaker + Training Towel)',
      'VIP Early Access to Limited Batch Drops',
    ],
  },
];

export const BAR_LAYERS: LayerIngredient[] = [
  {
    layerNumber: 1,
    name: 'Gourmet Artisan Coating & Drizzle',
    tagline: 'Zero-Sugar Cacao / Cream Glaze',
    description: 'Crafted with raw organic cocoa butter, dark Dutch cacao, and Madagascar vanilla bean. Formulated to melt at body temperature for an irresistible dessert mouthfeel without sugar alcohols.',
    macroBenefit: 'Rich polyphenols & clean healthy fats with 0g impact carbs.',
    iconName: 'Sparkles',
  },
  {
    layerNumber: 2,
    name: 'Crisp Isolate Protein Matrix',
    tagline: 'High-Density Micro-Puffs',
    description: 'Proprietary puffed whey protein crisps providing a satisfying, audible crunch in every single bite. Eliminates the rubbery, dense brick texture of obsolete protein bars.',
    macroBenefit: 'Fast-absorbing micro-filtered whey isolate delivering 8g pure protein.',
    iconName: 'Zap',
  },
  {
    layerNumber: 3,
    name: 'Velvety High-Density Core',
    tagline: 'Slow-Churned Nut Butter & Whey Isolate',
    description: 'Cold-pressed roasted nut butters and micro-filtered whey isolate whipped under vacuum pressure. Delivers a soft, fudge-like core that stays fresh without preservatives.',
    macroBenefit: '12g sustained amino acid release + essential BCAAs for muscle protein synthesis.',
    iconName: 'Flame',
  },
  {
    layerNumber: 4,
    name: 'Prebiotic Bio-Fiber Foundation',
    tagline: 'Organic Soluble Tapioca Root',
    description: '100% plant-derived prebiotic soluble fiber that binds the bar naturally, feeds healthy gut flora, and prevents glycemic spikes. Zero maltitol, zero bloating.',
    macroBenefit: '12g dietary prebiotic fiber supporting digestive health & satiety.',
    iconName: 'ShieldCheck',
  },
];

export const COMPARISON_DATA = [
  {
    metric: 'Protein Source',
    aether: '100% Cold-Filtered Whey Isolate',
    traditional: 'Cheap Soy / Collagen / Whey Blend',
    highlight: true,
  },
  {
    metric: 'Added Sugars',
    aether: '0g (Monkfruit Sweetened)',
    traditional: '14g - 24g High Fructose Corn Syrup / Sucrose',
    highlight: true,
  },
  {
    metric: 'Net Carbs',
    aether: '2.5g - 3g Net Carbs',
    traditional: '25g - 35g High Glycemic Carbs',
    highlight: true,
  },
  {
    metric: 'Bloating Sugar Alcohols',
    aether: '0g Maltitol / 0g Sorbitol',
    traditional: '10g - 15g Maltitol (Causes GI Distress)',
    highlight: true,
  },
  {
    metric: 'Texture & Consistency',
    aether: 'Crisp, Velvety & Dessert-Grade',
    traditional: 'Dense, Chalky, Rubbery Jaw Workout',
    highlight: true,
  },
  {
    metric: 'Nootropic & Recovery Support',
    aether: 'Lion’s Mane & Ashwagandha Infused',
    traditional: 'Zero Functional Nootropics',
    highlight: true,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus Vance',
    role: 'CrossFit Games Finalist & Coach',
    achievement: 'Top 10 Fittest on Earth',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    flavorFav: 'chocolate-fudge',
    review: 'Most protein bars taste like cardboard dipped in artificial sweetener. CJ Protein Snacks changed the game. The Chocolate Fudge texture is unbelievable—it genuinely feels like eating a high-end dessert after heavy deadlifts.',
    verifiedBuyer: true,
    date: '2 days ago',
  },
  {
    id: '2',
    name: 'Dr. Elena Rostova, PhD',
    role: 'Sports Nutritionist & Biochemist',
    achievement: 'Adviser to Pro Endurance Teams',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    flavorFav: 'peanut-butter',
    review: 'From a biochemical standpoint, the cold-filtered whey isolate combined with prebiotic tapioca fiber is the gold standard. Zero maltitol means my athletes don’t experience the GI distress common with legacy bars.',
    verifiedBuyer: true,
    date: '1 week ago',
  },
  {
    id: '3',
    name: 'Kaelen Thorne',
    role: 'Hybrid Athlete & Ultra Marathoner',
    achievement: 'Sub-3hr Marathoner & Powerlifter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    flavorFav: 'cookies-cream',
    review: 'The crisp wafer crunch in Cookies & Cream is unmatched. Kept me fueled through a 50k mountain trail run without stomach cramps. The subscription 24-pack is an essential monthly staple in my pantry.',
    verifiedBuyer: true,
    date: '3 weeks ago',
  },
  {
    id: '4',
    name: 'Sienna Zhao',
    role: 'IFBB Bikini Pro & Fitness Coach',
    achievement: 'National Physique Champion',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    flavorFav: 'salted-caramel',
    review: 'The Salted Caramel is borderline magical. 20g isolate protein and 3g net carbs with real Maldon sea salt crystals. When I am in peak prep and craving sweets, this keeps me 100% on track without sacrificing sanity.',
    verifiedBuyer: true,
    date: '1 month ago',
  },
];

export const FAQS: FaqItem[] = [
  {
    category: 'nutrition',
    question: 'How are you able to provide 20g protein with only 0g sugar and 3g net carbs?',
    answer: 'We use ultra-pure cold-filtered whey protein isolate, which removes virtually all lactose, fats, and residual sugars. To achieve our decadent sweetness without sugar or glycemic spikes, we blend organic monkfruit extract and allulose with soluble prebiotic tapioca fiber.',
  },
  {
    category: 'taste',
    question: 'What makes CJ Protein Snacks avoid the chalky, rubbery texture of other bars?',
    answer: 'Traditional bars use cheap calcium caseinate and high heat extrusion that turns rock-hard over time. CJ Protein Snacks uses a layered cold-press method with micro-puffed isolate protein crisps and artisanal roasted nut butters that maintain a delicate, crisp, dessert-like texture at room temperature.',
  },
  {
    category: 'nutrition',
    question: 'Will these protein bars cause stomach cramps or bloating?',
    answer: 'No. Unlike traditional bars that load up on cheap sugar alcohols like maltitol and sorbitol (which ferment aggressively in the lower gut), CJ Protein Snacks contains zero maltitol. Our prebiotic fiber actually nourishes healthy gut bacteria and promotes smooth digestion.',
  },
  {
    category: 'ingredients',
    question: 'What are the functional nootropics in each bar?',
    answer: 'Depending on the flavor, our bars contain active functional adaptogens: Organic Lion’s Mane mushroom extract (500mg) for cognitive clarity and focus, or KSM-66 Organic Ashwagandha (300mg) for physical recovery and cortisol moderation.',
  },
  {
    category: 'shipping',
    question: 'How does your 100% Taste Guarantee work?',
    answer: 'We stand behind our flavor engineering 100%. If you try your first box of CJ Protein Snacks and don’t agree that it’s the best-tasting protein bar you’ve ever had, simply contact our support within 30 days for an immediate full refund. You don’t even need to return the bars.',
  },
  {
    category: 'shipping',
    question: 'Can I change my flavors or pause my subscription anytime?',
    answer: 'Yes! You have full control in your subscriber portal. You can switch flavors, swap bundle sizes, adjust shipment frequency (every 2, 4, or 6 weeks), or cancel with a single click anytime without penalties.',
  },
];
