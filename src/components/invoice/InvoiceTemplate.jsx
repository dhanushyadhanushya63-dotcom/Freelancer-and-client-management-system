import React from 'react';
import { Printer, Download, CheckCircle, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function InvoiceTemplate({ invoice, onRecordPayment, isClientView = false }) {
  const { profile } = useData();

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Action Bar (hidden on print) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl no-print">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status:</span>
          {invoice.status === 'Paid' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Paid in Full
            </span>
          )}
          {invoice.status === 'Pending' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
              <Clock className="w-3.5 h-3.5 text-amber-600" /> Payment Pending
            </span>
          )}
          {invoice.status === 'Overdue' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Overdue
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition shadow-2xs"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            Print / Save as PDF
          </button>

          {invoice.status !== 'Paid' && onRecordPayment && (
            <button
              onClick={() => onRecordPayment(invoice)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition shadow-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              {isClientView ? 'Make Payment Now' : 'Record Client Payment'}
            </button>
          )}
        </div>
      </div>

      {/* Invoice Document Canvas */}
      <div id="invoice-print-area" className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm text-slate-800 text-xs sm:text-sm">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-slate-200 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-lg shadow-sm">
                F
              </div>
              <div>
                <span className="text-base font-bold text-slate-900 tracking-tight block">
                  {profile.name}
                </span>
                <span className="text-xs text-indigo-600 font-medium">{profile.title}</span>
              </div>
            </div>
            <p className="text-slate-500 text-xs">{profile.location}</p>
            <p className="text-slate-500 text-xs">{profile.email} • {profile.phone}</p>
          </div>

          <div className="sm:text-right">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase text-indigo-600">INVOICE</h2>
            <p className="font-mono font-bold text-slate-700 text-sm mt-1">{invoice.invoiceNumber}</p>
            <div className="mt-2 space-y-0.5 text-xs text-slate-500">
              <p>Issue Date: <span className="font-medium text-slate-700">{invoice.issueDate}</span></p>
              <p>Due Date: <span className="font-medium text-slate-700">{invoice.dueDate}</span></p>
            </div>
          </div>
        </div>

        {/* Bill To & Project Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Billed To
            </span>
            <p className="font-bold text-slate-900 text-sm">{invoice.clientName}</p>
            {invoice.clientCompany && <p className="text-slate-600 text-xs">{invoice.clientCompany}</p>}
            {invoice.clientEmail && <p className="text-slate-500 text-xs">{invoice.clientEmail}</p>}
            {invoice.clientAddress && <p className="text-slate-500 text-xs">{invoice.clientAddress}</p>}
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Project Reference
            </span>
            <p className="font-semibold text-slate-900 text-sm">{invoice.projectTitle || 'Professional Services'}</p>
            <p className="text-slate-500 text-xs mt-1">Payment Terms: Net 14 Days</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-2">#</th>
                <th className="py-3 px-2">Description / Task</th>
                <th className="py-3 px-2 text-right">Qty / Hrs</th>
                <th className="py-3 px-2 text-right">Rate</th>
                <th className="py-3 px-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {invoice.items && invoice.items.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td className="py-3.5 px-2 font-mono text-slate-400 text-xs">{idx + 1}</td>
                  <td className="py-3.5 px-2 font-medium text-slate-900">
                    {item.description}
                  </td>
                  <td className="py-3.5 px-2 text-right">{item.quantity}</td>
                  <td className="py-3.5 px-2 text-right font-mono">₹{Number(item.rate).toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-2 text-right font-mono font-semibold text-slate-900">
                    ₹{Number(item.amount || item.quantity * item.rate).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculation Summary */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between gap-6">
          <div className="sm:max-w-xs space-y-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Payment Details
              </span>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1 text-slate-600">
                <p><span className="font-semibold text-slate-800">Bank:</span> {profile.bankDetails?.bankName}</p>
                <p><span className="font-semibold text-slate-800">A/C No:</span> {profile.bankDetails?.accountNumber}</p>
                <p><span className="font-semibold text-slate-800">IFSC:</span> {profile.bankDetails?.ifscCode}</p>
                <p><span className="font-semibold text-slate-800">UPI ID:</span> {profile.bankDetails?.upiId}</p>
              </div>
            </div>

            {invoice.notes && (
              <p className="text-xs text-slate-500 italic">
                Note: {invoice.notes}
              </p>
            )}
          </div>

          <div className="w-full sm:w-64 space-y-2">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Subtotal:</span>
              <span className="font-mono">₹{Number(invoice.subtotal).toLocaleString('en-IN')}</span>
            </div>

            {invoice.taxRate > 0 && (
              <div className="flex justify-between text-xs text-slate-600">
                <span>Tax / GST ({invoice.taxRate}%):</span>
                <span className="font-mono">+₹{Number(invoice.taxAmount || 0).toLocaleString('en-IN')}</span>
              </div>
            )}

            {invoice.discount > 0 && (
              <div className="flex justify-between text-xs text-emerald-600">
                <span>Discount:</span>
                <span className="font-mono">-₹{Number(invoice.discount).toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-base font-bold text-slate-900 border-t border-slate-200 pt-2">
              <span>Grand Total:</span>
              <span className="font-mono text-indigo-700">₹{Number(invoice.total).toLocaleString('en-IN')}</span>
            </div>

            {invoice.status === 'Paid' && (
              <div className="mt-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-center">
                <p className="text-xs font-semibold text-emerald-800">Amount Paid: ₹{Number(invoice.total).toLocaleString('en-IN')}</p>
                <p className="text-[11px] text-emerald-600">Paid on {invoice.paymentDate} via {invoice.paymentMethod}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-slate-100 text-center text-[11px] text-slate-400">
          Generated automatically by Freelancer Invoice & Client Management System. Thank you for your partnership!
        </div>
      </div>
    </div>
  );
}
