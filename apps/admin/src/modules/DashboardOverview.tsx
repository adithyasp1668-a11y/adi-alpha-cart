import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  IndianRupee,
  Layers,
  TrendingUp,
  Store,
  Bike,
  Calendar,
  MapPin,
  ArrowUpRight,
  ChevronRight,
  Clock,
  CheckCircle2,
  Hourglass,
  XCircle,
  AlertTriangle,
  PlusCircle,
  FileSpreadsheet,
  Settings,
  Users,
  ShieldCheck,
  Percent,
} from 'lucide-react';
import { mockStore } from '@alpha-cart/api-client';
import { Order, BusinessType } from '@alpha-cart/shared-types';

interface DashboardOverviewProps {
  onNavigateTab: (tab: any) => void;
  onOpenQuickAction: (action: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigateTab,
  onOpenQuickAction,
}) => {
  const [timeFilter, setTimeFilter] = useState('This Month');
  const [districtFilter, setDistrictFilter] = useState('All Districts');
  const [orders, setOrders] = useState<Order[]>(mockStore.getOrders());
  const [showSettlementModal, setShowSettlementModal] = useState(false);

  useEffect(() => {
    const update = () => {
      setOrders(mockStore.getOrders());
    };
    return mockStore.subscribe(update);
  }, []);

  const handleProcessSettlement = () => {
    mockStore.addAuditLog(
      'Settlement Batch Executed',
      'Finance & Settlements',
      'Processed seller payable ₹12,35,000 and delivery payout ₹5,46,200'
    );
    setShowSettlementModal(true);
  };

  const getCategoryBadge = (type: BusinessType) => {
    switch (type) {
      case 'food':
        return { label: 'Food', bg: 'bg-orange-50 text-orange-700 border-orange-200' };
      case 'grocery':
        return { label: 'Grocery', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'fitness':
        return { label: 'Gym', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'disposable':
        return { label: 'Use & Throw', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200' };
      default:
        return { label: type, bg: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'on_the_way':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Bike className="w-3 h-3" />
            On the Way
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            Delivered
          </span>
        );
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Hourglass className="w-3 h-3" />
            Preparing
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3 h-3" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-50 text-slate-700 border border-slate-200">
            <Clock className="w-3 h-3" />
            Confirmed
          </span>
        );
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Top Banner & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Business Overview</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time performance across Shivamogga & Bengaluru Urban
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Timeframe Filter */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option>This Month</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
          </div>

          {/* District Filter */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option>All Districts</option>
              <option>Bengaluru Urban</option>
              <option>Shivamogga</option>
            </select>
          </div>
        </div>
      </div>

      {/* 6 Key Stat Cards (Exact match to Image 4) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Orders */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-slate-900 leading-none">12,842</p>
            <div className="flex items-center gap-1 mt-2 text-[11px] font-bold text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.4%</span>
            </div>
          </div>
        </div>

        {/* Total Sales (GMV) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Total Sales (GMV)</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-slate-900 leading-none">₹24,56,320</p>
            <div className="flex items-center gap-1 mt-2 text-[11px] font-bold text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+22.1%</span>
            </div>
          </div>
        </div>

        {/* Platform Revenue */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Platform Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-slate-900 leading-none">₹3,68,450</p>
            <div className="flex items-center gap-1 mt-2 text-[11px] font-bold text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+20.3%</span>
            </div>
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Net Profit</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-slate-900 leading-none">₹1,82,300</p>
            <div className="flex items-center gap-1 mt-2 text-[11px] font-bold text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+17.6%</span>
            </div>
          </div>
        </div>

        {/* Active Shops */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Active Shops</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-slate-900 leading-none">1,248</p>
            <div className="flex items-center gap-1 mt-2 text-[11px] font-bold text-blue-600">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>58 New</span>
            </div>
          </div>
        </div>

        {/* Active Partners */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Active Partners</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Bike className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-slate-900 leading-none">426</p>
            <div className="flex items-center gap-1 mt-2 text-[11px] font-bold text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>312 Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Charts (Sales & Orders Trend, Revenue Breakdown, Profit & Loss) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales & Orders Trend (7 Cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">Sales & Orders Trend</h3>
              <p className="text-[11px] text-slate-400 font-medium">Daily platform GMV and order volumes</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]" />
                <span className="text-slate-600 text-[11px]">Sales (₹)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-slate-600 text-[11px]">Orders</span>
              </div>
            </div>
          </div>

          {/* SVG Visualized Trend Chart */}
          <div className="h-48 w-full flex items-end justify-between pt-6 px-2">
            {[
              { day: 'Mon', sales: 45, orders: 1200 },
              { day: 'Tue', sales: 55, orders: 1450 },
              { day: 'Wed', sales: 62, orders: 1600 },
              { day: 'Thu', sales: 70, orders: 1750 },
              { day: 'Fri', sales: 82, orders: 2100 },
              { day: 'Sat', sales: 95, orders: 2450 },
              { day: 'Sun', sales: 88, orders: 2280 },
            ].map((col, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full flex items-end justify-center h-36 relative">
                  {/* Sales Bar */}
                  <div
                    style={{ height: `${col.sales}%` }}
                    className="w-7 rounded-t-lg bg-gradient-to-t from-orange-500 to-amber-400 shadow-sm transition-all hover:opacity-90"
                  />
                  {/* Orders point indicator */}
                  <div
                    style={{ bottom: `${col.sales + 6}%` }}
                    className="absolute w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white"
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-500">{col.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Breakdown (3 Cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-800">Revenue Breakdown</h3>
            <p className="text-[11px] text-slate-400 font-medium">Category gross contributions</p>
          </div>

          {/* Visual Donut Ring */}
          <div className="relative flex items-center justify-center my-3">
            <svg className="w-36 h-36 transform -rotate-90">
              {/* Food 42% */}
              <circle
                cx="72"
                cy="72"
                r="54"
                stroke="#FF6B00"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray="142 340"
                strokeDashoffset="0"
              />
              {/* Grocery 28% */}
              <circle
                cx="72"
                cy="72"
                r="54"
                stroke="#10B981"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray="95 340"
                strokeDashoffset="-142"
              />
              {/* Gym 18% */}
              <circle
                cx="72"
                cy="72"
                r="54"
                stroke="#8B5CF6"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray="61 340"
                strokeDashoffset="-237"
              />
              {/* Use & Throw 12% */}
              <circle
                cx="72"
                cy="72"
                r="54"
                stroke="#06B6D4"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray="42 340"
                strokeDashoffset="-298"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xs font-black text-slate-800">₹3,68,450</span>
              <span className="text-[10px] text-slate-400 font-semibold">Revenue</span>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
              <span>Food (42%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>Grocery (28%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              <span>Gym & Fit (18%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#06B6D4]" />
              <span>Use & Throw (12%)</span>
            </div>
          </div>
        </div>

        {/* Profit & Loss Card (3 Cols, exact match to Image 4) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-800">Profit & Loss (This Month)</h3>
            <button
              onClick={() => onNavigateTab('finance')}
              className="text-[11px] font-bold text-orange-600 hover:text-orange-700 flex items-center gap-0.5"
            >
              View Details <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3.5 my-2">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Total Revenue
              </span>
              <span className="text-xs font-bold text-slate-900">₹3,68,450</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                Total Expenses
              </span>
              <span className="text-xs font-bold text-slate-900">₹1,86,150</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                Net Profit
              </span>
              <span className="text-sm font-black text-emerald-600">₹1,82,300</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-xl">
            <p className="text-[11px] text-emerald-800 font-semibold leading-relaxed">
              Operating margin currently stands at 49.5%, surpassing monthly fiscal target.
            </p>
          </div>
        </div>
      </div>

      {/* Row 3: Recent Orders Table & Service Zones & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders Table (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-800">Recent Orders</h3>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Shop / Restaurant</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {orders.slice(0, 5).map((ord) => {
                  const cat = getCategoryBadge(ord.businessType);
                  return (
                    <tr
                      key={ord.id}
                      onClick={() => onNavigateTab('orders')}
                      className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-bold text-slate-900">{ord.orderNumber}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border ${cat.bg}`}>
                          {cat.label}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-700 font-semibold">{ord.shopName}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">₹{ord.totalAmount.toLocaleString()}</td>
                      <td className="py-3 px-3">{getStatusBadge(ord.status)}</td>
                      <td className="py-3 px-4 text-right text-slate-400 font-semibold">{ord.createdAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Service Zones (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">Service Zones</h3>
              <p className="text-[11px] text-slate-400 font-medium">Active delivery polygons</p>
            </div>
            <button
              onClick={() => onNavigateTab('service_zones')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              Manage Zones <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Map Preview Graphic */}
          <div className="h-44 bg-slate-100 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-200">
            {/* Visual map roads */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Shivamogga Polygon Marker */}
            <div className="absolute left-10 top-8 bg-purple-500/20 border-2 border-purple-500 rounded-2xl p-2.5 flex items-center gap-2 backdrop-blur-sm shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-ping" />
              <div>
                <p className="text-[11px] font-extrabold text-purple-900 leading-tight">Shivamogga</p>
                <p className="text-[9px] text-purple-700 font-bold">42 Shops Active</p>
              </div>
            </div>

            {/* Bengaluru Urban Marker */}
            <div className="absolute right-10 bottom-8 bg-orange-500/20 border-2 border-orange-500 rounded-2xl p-2.5 flex items-center gap-2 backdrop-blur-sm shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-ping" />
              <div>
                <p className="text-[11px] font-extrabold text-orange-900 leading-tight">Bengaluru Urban</p>
                <p className="text-[9px] text-orange-700 font-bold">1,206 Shops Active</p>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Average Delivery Radius: 28 km</span>
            <span className="text-emerald-600 font-bold">● 100% Operational</span>
          </div>
        </div>
      </div>

      {/* Row 4: Quick Actions Grid */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-extrabold text-slate-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {[
            { label: 'Add Seller', icon: Store, bg: 'bg-amber-50 text-amber-700 hover:bg-amber-100', action: 'add_seller' },
            { label: 'Add Product', icon: PlusCircle, bg: 'bg-orange-50 text-orange-700 hover:bg-orange-100', action: 'add_product' },
            { label: 'Payouts', icon: IndianRupee, bg: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100', action: 'payouts' },
            { label: 'Offers', icon: Percent, bg: 'bg-pink-50 text-pink-700 hover:bg-pink-100', action: 'offers' },
            { label: 'Delivery Rates', icon: Bike, bg: 'bg-blue-50 text-blue-700 hover:bg-blue-100', action: 'rates' },
            { label: 'Reports', icon: FileSpreadsheet, bg: 'bg-purple-50 text-purple-700 hover:bg-purple-100', action: 'reports' },
            { label: 'Users & Roles', icon: Users, bg: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100', action: 'users' },
            { label: 'System Settings', icon: Settings, bg: 'bg-slate-100 text-slate-700 hover:bg-slate-200', action: 'settings' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => onOpenQuickAction(item.action)}
                className={`p-3.5 rounded-xl border border-transparent flex flex-col items-center justify-center gap-2 transition-all ${item.bg}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[11px] font-bold text-center leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 5: Settlement Summary Bar (Exact match to Image 4) */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-200 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B00] text-white flex items-center justify-center shadow-md shadow-orange-500/20">
            <IndianRupee className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 leading-tight">Settlement Summary</h4>
            <p className="text-xs text-slate-500 font-medium">Pending & Completed Payouts</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-8">
          <div>
            <p className="text-[11px] text-slate-400 font-semibold">Seller Payable</p>
            <p className="text-base font-black text-slate-900">₹12,35,000</p>
          </div>

          <div>
            <p className="text-[11px] text-slate-400 font-semibold">Delivery Payout</p>
            <p className="text-base font-black text-slate-900">₹5,46,200</p>
          </div>

          <div>
            <p className="text-[11px] text-slate-400 font-semibold">Pending Settlement</p>
            <p className="text-base font-black text-orange-600">₹12,350</p>
          </div>

          <button
            onClick={handleProcessSettlement}
            className="px-4 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/30 flex items-center gap-1.5 transition-all"
          >
            Process Settlements <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Row 6: Alerts & Activities (Exact match to Image 4) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-extrabold text-slate-800">Alerts & Activities</h3>
          <span className="text-xs font-bold text-slate-400">Live Stream</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/70 border border-amber-200/60">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <p className="text-xs font-semibold text-amber-900">12 seller verifications pending review</p>
            </div>
            <span className="text-[11px] font-medium text-amber-700">2 min ago</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <p className="text-xs font-semibold text-emerald-900">Payouts processed for 48 delivery partners</p>
            </div>
            <span className="text-[11px] font-medium text-emerald-700">15 min ago</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/70 border border-blue-200/60">
            <div className="flex items-center gap-3">
              <Store className="w-4 h-4 text-blue-600 shrink-0" />
              <p className="text-xs font-semibold text-blue-900">New shop registration - FitZone (Gym & Fitness)</p>
            </div>
            <span className="text-[11px] font-medium text-blue-700">32 min ago</span>
          </div>
        </div>
      </div>

      {/* Settlement Process Modal */}
      {showSettlementModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-black text-slate-900">Settlements Initiated!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Disbursements for 1,248 active sellers and 426 delivery partners sent to bank payout gateway.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Seller Payable:</span>
                <span className="font-bold text-slate-800">₹12,35,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Partner Payout:</span>
                <span className="font-bold text-slate-800">₹5,46,200</span>
              </div>
            </div>
            <button
              onClick={() => setShowSettlementModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#FF6B00] text-white text-xs font-bold hover:bg-orange-600 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
