import React, { useState, useEffect } from 'react';
import { mockStore } from '@alpha-cart/api-client';
import { Shop, BusinessType } from '@alpha-cart/shared-types';
import { Store, CheckCircle2, XCircle, Search, Plus } from 'lucide-react';

export const SellersModule: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>(mockStore.getShops());
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const update = () => setShops(mockStore.getShops());
    return mockStore.subscribe(update);
  }, []);

  const handleToggleOpen = (shopId: string, current: boolean) => {
    mockStore.toggleShopOpen(shopId, !current);
  };

  const filtered = shops.filter((s) => {
    if (typeFilter !== 'all' && s.businessType !== typeFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.locality.toLowerCase().includes(q) || s.ownerName.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Sellers & Stores</h1>
          <p className="text-xs text-slate-500 font-medium">1,248 total onboarded merchant stores across Food, Grocery, Fitness & Disposables</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search store name, locality..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="all">All Categories</option>
            <option value="food">Food Outlets</option>
            <option value="grocery">Grocery</option>
            <option value="fitness">Gym & Fitness</option>
            <option value="disposable">Use & Throw</option>
          </select>
        </div>
      </div>

      {/* Grid of Stores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <div className="h-36 relative">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  s.isOpen ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {s.isOpen ? 'OPEN' : 'CLOSED'}
                </span>
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white uppercase backdrop-blur-sm">
                  {s.businessType}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">{s.name}</h3>
                    <p className="text-xs text-slate-500">{s.locality}, {s.city}</p>
                  </div>
                  <span className="text-xs font-bold text-amber-500">★ {s.rating}</span>
                </div>

                <div className="text-[11px] text-slate-500 space-y-1 pt-2 border-t border-slate-100">
                  <p><span className="font-semibold text-slate-700">Owner:</span> {s.ownerName} ({s.phone})</p>
                  <p><span className="font-semibold text-slate-700">Commission Slab:</span> {s.commissionRatePercent}%</p>
                  <p><span className="font-semibold text-slate-700">Timings:</span> {s.openingTime} - {s.closingTime}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Store
              </span>
              <button
                onClick={() => handleToggleOpen(s.id, s.isOpen)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  s.isOpen ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                }`}
              >
                {s.isOpen ? 'Force Close' : 'Reopen Store'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
