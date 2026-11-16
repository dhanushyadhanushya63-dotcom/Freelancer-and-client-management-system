import React, { useState, useEffect, useRef } from 'react';
import {
  FileText, Users, DollarSign, ArrowRight, CheckCircle2,
  BarChart3, Clock, Sparkles, Send, Briefcase, ChevronRight,
  Star, Menu, X, Zap, ArrowUpRight, Play
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/common/Modal';

/* ═══ TOKENS ═══ */
const T = {
  bg:      '#09090B',
  surface: '#18181B',
  sur2:    '#1F1F23',
  border:  '#27272A',
  text:    '#FFFFFF',
  muted:   '#A1A1AA',
  accent:  '#22C55E',
  accentH: '#16A34A',
};

/* ═══ HOOKS ═══ */
function useTypewriter(words, speed = 90, pause = 2200) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx % words.length];
    const delay = deleting ? speed / 2 : speed;
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDeleting(false); setWordIdx(i => i + 1); }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, wordIdx, words, speed, pause]);
  return text;
}

function useCounter(target, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let n = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      n += step;
      if (n >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(n));
    }, 16);
    return () => clearInterval(t);
  }, [target, duration, started]);
  return count;
}

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ═══ COMPONENTS ═══ */
function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="logo-mark animate-glow">₹</div>
      <span style={{ fontFamily: "'Playfair Display',serif" }}
        className="font-black text-xl" style2={{ color: T.text }}>
        <span style={{ color: T.text }}>Freelance</span><span style={{ color: T.accent }}>IO</span>
      </span>
    </div>
  );
}

function MagneticBtn({ children, onClick, style, className }) {
  const ref = useRef(null);
  const move = e => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.22;
    const y = (e.clientY - top - height / 2) * 0.22;
    ref.current.style.transform = `translate(${x}px,${y}px)`;
  };
  const leave = () => { ref.current.style.transform = 'translate(0,0)'; };
  return (
    <button ref={ref} onClick={onClick} onMouseMove={move} onMouseLeave={leave}
      style={{ ...style, transition: 'transform 0.2s cubic-bezier(0.23,1,0.32,1), background 0.15s, box-shadow 0.15s' }}
      className={className}>{children}</button>
  );
}

