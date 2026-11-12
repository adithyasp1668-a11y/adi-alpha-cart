import React, { useState } from 'react';
import { Users, Crown, ShoppingBag } from 'lucide-react';

export const CustomersModule: React.FC = () => {
  const customers = [
    {
      id: 'cust-1',
      name: 'Rahul Kumar',
      phone: '+91 98765 43210',
      email: 'rahul.kumar@gmail.com',
      ordersCount: 42,
      totalSpend: 18450,
      alphaPassMember: true,
      locality: 'HSR Layout, Bengaluru',
    },
    {
      id: 'cust-2',
      name: 'Deepak M',
      phone: '+91 98440 22331',
      email: 'deepak.m@outlook.com',
      ordersCount: 29,
      totalSpend: 11200,
      alphaPassMember: true,
      locality: 'Indiranagar, Bengaluru',
    },
    {
      id: 'cust-3',
      name: 'Pooja S',
      phone: '+91 98711 00223',
      email: 'pooja.sharma@gmail.com',
      ordersCount: 19,
      totalSpend: 8400,
      alphaPassMember: false,
      locality: 'Bellandur, Bengaluru',
    },
    {
      id: 'cust-4',
      name: 'Meena R',
      phone: '+91 94480 33219',
      email: 'meena.r@yahoo.com',
      ordersCount: 15,
      totalSpend: 6150,
      alphaPassMember: true,
      locality: 'Jayanagar, Shivamogga',
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customers Directory</h1>
        <p className="text-xs text-slate-500 font-medium">Customer accounts, lifetime order metrics, and AlphaPass memberships</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Customer Name</th>
              <th className="py-3.5 px-4">Contact</th>
              <th className="py-3.5 px-4">Locality</th>
              <th className="py-3.5 px-4">Total Orders</th>
              <th className="py-3.5 px-4">Total Spent</th>
              <th className="py-3.5 px-4">AlphaPass VIP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/70">
                <td className="py-3.5 px-4 font-bold text-slate-900">{c.name}</td>
                <td className="py-3.5 px-4 text-slate-600">{c.phone}</td>
                <td className="py-3.5 px-4 text-slate-500">{c.locality}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">{c.ordersCount} orders</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">₹{c.totalSpend.toLocaleString()}</td>
                <td className="py-3.5 px-4">
                  {c.alphaPassMember ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      <Crown className="w-3 h-3 text-amber-500" /> VIP Active
                    </span>
                  ) : (
                    <span className="text-slate-400 font-semibold">Standard</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
