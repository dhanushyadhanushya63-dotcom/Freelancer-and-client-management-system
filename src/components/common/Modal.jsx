import React from 'react';
import { X } from 'lucide-react';

const T = { bg:'#09090B', surface:'#18181B', border:'#27272A', text:'#FFFFFF', muted:'#A1A1AA', accent:'#22C55E' };

export default function Modal({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-2xl' }) {
  React.useEffect(() => {
    const fn = e => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 backdrop-blur-sm transition-opacity"
        style={{ background:'rgba(0,0,0,0.75)' }} onClick={onClose} />

      {/* Panel */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className={`relative overflow-hidden text-left w-full ${maxWidth} animate-scalepop`}
          style={{ background: T.surface, border:`1px solid ${T.border}`, borderRadius:'20px', boxShadow:`0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px ${T.border}` }}
          onClick={e => e.stopPropagation()}>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: T.border }}>
            <div>
              <h3 className="text-lg font-black" style={{ color: T.text, fontFamily:"'Playfair Display',serif" }}>{title}</h3>
              {subtitle && <p className="text-xs mt-0.5 font-semibold" style={{ color: T.muted, fontFamily:"'Space Grotesk',sans-serif" }}>{subtitle}</p>}
            </div>
            <button onClick={onClose} aria-label="Close"
              className="rounded-xl p-1.5 transition"
              style={{ color: T.muted }}
              onMouseOver={e => { e.currentTarget.style.background='rgba(34,197,94,0.12)'; e.currentTarget.style.color=T.accent; }}
              onMouseOut={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color=T.muted; }}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 max-h-[80vh] overflow-y-auto" style={{ background: T.surface }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
