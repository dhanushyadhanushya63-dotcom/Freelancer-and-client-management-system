import React, { useState } from 'react';
import { 
  FileText, Users, DollarSign, ArrowRight, CheckCircle2, 
  ShieldCheck, BarChart3, Clock, Sparkles, Send, Mail, Phone, MapPin, 
  Briefcase, Lock, UserCheck, Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/common/Modal';

export default function HomeView({ onNavigateLogin }) {
  const { register, switchRole } = useAuth();

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Freelancer'); // 'Freelancer' or 'Client'
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Freelancer registration fields
  const [freelancerData, setFreelancerData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    skills: 'Web & Mobile Development',
    hourlyRate: 1500
  });

  // Client registration fields
  const [clientData, setClientData] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
    phone: ''
  });

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleFreelancerSubmit = (e) => {
    e.preventDefault();
    register(freelancerData, 'Freelancer');
    setRegisterSuccess(true);
  };

  const handleClientSubmit = (e) => {
    e.preventDefault();
    register(clientData, 'Client');
    setRegisterSuccess(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* 1. Public Top Navigation */}
      <nav className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-700 text-white font-black flex items-center justify-center text-xl shadow-md shadow-indigo-500/20">
              ₹
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                Freelance<span className="text-indigo-600">Flow</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                Invoice & CRM
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition">Features</a>
            <a href="#workflow" className="hover:text-indigo-600 transition">How it Works</a>
            <a href="#about" className="hover:text-indigo-600 transition">About</a>
            <a href="#contact" className="hover:text-indigo-600 transition">Contact</a>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onNavigateLogin}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 transition"
            >
              Log In
            </button>
            <button
              onClick={() => {
                setRegisterSuccess(false);
                setIsRegisterOpen(true);
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-600/20 transition hover:scale-102 active:scale-98"
            >
              Register Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-bold mb-6 border border-indigo-200">
            <Sparkles className="w-3.5 h-3.5" />
            Designed strictly as per System Flowchart
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Seamless Invoicing & Client Management for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Modern Freelancers</span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From client proposals and project milestones to professional INR (₹) invoices, instant payment tracking, and automated profit analytics.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => {
                setSelectedRole('Freelancer');
                setRegisterSuccess(false);
                setIsRegisterOpen(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition"
            >
              Get Started as Freelancer <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setSelectedRole('Client');
                setRegisterSuccess(false);
                setIsRegisterOpen(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 shadow-xs transition"
            >
              Hire & Pay as Client
            </button>
          </div>

          {/* 1-Click Interactive Demo Portals */}
          <div className="mt-10 p-4 max-w-xl mx-auto rounded-2xl bg-white/90 border border-slate-200 shadow-md backdrop-blur-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              ⚡ Instant 1-Click Live Test Portals
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={() => switchRole('Freelancer')}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition"
              >
                <Briefcase className="w-4 h-4" /> Enter Freelancer Dashboard
              </button>
              <button
                onClick={() => switchRole('Client')}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold hover:bg-amber-100 transition"
              >
                <Users className="w-4 h-4" /> Enter Client Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase (Flowchart Modules) */}
      <section id="features" className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">Comprehensive Features</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Everything in the Detailed Flowchart</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">Built with all 11 core modules interconnected for both Freelancers and Clients.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
                title: 'Smart Invoice Builder',
                desc: 'Add line items, calculate GST/taxes, apply discounts, and generate clean printable PDFs in INR (₹).'
              },
              {
                icon: Users,
                color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
                title: 'Client CRM & Portal',
                desc: 'Dedicated client dashboard to review project requests, download invoices, and submit manual payments.'
              },
              {
                icon: Clock,
                color: 'text-amber-600 bg-amber-50 border-amber-100',
                title: 'End-to-End Project Workflow',
                desc: 'Client sends request -> Freelancer accepts -> In Progress -> Completed -> Generate Invoice -> Paid.'
              },
              {
                icon: DollarSign,
                color: 'text-sky-600 bg-sky-50 border-sky-100',
                title: 'Payment & Expense Tracker',
                desc: 'Record UPI, NEFT, and Card payments. Track business expenses to maintain real-time profit margins.'
              },
              {
                icon: BarChart3,
                color: 'text-purple-600 bg-purple-50 border-purple-100',
                title: 'Reports & Analytics',
                desc: 'Visual monthly income vs. expenses chart, profit summary, and PDF exportable audit reports.'
              },
              {
                icon: Sparkles,
                color: 'text-rose-600 bg-rose-50 border-rose-100',
                title: 'Interactive Support Chatbot',
                desc: 'Integrated assistant with pre-programmed guides for registration, projects, invoices, and payments.'
              }
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-indigo-200 transition group hover:shadow-md">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${f.color}`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{f.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Workflow Timeline (Module 5 from Flowchart) */}
      <section id="workflow" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">Module 5 Flow</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">How the Workflow Operates</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {[
              { step: '01', title: 'Send Request', desc: 'Client sends project proposal with budget & deadline.' },
              { step: '02', title: 'Accept / Reject', desc: 'Freelancer reviews and accepts to initiate progress.' },
              { step: '03', title: 'Work in Progress', desc: 'Tasks executed and marked as completed.' },
              { step: '04', title: 'Generate Invoice', desc: 'Professional invoice created with itemized totals.' },
              { step: '05', title: 'Payment & Receipt', desc: 'Client pays via UPI/Bank, invoice updated to Paid.' }
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs relative">
                <span className="text-2xl font-black text-indigo-200 font-mono block mb-2">{step.step}</span>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            Built for Freelancers by Freelancers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
            FreelanceFlow is tailored to eliminate the headache of chasing late payments, managing scattered client communications, and calculating quarterly taxes. Everything you need to scale your independent career professionally is right at your fingertips.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 max-w-xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xl font-black text-indigo-600 font-mono">100%</span>
              <p className="text-[11px] text-slate-500 font-medium mt-1">Client Privacy</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xl font-black text-indigo-600 font-mono">₹ INR</span>
              <p className="text-[11px] text-slate-500 font-medium mt-1">Native Currency</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xl font-black text-indigo-600 font-mono">0s</span>
              <p className="text-[11px] text-slate-500 font-medium mt-1">PDF Export</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-1">Get in Touch</span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Contact Us / Support</h2>
            <p className="text-xs text-slate-500 mt-1">Have questions about the system? Send a direct message.</p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            {contactSubmitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-500 mt-1">Thank you. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Ramesh K."
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="ramesh@company.com"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message *</label>
                  <textarea
                    rows="3"
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us what you need help with..."
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-black">₹</span>
            Freelancer Invoice & Client Management System
          </div>
          <p>© 2026 Built as a pure frontend solution. All rights reserved.</p>
        </div>
      </footer>

      {/* Role-Based Registration Modal (Module 1 Flowchart) */}
      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title="Create Your Account"
        subtitle="Select your role to access customized features"
      >
        {registerSuccess ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Account Created Successfully!</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Your {selectedRole} account is ready. Proceed to login with your email and password.
            </p>
            <button
              onClick={() => {
                setIsRegisterOpen(false);
                onNavigateLogin();
              }}
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition"
            >
              Account Created → Go to Login <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            {/* Role Selector Tabs (Freelancer vs Client) */}
            <div className="flex p-1 bg-slate-100 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => setSelectedRole('Freelancer')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  selectedRole === 'Freelancer'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Freelancer Registration
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('Client')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  selectedRole === 'Client'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Client Registration
              </button>
            </div>

            {selectedRole === 'Freelancer' ? (
              /* Freelancer Registration Form */
              <form onSubmit={handleFreelancerSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={freelancerData.name}
                    onChange={(e) => setFreelancerData({ ...freelancerData, name: e.target.value })}
                    placeholder="e.g. Vimalanathan R."
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={freelancerData.email}
                      onChange={(e) => setFreelancerData({ ...freelancerData, email: e.target.value })}
                      placeholder="vimal@freelancer.dev"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
                    <input
                      type="password"
                      required
                      value={freelancerData.password}
                      onChange={(e) => setFreelancerData({ ...freelancerData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Skillset</label>
                    <input
                      type="text"
                      value={freelancerData.skills}
                      onChange={(e) => setFreelancerData({ ...freelancerData, skills: e.target.value })}
                      placeholder="e.g. React, UI/UX, Python"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Hourly Rate (₹)</label>
                    <input
                      type="number"
                      value={freelancerData.hourlyRate}
                      onChange={(e) => setFreelancerData({ ...freelancerData, hourlyRate: e.target.value })}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition shadow-sm"
                >
                  Create Freelancer Account
                </button>
              </form>
            ) : (
              /* Client Registration Form */
              <form onSubmit={handleClientSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Client / Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={clientData.name}
                    onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                    placeholder="e.g. Karthik Subramanian"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Startup Name</label>
                  <input
                    type="text"
                    value={clientData.company}
                    onChange={(e) => setClientData({ ...clientData, company: e.target.value })}
                    placeholder="e.g. TechNova Solutions Pvt Ltd"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={clientData.email}
                      onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                      placeholder="karthik@technova.io"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
                    <input
                      type="password"
                      required
                      value={clientData.password}
                      onChange={(e) => setClientData({ ...clientData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition shadow-sm"
                >
                  Create Client Account
                </button>
              </form>
            )}

            <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
              Already have an account?{' '}
              <button
                onClick={() => {
                  setIsRegisterOpen(false);
                  onNavigateLogin();
                }}
                className="text-indigo-600 font-bold hover:underline"
              >
                Log in here
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
