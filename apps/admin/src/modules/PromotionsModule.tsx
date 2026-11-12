import React, { useState } from 'react';
import { mockStore } from '@alpha-cart/api-client';
import { Promotion } from '@alpha-cart/shared-types';
import { Tag, Plus, CheckCircle2 } from 'lucide-react';

export const PromotionsModule: React.FC = () => {
  const [promos, setPromos] = useState<Promotion[]>(mockStore.getPromotions());

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Promotions & Coupons</h1>
          <p className="text-xs text-slate-500 font-medium">Customer promotional campaigns, coupon codes, and cart discount rules</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promos.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 rounded-lg border-2 border-dashed border-orange-500 text-orange-600 font-black text-xs tracking-wider">
                {p.code}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                ACTIVE
              </span>
            </div>

            <h3 className="font-extrabold text-sm text-slate-900">{p.title}</h3>
            <p className="text-xs text-slate-500">{p.description}</p>

            <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600 space-y-1">
              <p><span className="font-semibold text-slate-800">Minimum Order:</span> ₹{p.minOrderValue}</p>
              <p><span className="font-semibold text-slate-800">Applies to:</span> {p.categoryApplicable?.toUpperCase()}</p>
              <p><span className="font-semibold text-slate-800">Valid Until:</span> {p.validUntil}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
