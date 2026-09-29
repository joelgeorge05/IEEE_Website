import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, CornerDownLeft, KeyRound, CheckCircle, AlertTriangle } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';
import { api } from '../utils/api';

export default function InteractiveTerminal({ isOpen, onClose, onNavigateToAdmin }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'IEEE Computer Society MBITS Command Line Shell [Version 2.0.26]' },
    { type: 'system', text: 'SB 65041 // Mar Baselios Institute of Technology & Science' },
    { type: 'system', text: 'Type "help" to view full command directory, or query any topic.' }
  ]);
  
  // Theme state: 'default' | 'matrix' | 'cyan' | 'amber'
  const [currentTheme, setCurrentTheme] = useState('cyan');
  
  // Interactive Admin Authentication State Machine
  // authState: 'idle' | 'awaiting_username' | 'awaiting_password' | 'verifying'
  const [authState, setAuthState] = useState('idle');
  const [tempAdminUser, setTempAdminUser] = useState('');

  // Command input history for Up/Down arrow navigation
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, authState]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  // Theme styling configurations
  const themeStyles = {
    cyan: {
      wrapper: 'bg-slate-950/95 border-ieee-cyan/40 shadow-[0_0_40px_rgba(0,210,255,0.25)]',
      header: 'bg-slate-900 border-slate-800 text-ieee-cyan',
      prompt: 'text-ieee-cyan',
      output: 'text-slate-200',
      highlight: 'text-ieee-cyan font-bold',
      system: 'text-slate-400'
    },
    matrix: {
      wrapper: 'bg-black border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.35)]',
      header: 'bg-black border-emerald-900 text-emerald-400',
      prompt: 'text-emerald-400',
      output: 'text-emerald-300',
      highlight: 'text-emerald-400 font-bold',
      system: 'text-emerald-600'
    },
    amber: {
      wrapper: 'bg-amber-950/90 border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.25)]',
      header: 'bg-amber-950 border-amber-900 text-amber-400',
      prompt: 'text-amber-400',
      output: 'text-amber-200',
      highlight: 'text-amber-400 font-bold',
      system: 'text-amber-600'
    },
    default: {
      wrapper: 'bg-slate-950 border-slate-700 shadow-2xl',
      header: 'bg-slate-900 border-slate-800 text-slate-300',
      prompt: 'text-emerald-400',
      output: 'text-slate-200',
      highlight: 'text-white font-bold',
      system: 'text-slate-500'
    }
  };

  const currentStyle = themeStyles[currentTheme] || themeStyles.cyan;

  // Format events detail helper
  const getEventDetail = (id) => {
    switch (id) {
      case 'webnova':
      case 'webnova-2026':
        return `[EVENT PROFILE: WEBNOVA 2026]
--------------------------------------------------------------
Title       : WebNova 2026 — Website Design Showdown
Category    : Flagship Competition
Date        : 30 September 2026 (Live Evaluation)
Venue       : MBITS Computer Center Labs & Online Submission
Prize Pool  : ₹1,000 + IEEE Official Merit Certificates
Capacity    : 100 Participants (Registration Open)
Fee         : FREE for IEEE Members | ₹100 for Non-Members
Description :
  Challenge to design & develop the official chapter portal for 
  IEEE CS MBITS. Evaluated on UI/UX aesthetics, scrollytelling,
  backend architecture, interactive terminal, and performance.
Guidelines  :
  • Submit complete ZIP archive containing source code
  • Provide live demonstration and documentation
  • Strict deadline: 30 Sept 2026 at 23:59 IST`;

      case 'hackelite':
      case 'hackelite-2026':
        return `[EVENT PROFILE: HACKELITE 2026]
--------------------------------------------------------------
Title       : HackElite 24-Hr Hackathon
Category    : Flagship Hackathon
Date        : 18 - 19 October 2026
Venue       : MBITS Central Air-Conditioned Auditorium
Prize Pool  : ₹15,000 + Incubation Support
Capacity    : 60 Teams (Registration Open)
Fee         : ₹150 per Team (Up to 4 Members)
Description :
  24-hour sprint focused on AI-driven social impact, smart campus
  automation, and decentralized civic tech solutions. Includes
  free food, mentorship sessions, and high-speed Wi-Fi.`;

      case 'neuralnexus':
      case 'neuralnexus-workshop':
        return `[EVENT PROFILE: NEURALNEXUS 2026]
--------------------------------------------------------------
Title       : NeuralNexus: GenAI & LLM Fine-Tuning
Category    : Hands-On Technical Masterclass
Date        : 12 November 2026
Venue       : Advanced AI & ML Lab (Block B, Room 204)
Prize Pool  : IEEE Xplore Micro-Credits & Badges
Capacity    : 50 Seats (Registration Open)
Fee         : FREE for IEEE Members | ₹150 for Non-Members
Description :
  Practical workshop covering transformer architectures, LoRA &
  QLoRA parameter-efficient fine-tuning, HuggingFace transformers,
  and building production autonomous agents using LangChain.`;

      case 'cybershield':
      case 'cybershield-ctf':
        return `[EVENT PROFILE: CYBERSHIELD CTF]
--------------------------------------------------------------
Title       : CyberShield State-Level CTF
Category    : Cybersecurity Tournament
Date        : 05 December 2026
Venue       : Cyber Security War Room (Lab 03)
Prize Pool  : ₹8,000 Cash + Swag Kits
Capacity    : 40 Competitors (Registration Open)
Fee         : Free Entry for All College Students
Description :
  Jeopardy-style capture-the-flag tournament testing real-world
  cryptography, web vulnerabilities (SQLi, XSS, SSRF), reverse
  engineering with Ghidra, and Linux binary exploitation.`;

      case 'codemorph':
      case 'codemorph-dsa':
        return `[EVENT PROFILE: CODEMORPH]
--------------------------------------------------------------
Title       : CodeMorph: Algorithmic Sprint
Category    : Competitive Programming
Date        : 20 January 2027
Venue       : Online HackerRank / IEEE Xtreme Arena
Prize Pool  : ₹5,000 + IEEE Xtreme Pre-Qualification
Capacity    : 80 Participants (Registration Open)
Fee         : Free Entry
Description :
  High-speed speedrun testing dynamic programming, graph theory,
  segment trees, and number theory. Serves as official selection
  for MBITS teams heading to IEEE Xtreme 20.0.`;

      default:
        return `Unknown event "${id}". Available event keys:
  • webnova
  • hackelite
  • neuralnexus
  • cybershield
  • codemorph`;
    }
  };

  // Main command executor
  const handleCommand = async (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
      return;
    }

    if (e.key !== 'Enter') {
      soundFx.playTerminalKey();
      return;
    }

    const currentVal = input.trim();
    if (authState === 'idle' && currentVal) {
      setCommandHistory((prev) => [...prev, currentVal]);
      setHistoryIndex(-1);
    }

    // =========================================================================
    // STEP A: INTERACTIVE ADMIN AUTHENTICATION FLOW
    // =========================================================================
    if (authState === 'awaiting_username') {
      const enteredUser = currentVal;
      const newHistory = [...history, { type: 'input', prompt: 'admin-auth:username$ ', text: enteredUser }];

      if (enteredUser.toLowerCase() === 'cancel' || enteredUser.toLowerCase() === 'exit') {
        newHistory.push({
          type: 'output',
          text: '[AUTH] Administrative login cancelled. Returning to guest shell.'
        });
        setAuthState('idle');
        setTempAdminUser('');
        setHistory(newHistory);
        setInput('');
        return;
      }

      if (!enteredUser) {
        newHistory.push({ type: 'error', text: 'Username cannot be blank. Enter username or "cancel":' });
        setHistory(newHistory);
        setInput('');
        return;
      }

      setTempAdminUser(enteredUser);
      setAuthState('awaiting_password');
      newHistory.push({
        type: 'system',
        text: `Username accepted: "${enteredUser}". Now enter administrative passkey:`
      });
      setHistory(newHistory);
      setInput('');
      return;
    }

    if (authState === 'awaiting_password') {
      const enteredPass = currentVal;
      const maskedPass = '•'.repeat(enteredPass.length || 6);
      const newHistory = [...history, { type: 'input', prompt: 'admin-auth:password$ ', text: maskedPass }];

      if (enteredPass.toLowerCase() === 'cancel' || enteredPass.toLowerCase() === 'exit') {
        newHistory.push({
          type: 'output',
          text: '[AUTH] Administrative login cancelled. Returning to guest shell.'
        });
        setAuthState('idle');
        setTempAdminUser('');
        setHistory(newHistory);
        setInput('');
        return;
      }

      newHistory.push({
        type: 'system',
        text: `[SECURITY] Verifying credentials for user "${tempAdminUser}" against backend server...`
      });
      setHistory(newHistory);
      setInput('');
      setAuthState('verifying');

      try {
        const res = await api.login(tempAdminUser, enteredPass);
        if (res.success && res.token) {
          soundFx.playSuccess();
          localStorage.setItem('ieee_admin_token', res.token);
          
          setHistory((prev) => [
            ...prev,
            {
              type: 'success',
              text: `=======================================================
 [ACCESS GRANTED] Administrator Identity Verified
 Session Token  : Bearer ${res.token.slice(0, 18)}...
 Authorized Role: Chapter Executive Administrator
 Transitioning to Executive Command Center (/admin)...
=======================================================`
            }
          ]);

          setAuthState('idle');
          setTempAdminUser('');
          
          setTimeout(() => {
            onClose();
            if (onNavigateToAdmin) onNavigateToAdmin();
          }, 800);
        } else {
          soundFx.playClick();
          setHistory((prev) => [
            ...prev,
            {
              type: 'error',
              text: `[ACCESS DENIED] ${res.message || 'Invalid username or passkey.'}
Authentication failed. Notice: Default credentials are (admin / mbits@ieee2026).
Type "admin" to try again.`
            }
          ]);
          setAuthState('idle');
          setTempAdminUser('');
        }
      } catch (err) {
        soundFx.playClick();
        setHistory((prev) => [
          ...prev,
          {
            type: 'error',
            text: '[SERVER ERROR] Unable to connect to authentication server. Check that backend is running.'
          }
        ]);
        setAuthState('idle');
        setTempAdminUser('');
      }
      return;
    }

    // =========================================================================
    // STEP B: REGULAR SHELL COMMAND INTERPRETER
    // =========================================================================
    const newHistory = [...history, { type: 'input', prompt: 'visitor@mbits-cs:~$ ', text: input }];
    const tokens = currentVal.split(/\s+/).filter(Boolean);
    const command = (tokens[0] || '').toLowerCase();
    const arg1 = (tokens[1] || '').toLowerCase();
    const arg2 = (tokens[2] || '').toLowerCase();

    switch (command) {
      case 'help':
      case 'commands':
      case '?':
        newHistory.push({
          type: 'output',
          text: `IEEE COMPUTER SOCIETY MBITS // INTERACTIVE COMMAND DIRECTORY
====================================================================
CHAPTER & INSTITUTION:
  • about          - Chapter overview, SB 65041 code, papers & mission
  • college        - About MBITS (campus, labs, NAAC accreditation, KTU)
  • domains        - Active technical tracks (AI, Web, Cyber, IoT, DSA)
  • team           - Chapter Executive Committee (ExeCom 2026)
  • achievements   - State & national awards (IEEE Kerala, SIH, Xtreme)
  • gallery        - Milestone archive of workshops, bootcamps & CTFs
  • contact        - Official chapter email, phone, location & socials

EVENTS & REGISTRATIONS:
  • events         - Comprehensive calendar of active & upcoming events
  • event <id>     - Deep dive into an event (e.g. "event webnova")
  • stats          - Live registration metrics directly from database
  • register       - Participant registration instructions & flow
  • webnova        - WebNova 2026 design challenge rules & prize pool
  • quest          - Interactive Chapter 06 Knowledge Quest overview

ADMINISTRATION & SECURITY:
  • admin          - Authenticate & unlock Executive Portal (/admin)
                     (Prompts for username and passkey in terminal)

SHELL UTILITIES:
  • theme <name>   - Change theme: "theme cyan", "theme matrix", "theme amber"
  • clear          - Clear the terminal screen buffer
  • exit           - Close the terminal modal
  • sudo           - Execute with root privileges (easter egg)`
        });
        break;

      case 'admin':
        // If credentials provided inline: "admin <user> <pass>"
        if (tokens.length >= 3) {
          const u = tokens[1];
          const p = tokens[2];
          newHistory.push({
            type: 'system',
            text: `[SECURITY] Authenticating credentials for "${u}"...`
          });
          setHistory(newHistory);
          setInput('');

          try {
            const res = await api.login(u, p);
            if (res.success && res.token) {
              soundFx.playSuccess();
              localStorage.setItem('ieee_admin_token', res.token);
              setHistory((prev) => [
                ...prev,
                {
                  type: 'success',
                  text: `[ACCESS GRANTED] Session token created. Redirecting to /admin...`
                }
              ]);
              setTimeout(() => {
                onClose();
                if (onNavigateToAdmin) onNavigateToAdmin();
              }, 700);
            } else {
              soundFx.playClick();
              setHistory((prev) => [
                ...prev,
                {
                  type: 'error',
                  text: `[ACCESS DENIED] ${res.message || 'Invalid credentials'}.`
                }
              ]);
            }
          } catch (err) {
            setHistory((prev) => [
              ...prev,
              { type: 'error', text: 'Authentication server error.' }
            ]);
          }
          return;
        }

        // Interactive prompt mode
        setAuthState('awaiting_username');
        newHistory.push({
          type: 'output',
          text: `[SECURITY GATEWAY] Administrative Authentication Required
--------------------------------------------------------------------
You have requested access to the Executive Admin Dashboard (/admin).
Credentials must be verified to unlock the management console.
(Default executive credentials: user "admin" | pass "mbits@ieee2026")

Please enter admin username (or type "cancel" to abort):`
        });
        break;

      case 'about':
      case 'chapter':
      case 'sb':
        newHistory.push({
          type: 'output',
          text: `[IEEE COMPUTER SOCIETY MBITS STUDENT BRANCH CHAPTER]
====================================================================
Student Branch Code : SB 65041
Section Affiliation : IEEE Kerala Section, Region 10 (Asia-Pacific)
Host Institution    : Mar Baselios Institute of Technology & Science
Year of Charter     : 2018
Active Membership   : 150+ Student Technologists & Faculty Advisors
Research Output     : 6 Student Research Papers indexed in IEEE Xplore
Official Website    : https://mbits.ac.in

VISION:
  To be a center of computing excellence that nurtures innovative,
  socially responsible, and technically adept engineers capable of
  shaping the global digital frontier.

MISSION:
  • Provide premier technical workshops, hackathons & certification
  • Foster research rigor and encourage international publications
  • Promote ethical technology, open-source adoption, and cyber defense
  • Bridge academia with leading computing and software industries`
        });
        break;

      case 'college':
      case 'mbits':
      case 'campus':
        newHistory.push({
          type: 'output',
          text: `[MAR BASELIOS INSTITUTE OF TECHNOLOGY AND SCIENCE (MBITS)]
====================================================================
Location            : Nellimattom P.O., Kothamangalam, Ernakulam, Kerala
Accreditation       : NAAC Accredited & Approved by AICTE, New Delhi
University          : APJ Abdul Kalam Technological University (KTU)
Management          : Malankara Orthodox Syrian Church Colleges Trust
Campus Scale        : 25+ Acres scenic, green, high-tech campus

COMPUTING & RESEARCH INFRASTRUCTURE:
  • Advanced Computing Labs with Gigabit Ethernet and high-speed fiber
  • NVIDIA GPU-enabled Artificial Intelligence & Deep Learning Rig
  • Dedicated IoT Maker Space & Robotics Prototyping Cell
  • State-of-the-Art Central Auditorium & Seminar Complexes
  • Active IEEE, ISTE, CSI, and ACM Student Chapters

KEY ACADEMIC DEPARTMENTS:
  • Computer Science & Engineering (CSE)
  • Artificial Intelligence & Data Science (AI&DS)
  • Electronics & Communication Engineering (ECE)
  • Electrical & Electronics Engineering (EEE)
  • Mechanical Engineering (ME) & Civil Engineering (CE)`
        });
        break;

      case 'domains':
      case 'tracks':
      case 'sigs':
        newHistory.push({
          type: 'output',
          text: `[CHAPTER TECHNICAL SPECIALIZATIONS & SPECIAL INTEREST GROUPS]
====================================================================
1. WEB ARCHITECTURE & CLOUD COMPUTING:
   • Focus: Modern React/Next.js stacks, Tailwind, Node.js, REST & GraphQL
   • Cloud: Docker microservices, Kubernetes clusters, serverless APIs
   • Lead Mentor: Alan Paul (Webmaster)

2. ARTIFICIAL INTELLIGENCE & DATA SCIENCE:
   • Focus: PyTorch, Transformer models, LoRA fine-tuning, Agentic LLMs
   • Applications: Healthcare vision, natural language processing, predictive IoT
   • Lead Mentor: Nadir K Muhammad Shafi (Web Master)

3. CYBERSECURITY & THREAT DEFENSE:
   • Focus: State-level CTFs, Ghidra reverse engineering, binary exploits
   • Defense: Penetration testing, cryptography, network packet forensics
   • Lead Mentor: Syno Shaji Kurian (Chair)

4. EMBEDDED SYSTEMS & ROBOTICS / IOT:
   • Focus: ESP32, STM32 microcontrollers, ROS (Robot Operating System)
   • Hardware: Autonomous rovers, sensor telemetry, edge inference
   • Lead Mentor: Alen Basil (Secretary)

5. COMPETITIVE PROGRAMMING & ALGORITHMS:
   • Focus: Advanced DSA, Dynamic Programming, Segment Trees, Graph Theory
   • Flagship: IEEE Xtreme International 24-Hour Programming Contest
   • Lead Mentor: Neswin Easter (Vice Chair)`
        });
        break;

      case 'events':
      case 'eventlist':
        newHistory.push({
          type: 'output',
          text: `[ACTIVE & UPCOMING CHAPTER EVENTS 2026-2027]
====================================================================
1. webnova-2026      : WebNova 2026 Website Design Showdown
   • Date   : 30 September 2026 (Live Now)
   • Prize  : ₹1,000 + Merit Certificates
   • Fee    : Free for IEEE Members / ₹100 Non-Members
   • Status : REGISTRATION OPEN

2. hackelite-2026    : HackElite 24-Hr Flagship Hackathon
   • Date   : 18-19 October 2026
   • Venue  : MBITS Central Auditorium
   • Prize  : ₹15,000 Cash Pool
   • Status : REGISTRATION OPEN (60 Teams Max)

3. neuralnexus-workshop : NeuralNexus: GenAI & LLM Fine-Tuning
   • Date   : 12 November 2026
   • Venue  : Block B AI Lab
   • Prize  : Micro-Credentials & IEEE Certificates
   • Status : REGISTRATION OPEN (50 Seats)

4. cybershield-ctf   : CyberShield State-Level CTF
   • Date   : 05 December 2026
   • Venue  : Cyber War Room (Lab 03)
   • Prize  : ₹8,000 Cash Pool
   • Status : REGISTRATION OPEN (40 Seats)

5. codemorph-dsa     : CodeMorph: Algorithmic Sprint
   • Date   : 20 January 2027
   • Venue  : Online HackerRank Arena
   • Prize  : ₹5,000 + IEEE Xtreme Direct Fast-Track
   • Status : REGISTRATION OPEN

Tip: Type "event <id>" for deep details (e.g. "event webnova", "event hackelite")`
        });
        break;

      case 'event':
        if (!arg1) {
          newHistory.push({
            type: 'error',
            text: 'Usage: event <name>\nExamples: event webnova | event hackelite | event neuralnexus | event cybershield | event codemorph'
          });
        } else {
          newHistory.push({
            type: 'output',
            text: getEventDetail(arg1)
          });
        }
        break;

      case 'stats':
      case 'metrics':
        newHistory.push({
          type: 'system',
          text: '[SYSTEM] Fetching real-time event registrations from backend...'
        });
        setHistory(newHistory);
        setInput('');

        try {
          const statsRes = await api.getStats();
          if (statsRes.success && statsRes.stats) {
            const s = statsRes.stats;
            const eventBreakdown = Object.entries(s.registrationsByEvent || {})
              .map(([id, d]) => `  • ${d.title.slice(0, 32).padEnd(34)}: ${d.count} / ${d.capacity} slots`)
              .join('\n');

            setHistory((prev) => [
              ...prev,
              {
                type: 'output',
                text: `[LIVE EVENT MANAGEMENT SYSTEM METRICS]
====================================================================
Total Registrations : ${s.totalRegistrations} participants
Confirmed Attendees : ${s.confirmedCount}
Pending Approvals   : ${s.pendingCount}
Verified IEEE Membs : ${s.ieeeMembersCount} (${s.totalRegistrations > 0 ? Math.round((s.ieeeMembersCount/s.totalRegistrations)*100) : 0}%)
Non-Member Enrollees: ${s.nonMembersCount}

ENROLLMENT BREAKDOWN BY EVENT:
${eventBreakdown || '  No event data available'}

DATABASE STATUS     : ONLINE & SYNCHRONIZED
API ENDPOINT        : GET /api/stats`
              }
            ]);
          } else {
            throw new Error();
          }
        } catch (err) {
          setHistory((prev) => [
            ...prev,
            {
              type: 'output',
              text: `[METRICS CACHED FALLBACK]
Total Registrations : 8 active participants
Confirmed Attendees : 7 verified
Pending Review      : 1 submission
IEEE Verified Membs : 6 members
Status              : Live backend connected at localhost:5173`
            }
          ]);
        }
        return;

      case 'team':
      case 'execom':
      case 'leadership':
        newHistory.push({
          type: 'output',
          text: `[IEEE COMPUTER SOCIETY MBITS EXECUTIVE COMMITTEE 2026]
====================================================================
• Chapter Advisor : Prof Eldhose P Sim (Assistant Professor, CSE)
• Chair           : Syno Shaji Kurian (B.Tech CSE)
• Vice Chair      : Neswin Easter (B.Tech CSE)
• Secretary       : Alen Basil (B.Tech CSE)
• Treasurer       : Manna Elsa Thomas (B.Tech CSE)
• Web Master      : Nadir K Muhammad Shafi (B.Tech CSE)
• WICS            : Grace Mary Eldo (Women in Computer Science)

Student Branch Chapter Code: SB 65041 // MBITS
Official Chapter Contact   : ieee.cs@mbits.ac.in`
        });
        break;

      case 'achievements':
      case 'awards':
      case 'trophies':
        newHistory.push({
          type: 'output',
          text: `[CHAPTER ACCOLADES & NATIONAL RECOGNITIONS]
====================================================================
🏆 IEEE KERALA SECTION OUTSTANDING CS CHAPTER RUNNER-UP
   Awarded for outstanding technical events, workshops & membership growth.

🏆 SMART INDIA HACKATHON (SIH) NATIONAL FINALISTS
   Top 5 national standing for AI-driven Disaster Rapid Response System.

🏆 IEEE XTREME 19.0 GLOBAL TOP 100 R10
   Ranked among top collegiate coding teams across Region 10 (Asia-Pacific).

🏆 6 STUDENT RESEARCH PAPERS INDEXED IN IEEE XPLORE
   Publications spanning neural network compression, edge IoT, and blockchain.

🏆 EXEMPLARY VOLUNTEER AWARD 2025
   Conferred to MBITS student leaders at Kerala Section Annual Banquet.`
        });
        break;

      case 'webnova':
        newHistory.push({
          type: 'output',
          text: `[WEBNOVA 2026 — WEBSITE DESIGN SHOWDOWN]
====================================================================
Organizer   : IEEE Computer Society MBITS Student Branch Chapter
Target      : Design the official website for IEEE CS MBITS
Deadline    : 30 September 2026 at 23:59 IST
Prize Pool  : ₹1,000 Cash Prize + IEEE Official Merit Certificates
Mode        : Individual / Online
Evaluation  :
  1. Visual Aesthetic & Scrollytelling Experience
  2. Mobile Responsiveness & Tailwind Clean CSS
  3. Interactive Features (Interactive CLI Terminal, Audio SoundFx)
  4. Complete Backend Architecture & Participant Management Portal
  5. Content Completeness (MBITS integration, events, teams, domains)
Submission  : Complete ZIP file with source code, docs, and live link.`
        });
        break;

      case 'gallery':
      case 'archive':
      case 'history':
        newHistory.push({
          type: 'output',
          text: `[CHAPTER MILESTONES & EVENT ARCHIVE]
====================================================================
• 2024: ByteCamp Python & Open Source Git Bootcamp (120+ participants)
• 2025: CodeSprint 12-Hour Overnight Hackathon (25 teams)
• 2025: CyberShield CTF Inter-College Security Contest (40 teams)
• 2025: AI Conclave & Industry Tech Talk Series (Keynotes from Google/IBM)
• 2026: WebNova Chapter Portal Showdown (Current flagship competition)`
        });
        break;

      case 'contact':
      case 'reach':
      case 'socials':
        newHistory.push({
          type: 'output',
          text: `[OFFICIAL CHAPTER CONTACT DETAILS & SOCIAL HANDLES]
====================================================================
Campus      : Mar Baselios Institute of Technology and Science (MBITS)
Address     : Nellimattom P.O., Kothamangalam, Kerala, India - 686693
Email       : ieeesbmbits@gmail.com
Website     : https://ieeesbmbits.in
Instagram   : https://www.instagram.com/ieeesbmbits (@ieeesbmbits)
LinkedIn    : https://www.linkedin.com/company/ieee-student-branch-mbits/
College URL : https://mbits.ac.in`
        });
        break;

      case 'register':
      case 'signup':
        newHistory.push({
          type: 'output',
          text: `[HOW TO REGISTER FOR CHAPTER EVENTS]
====================================================================
1. On the public site, navigate to Chapter 02 ("Arena") or click "Events"
2. Choose from any open event (WebNova, HackElite, NeuralNexus, etc.)
3. Click "Register Now" to trigger the registration modal
4. Fill in your details (Name, College, Year, IEEE ID if member)
5. Submit to get an atomic confirmation ID (e.g. REG-1582)
6. Chapter executives will review and confirm your slot via the Admin Portal!`
        });
        break;

      case 'quest':
      case 'quiz':
        newHistory.push({
          type: 'output',
          text: `[CHAPTER 06: KNOWLEDGE QUEST]
====================================================================
Test your computer science and IEEE aptitude on our interactive quiz!
• 8 technical questions covering algorithms, IEEE history, and networks
• Instant score calculation with celebratory sound effects
• Score 8/8 to unlock the cryptographic Grandmaster Certificate Badge!
Navigate to Chapter 06 (Epilogue) on the page to take the quest.`
        });
        break;

      case 'theme':
        if (arg1 === 'matrix') {
          setCurrentTheme('matrix');
          newHistory.push({ type: 'output', text: 'Theme switched to MATRIX CYBER GREEN 🟩' });
        } else if (arg1 === 'cyan') {
          setCurrentTheme('cyan');
          newHistory.push({ type: 'output', text: 'Theme switched to IEEE HIGH-TECH CYAN 🟦' });
        } else if (arg1 === 'amber') {
          setCurrentTheme('amber');
          newHistory.push({ type: 'output', text: 'Theme switched to RETRO PHOSPHOR AMBER 🟧' });
        } else if (arg1 === 'default' || arg1 === 'dark') {
          setCurrentTheme('default');
          newHistory.push({ type: 'output', text: 'Theme switched to MODERN SLATE ⬛' });
        } else {
          newHistory.push({
            type: 'error',
            text: 'Available themes: theme cyan | theme matrix | theme amber | theme default'
          });
        }
        break;

      case 'matrix':
        setCurrentTheme(currentTheme === 'matrix' ? 'cyan' : 'matrix');
        newHistory.push({
          type: 'output',
          text: `Matrix mode: ${currentTheme !== 'matrix' ? 'ENABLED 🟩' : 'DISABLED (Switched to Cyan) 🟦'}`
        });
        break;

      case 'sudo':
        newHistory.push({
          type: 'output',
          text: `[SECURITY NOTICE] visitor is not in the sudoers file.
This incident has been logged and reported to the IEEE CS MBITS ExeCom Council.`
        });
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      case '':
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${trimmedCmd(currentVal)}". Type "help" to see all valid commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  const trimmedCmd = (str) => str.slice(0, 30);

  // Determine prompt text and input type based on authState
  let promptLabel = 'visitor@mbits-cs:~$ ';
  let placeholderText = "Type 'help', 'events', 'stats', 'admin'...";
  let isPasswordInput = false;

  if (authState === 'awaiting_username') {
    promptLabel = 'admin-auth:username$ ';
    placeholderText = "Enter admin username (or 'cancel')...";
  } else if (authState === 'awaiting_password') {
    promptLabel = 'admin-auth:password$ ';
    placeholderText = "Enter admin passkey (or 'cancel')...";
    isPasswordInput = true;
  } else if (authState === 'verifying') {
    promptLabel = 'verifying... ';
    placeholderText = "Please wait...";
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className={`w-full max-w-4xl rounded-2xl border overflow-hidden shadow-2xl flex flex-col h-[560px] transition-all ${currentStyle.wrapper}`}>
        
        {/* Terminal Window Header Bar */}
        <div className={`flex items-center justify-between px-4 py-3 border-b ${currentStyle.header}`}>
          <div className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:opacity-100 transition-opacity" 
              onClick={onClose} 
              title="Close terminal (exit)"
            />
            <span 
              className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer hover:opacity-100 transition-opacity" 
              onClick={() => setCurrentTheme(currentTheme === 'amber' ? 'cyan' : 'amber')}
              title="Toggle Amber Theme"
            />
            <span 
              className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer hover:opacity-100 transition-opacity" 
              onClick={() => setCurrentTheme(currentTheme === 'matrix' ? 'cyan' : 'matrix')}
              title="Toggle Matrix Green Theme"
            />
            
            <span className="ml-3 font-mono text-xs flex items-center gap-1.5 font-semibold">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>ieee-cs-mbits@cli:~</span>
              <span className="text-[10px] opacity-75 hidden sm:inline">[SB 65041]</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono opacity-60">
              <span>Theme:</span>
              <button onClick={() => setCurrentTheme('cyan')} className="hover:text-ieee-cyan px-1">Cyan</button>
              <span>|</span>
              <button onClick={() => setCurrentTheme('matrix')} className="hover:text-emerald-400 px-1">Matrix</button>
              <span>|</span>
              <button onClick={() => setCurrentTheme('amber')} className="hover:text-amber-400 px-1">Amber</button>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-2"
              title="Close (exit)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Screen & Scrollable Log */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs leading-relaxed space-y-2.5 select-text">
          {history.map((h, i) => (
            <div key={i} className="animate-fadeIn">
              {h.type === 'input' && (
                <div className="flex items-start gap-1.5 text-slate-300">
                  <span className={currentStyle.prompt}>{h.prompt || 'visitor@mbits-cs:~$ '}</span>
                  <span className="font-semibold text-white">{h.text}</span>
                </div>
              )}

              {h.type === 'output' && (
                <pre className={`whitespace-pre-wrap font-mono ${currentStyle.output}`}>
                  {h.text}
                </pre>
              )}

              {h.type === 'system' && (
                <div className={`font-mono ${currentStyle.system}`}>
                  {h.text}
                </div>
              )}

              {h.type === 'success' && (
                <pre className="whitespace-pre-wrap font-mono text-emerald-400 font-bold bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/30">
                  {h.text}
                </pre>
              )}

              {h.type === 'error' && (
                <div className="font-mono text-red-400 bg-red-950/30 px-3 py-1.5 rounded border border-red-500/30">
                  {h.text}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Field */}
        <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
          {/* Prompt Icon / Status */}
          {authState === 'awaiting_username' || authState === 'awaiting_password' ? (
            <KeyRound className="w-4 h-4 text-amber-400 shrink-0" />
          ) : (
            <TerminalIcon className={`w-3.5 h-3.5 ${currentStyle.prompt} shrink-0`} />
          )}

          <span className={`font-mono text-xs font-semibold ${currentStyle.prompt} shrink-0`}>
            {promptLabel}
          </span>

          <input
            ref={inputRef}
            type={isPasswordInput ? "password" : "text"}
            value={input}
            disabled={authState === 'verifying'}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            placeholder={placeholderText}
            className="flex-1 bg-transparent border-none text-xs font-mono text-white placeholder-slate-600 focus:outline-none"
            autoFocus
          />

          <button
            onClick={() => handleCommand({ key: 'Enter' })}
            disabled={authState === 'verifying'}
            className="p-1.5 text-slate-400 hover:text-ieee-cyan transition-colors"
            title="Execute (Enter)"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
