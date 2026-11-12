import React, { useState, useEffect } from 'react';
import { Settings, Shield, History, RefreshCw, CheckCircle2 } from 'lucide-react';
import { mockStore } from '@alpha-cart/api-client';
import { AuditLogItem } from '@alpha-cart/shared-types';

export const SystemSettingsModule: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogItem[]>(mockStore.getAuditLogs());
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [mockPayments, setMockPayments] = useState(true);

  useEffect(() => {
    const update = () => setLogs(mockStore.getAuditLogs());
    return mockStore.subscribe(update);
  }, []);

  const handleResetData = () => {
    mockStore.resetDemoData();
    alert('Mock state successfully reset to initial seed values!');
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">System Settings & Audit Log</h1>
        <p className="text-xs text-slate-500 font-medium">Platform configurations, environment controls, and audit trails</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Platform Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900">Platform Controls</h3>

          <div className="space-y-4 text-xs font-semibold">
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
              <div>
                <p className="text-slate-800">Maintenance Mode</p>
                <p className="text-[11px] text-slate-500 font-normal">Temporarily prevent customer checkouts</p>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
              <div>
                <p className="text-slate-800">Mock Payment Sandbox</p>
                <p className="text-[11px] text-slate-500 font-normal">Simulate instant UPI & Card payment confirmations</p>
              </div>
              <input
                type="checkbox"
                checked={mockPayments}
                onChange={(e) => setMockPayments(e.target.checked)}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={handleResetData}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" /> Reset All Demo Data
              </button>
            </div>
          </div>
        </div>

        {/* Audit Log (Exact requirement from Section 4) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">System Audit Trail</h3>
            <span className="text-[10px] font-bold text-slate-400">IMMUTABLE LOG</span>
          </div>

          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {logs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">{log.action}</span>
                  <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                </div>
                <p className="text-slate-600 text-[11px]">{log.details}</p>
                <p className="text-[10px] text-slate-400">By {log.adminUser} • IP {log.ipAddress}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
