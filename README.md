# 🌐 The Developer's Odyssey — IEEE Computer Society MBITS

> **Official Entry for WebNova — Website Design Competition**  
> Organized by **IEEE Computer Society MBITS** (Mar Baselios Institute of Technology and Science)  
> **Student Branch Code:** STB 65041 | **Institution:** MBITS Kothamangalam  
> **Author:** Joel George  

---

## 🚀 Overview & Vision

**The Developer's Odyssey** is a modern, high-performance, story-driven web portal engineered for **IEEE Computer Society MBITS**. Designed with an episodic scrollytelling narrative, it chronicles the technical journey, institutional milestones, student community, and opportunities within IEEE CS MBITS.

The website unfolds through **Interactive Story Chapters**:
- **Prologue (00): The Terminal** — Interactive CLI terminal preview, chapter node status telemetry, and live metrics overview.
- **Chapter 1 (01): The Spark** — Origin story, mission, vision, and the official milestone roadmap at MBITS since inauguration in 2022.
- **Chapter 2 (02): The Arena** — Live competition marquee for **WebNova '26** (featuring an interactive days/hours/minutes countdown timer, prize pool breakdown, challenge rules, and modal registration with `.ics` calendar pass download) alongside past flagship events.
- **Chapter 3 (03): Hall of Trophies** — Kerala Section honors, IEEE Kochi Subsection Outstanding Event Award for SIGNAL 2.0, Smart India Hackathon accolades, IEEE Xtreme rankings, and student publications.
- **Chapter 4 (04): The Guild Masters** — Executive Committee (ExeCom 2026) and faculty mentors with interactive profiles, skill tags, and social connections.
- **Chapter 5 (05): The Memory Archive** — Campus tech gallery celebrating student community life with category filtering and a fullscreen keyboard-navigable Lightbox.
- **Epilogue (06): Begin Your Quest** — Membership perks matrix, membership registration portal, and the **IEEE CS Knowledge Quest** (an interactive trivia mini-game rewarding players with celebratory confetti and digital achievement badges).
- **Executive Administration Console (`/admin`)** — Secured administrative hub for chapter leads to review live event registrations, filter attendee records, manage contact transmissions, and export CSV reports.

---

## 🏆 Key Features & Technical Highlights

| Feature | Implementation Details |
| :--- | :--- |
| **Interactive Scrollytelling** | Synchronized dual-mode navigation ("Story Mode" with sticky scrollytelling tracker vs "Direct Navigation") with smooth scrolling. |
| **Interactive CLI Shell** | In-browser command line terminal (`~mbits-cs$`, shortcut: `Ctrl + K`) supporting custom command parsing (`events`, `webnova`, `team`, `about`, `matrix`, `admin`). |
| **Full Event Registration Flow** | In-modal registration with form validation, automated .ics calendar generation, and real-time backend persistence. |
| **Synthesized Audio Engine** | Zero-latency browser-native Web Audio API synthesizer generating tactile UI clicks, chimes, and chapter transitions without external audio files. |
| **Admin Dashboard** | Dedicated `/admin` route with token authentication, live statistics, registration state management, transmissions inbox, and CSV data export. |
| **Canvas Particle Physics** | Custom responsive particle network computing background rendering glowing nodes and dynamic connection lines. |

---

## 🛠️ Technology Stack

- **Frontend Core**: React 19, Vite
- **Styling**: Tailwind CSS v3 with custom IEEE tokens & dark mode glassmorphism
- **Backend / API**: Node.js & Express REST endpoints (`/api/events`, `/api/registrations`, `/api/messages`, `/api/stats`)
- **Particle System**: HTML5 2D Canvas Physics Engine
- **Audio Synthesizer**: Native Web Audio API
- **Celebration Effects**: `canvas-confetti`
- **Iconography**: Lucide React & Custom SVG brand vector paths
- **Typography**: Inter, Plus Jakarta Sans, JetBrains Mono

---

## 💻 Getting Started Locally

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### Installation & Running

```bash
# 1. Clone the repository
git clone https://github.com/joelgeorge05/IEEE_Website.git
cd IEEE_Website

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Full-Stack Server & Admin Hub
To start the optional local backend server:
```bash
node server/index.js
```

### Production Build
```bash
# Create optimized production build
npm run build

# Preview build locally
npm run preview
```

---

## 📂 Project Structure

```
IEEE/
├── index.html                     # Root HTML document
├── package.json                   # Dependencies & project scripts
├── vite.config.js                 # Vite build configuration
├── tailwind.config.js             # Tailwind theme configuration
├── server/                        # Express API & JSON database storage
│   ├── index.js                   # API server
│   ├── apiRouter.js               # REST endpoints
│   └── db.js                      # Data store & CRUD operations
└── src/
    ├── main.jsx                   # Application entry point
    ├── App.jsx                    # Root component & chapter routing
    ├── index.css                  # Tailwind styles & custom utilities
    ├── components/
    │   ├── ParticleBackground.jsx # Canvas interactive node network
    │   ├── Navbar.jsx             # Top bar navigation & action controls
    │   ├── ChapterIndicator.jsx   # Scrollytelling node tracker
    │   ├── HeroPrologue.jsx       # Prologue & hero section
    │   ├── ChapterSpark.jsx       # Chapter 1: Genesis & roadmap
    │   ├── ChapterArena.jsx       # Chapter 2: Events & WebNova challenge
    │   ├── ChapterTrophies.jsx    # Chapter 3: Honors & achievements
    │   ├── ChapterGuild.jsx       # Chapter 4: ExeCom & leadership
    │   ├── ChapterArchive.jsx     # Chapter 5: Gallery & lightbox
    │   ├── EpilogueQuest.jsx      # Epilogue: Perks & trivia quiz
    │   ├── ContactFooter.jsx      # Transmission portal & FAQ
    │   ├── InteractiveTerminal.jsx# In-browser CLI shell modal
    │   ├── AdminDashboard.jsx     # Executive administrative management console
    │   └── SocialIcons.jsx        # SVG icons
    ├── data/                      # Structured chapter datasets
    └── utils/                     # Audio FX & API helper utilities
```

---

## 📜 WebNova Submission

- **Competition**: WebNova 2026 — Website Design Competition
- **Organized by**: IEEE Computer Society MBITS
- **Developer**: Joel George
