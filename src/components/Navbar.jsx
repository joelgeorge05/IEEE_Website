import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Menu, 
  X,
  ArrowRight
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function Navbar({ 
  onOpenTerminal
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#chapter-1' },
    { name: 'Events', href: '#chapter-2' },
    { name: 'Awards', href: '#chapter-3' },
    { name: 'Team', href: '#chapter-4' },
    { name: 'Gallery', href: '#chapter-5' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-ieee-navy/95 backdrop-blur-md border-b border-ieee-border/80 shadow-2xl py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Dual Logos */}
        <a 
          href="#prologue" 
          onClick={() => soundFx.playClick()}
          className="flex items-center gap-3 group"
        >
          {/* Logo Container */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* IEEE Logo */}
            <div className="h-7 sm:h-9 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-white/95 flex items-center justify-center shadow-[0_0_12px_rgba(0,210,255,0.2)] group-hover:scale-105 transition-transform">
              <img 
                src="/ieee-logo.svg" 
                alt="IEEE Logo" 
                className="h-4 sm:h-6 w-auto object-contain" 
              />
            </div>

            {/* Divider */}
            <span className="text-slate-600 font-light text-xs sm:text-sm">|</span>

            {/* IEEE Computer Society Logo */}
            <div className="h-7 sm:h-9 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-white/95 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <img 
                src="/ieee-cs-logo.png" 
                alt="IEEE Computer Society Logo" 
                className="h-4 sm:h-6 w-auto object-contain" 
              />
            </div>

            {/* Divider */}
            <span className="text-slate-600 font-light text-xs sm:text-sm">|</span>

            {/* MBITS Logo */}
            <div className="h-7 sm:h-9 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-white/95 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <img 
                src="/mbits-logo.jpg" 
                alt="MBITS Logo" 
                className="h-4 sm:h-6 w-auto object-contain" 
              />
            </div>
          </div>

          <div className="hidden sm:block text-left">
            <div className="flex items-center gap-1.5 font-display font-bold text-white text-sm tracking-tight leading-none group-hover:text-ieee-cyan transition-colors">
              IEEE CS MBITS
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-ieee-blue/30 text-ieee-cyan border border-ieee-cyan/30">
                SB 65041
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 leading-tight mt-0.5 whitespace-nowrap">
              Mar Baselios Institute of Technology & Science
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => soundFx.playClick()}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Terminal Launcher */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenTerminal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800/90 text-emerald-400 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/40 transition-all"
            title="Open Interactive Terminal (Ctrl + K)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CLI ~</span>
          </button>

          {/* Primary CTA: Join Chapter */}
          <a
            href="#epilogue"
            onClick={() => soundFx.playClick()}
            className="group relative p-[1px] rounded-lg overflow-hidden focus:outline-none transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-[0_0_15px_rgba(0,210,255,0.25)] hover:shadow-[0_0_25px_rgba(0,210,255,0.5)]"
          >
            {/* Radiant glowing gradient perimeter */}
            <span className="absolute inset-0 bg-gradient-to-r from-ieee-blue via-ieee-cyan to-sky-400 group-hover:from-ieee-cyan group-hover:via-white group-hover:to-sky-400 transition-all duration-500 opacity-90 group-hover:opacity-100" />

            {/* Obsidian glass core */}
            <span className="relative px-3.5 py-1.5 rounded-[7px] bg-slate-950/90 group-hover:bg-slate-900/80 backdrop-blur flex items-center gap-2 transition-colors duration-300">
              <span className="font-semibold text-xs tracking-wide text-white group-hover:text-cyan-200 transition-colors">
                Join Chapter
              </span>
              <span className="w-4 h-4 rounded-md bg-ieee-cyan/15 text-ieee-cyan flex items-center justify-center group-hover:bg-ieee-cyan group-hover:text-slate-950 transition-all duration-300 shadow-sm">
                <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </span>
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex sm:hidden items-center gap-1.5 shrink-0">
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenTerminal();
            }}
            className="h-7 w-7 rounded-lg bg-slate-800 text-emerald-400 border border-emerald-500/30 text-xs flex items-center justify-center"
            title="Open CLI"
          >
            <Terminal className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-7 w-7 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-ieee-navy/95 backdrop-blur-xl border-b border-ieee-border px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-lg text-sm font-mono text-slate-300 hover:bg-slate-800/60 hover:text-ieee-cyan"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#epilogue"
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-lg text-sm font-mono text-ieee-gold hover:bg-slate-800/60"
            >
              07. Knowledge Quest
            </a>
            <a
              href="#contact"
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-lg text-sm font-mono text-emerald-400 hover:bg-slate-800/60"
            >
              Contact Chapter
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
