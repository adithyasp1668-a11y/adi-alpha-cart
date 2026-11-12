import React, { useState } from 'react';
import { mockStore } from '@alpha-cart/api-client';
import { ServiceZone } from '@alpha-cart/shared-types';
import { MapPin, Plus, CheckCircle, Store, Bike } from 'lucide-react';

export const ServiceZonesModule: React.FC = () => {
  const [zones, setZones] = useState<ServiceZone[]>(mockStore.getServiceZones());

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Service Zones</h1>
          <p className="text-xs text-slate-500 font-medium">Operational delivery coverage regions and store polygons</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {zones.map((z) => (
          <div key={z.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">{z.name}</h3>
                  <p className="text-xs text-slate-500">{z.city}, {z.state}</p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700">
                ● Active Zone
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl text-xs text-center">
              <div>
                <p className="text-slate-400 font-semibold">Active Shops</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{z.activeShopsCount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Delivery Partners</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{z.activeDeliveryPartnersCount}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Max Radius</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{z.coverageRadiusKm} km</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
