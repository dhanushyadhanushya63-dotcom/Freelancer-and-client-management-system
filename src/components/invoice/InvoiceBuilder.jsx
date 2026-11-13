import React, { useState } from 'react';
import { Plus, Trash2, Calculator, Calendar, Building, Briefcase } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function InvoiceBuilder({ onSave, onCancel, preselectedProjectId = null }) {
  const { clients, projects, invoices } = useData();

  // Find preselected project if passed
  const initialProject = preselectedProjectId ? projects.find(p => p.id === preselectedProjectId) : null;
  const initialClient = initialProject ? clients.find(c => c.id === initialProject.clientId) : (clients[0] || null);

  const [clientId, setClientId] = useState(initialClient?.id || '');
  const [projectId, setProjectId] = useState(initialProject?.id || '');
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [notes, setNotes] = useState('Payment is due within 14 days of invoice date. Thank you for your business!');
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [items, setItems] = useState([
    {
      id: 'item-1',
      description: initialProject ? `${initialProject.title} - Scope Deliverables` : 'UI/UX Design & Frontend Development',
      quantity: 1,
      rate: initialProject ? initialProject.budget : 25000
    }
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: 'item-' + Date.now(),
        description: '',
        quantity: 1,
        rate: 0
      }
    ]);
  };

  const handleRemoveItem = (index) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => {
    const q = Number(item.quantity) || 0;
    const r = Number(item.rate) || 0;
    return sum + (q * r);
  }, 0);

  const taxAmount = (subtotal * (Number(taxRate) || 0)) / 100;
  const discountAmount = Number(discount) || 0;
  const total = Math.max(0, subtotal + taxAmount - discountAmount);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedClient = clients.find(c => c.id === clientId);
    const selectedProject = projects.find(p => p.id === projectId);

    if (!selectedClient) {
      alert('Please select a client');
      return;
    }

    const invoiceData = {
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      clientCompany: selectedClient.company,
      clientEmail: selectedClient.email,
      clientAddress: selectedClient.address,
      projectId: selectedProject?.id || null,
      projectTitle: selectedProject?.title || 'General Professional Consulting',
      dueDate,
      notes,
      items: items.map(item => ({
        ...item,
        amount: Number(item.quantity) * Number(item.rate)
      })),
      subtotal,
      taxRate: Number(taxRate),
      taxAmount,
      discount: discountAmount,
      total
    };

    onSave(invoiceData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Client */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-indigo-600" /> Select Client *
          </label>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          >
            <option value="">-- Choose Client --</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.company || 'Client'})
              </option>
            ))}
          </select>
        </div>

        {/* Project */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-indigo-600" /> Link Project (Optional)
          </label>
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          >
            <option value="">-- General Project / None --</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Payment Due Date *
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Dynamic Line Items Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Invoice Line Items
          </span>
          <button
            type="button"
            onClick={handleAddItem}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>

        <div className="p-4 space-y-3">
          {items.map((item, index) => {
            const lineTotal = (Number(item.quantity) || 0) * (Number(item.rate) || 0);
            return (
              <div key={item.id || index} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex-1 w-full">
                  <input
                    type="text"
                    placeholder="Description of work / item..."
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    required
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="w-24">
                  <input
                    type="number"
                    min="1"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    required
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-right focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="w-32">
                  <div className="relative">
                    <span className="absolute left-2.5 top-2 text-xs text-slate-400">₹</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="Rate"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                      required
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg pl-6 pr-3 py-2 text-right focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>

                <div className="w-28 text-right font-mono text-xs font-bold text-slate-800 pr-1">
                  ₹{lineTotal.toLocaleString('en-IN')}
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  disabled={items.length <= 1}
                  className="p-1.5 text-slate-400 hover:text-rose-600 disabled:opacity-30 disabled:hover:text-slate-400 transition"
                  title="Remove row"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Adjustments & Totals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Notes / Payment Terms
          </label>
          <textarea
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            placeholder="Add payment terms, banking details, or notes..."
          />
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal:</span>
            <span className="font-mono font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-600">Tax / GST (%):</span>
            <input
              type="number"
              min="0"
              max="100"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className="w-20 text-xs bg-white border border-slate-200 rounded-lg px-2 py-1 text-right focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-600">Discount (₹):</span>
            <input
              type="number"
              min="0"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-24 text-xs bg-white border border-slate-200 rounded-lg px-2 py-1 text-right focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold text-slate-900">
            <span>Total Amount:</span>
            <span className="text-indigo-600 font-mono text-base">₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
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
          Generate & Save Invoice
        </button>
      </div>
    </form>
  );
}
