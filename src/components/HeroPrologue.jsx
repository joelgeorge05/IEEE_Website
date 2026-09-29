import React, { useState, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  ChevronDown, 
  ArrowRight,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function HeroPrologue({ onStartStory, onOpenTerminal, onNavigateToAdmin }) {
  const [typedText, setTypedText] = useState('');
  const fullText = '> init_chapter --name="IEEE_CS_MBITS" --status="ONLINE" --sb="65041"';

  // Live countdown timer for WebNova 2026 (Target: 30 September 2026)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const target = new Date('2026-09-30T23:59:59').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Active Members', value: '150+', accent: 'text-ieee-cyan', tag: 'B.Tech & M.Tech' },
    { label: 'Events Hosted', value: '40+', accent: 'text-amber-400', tag: 'Symposiums & CTFs' },
    { label: 'Awards & Honors', value: '15+', accent: 'text-emerald-400', tag: 'Kerala Section & R10' },
    { label: 'IEEE Papers', value: '6', accent: 'text-sky-300', tag: 'IEEE Xplore Indexed' },
  ];

  return (
    <section 
      id="prologue" 
      className="relative min-h-screen pt-20 pb-8 sm:pt-24 sm:pb-10 flex flex-col justify-center items-center overflow-hidden border-b border-ieee-border/50"
    >
      {/* Background Ambient Glows & Cyber Vignette */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[450px] bg-ieee-blue/20 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[550px] h-[380px] bg-ieee-cyan/15 blur-[150px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-[1560px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:pr-14 relative z-10 my-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-10 items-center">
          
          {/* ========================================================
              LEFT COLUMN: Primary Hero Narrative, CTAs & Domain Strip
              ======================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Top Unified Institutional Status Bar */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-slate-900/90 border border-ieee-cyan/35 shadow-[0_0_15px_rgba(0,210,255,0.15)] mb-3 backdrop-blur w-fit">
              <span className="inline-flex rounded-full h-2 w-2 bg-emerald-400 shrink-0"></span>
              <span className="text-ieee-cyan font-bold tracking-wide">IEEE CS SBC</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300 font-semibold">STB 65041</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-400 hidden sm:inline">Region 10 Kerala Section</span>
            </div>

            {/* Redesigned High-Impact Headline */}
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold font-display tracking-tight leading-[1.12] mb-3">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-300 drop-shadow-sm">
                Architecting Tomorrow,
              </span>
              <span className="bg-gradient-to-r from-ieee-cyan via-sky-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,210,255,0.35)]">
                Byte by Byte
              </span>
            </h1>

            {/* Prominent Full Institution Name & Chapter Identity Banner */}
            <div className="mb-4 p-4 sm:p-5 rounded-2xl bg-slate-900/85 border-l-4 border-ieee-cyan border-y border-r border-slate-800/80 backdrop-blur w-full shadow-[0_0_25px_rgba(0,210,255,0.08)]">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
                <div className="md:col-span-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-ieee-cyan font-bold">
                      Institution of Affiliation
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[10px] font-mono text-slate-400">Est. 2001</span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold font-display text-white tracking-wide leading-tight">
                    Mar Baselios Institute of Technology & Science
                    <span className="text-ieee-cyan font-mono text-sm sm:text-base font-semibold ml-2">
                      (MBITS)
                    </span>
                  </h2>
                  <div className="text-xs font-mono text-slate-300 mt-1 flex flex-wrap items-center gap-2">
                    <span>Kothamangalam, Kerala</span>
                    <span className="text-slate-600">•</span>
                    <span>Affiliated to APJ KTU</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-ieee-cyan font-medium">AICTE Approved</span>
                  </div>
                </div>
                
                <div className="md:col-span-4 flex md:flex-col justify-between md:justify-center items-start md:items-end gap-1 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-slate-800 md:pl-4 text-left md:text-right">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Chapter Code</span>
                  <span className="text-sm font-mono font-bold text-ieee-cyan bg-ieee-blue/20 border border-ieee-cyan/30 px-2 py-0.5 rounded">
                    STB 65041
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Region 10 Kerala</span>
                </div>
              </div>
              
              <p className="text-slate-300 text-xs sm:text-[13px] font-light leading-relaxed mt-2.5 pt-2.5 border-t border-slate-800/70">
                The premier student chapter in Kerala Section. Empowering student engineers through hands-on technical labs, competitive hackathons, and IEEE peer research mentorship.
              </p>
            </div>

            {/* Redesigned Action Controls */}
            {/* Action Buttons Cluster */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <button
                onClick={() => {
                  soundFx.playChapterSwoosh();
                  onStartStory();
                }}
                className="relative group p-[1.5px] rounded-xl overflow-hidden focus:outline-none transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_25px_rgba(0,210,255,0.35)] hover:shadow-[0_0_35px_rgba(0,210,255,0.65)]"
              >
                {/* Radiant dynamic gradient border */}
                <span className="absolute inset-0 bg-gradient-to-r from-ieee-blue via-ieee-cyan to-sky-400 group-hover:bg-gradient-to-r group-hover:from-ieee-cyan group-hover:via-white group-hover:to-ieee-blue transition-all duration-500 opacity-90 group-hover:opacity-100" />
                
                {/* Button interior: sleek obsidian glass */}
                <span className="relative px-5 sm:px-6 py-2.5 rounded-[10.5px] bg-slate-950/90 group-hover:bg-slate-900/80 backdrop-blur flex items-center gap-2.5 sm:gap-3 transition-colors duration-300">
                  <span className="font-bold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent group-hover:to-cyan-200">
                    Explore The Chapter
                  </span>
                  <span className="w-6 h-6 rounded-lg bg-ieee-cyan/15 text-ieee-cyan flex items-center justify-center group-hover:bg-ieee-cyan group-hover:text-slate-950 transition-all duration-300 shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </span>
              </button>

              <a
                href="#chapter-2"
                onClick={() => soundFx.playClick()}
                className="group px-4 py-3 rounded-xl font-medium text-xs sm:text-sm bg-slate-900/85 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-ieee-cyan/50 hover:shadow-[0_0_20px_rgba(0,210,255,0.2)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2.5 backdrop-blur"
              >
                <span className="p-1 rounded-md bg-ieee-cyan/10 text-ieee-cyan group-hover:bg-ieee-cyan/20 group-hover:text-cyan-300 transition-colors">
                  <Calendar className="w-3.5 h-3.5" />
                </span>
                <span>Chapter Events</span>
              </a>

              <button
                onClick={() => {
                  soundFx.playTerminalKey();
                  onOpenTerminal();
                }}
                className="group px-4 py-3 rounded-xl font-mono text-xs bg-slate-900/85 hover:bg-emerald-950/40 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-400/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 backdrop-blur shadow-sm"
                title="Open Interactive Terminal (Ctrl + K)"
              >
                <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors">
                  <TerminalIcon className="w-3.5 h-3.5" />
                </span>
                <span>CLI Shell</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400/90 border border-emerald-500/20 hidden sm:inline group-hover:border-emerald-500/40">
                  Ctrl+K
                </span>
              </button>
            </div>

            {/* Impact Metrics Dashboard Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-panel p-3.5 rounded-xl border-ieee-border hover:border-ieee-cyan/40 hover:-translate-y-0.5 transition-all"
                >
                  <div className={`font-mono text-xl sm:text-2xl font-bold ${stat.accent} mb-0.5`}>
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-white leading-tight">
                    {stat.label}
                  </div>
                  <div className="text-[9px] font-mono text-slate-400 mt-0.5">
                    {stat.tag}
                  </div>
                </div>
              ))}
            </div>

            {/* Chapter Live Wire / Announcement Bar */}
            <div className="mt-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs text-slate-300 font-mono w-full">
              <div className="flex items-center gap-2 min-w-0">
                <span className="inline-flex rounded-full h-2 w-2 bg-emerald-400 shrink-0"></span>
                <span className="text-ieee-cyan font-bold uppercase text-[10px] tracking-wider shrink-0">Live Wire:</span>
                <span className="text-[11px] text-slate-300 truncate">WebNova '26 Challenge Registration Active</span>
              </div>
              <a
                href="#chapter-2"
                onClick={() => soundFx.playClick()}
                className="text-[10px] text-ieee-cyan hover:underline shrink-0 flex items-center gap-1 font-semibold ml-2"
              >
                <span>View Events</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* ========================================================
              RIGHT COLUMN: Interactive Mission Control Console & WebNova HUD
              ======================================================== */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 justify-center">
            
            {/* Interactive Terminal Window Preview */}
            <div className="bg-slate-950/95 border border-slate-800 hover:border-ieee-cyan/40 rounded-xl overflow-hidden shadow-xl backdrop-blur text-left transition-all">
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-1.5 text-slate-300 text-[11px] font-semibold">ieee-cs@mbits-cli:~</span>
                </div>
                <button
                  onClick={() => {
                    soundFx.playTerminalKey();
                    onOpenTerminal();
                  }}
                  className="hover:text-ieee-cyan flex items-center gap-1 text-[11px] font-mono text-slate-400 transition-colors"
                  title="Expand interactive CLI modal (Ctrl + K)"
                >
                  <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>expand</span>
                </button>
              </div>

              <div className="p-3.5 font-mono text-[11px] text-emerald-400 space-y-1">
                <div className="text-slate-500 text-[10px]">// Mar Baselios Institute of Technology & Science • IEEE CS Core</div>
                <div className="flex items-center gap-1 break-all">
                  <span>{typedText}</span>
                  <span className="w-1.5 h-3 bg-emerald-400 inline-block shrink-0" />
                </div>
                {typedText.length >= fullText.length && (
                  <div className="pt-1.5 text-slate-300 text-[10px] leading-relaxed border-t border-slate-800/80 mt-1 space-y-0.5">
                    <p className="text-emerald-400 font-semibold">[OK] Core systems operational at MBITS (STB 65041).</p>
                    <p className="text-slate-400">5 Special Interest Groups active • 150+ members online.</p>
                  </div>
                )}
              </div>

              <div className="px-3.5 py-1.5 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  NODE ONLINE
                </span>
                <span className="text-ieee-cyan font-semibold">PRESS CTRL + K</span>
              </div>
            </div>

            {/* Flagship Event: WebNova 2026 Live Countdown Card */}
            <div className="glass-panel p-4 sm:p-5 rounded-2xl border-ieee-border hover:border-amber-500/50 transition-all relative overflow-hidden group shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold uppercase tracking-wider">
                  Flagship Showdown
                </span>
                <span className="text-[11px] font-mono font-bold text-amber-400">
                  ₹1,000 Cash Pool
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white mb-0.5 group-hover:text-amber-300 transition-colors font-display">
                WebNova 2026
              </h4>
              <p className="text-[11px] text-slate-400 mb-2 leading-tight">
                Official chapter website design competition hosted by IEEE CS MBITS. Submissions close in:
              </p>

              {/* Prize & Finalist Breakdown */}
              <div className="grid grid-cols-3 gap-1.5 mb-2.5 text-center text-xs font-mono bg-slate-900/70 p-1.5 rounded-lg border border-slate-800/70">
                <div>
                  <span className="text-amber-400 font-bold block text-xs">₹600</span>
                  <span className="text-[8px] text-slate-400 uppercase font-semibold">1st Prize</span>
                </div>
                <div className="border-x border-slate-800">
                  <span className="text-slate-200 font-bold block text-xs">₹400</span>
                  <span className="text-[8px] text-slate-400 uppercase font-semibold">2nd Prize</span>
                </div>
                <div>
                  <span className="text-ieee-cyan font-bold block text-xs">Certificates</span>
                  <span className="text-[8px] text-slate-400 uppercase font-semibold">All Finalists</span>
                </div>
              </div>

              {/* Countdown Ticker */}
              <div className="grid grid-cols-4 gap-1.5 text-center mb-2.5">
                <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg">
                  <div className="text-base sm:text-lg font-mono font-bold text-white">{timeLeft.days}</div>
                  <div className="text-[8px] font-mono text-slate-500 uppercase font-semibold">Days</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg">
                  <div className="text-base sm:text-lg font-mono font-bold text-white">{timeLeft.hours}</div>
                  <div className="text-[8px] font-mono text-slate-500 uppercase font-semibold">Hours</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg">
                  <div className="text-base sm:text-lg font-mono font-bold text-white">{timeLeft.minutes}</div>
                  <div className="text-[8px] font-mono text-slate-500 uppercase font-semibold">Mins</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg">
                  <div className="text-base sm:text-lg font-mono font-bold text-ieee-cyan">{timeLeft.seconds}</div>
                  <div className="text-[8px] font-mono text-slate-500 uppercase font-semibold">Secs</div>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="#chapter-2"
                onClick={() => soundFx.playClick()}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-mono font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center justify-center gap-1.5 transition-all shadow-sm group-hover:border-amber-400"
              >
                <span>View Challenge Details & Register</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Chapter Affiliation Telemetry */}
            <div className="px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-left flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="text-[10px] text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                MBITS Kothamangalam • Kerala Section
              </span>
              <span className="text-[9px] text-ieee-cyan uppercase font-bold tracking-wider">
                Region 10
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Down Scroll Indicator */}
      <div className="mt-4 sm:mt-5">
        <a
          href="#chapter-1"
          onClick={() => soundFx.playChapterSwoosh()}
          className="flex flex-col items-center text-slate-500 hover:text-ieee-cyan transition-colors"
        >
          <span className="text-[9px] font-mono tracking-widest uppercase mb-0.5">Scroll to Chapter 01</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
