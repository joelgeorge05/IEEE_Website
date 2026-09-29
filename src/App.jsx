import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import ChapterIndicator from './components/ChapterIndicator';
import HeroPrologue from './components/HeroPrologue';
import ChapterSpark from './components/ChapterSpark';
import ChapterArena from './components/ChapterArena';
import ChapterTrophies from './components/ChapterTrophies';
import ChapterGuild from './components/ChapterGuild';
import ChapterArchive from './components/ChapterArchive';
import EpilogueQuest from './components/EpilogueQuest';
import ContactFooter from './components/ContactFooter';
import InteractiveTerminal from './components/InteractiveTerminal';
import AdminDashboard from './components/AdminDashboard';
import { soundFx } from './utils/soundEffects';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState('prologue');

  // Handle browser back/forward history navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Shortcut key: Ctrl + K or Cmd + K to open Terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        soundFx.playTerminalKey();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track active chapter for Scrollytelling on public page
  useEffect(() => {
    if (currentPath === '/admin') return;

    const sectionIds = [
      'prologue',
      'chapter-1',
      'chapter-2',
      'chapter-3',
      'chapter-4',
      'chapter-5',
      'epilogue'
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0.1
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPath]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If path is /admin, render the Executive Admin Management Dashboard
  if (currentPath === '/admin') {
    return <AdminDashboard onNavigateHome={() => navigateTo('/')} />;
  }

  return (
    <div className="relative min-h-screen text-slate-100 bg-ieee-navy selection:bg-ieee-cyan selection:text-ieee-navy">
      {/* Dynamic Background Network */}
      <ParticleBackground />

      {/* Cyber Grid Texture Overlay */}
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-40 z-0" />

      {/* Navigation Header */}
      <Navbar
        isAudioOn={isAudioOn}
        setIsAudioOn={setIsAudioOn}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onNavigateToAdmin={() => navigateTo('/admin')}
      />

      {/* Scrollytelling Chapter Tracker */}
      <ChapterIndicator
        activeChapter={activeChapter}
        onSelectChapter={scrollToSection}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        <HeroPrologue
          onStartStory={() => scrollToSection('chapter-1')}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onNavigateToAdmin={() => navigateTo('/admin')}
        />
        <ChapterSpark />
        <ChapterArena />
        <ChapterTrophies />
        <ChapterGuild />
        <ChapterArchive />
        <EpilogueQuest />
      </main>

      {/* Footer & Contact */}
      <ContactFooter />

      {/* Interactive CLI Terminal Drawer */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigateToAdmin={() => navigateTo('/admin')}
      />
    </div>
  );
}
