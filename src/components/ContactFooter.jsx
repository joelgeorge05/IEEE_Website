import React, { useState } from 'react';
import { 
  Send, 
  MapPin, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ArrowUp,
  Globe,
  Loader2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import { soundFx } from '../utils/soundEffects';
import { api } from '../utils/api';

export default function ContactFooter() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'How does someone join IEEE Computer Society MBITS?',
      a: 'Students can register through the official IEEE portal (Student Branch 65041) or connect directly with our chapter ExeCom officers at MBITS campus during membership drives.'
    },
    {
      q: 'What technical domains and Special Interest Groups (SIGs) are active?',
      a: 'We host 4 active student-run tracks: Artificial Intelligence & Machine Learning, Full Stack & Cloud Infrastructure, Cybersecurity & CTF War Rooms, and Competitive Programming & Algorithms.'
    },
    {
      q: 'Are non-IEEE students eligible to participate in workshops and events?',
      a: 'Yes! Most of our open workshops, hackathons, and webinars welcome all college students. Chapter members receive free access, hardware kits, and subsidized entry.'
    },
    {
      q: 'What global benefits and travel grants are available to members?',
      a: 'Members receive complimentary access to IEEE Xplore Digital Library, eligibility for the Richard E. Merwin Scholarship, conference travel grants, and IEEE email aliases.'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // 1. Submit to Backend API
      await api.submitMessage(formData);

      // 2. Also keep in localStorage for resilient offline sync
      try {
        const stored = JSON.parse(localStorage.getItem('ieee_transmissions') || '[]');
        stored.unshift({
          id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
          ...formData,
          status: 'new',
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('ieee_transmissions', JSON.stringify(stored));
      } catch (err) {}

      soundFx.playSuccess();
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('API submission error, using local fallback:', err);
      try {
        const stored = JSON.parse(localStorage.getItem('ieee_transmissions') || '[]');
        stored.unshift({
          id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
          ...formData,
          status: 'new',
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('ieee_transmissions', JSON.stringify(stored));
      } catch (e) {}

      soundFx.playSuccess();
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    soundFx.playChapterSwoosh();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative pt-24 pb-12 bg-slate-950 border-t border-ieee-border">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Row 1: Contact Form (Left) & FAQs (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-8 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-ieee-cyan">
                Transmission Portal
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1 mb-2">
                Connect with the Chapter
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Have questions regarding WebNova, membership, hackathon partnerships, or technical workshops? Send a direct transmission to the IEEE CS MBITS team.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Transmission Dispatched!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Thank you for reaching out. The Executive Committee will review your message and reply via email within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-mono text-emerald-400 underline hover:text-emerald-300"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Thomas"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-ieee-cyan transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-ieee-cyan transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="WebNova Inquiry / Membership / Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-ieee-cyan transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Type your message or inquiry here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-ieee-cyan transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-ieee-blue to-ieee-cyan text-white shadow-lg hover:shadow-ieee-cyan/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 font-mono disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  <span>{isSubmitting ? 'Dispatching...' : 'Send Transmission'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-ieee-gold">
                Frequently Answered
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1 mb-2">
                Competition & Chapter FAQ
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Everything you need to know regarding WebNova submissions, student memberships, technical tracks, and IEEE global grants.
              </p>
            </div>

            {/* Accordion */}
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.q}
                    className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setOpenFaq(isOpen ? null : index);
                      }}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-medium text-white hover:text-ieee-cyan transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-ieee-cyan shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3 bg-slate-950/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Row 2: Campus Address (Left) & Chapter Credentials (Right) — Perfectly Aligned horizontally */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-16 items-stretch">
          
          {/* Left Card: Campus Address & Official Communication Channels */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between text-xs text-slate-300 font-mono shadow-xl backdrop-blur h-full space-y-4">
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-ieee-cyan uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-ieee-cyan shrink-0" />
                  <span>CAMPUS ADDRESS</span>
                </div>
                <span className="text-[10px] text-slate-400 font-normal">STB 65041</span>
              </div>

              <div className="space-y-1 text-slate-300 leading-relaxed">
                <p className="font-semibold text-white text-sm">Mar Baselios Institute of Technology and Science</p>
                <p className="text-slate-400">Nellimattom P.O., Kothamangalam</p>
                <p className="text-slate-400">Kerala, India - 686693</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-ieee-cyan shrink-0" />
                <span className="text-slate-500">Email:</span>
                <a href="mailto:ieeesbmbits@gmail.com" className="text-white hover:text-ieee-cyan transition-colors truncate hover:underline">
                  ieeesbmbits@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-ieee-cyan shrink-0" />
                <span className="text-slate-500">Website:</span>
                <a href="https://ieeesbmbits.in" target="_blank" rel="noreferrer" className="text-ieee-cyan hover:text-white transition-colors truncate hover:underline">
                  https://ieeesbmbits.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <InstagramIcon className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span className="text-slate-500">Instagram:</span>
                <a href="https://www.instagram.com/ieeesbmbits?stkn=dTlwMjVyajhuNDlo" target="_blank" rel="noreferrer" className="text-pink-400 hover:text-white transition-colors truncate hover:underline">
                  @ieeesbmbits
                </a>
              </div>
              <div className="flex items-center gap-2">
                <LinkedinIcon className="w-3.5 h-3.5 text-ieee-cyan shrink-0" />
                <span className="text-slate-500">LinkedIn:</span>
                <a href="https://www.linkedin.com/company/ieee-student-branch-mbits/" target="_blank" rel="noreferrer" className="text-ieee-cyan hover:text-white transition-colors truncate hover:underline">
                  IEEE SB MBITS
                </a>
              </div>
            </div>
          </div>

          {/* Right Card: Chapter Credentials & Verification */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between text-xs text-slate-300 font-mono shadow-xl backdrop-blur h-full space-y-4">
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-ieee-cyan uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-2">
                <span>CHAPTER CREDENTIALS</span>
                <span className="text-emerald-400 flex items-center gap-1.5 text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active Branch 2026
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">IEEE Student Branch</span>
                  <span className="text-white font-semibold">STB 65041 (MBITS)</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Section & Hub</span>
                  <span className="text-white font-semibold">Kerala Section • Kochi Hub</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Technical Society</span>
                  <span className="text-white font-semibold">IEEE Computer Society</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Support Turnaround</span>
                  <span className="text-emerald-300 font-semibold">Within 24 Hours</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
              Official Chapter of IEEE Computer Society, fostering computing excellence, student research, hackathons, and technical leadership across Kerala.
            </div>
          </div>

        </div>

        {/* Logos & Institutional Endorsement */}
        <div className="pt-10 pb-6 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6 border-t border-slate-800/80 text-center md:text-right">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 shrink-0">
            <div className="h-9 sm:h-10 px-2.5 sm:px-3 py-1 rounded-xl bg-white/95 flex items-center justify-center shadow-md">
              <img src="/ieee-logo.svg" alt="IEEE Logo" className="h-6 sm:h-7 w-auto object-contain" />
            </div>
            <div className="h-9 sm:h-10 px-2.5 sm:px-3 py-1 rounded-xl bg-white/95 flex items-center justify-center shadow-md">
              <img src="/ieee-cs-logo.png" alt="IEEE Computer Society Logo" className="h-6 sm:h-7 w-auto object-contain" />
            </div>
            <div className="h-9 sm:h-10 px-2.5 sm:px-3 py-1 rounded-xl bg-white/95 flex items-center justify-center shadow-md">
              <img src="/mbits-logo.jpg" alt="MBITS Logo" className="h-6 sm:h-7 w-auto object-contain" />
            </div>
          </div>

          <div className="text-xs text-slate-400 font-mono space-y-1 text-center md:text-right w-full md:w-auto">
            <div className="text-white font-medium text-xs sm:text-sm">
              Mar Baselios Institute of Technology and Science
            </div>
            <div className="text-[11px] text-slate-400 leading-relaxed text-balance">
              <span className="block sm:inline">Nellimattom P.O., Kothamangalam, </span>
              <span className="block sm:inline">Kerala, India — 686693</span>
            </div>
            <div className="pt-0.5 flex items-center justify-center md:justify-end">
              <a 
                href="https://ieeesbmbits.in" 
                target="_blank" 
                rel="noreferrer" 
                className="text-ieee-cyan hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>ieeesbmbits.in</span>
                <Globe className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Socials, Back to Top */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="text-xs text-slate-400 leading-relaxed text-center md:text-left w-full md:w-auto space-y-0.5">
            <div>© 2026 IEEE Computer Society MBITS (STB 65041).</div>
            <div className="text-slate-400">All rights reserved.</div>
          </div>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://www.linkedin.com/company/ieee-student-branch-mbits/"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick()}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-ieee-cyan border border-slate-800 hover:border-slate-700 transition-colors"
              title="IEEE Student Branch MBITS LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick()}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/ieeesbmbits?stkn=dTlwMjVyajhuNDlo"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick()}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-pink-400 border border-slate-800 hover:border-slate-700 transition-colors"
              title="Instagram @ieeesbmbits"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://ieeesbmbits.in"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick()}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-ieee-cyan border border-slate-800 hover:border-slate-700 transition-colors"
              title="IEEE SB MBITS Official Website (ieeesbmbits.in)"
            >
              <Globe className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-ieee-blue/20 text-ieee-cyan border border-ieee-cyan/30 hover:bg-ieee-blue hover:text-white transition-all ml-2"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
