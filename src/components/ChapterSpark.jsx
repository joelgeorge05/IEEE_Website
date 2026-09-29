import React, { useState } from 'react';
import { soundFx } from '../utils/soundEffects';

export default function ChapterSpark() {
  const [activeTab, setActiveTab] = useState('mission');

  const milestones = [
    {
      year: '2022',
      title: 'Branch Inauguration',
      detail: 'Inaugurated on July 3, 2022 with 34 charter members by Dr. Rajesh M. V. (IEEE Kochi Subsection Chair) under Counselor Dr. Robin George.'
    },
    {
      year: '2023',
      title: 'SIGNAL 2.0 Conclave',
      detail: 'Hosted landmark national technical conclave with 250+ delegates; won the IEEE Kochi Subsection Outstanding Student Event Award.'
    },
    {
      year: '2024',
      title: 'Societies & WIE Expansion',
      detail: 'Formed active student chapters for CASS, SPS, Sensors Council, and Women in Engineering (WIE), scaling campus engagement.'
    },
    {
      year: '2025 (Oct)',
      title: 'IEEE CS Chapter Inauguration',
      detail: 'Formal grand charter and inauguration of IEEE Computer Society SBC MBITS at APJ Seminar Hall alongside the digital web platform launch.'
    },
    {
      year: '2025 (Dec)',
      title: 'Host of Kochi Hub Meet',
      detail: 'MBITS selected by IEEE Kerala Section to host the flagship IEEE Kochi Hub Meet 2025 (KHM’25) on Dec 13–14, uniting student branches.'
    },
    {
      year: '2026',
      title: 'WebNova 2026 & 250+ Members',
      detail: 'Surpassing 250+ active members and 50+ events; launching WebNova 2026 computing summit and hands-on special interest groups.'
    }
  ];

  const pillars = [
    {
      title: 'Engineering Rigor',
      description: 'Beyond theoretical syllabi. We build end-to-end full-stack architectures, train neural models, and optimize low-level systems.'
    },
    {
      title: 'Peer-to-Peer Culture',
      description: 'Zero hierarchy in learning. Seniors guide juniors, bugs are solved collectively, and knowledge is shared freely.'
    },
    {
      title: 'Impactful Innovation',
      description: 'Every project addresses tangible real-world dilemmas—from campus smart-grids to disaster telemetry and data security.'
    },
    {
      title: 'Global IEEE Standards',
      description: 'Adhering to professional ethics, IEEE research methodologies, and international technological best practices.'
    }
  ];

  return (
    <section id="chapter-1" className="py-24 relative border-b border-ieee-border/50 bg-slate-950/40">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Chapter Header */}
        <div className="mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-ieee-cyan block mb-1">
            Chapter 01 // Origin Story
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            The Spark of Genesis
          </h2>
        </div>

        {/* Narrative introduction */}
        <p className="text-slate-300 max-w-3xl text-base sm:text-lg mb-12 font-light leading-relaxed">
          At Mar Baselios Institute of Technology & Science, Kothamangalam, the IEEE Computer Society chapter was sparked by a simple conviction: 
          <em className="text-ieee-cyan font-normal"> students shouldn't just study computer science—they should architect the digital world</em>.
        </p>

        {/* Interactive Mission / Vision / College Info Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('mission');
                }}
                className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-mono transition-all text-center ${
                  activeTab === 'mission'
                    ? 'bg-ieee-blue text-white font-semibold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Our Mission
              </button>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('vision');
                }}
                className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-mono transition-all text-center ${
                  activeTab === 'vision'
                    ? 'bg-ieee-blue text-white font-semibold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Our Vision
              </button>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('institution');
                }}
                className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-mono transition-all text-center ${
                  activeTab === 'institution'
                    ? 'bg-ieee-blue text-white font-semibold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                MBITS Legacy
              </button>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-ieee-border min-h-[220px] flex flex-col justify-center">
              {activeTab === 'mission' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-ieee-cyan uppercase tracking-wider">Official Mission</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">MBITS & IEEE CS</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Technical Excellence & Youth Empowerment</h3>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <p>
                      <strong className="text-white">MBITS Mission:</strong> To provide graduate-level technical education in conventional and emerging fields, build a centre of excellence for research, empower rural youth to join the mainstream of IT growth, and impart ethical values of Indian tradition.
                    </p>
                    <p>
                      <strong className="text-ieee-cyan">IEEE CS Chapter:</strong> Cultivating high-impact computing competence, peer problem-solving, open-source development, and professional ethics in alignment with global IEEE standards.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
                    <span className="text-ieee-cyan">Technical Literacy</span>
                    <span>•</span>
                    <span className="text-white">Research & Excellence</span>
                    <span>•</span>
                    <span className="text-emerald-400">Rural Empowerment</span>
                  </div>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-ieee-gold uppercase tracking-wider">Official Vision</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">MBITS & IEEE CS</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Nurturing Culture, Equipping Future Leaders</h3>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <p>
                      <strong className="text-white">MBITS Vision:</strong> &ldquo;To nurture a positive campus culture and equip the younger generation to take our nation forward.&rdquo;
                    </p>
                    <p>
                      <strong className="text-ieee-gold">IEEE CS Chapter Vision:</strong> To empower students to become competent computer professionals, ethical engineers, and forward-thinking innovators recognized across IEEE Kerala Section and Region 10.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
                    <span className="text-ieee-gold">Positive Campus Culture</span>
                    <span>•</span>
                    <span className="text-white">Nation Building</span>
                    <span>•</span>
                    <span className="text-ieee-cyan">Competent Computing</span>
                  </div>
                </div>
              )}

              {activeTab === 'institution' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Campus Anchor & Accreditation</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">NBA & NAAC ACCREDITED</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Mar Baselios Institute of Technology & Science</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Located in Nellimattom, Kothamangalam, MBITS was established in 2009 by Mar Thoma Cheriyapally under the Mar Basil Group (educational legacy since 1936). Approved by AICTE, affiliated with APJ Abdul Kalam Technological University (KTU), and accredited by NBA & NAAC.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <strong className="text-white">IEEE SB MBITS (STB 65041):</strong> Inaugurated on July 3, 2022 with 34 charter members. Now home to 250+ active members across 5 societies (CS, SPS, CASS, Sensors, WIE) under Counselor <span className="text-ieee-cyan font-medium">Prof. Minu Mary Joy</span> (EEE Dept) and Student Chair <span className="text-ieee-cyan font-medium">Tisa Tijo</span>.
                  </p>
                  <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
                    <span className="text-ieee-cyan">KTU Affiliated</span>
                    <span>•</span>
                    <span className="text-white">AICTE Approved</span>
                    <span>•</span>
                    <span className="text-amber-400">NBA & NAAC Accredited</span>
                    <span>•</span>
                    <span className="text-emerald-400">STB 65041 (250+ Members)</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={pillar.title} 
                  className="glass-panel p-5 rounded-xl hover:border-ieee-cyan/40 transition-all group border-l-2 border-l-ieee-cyan"
                >
                  <h4 className="text-base font-semibold text-white mb-2">{pillar.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Chronological Roadmap */}
        <div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span>// Chapter Odyssey Roadmap</span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {milestones.map((m, index) => (
              <div 
                key={m.year}
                className="bg-slate-900/70 border border-slate-800/80 p-4 rounded-xl hover:border-ieee-cyan/50 hover:bg-slate-900 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-bold text-ieee-cyan">{m.year}</span>
                    <span className="text-[10px] font-mono text-slate-500">Phase 0{index + 1}</span>
                  </div>
                  <h5 className="text-xs font-bold text-white mb-1.5">{m.title}</h5>
                  <p className="text-[11px] text-slate-400 leading-normal">{m.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
