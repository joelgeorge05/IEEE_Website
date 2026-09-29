// In-browser client database engine with persistent localStorage fallback
// Guarantees 100% operational Admin Dashboard and registration flow on static hosts (Vercel, Netlify, GitHub Pages)

const DB_STORAGE_KEY = 'ieee_db_store_v1';

const INITIAL_DB = {
  events: [
    {
      id: "webnova-2026",
      title: "WebNova 2026 — Website Design Showdown",
      category: "Competition",
      date: "2026-09-30",
      displayDate: "30 September 2026",
      venue: "Computer Center Labs & Virtual",
      prizePool: "₹1,000",
      maxCapacity: 100,
      status: "open",
      fee: "Free for IEEE Members / ₹100 Non-Members",
      requirePaymentProof: true,
      customFields: [
        {
          id: "phone",
          label: "Contact / WhatsApp Number",
          type: "text",
          placeholder: "+91 94471 23456",
          required: true
        },
        {
          id: "github",
          label: "GitHub / Portfolio URL",
          type: "text",
          placeholder: "https://github.com/username",
          required: false
        },
        {
          id: "teamName",
          label: "Team / Squad Codename",
          type: "text",
          placeholder: "e.g. CyberVanguard",
          required: false
        }
      ],
      description: "Design and develop the premier official chapter web portal for IEEE Computer Society MBITS."
    },
    {
      id: "hackelite-2026",
      title: "HackElite 24-Hr Hackathon",
      category: "Hackathon",
      date: "2026-10-18",
      displayDate: "18-19 October 2026",
      venue: "MBITS Central Auditorium",
      prizePool: "₹15,000",
      maxCapacity: 60,
      status: "closed",
      fee: "₹150 per Team",
      description: "24-hour non-stop rapid prototyping on AI, Smart Infrastructure, and Civic Tech dilemmas."
    },
    {
      id: "neuralnexus-workshop",
      title: "NeuralNexus: GenAI & LLM Fine-Tuning",
      category: "Workshop",
      date: "2026-11-12",
      displayDate: "12 November 2026",
      venue: "Advanced AI & ML Lab (Block B)",
      prizePool: "IEEE Certificate & Credits",
      maxCapacity: 50,
      status: "closed",
      fee: "Free for IEEE Members",
      description: "Hands-on bootcamp covering transformer architectures, LoRA fine-tuning, and LangChain agents."
    },
    {
      id: "cybershield-ctf",
      title: "CyberShield State-Level CTF",
      category: "CTF",
      date: "2026-12-05",
      displayDate: "05 December 2026",
      venue: "Cyber Security War Room (Lab 03)",
      prizePool: "₹8,000",
      maxCapacity: 40,
      status: "closed",
      fee: "Free Entry",
      description: "State-level capture-the-flag tournament testing cryptography, web exploits, and binary forensics."
    },
    {
      id: "codemorph-dsa",
      title: "CodeMorph: Algorithmic Sprint",
      category: "Competitive Coding",
      date: "2027-01-20",
      displayDate: "20 January 2027",
      venue: "Online HackerRank Arena",
      prizePool: "₹5,000",
      maxCapacity: 80,
      status: "closed",
      fee: "Free Entry",
      description: "Speed coding sprint focusing on dynamic programming and graph trees in preparation for IEEE Xtreme."
    }
  ],
  registrations: [
    {
      id: "REG-6379",
      eventId: "webnova-2026",
      eventName: "WebNova 2026 — Website Design Showdown",
      name: "Joel George",
      email: "joelveliyath05@gmail.com",
      phone: "+91 94471 23456",
      college: "Mar Baselios Institute of Technology and Science (MBITS)",
      department: "Computer Science & Engineering",
      year: "3rd Year",
      isIeeeMember: true,
      ieeeId: "98431201",
      status: "confirmed",
      registeredAt: "2026-09-29T12:55:19.877Z",
      notes: "Official WebNova Entry Designer"
    },
    {
      id: "REG-1582",
      eventId: "webnova-2026",
      eventName: "WebNova 2026 — Website Design Showdown",
      name: "Rohan Mathew",
      email: "rohan.mathew@mbits.ac.in",
      phone: "+91 98462 11223",
      college: "MBITS Kothamangalam",
      department: "CSE",
      year: "3rd Year",
      isIeeeMember: true,
      ieeeId: "99812401",
      status: "confirmed",
      registeredAt: "2026-09-27T17:12:12.148Z",
      notes: "Lead participant"
    },
    {
      id: "REG-1001",
      eventId: "webnova-2026",
      eventName: "WebNova 2026 — Website Design Showdown",
      name: "Arjun R. Nair",
      email: "arjun.nair@mbits.ac.in",
      phone: "+91 94471 23456",
      college: "Mar Baselios Institute of Technology & Science",
      department: "Computer Science & Engineering",
      year: "3rd Year",
      isIeeeMember: true,
      ieeeId: "98431201",
      status: "confirmed",
      registeredAt: "2026-09-20T10:15:00.000Z",
      notes: "Frontend focus: React, Tailwind CSS"
    },
    {
      id: "REG-1002",
      eventId: "webnova-2026",
      eventName: "WebNova 2026 — Website Design Showdown",
      name: "Devika S. Kumar",
      email: "devika.sk@gmail.com",
      phone: "+91 98462 77890",
      college: "Model Engineering College, Kochi",
      department: "Information Technology",
      year: "2nd Year",
      isIeeeMember: true,
      ieeeId: "96510482",
      status: "confirmed",
      registeredAt: "2026-09-21T14:32:00.000Z",
      notes: "UI/UX Designer & Scrollytelling specialist"
    },
    {
      id: "REG-1004",
      eventId: "hackelite-2026",
      eventName: "HackElite 24-Hr Hackathon",
      name: "Ananya Varma",
      email: "ananya.varma@mbits.ac.in",
      phone: "+91 94952 11234",
      college: "Mar Baselios Institute of Technology & Science",
      department: "Computer Science & Engineering",
      year: "3rd Year",
      isIeeeMember: true,
      ieeeId: "99120455",
      status: "pending",
      registeredAt: "2026-09-23T11:20:00.000Z",
      notes: "Team Lead for AgriSense IoT project"
    },
    {
      id: "REG-1006",
      eventId: "cybershield-ctf",
      eventName: "CyberShield State-Level CTF",
      name: "Siddharth Menon",
      email: "sid.menon@mbits.ac.in",
      phone: "+91 94002 67890",
      college: "Mar Baselios Institute of Technology & Science",
      department: "Computer Science & Engineering",
      year: "2nd Year",
      isIeeeMember: true,
      ieeeId: "99843211",
      status: "confirmed",
      registeredAt: "2026-09-25T13:40:00.000Z",
      notes: "Ghidra & Web Exploits track"
    }
  ],
  admin: {
    username: "admin",
    passwordHash: "mbits@ieee2026"
  },
  messages: [
    {
      id: "MSG-3001",
      name: "Rohit K. Varma",
      email: "rohit.varma@gec.ac.in",
      subject: "WebNova 2026 Submission Format & Framework Inquiry",
      message: "Hello IEEE CS MBITS team, are we allowed to use Tailwind CSS and Supabase for the realtime scoring engine in WebNova 2026? Also, does the submission require a hosted demo link or just a GitHub repository? Thanks!",
      status: "new",
      createdAt: "2026-09-28T14:20:00.000Z"
    },
    {
      id: "MSG-3002",
      name: "Sneha Mohan",
      email: "sneha.mohan@gmail.com",
      subject: "Membership Drive & Computer Society Chapter Transfer",
      message: "I am a 2nd year CSE student currently registered under IEEE Kerala Section. How can I formally affiliate my IEEE membership with the MBITS Computer Society Student Branch Chapter (STB 65041) to access the research tracks?",
      status: "replied",
      createdAt: "2026-09-27T11:45:00.000Z"
    },
    {
      id: "MSG-3003",
      name: "Prof. Mathew Joseph",
      email: "m.joseph@visat.ac.in",
      subject: "HackElite 24-Hr Hackathon College Delegation & Mentorship",
      message: "Greetings from VISAT. We would like to send 4 student teams to the upcoming HackElite 24-hour hackathon. Could you provide details regarding on-campus lab facilities, hardware kits, and faculty registration?",
      status: "new",
      createdAt: "2026-09-29T08:30:00.000Z"
    }
  ]
};

