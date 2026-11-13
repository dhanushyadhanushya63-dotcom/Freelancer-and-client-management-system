import React, { useState } from 'react';
import { 
  Users, FolderKanban, IndianRupee, CheckCircle2, Clock, 
  Receipt, Plus, Search, Filter, Eye, Trash2, Edit3, 
  Send, ShieldCheck, Download, AlertTriangle, ArrowUpRight, 
  Sparkles, Bell, LogOut, Settings, BarChart2, Briefcase, FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import InvoiceTemplate from '../../components/invoice/InvoiceTemplate';
import InvoiceBuilder from '../../components/invoice/InvoiceBuilder';
import PaymentModal from '../../components/invoice/PaymentModal';
import ClientModal from '../../components/clients/ClientModal';
import ExpenseModal from '../../components/expenses/ExpenseModal';
import NotificationDrawer from '../../components/notifications/NotificationDrawer';
import ReportsAnalytics from './ReportsAnalytics';
import ProfileSettingsView from '../settings/ProfileSettingsView';

export default function FreelancerDashboard({ onLogout }) {
  const { currentUser, switchRole } = useAuth();
  const { 
    clients, addClient, updateClient, deleteClient,
    projects, addProject, acceptProjectRequest, rejectProjectRequest, markProjectCompleted,
    invoices, createInvoice, recordPayment,
    expenses, addExpense, deleteExpense,
    notifications,
    totalClientsCount, totalProjectsCount, completedProjectsCount,
    totalRevenue, pendingPayments, totalExpenses,
    profile
  } = useData();

  // Active module tab
  const [activeTab, setActiveTab] = useState('overview'); // overview, clients, projects, invoices, payments, expenses, reports, settings

  // Modals
  const [isInvoiceBuilderOpen, setIsInvoiceBuilderOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState(null);
  const [viewingInvoice, setViewingInvoice] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Filter/Search states
  const [projectFilter, setProjectFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle invoice creation from builder
  const handleSaveInvoice = (invoiceData) => {
    createInvoice(invoiceData);
    setIsInvoiceBuilderOpen(false);
  };

  // Handle manual payment confirm
  const handleConfirmPayment = (invoiceId, paymentDetails) => {
    recordPayment(invoiceId, paymentDetails);
    setIsPaymentModalOpen(false);
    setSelectedInvoiceForPayment(null);
    if (viewingInvoice && viewingInvoice.id === invoiceId) {
      setViewingInvoice(prev => ({ ...prev, status: 'Paid', paymentDate: paymentDetails.date, paymentMethod: paymentDetails.method }));
    }
  };

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-lg shadow-sm">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-base">
                  FreelanceFlow
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Freelancer Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Logged in as {profile.name}</p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Quick Switch to Client Mode for Testing */}
            <button
              onClick={() => switchRole('Client')}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition"
              title="Quickly switch to Client Portal to test workflow"
            >
              Switch to Client Mode ⇄
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* Logout (Module 11: Logout Flow) */}
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition"
              title="Logout and return to Home Page"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Management Module Tabs (Flowchart Module 3: Management Modules) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart2 },
            { id: 'clients', label: `Clients (${clients.length})`, icon: Users },
            { id: 'projects', label: `Projects (${projects.length})`, icon: FolderKanban },
            { id: 'invoices', label: `Invoices (${invoices.length})`, icon: FileText },
            { id: 'payments', label: 'Payments', icon: ShieldCheck },
            { id: 'expenses', label: `Expenses (${expenses.length})`, icon: Receipt },
            { id: 'reports', label: 'Reports & Analytics', icon: BarChart2 },
            { id: 'settings', label: 'Profile & Settings', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW & 6 STAT CARDS (Flowchart Module 3) */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Top Welcome Banner */}
            <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 text-indigo-100 mb-2">
                  Freelancer Command Center
                </span>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Welcome back, {profile.name}! 👋
                </h1>
                <p className="text-xs sm:text-sm text-indigo-100 mt-1 leading-relaxed">
                  You have <span className="font-bold underline text-white">₹{pendingPayments.toLocaleString('en-IN')}</span> in pending payments and {projects.filter(p => p.status === 'Requested').length} new client requests awaiting approval.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsInvoiceBuilderOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-indigo-700 rounded-xl text-xs font-bold hover:bg-indigo-50 shadow-xs transition"
                  >
                    <Plus className="w-4 h-4" /> Create New Invoice
                  </button>
                  <button
                    onClick={() => setIsClientModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-500/30 hover:bg-indigo-500/40 text-white border border-white/20 rounded-xl text-xs font-bold transition"
                  >
                    <Users className="w-4 h-4" /> Add New Client
                  </button>
                </div>
              </div>
            </div>

            {/* Flowchart 6 Exact Overview Metric Cards */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Dashboard Overview (6 Core Metrics)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
                {/* 1. Total Clients */}
                <StatCard
                  title="Total Clients"
                  value={totalClientsCount}
                  icon={Users}
                  color="sky"
                  subtitle={`${clients.filter(c => c.status === 'Active').length} Active Accounts`}
                />

                {/* 2. Total Projects */}
                <StatCard
                  title="Total Projects"
                  value={totalProjectsCount}
                  icon={FolderKanban}
                  color="indigo"
                  subtitle={`${projects.filter(p => p.status === 'In Progress').length} in progress`}
                />

                {/* 3. Total Revenue (₹) */}
                <StatCard
                  title="Total Revenue"
                  value={`₹${totalRevenue.toLocaleString('en-IN')}`}
                  icon={IndianRupee}
                  color="emerald"
                  trend="+18%"
                />

                {/* 4. Completed Projects */}
                <StatCard
                  title="Completed Projects"
                  value={completedProjectsCount}
                  icon={CheckCircle2}
                  color="purple"
                  subtitle="Delivered successfully"
                />

                {/* 5. Pending Payments */}
                <StatCard
                  title="Pending Payments"
                  value={`₹${pendingPayments.toLocaleString('en-IN')}`}
                  icon={Clock}
                  color="amber"
                  subtitle={`${invoices.filter(i => i.status === 'Pending').length} unpaid invoices`}
                />

                {/* 6. Total Expenses */}
                <StatCard
                  title="Total Expenses"
                  value={`₹${totalExpenses.toLocaleString('en-IN')}`}
                  icon={Receipt}
                  color="rose"
                  subtitle={`${expenses.length} logged costs`}
                />
              </div>
            </div>

            {/* Quick Activity & Requests Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Client Requests (Module 5 Workflow trigger) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" /> Client Project Requests
                  </h3>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    View All Projects →
                  </button>
                </div>

                <div className="space-y-3">
                  {projects.filter(p => p.status === 'Requested').length === 0 ? (
                    <p className="text-xs text-slate-400 py-6 text-center">No pending client requests right now.</p>
                  ) : (
                    projects.filter(p => p.status === 'Requested').map(req => (
                      <div key={req.id} className="p-4 rounded-xl border border-sky-100 bg-sky-50/40">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                              New Proposal
                            </span>
                            <h4 className="text-xs font-bold text-slate-900 mt-1">{req.title}</h4>
                            <p className="text-[11px] text-slate-500 mt-0.5">From: {req.clientName} • Budget: ₹{Number(req.budget).toLocaleString('en-IN')}</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => acceptProjectRequest(req.id)}
                              className="px-2.5 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => rejectProjectRequest(req.id)}
                              className="px-2.5 py-1 text-xs font-bold text-rose-700 bg-rose-100 hover:bg-rose-200 rounded-lg transition"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Recent Unpaid Invoices */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" /> Unpaid & Overdue Invoices
                  </h3>
                  <button
                    onClick={() => setActiveTab('invoices')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    All Invoices →
                  </button>
                </div>

                <div className="space-y-2.5">
                  {invoices.filter(i => i.status !== 'Paid').map(inv => (
                    <div key={inv.id} className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-white flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-900">{inv.invoiceNumber}</span>
                          <Badge status={inv.status} size="xs" />
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{inv.clientName} • Due: {inv.dueDate}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-indigo-700">
                          ₹{Number(inv.total).toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedInvoiceForPayment(inv);
                            setIsPaymentModalOpen(true);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                        >
                          Record Paid
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: CLIENTS MANAGEMENT (Add, Edit, View, Delete) */}
        {/* ========================================================= */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Clients Directory</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage your client relationships, billing history, and contacts</p>
              </div>
              <button
                onClick={() => setIsClientModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition"
              >
                <Plus className="w-4 h-4" /> Add New Client
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {clients.map(c => (
                <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-xl object-cover border border-slate-100" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{c.name}</h4>
                        <p className="text-xs text-slate-500">{c.company}</p>
                      </div>
                    </div>
                    <Badge status={c.status} size="xs" />
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 py-3 border-y border-slate-100 mb-4">
                    <p className="truncate"><span className="text-slate-400">Email:</span> {c.email}</p>
                    <p className="truncate"><span className="text-slate-400">Phone:</span> {c.phone || 'N/A'}</p>
                    <p className="truncate"><span className="text-slate-400">Address:</span> {c.address || 'N/A'}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Billed</span>
                      <span className="font-mono font-bold text-slate-900">₹{Number(c.totalBilled || 0).toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setIsInvoiceBuilderOpen(true);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"
                      >
                        Bill Client
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove ${c.name}?`)) deleteClient(c.id);
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                        title="Delete client"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PROJECTS MODULE (Module 5 Workflow) */}
        {/* ========================================================= */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Projects Management & Workflow</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Flow: Request → Accept/Reject → Work in Progress → Mark Completed → Generate Invoice
                </p>
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                {['All', 'Requested', 'In Progress', 'Completed'].map(f => (
                  <button
                    key={f}
                    onClick={() => setProjectFilter(f)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                      projectFilter === f
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {projects
                .filter(p => projectFilter === 'All' || p.status === projectFilter)
                .map(project => (
                  <div key={project.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-200 transition">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <Badge status={project.status} />
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-indigo-600 font-semibold">{project.category}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 truncate">{project.title}</h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{project.description}</p>

                        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
                          <span>Client: <strong className="text-slate-700">{project.clientName}</strong></span>
                          <span>Deadline: <strong className="text-slate-700">{project.deadline}</strong></span>
                          <span>Budget: <strong className="text-indigo-700 font-mono font-bold">₹{Number(project.budget).toLocaleString('en-IN')}</strong></span>
                        </div>
                      </div>

                      {/* Workflow Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {project.status === 'Requested' && (
                          <>
                            <button
                              onClick={() => acceptProjectRequest(project.id)}
                              className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-xs"
                            >
                              Accept Project
                            </button>
                            <button
                              onClick={() => rejectProjectRequest(project.id)}
                              className="px-3.5 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {project.status === 'In Progress' && (
                          <button
                            onClick={() => markProjectCompleted(project.id)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-xs"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Mark as Completed
                          </button>
                        )}

                        {project.status === 'Completed' && (
                          <button
                            onClick={() => setIsInvoiceBuilderOpen(true)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-xs"
                          >
                            <Plus className="w-4 h-4" /> Generate Invoice
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: INVOICES MODULE (Module 6 Flow) */}
        {/* ========================================================= */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Invoice Generator & Tracker</h2>
                <p className="text-xs text-slate-500 mt-0.5">Create line-item invoices, download PDFs, and record client settlements</p>
              </div>
              <button
                onClick={() => setIsInvoiceBuilderOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition"
              >
                <Plus className="w-4 h-4" /> Create New Invoice
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Invoice #</th>
                      <th className="py-3.5 px-4">Client</th>
                      <th className="py-3.5 px-4">Project</th>
                      <th className="py-3.5 px-4">Issue / Due Date</th>
                      <th className="py-3.5 px-4">Total Amount</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {invoices.map(inv => (
                      <tr key={inv.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-4 px-4 font-mono font-bold text-indigo-700">{inv.invoiceNumber}</td>
                        <td className="py-4 px-4 font-semibold text-slate-900">{inv.clientName}</td>
                        <td className="py-4 px-4 text-slate-600 truncate max-w-[180px]">{inv.projectTitle}</td>
                        <td className="py-4 px-4 text-slate-500">{inv.issueDate} / {inv.dueDate}</td>
                        <td className="py-4 px-4 font-mono font-bold text-slate-900">
                          ₹{Number(inv.total).toLocaleString('en-IN')}
                        </td>
                        <td className="py-4 px-4">
                          <Badge status={inv.status} />
                        </td>
                        <td className="py-4 px-4 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => setViewingInvoice(inv)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                            title="View / Print PDF"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {inv.status !== 'Paid' && (
                            <button
                              onClick={() => {
                                setSelectedInvoiceForPayment(inv);
                                setIsPaymentModalOpen(true);
                              }}
                              className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                            >
                              Record Payment
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: PAYMENTS MODULE (Manual Entry & Settlement) */}
        {/* ========================================================= */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Payments Log & Settlements</h2>
              <p className="text-xs text-slate-500 mt-0.5">Recorded UPI, NEFT, and online transactions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {invoices.filter(i => i.status === 'Paid').map(paid => (
                <div key={paid.id} className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-xs text-emerald-800">{paid.invoiceNumber}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">Settled</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{paid.clientName}</h4>
                    <p className="text-xs text-slate-500 mt-1">Method: {paid.paymentMethod || 'UPI / Bank Transfer'}</p>
                    <p className="text-xs text-slate-400">Date: {paid.paymentDate}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-emerald-700 font-mono">
                      ₹{Number(paid.total).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => setViewingInvoice(paid)}
                      className="block text-xs font-semibold text-indigo-600 hover:underline mt-2 ml-auto"
                    >
                      View Receipt →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: EXPENSES MODULE */}
        {/* ========================================================= */}
        {activeTab === 'expenses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Business Expenses</h2>
                <p className="text-xs text-slate-500 mt-0.5">Track tools, servers, equipment, and office costs for net profit reporting</p>
              </div>
              <button
                onClick={() => setIsExpenseModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition"
              >
                <Plus className="w-4 h-4" /> Add Expense
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Expense Title</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Amount</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {expenses.map(exp => (
                      <tr key={exp.id} className="hover:bg-slate-50 transition">
                        <td className="py-3.5 px-4 font-semibold text-slate-900">{exp.title}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium text-[11px]">
                            {exp.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">{exp.date}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-rose-600">
                          ₹{Number(exp.amount).toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => deleteExpense(exp.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: REPORTS & ANALYTICS (Module 7 Flow) */}
        {/* ========================================================= */}
        {activeTab === 'reports' && (
          <ReportsAnalytics />
        )}

        {/* ========================================================= */}
        {/* TAB 8: PROFILE & SETTINGS (Module 10 Flow) */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <ProfileSettingsView />
        )}
      </main>

      {/* Invoice Viewer Modal */}
      <Modal
        isOpen={Boolean(viewingInvoice)}
        onClose={() => setViewingInvoice(null)}
        title="Invoice Details"
        subtitle={viewingInvoice?.invoiceNumber}
        maxWidth="max-w-4xl"
      >
        <InvoiceTemplate
          invoice={viewingInvoice}
          onRecordPayment={(inv) => {
            setViewingInvoice(null);
            setSelectedInvoiceForPayment(inv);
            setIsPaymentModalOpen(true);
          }}
        />
      </Modal>

      {/* Invoice Creator Builder Modal */}
      <Modal
        isOpen={isInvoiceBuilderOpen}
        onClose={() => setIsInvoiceBuilderOpen(false)}
        title="Create New Invoice"
        subtitle="Add line items, calculate taxes & generate client-ready invoice"
        maxWidth="max-w-3xl"
      >
        <InvoiceBuilder
          onSave={handleSaveInvoice}
          onCancel={() => setIsInvoiceBuilderOpen(false)}
        />
      </Modal>

      {/* Add Client Modal */}
      <Modal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        title="Add New Client Profile"
        subtitle="Save client contact information and billing address"
      >
        <ClientModal
          onSave={(data) => {
            addClient(data);
            setIsClientModalOpen(false);
          }}
          onCancel={() => setIsClientModalOpen(false)}
        />
      </Modal>

      {/* Add Expense Modal */}
      <Modal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        title="Log Business Expense"
        subtitle="Record operational costs for real-time net profit tracking"
      >
        <ExpenseModal
          onSave={(data) => {
            addExpense(data);
            setIsExpenseModalOpen(false);
          }}
          onCancel={() => setIsExpenseModalOpen(false)}
        />
      </Modal>

      {/* Record Payment Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="Record Payment Settlement"
        subtitle="Manual transaction entry for invoice settlement"
      >
        <PaymentModal
          invoice={selectedInvoiceForPayment}
          onConfirmPayment={handleConfirmPayment}
          onCancel={() => setIsPaymentModalOpen(false)}
        />
      </Modal>

      {/* Notification Drawer (Module 8 Flow) */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}
