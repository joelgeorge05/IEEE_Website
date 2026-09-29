import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Initial default seed dataset
const DEFAULT_EVENTS = [
  {
    id: 'webnova-2026',
    title: 'WebNova 2026 — Website Design Showdown',
    category: 'Competition',
    date: '2026-09-30',
    displayDate: '30 September 2026',
    venue: 'Computer Center Labs & Virtual',
    prizePool: '₹1,000',
    maxCapacity: 100,
    status: 'open', // 'open' | 'closed' | 'waitlist'
    fee: 'Free for IEEE Members / ₹100 Non-Members',
    description: 'Design and develop the premier official chapter web portal for IEEE Computer Society MBITS.'
  },
  {
    id: 'hackelite-2026',
    title: 'HackElite 24-Hr Hackathon',
    category: 'Hackathon',
    date: '2026-10-18',
    displayDate: '18-19 October 2026',
    venue: 'MBITS Central Auditorium',
    prizePool: '₹15,000',
    maxCapacity: 60,
    status: 'open',
    fee: '₹150 per Team',
    description: '24-hour non-stop rapid prototyping on AI, Smart Infrastructure, and Civic Tech dilemmas.'
  },
  {
    id: 'neuralnexus-workshop',
    title: 'NeuralNexus: GenAI & LLM Fine-Tuning',
    category: 'Workshop',
    date: '2026-11-12',
    displayDate: '12 November 2026',
    venue: 'Advanced AI & ML Lab (Block B)',
    prizePool: 'IEEE Certificate & Credits',
    maxCapacity: 50,
    status: 'open',
    fee: 'Free for IEEE Members',
    description: 'Hands-on bootcamp covering transformer architectures, LoRA fine-tuning, and LangChain agents.'
  },
  {
    id: 'cybershield-ctf',
    title: 'CyberShield State-Level CTF',
    category: 'CTF',
    date: '2026-12-05',
    displayDate: '05 December 2026',
    venue: 'Cyber Security War Room (Lab 03)',
    prizePool: '₹8,000',
    maxCapacity: 40,
    status: 'open',
    fee: 'Free Entry',
    description: 'State-level capture-the-flag tournament testing cryptography, web exploits, and binary forensics.'
  },
  {
    id: 'codemorph-dsa',
    title: 'CodeMorph: Algorithmic Sprint',
    category: 'Competitive Coding',
    date: '2027-01-20',
    displayDate: '20 January 2027',
    venue: 'Online HackerRank Arena',
    prizePool: '₹5,000',
    maxCapacity: 80,
    status: 'open',
    fee: 'Free Entry',
    description: 'Speed coding sprint focusing on dynamic programming and graph trees in preparation for IEEE Xtreme.'
  }
];

