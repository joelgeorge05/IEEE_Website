import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Camera, X, ChevronLeft, ChevronRight, Eye, Calendar, ExternalLink } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';
import { GALLERY_DATA } from '../data/galleryData';
import { soundFx } from '../utils/soundEffects';

export default function ChapterArchive() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const categories = ['All', 'Hackathons', 'Workshops', 'Celebrations', 'Competitions'];

  const filtered = activeCategory === 'All'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((g) => g.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filtered.length]);

  const handleNext = () => {
    soundFx.playClick();
    setSelectedImageIndex((prev) => (prev + 1) % filtered.length);
  };

  const handlePrev = () => {
    soundFx.playClick();
    setSelectedImageIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  return (
    <section id="chapter-5" className="py-24 relative border-b border-ieee-border/50">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:pr-14 2xl:pr-8 relative z-10">
        
        {/* Chapter Header */}
        <div className="mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-ieee-cyan block mb-1">
            Chapter 05 // Visual Chronicles
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            The Memory Archive
          </h2>
        </div>

        <p className="text-slate-300 max-w-3xl text-base sm:text-lg mb-12 font-light leading-relaxed">
          Code is preserved in Git repositories; our spirit is immortalized in moments. Relive the hackathons, late-night breakthroughs, and IEEE Day milestones.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                soundFx.playClick();
                setActiveCategory(c);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeCategory === c
                  ? 'bg-ieee-blue text-white border border-ieee-cyan/40 shadow-md font-semibold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Dedicated Bright Photo Frames & Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                soundFx.playClick();
                setSelectedImageIndex(index);
              }}
              className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-ieee-cyan/60 transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] flex flex-col group cursor-pointer"
            >
              {/* Photo Frame - Dedicated, crisp, 100% uncropped viewing area */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                {/* Ambient blurred backdrop to fit aspect ratio cleanly */}
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
                />

                {/* Pristine uncropped photo */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="relative z-0 max-h-full max-w-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Subtle Hover Action Pill */}
                <div className="absolute inset-0 z-10 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 text-white border border-ieee-cyan/50 shadow-xl font-mono text-xs">
                    <Eye className="w-4 h-4 text-ieee-cyan" />
                    <span>View Full Photo</span>
                  </span>
                </div>

              </div>

              {/* Dedicated Card Body Below Photo */}
              <div className="p-5 flex flex-col justify-between flex-1 bg-slate-900/70 space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-ieee-cyan shrink-0" />
                      <span>{item.date}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800/90 text-ieee-cyan border border-slate-700/80">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-ieee-cyan transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.postUrl && (
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-pink-400 flex items-center gap-1">
                      <InstagramIcon className="w-3.5 h-3.5" />
                      @ieeesbmbits
                    </span>
                    <span className="text-xs font-mono text-ieee-cyan flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Expand</span>
                      <span>→</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && filtered[selectedImageIndex] && createPortal(
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              soundFx.playClick();
              setSelectedImageIndex(null);
            }
          }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <button
            onClick={() => {
              soundFx.playClick();
              setSelectedImageIndex(null);
            }}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 z-50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/70 text-white hover:bg-ieee-blue z-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/70 text-white hover:bg-ieee-blue z-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[92vh] flex flex-col items-center my-auto">
            <div className="relative max-h-[64vh] flex items-center justify-center rounded-2xl overflow-hidden border border-slate-700/80 shadow-[0_0_50px_rgba(0,0,0,0.8)] mb-4 bg-slate-950 p-1.5">
              <img
                src={filtered[selectedImageIndex].image}
                alt={filtered[selectedImageIndex].title}
                className="max-h-[60vh] max-w-full w-auto h-auto object-contain rounded-xl"
              />
            </div>

            <div className="w-full text-center space-y-2">
              <div className="text-xs font-mono text-ieee-cyan flex items-center justify-center gap-2">
                <span>{filtered[selectedImageIndex].category} • {filtered[selectedImageIndex].date}</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {filtered[selectedImageIndex].title}
              </h3>
              <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                {filtered[selectedImageIndex].description}
              </p>

              {filtered[selectedImageIndex].postUrl && (
                <div className="pt-2">
                  <a
                    href={filtered[selectedImageIndex].postUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-600/40 hover:to-pink-600/40 text-pink-300 border border-pink-500/40 shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                    <span>View Official Post on @ieeesbmbits</span>
                    <ExternalLink className="w-3 h-3 text-pink-400 ml-0.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

    </section>
  );
}
