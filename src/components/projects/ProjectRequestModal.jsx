import React, { useState } from 'react';
import { Send, Calendar, DollarSign, Tag, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function ProjectRequestModal({ onSave, onCancel }) {
  const { currentUser } = useAuth();
  const { clients } = useData();

  // Find matching client object or default
  const clientObj = clients.find(c => c.email === currentUser?.email) || clients[0];

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [budget, setBudget] = useState(45000);
  const [deadline, setDeadline] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a project title');
      return;
    }

    const requestData = {
      clientId: clientObj.id,
      clientName: clientObj.name,
      title: title.trim(),
      category,
      budget: Number(budget),
      deadline,
      description: description.trim() || 'No description provided.',
      progress: 0
    };

    onSave(requestData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-indigo-600" /> Project Title *
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Next-Gen Mobile App UI & API Integration"
          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-indigo-600" /> Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
          >
            <option value="Web Development">Web Development</option>
            <option value="UI/UX & Frontend">UI/UX & Frontend Design</option>
            <option value="Mobile App (React Native/Flutter)">Mobile App Development</option>
            <option value="E-commerce Solutions">E-commerce Solutions</option>
            <option value="API & Backend Integration">API & Backend Integration</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Desired Deadline *
          </label>
          <input
            type="date"
            required
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Estimated Budget (₹ INR) *
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">₹</span>
          <input
            type="number"
            min="1000"
            step="1000"
            required
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-3 py-2.5 focus:outline-none focus:border-indigo-500 font-mono font-semibold"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Detailed Requirements / Scope of Work
        </label>
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what you want built, target audience, deliverables, and any references..."
          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500 leading-relaxed"
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition"
        >
          <Send className="w-3.5 h-3.5" />
          Send Project Request to Freelancer
        </button>
      </div>
    </form>
  );
}
