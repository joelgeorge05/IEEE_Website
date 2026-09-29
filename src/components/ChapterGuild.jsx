import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Users, Mail, Terminal, Eye, X, Download } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';
import { TEAM_DATA } from '../data/teamData';
import { soundFx } from '../utils/soundEffects';

export default function ChapterGuild() {
  const [filter, setFilter] = useState('All');
  const [isPosterOpen, setIsPosterOpen] = useState(false);

  const categories = ['All', 'Advisory', 'Executive', 'Technical', 'WICS'];

  const filteredTeam = filter === 'All'
    ? TEAM_DATA
    : TEAM_DATA.filter((m) => m.category === filter);

  // Close poster modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isPosterOpen) {
        setIsPosterOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPosterOpen]);

  return (
    <section id="chapter-4" className="py-24 relative border-b border-ieee-border/50 bg-slate-950/40">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Chapter Header */}
        <div className="mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-ieee-cyan block mb-1">
            Chapter 04 // Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            The Guild Masters
          </h2>
        </div>

        <p className="text-slate-300 max-w-3xl text-base sm:text-lg mb-8 font-light leading-relaxed">
          The Executive Committee (ExeCom) of IEEE Computer Society Student Branch Chapter MBITS (SB 65041). Mentoring student technologists, leading research initiatives, and building an inclusive engineering community.
        </p>

        {/* Category Filters & View Poster Action */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => {
                  soundFx.playClick();
                  setFilter(c);
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  filter === c
                    ? 'bg-ieee-blue text-white border border-ieee-cyan/40 shadow-md font-semibold'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              setIsPosterOpen(true);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono bg-ieee-blue/20 hover:bg-ieee-blue/35 text-ieee-cyan border border-ieee-cyan/30 hover:border-ieee-cyan/60 transition-all shadow-sm"
            title="View Full ExeCom 2026 Poster"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Official ExeCom Poster</span>
          </button>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7">
          {filteredTeam.map((member) => (
            <div
              key={member.name}
              className="glass-panel rounded-2xl overflow-hidden border-ieee-border hover:border-ieee-cyan/40 hover:-translate-y-1.5 transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-950">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Details */}
                <div className="p-5">
                  <h4 className="text-base font-bold text-white group-hover:text-ieee-cyan transition-colors mb-0.5">
                    {member.name}
                  </h4>
                  <div className="text-xs font-semibold text-ieee-cyan mb-1">
                    {member.role}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mb-3">
                    {member.designation}
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundFx.playClick()}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-ieee-cyan hover:bg-slate-800 transition-colors"
                      title="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundFx.playClick()}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={member.social.email}
                      onClick={() => soundFx.playClick()}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                      title="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <span className="text-[10px] font-mono text-slate-500">IEEE CS '26</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Official ExeCom 2026 Poster Lightbox Modal */}
      {isPosterOpen && createPortal(
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsPosterOpen(false);
          }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
        >
          <div className="relative max-w-xl w-full bg-slate-950 border border-ieee-cyan/50 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col items-center my-auto">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs text-white font-bold">IEEE CS SBC MBITS ExeCom 2026</span>
              </div>
              <button
                onClick={() => setIsPosterOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[68vh] overflow-hidden rounded-xl border border-slate-800 flex items-center justify-center bg-black w-full shadow-inner">
              <img 
                src="/team/execom-2026-poster.jpg"
                alt="IEEE CS SBC MBITS ExeCom 2026 Official Poster"
                className="max-h-[68vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="w-full pt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
              <span className="text-[11px] text-slate-500">IEEE CS SBC MBITS • SB 65041</span>
              <a
                href="/team/execom-2026-poster.jpg"
                download="IEEE-CS-SBC-MBITS-ExeCom-2026"
                className="px-3.5 py-1.5 rounded-lg bg-ieee-blue hover:bg-ieee-lightBlue text-white transition-colors flex items-center gap-1.5 font-semibold text-xs font-mono shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download ExeCom Poster</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}

    </section>
  );
}
