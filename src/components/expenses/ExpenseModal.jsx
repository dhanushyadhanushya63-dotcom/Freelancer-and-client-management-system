import React, { useState } from 'react';
import { DollarSign, Tag, Calendar, FileText } from 'lucide-react';

export default function ExpenseModal({ onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Software & Tools');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount) {
      alert('Please fill in title and amount');
      return;
    }

    onSave({
      title: title.trim(),
      category,
      amount: Number(amount),
      date,
      notes: notes.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-indigo-600" /> Expense Title / Description *
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Adobe Creative Cloud Subscription"
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
            <option value="Software & Tools">Software & Tools</option>
            <option value="Cloud & Hosting">Cloud & Hosting</option>
            <option value="Hardware">Hardware & Equipment</option>
            <option value="Office & Utilities">Office & Broadband</option>
            <option value="Marketing & Domain">Marketing & Domain</option>
            <option value="Other">Other Expenses</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Expense Date *
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Amount (₹ INR) *
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">₹</span>
          <input
            type="number"
            min="1"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-3 py-2.5 focus:outline-none focus:border-indigo-500 font-mono font-bold"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Notes / Receipt info
        </label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Receipt invoice number or tax details..."
          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
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
          className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}
