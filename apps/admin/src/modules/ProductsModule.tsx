import React, { useState, useEffect } from 'react';
import { mockStore } from '@alpha-cart/api-client';
import { Product, BusinessType } from '@alpha-cart/shared-types';
import { Package, Search, Plus, CheckCircle, XCircle } from 'lucide-react';

export const ProductsModule: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockStore.getProducts());
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const update = () => setProducts(mockStore.getProducts());
    return mockStore.subscribe(update);
  }, []);

  const handleToggle = (prodId: string, current: boolean) => {
    mockStore.toggleProductAvailability(prodId, !current);
  };

  const filtered = products.filter((p) => {
    if (categoryFilter !== 'all' && p.businessType !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.shopName.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Products & Catalogs</h1>
          <p className="text-xs text-slate-500 font-medium">Cross-category catalog inventory across Grocery, Food, Fitness & Use & Throw</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="all">All Categories</option>
            <option value="fitness">Gym & Fitness</option>
            <option value="food">Food & Restaurant</option>
            <option value="grocery">Grocery</option>
            <option value="disposable">Use & Throw</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Item</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Store</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Toggle Availability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-slate-900">{p.name}</p>
                      <p className="text-[11px] text-slate-400">{p.unit}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                      {p.businessType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-semibold">{p.shopName}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">₹{p.price.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-bold">{p.stockCount} in stock</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.isAvailable ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {p.isAvailable ? 'Available' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleToggle(p.id, p.isAvailable)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        p.isAvailable
                          ? 'bg-red-50 text-red-600 hover:bg-red-100'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      {p.isAvailable ? 'Mark Out of Stock' : 'Mark Available'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
