import React from 'react';
import { TrendingUp, IndianRupee, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import { mockStore } from '@alpha-cart/api-client';

export const FinancePnLModule: React.FC = () => {
  const finance = mockStore.getFinanceSummary();

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Finance & Profit & Loss</h1>
          <p className="text-xs text-slate-500 font-medium">Income statement, gross merchandise value (GMV), platform fees and payouts</p>
        </div>

        <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all">
          <Download className="w-4 h-4" /> Export P&L Statement (PDF)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500">Gross Merchandise Value (GMV)</p>
          <p className="text-2xl font-black text-slate-900 mt-1">₹{finance.totalSalesGMV.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500">Platform Revenue</p>
          <p className="text-2xl font-black text-slate-900 mt-1">₹{finance.platformRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500">Total Operating Expenses</p>
          <p className="text-2xl font-black text-slate-900 mt-1">₹{finance.totalExpenses.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500">Net Operating Profit</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">₹{finance.netProfit.toLocaleString()}</p>
        </div>
      </div>

      {/* P&L Statement breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900">Fiscal Performance Summary (This Month)</h3>

        <div className="space-y-3 text-xs">
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="font-semibold text-slate-600">Merchant Commissions Earned (10% avg)</span>
            <span className="font-bold text-slate-900">₹2,45,632</span>
          </div>

          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="font-semibold text-slate-600">Customer Delivery Fees Collected</span>
            <span className="font-bold text-slate-900">₹1,22,818</span>
          </div>

          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="font-semibold text-slate-600">Delivery Partner Payouts Paid</span>
            <span className="font-bold text-red-600">-₹1,12,400</span>
          </div>

          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="font-semibold text-slate-600">Cloud & Server Infrastructure</span>
            <span className="font-bold text-red-600">-₹42,500</span>
          </div>

          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="font-semibold text-slate-600">Support & Operations Team Payroll</span>
            <span className="font-bold text-red-600">-₹31,250</span>
          </div>

          <div className="flex justify-between pt-2 text-sm font-black">
            <span>Net Monthly Surplus (Profit)</span>
            <span className="text-emerald-600">₹1,82,300</span>
          </div>
        </div>
      </div>
    </div>
  );
};
