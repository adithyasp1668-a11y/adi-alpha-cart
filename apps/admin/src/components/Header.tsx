import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
  onSearchClick?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  searchQuery = '',
  onSearchChange,
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left Greeting */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-bold text-slate-800">Good Morning, Adithya</h2>
            <span className="text-sm">👋</span>
          </div>
          <p className="text-[11px] font-medium text-slate-500">Company Owner • Alpha Cart</p>
        </div>
      </div>

      {/* Center Search (Exact match to reference mockup) */}
      <div className="flex-1 max-w-md mx-6">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            placeholder="Search orders, shops, products, users..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full pl-9 pr-12 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
          />
          <span className="absolute right-3 px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded text-[10px] font-bold">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right User & Notifications */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        <div className="h-7 w-[1px] bg-slate-200" />

        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
            alt="Adithya S P"
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-orange-500/20"
          />
          <div className="hidden md:block">
            <p className="text-xs font-bold text-slate-800 leading-tight">Adithya S P</p>
            <p className="text-[10px] text-slate-500 font-medium">Company Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
};
