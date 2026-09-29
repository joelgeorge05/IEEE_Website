// Client API utility for IEEE CS MBITS Event Management System

const API_BASE = '/api';

export const api = {
  // --- AUTH ---
  async login(username, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return res.json();
  },

  async verifyAuth(token) {
    const res = await fetch(`${API_BASE}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  },

  // --- STATS ---
  async getStats() {
    const res = await fetch(`${API_BASE}/stats`);
    return res.json();
  },

  // --- EVENTS ---
  async getEvents() {
    const res = await fetch(`${API_BASE}/events`);
    return res.json();
  },

  async createEvent(eventData) {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    });
    return res.json();
  },

  async updateEvent(id, updateData) {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    return res.json();
  },

  async deleteEvent(id) {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // --- REGISTRATIONS ---
  async getRegistrations(params = {}) {
    const query = new URLSearchParams();
    if (params.eventId) query.append('eventId', params.eventId);
    if (params.status) query.append('status', params.status);
    if (params.search) query.append('search', params.search);

    const res = await fetch(`${API_BASE}/registrations?${query.toString()}`);
    return res.json();
  },

  async submitRegistration(regData) {
    const res = await fetch(`${API_BASE}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regData)
    });
    return res.json();
  },

  async updateRegistrationStatus(id, status) {
    const res = await fetch(`${API_BASE}/registrations/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  async deleteRegistration(id) {
    const res = await fetch(`${API_BASE}/registrations/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // --- TRANSMISSIONS / MESSAGES ---
  async getMessages(params = {}) {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.search) query.append('search', params.search);

    const res = await fetch(`${API_BASE}/messages?${query.toString()}`);
    return res.json();
  },

  async submitMessage(messageData) {
    const res = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    });
    return res.json();
  },

  async updateMessageStatus(id, status) {
    const res = await fetch(`${API_BASE}/messages/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  async deleteMessage(id) {
    const res = await fetch(`${API_BASE}/messages/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // --- EXPORT CSV ---
  getExportUrl(eventId) {
    return `${API_BASE}/registrations/export${eventId ? `?eventId=${eventId}` : ''}`;
  },

  // --- SEED RESET ---
  async resetDatabase() {
    const res = await fetch(`${API_BASE}/seed`, {
      method: 'POST'
    });
    return res.json();
  }
};
