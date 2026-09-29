// Client API utility for IEEE CS MBITS Event Management System
// Hybrid architecture: Connects to Node/Express REST backend when available,
// and gracefully falls back to persistent in-browser LocalDatabase on static hosts (Vercel, Netlify, GitHub Pages).

import { localDB } from './localDatabase';

const API_BASE = '/api';

// Helper to safely execute fetch with fallback to local database
async function safeFetch(endpoint, options = {}, fallbackFn) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, options);
    // If the server returned HTML (common when SPA catch-all rewrites /api/* to index.html on static hosts)
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      return await res.json();
    }
  } catch (err) {
    // Backend offline or unreachable
  }

  // Graceful fallback to client-side database
  if (fallbackFn) {
    return fallbackFn();
  }
  return { success: false, message: 'Operation failed' };
}

export const api = {
  // --- AUTH ---
  async login(username, password) {
    return safeFetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }, () => localDB.login(username, password));
  },

  async verifyAuth(token) {
    return safeFetch('/auth/verify', {
      headers: { Authorization: `Bearer ${token}` }
    }, () => localDB.verifyAuth(token));
  },

  // --- STATS ---
  async getStats() {
    return safeFetch('/stats', {}, () => localDB.getStats());
  },

  // --- EVENTS ---
  async getEvents() {
    return safeFetch('/events', {}, () => localDB.getEvents());
  },

  async createEvent(eventData) {
    return safeFetch('/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    }, () => localDB.createEvent(eventData));
  },

  async updateEvent(id, updateData) {
    return safeFetch(`/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    }, () => localDB.updateEvent(id, updateData));
  },

  async deleteEvent(id) {
    return safeFetch(`/events/${id}`, {
      method: 'DELETE'
    }, () => localDB.deleteEvent(id));
  },

  // --- REGISTRATIONS ---
  async getRegistrations(params = {}) {
    const query = new URLSearchParams();
    if (params.eventId) query.append('eventId', params.eventId);
    if (params.status) query.append('status', params.status);
    if (params.search) query.append('search', params.search);

    return safeFetch(`/registrations?${query.toString()}`, {}, () => localDB.getRegistrations(params));
  },

  async submitRegistration(regData) {
    return safeFetch('/registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regData)
    }, () => localDB.submitRegistration(regData));
  },

  async updateRegistrationStatus(id, status) {
    return safeFetch(`/registrations/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }, () => localDB.updateRegistrationStatus(id, status));
  },

  async deleteRegistration(id) {
    return safeFetch(`/registrations/${id}`, {
      method: 'DELETE'
    }, () => localDB.deleteRegistration(id));
  },

  // --- TRANSMISSIONS / MESSAGES ---
  async getMessages(params = {}) {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.search) query.append('search', params.search);

    return safeFetch(`/messages?${query.toString()}`, {}, () => localDB.getMessages(params));
  },

  async submitMessage(messageData) {
    return safeFetch('/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    }, () => localDB.submitMessage(messageData));
  },

  async updateMessageStatus(id, status) {
    return safeFetch(`/messages/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }, () => localDB.updateMessageStatus(id, status));
  },

  async deleteMessage(id) {
    return safeFetch(`/messages/${id}`, {
      method: 'DELETE'
    }, () => localDB.deleteMessage(id));
  },

  // --- EXPORT CSV ---
  getExportUrl(eventId) {
    return `${API_BASE}/registrations/export${eventId ? `?eventId=${eventId}` : ''}`;
  },

  // --- SEED RESET ---
  async resetDatabase() {
    return safeFetch('/seed', {
      method: 'POST'
    }, () => localDB.resetDatabase());
  }
};
