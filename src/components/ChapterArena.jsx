import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Tag, 
  X, 
  CheckCircle2, 
  Download,
  AlertCircle,
  Eye,
  Maximize2,
  Trophy,
  Camera,
  Upload,
  Trash2,
  Check
} from 'lucide-react';
import { EVENTS_DATA } from '../data/eventsData';
import { soundFx } from '../utils/soundEffects';
import { api } from '../utils/api';

export default function ChapterArena() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [eventsList, setEventsList] = useState(EVENTS_DATA);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [regSubmitting, setRegSubmitting] = useState(false);
  const [regError, setRegError] = useState('');
  const [regForm, setRegForm] = useState({ name: '', email: '', college: '', ieeeId: '' });
  const [customAnswers, setCustomAnswers] = useState({});
  const [paymentProof, setPaymentProof] = useState(null); // { dataUrl, fileName, fileSize }
  const [previewProofModal, setPreviewProofModal] = useState(false);
  
  // Competition Poster state & Lightbox modal
  const [posterSrc, setPosterSrc] = useState('/webnova-poster.jpg');
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  // Sync latest event configurations (custom fields & payment proof requirements) from backend API
  useEffect(() => {
    api.getEvents()
      .then((res) => {
        if (res.success && Array.isArray(res.events) && res.events.length > 0) {
          setEventsList((prev) => {
            return prev.map((localEv) => {
              const apiEv = res.events.find((e) => e.id === localEv.id);
              if (apiEv) {
                return {
                  ...localEv,
                  ...apiEv,
                  customFields: apiEv.customFields || localEv.customFields || [],
                  requirePaymentProof: apiEv.requirePaymentProof !== undefined ? apiEv.requirePaymentProof : localEv.requirePaymentProof
                };
              }
              return localEv;
            });
          });
        }
      })
      .catch((err) => console.log('Events sync fallback to local dataset:', err));
  }, []);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (previewProofModal) setPreviewProofModal(false);
        else if (isPosterModalOpen) setIsPosterModalOpen(false);
        else if (selectedEvent) setSelectedEvent(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPosterModalOpen, selectedEvent, previewProofModal]);

  // WebNova Countdown Timer (Target: 30 Sept 2026)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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

  const categories = ['All', 'Competition', 'Hackathon', 'Workshop', 'Webinar'];

  const filteredEvents = activeFilter === 'All' 
    ? eventsList 
    : eventsList.filter((e) => e.category === activeFilter);

  const openEventModal = (event) => {
    soundFx.playClick();
    setSelectedEvent(event);
    setRegisteredSuccess(false);
    setRegError('');
    setRegForm({ name: '', email: '', college: '', ieeeId: '' });
    setCustomAnswers({});
    setPaymentProof(null);
  };

  const handleProofUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setRegError('Please upload an image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setRegError('File size exceeds 8MB. Please select a smaller screenshot.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPaymentProof({
        dataUrl: reader.result,
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(1) + ' KB'
      });
      setRegError('');
      soundFx.playSuccess();
    };
    reader.onerror = () => {
      setRegError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError('');

    // Check required custom dynamic fields
    if (selectedEvent?.customFields && selectedEvent.customFields.length > 0) {
      for (const field of selectedEvent.customFields) {
        if (field.required && (!customAnswers[field.id] || !customAnswers[field.id].toString().trim())) {
          setRegError(`Please provide ${field.label}.`);
          soundFx.playClick();
          return;
        }
      }
    }

    // Check payment screenshot if required
    if (selectedEvent?.requirePaymentProof && !paymentProof?.dataUrl) {
      setRegError('Please upload a screenshot of your registration fee payment (UPI / receipt).');
      soundFx.playClick();
      return;
    }

    setRegSubmitting(true);
    try {
      const eventId = selectedEvent?.id || 'webnova-2026';
      const eventName = selectedEvent?.title || 'WebNova 2026';

      const res = await api.submitRegistration({
        eventId,
        eventName,
        name: regForm.name,
        email: regForm.email,
        college: regForm.college,
        ieeeId: regForm.ieeeId,
        isIeeeMember: Boolean(regForm.ieeeId),
        paymentProof: paymentProof?.dataUrl || null,
        customAnswers
      });

      if (res.success) {
        soundFx.playSuccess();
        setRegisteredSuccess(true);
      } else {
        soundFx.playClick();
        setRegError(res.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      soundFx.playClick();
      setRegError('Failed to communicate with registration server.');
    } finally {
      setRegSubmitting(false);
    }
  };

  return (
    <section id="chapter-2" className="py-24 relative border-b border-ieee-border/50 bg-slate-950/30">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Chapter Header */}
        <div className="mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-ieee-cyan block mb-1">
            Chapter 02 // Action & Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            The Arena of Battles
          </h2>
        </div>

        <p className="text-slate-300 max-w-3xl text-base sm:text-lg mb-12 font-light leading-relaxed">
          Where engineers test their boundaries. Explore our flagship competitions, 24-hour hackathons, and certified technical symposiums.
        </p>

        {/* Featured Marquee Banner: WebNova */}
        <div className="relative mb-16 rounded-3xl overflow-hidden border border-ieee-cyan/40 bg-gradient-to-br from-ieee-surface via-slate-950 to-ieee-navy p-6 sm:p-8 lg:p-10 shadow-[0_0_40px_rgba(0,98,155,0.25)]">
          {/* Cyber Glow Accent */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-ieee-cyan/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-ieee-blue/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-center">
            
            {/* 1. Official Competition Poster Slot */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div 
                onClick={() => {
                  soundFx.playClick();
                  setIsPosterModalOpen(true);
                }}
                className="relative rounded-2xl overflow-hidden border border-ieee-cyan/40 bg-slate-950 shadow-2xl group cursor-pointer aspect-[3/4] max-h-[460px] w-full flex items-center justify-center transition-all hover:border-ieee-cyan hover:shadow-[0_0_35px_rgba(0,210,255,0.35)] p-1.5"
                title="Click to view full competition poster"
              >
                <img 
                  src={posterSrc}
                  onError={() => {
                    if (posterSrc === '/webnova-poster.jpg') {
                      setPosterSrc('/webnova-poster.png');
                    } else if (posterSrc === '/webnova-poster.png') {
                      setPosterSrc('/webnova-poster.svg');
                    }
                  }}
                  alt="WebNova 2026 Official Competition Poster"
                  className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
                />

                {/* Hover Quick Action Overlay */}
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                  <Maximize2 className="w-8 h-8 text-ieee-cyan mb-2" />
                  <span className="text-xs font-mono font-bold text-white mb-1">Click to Expand Poster</span>
                  <span className="text-[10px] font-mono text-slate-300">View high-resolution flyer</span>
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between px-1 text-[11px] font-mono text-slate-400">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-ieee-cyan" />
                  Official Competition Flyer
                </span>
                <button 
                  onClick={() => {
                    soundFx.playClick();
                    setIsPosterModalOpen(true);
                  }}
                  className="text-ieee-cyan hover:underline flex items-center gap-1 font-semibold"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Expand Poster</span>
                </button>
              </div>
            </div>

            {/* 2. Competition Details & Action */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ieee-blue/30 border border-ieee-cyan/40 text-xs font-mono text-ieee-cyan">
                <span className="w-1.5 h-1.5 rounded-full bg-ieee-cyan" />
                <span>OFFICIAL CHAPTER COMPETITION</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl xl:text-4xl font-bold font-display text-white tracking-tight leading-tight">
                WebNova — Website Design Competition
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                "The web is your canvas. Your creativity is the limit." Design and develop a breathtaking official portal for IEEE Computer Society MBITS. Shape the layout, architecture, and overall experience in your own vision.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-lg text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Prize: ₹1,000
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-mono bg-ieee-blue/20 text-ieee-cyan border border-ieee-cyan/30">
                  IEEE Members: FREE
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Non-IEEE: ₹15
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                  Mode: Online | Individual
                </span>
              </div>

              {/* Button Action */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openEventModal(eventsList[0] || EVENTS_DATA[0])}
                  className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-ieee-blue to-ieee-cyan text-white shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:shadow-[0_0_30px_rgba(0,210,255,0.7)] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Submit / Register Entry</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
                <div className="text-xs text-slate-400 font-mono">
                  Deadline: <span className="text-white font-semibold">30 September 2026</span>
                </div>
              </div>
            </div>

            {/* 3. Live Countdown Box & Deliverables */}
            <div className="lg:col-span-3 bg-slate-900/90 border border-ieee-border p-5 rounded-2xl shadow-xl backdrop-blur flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-ieee-cyan" />
                  <span>Countdown Timer</span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 text-center mb-4">
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <div className="font-mono text-xl sm:text-2xl font-bold text-white">{timeLeft.days}</div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Days</div>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <div className="font-mono text-xl sm:text-2xl font-bold text-ieee-cyan">{timeLeft.hours}</div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Hours</div>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <div className="font-mono text-xl sm:text-2xl font-bold text-ieee-cyan">{timeLeft.minutes}</div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Mins</div>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <div className="font-mono text-xl sm:text-2xl font-bold text-ieee-gold">{timeLeft.seconds}</div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Secs</div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-1 font-mono bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <div className="text-[11px] text-slate-400">// Deliverables:</div>
                <div className="truncate">• Full source code ZIP</div>
                <div className="truncate">• Live URL / GitHub repo</div>
                <div className="truncate">• Page screenshots</div>
              </div>
            </div>

          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playClick();
                setActiveFilter(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeFilter === cat
                  ? 'bg-ieee-blue text-white shadow-[0_0_15px_rgba(0,98,155,0.4)] border border-ieee-cyan/40 font-semibold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-ieee-cyan/40 hover:-translate-y-1 transition-all group"
            >
              <div>
                {/* Event Poster Flyer if available */}
                {event.poster && (
                  <div 
                    onClick={() => openEventModal(event)}
                    className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-4 border border-slate-800 bg-slate-950 group-hover:border-ieee-cyan/50 transition-all flex items-center justify-center cursor-pointer p-1.5 shadow-md"
                    title="Click to view full event details"
                  >
                    <img 
                      src={event.poster} 
                      alt={event.title} 
                      className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-ieee-surface border border-slate-700 text-slate-300">
                    {event.category}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      event.status === 'Upcoming'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-ieee-cyan transition-colors">
                  {event.title}
                </h4>

                <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-2 mb-6 text-xs text-slate-300 font-mono">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-ieee-cyan" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                  {event.speaker && (
                    <div className="flex items-center gap-1.5 text-ieee-cyan font-mono text-[11px] truncate">
                      <span className="font-bold opacity-75">Speaker:</span>
                      <span className="truncate">{event.speaker}</span>
                    </div>
                  )}
                  {event.prizePool && (
                    <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                      <span className="font-bold opacity-75">Prize:</span>
                      <span>{event.prizePool}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => openEventModal(event)}
                  className="text-xs font-semibold text-ieee-cyan hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => openEventModal(event)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-ieee-blue/20 hover:bg-ieee-blue/40 text-ieee-cyan border border-ieee-cyan/30 transition-all flex items-center gap-1.5"
                >
                  <span>Register</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Modal: Event Details & Quick Registration */}
      {selectedEvent && createPortal(
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              soundFx.playClick();
              setSelectedEvent(null);
            }
          }}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-3 md:p-4 overflow-y-auto animate-fadeIn"
        >
          <div className="bg-slate-900 border border-ieee-cyan/40 w-[96vw] max-w-[1700px] rounded-2xl shadow-2xl relative my-auto max-h-[94vh] flex flex-col overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-slate-800 bg-slate-950/90 shrink-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-ieee-blue/20 text-ieee-cyan text-xs font-mono border border-ieee-cyan/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-ieee-cyan" />
                  {selectedEvent.category}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  selectedEvent.status === 'Upcoming'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {selectedEvent.status}
                </span>
                <span className="hidden md:inline text-xs font-mono text-slate-300 ml-2 font-semibold truncate max-w-md">
                  {selectedEvent.title}
                </span>
              </div>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setSelectedEvent(null);
                }}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Panoramic 3-Panel Grid: Wide horizontal space utilization */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 overflow-y-auto lg:overflow-visible">
              
              {/* Panel 1: Official Poster Showcase */}
              <div className="lg:col-span-3 p-4 sm:p-5 bg-slate-950/70 flex flex-col justify-between gap-3">
                {selectedEvent.poster ? (
                  <div className="flex flex-col items-center justify-center flex-1">
                    <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 bg-black flex items-center justify-center p-2 shadow-inner">
                      <img 
                        src={selectedEvent.poster} 
                        alt={selectedEvent.title} 
                        className="max-h-[50vh] lg:max-h-[56vh] w-auto object-contain mx-auto rounded shadow-lg"
                      />
                    </div>
                    
                    <div className="w-full mt-2.5 flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Official Flyer
                      </span>
                      <a
                        href={selectedEvent.poster}
                        download={`${selectedEvent.id}-poster`}
                        className="px-3 py-1.5 rounded-lg bg-ieee-blue hover:bg-ieee-lightBlue text-white transition-colors flex items-center gap-1.5 text-xs font-semibold shadow"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Flyer</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full min-h-[220px] rounded-xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center text-slate-500 font-mono text-xs">
                    <Calendar className="w-10 h-10 text-slate-600 mb-1" />
                    <span>IEEE CS Official Event</span>
                  </div>
                )}

                {/* Winner Announcement if available */}
                {selectedEvent.winner && (
                  <div className="p-2.5 rounded-lg border border-amber-500/30 bg-amber-950/20 text-xs">
                    <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
                      <span>🏆 Winner:</span>
                      <span className="text-white font-semibold">{selectedEvent.winner}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Panel 2: Event Details & Specifications (Expanded Middle Column) */}
              <div className="lg:col-span-5 p-4 sm:p-5 space-y-3 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-1 leading-snug">
                    {selectedEvent.title}
                  </h3>
                  {selectedEvent.subtitle && (
                    <div className="text-xs font-mono text-ieee-cyan mb-2">
                      {selectedEvent.subtitle}
                    </div>
                  )}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                    {selectedEvent.description}
                  </p>

                  {/* Featured Speaker if available */}
                  {selectedEvent.speaker && (
                    <div className="mb-3 p-2.5 rounded-xl border border-ieee-cyan/30 bg-ieee-blue/15 text-xs font-mono flex items-start gap-2.5">
                      <span className="text-ieee-cyan font-bold text-sm mt-0.5">★</span>
                      <div>
                        <span className="text-ieee-cyan font-bold block text-[10px] uppercase tracking-wider">
                          Keynote Speaker / Trainer
                        </span>
                        <span className="text-white text-xs sm:text-sm font-semibold block leading-tight mt-0.5">{selectedEvent.speaker}</span>
                      </div>
                    </div>
                  )}

                  {/* Clean Structured Event Specifications */}
                  <div className="space-y-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                    {/* Row 1: Date & Time in 2 balanced cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/70 border border-slate-800/80">
                        <div className="p-1.5 rounded-md bg-ieee-blue/20 text-ieee-cyan shrink-0">
                          <Calendar className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Event Date</div>
                          <div className="text-xs font-semibold text-white">{selectedEvent.date}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/70 border border-slate-800/80">
                        <div className="p-1.5 rounded-md bg-ieee-blue/20 text-ieee-cyan shrink-0">
                          <Clock className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Time / Deadline</div>
                          <div className="text-xs font-semibold text-white">{selectedEvent.time}</div>
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Venue Card */}
                    <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/70 border border-slate-800/80">
                      <div className="p-1.5 rounded-md bg-slate-800 text-slate-300 shrink-0">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Venue & Mode</div>
                        <div className="text-xs font-semibold text-white">{selectedEvent.venue}</div>
                      </div>
                    </div>

                    {/* Row 3: Fee & Prize Pool in balanced cards */}
                    {(selectedEvent.registrationFee || selectedEvent.prizePool) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedEvent.registrationFee && (
                          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/70 border border-slate-800/80">
                            <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs">
                              ₹
                            </div>
                            <div className="min-w-0">
                              <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Registration Fee</div>
                              <div className="text-xs font-semibold text-emerald-300">{selectedEvent.registrationFee}</div>
                            </div>
                          </div>
                        )}

                        {selectedEvent.prizePool && (
                          <div className={`flex items-center gap-2.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 ${!selectedEvent.registrationFee ? 'sm:col-span-2' : ''}`}>
                            <div className="p-1.5 rounded-md bg-amber-500/20 text-amber-300 shrink-0">
                              <Trophy className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-[9px] uppercase tracking-wider text-amber-400/80 font-bold">Prize Pool / Perk</div>
                              <div className="text-xs font-bold text-amber-200">{selectedEvent.prizePool}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Row 4: Organizer & Contact Bar */}
                    {(selectedEvent.coordinator || selectedEvent.contacts) && (
                      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-slate-900/50 border border-slate-800/60 text-[11px]">
                        {selectedEvent.coordinator && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-500 font-medium">Organizer:</span>
                            <span className="text-slate-300 font-semibold">{selectedEvent.coordinator}</span>
                          </div>
                        )}
                        {selectedEvent.contacts && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-500 font-medium">Contact:</span>
                            <span className="text-slate-300 font-semibold">{selectedEvent.contacts}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Official External Link if available */}
                    {selectedEvent.registrationLink && (
                      <div className="pt-0.5">
                        <a
                          href={selectedEvent.registrationLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-ieee-cyan hover:underline font-mono"
                        >
                          <span>Official Portal: {selectedEvent.registrationLink}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Deliverables / Judging Criteria if available */}
                {selectedEvent.judgingCriteria && (
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-xs">
                    <div className="font-mono text-ieee-cyan uppercase font-semibold mb-1 text-[11px]">
                      Evaluation & Judging Criteria:
                    </div>
                    <div className="text-slate-300 space-y-0.5 text-[11px]">
                      {selectedEvent.judgingCriteria.map((c, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span className="text-ieee-cyan">•</span>
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Panel 3: Filling Boxes & Dynamic Registration Form (Right Column) */}
              <div className="lg:col-span-4 p-4 sm:p-5 bg-slate-950/60 flex flex-col justify-between max-h-[82vh] overflow-y-auto">
                {registeredSuccess ? (
                  <div className="bg-emerald-950/40 border border-emerald-500/40 p-5 rounded-2xl text-center space-y-3 my-auto animate-fadeIn">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="text-base font-bold text-white">Registration Confirmed!</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      You are signed up for <strong className="text-white">{selectedEvent.title}</strong>.
                      {selectedEvent.requirePaymentProof && (
                        <span className="block mt-1.5 text-emerald-300 font-mono text-[11px]">
                          ✓ Payment proof received and submitted for verification.
                        </span>
                      )}
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => setSelectedEvent(null)}
                        className="px-4 py-2 rounded-xl text-xs font-mono bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                      >
                        Close Window
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-3 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 mb-2.5">
                        <span className="text-xs font-mono text-white font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Registration Form
                        </span>
                        <span className="text-[10px] font-mono text-ieee-cyan">MBITS CS</span>
                      </div>

                      {regError && (
                        <div className="p-2 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-1.5 mb-2.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />
                          <span>{regError}</span>
                        </div>
                      )}

                      {/* Standard Participant Information */}
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 mb-0.5">
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter your full name"
                            value={regForm.name}
                            onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-ieee-cyan transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 mb-0.5">
                            Email Address <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="name@domain.com"
                            value={regForm.email}
                            onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-ieee-cyan transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 mb-0.5">
                            College / Institution <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. MBITS Kothamangalam"
                            value={regForm.college}
                            onChange={(e) => setRegForm({ ...regForm, college: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-ieee-cyan transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 mb-0.5">
                            IEEE Membership ID (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 98765432"
                            value={regForm.ieeeId}
                            onChange={(e) => setRegForm({ ...regForm, ieeeId: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-ieee-cyan transition-colors"
                          />
                        </div>
                      </div>

                      {/* Dynamic Custom Fields ("Boxes" configured from Admin Panel) */}
                      {selectedEvent.customFields && selectedEvent.customFields.length > 0 && (
                        <div className="space-y-2 pt-2.5 mt-2.5 border-t border-slate-800">
                          <div className="flex items-center justify-between pb-0.5">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-ieee-cyan font-semibold">
                              Additional Information
                            </span>
                            <span className="text-[9px] font-mono text-slate-500">Event Specific</span>
                          </div>

                          {selectedEvent.customFields.map((field) => (
                            <div key={field.id}>
                              <label className="block text-[10px] font-mono text-slate-400 mb-0.5">
                                {field.label} {field.required && <span className="text-red-400">*</span>}
                              </label>
                              <input
                                type={field.type || 'text'}
                                required={Boolean(field.required)}
                                placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                                value={customAnswers[field.id] || ''}
                                onChange={(e) => setCustomAnswers({ ...customAnswers, [field.id]: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-ieee-cyan transition-colors"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Payment Proof Screenshot Upload Box */}
                      {selectedEvent.requirePaymentProof && (
                        <div className="space-y-1.5 pt-2.5 mt-2.5 border-t border-slate-800">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-mono text-white font-bold uppercase tracking-wider flex items-center gap-1.5">
                              <Camera className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Payment Screenshot</span>
                              <span className="text-red-400">*</span>
                            </label>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              Fee Verification
                            </span>
                          </div>

                          <div className="text-[10px] font-mono text-slate-300 bg-slate-900/80 p-2 rounded-lg border border-slate-800 space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400">Entry Fee:</span>
                              <span className="text-emerald-400 font-bold">{selectedEvent.registrationFee || selectedEvent.fee || '₹100'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400">UPI ID:</span>
                              <span className="text-ieee-cyan font-bold select-all">ieeecs.mbits@upi</span>
                            </div>
                          </div>

                          {!paymentProof ? (
                            <div>
                              <label className="flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-slate-700 hover:border-ieee-cyan/70 bg-slate-950/70 hover:bg-slate-900/80 transition-all cursor-pointer group text-center">
                                <Upload className="w-5 h-5 text-slate-400 group-hover:text-ieee-cyan transition-colors mb-1" />
                                <span className="text-[11px] font-mono text-slate-200 group-hover:text-white font-semibold">
                                  Upload Payment Screenshot
                                </span>
                                <span className="text-[9px] font-mono text-slate-500 mt-0.5">
                                  PNG, JPG, WEBP (UPI transfer receipt)
                                </span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleProofUpload}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          ) : (
                            <div className="p-2 rounded-xl bg-slate-900/90 border border-emerald-500/40 flex items-center justify-between gap-2 shadow-inner">
                              <div 
                                onClick={() => setPreviewProofModal(true)}
                                className="flex items-center gap-2 min-w-0 cursor-pointer group flex-1"
                                title="Click to inspect receipt screenshot"
                              >
                                <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-700 bg-black shrink-0 relative group-hover:border-ieee-cyan transition-colors">
                                  <img src={paymentProof.dataUrl} alt="Payment Receipt" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Eye className="w-3.5 h-3.5 text-white" />
                                  </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-[11px] font-mono text-emerald-300 font-semibold truncate">
                                    {paymentProof.fileName}
                                  </div>
                                  <div className="text-[9px] font-mono text-slate-400 flex items-center gap-1">
                                    <span>{paymentProof.fileSize}</span>
                                    <span>•</span>
                                    <span className="text-emerald-400 font-medium">Ready</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => setPreviewProofModal(true)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                                  title="View Fullscreen"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setPaymentProof(null)}
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                                  title="Remove Screenshot"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedEvent(null)}
                        className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={regSubmitting}
                        className="px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-ieee-blue to-ieee-cyan text-white shadow-lg hover:shadow-ieee-cyan/30 transition-all font-mono"
                      >
                        {regSubmitting ? 'Registering...' : 'Confirm Registration'}
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Payment Screenshot Zoom/Lightbox Modal for Participant */}
      {previewProofModal && paymentProof && createPortal(
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setPreviewProofModal(false);
          }}
          className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
        >
          <div className="relative max-w-lg w-full bg-slate-950 border border-emerald-500/50 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col items-center my-auto">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs text-white font-bold">Uploaded Payment Screenshot</span>
              </div>
              <button
                onClick={() => setPreviewProofModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-hidden rounded-xl border border-slate-800 flex items-center justify-center bg-black w-full p-2">
              <img 
                src={paymentProof.dataUrl} 
                alt="Payment Receipt Preview" 
                className="max-h-[70vh] w-auto object-contain mx-auto rounded shadow-lg"
              />
            </div>

            <div className="w-full pt-3 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{paymentProof.fileName} ({paymentProof.fileSize})</span>
              <button
                onClick={() => setPreviewProofModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Full-Screen Competition Poster Lightbox Modal */}
      {isPosterModalOpen && createPortal(
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsPosterModalOpen(false);
          }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
        >
          <div className="relative max-w-2xl w-full bg-slate-950 border border-ieee-cyan/50 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col items-center my-auto">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs text-white font-bold">WebNova 2026 Official Poster</span>
              </div>
              <button
                onClick={() => setIsPosterModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[78vh] overflow-hidden rounded-xl border border-slate-800 flex items-center justify-center bg-black w-full shadow-inner p-2">
              <img 
                src={posterSrc}
                alt="WebNova 2026 Official Poster Full View"
                className="max-h-[75vh] w-auto object-contain mx-auto rounded shadow-lg"
              />
            </div>

            <div className="w-full pt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
              <span className="text-[11px] text-slate-500">Image file target: public/webnova-poster.jpg</span>
              <a
                href={posterSrc}
                download="WebNova-2026-Competition-Poster"
                className="px-3.5 py-1.5 rounded-lg bg-ieee-blue hover:bg-ieee-lightBlue text-white transition-colors flex items-center gap-1.5 font-semibold text-xs font-mono shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Poster</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}

    </section>
  );
}
