import React, { useState } from 'react';
import { Send, Calendar, Tag, FileText, IndianRupee } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const TK = {
  bg:      '#09090B',
  surface: '#18181B',
  sur2:    '#1F1F23',
  border:  '#27272A',
  text:    '#FFFFFF',
  muted:   '#A1A1AA',
  accent:  '#22C55E',
  accentH: '#16A34A',
};

const inputStyle = {
  width: '100%',
  background: TK.sur2,
  color: TK.text,
  border: `1px solid ${TK.border}`,
  borderRadius: '10px',
  padding: '10px 14px',
  fontSize: '13px',
  fontFamily: "'Space Grotesk', sans-serif",
  outline: 'none',
  transition: 'border-color 0.15s, box-shadow 0.15s',
};

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '11px',
  fontWeight: 700,
  color: TK.muted,
  marginBottom: '6px',
  fontFamily: "'Space Grotesk', sans-serif",
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

function DarkInput({ icon: Icon, label, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={labelStyle}>
        {Icon && <Icon style={{ width: 13, height: 13, color: TK.accent }} />}
        {label}
      </label>
      <input
        {...props}
        style={{
          ...inputStyle,
          borderColor: focused ? TK.accent : TK.border,
          boxShadow: focused ? `0 0 0 3px rgba(34,197,94,0.12)` : 'none',
        }}
        onFocus={e => { setFocused(true); props.onFocus?.(e); }}
        onBlur={e => { setFocused(false); props.onBlur?.(e); }}
      />
    </div>
  );
}

function DarkSelect({ icon: Icon, label, children, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={labelStyle}>
        {Icon && <Icon style={{ width: 13, height: 13, color: TK.accent }} />}
        {label}
      </label>
      <select
        {...props}
        style={{
          ...inputStyle,
          borderColor: focused ? TK.accent : TK.border,
          boxShadow: focused ? `0 0 0 3px rgba(34,197,94,0.12)` : 'none',
          appearance: 'none',
          cursor: 'pointer',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {children}
      </select>
    </div>
  );
}

function DarkTextarea({ icon: Icon, label, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={labelStyle}>
        {Icon && <Icon style={{ width: 13, height: 13, color: TK.accent }} />}
        {label}
      </label>
      <textarea
        {...props}
        style={{
          ...inputStyle,
          resize: 'vertical',
          lineHeight: '1.6',
          borderColor: focused ? TK.accent : TK.border,
          boxShadow: focused ? `0 0 0 3px rgba(34,197,94,0.12)` : 'none',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

export default function ProjectRequestModal({ onSave, onCancel }) {
  const { currentUser } = useAuth();
  const { clients } = useData();

  const clientObj = clients.find(c => c.email === currentUser?.email) || clients[0];

  const [title,       setTitle]       = useState('');
  const [category,    setCategory]    = useState('Web Development');
  const [budget,      setBudget]      = useState(45000);
  const [deadline,    setDeadline]    = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) { alert('Please enter a project title'); return; }
    onSave({
      clientId:    clientObj?.id,
      clientName:  clientObj?.name,
      title:       title.trim(),
      category,
      budget:      Number(budget),
      deadline,
      description: description.trim() || 'No description provided.',
      progress:    0,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Project Title */}
      <DarkInput
        icon={FileText}
        label="Project Title *"
        type="text"
        required
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="e.g. Next-Gen Mobile App UI & API Integration"
      />

      {/* Category + Deadline row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <DarkSelect
          icon={Tag}
          label="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="Web Development">Web Development</option>
          <option value="UI/UX & Frontend">UI/UX & Frontend Design</option>
          <option value="Mobile App (React Native/Flutter)">Mobile App Development</option>
          <option value="E-commerce Solutions">E-commerce Solutions</option>
          <option value="API & Backend Integration">API & Backend Integration</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Content Writing">Content Writing</option>
        </DarkSelect>

        <DarkInput
          icon={Calendar}
          label="Desired Deadline *"
          type="date"
          required
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
        />
      </div>

      {/* Budget */}
      <div>
        <label style={labelStyle}>
          <IndianRupee style={{ width: 13, height: 13, color: TK.accent }} />
          Estimated Budget (₹ INR) *
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
            color: TK.accent, fontWeight: 800, fontSize: '13px', pointerEvents: 'none',
          }}>₹</span>
          <input
            type="number"
            min="1000"
            step="1000"
            required
            value={budget}
            onChange={e => setBudget(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '28px', fontFamily: 'monospace', fontWeight: 700 }}
            onFocus={e => { e.target.style.borderColor = TK.accent; e.target.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.12)'; }}
            onBlur={e =>  { e.target.style.borderColor = TK.border;  e.target.style.boxShadow = 'none'; }}
          />
        </div>
      </div>

      {/* Description */}
      <DarkTextarea
        icon={FileText}
        label="Detailed Requirements / Scope of Work"
        rows={4}
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Describe what you want built, target audience, deliverables, and any references..."
      />

      {/* Footer buttons */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px',
        paddingTop: '12px', borderTop: `1px solid ${TK.border}`,
      }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '10px 20px', fontSize: '12px', fontWeight: 700,
            color: TK.muted, background: 'transparent',
            border: `1px solid ${TK.border}`, borderRadius: '10px',
            cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", transition: 'all 0.15s',
          }}
          onMouseOver={e => { e.currentTarget.style.borderColor = TK.accent; e.currentTarget.style.color = TK.text; }}
          onMouseOut={e =>  { e.currentTarget.style.borderColor = TK.border;  e.currentTarget.style.color = TK.muted; }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '10px 24px', fontSize: '12px', fontWeight: 800,
            color: '#09090B', background: TK.accent,
            border: `1px solid ${TK.accentH}`,
            borderRadius: '10px', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(34,197,94,0.3)',
            fontFamily: "'Space Grotesk', sans-serif", transition: 'all 0.15s',
          }}
          onMouseOver={e => { e.currentTarget.style.background = TK.accentH; e.currentTarget.style.boxShadow = '0 6px 24px rgba(34,197,94,0.45)'; }}
          onMouseOut={e =>  { e.currentTarget.style.background = TK.accent;   e.currentTarget.style.boxShadow = '0 4px 16px rgba(34,197,94,0.3)'; }}
        >
          <Send style={{ width: 14, height: 14 }} />
          Send Project Request to Freelancer
        </button>
      </div>
    </form>
  );
}
