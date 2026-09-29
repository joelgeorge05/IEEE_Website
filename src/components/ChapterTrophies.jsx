import React, { useState } from 'react';
import { ACHIEVEMENTS_DATA } from '../data/achievementsData';
import { soundFx } from '../utils/soundEffects';

export default function ChapterTrophies() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Chapter Excellence', 'Innovation & Hackathons', 'National Events', 'Diversity & WIE'];

  const filtered = activeCategory === 'All'
    ? ACHIEVEMENTS_DATA
    : ACHIEVEMENTS_DATA.filter((a) => a.category === activeCategory);

  return (
    <section id="chapter-3" className="py-24 relative border-b border-ieee-border/50">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Chapter Header */}
        <div className="mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-ieee-gold block mb-1">
            Chapter 03 // Legacy & Honors
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            The Hall of Trophies
          </h2>
        </div>

        <p className="text-slate-300 max-w-3xl text-base sm:text-lg mb-12 font-light leading-relaxed">
          Tangible milestones of technical excellence. From hosting the regional Kochi Hub Meet and receiving the IEEE Kochi Subsection Outstanding Event Award for SIGNAL 2.0 to mobilising 180+ student delegates across Kerala, explore the verified achievements of IEEE MBITS.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playClick();
                setActiveCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)] font-semibold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accolades Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map((item) => {
            return (
              <div
                key={item.id}
                className="glass-panel p-6 rounded-2xl border-ieee-border hover:border-amber-500/40 hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                      {item.year}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1">
                    {item.issuer}
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    {item.metric}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    Verified Accolade
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hall of Fame Callout */}
        <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">
              Are You Ready to Join the Ranks?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Every year, IEEE CS MBITS provides project funding, travel subsidies, and specialized training to help members compete in national hackathons and publish in international journals.
            </p>
          </div>
          <a
            href="#chapter-2"
            onClick={() => soundFx.playClick()}
            className="px-6 py-3 rounded-xl font-semibold text-xs font-mono bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:bg-amber-400 shadow-lg hover:shadow-amber-500/30 transition-all shrink-0"
          >
            Compete in WebNova '26
          </a>
        </div>

      </div>
    </section>
  );
}
