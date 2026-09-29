import express from 'express';
import { db } from './db.js';

export const apiRouter = express.Router();

// Middleware to parse JSON with increased limit for payment receipt uploads
apiRouter.use(express.json({ limit: '20mb' }));
apiRouter.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Simple Bearer token generator / validator for demo
const ADMIN_TOKEN = 'mbits_ieee_admin_session_token_2026';

// --- AUTHENTICATION ---
apiRouter.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required.' });
  }

  if (db.verifyAdmin(username, password)) {
    return res.json({
      success: true,
      token: ADMIN_TOKEN,
      user: {
        username: 'admin',
        role: 'IEEE CS Chapter Administrator',
        institution: 'MBITS Kothamangalam'
      }
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
});

apiRouter.get('/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.replace('Bearer ', '') === ADMIN_TOKEN) {
    return res.json({ success: true, valid: true });
  }
  return res.status(401).json({ success: false, valid: false });
});

// --- STATS OVERVIEW ---
apiRouter.get('/stats', (req, res) => {
  try {
    const stats = db.getStats();
    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- EVENTS ---
apiRouter.get('/events', (req, res) => {
  try {
    const events = db.getEvents();
    res.json({ success: true, events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

apiRouter.post('/events', (req, res) => {
  try {
    const { 
      title, 
      category, 
      date, 
      venue, 
      prizePool, 
      maxCapacity, 
      description, 
      fee, 
      requirePaymentProof, 
      customFields 
    } = req.body;

    if (!title || !category) {
      return res.status(400).json({ success: false, message: 'Title and category required.' });
    }
    const newEvent = db.createEvent({
      title,
      category,
      date: date || new Date().toISOString().split('T')[0],
      displayDate: req.body.displayDate || date || 'TBA',
      venue: venue || 'MBITS Campus',
      prizePool: prizePool || 'Certificate & Prizes',
      maxCapacity: Number(maxCapacity) || 100,
      description: description || '',
      fee: fee || 'Free',
      requirePaymentProof: Boolean(requirePaymentProof),
      customFields: Array.isArray(customFields) ? customFields : [],
      status: req.body.status || 'open'
    });
    res.status(201).json({ success: true, event: newEvent });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

apiRouter.put('/events/:id', (req, res) => {
  try {
    const updated = db.updateEvent(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }
    res.json({ success: true, event: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

apiRouter.delete('/events/:id', (req, res) => {
  try {
    const deleted = db.deleteEvent(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }
    res.json({ success: true, message: 'Event deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- REGISTRATIONS ---
apiRouter.get('/registrations', (req, res) => {
  try {
    const { eventId, status, search } = req.query;
    const registrations = db.getRegistrations({ eventId, status, search });
    res.json({
      success: true,
      count: registrations.length,
      registrations
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

apiRouter.post('/registrations', (req, res) => {
  try {
    const { 
      eventId, 
      name, 
      email, 
      phone, 
      college, 
      department, 
      year, 
      isIeeeMember, 
      ieeeId, 
      notes,
      paymentProof,
      customAnswers
    } = req.body;

    if (!eventId || !name || !email) {
      return res.status(400).json({ success: false, message: 'Event, name, and email are required fields.' });
    }

    const newReg = db.createRegistration({
      eventId,
      name,
      email,
      phone,
      college,
      department,
      year,
      isIeeeMember,
      ieeeId,
      notes,
      paymentProof,
      customAnswers
    });

    res.status(201).json({
      success: true,
      message: 'Registration confirmed successfully!',
      registration: newReg
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

apiRouter.patch('/registrations/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    if (!['confirmed', 'pending', 'waitlisted', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }
    const updated = db.updateRegistrationStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Registration not found.' });
    }
    res.json({ success: true, registration: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

apiRouter.delete('/registrations/:id', (req, res) => {
  try {
    const deleted = db.deleteRegistration(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Registration not found.' });
    }
    res.json({ success: true, message: 'Registration deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- CSV EXPORT ---
apiRouter.get('/registrations/export', (req, res) => {
  try {
    const { eventId } = req.query;
    const registrations = db.getRegistrations({ eventId });

    // Generate CSV format
    const headers = ['Registration ID', 'Event Name', 'Participant Name', 'Email', 'Phone', 'College', 'Department', 'Year', 'IEEE Member', 'IEEE ID', 'Status', 'Payment Proof Attached', 'Custom Dynamic Answers', 'Registered At'];
    
    const rows = registrations.map((r) => [
      `"${r.id}"`,
      `"${r.eventName.replace(/"/g, '""')}"`,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.email}"`,
      `"${r.phone || ''}"`,
      `"${(r.college || '').replace(/"/g, '""')}"`,
      `"${(r.department || '').replace(/"/g, '""')}"`,
      `"${r.year || ''}"`,
      r.isIeeeMember ? 'YES' : 'NO',
      `"${r.ieeeId || ''}"`,
      `"${r.status.toUpperCase()}"`,
      r.paymentProof ? 'YES' : 'NO',
      `"${r.customAnswers ? JSON.stringify(r.customAnswers).replace(/"/g, '""') : ''}"`,
      `"${r.registeredAt}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="IEEE_CS_MBITS_Registrations_${new Date().toISOString().slice(0, 10)}.csv"`);
    res.send(csvContent);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- TRANSMISSION MESSAGES ---
apiRouter.get('/messages', (req, res) => {
  try {
    const { status, search } = req.query;
    const messages = db.getMessages({ status, search });
    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

apiRouter.post('/messages', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }
    const newMsg = db.createMessage({ name, email, subject, message });
    res.status(201).json({ success: true, message: newMsg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

apiRouter.patch('/messages/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }
    const updated = db.updateMessageStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }
    res.json({ success: true, message: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

apiRouter.delete('/messages/:id', (req, res) => {
  try {
    const deleted = db.deleteMessage(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }
    res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- DATABASE RESET / SEED ---
apiRouter.post('/seed', (req, res) => {
  try {
    db.seed();
    res.json({ success: true, message: 'Database reset to default seed records successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
