// ============================================================
// API Service - Connects React Frontend to Spring Boot Backend
// Base URL: http://localhost:8080/api
// ============================================================

const BASE_URL = 'http://localhost:8080/api';

// Get JWT token from localStorage
const getToken = () => localStorage.getItem('ficm_token');

// Common headers
const headers = () => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {})
});

// ─── AUTH ───────────────────────────────────────────────────
export const authAPI = {
  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Invalid email or password');
    return res.json();
  },

  register: async (userData) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  }
};

// ─── CLIENTS ─────────────────────────────────────────────────
export const clientAPI = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/clients`, { headers: headers() });
    if (!res.ok) throw new Error('Failed to fetch clients');
    return res.json();
  },

  create: async (client) => {
    const res = await fetch(`${BASE_URL}/clients`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(client)
    });
    if (!res.ok) throw new Error('Failed to create client');
    return res.json();
  },

  update: async (id, client) => {
    const res = await fetch(`${BASE_URL}/clients/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(client)
    });
    if (!res.ok) throw new Error('Failed to update client');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/clients/${id}`, {
      method: 'DELETE',
      headers: headers()
    });
    if (!res.ok) throw new Error('Failed to delete client');
    return res.json();
  }
};

// ─── PROJECTS ────────────────────────────────────────────────
export const projectAPI = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/projects`, { headers: headers() });
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },

  create: async (project) => {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(project)
    });
    if (!res.ok) throw new Error('Failed to create project');
    return res.json();
  },

  update: async (id, project) => {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(project)
    });
    if (!res.ok) throw new Error('Failed to update project');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: headers()
    });
    if (!res.ok) throw new Error('Failed to delete project');
    return res.json();
  }
};

// ─── INVOICES ─────────────────────────────────────────────────
export const invoiceAPI = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/invoices`, { headers: headers() });
    if (!res.ok) throw new Error('Failed to fetch invoices');
    return res.json();
  },

  create: async (invoice) => {
    const res = await fetch(`${BASE_URL}/invoices`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(invoice)
    });
    if (!res.ok) throw new Error('Failed to create invoice');
    return res.json();
  },

  update: async (id, invoice) => {
    const res = await fetch(`${BASE_URL}/invoices/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(invoice)
    });
    if (!res.ok) throw new Error('Failed to update invoice');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/invoices/${id}`, {
      method: 'DELETE',
      headers: headers()
    });
    if (!res.ok) throw new Error('Failed to delete invoice');
    return res.json();
  }
};

// ─── PAYMENTS ─────────────────────────────────────────────────
export const paymentAPI = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/payments`, { headers: headers() });
    if (!res.ok) throw new Error('Failed to fetch payments');
    return res.json();
  },

  create: async (payment) => {
    const res = await fetch(`${BASE_URL}/payments`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(payment)
    });
    if (!res.ok) throw new Error('Failed to create payment');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/payments/${id}`, {
      method: 'DELETE',
      headers: headers()
    });
    if (!res.ok) throw new Error('Failed to delete payment');
    return res.json();
  }
};

// ─── EXPENSES ─────────────────────────────────────────────────
export const expenseAPI = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/expenses`, { headers: headers() });
    if (!res.ok) throw new Error('Failed to fetch expenses');
    return res.json();
  },

  create: async (expense) => {
    const res = await fetch(`${BASE_URL}/expenses`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(expense)
    });
    if (!res.ok) throw new Error('Failed to create expense');
    return res.json();
  },

  update: async (id, expense) => {
    const res = await fetch(`${BASE_URL}/expenses/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(expense)
    });
    if (!res.ok) throw new Error('Failed to update expense');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/expenses/${id}`, {
      method: 'DELETE',
      headers: headers()
    });
    if (!res.ok) throw new Error('Failed to delete expense');
    return res.json();
  }
};

// ─── DASHBOARD ────────────────────────────────────────────────
export const dashboardAPI = {
  getSummary: async () => {
    const res = await fetch(`${BASE_URL}/dashboard/summary`, { headers: headers() });
    if (!res.ok) throw new Error('Failed to fetch dashboard summary');
    return res.json();
  },

  health: async () => {
    const res = await fetch(`${BASE_URL}/dashboard/health`);
    return res.json();
  }
};

// ─── NOTIFICATIONS ────────────────────────────────────────────
export const notificationAPI = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/notifications`, { headers: headers() });
    if (!res.ok) throw new Error('Failed to fetch notifications');
    return res.json();
  },

  markRead: async (id) => {
    const res = await fetch(`${BASE_URL}/notifications/${id}/read`, {
      method: 'PUT',
      headers: headers()
    });
    if (!res.ok) throw new Error('Failed to mark as read');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/notifications/${id}`, {
      method: 'DELETE',
      headers: headers()
    });
    if (!res.ok) throw new Error('Failed to delete notification');
    return res.json();
  }
};