function TrustBar({ items }) {
  return (
    <div className="border-y py-5" style={{ background: T.surface, borderColor: T.border }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-3">
          {items.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition-all duration-200 cursor-default"
              style={{
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
                color: T.muted,
                fontFamily: "'Space Grotesk',sans-serif",
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'rgba(34,197,94,0.18)';
                e.currentTarget.style.borderColor = 'rgba(34,197,94,0.5)';
                e.currentTarget.style.color = T.accent;
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'rgba(34,197,94,0.08)';
                e.currentTarget.style.borderColor = 'rgba(34,197,94,0.2)';
                e.currentTarget.style.color = T.muted;
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: T.accent }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Reveal({ children, delay = 0, direction = 'up' }) {
  const [ref, visible] = useReveal();
  const from = { up: 'translateY(36px)', left: 'translateX(-36px)', right: 'translateX(36px)' }[direction];
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translate(0)' : from,
      transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`
    }}>{children}</div>
  );
}

function CounterCard({ value, suffix, label, started }) {
  const n = useCounter(value, 2000, started);
  return (
    <div className="text-center p-4 rounded-xl" style={{ background: T.sur2, border: `1px solid ${T.border}` }}>
      <p style={{ fontFamily: "'Playfair Display',serif", color: T.text }} className="text-2xl font-black">
        {n.toLocaleString()}{suffix}
      </p>
      <p className="text-xs font-semibold mt-1" style={{ color: T.muted }}>{label}</p>
    </div>
  );
}

/* ═══════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════ */
export default function HomeView({ onNavigateLogin }) {
  const { register, switchRole } = useAuth();
  const [mobileOpen, setMobileOpen]           = useState(false);
  const [isRegisterOpen, setIsRegisterOpen]   = useState(false);
  const [selectedRole, setSelectedRole]       = useState('Freelancer');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [freelancerData, setFreelancerData]   = useState({ name:'', email:'', password:'', skills:'Web & Mobile Dev', hourlyRate:1500 });
  const [clientData, setClientData]           = useState({ name:'', company:'', email:'', password:'' });
  const [contactForm, setContactForm]         = useState({ name:'', email:'', message:'' });
  const [contactDone, setContactDone]         = useState(false);
  const [statsRef, statsVisible]              = useReveal();



  const handleFL  = e => { e.preventDefault(); register(freelancerData, 'Freelancer'); setRegisterSuccess(true); };
  const handleCL  = e => { e.preventDefault(); register(clientData, 'Client');     setRegisterSuccess(true); };
  const handleContact = e => {
    e.preventDefault(); setContactDone(true);
    setTimeout(() => { setContactDone(false); setContactForm({ name:'', email:'', message:'' }); }, 4000);
  };

  const features = [
    { icon: FileText,   title: 'Smart Invoice Builder',    desc: 'GST/taxes, discounts, printable PDFs in INR (₹) — in under 2 minutes.' },
    { icon: Users,      title: 'Client CRM & Portal',      desc: 'Dedicated client view to review invoices, download PDFs, and pay online.' },
    { icon: Clock,      title: 'Project Workflow',          desc: 'Request → Accept → Progress → Done → Invoice → Paid.' },
    { icon: DollarSign, title: 'Payment Tracker',          desc: 'UPI, NEFT, Card. Track expenses for real-time profit margins.' },
    { icon: BarChart3,  title: 'Reports & Analytics',      desc: 'Visual income vs. expenses, profit summary, PDF export reports.' },
    { icon: Sparkles,   title: 'Support Chatbot',          desc: 'Smart assistant for onboarding, projects, invoices & payments.' },
  ];

  const steps = [
    { n:'01', title:'Client Request',  desc:'Client sends proposal with budget & deadline.' },
    { n:'02', title:'Accept / Reject', desc:'Freelancer reviews and kicks off the project.' },
    { n:'03', title:'In Progress',     desc:'Tasks executed, milestones marked complete.' },
    { n:'04', title:'Generate Invoice',desc:'Itemised ₹ invoice generated instantly.' },
    { n:'05', title:'Payment & Paid',  desc:'UPI/Bank transfer, invoice auto-updated.' },
  ];

  const inp = `w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all duration-150`;
  const inpStyle = { background: T.bg, color: T.text, border: `1px solid ${T.border}` };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: T.bg, color: T.text }}>
      <style>{`
        @keyframes blob{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}}
        .blob{animation:blob 7s ease-in-out infinite}
        @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .spin-slow{animation:spin-slow 20s linear infinite}
        @keyframes cursor-blink{0%,100%{opacity:1}50%{opacity:0}}
        .cursor{animation:cursor-blink 0.8s step-end infinite}
        @keyframes slide-up{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        .s1{animation:slide-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both}
        .s2{animation:slide-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both}
        .s3{animation:slide-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both}
        .s4{animation:slide-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.38s both}
        .ember-btn:hover{background:#16A34A!important;box-shadow:0 8px 24px rgba(34,197,94,0.4)!important}
        .ember-card:hover{border-color:#22C55E!important;box-shadow:0 0 0 1px #22C55E,0 8px 32px rgba(34,197,94,0.1)!important;transform:translateY(-2px)}
        .ember-step:hover>div{background:rgba(34,197,94,0.12)!important;border-color:#22C55E!important}
      `}</style>

      {/* ═════ NAVBAR ═════ */}
      <nav className="sticky top-0 z-50 border-b" style={{ background: 'rgba(9,9,11,0.85)', borderColor: T.border, backdropFilter: 'blur(12px)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-7 text-sm font-semibold" style={{ color: T.muted }}>
            {[['#features','Features'],['#how-it-works','Process'],['#testimonials','Reviews'],['#contact','Contact']].map(([href,label]) => (
              <a key={label} href={href} className="relative group transition" style={{ color: T.muted }}
                onMouseOver={e => e.currentTarget.style.color = T.text}
                onMouseOut={e => e.currentTarget.style.color = T.muted}>
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ background: T.accent }} />
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={onNavigateLogin} className="text-sm font-bold px-4 py-2 rounded-xl transition"
              style={{ color: T.muted }} onMouseOver={e => e.currentTarget.style.color = T.text} onMouseOut={e => e.currentTarget.style.color = T.muted}>
              Log In
            </button>
            <MagneticBtn onClick={() => { setRegisterSuccess(false); setIsRegisterOpen(true); }}
              style={{ background: T.accent, color: '#09090B', border: `1px solid ${T.accentH}`, boxShadow: '0 4px 16px rgba(34,197,94,0.3)', padding:'8px 20px', borderRadius:'12px', fontSize:'14px', fontWeight:900, fontFamily:"'Space Grotesk',sans-serif" }}
              className="ember-btn">
              Get Started Free →
            </MagneticBtn>
          </div>
          <button className="md:hidden p-2 rounded-lg transition" style={{ color: T.muted }} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t px-6 py-4 space-y-3" style={{ background: T.surface, borderColor: T.border }}>
            {['Features','Process','Reviews','Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm font-bold py-1" style={{ color: T.muted }}>{l}</a>
            ))}
            <div className="pt-3 flex flex-col gap-2 border-t" style={{ borderColor: T.border }}>
              <button onClick={onNavigateLogin} style={{ background:'transparent', border:`1px solid ${T.border}`, color: T.text, borderRadius:'12px', padding:'10px', fontFamily:"'Space Grotesk',sans-serif", fontWeight:900 }}>Log In</button>
              <button onClick={() => { setMobileOpen(false); setIsRegisterOpen(true); }} style={{ background: T.accent, border:`1px solid ${T.accentH}`, color:'#09090B', borderRadius:'12px', padding:'10px', fontFamily:"'Space Grotesk',sans-serif", fontWeight:900 }}>Get Started Free</button>
            </div>
          </div>
        )}
      </nav>

      {/* ═════ HERO ═════ */}
      <section className="relative overflow-hidden pt-16 pb-24 min-h-[90vh] flex items-center" style={{ background: T.bg }}>
        {/* Ember glow blobs */}
        <div className="blob absolute -top-32 -left-32 w-[500px] h-[500px] opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle,#22C55E,transparent)', filter: 'blur(80px)' }} />
        <div className="blob absolute -bottom-20 -right-20 w-80 h-80 opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle,#16A34A,transparent)', filter: 'blur(60px)', animationDelay: '3s' }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#ffffff 1px,transparent 1px),linear-gradient(90deg,#ffffff 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        {/* Spin rings */}
        <div className="spin-slow absolute top-24 right-16 w-28 h-28 rounded-full border opacity-20 hidden lg:block" style={{ borderColor: T.accent, borderStyle:'dashed' }} />
        <div className="spin-slow absolute bottom-20 left-10 w-18 h-18 rounded-full border opacity-10 hidden lg:block" style={{ borderColor: T.muted, borderStyle:'dashed', animationDirection:'reverse', width:'72px', height:'72px' }} />

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">
            {/* LEFT */}
            <div>
              <div className="s1 inline-flex items-center gap-2 text-xs font-black px-3 py-1.5 rounded-full mb-6"
                style={{ background: 'rgba(34,197,94,0.12)', color: T.accent, border: `1px solid rgba(34,197,94,0.3)`, fontFamily:"'Space Grotesk',sans-serif" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.accent }} /> India's #1 Freelancer Platform
              </div>


              <h1 className="s2" style={{ fontFamily: "'Playfair Display',serif" }}>
                <span className="block font-black leading-[0.9] mb-1" style={{ color: T.text, fontSize:'clamp(2.8rem,6vw,5rem)' }}>
                  Freelancer
                </span>
                <span className="block font-black leading-[0.9] mb-1" style={{ color: T.accent, fontSize:'clamp(2.8rem,6vw,5rem)' }}>
                  Invoice &amp;
                </span>
                <span className="block font-black leading-[0.9]" style={{ color: T.text, fontSize:'clamp(2.4rem,5vw,4.2rem)' }}>
                  Client Management
                </span>
              </h1>

              <p className="s3 text-lg leading-relaxed mt-7 mb-8 max-w-lg" style={{ color: T.muted, fontFamily:"'Space Grotesk',sans-serif" }}>
                From client proposals to professional ₹ invoices, payment tracking, and profit analytics — all in one sleek dashboard.
              </p>


              <div className="s4 flex flex-wrap gap-3 mb-10">
                <MagneticBtn onClick={() => { setSelectedRole('Freelancer'); setRegisterSuccess(false); setIsRegisterOpen(true); }}
                  style={{ background: T.accent, color:'#09090B', border:`1px solid ${T.accentH}`, boxShadow:'0 4px 20px rgba(34,197,94,0.35)', padding:'14px 28px', borderRadius:'12px', fontSize:'15px', fontWeight:900, fontFamily:"'Space Grotesk',sans-serif" }}
                  className="ember-btn">
                  Start for Free <ArrowRight className="w-5 h-5 inline ml-1" />
                </MagneticBtn>
                <MagneticBtn onClick={() => switchRole('Freelancer')}
                  style={{ background: T.surface, color: T.text, border:`1px solid ${T.border}`, boxShadow:'none', padding:'14px 28px', borderRadius:'12px', fontSize:'15px', fontWeight:900, fontFamily:"'Space Grotesk',sans-serif" }}
                  className="btn-dark">
                  <Play className="w-4 h-4 inline mr-2" />Live Demo
                </MagneticBtn>
              </div>

              <div className="s4 flex flex-wrap items-center gap-5 text-sm font-semibold" style={{ color: T.muted }}>
                {['No credit card','100% Free','₹ INR Native','GST Ready'].map(t => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" style={{ color: T.accent }} />{t}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — demo card */}
            <div className="relative hidden lg:block animate-scalepop">
              {/* Glow behind card */}
              <div className="absolute inset-0 rounded-2xl opacity-20 blur-2xl" style={{ background:`radial-gradient(circle,${T.accent},transparent)` }} />
              <div className="relative p-6 rounded-2xl space-y-4" style={{ background: T.surface, border:`1px solid ${T.border}`, boxShadow:`0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px ${T.border}` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black" style={{ color: T.text, fontFamily:"'Space Grotesk',sans-serif" }}>Live Demo</p>
                    <p className="text-xs" style={{ color: T.muted }}>No sign-up · Instant access</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-black px-2.5 py-1 rounded-full"
                    style={{ background:'rgba(34,197,94,0.15)', color: T.accent, border:`1px solid rgba(34,197,94,0.3)`, fontFamily:"'Space Grotesk',sans-serif" }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.accent }} /> Live
                  </span>
                </div>

                {[
                  { fn: () => switchRole('Freelancer'), icon: Briefcase, label: 'Freelancer Dashboard', sub: 'Clients, invoices & projects', ic: T.accent, it: '#09090B' },
                  { fn: () => switchRole('Client'),     icon: Users,     label: 'Client Dashboard',     sub: 'Projects & payments',         ic: '#8B5CF6', it: '#fff' },
                ].map(({ fn, icon: Icon, label, sub, ic, it }, i) => (
                  <button key={i} onClick={fn} className="w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group text-left ember-card"
                    style={{ background: T.sur2, border:`1px solid ${T.border}`, cursor:'pointer' }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: ic }}>
                      <Icon className="w-5 h-5" style={{ color: it }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-sm" style={{ color: T.text, fontFamily:"'Space Grotesk',sans-serif" }}>{label}</p>
                      <p className="text-xs" style={{ color: T.muted }}>{sub}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" style={{ color: T.muted }} />
                  </button>
                ))}

                <div ref={statsRef} className="grid grid-cols-3 gap-2">
                  <CounterCard value={500}  suffix="+"   label="Freelancers" started={statsVisible} />
                  <CounterCard value={2}    suffix="Cr+" label="₹ Invoiced"  started={statsVisible} />
                  <CounterCard value={4.9}  suffix="★"   label="Rating"      started={statsVisible} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════ MARQUEE ═════ */}
      <TrustBar items={['UPI Payments','NEFT / RTGS','GST Invoicing','PDF Export','Real-time Analytics','Multi-client CRM','Expense Tracker','Profit Reports','Project Workflow','Chatbot Support']} />

      {/* ═════ FEATURES ═════ */}
      <section id="features" className="py-24" style={{ background: T.bg }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="mb-14">
              <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full mb-4"
                style={{ background:'rgba(34,197,94,0.12)', color: T.accent, border:`1px solid rgba(34,197,94,0.25)`, fontFamily:"'Space Grotesk',sans-serif" }}>
                <Sparkles className="w-3 h-3" /> 11 Core Modules
              </span>
              <h2 style={{ fontFamily:"'Playfair Display',serif", color: T.text }} className="text-5xl font-black leading-tight">
                Everything under<br /><em className="not-italic" style={{ color: T.accent }}>one roof.</em>
              </h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="p-6 rounded-2xl cursor-default group h-full transition-all duration-200 ember-card"
                  style={{ background: T.surface, border:`1px solid ${T.border}` }}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200"
                      style={{ background: i % 2 === 0 ? 'rgba(34,197,94,0.15)' : 'rgba(139,92,246,0.15)', border:`1px solid ${i % 2 === 0 ? 'rgba(34,197,94,0.3)' : 'rgba(139,92,246,0.3)'}` }}>
                      <f.icon className="w-6 h-6" style={{ color: i % 2 === 0 ? T.accent : '#8B5CF6' }} />
                    </div>
                    <span className="text-xs font-black opacity-15" style={{ fontFamily:"'Playfair Display',serif", color: T.text }}>0{i+1}</span>
                  </div>
                  <h3 className="font-black text-base mb-2" style={{ color: T.text, fontFamily:"'Space Grotesk',sans-serif" }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: T.muted }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═════ HOW IT WORKS ═════ */}
      <section id="how-it-works" className="py-24 border-y" style={{ background: T.surface, borderColor: T.border }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="mb-14">
              <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full mb-4"
                style={{ background:'rgba(34,197,94,0.12)', color: T.accent, border:`1px solid rgba(34,197,94,0.25)`, fontFamily:"'Space Grotesk',sans-serif" }}>
                The Process
              </span>
              <h2 style={{ fontFamily:"'Playfair Display',serif", color: T.text }} className="text-5xl font-black leading-tight">
                5 steps to<br /><em className="not-italic" style={{ color: T.accent }}>getting paid.</em>
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-5 gap-6 relative">
            <div className="hidden lg:block absolute top-8 left-8 right-8 h-px" style={{ background: `linear-gradient(90deg,transparent,${T.accent}30,transparent)` }} />
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center group cursor-default ember-step">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-200"
                    style={{ border:`1px solid ${T.border}`, background:'transparent' }}>
                    <span style={{ fontFamily:"'Playfair Display',serif", color: T.accent }} className="text-2xl font-black">{s.n}</span>
                  </div>
                  <h4 className="font-black mb-2 text-sm" style={{ color: T.text, fontFamily:"'Space Grotesk',sans-serif" }}>{s.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: T.muted }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═════ TESTIMONIALS ═════ */}
      <section id="testimonials" className="py-24" style={{ background: T.bg }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full mb-4"
                style={{ background:'rgba(34,197,94,0.12)', color: T.accent, border:`1px solid rgba(34,197,94,0.25)`, fontFamily:"'Space Grotesk',sans-serif" }}>
                <Star className="w-3 h-3" style={{ fill: T.accent }} /> Loved Across India
              </span>
              <h2 style={{ fontFamily:"'Playfair Display',serif", color: T.text }} className="text-5xl font-black">What they're saying</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name:'Priya Sharma',  role:'UI/UX Freelancer · Bangalore', text:'FreelanceIO saved me hours every week. Creating invoices is now a 2-minute task. Honestly life-changing.' },
              { name:'Karthik Rajan', role:'Full-Stack Dev · Chennai',      text:'The client portal is clean and professional. My clients love the invoice PDF and payment tracking.' },
              { name:'Ananya Patel',  role:'Content Strategist · Mumbai',   text:'Finally a tool for Indian freelancers. ₹ support, GST calculation — saved my tax season!' },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-6 rounded-2xl cursor-default h-full transition-all duration-200 ember-card"
                  style={{ background: T.surface, border:`1px solid ${T.border}` }}>
                  <div className="flex gap-1 mb-4">{[...Array(5)].map((_,j) => <Star key={j} className="w-4 h-4" style={{ fill: T.accent, color: T.accent }} />)}</div>
                  <p className="text-sm leading-relaxed mb-5 italic" style={{ fontFamily:"'Playfair Display',serif", color: T.text }}>"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm" style={{ background:'rgba(34,197,94,0.15)', color: T.accent, border:`1px solid rgba(34,197,94,0.3)` }}>{t.name[0]}</div>
                    <div>
                      <p className="text-sm font-black" style={{ color: T.text, fontFamily:"'Space Grotesk',sans-serif" }}>{t.name}</p>
                      <p className="text-xs" style={{ color: T.muted }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═════ CTA ═════ */}
      <section className="py-24 border-y relative overflow-hidden" style={{ background: T.surface, borderColor: T.border }}>
        <div className="blob absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 opacity-15 pointer-events-none"
          style={{ background:`radial-gradient(ellipse,${T.accent},transparent)`, filter:'blur(60px)' }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full mb-6"
              style={{ background:'rgba(34,197,94,0.12)', color: T.accent, border:`1px solid rgba(34,197,94,0.25)`, fontFamily:"'Space Grotesk',sans-serif" }}>
              100% Free Forever
            </span>
            <h2 style={{ fontFamily:"'Playfair Display',serif", color: T.text }} className="text-5xl font-black mb-5">
              Ready to get<br /><em className="not-italic" style={{ color: T.accent }}>paid faster?</em>
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto font-semibold" style={{ color: T.muted, fontFamily:"'Space Grotesk',sans-serif" }}>
              Join thousands of Indian freelancers managing their business professionally.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticBtn onClick={() => { setRegisterSuccess(false); setIsRegisterOpen(true); }}
                style={{ background: T.accent, color:'#09090B', border:`1px solid ${T.accentH}`, boxShadow:'0 4px 20px rgba(34,197,94,0.35)', padding:'16px 32px', borderRadius:'12px', fontSize:'15px', fontWeight:900, fontFamily:"'Space Grotesk',sans-serif" }}
                className="ember-btn">
                Start for Free → It's 100% Free
              </MagneticBtn>
              <MagneticBtn onClick={onNavigateLogin}
                style={{ background:'transparent', color: T.text, border:`1px solid ${T.border}`, padding:'16px 32px', borderRadius:'12px', fontSize:'15px', fontWeight:900, fontFamily:"'Space Grotesk',sans-serif" }}
                className="btn-secondary">
                Already have an account? Log In
              </MagneticBtn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═════ CONTACT ═════ */}
      <section id="contact" className="py-24" style={{ background: T.bg }}>
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full mb-4"
                style={{ background:'rgba(139,92,246,0.12)', color:'#A78BFA', border:`1px solid rgba(139,92,246,0.25)`, fontFamily:"'Space Grotesk',sans-serif" }}>Support</span>
              <h2 style={{ fontFamily:"'Playfair Display',serif", color: T.text }} className="text-4xl font-black mb-2">Get in touch</h2>
              <p className="font-semibold" style={{ color: T.muted }}>Have questions? We reply within 24 hours.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="p-8 rounded-2xl" style={{ background: T.surface, border:`1px solid ${T.border}`, boxShadow:`0 24px 48px rgba(0,0,0,0.5)` }}>
              {contactDone ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 animate-scalepop"
                    style={{ background:'rgba(34,197,94,0.15)', border:`1px solid rgba(34,197,94,0.3)` }}>
                    <CheckCircle2 className="w-7 h-7" style={{ color: T.accent }} />
                  </div>
                  <h4 className="text-lg font-black" style={{ color: T.text, fontFamily:"'Playfair Display',serif" }}>Message Sent!</h4>
                  <p className="text-sm mt-1" style={{ color: T.muted }}>We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContact} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-black mb-1.5" style={{ color: T.text, fontFamily:"'Space Grotesk',sans-serif" }}>Name *</label>
                      <input type="text" required value={contactForm.name} onChange={e=>setContactForm({...contactForm,name:e.target.value})} placeholder="Ramesh Kumar" className={inp} style={inpStyle} onFocus={e=>{e.target.style.borderColor=T.accent;e.target.style.boxShadow='0 0 0 3px rgba(34,197,94,0.12)'}} onBlur={e=>{e.target.style.borderColor=T.border;e.target.style.boxShadow='none'}} />
                    </div>
                    <div>
                      <label className="block text-sm font-black mb-1.5" style={{ color: T.text, fontFamily:"'Space Grotesk',sans-serif" }}>Email *</label>
                      <input type="email" required value={contactForm.email} onChange={e=>setContactForm({...contactForm,email:e.target.value})} placeholder="ramesh@example.com" className={inp} style={inpStyle} onFocus={e=>{e.target.style.borderColor=T.accent;e.target.style.boxShadow='0 0 0 3px rgba(34,197,94,0.12)'}} onBlur={e=>{e.target.style.borderColor=T.border;e.target.style.boxShadow='none'}} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-black mb-1.5" style={{ color: T.text, fontFamily:"'Space Grotesk',sans-serif" }}>Message *</label>
                    <textarea rows="4" required value={contactForm.message} onChange={e=>setContactForm({...contactForm,message:e.target.value})} placeholder="Tell us how we can help..." className={`${inp} resize-none`} style={inpStyle} onFocus={e=>{e.target.style.borderColor=T.accent;e.target.style.boxShadow='0 0 0 3px rgba(34,197,94,0.12)'}} onBlur={e=>{e.target.style.borderColor=T.border;e.target.style.boxShadow='none'}} />
                  </div>
                  <button type="submit"
                    style={{ background: T.accent, color:'#09090B', border:`1px solid ${T.accentH}`, boxShadow:'0 4px 16px rgba(34,197,94,0.25)', fontFamily:"'Space Grotesk',sans-serif" }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black ember-btn transition-all">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═════ FOOTER ═════ */}
      <footer className="border-t" style={{ background: T.surface, borderColor: T.border }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <div className="max-w-xs">
              <Logo />
              <p className="text-sm leading-relaxed mt-4" style={{ color: T.muted, fontFamily:"'Space Grotesk',sans-serif" }}>
                India's #1 platform for freelancer invoice & client management.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 text-sm">
              <div>
                <p className="font-black mb-3" style={{ color: T.text, fontFamily:"'Space Grotesk',sans-serif" }}>Product</p>
                {['Features','Process','Reviews','Contact'].map(l => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="block py-1 font-semibold transition" style={{ color: T.muted, fontFamily:"'Space Grotesk',sans-serif" }}
                    onMouseOver={e => e.currentTarget.style.color = T.accent}
                    onMouseOut={e => e.currentTarget.style.color = T.muted}>{l}</a>
                ))}
              </div>
              <div>
                <p className="font-black mb-3" style={{ color: T.text, fontFamily:"'Space Grotesk',sans-serif" }}>Account</p>
                <button onClick={onNavigateLogin} className="block py-1 font-semibold transition text-left" style={{ color: T.muted, fontFamily:"'Space Grotesk',sans-serif" }}
                  onMouseOver={e => e.currentTarget.style.color = T.text} onMouseOut={e => e.currentTarget.style.color = T.muted}>Log In</button>
                <button onClick={() => setIsRegisterOpen(true)} className="block py-1 font-black transition text-left" style={{ color: T.accent, fontFamily:"'Space Grotesk',sans-serif" }}>Register Free</button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold" style={{ borderColor: T.border, color: T.muted, fontFamily:"'Space Grotesk',sans-serif" }}>
            <p>© 2026 FreelanceIO. All rights reserved.</p>
            <p>Built for Indian freelancers 🇮🇳</p>
          </div>
        </div>
      </footer>

      {/* ═════ REGISTER MODAL ═════ */}
      <Modal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} title="Create Your Account" subtitle="Select your role below">
        {registerSuccess ? (
          <div className="text-center py-8 animate-scalepop">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce"
              style={{ background:'rgba(34,197,94,0.15)', border:`1px solid rgba(34,197,94,0.3)` }}>
              <CheckCircle2 className="w-8 h-8" style={{ color: T.accent }} />
            </div>
            <h3 className="text-lg font-black" style={{ color: T.text, fontFamily:"'Playfair Display',serif" }}>Account Created!</h3>
            <p className="text-sm mt-1" style={{ color: T.muted }}>Your {selectedRole} account is ready.</p>
            <button onClick={() => { setIsRegisterOpen(false); onNavigateLogin(); }}
              style={{ background: T.accent, color:'#09090B', border:`1px solid ${T.accentH}`, boxShadow:'0 4px 16px rgba(34,197,94,0.25)', fontFamily:"'Space Grotesk',sans-serif" }}
              className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-xl font-black ember-btn">
              Go to Login <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="animate-fadein">
            <div className="flex p-1 rounded-xl mb-5" style={{ background: T.bg, border:`1px solid ${T.border}` }}>
              {['Freelancer','Client'].map(r => (
                <button key={r} type="button" onClick={() => setSelectedRole(r)}
                  className="flex-1 py-2.5 text-sm rounded-lg font-black transition-all"
                  style={{ background: selectedRole===r ? T.accent : 'transparent', color: selectedRole===r ? '#09090B' : T.muted, fontFamily:"'Space Grotesk',sans-serif" }}>
                  {r} Account
                </button>
              ))}
            </div>
            {selectedRole === 'Freelancer' ? (
              <form onSubmit={handleFL} className="space-y-4">
                {[
                  { label:'Full Name *', key:'name',      type:'text',     ph:'Vimalanathan R.' },
                  { label:'Email *',     key:'email',     type:'email',    ph:'vimal@gmail.com' },
                  { label:'Password *',  key:'password',  type:'password', ph:'••••••••' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-sm font-black mb-1.5" style={{ color: T.text, fontFamily:"'Space Grotesk',sans-serif" }}>{f.label}</label>
                    <input type={f.type} required={f.label.includes('*')} value={freelancerData[f.key]} onChange={e=>setFreelancerData({...freelancerData,[f.key]:e.target.value})} placeholder={f.ph} className={inp} style={inpStyle} onFocus={e=>{e.target.style.borderColor=T.accent;e.target.style.boxShadow='0 0 0 3px rgba(34,197,94,0.12)'}} onBlur={e=>{e.target.style.borderColor=T.border;e.target.style.boxShadow='none'}} />
                  </div>
                ))}
                <button type="submit" style={{ background: T.accent, color:'#09090B', border:`1px solid ${T.accentH}`, fontFamily:"'Space Grotesk',sans-serif" }}
                  className="w-full py-3 rounded-xl font-black ember-btn transition-all">Create Freelancer Account</button>
              </form>
            ) : (
              <form onSubmit={handleCL} className="space-y-4">
                {[
                  { label:'Your Name *',    key:'name',    type:'text',     ph:'Karthik Subramanian' },
                  { label:'Company Name',   key:'company', type:'text',     ph:'TechNova Solutions' },
                  { label:'Email *',        key:'email',   type:'email',    ph:'karthik@technova.io' },
                  { label:'Password *',     key:'password',type:'password', ph:'••••••••' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-sm font-black mb-1.5" style={{ color: T.text, fontFamily:"'Space Grotesk',sans-serif" }}>{f.label}</label>
                    <input type={f.type} required={f.label.includes('*')} value={clientData[f.key]} onChange={e=>setClientData({...clientData,[f.key]:e.target.value})} placeholder={f.ph} className={inp} style={inpStyle} onFocus={e=>{e.target.style.borderColor=T.accent;e.target.style.boxShadow='0 0 0 3px rgba(34,197,94,0.12)'}} onBlur={e=>{e.target.style.borderColor=T.border;e.target.style.boxShadow='none'}} />
                  </div>
                ))}
                <button type="submit" style={{ background: T.accent, color:'#09090B', border:`1px solid ${T.accentH}`, fontFamily:"'Space Grotesk',sans-serif" }}
                  className="w-full py-3 rounded-xl font-black ember-btn transition-all">Create Client Account</button>
              </form>
            )}
            <div className="mt-5 pt-4 border-t text-center text-sm font-semibold" style={{ borderColor: T.border, color: T.muted, fontFamily:"'Space Grotesk',sans-serif" }}>
              Already have an account?{' '}
              <button onClick={() => { setIsRegisterOpen(false); onNavigateLogin(); }} className="font-black transition" style={{ color: T.accent }}>Log in →</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