const DEFAULT_REGISTRATIONS = [
  {
    id: 'REG-1001',
    eventId: 'webnova-2026',
    eventName: 'WebNova 2026 — Website Design Showdown',
    name: 'Arjun R. Nair',
    email: 'arjun.nair@mbits.ac.in',
    phone: '+91 94471 23456',
    college: 'Mar Baselios Institute of Technology & Science',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    isIeeeMember: true,
    ieeeId: '98431201',
    status: 'confirmed',
    registeredAt: '2026-09-20T10:15:00.000Z',
    notes: 'Frontend focus: React, Tailwind CSS'
  },
  {
    id: 'REG-1002',
    eventId: 'webnova-2026',
    eventName: 'WebNova 2026 — Website Design Showdown',
    name: 'Devika S. Kumar',
    email: 'devika.sk@gmail.com',
    phone: '+91 98462 77890',
    college: 'Model Engineering College, Kochi',
    department: 'Information Technology',
    year: '2nd Year',
    isIeeeMember: true,
    ieeeId: '96510482',
    status: 'confirmed',
    registeredAt: '2026-09-21T14:32:00.000Z',
    notes: 'UI/UX Designer & Scrollytelling specialist'
  },
  {
    id: 'REG-1003',
    eventId: 'webnova-2026',
    eventName: 'WebNova 2026 — Website Design Showdown',
    name: 'Mohammed Bilal',
    email: 'bilal.mbits@outlook.com',
    phone: '+91 97451 90812',
    college: 'Mar Baselios Institute of Technology & Science',
    department: 'Artificial Intelligence & Data Science',
    year: '4th Year',
    isIeeeMember: false,
    ieeeId: '',
    status: 'pending',
    registeredAt: '2026-09-22T09:45:00.000Z',
    notes: 'Submitted project pitch: Interactive 3D Canvas'
  },
  {
    id: 'REG-1004',
    eventId: 'hackelite-2026',
    eventName: 'HackElite 24-Hr Hackathon',
    name: 'Ananya Varma',
    email: 'ananya.varma@mbits.ac.in',
    phone: '+91 94952 11234',
    college: 'Mar Baselios Institute of Technology & Science',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    isIeeeMember: true,
    ieeeId: '99120455',
    status: 'confirmed',
    registeredAt: '2026-09-23T11:20:00.000Z',
    notes: 'Team Lead for AgriSense IoT project'
  },
  {
    id: 'REG-1005',
    eventId: 'neuralnexus-workshop',
    eventName: 'NeuralNexus: GenAI & LLM Fine-Tuning',
    name: 'Gautham Krishna',
    email: 'gautham.k@gmail.com',
    phone: '+91 98950 44556',
    college: 'Rajagiri School of Engineering & Technology',
    department: 'Computer Science & Engineering',
    year: '4th Year',
    isIeeeMember: false,
    ieeeId: '',
    status: 'confirmed',
    registeredAt: '2026-09-24T16:05:00.000Z',
    notes: 'Wants to learn PyTorch LoRA fine-tuning'
  },
  {
    id: 'REG-1006',
    eventId: 'cybershield-ctf',
    eventName: 'CyberShield State-Level CTF',
    name: 'Siddharth Menon',
    email: 'sid.menon@mbits.ac.in',
    phone: '+91 94002 67890',
    college: 'Mar Baselios Institute of Technology & Science',
    department: 'Computer Science & Engineering',
    year: '2nd Year',
    isIeeeMember: true,
    ieeeId: '99843211',
    status: 'confirmed',
    registeredAt: '2026-09-25T13:40:00.000Z',
    notes: 'Ghidra & Web Exploits track'
  },
  {
    id: 'REG-1007',
    eventId: 'webnova-2026',
    eventName: 'WebNova 2026 — Website Design Showdown',
    name: 'Kavya Rajesh',
    email: 'kavya.rajesh@mbits.ac.in',
    phone: '+91 94460 33445',
    college: 'Mar Baselios Institute of Technology & Science',
    department: 'Electronics & Communication',
    year: '3rd Year',
    isIeeeMember: true,
    ieeeId: '97881023',
    status: 'confirmed',
    registeredAt: '2026-09-26T18:10:00.000Z',
    notes: 'Interested in sound synthesis and audio UI'
  }
];

const DEFAULT_MESSAGES = [
  {
    id: 'MSG-3001',
    name: 'Rohit K. Varma',
    email: 'rohit.varma@gec.ac.in',
    subject: 'WebNova 2026 Submission Format & Framework Inquiry',
    message: 'Hello IEEE CS MBITS team, are we allowed to use Tailwind CSS and Supabase for the realtime scoring engine in WebNova 2026? Also, does the submission require a hosted demo link or just a GitHub repository? Thanks!',
    status: 'new',
    createdAt: '2026-09-28T14:20:00.000Z'
  },
  {
    id: 'MSG-3002',
    name: 'Sneha Mohan',
    email: 'sneha.mohan@gmail.com',
    subject: 'Membership Drive & Computer Society Chapter Transfer',
    message: 'I am a 2nd year CSE student currently registered under IEEE Kerala Section. How can I formally affiliate my IEEE membership with the MBITS Computer Society Student Branch Chapter (STB 65041) to access the research tracks?',
    status: 'replied',
    createdAt: '2026-09-27T11:45:00.000Z'
  },
  {
    id: 'MSG-3003',
    name: 'Prof. Mathew Joseph',
    email: 'm.joseph@visat.ac.in',
    subject: 'HackElite 24-Hr Hackathon College Delegation & Mentorship',
    message: 'Greetings from VISAT. We would like to send 4 student teams to the upcoming HackElite 24-hour hackathon. Could you provide details regarding on-campus lab facilities, hardware kits, and faculty registration?',
    status: 'new',
    createdAt: '2026-09-29T08:30:00.000Z'
  }
];