function getLocalData() {
  try {
    const raw = localStorage.getItem(DB_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(INITIAL_DB));
      return JSON.parse(JSON.stringify(INITIAL_DB));
    }
    return JSON.parse(raw);
  } catch (e) {
    return JSON.parse(JSON.stringify(INITIAL_DB));
  }
}

function saveLocalData(data) {
  try {
    localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export const localDB = {
  // Auth
  login(username, password) {
    const data = getLocalData();
    if (username === data.admin.username && password === data.admin.passwordHash) {
      const token = `ieee-mock-jwt-${Date.now()}`;
      return { success: true, token, user: { username, role: 'admin' } };
    }
    return { success: false, message: 'Invalid credentials. Use admin / mbits@ieee2026' };
  },

  verifyAuth(token) {
    if (token && typeof token === 'string' && token.startsWith('ieee-')) {
      return { success: true, valid: true, user: { username: 'admin', role: 'admin' } };
    }
    return { success: false, valid: false };
  },

  // Stats
  getStats() {
    const data = getLocalData();
    const confirmedCount = data.registrations.filter(r => r.status === 'confirmed').length;
    const totalRevenue = confirmedCount * 100;
    return {
      success: true,
      stats: {
        totalRegistrations: data.registrations.length,
        confirmed: confirmedCount,
        pending: data.registrations.filter(r => r.status === 'pending').length,
        waitlisted: data.registrations.filter(r => r.status === 'waitlisted').length,
        cancelled: data.registrations.filter(r => r.status === 'cancelled').length,
        revenue: totalRevenue,
        activeEvents: data.events.filter(e => e.status === 'open').length,
        totalEvents: data.events.length,
        totalMessages: (data.messages || []).length,
        newMessages: (data.messages || []).filter(m => m.status === 'new').length
      }
    };
  },

  // Events
  getEvents() {
    const data = getLocalData();
    return { success: true, count: data.events.length, events: data.events };
  },

  createEvent(eventData) {
    const data = getLocalData();
    const id = eventData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `event-${Date.now()}`;
    const newEvent = { id, status: 'open', customFields: [], ...eventData };
    data.events.unshift(newEvent);
    saveLocalData(data);
    return { success: true, event: newEvent };
  },

  updateEvent(id, updateData) {
    const data = getLocalData();
    const idx = data.events.findIndex(e => e.id === id);
    if (idx === -1) return { success: false, message: 'Event not found' };
    data.events[idx] = { ...data.events[idx], ...updateData };
    saveLocalData(data);
    return { success: true, event: data.events[idx] };
  },

  deleteEvent(id) {
    const data = getLocalData();
    data.events = data.events.filter(e => e.id !== id);
    saveLocalData(data);
    return { success: true };
  },

  // Registrations
  getRegistrations(params = {}) {
    const data = getLocalData();
    let list = [...data.registrations];
    if (params.eventId && params.eventId !== 'all') {
      list = list.filter(r => r.eventId === params.eventId);
    }
    if (params.status && params.status !== 'all') {
      list = list.filter(r => r.status === params.status);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(r => 
        (r.name && r.name.toLowerCase().includes(q)) ||
        (r.email && r.email.toLowerCase().includes(q)) ||
        (r.id && r.id.toLowerCase().includes(q)) ||
        (r.college && r.college.toLowerCase().includes(q))
      );
    }
    return { success: true, count: list.length, registrations: list };
  },

  submitRegistration(regData) {
    const data = getLocalData();
    const newReg = {
      id: `REG-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'confirmed',
      registeredAt: new Date().toISOString(),
      ...regData
    };
    data.registrations.unshift(newReg);
    saveLocalData(data);
    return { success: true, registration: newReg };
  },

  updateRegistrationStatus(id, status) {
    const data = getLocalData();
    const idx = data.registrations.findIndex(r => r.id === id);
    if (idx === -1) return { success: false, message: 'Registration not found' };
    data.registrations[idx].status = status;
    saveLocalData(data);
    return { success: true, registration: data.registrations[idx] };
  },

  deleteRegistration(id) {
    const data = getLocalData();
    data.registrations = data.registrations.filter(r => r.id !== id);
    saveLocalData(data);
    return { success: true };
  },

  // Messages
  getMessages(params = {}) {
    const data = getLocalData();
    let list = [...(data.messages || [])];
    if (params.status && params.status !== 'all') {
      list = list.filter(m => m.status === params.status);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(m => 
        (m.name && m.name.toLowerCase().includes(q)) ||
        (m.email && m.email.toLowerCase().includes(q)) ||
        (m.subject && m.subject.toLowerCase().includes(q)) ||
        (m.message && m.message.toLowerCase().includes(q))
      );
    }
    return { success: true, count: list.length, messages: list };
  },

  submitMessage(msgData) {
    const data = getLocalData();
    const newMsg = {
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'new',
      createdAt: new Date().toISOString(),
      ...msgData
    };
    if (!data.messages) data.messages = [];
    data.messages.unshift(newMsg);
    saveLocalData(data);
    return { success: true, message: newMsg };
  },

  updateMessageStatus(id, status) {
    const data = getLocalData();
    if (!data.messages) data.messages = [];
    const idx = data.messages.findIndex(m => m.id === id);
    if (idx === -1) return { success: false, message: 'Message not found' };
    data.messages[idx].status = status;
    saveLocalData(data);
    return { success: true, message: data.messages[idx] };
  },

  deleteMessage(id) {
    const data = getLocalData();
    if (data.messages) {
      data.messages = data.messages.filter(m => m.id !== id);
      saveLocalData(data);
    }
    return { success: true };
  },

  resetDatabase() {
    saveLocalData(INITIAL_DB);
    return { success: true };
  }
};
