import React, { useState } from 'react';
import { Percent, IndianRupee, Save, Bike } from 'lucide-react';

export const PricingCommissionModule: React.FC = () => {
  const [commissions, setCommissions] = useState({
    food: 10,
    grocery: 8,
    fitness: 12,
    disposable: 9,
  });

  const [deliveryRules, setDeliveryRules] = useState({
    basePayout: 40,
    perKmRate: 6,
    freeDeliveryThreshold: 299,
    surgeMultiplier: 1.25,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Pricing & Commissions</h1>
          <p className="text-xs text-slate-500 font-medium">Category take-rates and delivery partner compensation slabs</p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saved ? 'Saved!' : 'Save Pricing Rules'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Commission Rates */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Category Commission Rates</h3>
              <p className="text-xs text-slate-500">Platform commission deducted from merchant sales value</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Restaurant / Food Outlets:</span>
                <span className="text-orange-600">{commissions.food}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                value={commissions.food}
                onChange={(e) => setCommissions({ ...commissions, food: parseInt(e.target.value) })}
                className="w-full accent-orange-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Grocery Supermarkets:</span>
                <span className="text-emerald-600">{commissions.grocery}%</span>
              </div>
              <input
                type="range"
                min="3"
                max="15"
                value={commissions.grocery}
                onChange={(e) => setCommissions({ ...commissions, grocery: parseInt(e.target.value) })}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Gym & Fitness Stores:</span>
                <span className="text-purple-600">{commissions.fitness}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                value={commissions.fitness}
                onChange={(e) => setCommissions({ ...commissions, fitness: parseInt(e.target.value) })}
                className="w-full accent-purple-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Use & Throw Disposables:</span>
                <span className="text-cyan-600">{commissions.disposable}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                value={commissions.disposable}
                onChange={(e) => setCommissions({ ...commissions, disposable: parseInt(e.target.value) })}
                className="w-full accent-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Delivery Partner Compensation Formula */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Delivery Partner Payout Formula</h3>
              <p className="text-xs text-slate-500">Calculates partner payout per trip</p>
            </div>
          </div>

          <div className="space-y-4 text-xs font-medium">
            <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
              <span>Base Trip Earnings:</span>
              <span className="font-bold text-slate-900">₹{deliveryRules.basePayout} per trip</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
              <span>Distance Compensation:</span>
              <span className="font-bold text-slate-900">₹{deliveryRules.perKmRate} / km above 3 km</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
              <span>Customer Free Delivery Threshold:</span>
              <span className="font-bold text-slate-900">Above ₹{deliveryRules.freeDeliveryThreshold}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
              <span>Peak Rain / Night Surge Multiplier:</span>
              <span className="font-bold text-orange-600">{deliveryRules.surgeMultiplier}x</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
