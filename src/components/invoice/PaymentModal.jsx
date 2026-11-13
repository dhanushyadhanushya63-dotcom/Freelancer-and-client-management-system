import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, Hash, Calendar, DollarSign } from 'lucide-react';

export default function PaymentModal({ invoice, onConfirmPayment, onCancel, isClient = false }) {
  const [method, setMethod] = useState('UPI');
  const [referenceNumber, setReferenceNumber] = useState(() => 'TXN-' + Math.floor(100000000 + Math.random() * 900000000));
  const [paymentDate, setPaymentDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  if (!invoice) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmPayment(invoice.id, {
      method,
      referenceNumber,
      date: paymentDate,
      notes,
      amount: invoice.total
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Summary Box */}
      <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-100 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block">
            Payment For
          </span>
          <p className="font-bold text-slate-900 text-sm">{invoice.invoiceNumber}</p>
          <p className="text-xs text-slate-600">{invoice.clientName} • {invoice.projectTitle}</p>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Total Payable
          </span>
          <p className="text-xl font-black text-indigo-700 font-mono">
            ₹{Number(invoice.total).toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Payment Method Selector */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Select Payment Method
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { id: 'UPI', label: 'UPI / GPay / PhonePe', desc: 'Instant UPI' },
            { id: 'Bank Transfer (NEFT/IMPS)', label: 'Bank Transfer', desc: 'Direct NEFT/RTGS' },
            { id: 'Credit / Debit Card', label: 'Card Payment', desc: 'Visa / Mastercard' },
            { id: 'Cash / Cheque', label: 'Cash / Cheque', desc: 'Offline entry' }
          ].map(m => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMethod(m.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                method === m.id
                  ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">{m.label}</span>
                {method === m.id && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
              </div>
              <p className="text-[11px] text-slate-500">{m.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-indigo-600" /> Transaction / UTR / Reference ID *
          </label>
          <input
            type="text"
            required
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            placeholder="e.g. UPI Ref, NEFT UTR ID"
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Payment Date *
          </label>
          <input
            type="date"
            required
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Payment Receipt Notes (Optional)
        </label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Paid via Google Pay to Axis UPI account"
          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Actions */}
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
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition"
        >
          <ShieldCheck className="w-4 h-4" />
          {isClient ? 'Submit Payment Confirmation' : 'Confirm & Mark as Paid'}
        </button>
      </div>
    </form>
  );
}
