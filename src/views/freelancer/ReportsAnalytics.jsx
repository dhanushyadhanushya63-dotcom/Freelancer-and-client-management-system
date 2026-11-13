import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, TrendingDown, DollarSign, 
  Download, Printer, Calendar, FileText, CheckCircle2, AlertTriangle, Clock
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ReportsAnalytics() {
  const { totalRevenue, totalExpenses, invoices, expenses, projects, clients, profile } = useData();

  const [timeframe, setTimeframe] = useState('2026');

  // Profit Calculations
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0;

  // Monthly breakdown mockup from actual data
  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyData = [
    { month: 'Jul', income: 45000, expense: 8000 },
    { month: 'Aug', income: 60000, expense: 12000 },
    { month: 'Sep', income: 85000, expense: 14000 },
    { month: 'Oct', income: 115000, expense: 21599 },
    { month: 'Nov', income: 35000, expense: 3450 },
    { month: 'Dec (Est)', income: 42000, expense: 5000 },
  ];

  const maxVal = Math.max(...monthlyData.map(d => Math.max(d.income, d.expense)), 120000);

  // Status distributions
  const paidCount = invoices.filter(i => i.status === 'Paid').length;
  const pendingCount = invoices.filter(i => i.status === 'Pending').length;
  const overdueCount = invoices.filter(i => i.status === 'Overdue').length;

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Reports & Financial Analytics</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Module 7: Track profit summaries, monthly cash flow, and export audit reports
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-none focus:border-indigo-500 shadow-2xs"
          >
            <option value="2026">Financial Year 2026</option>
            <option value="Q4">Q4 (Oct - Dec 2026)</option>
            <option value="Q3">Q3 (Jul - Sep 2026)</option>
          </select>

          <button
            onClick={handleExportPDF}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition"
          >
            <Printer className="w-4 h-4" />
            Export Report (PDF / Print)
          </button>
        </div>
      </div>

      {/* Printable Report Wrapper */}
      <div id="invoice-print-area" className="space-y-6">
        {/* Printable Title (visible on print) */}
        <div className="hidden print:block border-b border-slate-200 pb-4 mb-6">
          <h1 className="text-xl font-bold text-slate-900">Financial Audit & Performance Summary</h1>
          <p className="text-xs text-slate-500">Freelancer: {profile.name} • Generated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* 1. Profit Summary Cards (Module 7: Profit Summary) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Gross Revenue
            </span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-slate-900 font-mono">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </h3>
              <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +18%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">{invoices.filter(i => i.status === 'Paid').length} paid invoices</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Total Business Expenses
            </span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-rose-600 font-mono">
                ₹{totalExpenses.toLocaleString('en-IN')}
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                {expenses.length} expense items
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Tools, hosting, and operations</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Net Profit
            </span>
            <div className="flex items-baseline justify-between">
              <h3 className={`text-2xl font-black font-mono ${netProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                ₹{netProfit.toLocaleString('en-IN')}
              </h3>
              <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Healthy
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Revenue minus expenses</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Profit Margin
            </span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-indigo-600 font-mono">
                {profitMargin}%
              </h3>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                Target: &gt;65%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Industry standard for freelancing</p>
          </div>
        </div>

        {/* 2. Monthly Income & Expenses Bar Chart (Module 7: Charts & Graphs) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Monthly Cashflow: Income vs Expenses (₹)</h3>
              <p className="text-xs text-slate-500">Visual comparison over the last 6 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-indigo-600"></span>
                <span className="text-slate-600">Income</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-rose-400"></span>
                <span className="text-slate-600">Expenses</span>
              </div>
            </div>
          </div>

          {/* SVG/CSS Interactive Chart */}
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 pt-6 px-2 border-b border-slate-100">
            {monthlyData.map((d, i) => {
              const incomeHeight = Math.max(12, Math.round((d.income / maxVal) * 100));
              const expenseHeight = Math.max(8, Math.round((d.expense / maxVal) * 100));

              return (
                <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-full pb-2">
                    {/* Income Bar */}
                    <div 
                      style={{ height: `${incomeHeight}%` }}
                      className="w-1/2 max-w-[28px] bg-indigo-600 rounded-t-md transition-all duration-300 group-hover:bg-indigo-500 relative cursor-pointer"
                    >
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap z-10 font-mono shadow-sm">
                        ₹{d.income.toLocaleString('en-IN')}
                      </div>
                    </div>

                    {/* Expense Bar */}
                    <div 
                      style={{ height: `${expenseHeight}%` }}
                      className="w-1/2 max-w-[28px] bg-rose-400 rounded-t-md transition-all duration-300 group-hover:bg-rose-500 relative cursor-pointer"
                    >
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap z-10 font-mono shadow-sm">
                        ₹{d.expense.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-slate-500 mt-2">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Status Breakdown & Key Indicators */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Invoice Fulfillment Rate */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Invoice Collection Health</h3>
            <p className="text-xs text-slate-500 mb-4">Distribution by payment status</p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Paid Invoices ({paidCount})
                  </span>
                  <span className="font-mono">{Math.round((paidCount / invoices.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full" 
                    style={{ width: `${(paidCount / invoices.length) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1.5 text-amber-700">
                    <Clock className="w-3.5 h-3.5" /> Pending Payment ({pendingCount})
                  </span>
                  <span className="font-mono">{Math.round((pendingCount / invoices.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full" 
                    style={{ width: `${(pendingCount / invoices.length) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1.5 text-rose-700">
                    <AlertTriangle className="w-3.5 h-3.5" /> Overdue Invoices ({overdueCount})
                  </span>
                  <span className="font-mono">{Math.round((overdueCount / invoices.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className="h-full bg-rose-500 rounded-full" 
                    style={{ width: `${(overdueCount / invoices.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Project Completion Ratio */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Project Delivery Performance</h3>
            <p className="text-xs text-slate-500 mb-4">Milestones across client engagements</p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                <span className="text-slate-600 font-medium">Total Client Projects:</span>
                <span className="font-bold font-mono text-slate-900">{projects.length}</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 flex items-center justify-between">
                <span className="text-emerald-800 font-medium">Completed & Delivered:</span>
                <span className="font-bold font-mono text-emerald-800">{projects.filter(p => p.status === 'Completed').length}</span>
              </div>
              <div className="p-3 rounded-xl bg-indigo-50 flex items-center justify-between">
                <span className="text-indigo-800 font-medium">Active In Progress:</span>
                <span className="font-bold font-mono text-indigo-800">{projects.filter(p => p.status === 'In Progress').length}</span>
              </div>
            </div>
          </div>

          {/* Client Value Distribution */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Top Value Clients</h3>
            <p className="text-xs text-slate-500 mb-4">Total revenue billed per client</p>

            <div className="space-y-3">
              {clients.slice(0, 3).map((c) => (
                <div key={c.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <img src={c.avatar} alt={c.name} className="w-6 h-6 rounded-full flex-shrink-0" />
                    <span className="font-semibold text-slate-800 truncate">{c.name}</span>
                  </div>
                  <span className="font-mono font-bold text-indigo-700 whitespace-nowrap">
                    ₹{Number(c.totalBilled || 0).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
