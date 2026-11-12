import React from 'react';
import { BarChart3, TrendingUp, Download, Calendar } from 'lucide-react';

export const ReportsAnalyticsModule: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Reports & Analytics</h1>
          <p className="text-xs text-slate-500 font-medium">Platform conversion metrics, average delivery times, and fulfillment reports</p>
        </div>

        <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FF6B00] text-white text-xs font-bold shadow-md hover:bg-orange-600">
          <Download className="w-4 h-4" /> Export All Reports (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
          <h3 className="font-extrabold text-sm text-slate-800">Average Delivery Time</h3>
          <p className="text-2xl font-black text-slate-900">22.4 mins</p>
          <p className="text-[11px] text-emerald-600 font-bold">↓ 4.2 mins faster than SLA</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
          <h3 className="font-extrabold text-sm text-slate-800">Fulfillment Success Rate</h3>
          <p className="text-2xl font-black text-slate-900">98.6%</p>
          <p className="text-[11px] text-emerald-600 font-bold">1.4% cancellation rate</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
          <h3 className="font-extrabold text-sm text-slate-800">Average Order Value (AOV)</h3>
          <p className="text-2xl font-black text-slate-900">₹486</p>
          <p className="text-[11px] text-orange-600 font-bold">Fitness vertical highest at ₹1,850</p>
        </div>
      </div>
    </div>
  );
};