class Database {
  constructor() {
    this.ensureDataDir();
  }

  ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      this.seed();
    }
  }

  seed() {
    const initialData = {
      events: DEFAULT_EVENTS,
      registrations: DEFAULT_REGISTRATIONS,
      messages: DEFAULT_MESSAGES,
      admin: {
        username: 'admin',
        passwordHash: 'mbits@ieee2026' // Plaintext for easy demo/judging
      },
      lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  read() {
    try {
      this.ensureDataDir();
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const data = JSON.parse(content);
      if (!data.messages) {
        data.messages = DEFAULT_MESSAGES;
        this.write(data);
      }
      return data;
    } catch (err) {
      console.error('Error reading database, restoring seed:', err);
      return this.seed();
    }
  }

  write(data) {
    try {
      data.lastUpdated = new Date().toISOString();
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('Error writing to database:', err);
      return false;
    }
  }

  // --- EVENTS ---
  getEvents() {
    const data = this.read();
    // Calculate live registered count for each event
    return data.events.map((event) => {
      const regCount = data.registrations.filter((r) => r.eventId === event.id && r.status !== 'cancelled').length;
      return {
        ...event,
        registeredCount: regCount,
        spotsRemaining: Math.max(0, event.maxCapacity - regCount)
      };
    });
  }

  getEventById(id) {
    const events = this.getEvents();
    return events.find((e) => e.id === id) || null;
  }

  createEvent(eventData) {
    const data = this.read();
    const id = eventData.id || eventData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newEvent = {
      ...eventData,
      id,
      maxCapacity: Number(eventData.maxCapacity) || 100,
      status: eventData.status || 'open',
      requirePaymentProof: Boolean(eventData.requirePaymentProof),
      customFields: Array.isArray(eventData.customFields) ? eventData.customFields : []
    };
    data.events.push(newEvent);
    this.write(data);
    return newEvent;
  }

  updateEvent(id, updateData) {
    const data = this.read();
    const index = data.events.findIndex((e) => e.id === id);
    if (index === -1) return null;
    data.events[index] = { ...data.events[index], ...updateData };
    this.write(data);
    return data.events[index];
  }

  deleteEvent(id) {
    const data = this.read();
    const prevLength = data.events.length;
    data.events = data.events.filter((e) => e.id !== id);
    // Optionally also remove registrations or keep them
    this.write(data);
    return data.events.length < prevLength;
  }

  // --- REGISTRATIONS ---
  getRegistrations({ eventId, status, search } = {}) {
    const data = this.read();
    let list = [...data.registrations];

    if (eventId && eventId !== 'all') {
      list = list.filter((r) => r.eventId === eventId);
    }

    if (status && status !== 'all') {
      list = list.filter((r) => r.status === status);
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((r) =>
        r.name?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.college?.toLowerCase().includes(q) ||
        r.ieeeId?.toLowerCase().includes(q) ||
        r.id?.toLowerCase().includes(q)
      );
    }

    // Sort by latest registration first
    return list.sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt));
  }

  getRegistrationById(id) {
    const data = this.read();
    return data.registrations.find((r) => r.id === id) || null;
  }

  createRegistration(regData) {
    const data = this.read();

    // Check duplicate email for same event
    const existing = data.registrations.find(
      (r) => r.eventId === regData.eventId && r.email.toLowerCase() === regData.email.toLowerCase() && r.status !== 'cancelled'
    );
    if (existing) {
      throw new Error(`A registration with email ${regData.email} already exists for this event.`);
    }

    const event = data.events.find((e) => e.id === regData.eventId);
    const eventName = event ? event.title : regData.eventName || 'Chapter Event';

    const newId = `REG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReg = {
      id: newId,
      eventId: regData.eventId,
      eventName,
      name: regData.name,
      email: regData.email,
      phone: regData.phone || '',
      college: regData.college || 'MBITS Kothamangalam',
      department: regData.department || 'Computer Science & Engineering',
      year: regData.year || '3rd Year',
      isIeeeMember: Boolean(regData.isIeeeMember || regData.ieeeId),
      ieeeId: regData.ieeeId || '',
      status: regData.status || 'confirmed',
      registeredAt: new Date().toISOString(),
      notes: regData.notes || '',
      paymentProof: regData.paymentProof || null,
      customAnswers: regData.customAnswers || {}
    };

    data.registrations.unshift(newReg);
    this.write(data);
    return newReg;
  }

  updateRegistrationStatus(id, newStatus) {
    const data = this.read();
    const reg = data.registrations.find((r) => r.id === id);
    if (!reg) return null;
    reg.status = newStatus;
    this.write(data);
    return reg;
  }

  deleteRegistration(id) {
    const data = this.read();
    const prevLength = data.registrations.length;
    data.registrations = data.registrations.filter((r) => r.id !== id);
    this.write(data);
    return data.registrations.length < prevLength;
  }

  // --- STATS ---
  getStats() {
    const data = this.read();
    const total = data.registrations.length;
    const confirmed = data.registrations.filter((r) => r.status === 'confirmed').length;
    const pending = data.registrations.filter((r) => r.status === 'pending').length;
    const waitlisted = data.registrations.filter((r) => r.status === 'waitlisted').length;
    const cancelled = data.registrations.filter((r) => r.status === 'cancelled').length;

    const ieeeMembers = data.registrations.filter((r) => r.isIeeeMember && r.status !== 'cancelled').length;
    const nonMembers = data.registrations.filter((r) => !r.isIeeeMember && r.status !== 'cancelled').length;

    // Registrations per event
    const byEvent = {};
    data.events.forEach((e) => {
      byEvent[e.id] = {
        title: e.title,
        count: data.registrations.filter((r) => r.eventId === e.id && r.status !== 'cancelled').length,
        capacity: e.maxCapacity
      };
    });

    // Registrations per college
    const byCollege = {};
    data.registrations.forEach((r) => {
      if (r.status === 'cancelled') return;
      const c = r.college || 'Other';
      byCollege[c] = (byCollege[c] || 0) + 1;
    });

    // Messages metrics
    const messages = data.messages || [];
    const totalMessages = messages.length;
    const newMessages = messages.filter((m) => m.status === 'new').length;
    const repliedMessages = messages.filter((m) => m.status === 'replied').length;

    return {
      totalRegistrations: total,
      confirmedCount: confirmed,
      pendingCount: pending,
      waitlistedCount: waitlisted,
      cancelledCount: cancelled,
      ieeeMembersCount: ieeeMembers,
      nonMembersCount: nonMembers,
      registrationsByEvent: byEvent,
      registrationsByCollege: byCollege,
      recentRegistrations: data.registrations.slice(0, 5),
      totalMessages,
      newMessages,
      repliedMessages
    };
  }

  // --- TRANSMISSION MESSAGES ---
  getMessages({ status, search } = {}) {
    const data = this.read();
    let result = (data.messages || []).slice().reverse(); // newest first

    if (status && status !== 'all') {
      result = result.filter((m) => m.status === status);
    }

    if (search && search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          (m.name || '').toLowerCase().includes(q) ||
          (m.email || '').toLowerCase().includes(q) ||
          (m.subject || '').toLowerCase().includes(q) ||
          (m.message || '').toLowerCase().includes(q) ||
          (m.id || '').toLowerCase().includes(q)
      );
    }

    return result;
  }

  getMessageById(id) {
    const data = this.read();
    return (data.messages || []).find((m) => m.id === id) || null;
  }

  createMessage(msgData) {
    const data = this.read();
    data.messages = data.messages || [];

    const id = `MSG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newMsg = {
      id,
      name: msgData.name || 'Anonymous Technologist',
      email: msgData.email || '',
      subject: msgData.subject || 'General Inquiry',
      message: msgData.message || '',
      status: 'new',
      createdAt: new Date().toISOString()
    };

    data.messages.push(newMsg);
    this.write(data);
    return newMsg;
  }

  updateMessageStatus(id, status) {
    const data = this.read();
    data.messages = data.messages || [];
    const index = data.messages.findIndex((m) => m.id === id);
    if (index === -1) return null;
    data.messages[index].status = status;
    this.write(data);
    return data.messages[index];
  }

  deleteMessage(id) {
    const data = this.read();
    data.messages = data.messages || [];
    const prevLen = data.messages.length;
    data.messages = data.messages.filter((m) => m.id !== id);
    this.write(data);
    return data.messages.length < prevLen;
  }

  // --- AUTH ---
  verifyAdmin(username, password) {
    const data = this.read();
    return data.admin.username === username && data.admin.passwordHash === password;
  }
}

export const db = new Database();
