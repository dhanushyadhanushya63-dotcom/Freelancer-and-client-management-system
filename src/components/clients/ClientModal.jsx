import React, { useState } from 'react';
import { User, Building, Mail, Phone, MapPin } from 'lucide-react';

export default function ClientModal({ client = null, onSave, onCancel }) {
  const [name, setName] = useState(client?.name || '');
  const [company, setCompany] = useState(client?.company || '');
  const [email, setEmail] = useState(client?.email || '');
  const [phone, setPhone] = useState(client?.phone || '');
  const [address, setAddress] = useState(client?.address || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert('Client Name and Email are required');
      return;
    }

    onSave({
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-indigo-600" /> Client Contact Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ramesh Krishnan"
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-indigo-600" /> Company / Organization
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Acme Innovations Pvt Ltd"
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-indigo-600" /> Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ramesh@company.com"
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-indigo-600" /> Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-indigo-600" /> Billing Address & Location
        </label>
        <textarea
          rows="3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Street address, city, state, postal code..."
          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
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
          {client ? 'Update Client' : 'Add Client'}
        </button>
      </div>
    </form>
  );
}
