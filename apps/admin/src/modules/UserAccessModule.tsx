import React from 'react';
import { ShieldCheck, UserCheck, Key } from 'lucide-react';

export const UserAccessModule: React.FC = () => {
  const users = [
    {
      name: 'Adithya S P',
      role: 'Company Owner & Super Admin',
      email: 'adithya@alphacart.in',
      permissions: 'Full Access (All Modules, Financials & Audit)',
      status: 'Active',
    },
    {
      name: 'Suresh Kumar',
      role: 'Operations Head',
      email: 'suresh.ops@alphacart.in',
      permissions: 'Orders, Sellers, Delivery Fleet, Service Zones',
      status: 'Active',
    },
    {
      name: 'Nisha V',
      role: 'Finance Officer',
      email: 'nisha.finance@alphacart.in',
      permissions: 'Finance, Payouts, Commissions, Settlements',
      status: 'Active',
    },
    {
      name: 'Kavitha R',
      role: 'Customer Support Lead',
      email: 'kavitha.support@alphacart.in',
      permissions: 'Orders Read/Refund, Customer Care Tickets',
      status: 'Active',
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">User & Access Control</h1>
        <p className="text-xs text-slate-500 font-medium">Administrator permissions, staff roles, and credential management</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Admin Name</th>
              <th className="py-3.5 px-4">Role</th>
              <th className="py-3.5 px-4">Email</th>
              <th className="py-3.5 px-4">Assigned Permissions</th>
              <th className="py-3.5 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {users.map((u, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70">
                <td className="py-3.5 px-4 font-bold text-slate-900">{u.name}</td>
                <td className="py-3.5 px-4 font-semibold text-orange-600">{u.role}</td>
                <td className="py-3.5 px-4 text-slate-600">{u.email}</td>
                <td className="py-3.5 px-4 text-slate-500">{u.permissions}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
