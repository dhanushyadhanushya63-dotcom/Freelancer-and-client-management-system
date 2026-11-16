import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialFreelancerProfile,
  initialClients,
  initialProjects,
  initialInvoices,
  initialExpenses,
  initialNotifications
} from '../data/initialData';

const DataContext = createContext();

// ── Auto-reset: bump this version whenever initialData changes ──
const DATA_VERSION = 'v3-dhanushya-2026';

function clearAndReset() {
  ['ficm_profile','ficm_clients','ficm_projects',
   'ficm_invoices','ficm_expenses','ficm_notifications',
   'ficm_current_user','ficm_token'].forEach(k => localStorage.removeItem(k));
  localStorage.setItem('ficm_data_version', DATA_VERSION);
}

// If stored version differs → wipe old cache so fresh names load
if (localStorage.getItem('ficm_data_version') !== DATA_VERSION) {
  clearAndReset();
}

export function DataProvider({ children }) {
  // 1. Profile State
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('ficm_profile');
    return saved ? JSON.parse(saved) : initialFreelancerProfile;
  });

  // 2. Clients State
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('ficm_clients');
    return saved ? JSON.parse(saved) : initialClients;
  });

  // 3. Projects State
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('ficm_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  // 4. Invoices State
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('ficm_invoices');
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  // 5. Expenses State
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('ficm_expenses');

    return saved ? JSON.parse(saved) : initialExpenses;
  });

  // 6. Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('ficm_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Persist all state to localStorage
  useEffect(() => {
    localStorage.setItem('ficm_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('ficm_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('ficm_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('ficm_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('ficm_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('ficm_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Notifications Helper
  const addNotification = (notif) => {
    const newNotif = {
      id: 'notif-' + Date.now(),
      date: 'Just now',
      read: false,
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Client Operations
  const addClient = (clientData) => {
    const newClient = {
      id: 'cli-' + Date.now(),
      status: 'Active',
      totalBilled: 0,
      paidAmount: 0,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(clientData.name)}`,
      ...clientData
    };
    setClients(prev => [newClient, ...prev]);
    addNotification({
      type: 'client',
      title: 'New Client Added',
      message: `Client "${clientData.name}" was successfully added to your contact list.`,
      link: 'clients'
    });
    return newClient;
  };

  const updateClient = (id, updatedFields) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
  };

  const deleteClient = (id) => {
    setClients(prev => prev.filter(c => c.id !== id));
  };

  // Project Operations
  const sendProjectRequest = (requestData) => {
    const newProject = {
      id: 'prj-' + Date.now(),
      status: 'Requested',
      progress: 0,
      startDate: new Date().toISOString().split('T')[0],
      ...requestData
    };
    setProjects(prev => [newProject, ...prev]);
    addNotification({
      type: 'request',
      title: 'New Project Proposal Received',
      message: `A client submitted request "${newProject.title}" with budget ₹${Number(newProject.budget).toLocaleString('en-IN')}`,
      link: 'projects'
    });
    return newProject;
  };

  const acceptProjectRequest = (projectId) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { ...p, status: 'In Progress', progress: 15 };
      }
      return p;
    }));
    addNotification({
      type: 'project',
      title: 'Project Accepted',
      message: 'You have accepted the project and work is now In Progress.',
      link: 'projects'
    });
  };

  const rejectProjectRequest = (projectId) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { ...p, status: 'Rejected' };
      }
      return p;
    }));
    addNotification({
      type: 'project',
      title: 'Project Request Declined',
      message: 'The project request was rejected.',
      link: 'projects'
    });
  };

  const markProjectCompleted = (projectId) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { ...p, status: 'Completed', progress: 100 };
      }
      return p;
    }));
    addNotification({
      type: 'project',
      title: 'Project Marked as Completed! 🎉',
      message: 'Great job! You can now generate an invoice for this project.',
      link: 'invoices'
    });
  };

  const addProject = (projectData) => {
    const newProject = {
      id: 'prj-' + Date.now(),
      status: projectData.status || 'In Progress',
      progress: projectData.progress || 10,
      ...projectData
    };
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  // Invoice Operations
  const createInvoice = (invoiceData) => {
    const invoiceNum = invoiceData.invoiceNumber || `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`;
    const newInvoice = {
      id: 'inv-' + Date.now(),
      invoiceNumber: invoiceNum,
      issueDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      paidAmount: 0,
      ...invoiceData
    };

    setInvoices(prev => [newInvoice, ...prev]);

    // Update client billed stats
    setClients(prev => prev.map(c => {
      if (c.id === invoiceData.clientId) {
        return { ...c, totalBilled: (c.totalBilled || 0) + newInvoice.total };
      }
      return c;
    }));

    addNotification({
      type: 'invoice',
      title: 'Invoice Created',
      message: `Invoice ${newInvoice.invoiceNumber} for ₹${Number(newInvoice.total).toLocaleString('en-IN')} has been generated.`,
      link: 'invoices'
    });

    return newInvoice;
  };

  const updateInvoiceStatus = (invoiceId, status) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        return { ...inv, status };
      }
      return inv;
    }));
  };

  // Payment Recording
  const recordPayment = (invoiceId, paymentDetails) => {
    let paidInv = null;
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        paidInv = {
          ...inv,
          status: 'Paid',
          paidAmount: inv.total,
          paymentDate: paymentDetails.date || new Date().toISOString().split('T')[0],
          paymentMethod: paymentDetails.method || 'Manual Entry / UPI',
          referenceNumber: paymentDetails.referenceNumber || 'TXN-' + Math.floor(100000 + Math.random() * 900000)
        };
        return paidInv;
      }
      return inv;
    }));

    if (paidInv) {
      // Update client's paidAmount
      setClients(prev => prev.map(c => {
        if (c.id === paidInv.clientId) {
          return { ...c, paidAmount: (c.paidAmount || 0) + paidInv.total };
        }
        return c;
      }));

      addNotification({
        type: 'payment',
        title: 'Payment Received! ₹' + Number(paidInv.total).toLocaleString('en-IN'),
        message: `Payment received for ${paidInv.invoiceNumber} via ${paymentDetails.method || 'Online Payment'}.`,
        link: 'payments'
      });
    }
  };

  // Expense Operations
  const addExpense = (expenseData) => {
    const newExpense = {
      id: 'exp-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...expenseData
    };
    setExpenses(prev => [newExpense, ...prev]);
    return newExpense;
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  // Profile Update
  const updateProfile = (updated) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  // Computed Totals for Freelancer Overview Cards (Module 3)
  const totalClientsCount = clients.length;
  const totalProjectsCount = projects.length;
  const completedProjectsCount = projects.filter(p => p.status === 'Completed').length;
  
  // Total Revenue: Sum of all Paid invoices
  const totalRevenue = invoices
    .filter(inv => inv.status === 'Paid')
    .reduce((sum, inv) => sum + (Number(inv.total) || 0), 0);

  // Pending Payments: Sum of Pending & Overdue invoices
  const pendingPayments = invoices
    .filter(inv => inv.status === 'Pending' || inv.status === 'Overdue')
    .reduce((sum, inv) => sum + (Number(inv.total) || 0), 0);

  // Total Expenses
  const totalExpenses = expenses.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);

  // Reset to initial demo data
  const resetDemoData = () => {
    setProfile(initialFreelancerProfile);
    setClients(initialClients);
    setProjects(initialProjects);
    setInvoices(initialInvoices);
    setExpenses(initialExpenses);
    setNotifications(initialNotifications);
    localStorage.clear();
  };

  return (
    <DataContext.Provider value={{
      profile,
      updateProfile,
      clients,
      addClient,
      updateClient,
      deleteClient,
      projects,
      addProject,
      sendProjectRequest,
      acceptProjectRequest,
      rejectProjectRequest,
      markProjectCompleted,
      invoices,
      createInvoice,
      updateInvoiceStatus,
      recordPayment,
      expenses,
      addExpense,
      deleteExpense,
      notifications,
      addNotification,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      // Aggregated Metrics
      totalClientsCount,
      totalProjectsCount,
      completedProjectsCount,
      totalRevenue,
      pendingPayments,
      totalExpenses,
      currency: profile.currency || '₹',
      resetDemoData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
