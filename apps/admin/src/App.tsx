import React, { useState } from 'react';
import { Sidebar, AdminTab } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardOverview } from './modules/DashboardOverview';
import { OrdersModule } from './modules/OrdersModule';
import { SellersModule } from './modules/SellersModule';
import { DeliveryPartnersModule } from './modules/DeliveryPartnersModule';
import { ProductsModule } from './modules/ProductsModule';
import { PricingCommissionModule } from './modules/PricingCommissionModule';
import { ServiceZonesModule } from './modules/ServiceZonesModule';
import { PromotionsModule } from './modules/PromotionsModule';
import { CustomersModule } from './modules/CustomersModule';
import { FinancePnLModule } from './modules/FinancePnLModule';
import { ReportsAnalyticsModule } from './modules/ReportsAnalyticsModule';
import { UserAccessModule } from './modules/UserAccessModule';
import { SystemSettingsModule } from './modules/SystemSettingsModule';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickActionModal, setQuickActionModal] = useState<string | null>(null);

  const handleQuickAction = (action: string) => {
    if (action === 'add_seller') setCurrentTab('sellers');
    else if (action === 'add_product') setCurrentTab('products');
    else if (action === 'payouts') setCurrentTab('finance');
    else if (action === 'offers') setCurrentTab('promotions');
    else if (action === 'rates') setCurrentTab('pricing_commission');
    else if (action === 'reports') setCurrentTab('reports');
    else if (action === 'users') setCurrentTab('user_access');
    else if (action === 'settings') setCurrentTab('settings');
    else setQuickActionModal(action);
  };

  const renderModule = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardOverview
            onNavigateTab={setCurrentTab}
            onOpenQuickAction={handleQuickAction}
          />
        );
      case 'orders':
        return <OrdersModule />;
      case 'sellers':
        return <SellersModule />;
      case 'delivery_partners':
        return <DeliveryPartnersModule />;
      case 'products':
      case 'categories':
        return <ProductsModule />;
      case 'pricing_commission':
      case 'delivery_payouts':
        return <PricingCommissionModule />;
      case 'service_zones':
        return <ServiceZonesModule />;
      case 'promotions':
        return <PromotionsModule />;
      case 'customers':
        return <CustomersModule />;
      case 'finance':
        return <FinancePnLModule />;
      case 'reports':
        return <ReportsAnalyticsModule />;
      case 'user_access':
        return <UserAccessModule />;
      case 'settings':
        return <SystemSettingsModule />;
      default:
        return <DashboardOverview onNavigateTab={setCurrentTab} onOpenQuickAction={handleQuickAction} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        collapsed={sidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1 overflow-y-auto">
          {renderModule()}
        </main>
      </div>
    </div>
  );
}
