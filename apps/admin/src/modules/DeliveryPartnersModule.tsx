import React, { useState, useEffect } from 'react';
import { mockStore } from '@alpha-cart/api-client';
import { DeliveryPartner } from '@alpha-cart/shared-types';
import { Bike, ShieldCheck, CheckCircle2, Search, Award } from 'lucide-react';

export const DeliveryPartnersModule: React.FC = () => {
  const [partner, setPartner] = useState<DeliveryPartner>(mockStore.getDeliveryPartner());

  useEffect(() => {
    const update = () => setPartner(mockStore.getDeliveryPartner());
    return mockStore.subscribe(update);
  }, []);

  const partnersList = [
    partner,
    {
      id: 'partner-anil-sharma',
      name: 'Anil Sharma',
      phone: '+91 98450 66778',
      email: 'anil.s@alphacart.in',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      rating: 4.9,
      reviewCount: 310,
      vehicleType: 'TVS iQube Electric',
      vehicleNumber: 'KA-01-EQ-9012',
      isOnline: true,
      kycStatus: 'verified' as const,
      todayEarnings: 820,
      todayOrders: 15,
      todayDistanceKm: 51.2,
      totalBalance: 3140,
      joinedDate: 'Jan 2024',
    },
    {
      id: 'partner-manjunath-k',
      name: 'Manjunath K',
      phone: '+91 99002 44331',
      email: 'manju.k@alphacart.in',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      rating: 4.7,
      reviewCount: 180,
      vehicleType: 'Hero Splendor Plus',
      vehicleNumber: 'KA-14-EA-2311',
      isOnline: false,
      kycStatus: 'verified' as const,
      todayEarnings: 450,
      todayOrders: 8,
      todayDistanceKm: 28.5,
      totalBalance: 1250,
      joinedDate: 'April 2024',
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Delivery Partners Fleet</h1>
        <p className="text-xs text-slate-500 font-medium">426 active delivery partners across Karnataka service zones</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {partnersList.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-sm text-slate-900">{p.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    p.isOnline ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {p.isOnline ? '● Online' : 'Offline'}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{p.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl text-center text-xs">
              <div>
                <p className="text-[10px] text-slate-400 font-semibold">Today</p>
                <p className="font-bold text-slate-900">₹{p.todayEarnings}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold">Orders</p>
                <p className="font-bold text-slate-900">{p.todayOrders}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold">Rating</p>
                <p className="font-bold text-amber-500">★ {p.rating}</p>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 space-y-1">
              <p><span className="font-semibold text-slate-700">Vehicle:</span> {p.vehicleType} ({p.vehicleNumber})</p>
              <p><span className="font-semibold text-slate-700">Wallet Balance:</span> ₹{p.totalBalance.toLocaleString()}</p>
              <p><span className="font-semibold text-slate-700">KYC Status:</span> <span className="text-emerald-600 font-bold">Approved & Verified</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
