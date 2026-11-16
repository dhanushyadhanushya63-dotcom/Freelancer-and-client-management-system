import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Zap, Users, ArrowRight, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const T = {
  bg:'#09090B', surface:'#18181B', sur2:'#1F1F23',
  border:'#27272A', text:'#FFFFFF', muted:'#A1A1AA',
  accent:'#22C55E', accentH:'#16A34A',
};

export default function LoginView({ onBackToHome }) {
  const { login, authError, setAuthError, loading } = useAuth();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [role, setRole]         = useState('Freelancer');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { setAuthError?.('Please fill in both fields.'); return; }
    await login(email.trim(), password.trim(), role);
  };
  const demoLogin = async (r) => {
    const c = r === 'Freelancer' ? { e:'freelancer@demo.com', p:'admin123' } : { e:'client@demo.com', p:'admin123' };
    setEmail(c.e); setPassword(c.p); setRole(r);
    await login(c.e, c.p, r);
  };

  const inp    = 'w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all duration-150';
  const inpSt  = { background: T.bg, color: T.text, border:`1px solid ${T.border}` };
  const focus  = e => { e.target.style.borderColor=T.accent; e.target.style.boxShadow='0 0 0 3px rgba(34,197,94,0.12)'; };
  const blur   = e => { e.target.style.borderColor=T.border; e.target.style.boxShadow='none'; };

  return (
    <div className="min-h-screen flex" style={{ background: T.bg }}>
      <style>{`.ember-btn:hover{background:#16A34A!important;box-shadow:0 8px 24px rgba(34,197,94,0.4)!important}`}</style>

      {/* ── LEFT PANEL: dark obsidian + ember glow ── */}
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-between p-14 relative overflow-hidden border-r"
        style={{ background: T.surface, borderColor: T.border }}>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage:'linear-gradient(#ffffff 1px,transparent 1px),linear-gradient(90deg,#ffffff 1px,transparent 1px)', backgroundSize:'48px 48px' }} />
        {/* Ember glow */}
        <div className="absolute -top-20 -right-20 w-80 h-80 opacity-20 pointer-events-none"
          style={{ background:'radial-gradient(circle,#22C55E,transparent)', filter:'blur(60px)' }} />
        <div className="absolute -bottom-20 left-10 w-56 h-56 opacity-10 pointer-events-none"
          style={{ background:'radial-gradient(circle,#16A34A,transparent)', filter:'blur(40px)' }} />

        {/* Logo */}
        <div className="relative flex items-center gap-3 animate-fadein">
          <div className="logo-mark animate-glow">₹</div>
          <span style={{ fontFamily:"'Playfair Display',serif" }} className="font-black text-xl">
            <span style={{ color: T.text }}>Freelance</span><span style={{ color: T.accent }}>IO</span>
          </span>
        </div>

        {/* Hero copy */}
        <div className="relative space-y-7 animate-fadein" style={{ animationDelay:'0.1s' }}>
          <div className="inline-flex items-center gap-2 text-xs font-black px-3 py-1.5 rounded-full"
            style={{ background:'rgba(34,197,94,0.12)', color: T.accent, border:'1px solid rgba(34,197,94,0.3)', fontFamily:"'Space Grotesk',sans-serif" }}>
            <Zap className="w-3 h-3" /> India's #1 Freelancer Platform
          </div>

          <h1 style={{ fontFamily:"'Playfair Display',serif", color: T.text }} className="text-4xl font-black leading-tight">
            Manage clients,<br />invoices &<br />
            <em className="not-italic" style={{ color: T.accent }}>get paid faster.</em>
          </h1>

          <p className="text-sm leading-relaxed max-w-sm font-semibold" style={{ color: T.muted, fontFamily:"'Space Grotesk',sans-serif" }}>
            Professional invoicing in ₹, client management, project tracking — built for Indian freelancers.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 stagger">
            {[['500+','Freelancers'],['₹2Cr+','Invoiced'],['4.9★','Rating']].map(([v,l]) => (
              <div key={l} className="text-center p-3 rounded-xl transition cursor-default"
                style={{ background: T.sur2, border:`1px solid ${T.border}` }}>
                <p style={{ fontFamily:"'Playfair Display',serif", color: T.text }} className="text-xl font-black">{v}</p>
                <p className="text-xs mt-0.5 font-semibold" style={{ color: T.muted }}>{l}</p>
              </div>
            ))}
          </div>

          {/* Mini testimonial */}
          <div className="rounded-xl p-4" style={{ background: T.sur2, border:`1px solid ${T.border}` }}>
            <div className="flex gap-0.5 mb-2">
              {[...Array(5)].map((_,i) => <Star key={i} className="w-3 h-3" style={{ fill: T.accent, color: T.accent }} />)}
            </div>
            <p className="text-xs italic font-semibold" style={{ color: T.muted, fontFamily:"'Playfair Display',serif" }}>
              "FreelanceIO saved me hours every week. Invoices in 2 minutes!"
            </p>
            <p className="text-xs font-black mt-2" style={{ color: T.accent }}>— Priya Sharma, UI/UX Freelancer</p>
          </div>
        </div>

        <p className="relative text-xs font-semibold" style={{ color: T.muted, opacity:0.5 }}>© 2026 FreelanceIO 🇮🇳</p>
      </div>

      {/* ── RIGHT PANEL: pitch black + form ── */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 animate-fadein" style={{ background: T.bg }}>
        <button onClick={onBackToHome}
          className="flex items-center gap-2 text-sm font-black transition mb-10 self-start group"
          style={{ color: T.muted }}
          onMouseOver={e => e.currentTarget.style.color = T.text}
          onMouseOut={e => e.currentTarget.style.color = T.muted}>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to home
        </button>

        <div className="w-full max-w-sm mx-auto">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="logo-mark animate-glow">₹</div>
            <span style={{ fontFamily:"'Playfair Display',serif" }} className="font-black text-xl">
              <span style={{ color: T.text }}>Freelance</span><span style={{ color: T.accent }}>IO</span>
            </span>
          </div>

          <div className="mb-8">
            <h2 style={{ fontFamily:"'Playfair Display',serif", color: T.text }} className="text-4xl font-black">Welcome back 👋</h2>
            <p className="text-sm mt-2 font-semibold" style={{ color: T.muted, fontFamily:"'Space Grotesk',sans-serif" }}>Sign in to your FreelanceIO account</p>
          </div>

          {authError && (
            <div className="mb-5 p-3.5 rounded-xl flex items-center gap-2 font-bold text-sm animate-fadein"
              style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', color:'#F87171' }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:'#EF4444' }} />
              {authError}
            </div>
          )}

          {/* Role Toggle */}
          <div className="flex p-1 rounded-xl mb-6" style={{ background: T.surface, border:`1px solid ${T.border}` }}>
            {['Freelancer','Client'].map(r => (
              <button key={r} type="button" onClick={() => setRole(r)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm rounded-lg transition-all duration-200 font-black"
                style={{ fontFamily:"'Space Grotesk',sans-serif", background: role===r ? T.accent : 'transparent', color: role===r ? '#09090B' : T.muted }}>
                {r==='Freelancer' ? <Zap className="w-3.5 h-3.5" /> : <Users className="w-3.5 h-3.5" />} {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-black mb-1.5" style={{ color: T.text, fontFamily:"'Space Grotesk',sans-serif" }}>Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: T.muted }} />
                <input type="email" required value={email} onChange={e => { setEmail(e.target.value); setAuthError?.(''); }}
                  placeholder={role==='Freelancer' ? 'freelancer@demo.com' : 'client@demo.com'}
                  className={`${inp} pl-10`} style={inpSt} onFocus={focus} onBlur={blur} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-black" style={{ color: T.text, fontFamily:"'Space Grotesk',sans-serif" }}>Password</label>
                <button type="button" className="text-xs font-black transition" style={{ color: T.accent }}>Forgot password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: T.muted }} />
                <input type={showPass?'text':'password'} required value={password} onChange={e => { setPassword(e.target.value); setAuthError?.(''); }}
                  placeholder="••••••••" className={`${inp} pl-10 pr-10`} style={inpSt} onFocus={focus} onBlur={blur} />
                <button type="button" onClick={()=>setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 transition" style={{ color: T.muted }}>
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              style={{ background: T.accent, color:'#09090B', border:`1px solid ${T.accentH}`, boxShadow:'0 4px 16px rgba(34,197,94,0.25)', fontFamily:"'Space Grotesk',sans-serif" }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black mt-1 transition-all disabled:opacity-50 ember-btn">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-[#09090B]/30 border-t-[#09090B] rounded-full animate-spin" /> Signing in...</>
              ) : <>Sign in as {role} <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: T.border }} />
            <span className="text-xs font-black" style={{ color: T.muted, fontFamily:"'Space Grotesk',sans-serif" }}>or try a demo</span>
            <div className="flex-1 h-px" style={{ background: T.border }} />
          </div>

          <div className="grid grid-cols-2 gap-3 stagger">
            {[
              { r:'Freelancer', icon:Zap,   label:'Demo Freelancer', bg:'rgba(34,197,94,0.12)', border:'rgba(34,197,94,0.3)', fg: T.accent },
              { r:'Client',     icon:Users,  label:'Demo Client',     bg:'rgba(139,92,246,0.12)', border:'rgba(139,92,246,0.3)', fg:'#A78BFA' },
            ].map(({ r, icon:Icon, label, bg, border, fg }) => (
              <button key={r} type="button" onClick={() => demoLogin(r)}
                className="flex flex-col items-center gap-2 py-4 rounded-xl transition-all duration-200"
                style={{ background: bg, border:`1px solid ${border}`, fontFamily:"'Space Grotesk',sans-serif" }}
                onMouseOver={e => e.currentTarget.style.borderColor = fg}
                onMouseOut={e => e.currentTarget.style.borderColor = border}>
                <Icon className="w-5 h-5" style={{ color: fg }} />
                <span className="text-xs font-black" style={{ color: fg }}>{label}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded" style={{ background:'rgba(0,0,0,0.3)', color: T.muted }}>admin123</span>
              </button>
            ))}
          </div>

          <p className="text-center text-sm mt-8 font-semibold" style={{ color: T.muted, fontFamily:"'Space Grotesk',sans-serif" }}>
            New to FreelanceIO?{' '}
            <button onClick={onBackToHome} className="font-black transition" style={{ color: T.accent }}>Create a free account →</button>
          </p>
        </div>
      </div>
    </div>
  );
}
