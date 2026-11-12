import React, { useState, useEffect } from 'react';
import { mockStore } from '@alpha-cart/api-client';
import { Order, OrderStatus } from '@alpha-cart/shared-types';
import { Search, Filter, Eye, Download, CheckCircle, Clock } from 'lucide-react';

export const OrdersModule: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockStore.getOrders());
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const update = () => setOrders(mockStore.getOrders());
    return mockStore.subscribe(update);
  }, []);

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.shopName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Orders Management</h1>
          <p className="text-xs text-slate-500 font-medium">Real-time live multi-category customer orders across Bengaluru & Shivamogga</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by order ID, customer, store..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="preparing">Preparing</option>
            <option value="on_the_way">On The Way</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Store / Outlet</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{ord.orderNumber}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-800">{ord.customerName}</p>
                    <p className="text-[11px] text-slate-400">{ord.customerPhone}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800">{ord.shopName}</p>
                    <p className="text-[10px] text-orange-600 font-bold uppercase">{ord.businessType}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{ord.items.length} item(s)</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">₹{ord.totalAmount.toLocaleString()}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                      {ord.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-orange-700">
                      {ord.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">Order {selectedOrder.orderNumber}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-slate-400 font-semibold">Customer:</p>
                  <p className="font-bold text-slate-800">{selectedOrder.customerName}</p>
                  <p className="text-slate-500">{selectedOrder.customerPhone}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-semibold">Store:</p>
                  <p className="font-bold text-slate-800">{selectedOrder.shopName}</p>
                  <p className="text-slate-500">{selectedOrder.shopAddress}</p>
                </div>
              </div>

              <div>
                <p className="font-bold text-slate-800 mb-1">Ordered Items:</p>
                <div className="space-y-1">
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-slate-600 py-1 border-b border-slate-100">
                      <span>{it.quantity}x {it.productName}</span>
                      <span className="font-semibold text-slate-800">₹{(it.price * it.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between font-bold text-sm pt-2">
                <span>Total Amount:</span>
                <span className="text-orange-600">₹{selectedOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2.5 rounded-xl bg-[#FF6B00] text-white text-xs font-bold hover:bg-orange-600 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
