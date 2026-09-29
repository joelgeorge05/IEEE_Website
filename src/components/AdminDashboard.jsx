import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Calendar, 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Trash2, 
  Plus, 
  RefreshCw, 
  ArrowLeft, 
  LogOut, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Layers,
  ChevronDown,
  Check,
  Camera,
  Maximize2,
  Edit2,
  PlusCircle,
  X,
  Mail,
  MessageSquare,
  Inbox,
  Reply,
  Send,
  Eye
} from 'lucide-react';
import { api } from '../utils/api';
import { soundFx } from '../utils/soundEffects';

// Reusable Cyberpunk Custom Dropdown
function CustomSelect({ value, onChange, options, icon: Icon, placeholder = 'Select option', className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleToggle = () => {
    soundFx.playClick();
    if (!isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setOpenUpwards(spaceBelow < 220);
    }
    setIsOpen(!isOpen);
  };

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/95 border text-xs font-mono flex items-center justify-between gap-2 transition-all shadow-sm ${
          isOpen
            ? 'border-ieee-cyan shadow-[0_0_20px_rgba(0,210,255,0.25)] text-white ring-1 ring-ieee-cyan/30'
            : 'border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white'
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          {Icon && <Icon className="w-3.5 h-3.5 text-ieee-cyan shrink-0" />}
          {selectedOption?.dot && (
            <span className={`w-2 h-2 rounded-full shrink-0 ${selectedOption.dot}`} />
          )}
          <span className="truncate">{selectedOption?.label || placeholder}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {selectedOption?.badge !== undefined && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-semibold">
              {selectedOption.badge}
            </span>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-ieee-cyan' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 right-0 z-50 max-h-60 overflow-y-auto rounded-xl bg-slate-900/98 border border-slate-700/90 shadow-[0_15px_40px_rgba(0,0,0,0.95)] backdrop-blur-xl py-1 text-xs font-mono scrollbar-thin animate-in fade-in zoom-in-95 duration-100 ${
            openUpwards ? 'bottom-full mb-1.5 origin-bottom' : 'top-full mt-1.5 origin-top'
          }`}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between gap-2 transition-colors ${
                  isSelected
                    ? 'bg-ieee-blue/25 text-ieee-cyan font-bold border-l-2 border-ieee-cyan'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {opt.dot && <span className={`w-2 h-2 rounded-full shrink-0 ${opt.dot}`} />}
                  <span className="truncate">{opt.label}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {opt.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        isSelected
                          ? 'bg-ieee-cyan/20 text-ieee-cyan border border-ieee-cyan/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {opt.badge}
                    </span>
                  )}
                  {isSelected && <Check className="w-3.5 h-3.5 text-ieee-cyan ml-1" />}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Custom Quick Action Status Dropdown for Table Rows
function RowStatusDropdown({ status, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleToggle = () => {
    soundFx.playClick();
    if (!isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setOpenUpwards(spaceBelow < 180);
    }
    setIsOpen(!isOpen);
  };

  const statusConfigs = {
    confirmed: {
      label: 'Confirmed',
      dot: 'bg-emerald-400',
      pill: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
    },
    pending: {
      label: 'Pending',
      dot: 'bg-amber-400',
      pill: 'bg-amber-500/15 text-amber-300 border-amber-500/40 hover:bg-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
    },
    waitlisted: {
      label: 'Waitlist',
      dot: 'bg-purple-400',
      pill: 'bg-purple-500/15 text-purple-300 border-purple-500/40 hover:bg-purple-500/25 shadow-[0_0_12px_rgba(168,85,247,0.15)]'
    },
    cancelled: {
      label: 'Cancelled',
      dot: 'bg-red-400',
      pill: 'bg-red-500/15 text-red-300 border-red-500/40 hover:bg-red-500/25 shadow-[0_0_12px_rgba(239,68,68,0.15)]'
    }
  };

  const current = statusConfigs[status] || statusConfigs.pending;

  const statuses = [
    { value: 'confirmed', label: 'Confirmed', dot: 'bg-emerald-400', color: 'text-emerald-300' },
    { value: 'pending', label: 'Pending', dot: 'bg-amber-400', color: 'text-amber-300' },
    { value: 'waitlisted', label: 'Waitlisted', dot: 'bg-purple-400', color: 'text-purple-300' },
    { value: 'cancelled', label: 'Cancelled', dot: 'bg-red-400', color: 'text-red-300' }
  ];

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={handleToggle}
        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-semibold border flex items-center gap-1.5 transition-all ${current.pill}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
        <span>{current.label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 z-50 w-36 rounded-xl bg-slate-900/98 border border-slate-700/90 shadow-[0_12px_36px_rgba(0,0,0,0.95)] backdrop-blur-xl py-1 text-xs font-mono animate-in fade-in zoom-in-95 duration-100 ${
            openUpwards ? 'bottom-full mb-1 origin-bottom-right' : 'top-full mt-1 origin-top-right'
          }`}
        >
          {statuses.map((s) => {
            const isSelected = s.value === status;
            return (
              <button
                key={s.value}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onChange(s.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left flex items-center justify-between gap-1.5 transition-colors ${
                  isSelected ? 'bg-slate-800 text-white font-bold' : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                  <span className={s.color}>{s.label}</span>
                </div>
                {isSelected && <Check className="w-3 h-3 text-ieee-cyan" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard({ onNavigateHome }) {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState('registrations'); // 'registrations' | 'events' | 'analytics' | 'messages'
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Transmissions / Inquiries State
  const [messages, setMessages] = useState([]);
  const [messageFilter, setMessageFilter] = useState('all'); // 'all' | 'new' | 'read' | 'replied' | 'archived'
  const [messageSearch, setMessageSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Filters & Search
  const [selectedEventFilter, setSelectedEventFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Detail Modal & Fullscreen Receipt Lightbox
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [viewingReceipt, setViewingReceipt] = useState(null);

  // Create Event Modal State
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [newEventForm, setNewEventForm] = useState({
    title: '',
    category: 'Competition',
    date: '',
    displayDate: '',
    venue: 'MBITS Campus',
    prizePool: '₹2,000',
    maxCapacity: 100,
    fee: 'Free for IEEE Members / ₹100 Non-Members',
    requirePaymentProof: true,
    customFields: [],
    description: ''
  });

  // Edit Event Modal State
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editEventForm, setEditEventForm] = useState({
    title: '',
    category: 'Competition',
    date: '',
    displayDate: '',
    venue: '',
    prizePool: '',
    maxCapacity: 100,
    fee: 'Free for IEEE Members',
    requirePaymentProof: false,
    customFields: [],
    description: ''
  });

  // Action status message toast
  const [actionNotice, setActionNotice] = useState('');

  const showNotice = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 3500);
  };

  // Check saved session on mount
  useEffect(() => {
    const token = localStorage.getItem('ieee_admin_token');
    if (token) {
      api.verifyAuth(token)
        .then((res) => {
          if (res.success) {
            setIsAuthenticated(true);
            loadDashboardData();
          } else {
            localStorage.removeItem('ieee_admin_token');
          }
        })
        .catch(() => localStorage.removeItem('ieee_admin_token'))
        .finally(() => setAuthLoading(false));
    } else {
      setAuthLoading(false);
    }
  }, []);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (viewingReceipt) setViewingReceipt(null);
        else if (selectedRegistration) setSelectedRegistration(null);
        else if (selectedMessage) setSelectedMessage(null);
        else if (isEditEventOpen) setIsEditEventOpen(false);
        else if (isCreateEventOpen) setIsCreateEventOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewingReceipt, selectedRegistration, selectedMessage, isEditEventOpen, isCreateEventOpen]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, eventsRes, regsRes, msgsRes] = await Promise.all([
        api.getStats(),
        api.getEvents(),
        api.getRegistrations({
          eventId: selectedEventFilter,
          status: selectedStatusFilter,
          search: searchQuery
        }),
        api.getMessages()
      ]);

      if (statsRes && statsRes.success) setStats(statsRes.stats);
      if (eventsRes && eventsRes.success) setEvents(eventsRes.events);
      if (regsRes && regsRes.success) setRegistrations(regsRes.registrations);
      if (msgsRes && msgsRes.success) {
        setMessages(msgsRes.messages);
      } else {
        const local = JSON.parse(localStorage.getItem('ieee_transmissions') || '[]');
        if (local.length) setMessages(local);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      const local = JSON.parse(localStorage.getItem('ieee_transmissions') || '[]');
      if (local.length) setMessages(local);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMessageStatus = async (id, newStatus) => {
    try {
      const res = await api.updateMessageStatus(id, newStatus);
      if (res && res.success) {
        soundFx.playSuccess();
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage((prev) => ({ ...prev, status: newStatus }));
        }
        showNotice(`Transmission marked as ${newStatus.toUpperCase()}`);
      }
    } catch (err) {
      console.error('Failed to update message status:', err);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
      );
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage((prev) => ({ ...prev, status: newStatus }));
      }
      showNotice(`Transmission marked as ${newStatus.toUpperCase()}`);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this transmission?')) return;
    try {
      const res = await api.deleteMessage(id);
      if (res && res.success) {
        soundFx.playClick();
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage(null);
        }
        showNotice('Transmission permanently removed.');
      }
    } catch (err) {
      console.error('Failed to delete message:', err);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
      showNotice('Transmission removed.');
    }
  };

  const exportMessagesCsv = () => {
    soundFx.playClick();
    const headers = ['Transmission ID', 'Sender Name', 'Email', 'Subject', 'Message Body', 'Status', 'Received At'];
    const rows = messages.map((m) => [
      `"${m.id}"`,
      `"${(m.name || '').replace(/"/g, '""')}"`,
      `"${(m.email || '').replace(/"/g, '""')}"`,
      `"${(m.subject || '').replace(/"/g, '""')}"`,
      `"${(m.message || '').replace(/"/g, '""')}"`,
      `"${(m.status || '').toUpperCase()}"`,
      `"${m.createdAt || ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `IEEE_CS_MBITS_Transmissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportRegistrationsCsv = () => {
    soundFx.playClick();
    const headers = [
      'Registration ID',
      'Event Name',
      'Participant Name',
      'Email',
      'Phone',
      'College',
      'Department',
      'Year',
      'IEEE Member',
      'IEEE ID',
      'Status',
      'Registered At'
    ];
    const rows = registrations.map((r) => [
      `"${r.id}"`,
      `"${(r.eventName || r.eventId || '').replace(/"/g, '""')}"`,
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${(r.email || '').replace(/"/g, '""')}"`,
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      `"${(r.college || '').replace(/"/g, '""')}"`,
      `"${(r.department || '').replace(/"/g, '""')}"`,
      `"${(r.year || '').replace(/"/g, '""')}"`,
      `"${r.isIeeeMember ? 'YES' : 'NO'}"`,
      `"${(r.ieeeId || '').replace(/"/g, '""')}"`,
      `"${(r.status || '').toUpperCase()}"`,
      `"${r.registeredAt || ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `IEEE_CS_MBITS_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reload registrations on filter change
  useEffect(() => {
    if (isAuthenticated) {
      api.getRegistrations({
        eventId: selectedEventFilter,
        status: selectedStatusFilter,
        search: searchQuery
      }).then((res) => {
        if (res.success) setRegistrations(res.registrations);
      });
    }
  }, [selectedEventFilter, selectedStatusFilter, searchQuery, isAuthenticated]);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoginError('');
    try {
      const res = await api.login(username, password);
      if (res.success) {
        soundFx.playSuccess();
        localStorage.setItem('ieee_admin_token', res.token);
        setIsAuthenticated(true);
        loadDashboardData();
      } else {
        soundFx.playClick();
        setLoginError(res.message || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Server connection error. Ensure backend is running.');
    }
  };

  const handleQuickDemoLogin = () => {
    setUsername('admin');
    setPassword('mbits@ieee2026');
    setTimeout(() => {
      handleLogin();
    }, 50);
  };

  const handleLogout = () => {
    soundFx.playClick();
    localStorage.removeItem('ieee_admin_token');
    setIsAuthenticated(false);
  };

  const handleStatusChange = async (regId, newStatus) => {
    soundFx.playClick();
    try {
      const res = await api.updateRegistrationStatus(regId, newStatus);
      if (res.success) {
        showNotice(`Updated #${regId} to ${newStatus.toUpperCase()}`);
        loadDashboardData();
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDeleteRegistration = async (regId) => {
    if (!window.confirm(`Are you sure you want to permanently delete registration ${regId}?`)) return;
    soundFx.playClick();
    try {
      const res = await api.deleteRegistration(regId);
      if (res.success) {
        showNotice(`Registration ${regId} deleted.`);
        loadDashboardData();
        if (selectedRegistration?.id === regId) setSelectedRegistration(null);
      }
    } catch (err) {
      alert('Failed to delete registration');
    }
  };

  const handleToggleEventStatus = async (eventId, currentStatus) => {
    soundFx.playClick();
    const newStatus = currentStatus === 'open' ? 'closed' : 'open';
    try {
      const res = await api.updateEvent(eventId, { status: newStatus });
      if (res.success) {
        showNotice(`Event status switched to ${newStatus.toUpperCase()}`);
        loadDashboardData();
      }
    } catch (err) {
      alert('Failed to toggle event status');
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    soundFx.playClick();
    try {
      const res = await api.createEvent(newEventForm);
      if (res.success) {
        soundFx.playSuccess();
        showNotice(`Created new event: ${res.event.title}`);
        setIsCreateEventOpen(false);
        setNewEventForm({
          title: '',
          category: 'Competition',
          date: '',
          displayDate: '',
          venue: 'MBITS Campus',
          prizePool: '₹2,000',
          maxCapacity: 100,
          fee: 'Free for IEEE Members / ₹100 Non-Members',
          requirePaymentProof: true,
          customFields: [],
          description: ''
        });
        loadDashboardData();
      }
    } catch (err) {
      alert('Failed to create event');
    }
  };

  const handleOpenEditEvent = (event) => {
    soundFx.playClick();
    setEditingEvent(event);
    setEditEventForm({
      title: event.title || '',
      category: event.category || 'Competition',
      date: event.date || '',
      displayDate: event.displayDate || '',
      venue: event.venue || '',
      prizePool: event.prizePool || '',
      maxCapacity: event.maxCapacity || 100,
      fee: event.fee || '',
      description: event.description || '',
      requirePaymentProof: Boolean(event.requirePaymentProof),
      customFields: Array.isArray(event.customFields) ? JSON.parse(JSON.stringify(event.customFields)) : []
    });
    setIsEditEventOpen(true);
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    soundFx.playClick();
    try {
      const res = await api.updateEvent(editingEvent.id, editEventForm);
      if (res.success) {
        soundFx.playSuccess();
        showNotice(`Updated event: ${res.event.title}`);
        setIsEditEventOpen(false);
        setEditingEvent(null);
        loadDashboardData();
      }
    } catch (err) {
      alert('Failed to update event');
    }
  };

  const addCustomFieldToForm = (formType, presetLabel = '', presetType = 'text', presetPlaceholder = '', presetReq = false) => {
    soundFx.playClick();
    const newField = {
      id: `field_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      label: presetLabel || 'Custom Field Box',
      type: presetType || 'text',
      placeholder: presetPlaceholder || '',
      required: presetReq
    };

    if (formType === 'new') {
      setNewEventForm((prev) => ({
        ...prev,
        customFields: [...(prev.customFields || []), newField]
      }));
    } else {
      setEditEventForm((prev) => ({
        ...prev,
        customFields: [...(prev.customFields || []), newField]
      }));
    }
  };

  const updateCustomFieldInForm = (formType, index, key, value) => {
    if (formType === 'new') {
      setNewEventForm((prev) => {
        const fields = [...(prev.customFields || [])];
        fields[index] = { ...fields[index], [key]: value };
        return { ...prev, customFields: fields };
      });
    } else {
      setEditEventForm((prev) => {
        const fields = [...(prev.customFields || [])];
        fields[index] = { ...fields[index], [key]: value };
        return { ...prev, customFields: fields };
      });
    }
  };

  const removeCustomFieldFromForm = (formType, index) => {
    soundFx.playClick();
    if (formType === 'new') {
      setNewEventForm((prev) => {
        const fields = [...(prev.customFields || [])];
        fields.splice(index, 1);
        return { ...prev, customFields: fields };
      });
    } else {
      setEditEventForm((prev) => {
        const fields = [...(prev.customFields || [])];
        fields.splice(index, 1);
        return { ...prev, customFields: fields };
      });
    }
  };

  const handleResetDatabase = async () => {
    if (!window.confirm('Reset database to default initial seed registrations?')) return;
    soundFx.playClick();
    try {
      await api.resetDatabase();
      soundFx.playSuccess();
      showNotice('Database reset to default seed records.');
      loadDashboardData();
    } catch (err) {
      alert('Failed to reset database');
    }
  };

  // Status badge styling helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            CONFIRMED
          </span>
        );
      case 'pending':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            PENDING
          </span>
        );
      case 'waitlisted':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            WAITLISTED
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-red-500/10 text-red-400 border border-red-500/30 flex items-center gap-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            CANCELLED
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  const getMessageStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30 flex items-center gap-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            NEW
          </span>
        );
      case 'read':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-slate-300 bg-slate-800/80 border border-slate-700 flex items-center gap-1.5 w-fit">
            <Eye className="w-3 h-3 text-slate-400" />
            READ
          </span>
        );
      case 'replied':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 w-fit">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            REPLIED
          </span>
        );
      case 'archived':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-slate-500 bg-slate-900 border border-slate-800 flex items-center gap-1.5 w-fit">
            ARCHIVED
          </span>
        );
      default:
        return null;
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesStatus = messageFilter === 'all' || m.status === messageFilter;
    const q = messageSearch.toLowerCase();
    const matchesSearch = !q || 
      (m.name || '').toLowerCase().includes(q) ||
      (m.email || '').toLowerCase().includes(q) ||
      (m.subject || '').toLowerCase().includes(q) ||
      (m.message || '').toLowerCase().includes(q) ||
      (m.id || '').toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-mono text-sm">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full border-2 border-ieee-cyan border-t-transparent animate-spin" />
          <span>Authenticating Session...</span>
        </div>
      </div>
    );
  }

  // --- LOGIN GATE ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ieee-navy cyber-grid flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-ieee-blue/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-md w-full glass-panel p-8 rounded-2xl border-ieee-border shadow-2xl relative z-10 text-left">
          
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website</span>
          </button>

          {/* Header Logos & Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <img src="/ieee-logo.svg" alt="IEEE" className="h-6 w-auto" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-ieee-cyan font-semibold">IEEE CS MBITS // SB 65041</div>
              <h2 className="text-xl font-bold font-display text-white">Admin Management Portal</h2>
            </div>
          </div>

          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Authorized access for IEEE Computer Society MBITS chapter executives to manage participant registrations, approve applicants, and monitor event capacity.
          </p>

          {loginError && (
            <div className="p-3 mb-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Admin Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-ieee-cyan transition-colors"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Access Passkey</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-ieee-cyan transition-colors"
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-xs font-mono bg-gradient-to-r from-ieee-blue to-ieee-cyan text-white shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:scale-[1.01] active:scale-95 transition-all mt-2"
            >
              Authenticate & Enter Dashboard →
            </button>
          </form>

          {/* Admin Credentials Guideline */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 mb-2 font-mono">Executive Administrator Credentials</div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-center gap-3">
              <span>User: <span className="text-ieee-cyan font-bold">admin</span></span>
              <span className="text-slate-600">|</span>
              <span>Passkey: <span className="text-emerald-400 font-bold">mbits@ieee2026</span></span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-2">
              Type the username and passkey into the fields above to authenticate.
            </p>
          </div>

        </div>
      </div>
    );
  }

  // --- AUTHENTICATED DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 text-left relative selection:bg-ieee-cyan selection:text-slate-950">
      
      {/* Toast Notice */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onNavigateHome}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Return to Public Website"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <img src="/ieee-logo.svg" alt="IEEE" className="h-6 w-auto bg-white px-1.5 py-0.5 rounded" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white leading-none">IEEE CS MBITS Command Center</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                  LIVE BACKEND
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                Executive Portal // Localhost:5173/admin
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDatabase}
            className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors hidden sm:flex items-center gap-1.5"
            title="Reset to default seed data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/60 border border-red-500/30 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1560px] mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Top Metric Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl border-ieee-border hover:border-ieee-cyan/40 transition-all">
              <div className="text-slate-400 text-xs font-mono mb-2">
                TOTAL REGISTRATIONS
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-white mb-1">
                {stats.totalRegistrations}
              </div>
              <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <span>{stats.confirmedCount} Confirmed</span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-400">{stats.pendingCount} Pending</span>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border-ieee-border hover:border-ieee-cyan/40 transition-all">
              <div className="text-slate-400 text-xs font-mono mb-2">
                IEEE CHAPTER MEMBERS
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-ieee-cyan mb-1">
                {stats.ieeeMembersCount}
              </div>
              <div className="text-xs text-slate-400">
                {stats.totalRegistrations > 0 
                  ? `${Math.round((stats.ieeeMembersCount / stats.totalRegistrations) * 100)}% verified members`
                  : 'No entries yet'}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border-ieee-border hover:border-ieee-cyan/40 transition-all">
              <div className="text-slate-400 text-xs font-mono mb-2">
                NON-MEMBER PARTICIPANTS
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-ieee-gold mb-1">
                {stats.nonMembersCount}
              </div>
              <div className="text-xs text-slate-400">
                Outreach & prospective members
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border-ieee-border hover:border-ieee-cyan/40 transition-all">
              <div className="text-slate-400 text-xs font-mono mb-2">
                ACTIVE CHAPTER EVENTS
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-emerald-400 mb-1">
                {events.length}
              </div>
              <div className="text-xs text-slate-400">
                WebNova, HackElite, CTFs & Bootcamps
              </div>
            </div>
          </div>
        )}

        {/* Tab Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('registrations');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                activeTab === 'registrations'
                  ? 'bg-ieee-blue text-white font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Registrations ({registrations.length})</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('events');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                activeTab === 'events'
                  ? 'bg-ieee-blue text-white font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Event Manager ({events.length})</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('analytics');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                activeTab === 'analytics'
                  ? 'bg-ieee-blue text-white font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Demographics</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('messages');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                activeTab === 'messages'
                  ? 'bg-ieee-blue text-white font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Transmissions ({messages.length})</span>
              {messages.filter((m) => m.status === 'new').length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px]">
                  {messages.filter((m) => m.status === 'new').length} New
                </span>
              )}
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            {activeTab === 'registrations' && (
              <button
                onClick={exportRegistrationsCsv}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all flex items-center gap-1.5 font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV Sheet</span>
              </button>
            )}

            {activeTab === 'messages' && (
              <button
                onClick={exportMessagesCsv}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all flex items-center gap-1.5 font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Transmissions CSV</span>
              </button>
            )}

            {activeTab === 'events' && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  setIsCreateEventOpen(true);
                }}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-ieee-blue hover:bg-ieee-lightBlue text-white shadow-md transition-all flex items-center gap-1.5 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Publish New Event</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================
            TAB 1: REGISTRATIONS MANAGEMENT
            ======================================================== */}
        {activeTab === 'registrations' && (
          <div className="space-y-4">
            
            {/* Search and Filters Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* Search Box */}
              <div className="sm:col-span-6 relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by participant name, email, college, or IEEE ID..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-ieee-cyan transition-colors"
                />
              </div>

              {/* Event Filter */}
              <div className="sm:col-span-3">
                <CustomSelect
                  value={selectedEventFilter}
                  onChange={(val) => setSelectedEventFilter(val)}
                  icon={Calendar}
                  placeholder="Filter by event"
                  options={[
                    { value: 'all', label: `All Events (${stats?.totalRegistrations || 0})` },
                    ...events.map((e) => ({
                      value: e.id,
                      label: e.title,
                      badge: `${e.registeredCount}`
                    }))
                  ]}
                />
              </div>

              {/* Status Filter */}
              <div className="sm:col-span-3">
                <CustomSelect
                  value={selectedStatusFilter}
                  onChange={(val) => setSelectedStatusFilter(val)}
                  icon={Filter}
                  placeholder="Filter by status"
                  options={[
                    { value: 'all', label: 'All Statuses', dot: 'bg-slate-400' },
                    { value: 'confirmed', label: 'Confirmed', dot: 'bg-emerald-400', badge: stats?.confirmedCount },
                    { value: 'pending', label: 'Pending Approval', dot: 'bg-amber-400', badge: stats?.pendingCount },
                    { value: 'waitlisted', label: 'Waitlisted', dot: 'bg-purple-400' },
                    { value: 'cancelled', label: 'Cancelled', dot: 'bg-red-400' }
                  ]}
                />
              </div>
            </div>

            {/* Table Card */}
            <div className="glass-panel rounded-2xl border-ieee-border shadow-2xl">
              <div className="overflow-x-auto min-h-[380px] pb-20 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 font-mono text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4">REG ID</th>
                      <th className="py-3.5 px-4">PARTICIPANT</th>
                      <th className="py-3.5 px-4">TARGET EVENT</th>
                      <th className="py-3.5 px-4">COLLEGE / DEPT</th>
                      <th className="py-3.5 px-4">MEMBERSHIP</th>
                      <th className="py-3.5 px-4">PAYMENT PROOF</th>
                      <th className="py-3.5 px-4">STATUS</th>
                      <th className="py-3.5 px-4 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono">
                    {loading ? (
                      <tr>
                        <td colSpan="8" className="py-8 text-center text-slate-500">
                          Loading registration data from backend...
                        </td>
                      </tr>
                    ) : registrations.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="py-8 text-center text-slate-500">
                          No registrations found matching the selected filters.
                        </td>
                      </tr>
                    ) : (
                      registrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="py-3 px-4 text-ieee-cyan font-semibold">
                            {reg.id}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-sans font-bold text-white text-xs">{reg.name}</div>
                            <div className="text-[11px] text-slate-400">{reg.email}</div>
                            {reg.phone && <div className="text-[10px] text-slate-500">{reg.phone}</div>}
                          </td>
                          <td className="py-3 px-4 max-w-[220px]">
                            <div className="font-sans text-slate-200 truncate">{reg.eventName}</div>
                            <div className="text-[10px] text-slate-500">
                              {new Date(reg.registeredAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-3 px-4 max-w-[200px]">
                            <div className="text-slate-300 truncate">{reg.college}</div>
                            <div className="text-[10px] text-slate-500 truncate">{reg.department} ({reg.year})</div>
                          </td>
                          <td className="py-3 px-4">
                            {reg.isIeeeMember ? (
                              <span className="text-[11px] text-ieee-cyan font-semibold block">
                                IEEE #{reg.ieeeId || 'Verified'}
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-500">Non-Member</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {reg.paymentProof ? (
                              <button
                                onClick={() => {
                                  soundFx.playClick();
                                  setViewingReceipt(reg.paymentProof);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 inline-flex items-center gap-1.5 text-[11px] font-mono transition-all shadow-xs group"
                                title="Click to view payment proof screenshot"
                              >
                                <Camera className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                                <span>Receipt</span>
                              </button>
                            ) : (
                              <span className="text-slate-600 text-[11px] font-mono">—</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {getStatusBadge(reg.status)}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Quick status dropdown */}
                              <RowStatusDropdown
                                status={reg.status}
                                onChange={(newStatus) => handleStatusChange(reg.id, newStatus)}
                              />

                              {/* View Details */}
                              <button
                                onClick={() => setSelectedRegistration(reg)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                                title="View full details"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => handleDeleteRegistration(reg.id)}
                                className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-950 text-red-400 hover:text-red-300 border border-red-500/20 transition-colors"
                                title="Delete record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 2: EVENT MANAGER
            ======================================================== */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => {
                const percentage = Math.round((event.registeredCount / event.maxCapacity) * 100);
                const isOpen = event.status === 'open';

                return (
                  <div 
                    key={event.id}
                    className="glass-panel p-6 rounded-2xl border-ieee-border hover:border-ieee-cyan/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-ieee-blue/20 text-ieee-cyan border border-ieee-cyan/30 uppercase">
                          {event.category}
                        </span>
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-semibold border ${
                          isOpen 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-red-500/10 text-red-400 border-red-500/30'
                        }`}>
                          {isOpen ? 'REGISTRATION OPEN' : 'REGISTRATION CLOSED'}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white mb-1.5">{event.title}</h3>
                      <p className="text-xs text-slate-400 mb-4 line-clamp-2">{event.description}</p>

                      <div className="space-y-1.5 text-xs font-mono text-slate-300 mb-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Date:</span>
                          <span>{event.displayDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Venue:</span>
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Prize Pool:</span>
                          <span className="text-emerald-400">{event.prizePool}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Entry Fee:</span>
                          <span>{event.fee}</span>
                        </div>
                      </div>

                      {/* Capacity Meter */}
                      <div className="space-y-1 mb-4">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-400">Enrollment</span>
                          <span className="text-white font-bold">{event.registeredCount} / {event.maxCapacity} ({percentage}%)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${
                              percentage > 85 ? 'bg-amber-400' : 'bg-gradient-to-r from-ieee-blue to-ieee-cyan'
                            }`}
                            style={{ width: `${Math.min(100, percentage)}%` }}
                          />
                        </div>
                      </div>
                      {/* Configuration Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {event.requirePaymentProof ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <Camera className="w-3 h-3 text-emerald-400" />
                            Screenshot Required
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                            No Screenshot
                          </span>
                        )}
                        {event.customFields && event.customFields.length > 0 && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-ieee-blue/20 text-ieee-cyan border border-ieee-cyan/30">
                            +{event.customFields.length} Dynamic Boxes
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleEventStatus(event.id, event.status)}
                        className={`py-2 px-3 rounded-xl text-xs font-mono font-semibold transition-all border ${
                          isOpen
                            ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/30'
                            : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        {isOpen ? 'Close Reg' : 'Open Reg'}
                      </button>

                      <button
                        onClick={() => handleOpenEditEvent(event)}
                        className="py-2 px-3 rounded-xl text-xs font-mono bg-ieee-blue/20 hover:bg-ieee-blue/30 text-ieee-cyan border border-ieee-cyan/30 transition-colors flex items-center gap-1.5 font-semibold"
                        title="Configure registration boxes and screenshot requirements"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Boxes</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedEventFilter(event.id);
                          setActiveTab('registrations');
                        }}
                        className="py-2 px-3 rounded-xl text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      >
                        Attendees ({event.registeredCount})
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: DEMOGRAPHICS & ANALYTICS
            ======================================================== */}
        {activeTab === 'analytics' && stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Event Distribution Breakdown */}
            <div className="glass-panel p-6 rounded-2xl border-ieee-border space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-ieee-cyan" />
                <span>Registrations by Competition & Workshop</span>
              </h3>
              <div className="space-y-3">
                {Object.entries(stats.registrationsByEvent).map(([id, item]) => {
                  const pct = stats.totalRegistrations > 0 
                    ? Math.round((item.count / stats.totalRegistrations) * 100) 
                    : 0;

                  return (
                    <div key={id} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-300 font-medium">{item.title}</span>
                        <span className="text-ieee-cyan font-bold">{item.count} ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-ieee-blue to-ieee-cyan"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* College / Institution Demographics */}
            <div className="glass-panel p-6 rounded-2xl border-ieee-border space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>College & University Representation</span>
              </h3>
              <div className="space-y-3">
                {Object.entries(stats.registrationsByCollege).map(([college, count]) => {
                  const pct = stats.totalRegistrations > 0 
                    ? Math.round((count / stats.totalRegistrations) * 100) 
                    : 0;

                  return (
                    <div key={college} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-white">{college}</div>
                        <div className="text-[10px] font-mono text-slate-500">Collegiate Delegation</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-ieee-blue/20 text-ieee-cyan font-mono text-xs font-bold">
                        {count} participants ({pct}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 4: TRANSMISSIONS & INQUIRIES MANAGEMENT
            ======================================================== */}
        {activeTab === 'messages' && (
          <div className="space-y-5">
            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel p-4 rounded-xl border-ieee-border">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Total Transmissions</div>
                <div className="text-2xl font-mono font-bold text-white mt-1">{messages.length}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Portal communications received</div>
              </div>

              <div className="glass-panel p-4 rounded-xl border-amber-500/30 bg-amber-950/10">
                <div className="text-[10px] font-mono text-amber-400 uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  New & Unread
                </div>
                <div className="text-2xl font-mono font-bold text-amber-300 mt-1">
                  {messages.filter((m) => m.status === 'new').length}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Awaiting committee review</div>
              </div>

              <div className="glass-panel p-4 rounded-xl border-emerald-500/30 bg-emerald-950/10">
                <div className="text-[10px] font-mono text-emerald-400 uppercase flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  Replied / Resolved
                </div>
                <div className="text-2xl font-mono font-bold text-emerald-300 mt-1">
                  {messages.filter((m) => m.status === 'replied').length}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Responses dispatched via email</div>
              </div>

              <div className="glass-panel p-4 rounded-xl border-ieee-border">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Response Rate</div>
                <div className="text-2xl font-mono font-bold text-ieee-cyan mt-1">
                  {messages.length > 0 
                    ? Math.round((messages.filter((m) => m.status === 'replied').length / messages.length) * 100) 
                    : 100}%
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Direct communication SLA</div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="glass-panel p-4 rounded-xl border-ieee-border flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <span className="text-[10px] font-mono text-slate-400 uppercase mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3 text-ieee-cyan" /> Filter:
                </span>
                {[
                  { id: 'all', label: `All (${messages.length})` },
                  { id: 'new', label: `New (${messages.filter((m) => m.status === 'new').length})` },
                  { id: 'read', label: `Read (${messages.filter((m) => m.status === 'read').length})` },
                  { id: 'replied', label: `Replied (${messages.filter((m) => m.status === 'replied').length})` },
                  { id: 'archived', label: `Archived (${messages.filter((m) => m.status === 'archived').length})` }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundFx.playClick();
                      setMessageFilter(tab.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      messageFilter === tab.id
                        ? 'bg-ieee-blue text-white font-semibold shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search sender, email, subject..."
                  value={messageSearch}
                  onChange={(e) => setMessageSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs font-mono rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-ieee-cyan"
                />
                {messageSearch && (
                  <button
                    onClick={() => setMessageSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Transmissions List */}
            {filteredMessages.length === 0 ? (
              <div className="glass-panel p-12 rounded-2xl border-ieee-border text-center space-y-3">
                <Inbox className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="text-white font-bold text-sm">No transmission messages match your filter</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Messages submitted through the public Transmission Portal on the homepage appear here in real-time.
                </p>
                {(messageFilter !== 'all' || messageSearch) && (
                  <button
                    onClick={() => {
                      setMessageFilter('all');
                      setMessageSearch('');
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-ieee-cyan text-xs font-mono hover:bg-slate-700 transition-colors"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredMessages.map((msg) => {
                  const isNew = msg.status === 'new';
                  return (
                    <div
                      key={msg.id}
                      className={`glass-panel p-4 sm:p-5 rounded-xl border transition-all ${
                        isNew
                          ? 'border-amber-500/40 bg-slate-900/90 shadow-[0_0_20px_rgba(251,191,36,0.08)]'
                          : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-mono font-bold text-ieee-cyan bg-ieee-cyan/10 px-2 py-0.5 rounded border border-ieee-cyan/20">
                              {msg.id}
                            </span>
                            {getMessageStatusBadge(msg.status)}
                            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              {new Date(msg.createdAt).toLocaleString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>

                          <h4 className="text-sm sm:text-base font-bold text-white pt-0.5">
                            {msg.subject || 'General Chapter Inquiry'}
                          </h4>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                            <span className="font-semibold text-white">{msg.name}</span>
                            <span className="text-slate-600">•</span>
                            <a
                              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'IEEE CS MBITS Inquiry')}`}
                              className="text-ieee-cyan hover:underline flex items-center gap-1 font-mono text-[11px]"
                            >
                              <Mail className="w-3 h-3" />
                              <span>{msg.email}</span>
                            </a>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 font-sans mt-2 whitespace-pre-wrap">
                            {msg.message}
                          </p>
                        </div>

                        {/* Action buttons on the right */}
                        <div className="flex sm:flex-col items-center gap-2 shrink-0 pt-2 sm:pt-0">
                          <button
                            onClick={() => {
                              soundFx.playClick();
                              setSelectedMessage(msg);
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-mono bg-ieee-blue/25 hover:bg-ieee-blue/40 text-ieee-cyan border border-ieee-cyan/30 flex items-center gap-1.5 transition-all"
                            title="Open Full Transmission Dossier"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>

                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'IEEE CS MBITS Inquiry')}&body=Dear ${encodeURIComponent(msg.name)},\n\nThank you for reaching out to IEEE Computer Society MBITS.\n\nRegarding your inquiry:\n"${encodeURIComponent(msg.message)}"\n\n---\nBest regards,\nIEEE Computer Society Student Branch Chapter\nMar Baselios Institute of Technology & Science (MBITS)`}
                            onClick={() => {
                              soundFx.playClick();
                              handleUpdateMessageStatus(msg.id, 'replied');
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-mono bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 transition-all"
                            title="Send Email Reply via Mail App"
                          >
                            <Reply className="w-3.5 h-3.5" />
                            <span>Reply</span>
                          </a>

                          {msg.status !== 'read' && msg.status !== 'replied' && (
                            <button
                              onClick={() => handleUpdateMessageStatus(msg.id, 'read')}
                              className="px-2.5 py-1.5 rounded-lg text-[11px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                              title="Mark as Read"
                            >
                              Mark Read
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Delete Transmission"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </main>

      {/* ========================================================
          DETAIL MODAL (FOR REGISTRATION)
          ======================================================== */}
      {selectedRegistration && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border-ieee-border max-w-lg w-full shadow-2xl relative space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-ieee-cyan uppercase">Registration Dossier</span>
                <h3 className="text-lg font-bold text-white">{selectedRegistration.id}</h3>
              </div>
              <button
                onClick={() => setSelectedRegistration(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <div className="text-slate-500 text-[10px]">PARTICIPANT NAME</div>
                  <div className="text-white font-bold text-sm">{selectedRegistration.name}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">CURRENT STATUS</div>
                  <div>{getStatusBadge(selectedRegistration.status)}</div>
                </div>
              </div>

              <div>
                <div className="text-slate-500 text-[10px]">EMAIL ADDRESS</div>
                <div className="text-slate-200">{selectedRegistration.email}</div>
              </div>

              <div>
                <div className="text-slate-500 text-[10px]">CONTACT PHONE</div>
                <div className="text-slate-200">{selectedRegistration.phone || 'Not provided'}</div>
              </div>

              <div>
                <div className="text-slate-500 text-[10px]">ENROLLED EVENT</div>
                <div className="text-ieee-cyan font-semibold">{selectedRegistration.eventName}</div>
              </div>

              <div>
                <div className="text-slate-500 text-[10px]">INSTITUTION & DEPARTMENT</div>
                <div className="text-slate-200">{selectedRegistration.college}</div>
                <div className="text-slate-400 text-[11px]">{selectedRegistration.department} ({selectedRegistration.year})</div>
              </div>

              <div>
                <div className="text-slate-500 text-[10px]">IEEE MEMBERSHIP STATUS</div>
                <div className="text-slate-200">
                  {selectedRegistration.isIeeeMember 
                    ? `Verified IEEE Member (ID: ${selectedRegistration.ieeeId})` 
                    : 'Non-Member Guest'}
                </div>
              </div>

              {selectedRegistration.notes && (
                <div>
                  <div className="text-slate-500 text-[10px]">ADDITIONAL NOTES / TEAM INFO</div>
                  <div className="text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[11px]">
                    {selectedRegistration.notes}
                  </div>
                </div>
              )}

              {/* Dynamic Custom Fields ("Boxes") Answers */}
              {selectedRegistration.customAnswers && Object.keys(selectedRegistration.customAnswers).length > 0 && (
                <div className="pt-2 border-t border-slate-800 space-y-1.5">
                  <div className="text-[10px] uppercase font-bold text-ieee-cyan flex items-center justify-between">
                    <span>ADDITIONAL REGISTRATION DATA (DYNAMIC BOXES)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    {Object.entries(selectedRegistration.customAnswers).map(([k, v]) => (
                      <div key={k} className="text-xs">
                        <span className="text-slate-500 text-[10px] block uppercase font-mono">{k}:</span>
                        <span className="text-slate-200 font-semibold break-all">{v || '—'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Proof Screenshot Section */}
              {selectedRegistration.paymentProof ? (
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5" />
                      <span>PAYMENT PROOF SCREENSHOT (UPI / RECEIPT)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setViewingReceipt(selectedRegistration.paymentProof);
                      }}
                      className="text-[11px] text-ieee-cyan hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>Enlarge / Full View</span>
                    </button>
                  </div>
                  
                  <div
                    onClick={() => {
                      soundFx.playClick();
                      setViewingReceipt(selectedRegistration.paymentProof);
                    }}
                    className="relative group cursor-pointer max-h-52 overflow-hidden rounded-xl border border-slate-800 hover:border-ieee-cyan bg-black flex items-center justify-center p-2 transition-all shadow-inner"
                    title="Click to view full size receipt screenshot"
                  >
                    <img
                      src={selectedRegistration.paymentProof}
                      alt="Participant Payment Proof"
                      className="max-h-48 w-auto object-contain rounded"
                    />
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Maximize2 className="w-5 h-5 text-ieee-cyan" />
                      <span className="text-xs text-white font-bold font-mono">View Full Screenshot</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pt-2 border-t border-slate-800 text-xs text-slate-500">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono mb-0.5">PAYMENT PROOF</span>
                  <span className="italic">No payment proof uploaded (Event free or payment waived).</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setSelectedRegistration(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TRANSMISSION DOSSIER MODAL
          ======================================================== */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border-ieee-border max-w-xl w-full shadow-2xl relative space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-ieee-cyan uppercase">Transmission Portal Record</span>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{selectedMessage.id}</span>
                  {getMessageStatusBadge(selectedMessage.status)}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <div className="text-slate-500 text-[10px]">SENDER NAME</div>
                  <div className="text-white font-bold text-sm">{selectedMessage.name}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">RECEIVED TIMESTAMP</div>
                  <div className="text-slate-300 text-xs">
                    {new Date(selectedMessage.createdAt).toLocaleString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-slate-500 text-[10px]">SENDER EMAIL</div>
                <div className="text-ieee-cyan font-semibold text-xs mt-0.5">{selectedMessage.email}</div>
              </div>

              <div>
                <div className="text-slate-500 text-[10px]">SUBJECT LINE</div>
                <div className="text-white font-bold text-sm mt-0.5">{selectedMessage.subject}</div>
              </div>

              <div>
                <div className="text-slate-500 text-[10px] mb-1">TRANSMISSION CONTENT</div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-sans leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Status Switcher */}
              <div className="pt-2">
                <div className="text-slate-500 text-[10px] mb-1.5">UPDATE STATUS</div>
                <div className="flex flex-wrap gap-2">
                  {['new', 'read', 'replied', 'archived'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateMessageStatus(selectedMessage.id, st)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-all ${
                        selectedMessage.status === st
                          ? 'bg-ieee-blue text-white font-bold shadow-sm'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => handleDeleteMessage(selectedMessage.id)}
                className="px-3 py-2 rounded-xl text-xs font-mono text-red-400 hover:text-white hover:bg-red-500/20 border border-red-500/30 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'IEEE CS MBITS Inquiry')}&body=Dear ${encodeURIComponent(selectedMessage.name)},\n\nThank you for reaching out to IEEE Computer Society MBITS.\n\nRegarding your inquiry:\n"${encodeURIComponent(selectedMessage.message)}"\n\n---\nBest regards,\nIEEE Computer Society Student Branch Chapter\nMar Baselios Institute of Technology & Science (MBITS)`}
                  onClick={() => handleUpdateMessageStatus(selectedMessage.id, 'replied')}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors flex items-center gap-1.5"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>

                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 rounded-xl text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CREATE EVENT MODAL (WITH DYNAMIC BOXES & PAYMENT TOGGLE)
          ======================================================== */}
      {isCreateEventOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border-ieee-border max-w-xl w-full shadow-2xl relative text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 sticky top-0 bg-slate-950/90 backdrop-blur z-10">
              <div>
                <span className="text-[10px] font-mono text-ieee-cyan uppercase">Chapter Operations</span>
                <h3 className="text-lg font-bold text-white">Publish New Event</h3>
              </div>
              <button
                onClick={() => setIsCreateEventOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1">Event Title <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  required
                  value={newEventForm.title}
                  onChange={(e) => setNewEventForm({ ...newEventForm, title: e.target.value })}
                  placeholder="e.g. NextGen Web & Cloud Summit 2026"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-ieee-cyan"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <CustomSelect
                    value={newEventForm.category}
                    onChange={(val) => setNewEventForm({ ...newEventForm, category: val })}
                    options={[
                      { value: 'Competition', label: 'Competition' },
                      { value: 'Hackathon', label: 'Hackathon' },
                      { value: 'Workshop', label: 'Workshop' },
                      { value: 'CTF', label: 'CTF' },
                      { value: 'Webinar', label: 'Webinar' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Max Capacity</label>
                  <input
                    type="number"
                    value={newEventForm.maxCapacity}
                    onChange={(e) => setNewEventForm({ ...newEventForm, maxCapacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-ieee-cyan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Display Date</label>
                  <input
                    type="text"
                    required
                    value={newEventForm.displayDate}
                    onChange={(e) => setNewEventForm({ ...newEventForm, displayDate: e.target.value })}
                    placeholder="e.g. 15 November 2026"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-ieee-cyan"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Prize / Reward</label>
                  <input
                    type="text"
                    value={newEventForm.prizePool}
                    onChange={(e) => setNewEventForm({ ...newEventForm, prizePool: e.target.value })}
                    placeholder="₹5,000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-ieee-cyan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Registration Fee</label>
                  <input
                    type="text"
                    value={newEventForm.fee}
                    onChange={(e) => setNewEventForm({ ...newEventForm, fee: e.target.value })}
                    placeholder="e.g. Free / ₹100 Non-Members"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-ieee-cyan"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Venue</label>
                  <input
                    type="text"
                    value={newEventForm.venue}
                    onChange={(e) => setNewEventForm({ ...newEventForm, venue: e.target.value })}
                    placeholder="MBITS Campus / Online"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-ieee-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={newEventForm.description}
                  onChange={(e) => setNewEventForm({ ...newEventForm, description: e.target.value })}
                  placeholder="Brief narrative of the event..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-ieee-cyan"
                />
              </div>

              {/* Payment Proof Screenshot Requirement Toggle */}
              <div 
                onClick={() => setNewEventForm({ ...newEventForm, requirePaymentProof: !newEventForm.requirePaymentProof })}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  newEventForm.requirePaymentProof 
                    ? 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <input
                  type="checkbox"
                  checked={newEventForm.requirePaymentProof}
                  onChange={(e) => setNewEventForm({ ...newEventForm, requirePaymentProof: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-400"
                />
                <div>
                  <span className="text-white font-bold flex items-center gap-1.5 text-xs">
                    <Camera className="w-3.5 h-3.5 text-emerald-400" />
                    Require Payment Proof Screenshot
                  </span>
                  <span className="text-slate-400 text-[11px] block mt-0.5 leading-relaxed">
                    Attendees must upload a photo/screenshot of their UPI or registration fee transfer receipt before completing registration.
                  </span>
                </div>
              </div>

              {/* Dynamic Registration Form Fields ("Boxes") Builder */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-2.5">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <div>
                    <span className="text-white font-bold flex items-center gap-1.5 text-xs">
                      <PlusCircle className="w-3.5 h-3.5 text-ieee-cyan" />
                      Dynamic Registration Fields ("Boxes")
                    </span>
                    <span className="text-slate-400 text-[10px] block">
                      Add extra input boxes for participants to fill in this event's registration modal.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => addCustomFieldToForm('new')}
                    className="px-2.5 py-1 rounded-lg bg-ieee-blue/20 hover:bg-ieee-blue/30 text-ieee-cyan border border-ieee-cyan/30 text-[11px] flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Box</span>
                  </button>
                </div>

                {/* Quick Preset Pills */}
                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="text-slate-500">Presets:</span>
                  <button type="button" onClick={() => addCustomFieldToForm('new', 'WhatsApp Number', 'text', '+91 94471 23456', true)} className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">+ Phone</button>
                  <button type="button" onClick={() => addCustomFieldToForm('new', 'GitHub / Portfolio Link', 'text', 'https://github.com/...', false)} className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">+ GitHub</button>
                  <button type="button" onClick={() => addCustomFieldToForm('new', 'Team / Project Codename', 'text', 'e.g. CyberVanguard', false)} className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">+ Team Name</button>
                  <button type="button" onClick={() => addCustomFieldToForm('new', 'Semester / Year of Study', 'text', 'e.g. S6 (3rd Year)', true)} className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">+ Semester</button>
                  <button type="button" onClick={() => addCustomFieldToForm('new', 'Food Preference', 'text', 'Veg / Non-Veg', false)} className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">+ Food</button>
                </div>

                {/* Custom Fields List */}
                {(!newEventForm.customFields || newEventForm.customFields.length === 0) ? (
                  <div className="text-[11px] text-slate-500 italic py-2 text-center bg-slate-950/40 rounded-lg">
                    No extra boxes added yet. Default boxes (Full Name, Email, College, IEEE ID) will be collected.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {newEventForm.customFields.map((field, idx) => (
                      <div key={field.id || idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Box Label (e.g. WhatsApp Number)"
                            value={field.label}
                            onChange={(e) => updateCustomFieldInForm('new', idx, 'label', e.target.value)}
                            className="flex-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px] focus:outline-none focus:border-ieee-cyan"
                          />
                          <select
                            value={field.type}
                            onChange={(e) => updateCustomFieldInForm('new', idx, 'type', e.target.value)}
                            className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px] focus:outline-none"
                          >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="email">Email</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => removeCustomFieldFromForm('new', idx)}
                            className="p-1 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                            title="Delete this box"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            placeholder="Placeholder hint text..."
                            value={field.placeholder || ''}
                            onChange={(e) => updateCustomFieldInForm('new', idx, 'placeholder', e.target.value)}
                            className="flex-1 px-2 py-0.5 rounded bg-slate-900/60 border border-slate-800 text-slate-300 text-[10px] focus:outline-none"
                          />
                          <label className="flex items-center gap-1.5 text-[10px] text-slate-400 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => updateCustomFieldInForm('new', idx, 'required', e.target.checked)}
                              className="rounded border-slate-700 text-ieee-cyan"
                            />
                            Required
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2 sticky bottom-0 bg-slate-950/90 backdrop-blur z-10">
                <button
                  type="button"
                  onClick={() => setIsCreateEventOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-ieee-blue hover:bg-ieee-lightBlue text-white font-semibold shadow-md"
                >
                  Create & Launch Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          EDIT EVENT MODAL (CONFIGURE BOXES & PAYMENT PROOF)
          ======================================================== */}
      {isEditEventOpen && editingEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border-ieee-border max-w-xl w-full shadow-2xl relative text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 sticky top-0 bg-slate-950/90 backdrop-blur z-10">
              <div>
                <span className="text-[10px] font-mono text-ieee-cyan uppercase">Event Configuration</span>
                <h3 className="text-lg font-bold text-white">Edit Event & Custom Boxes</h3>
              </div>
              <button
                onClick={() => setIsEditEventOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateEvent} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1">Event Title <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  required
                  value={editEventForm.title}
                  onChange={(e) => setEditEventForm({ ...editEventForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-ieee-cyan"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <CustomSelect
                    value={editEventForm.category}
                    onChange={(val) => setEditEventForm({ ...editEventForm, category: val })}
                    options={[
                      { value: 'Competition', label: 'Competition' },
                      { value: 'Hackathon', label: 'Hackathon' },
                      { value: 'Workshop', label: 'Workshop' },
                      { value: 'CTF', label: 'CTF' },
                      { value: 'Webinar', label: 'Webinar' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Max Capacity</label>
                  <input
                    type="number"
                    value={editEventForm.maxCapacity}
                    onChange={(e) => setEditEventForm({ ...editEventForm, maxCapacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-ieee-cyan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Display Date</label>
                  <input
                    type="text"
                    required
                    value={editEventForm.displayDate}
                    onChange={(e) => setEditEventForm({ ...editEventForm, displayDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-ieee-cyan"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Prize / Reward</label>
                  <input
                    type="text"
                    value={editEventForm.prizePool}
                    onChange={(e) => setEditEventForm({ ...editEventForm, prizePool: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-ieee-cyan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Registration Fee</label>
                  <input
                    type="text"
                    value={editEventForm.fee}
                    onChange={(e) => setEditEventForm({ ...editEventForm, fee: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-ieee-cyan"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Venue</label>
                  <input
                    type="text"
                    value={editEventForm.venue}
                    onChange={(e) => setEditEventForm({ ...editEventForm, venue: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-ieee-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={editEventForm.description}
                  onChange={(e) => setEditEventForm({ ...editEventForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-ieee-cyan"
                />
              </div>

              {/* Payment Proof Screenshot Requirement Toggle */}
              <div 
                onClick={() => setEditEventForm({ ...editEventForm, requirePaymentProof: !editEventForm.requirePaymentProof })}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  editEventForm.requirePaymentProof 
                    ? 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <input
                  type="checkbox"
                  checked={editEventForm.requirePaymentProof}
                  onChange={(e) => setEditEventForm({ ...editEventForm, requirePaymentProof: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-400"
                />
                <div>
                  <span className="text-white font-bold flex items-center gap-1.5 text-xs">
                    <Camera className="w-3.5 h-3.5 text-emerald-400" />
                    Require Payment Proof Screenshot
                  </span>
                  <span className="text-slate-400 text-[11px] block mt-0.5 leading-relaxed">
                    Attendees must upload a photo/screenshot of their UPI or registration fee transfer receipt before completing registration.
                  </span>
                </div>
              </div>

              {/* Dynamic Registration Form Fields ("Boxes") Builder */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-2.5">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <div>
                    <span className="text-white font-bold flex items-center gap-1.5 text-xs">
                      <PlusCircle className="w-3.5 h-3.5 text-ieee-cyan" />
                      Dynamic Registration Fields ("Boxes")
                    </span>
                    <span className="text-slate-400 text-[10px] block">
                      Add extra custom input boxes for participants registering for this event.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => addCustomFieldToForm('edit')}
                    className="px-2.5 py-1 rounded-lg bg-ieee-blue/20 hover:bg-ieee-blue/30 text-ieee-cyan border border-ieee-cyan/30 text-[11px] flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Box</span>
                  </button>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="text-slate-500">Presets:</span>
                  <button type="button" onClick={() => addCustomFieldToForm('edit', 'WhatsApp Number', 'text', '+91 94471 23456', true)} className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">+ Phone</button>
                  <button type="button" onClick={() => addCustomFieldToForm('edit', 'GitHub / Portfolio Link', 'text', 'https://github.com/...', false)} className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">+ GitHub</button>
                  <button type="button" onClick={() => addCustomFieldToForm('edit', 'Team / Project Codename', 'text', 'e.g. CyberVanguard', false)} className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">+ Team Name</button>
                  <button type="button" onClick={() => addCustomFieldToForm('edit', 'Semester / Year of Study', 'text', 'e.g. S6 (3rd Year)', true)} className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">+ Semester</button>
                  <button type="button" onClick={() => addCustomFieldToForm('edit', 'Food Preference', 'text', 'Veg / Non-Veg', false)} className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">+ Food</button>
                </div>

                {/* Custom Fields List */}
                {(!editEventForm.customFields || editEventForm.customFields.length === 0) ? (
                  <div className="text-[11px] text-slate-500 italic py-2 text-center bg-slate-950/40 rounded-lg">
                    No extra boxes configured. Default boxes (Full Name, Email, College, IEEE ID) will be collected.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {editEventForm.customFields.map((field, idx) => (
                      <div key={field.id || idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Box Label (e.g. WhatsApp Number)"
                            value={field.label}
                            onChange={(e) => updateCustomFieldInForm('edit', idx, 'label', e.target.value)}
                            className="flex-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px] focus:outline-none focus:border-ieee-cyan"
                          />
                          <select
                            value={field.type}
                            onChange={(e) => updateCustomFieldInForm('edit', idx, 'type', e.target.value)}
                            className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px] focus:outline-none"
                          >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="email">Email</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => removeCustomFieldFromForm('edit', idx)}
                            className="p-1 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                            title="Delete this box"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            placeholder="Placeholder hint text..."
                            value={field.placeholder || ''}
                            onChange={(e) => updateCustomFieldInForm('edit', idx, 'placeholder', e.target.value)}
                            className="flex-1 px-2 py-0.5 rounded bg-slate-900/60 border border-slate-800 text-slate-300 text-[10px] focus:outline-none"
                          />
                          <label className="flex items-center gap-1.5 text-[10px] text-slate-400 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => updateCustomFieldInForm('edit', idx, 'required', e.target.checked)}
                              className="rounded border-slate-700 text-ieee-cyan"
                            />
                            Required
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2 sticky bottom-0 bg-slate-950/90 backdrop-blur z-10">
                <button
                  type="button"
                  onClick={() => setIsEditEventOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-ieee-blue hover:bg-ieee-lightBlue text-white font-semibold shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          FULLSCREEN PAYMENT RECEIPT LIGHTBOX MODAL (FOR ADMIN)
          ======================================================== */}
      {viewingReceipt && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setViewingReceipt(null);
          }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
        >
          <div className="relative max-w-xl w-full bg-slate-950 border border-emerald-500/50 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col items-center my-auto">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs text-white font-bold">Participant Payment Proof Screenshot</span>
              </div>
              <button
                onClick={() => setViewingReceipt(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-hidden rounded-xl border border-slate-800 flex items-center justify-center bg-black w-full p-2">
              <img 
                src={viewingReceipt} 
                alt="Payment Proof Receipt Fullscreen" 
                className="max-h-[70vh] w-auto object-contain mx-auto rounded shadow-lg"
              />
            </div>

            <div className="w-full pt-4 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-[11px] text-slate-500">Verified official transaction image</span>
              <div className="flex items-center gap-2">
                <a
                  href={viewingReceipt}
                  download="Payment_Receipt_Proof"
                  className="px-3 py-1.5 rounded-lg bg-ieee-blue hover:bg-ieee-lightBlue text-white transition-colors flex items-center gap-1.5 font-semibold text-xs shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setViewingReceipt(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
