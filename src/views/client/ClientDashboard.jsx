import React, { useState } from 'react';
import { 
  FolderKanban, FileText, IndianRupee, CheckCircle2, 
  Clock, Plus, Search, Eye, CreditCard, ShieldCheck, 
  Send, User, Briefcase, Bell, LogOut, Sparkles, MapPin, Phone, Mail
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import InvoiceTemplate from '../../components/invoice/InvoiceTemplate';
import PaymentModal from '../../components/invoice/PaymentModal';
import ProjectRequestModal from '../../components/projects/ProjectRequestModal';
import NotificationDrawer from '../../components/notifications/NotificationDrawer';

export default function ClientDashboard({ onLogout }) {
  const { currentUser, switchRole } = useAuth();
  const { 
    projects, sendProjectRequest, 
    invoices, recordPayment, 
    profile, notifications 
  } = useData();

  // Active view tab
  const [activeTab, setActiveTab] = useState('overview'); // overview, request, invoices, payments, freelancer

  // Modals
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState(null);
  const [viewingInvoice, setViewingInvoice] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Client's specific records
  const myProjects = projects.filter(p => 
    p.clientName?.toLowerCase().includes('technova') || 
    p.clientId === 'cli-1' || 
    p.clientName === currentUser?.name ||
    p.clientName === currentUser?.company
  );

  const myInvoices = invoices.filter(i => 
    i.clientName?.toLowerCase().includes('technova') || 
    i.clientId === 'cli-1' || 
    i.clientName === currentUser?.name
  );

  const pendingPaymentsAmount = myInvoices
    .filter(i => i.status === 'Pending' || i.status === 'Overdue')
    .reduce((sum, i) => sum + (Number(i.total) || 0), 0);

  const activeProjectsCount = myProjects.filter(p => p.status === 'In Progress' || p.status === 'Requested').length;

  // Handle send project request
  const handleSendRequest = (data) => {
    sendProjectRequest(data);
    setIsRequestModalOpen(false);
  };

  // Handle client payment confirmation
  const handleConfirmPayment = (invoiceId, paymentDetails) => {
    recordPayment(invoiceId, paymentDetails);
    setIsPaymentModalOpen(false);
    setSelectedInvoiceForPayment(null);
    if (viewingInvoice && viewingInvoice.id === invoiceId) {
      setViewingInvoice(prev => ({ 
        ...prev, 
        status: 'Paid', 
        paymentDate: paymentDetails.date, 
        paymentMethod: paymentDetails.method 
      }));
    }
  };

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const TK = { bg:'#09090B', surface:'#18181B', sur2:'#1F1F23', border:'#27272A', text:'#FFFFFF', muted:'#A1A1AA', accent:'#22C55E', accentH:'#16A34A' };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: TK.bg }}>
      {/* Top Navbar — dark surface */}
      <header className="sticky top-0 z-30 border-b" style={{ background: TK.surface, borderColor: TK.border, fontFamily:"'Space Grotesk',sans-serif" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="logo-mark animate-glow">₹</div>
            <div>
              <div className="flex items-center gap-2">
                <span style={{ fontFamily:"'Playfair Display',serif" }} className="font-black text-base">
                  <span style={{ color: TK.text }}>Freelance</span><span style={{ color: TK.accent }}>IO</span>
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                  style={{ background:'rgba(34,197,94,0.12)', color: TK.accent, border:'1px solid rgba(34,197,94,0.3)' }}>
                  Client Portal
                </span>
              </div>
              <p className="text-[11px] hidden sm:block" style={{ color: TK.muted }}>Logged in as {currentUser?.name || 'TechNova Solutions'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Switch to Freelancer — Ember Orange */}
            <button onClick={() => switchRole('Freelancer')}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-lg transition"
              style={{ background: TK.accent, color:'#09090B', border:`1px solid ${TK.accentH}`, boxShadow:'0 2px 8px rgba(34,197,94,0.3)', fontFamily:"'Space Grotesk',sans-serif" }}
              onMouseOver={e => { e.currentTarget.style.background=TK.accentH; e.currentTarget.style.boxShadow='0 4px 16px rgba(34,197,94,0.4)'; }}
              onMouseOut={e => { e.currentTarget.style.background=TK.accent; e.currentTarget.style.boxShadow='0 2px 8px rgba(34,197,94,0.3)'; }}>
              Switch to Freelancer ⇄
            </button>

            {/* Notification Bell */}
            <button onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2 rounded-xl transition" style={{ color: TK.muted }}
              onMouseOver={e => { e.currentTarget.style.background=TK.sur2; e.currentTarget.style.color=TK.text; }}
              onMouseOut={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color=TK.muted; }}
              aria-label="Notifications">
              <Bell className="w-5 h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 text-[10px] font-black flex items-center justify-center rounded-full"
                  style={{ background: TK.accent, color:'#09090B' }}>{unreadNotifCount}</span>
              )}
            </button>

            {/* Logout */}
            <button onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-black rounded-xl transition"
              style={{ color: TK.muted }}
              onMouseOver={e => { e.currentTarget.style.color='#F87171'; e.currentTarget.style.background='rgba(248,113,113,0.1)'; }}
              onMouseOut={e => { e.currentTarget.style.color=TK.muted; e.currentTarget.style.background='transparent'; }}>
              <LogOut className="w-4 h-4" /><span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Client Nav Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none py-2 border-t" style={{ borderColor:'rgba(255,255,255,0.05)' }}>
          {[
            { id:'overview',   label:'Overview',           icon:FolderKanban },
            { id:'projects',   label:`Projects (${myProjects.length})`, icon:Briefcase },
            { id:'invoices',   label:`Invoices (${myInvoices.length})`, icon:FileText },
            { id:'payments',   label:'Payments',           icon:ShieldCheck },
            { id:'freelancer', label:'Find Freelancer',    icon:User },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-black rounded-lg transition whitespace-nowrap"
                style={{
                  background: isActive ? TK.accent : 'transparent',
                  color: isActive ? '#09090B' : TK.muted,
                  boxShadow: isActive ? '0 4px 12px rgba(34,197,94,0.25)' : 'none',
                  fontFamily:"'Space Grotesk',sans-serif"
                }}
                onMouseOver={e => { if (!isActive) { e.currentTarget.style.background=TK.sur2; e.currentTarget.style.color=TK.text; } }}
                onMouseOut={e => { if (!isActive) { e.currentTarget.style.background='transparent'; e.currentTarget.style.color=TK.muted; } }}>
                <Icon className="w-3.5 h-3.5" />{tab.label}
              </button>
            );
          })}
        </div>
      </header>



      {/* Main Content — dark bg */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Banner — dark surface + ember glow */}
            <div className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
              style={{ background: TK.surface, border:`1px solid ${TK.border}`, boxShadow:`0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px ${TK.border}` }}>
              <div className="absolute top-0 right-0 w-72 h-full opacity-15 pointer-events-none"
                style={{ background:`radial-gradient(ellipse at 80% 50%,${TK.accent},transparent)`, filter:'blur(50px)' }} />
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full mb-3"
                  style={{ background:'rgba(34,197,94,0.12)', color: TK.accent, border:'1px solid rgba(34,197,94,0.3)', fontFamily:"'Space Grotesk',sans-serif" }}>
                  Client Dashboard
                </span>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight"
                  style={{ color: TK.text, fontFamily:"'Playfair Display',serif" }}>
                  Welcome, {currentUser?.name || 'TechNova Solutions'}!
                </h1>
                <p className="text-sm mt-1 leading-relaxed font-semibold"
                  style={{ color: TK.muted, fontFamily:"'Space Grotesk',sans-serif" }}>
                  Track projects, review milestones, and clear pending invoices.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button onClick={() => setIsRequestModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black rounded-xl transition"
                    style={{ background: TK.accent, color:'#09090B', border:`1px solid #16A34A`, boxShadow:'0 4px 16px rgba(34,197,94,0.3)', fontFamily:"'Space Grotesk',sans-serif" }}
                    onMouseOver={e => { e.currentTarget.style.background='#16A34A'; e.currentTarget.style.boxShadow='0 8px 24px rgba(34,197,94,0.4)'; }}
                    onMouseOut={e => { e.currentTarget.style.background=TK.accent; e.currentTarget.style.boxShadow='0 4px 16px rgba(34,197,94,0.3)'; }}>
                    <Send className="w-4 h-4" /> Send Project Request
                  </button>
                  <button onClick={() => setActiveTab('invoices')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black rounded-xl transition"
                    style={{ background:'transparent', color: TK.text, border:`1px solid ${TK.border}`, fontFamily:"'Space Grotesk',sans-serif" }}
                    onMouseOver={e => e.currentTarget.style.borderColor=TK.accent}
                    onMouseOut={e => e.currentTarget.style.borderColor=TK.border}>
                    <FileText className="w-4 h-4" /> View My Invoices
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Client Stat Cards */}
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest mb-3"
                style={{ color:'#6B6560', fontFamily:"'Space Grotesk',sans-serif" }}>
                Dashboard Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. My Projects */}
                <StatCard
                  title="My Projects"
                  value={myProjects.length}
                  icon={FolderKanban}
                  color="sky"
                  subtitle={`${activeProjectsCount} currently active`}
                />

                {/* 2. My Invoices */}
                <StatCard
                  title="My Invoices"
                  value={myInvoices.length}
                  icon={FileText}
                  color="indigo"
                  subtitle={`${myInvoices.filter(i => i.status === 'Paid').length} paid in full`}
                />

                {/* 3. Pending Payments */}
                <StatCard
                  title="Pending Payments"
                  value={`₹${pendingPaymentsAmount.toLocaleString('en-IN')}`}
                  icon={Clock}
                  color="rose"
                  subtitle={`${myInvoices.filter(i => i.status !== 'Paid').length} invoices due`}
                />

                {/* 4. Project Status */}
                <StatCard
                  title="Project Status"
                  value={`${myProjects.filter(p => p.status === 'Completed').length} Delivered`}
                  icon={CheckCircle2}
                  color="emerald"
                  subtitle={`${myProjects.filter(p => p.status === 'In Progress').length} in progress`}
                />
              </div>
            </div>

            {/* Invoices Requiring Payment */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Invoices Awaiting Payment</h3>
                  <p className="text-xs text-slate-500">Pay via UPI, Bank Transfer or Card</p>
                </div>
                <button
                  onClick={() => setActiveTab('invoices')}
                  className="text-xs font-semibold text-amber-800 hover:text-amber-900"
                >
                  View All Invoices →
                </button>
              </div>

              <div className="space-y-3">
                {myInvoices.filter(i => i.status !== 'Paid').length === 0 ? (
                  <div className="text-center py-6 text-slate-400 text-xs">
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-1 text-emerald-500" />
                    All invoices are cleared! No pending dues.
                  </div>
                ) : (
                  myInvoices.filter(i => i.status !== 'Paid').map(inv => (
                    <div key={inv.id} className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-900">{inv.invoiceNumber}</span>
                          <Badge status={inv.status} size="xs" />
                        </div>
                        <p className="text-xs font-medium text-slate-800 mt-1">{inv.projectTitle}</p>
                        <p className="text-[11px] text-slate-500">Due by: {inv.dueDate}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-base font-black text-slate-900">
                          ₹{Number(inv.total).toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => setViewingInvoice(inv)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
                        >
                          View PDF
                        </button>
                        <button
                          onClick={() => {
                            setSelectedInvoiceForPayment(inv);
                            setIsPaymentModalOpen(true);
                          }}
                          className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition"
                        >
                          Pay Now
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: MY PROJECTS */}
        {/* ========================================================= */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Projects</h2>
                <p className="text-xs text-slate-500 mt-0.5">Track deliverables, progress, and proposal status</p>
              </div>
              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs transition"
              >
                <Send className="w-4 h-4" /> Send New Project Request
              </button>
            </div>

            <div className="space-y-4">
              {myProjects.map(project => (
                <div key={project.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Badge status={project.status} />
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-amber-700 font-semibold">{project.category}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{project.title}</h3>
                      <p className="text-xs text-slate-600 mt-1">{project.description}</p>

                      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                        <span>Deadline: <strong className="text-slate-800">{project.deadline}</strong></span>
                        <span>Budget: <strong className="text-amber-800 font-mono font-bold">₹{Number(project.budget).toLocaleString('en-IN')}</strong></span>
                      </div>
                    </div>

                    <div className="text-right">
                      {project.status === 'Completed' && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Project Finished
                        </span>
                      )}
                      {project.status === 'In Progress' && (
                        <span className="text-xs text-amber-700 font-bold">
                          In Active Development
                        </span>
                      )}
                      {project.status === 'Requested' && (
                        <span className="text-xs text-sky-700 font-bold">
                          Pending Freelancer Review
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: INVOICES (Flowchart Module 4: View Invoices & Make Payment) */}
        {/* ========================================================= */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Invoices & Billing</h2>
              <p className="text-xs text-slate-500 mt-0.5">Inspect itemized invoices and execute payments</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Invoice #</th>
                      <th className="py-3.5 px-4">Project</th>
                      <th className="py-3.5 px-4">Due Date</th>
                      <th className="py-3.5 px-4">Total</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {myInvoices.map(inv => (
                      <tr key={inv.id} className="hover:bg-slate-50 transition">
                        <td className="py-4 px-4 font-mono font-bold text-amber-800">{inv.invoiceNumber}</td>
                        <td className="py-4 px-4 font-semibold text-slate-900">{inv.projectTitle}</td>
                        <td className="py-4 px-4 text-slate-500">{inv.dueDate}</td>
                        <td className="py-4 px-4 font-mono font-bold text-slate-900">
                          ₹{Number(inv.total).toLocaleString('en-IN')}
                        </td>
                        <td className="py-4 px-4">
                          <Badge status={inv.status} />
                        </td>
                        <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => setViewingInvoice(inv)}
                            className="p-1.5 text-slate-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition"
                            title="View / Download PDF"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {inv.status !== 'Paid' && (
                            <button
                              onClick={() => {
                                setSelectedInvoiceForPayment(inv);
                                setIsPaymentModalOpen(true);
                              }}
                              className="px-3 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-xs"
                            >
                              Make Payment
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
        {/* TAB 4: PAYMENT HISTORY */}
        {/* ========================================================= */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Payment Receipts & History</h2>
              <p className="text-xs text-slate-500 mt-0.5">Historical records of paid invoices and UTR reference IDs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myInvoices.filter(i => i.status === 'Paid').map(paid => (
                <div key={paid.id} className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-xs text-emerald-800">{paid.invoiceNumber}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">Paid</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{paid.projectTitle}</h4>
                    <p className="text-xs text-slate-500 mt-1">Paid on: {paid.paymentDate}</p>
                    <p className="text-xs text-slate-400">Method: {paid.paymentMethod || 'Online'}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-emerald-700 font-mono">
                      ₹{Number(paid.total).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => setViewingInvoice(paid)}
                      className="block text-xs font-semibold text-amber-800 hover:underline mt-2 ml-auto"
                    >
                      Receipt PDF →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: FIND FREELANCER (Flowchart Module 4: Find Freelancer) */}
        {/* ========================================================= */}
        {activeTab === 'freelancer' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Freelancer Profile & Services</h2>
              <p className="text-xs text-slate-500 mt-0.5">View freelancer credentials, verified skills, and direct contact</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-100">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-100 shadow-sm"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900">{profile.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Available</span>
                  </div>
                  <p className="text-xs font-semibold text-indigo-600 mt-0.5">{profile.title}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {profile.location}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Rate</span>
                  <span className="text-lg font-black text-slate-900 font-mono">₹{profile.hourlyRate} / hr</span>
                </div>
              </div>

              <div className="py-6 space-y-4 text-xs text-slate-600 leading-relaxed border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">About</h4>
                <p>{profile.bio}</p>

                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider pt-2">Expertise & Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills?.map((s, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-medium text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-500 space-y-1">
                  <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {profile.email}</p>
                  <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {profile.phone}</p>
                </div>

                <button
                  onClick={() => setIsRequestModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  <Send className="w-4 h-4" /> Send Project Proposal
                </button>
              </div>
            </div>
          </div>
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
          isClientView={true}
          onRecordPayment={(inv) => {
            setViewingInvoice(null);
            setSelectedInvoiceForPayment(inv);
            setIsPaymentModalOpen(true);
          }}
        />
      </Modal>

      {/* Make Payment Modal (Module 6 Flowchart) */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="Make Invoice Payment"
        subtitle="Submit your transaction settlement details"
      >
        <PaymentModal
          invoice={selectedInvoiceForPayment}
          isClient={true}
          onConfirmPayment={handleConfirmPayment}
          onCancel={() => setIsPaymentModalOpen(false)}
        />
      </Modal>

      {/* Send Project Request Modal (Module 5 Flowchart) */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        title="Send Project Request"
        subtitle="Submit project scope, deadline, and proposed budget"
      >
        <ProjectRequestModal
          onSave={handleSendRequest}
          onCancel={() => setIsRequestModalOpen(false)}
        />
      </Modal>

      {/* Notification Drawer (Module 8 Flowchart) */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}
