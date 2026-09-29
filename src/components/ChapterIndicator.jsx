import React, { useState, useEffect } from 'react';
import { STORY_CHAPTERS } from '../data/storyChapters';
import { soundFx } from '../utils/soundEffects';
import { ChevronRight } from 'lucide-react';

export default function ChapterIndicator({ activeChapter, onSelectChapter }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-900 z-50">
        <div
          className="h-full bg-gradient-to-r from-ieee-blue via-ieee-cyan to-ieee-gold transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Scrollytelling Sidebar (Desktop) - Appears after entering Chapter 1 */}
      <div 
        className={`fixed right-3 2xl:right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3 transition-all duration-500 ${
          activeChapter === 'prologue' 
            ? 'opacity-0 pointer-events-none translate-x-6' 
            : 'opacity-100 pointer-events-auto translate-x-0'
        }`}
      >
        <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-1 hidden 2xl:flex items-center gap-1 bg-ieee-surface/80 backdrop-blur px-2.5 py-1 rounded-full border border-slate-700/50">
          <span className="w-1.5 h-1.5 rounded-full bg-ieee-cyan" />
          Story Timeline
        </div>

        {STORY_CHAPTERS.map((chapter) => {
          const isActive = activeChapter === chapter.id;
          return (
            <button
              key={chapter.id}
              onClick={() => {
                soundFx.playChapterSwoosh();
                onSelectChapter(chapter.id);
              }}
              className="group relative flex items-center justify-end gap-3 transition-all duration-300 focus:outline-none"
              title={`${chapter.number}: ${chapter.title}`}
            >
              {/* Hover / Active Tooltip */}
              <div
                className={`text-right transition-all duration-300 pointer-events-none ${
                  isActive
                    ? 'opacity-0 group-hover:opacity-100 2xl:opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                <div className="bg-ieee-surface/90 backdrop-blur-md px-3 py-1 rounded-lg border border-ieee-border shadow-xl">
                  <div className="text-[10px] font-mono text-ieee-cyan uppercase tracking-wider">
                    Chapter {chapter.number}
                  </div>
                  <div className="text-xs font-semibold text-white whitespace-nowrap">
                    {chapter.title}
                  </div>
                </div>
              </div>

              {/* Node Indicator */}
              <div
                className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-5 h-5 bg-ieee-cyan/20 border-2 border-ieee-cyan shadow-[0_0_12px_#00d2ff]'
                    : 'w-3 h-3 bg-slate-700 hover:bg-slate-500 border border-slate-500'
                }`}
              >
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
