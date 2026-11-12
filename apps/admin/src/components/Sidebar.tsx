import React from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Store,
  Bike,
  Package,
  Layers,
  Percent,
  Wallet,
  MapPin,
  Tag,
  Users,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Settings,
  Crown,
  ChevronRight,
} from 'lucide-react';

export type AdminTab =
  | 'dashboard'
  | 'orders'
  | 'sellers'
  | 'delivery_partners'
  | 'products'
  | 'categories'
  | 'pricing_commission'
  | 'delivery_payouts'
  | 'service_zones'
  | 'promotions'
  | 'customers'
  | 'finance'
  | 'reports'
  | 'user_access'
  | 'settings';

interface SidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab, collapsed }) => {
  const navItems: Array<{ id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'sellers', label: 'Sellers / Shops', icon: Store },
    { id: 'delivery_partners', label: 'Delivery Partners', icon: Bike },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'pricing_commission', label: 'Pricing & Commission', icon: Percent },
    { id: 'delivery_payouts', label: 'Delivery Payouts', icon: Wallet },
    { id: 'service_zones', label: 'Service Zones', icon: MapPin },
    { id: 'promotions', label: 'Promotions & Offers', icon: Tag },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'finance', label: 'Finance & P&L', icon: TrendingUp },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'user_access', label: 'User & Access Control', icon: ShieldCheck },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col h-screen select-none border-r border-slate-800 shrink-0">
      {/* Brand Header */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-800">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-[#FF8C38] flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20">
          <ShoppingBag className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-extrabold text-white text-base leading-tight tracking-tight">Alpha Cart</h1>
          <p className="text-[11px] font-medium text-orange-400">Admin / Company App</p>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white shadow-md shadow-orange-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* AlphaPass Loyalty Footer Card (Exact match to reference mockup) */}
      <div className="p-3 border-t border-slate-800">
        <div className="bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Crown className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-white leading-tight">AlphaPass</p>
              <p className="text-[10px] text-amber-300 font-medium">Membership & Loyalty</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </aside>
  );
};
