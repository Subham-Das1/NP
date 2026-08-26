import React, { useState } from 'react';
import { useFlavor } from '../../context/FlavorContext';
import { TESTIMONIALS } from '../../data/bundleData';
import { FLAVORS } from '../../data/flavorData';
import type { FlavorId } from '../../types';
import { Star, CheckCircle, MessageSquarePlus, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { currentFlavor } = useFlavor();
  const [filterFlavor, setFilterFlavor] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState(TESTIMONIALS);

  const [newReview, setNewReview] = useState({
    name: '',
    role: '',
    rating: 5,
    flavorFav: 'chocolate-fudge' as FlavorId,
    review: '',
  });

  const filteredReviews = filterFlavor === 'all'
    ? reviewsList
    : reviewsList.filter((r) => r.flavorFav === filterFlavor);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.review) return;

    const created = {
      id: `${Date.now()}`,
      name: newReview.name,
      role: newReview.role || 'Fitness Enthusiast',
      achievement: 'Verified Athlete',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      rating: newReview.rating,
      flavorFav: newReview.flavorFav,
      review: newReview.review,
      verifiedBuyer: true,
      date: 'Just now',
    };

    setReviewsList([created, ...reviewsList]);
    setIsModalOpen(false);
    setNewReview({
      name: '',
      role: '',
      rating: 5,
      flavorFav: 'chocolate-fudge',
      review: '',
    });
  };

  return (
    <section id="reviews" className="py-24 relative overflow-hidden bg-[#0A0D14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 uppercase tracking-widest">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0 RATING OVER 14,200+ ATHLETES</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              FIELD TESTED BY <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, #FFFFFF 30%, ${currentFlavor.accentColor} 100%)`,
                }}
              >
                ELITE PERFORMERS.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-display font-bold uppercase tracking-wider text-white flex items-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>WRITE A REVIEW</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-mono text-slate-400 mr-2 uppercase tracking-wider">
            Filter by:
          </span>
          <button
            onClick={() => setFilterFlavor('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filterFlavor === 'all'
                ? 'bg-white/15 text-white border border-white/30'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            All Flavors ({reviewsList.length})
          </button>
          {Object.values(FLAVORS).map((flv) => (
            <button
              key={flv.id}
              onClick={() => setFilterFlavor(flv.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                filterFlavor === flv.id
                  ? 'bg-white/15 text-white border'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
              style={{
                borderColor: filterFlavor === flv.id ? flv.accentColor : undefined,
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: flv.accentColor }} />
              <span>{flv.name}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((item) => {
            const flavorObj = FLAVORS[item.flavorFav] || currentFlavor;
            return (
              <div
                key={item.id}
                className="rounded-3xl p-6 sm:p-8 bg-[#10141F]/80 border border-white/10 relative flex flex-col justify-between hover:border-white/20 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle className="w-3 h-3" /> Verified Buyer
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 italic">
                    "{item.review}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-11 h-11 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-400">{item.role}</p>
                    </div>
                  </div>

                  <div
                    className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border uppercase"
                    style={{
                      backgroundColor: `${flavorObj.accentColor}15`,
                      borderColor: `${flavorObj.accentColor}40`,
                      color: flavorObj.accentColor,
                    }}
                  >
                    {flavorObj.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-3xl bg-[#0E121B] border border-white/15 p-6 sm:p-8 shadow-2xl z-10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display font-black text-xl text-white mb-4">
              Share Your Athlete Experience
            </h3>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Role / Sport (Optional)</label>
                <input
                  type="text"
                  value={newReview.role}
                  onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                  placeholder="e.g. Marathoner / Strength Coach"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Favorite Flavor</label>
                <select
                  value={newReview.flavorFav}
                  onChange={(e) => setNewReview({ ...newReview, flavorFav: e.target.value as FlavorId })}
                  className="w-full bg-[#151924] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                >
                  {Object.values(FLAVORS).map((flv) => (
                    <option key={flv.id} value={flv.id}>
                      {flv.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Your Review</label>
                <textarea
                  required
                  rows={4}
                  value={newReview.review}
                  onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                  placeholder="Describe the texture, taste, macro satiety, and workout recovery..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-black mt-2 cursor-pointer shadow-lg"
                style={{ backgroundColor: currentFlavor.accentColor }}
              >
                SUBMIT VERIFIED REVIEW
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
