import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const T = { bg:'#09090B', surface:'#18181B', sur2:'#1F1F23', border:'#27272A', text:'#FFFFFF', muted:'#A1A1AA', accent:'#22C55E' };

const iconColors = {
  yellow:  '#22C55E', plum:'#8B5CF6', obsidian:'#FFFFFF',
  red:'#F87171', green:'#4ADE80',
  /* legacy */
  sky:'#38BDF8', indigo:'#818CF8', violet:'#A78BFA',
  emerald:'#34D399', purple:'#C084FC', amber:'#22C55E',
  rose:'#F87171', orange:'#22C55E',
};

export default function StatCard({ title, value, icon: Icon, color = 'orange', subtitle, trend }) {
  const ic = iconColors[color] || T.accent;
  const isPositive = trend && !trend.startsWith('-');

  return (
    <div className="rounded-2xl p-5 cursor-default transition-all duration-200 group"
      style={{ background: T.surface, border:`1px solid ${T.border}` }}
      onMouseOver={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.boxShadow=`0 0 0 1px ${T.accent}, 0 8px 32px rgba(34,197,94,0.1)`; e.currentTarget.style.transform='translateY(-2px)'; }}
      onMouseOut={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='translateY(0)'; }}>
      <div className="flex items-start justify-between mb-4">
        {/* Icon */}
        <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{ background:`${ic}18`, border:`1px solid ${ic}30` }}>
          <Icon className="w-5 h-5" style={{ color: ic }} />
        </div>
        {/* Trend */}
        {trend && (
          <span className="inline-flex items-center gap-1 text-xs font-black px-2 py-1 rounded-lg"
            style={isPositive
              ? { background:'rgba(34,197,94,0.12)', color: T.accent, border:`1px solid rgba(34,197,94,0.25)` }
              : { background:'rgba(239,68,68,0.12)', color:'#F87171', border:'1px solid rgba(239,68,68,0.25)' }}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}
          </span>
        )}
      </div>
      <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: T.muted, fontFamily:"'Space Grotesk',sans-serif" }}>{title}</p>
      <p className="text-2xl font-black leading-none" style={{ color: T.text, fontFamily:"'Playfair Display',serif" }}>{value}</p>
      {subtitle && <p className="text-xs mt-2 font-semibold" style={{ color: T.muted }}>{subtitle}</p>}
    </div>
  );
}
