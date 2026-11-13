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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white font-black flex items-center justify-center text-lg shadow-sm">
              C
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-base">
                  FreelanceFlow
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  Client Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Logged in as {currentUser?.name || 'TechNova Solutions'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Switch to Freelancer Mode for Testing */}
            <button
              onClick={() => switchRole('Freelancer')}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition"
              title="Switch to Freelancer Portal"
            >
              Switch to Freelancer Mode ⇄
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

            {/* Logout (Module 11) */}
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

        {/* Client Navigation Tabs (Flowchart Module 4: Client Actions) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: FolderKanban },
            { id: 'projects', label: `My Projects (${myProjects.length})`, icon: Briefcase },
            { id: 'invoices', label: `View Invoices (${myInvoices.length})`, icon: FileText },
            { id: 'payments', label: 'Payment History', icon: ShieldCheck },
            { id: 'freelancer', label: 'Find / View Freelancer', icon: User },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-xs'
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
        {/* TAB 1: CLIENT OVERVIEW (Flowchart Module 4 Overview) */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Top Welcome Action Banner */}
            <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 text-amber-100 mb-2">
                  Client Dashboard
                </span>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Welcome, {currentUser?.name || 'TechNova Solutions'}!
                </h1>
                <p className="text-xs sm:text-sm text-amber-100 mt-1 leading-relaxed">
                  Track ongoing projects, review delivered milestones, and safely clear pending invoices.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsRequestModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-amber-900 rounded-xl text-xs font-bold hover:bg-amber-50 shadow-xs transition"
                  >
                    <Send className="w-4 h-4" /> Send New Project Request
                  </button>
                  <button
                    onClick={() => setActiveTab('invoices')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500/30 hover:bg-amber-500/40 text-white border border-white/20 rounded-xl text-xs font-bold transition"
                  >
                    <FileText className="w-4 h-4" /> View My Invoices
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Exact Client Overview Cards (Flowchart Module 4) */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Dashboard Overview (4 Client Metrics)
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
