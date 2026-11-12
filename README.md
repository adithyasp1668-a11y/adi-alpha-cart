# Alpha Cart – Multi-Category Delivery Platform Monorepo

> **Brand**: Alpha Cart  
> **Tagline**: *Your Everyday Delivery Partner*  
> **Primary Color**: `#FF6B00` (Orange) with clean white and pastel backgrounds  

---

## 🏗️ Monorepo Architecture

This monorepo houses **FOUR completely independent frontend applications** and **FOUR shared core packages**:

```
Alpha_cart/
├── apps/
│   ├── customer/            # App 1: Customer Shopping Experience (Expo, React Native, TypeScript, Expo Router)
│   ├── seller/              # App 2: Seller Merchant Portal (Expo, React Native, TypeScript, Expo Router)
│   ├── delivery/            # App 3: Delivery Partner Fleet App (Expo, React Native, TypeScript, Expo Router)
│   └── admin/               # App 4: Admin / Company Owner Web App (React, Vite, TypeScript, Tailwind CSS)
│
├── packages/
│   ├── shared-types/        # Shared TypeScript data models, interfaces, and enums
│   ├── shared-config/       # Brand constants, theme colors, category definitions, formatters
│   ├── design-system/       # Design tokens, typography, radii, spacing, shadows
│   └── api-client/          # Shared reactive mock store with state sync & subscribers
│
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

---

## 📱 Application Overview & Implemented Flows

### App 1 – Customer App (`apps/customer`)
*Matching Reference Image 1:*
- **Splash Screen** (`app/index.tsx`): Bold Alpha Cart branding, shopping cart logo, 10–30 min delivery badge, grocery bag graphic.
- **Onboarding Screen** (`app/onboarding.tsx`): *"Everything You Need In One App"*, delivery rider illustration, skip & get started flows.
- **Login / OTP** (`app/login.tsx`): Mobile number input (+91 98765 43210), Google sign-in, and 6-digit OTP modal verification.
- **Location Access** (`app/location.tsx`): Enable Location with pin pulse, "Use Current Location", manual area selector (BTM Layout, HSR Layout, Koramangala, Shivamogga).
- **Home Screen** (`app/(tabs)/index.tsx`): Top header with location dropdown, search with camera/mic, *"Up to 40% OFF"* promo banner, 4 category pastel tiles (Grocery, Food, Gym & Fitness, Use & Throw), offer cards (FLAT ₹50 OFF, BUY 2 GET 1), and popular products with direct add-to-cart.
- **All Categories** (`app/(tabs)/categories.tsx`): Rich visual category cards with item counts.
- **Food Section** (`app/food.tsx`): Veg / Non-Veg / All toggle pills, cuisine chips (Biryani, Pizza, Burger, Chinese), and nearby restaurant list (*The Spice Haven, Biryani House, Foodie Hub*).
- **Product Details** (`app/product/[id].tsx`): *MuscleBlaze Whey Protein (1 kg, Rich Chocolate)*, ₹1,999 (20% OFF), feature pills (24g Protein, 5.5g BCAAs, 30 Servings), quantity stepper, and live out-of-stock sync.
- **Shop Details** (`app/shop/[id].tsx`): *The Spice Haven* storefront banner, ratings, distance, delivery SLA, categorized menu, and quantity stepper.
- **Cart & Checkout** (`app/(tabs)/cart.tsx`): *My Cart (3)*, item checkboxes, quantity controls, promo code *ALPHAFIRST* (-₹100), Bill details (Item Total ₹2,397, Delivery Fee ₹40, Discount -₹100, To Pay ₹2,337), and checkout payment sheet (UPI, Card, COD).
- **Order Tracking** (`app/track/[id].tsx`): Order ID *#AC784326*, 5-stage status stepper (Order Confirmed, Preparing, Picked Up, On the Way ETA 11:20 AM, Delivered), real-time map route with moving courier scooter, and delivery partner card.
- **Profile & Settings** (`app/(tabs)/profile.tsx`): *Ravi Kumar* (+91 98765 43210), My Addresses, Orders, Wishlist, AlphaPass Membership, Saved Payments, Support, and Settings.
- **Additional Screens**: `wishlist.tsx`, `addresses.tsx`, `offers.tsx`, `support.tsx`.

---

### App 2 – Seller App (`apps/seller`)
*Matching Reference Image 2:*
- **Splash Screen** (`app/index.tsx`): Alpha Cart Seller branding, "Manage Your Business On The Go", storefront graphic.
- **Login & OTP** (`app/login.tsx`, `app/otp.tsx`): Phone login, 6-digit verification (3 8 4 2 7 1), and resend timer.
- **Business Type Selection** (`app/business-type.tsx`): Set Up Your Shop across Restaurant / Food Outlet, Grocery Store, Gym & Fitness Store, and Use & Throw Store.
- **Seller Dashboard** (`app/(tabs)/index.tsx`): "Hi, Spice Haven", shop open/close banner, Today's Earnings card (₹5,420, +12%), order counters (5 New, 2 Preparing, 1 Ready), quick action tiles (Products, Earnings, Reports), and "Boost Your Sales!" banner.
- **Shop Status** (`app/shop-status.tsx`): Storefront awning graphic, Shop Open toggle, Operating Hours (09:00 AM - 11:00 PM), and optional break-time controls.
- **Order Management** (`app/(tabs)/orders.tsx`): Filter tabs (New, Preparing, Ready), order cards with item lists and Accept/Reject buttons.
- **Order Details** (`app/order/[id].tsx`): #AC12348, Customer Rahul Kumar, call/chat actions, items breakdown, Accept and Mark as Ready triggers.
- **Product Management** (`app/(tabs)/products.tsx`): Tabs (All, Available, Out of Stock), item rows with reactive availability toggle switches that instantly sync to the customer app.
- **Add / Edit Product** (`app/add-product.tsx`): Photo upload with camera badge, Product Name, Category dropdown, Price (₹), and Availability toggle.
- **Earnings & Payouts** (`app/earnings.tsx`): Today / Week / Month tabs, Net Earnings ₹5,420, Orders completed (28), Sales value (₹18,960), Commission (10% -₹1,896), and "Withdraw to Bank" button.
- **Business Reports & Analytics** (`app/reports.tsx`): Last 7 Days range selector, bar chart (Mon - Sun), Total Orders (112), Total Sales (₹21,480), Commission (₹2,148), Net Earnings (₹19,332).

---

### App 3 – Delivery Partner App (`apps/delivery`)
*Matching Reference Image 3:*
- **Splash Screen** (`app/index.tsx`): Alpha Cart Delivery Partner brand, delivery rider on bike graphic.
- **Login & OTP** (`app/login.tsx`, `app/otp.tsx`): Mobile number login and 6-digit OTP verification (2 4 7 9 6 3).
- **Profile & KYC** (`app/kyc.tsx`): 4 verified milestones (Personal Details, Upload Documents, Vehicle Details, Face Verification) and submission flow.
- **Dashboard (Online)** (`app/(tabs)/index.tsx`): "Hi, Ravi", "You are Online" toggle switch, 4 stat cards (Today's Earnings ₹680, Orders 12, Distance 42.6 km, Rating 4.8 ★), and High Demand New Orders alert.
- **New Order Request** (`app/request/[id].tsx`): Food Delivery badge, estimated payout ₹55, distance 6.2 km, mapped pickup (The Spice Haven) & drop (Raghav Towers), Accept Order and Decline actions.
- **Order Details & Navigation** (`app/order/[id].tsx`): Order #AC78432, Pickup / Drop tabs, simulated turn-by-turn GPS Navigation, items accordion, and "Arrived at Pickup" action.
- **Pickup Confirmation** (`app/pickup-confirm.tsx`): Shopping bag graphic, "Have you picked up the order from The Spice Haven?", Yes / Not Yet actions.
- **Deliver with OTP** (`app/deliver-otp.tsx`): Smartphone illustration with OTP, 4-digit input [4] [8] [3] [9], Complete Delivery confirmation and instant wallet credit.
- **Earnings Summary** (`app/(tabs)/earnings.tsx`): Today / Week / Month tabs, Total Earnings ₹680, itemized breakdown (Base ₹520, Surge ₹80, Distance ₹40, Incentives ₹40).
- **Payout & Withdrawal** (`app/payout.tsx`): Available Balance ₹2,340, Withdraw to Bank, Payout History, Bank Account details.
- **Profile & Settings** (`app/(tabs)/profile.tsx`): Ravi Kumar, 4.8 ★, Vehicle info (Ather 450X KA-05-EM-4921), KYC verified status, Settings, Support.

---

### App 4 – Admin / Company Owner App (`apps/admin`)
*Matching Reference Image 4:*
- **Top Header**: Alpha Cart Admin branding, "Good Morning, Adithya (Company Owner)", global search bar (`⌘K`), live notification bell, and user avatar.
- **Sidebar**: 15 navigation modules + AlphaPass loyalty banner.
- **Business Overview Dashboard**:
  - Subtitle: *"Real-time performance across Shivamogga & Bengaluru Urban"*
  - District & timeframe filters (*This Month*, *All Districts*).
  - 6 Key KPI stat cards:
    - **Total Orders**: 12,842 (+18.4%)
    - **Total Sales (GMV)**: ₹24,56,320 (+22.1%)
    - **Platform Revenue**: ₹3,68,450 (+20.3%)
    - **Net Profit**: ₹1,82,300 (+17.6%)
    - **Active Shops**: 1,248 (58 New)
    - **Active Partners**: 426 (312 Online)
  - **Sales & Orders Trend**: Dual-axis bar and line chart across Mon - Sun.
  - **Revenue Breakdown**: Donut chart (Food 42%, Grocery 28%, Gym & Fitness 18%, Use & Throw 12%).
  - **Profit & Loss**: Revenue ₹3,68,450, Expenses ₹1,86,150, Net Profit ₹1,82,300.
  - **Recent Orders Table**: Real-time table with statuses (*On the Way, Delivered, Preparing, Cancelled*).
  - **Service Zones Visualizer**: Map widget for Shivamogga (42 Shops) and Bengaluru Urban (1,206 Shops).
  - **Quick Actions Grid**: Add Seller, Add Product, Payouts, Offers, Delivery Rates, Reports, Users & Roles, System Settings.
  - **Settlement Summary Bar**: Seller Payable ₹12,35,000, Delivery Payout ₹5,46,200, Pending Settlement ₹12,350, and batch "Process Settlements" trigger.
  - **Alerts & Activities Feed**: Live activity stream.
- **Full Management Modules**:
  - Orders Module (`src/modules/OrdersModule.tsx`)
  - Sellers Module (`src/modules/SellersModule.tsx`)
  - Delivery Partners Module (`src/modules/DeliveryPartnersModule.tsx`)
  - Products & Catalogs Module (`src/modules/ProductsModule.tsx`)
  - Pricing & Commissions Module (`src/modules/PricingCommissionModule.tsx`)
  - Service Zones Module (`src/modules/ServiceZonesModule.tsx`)
  - Promotions & Offers Module (`src/modules/PromotionsModule.tsx`)
  - Customers Directory Module (`src/modules/CustomersModule.tsx`)
  - Finance & P&L Statement Module (`src/modules/FinancePnLModule.tsx`)
  - Reports & Analytics Module (`src/modules/ReportsAnalyticsModule.tsx`)
  - User & Access Control Module (`src/modules/UserAccessModule.tsx`)
  - System Settings & Audit Log Module (`src/modules/SystemSettingsModule.tsx`)

---

## 🚀 Running the Applications

### 1. Admin App
```bash
pnpm dev:admin
```
Runs at `http://localhost:3000`

### 2. Customer App (Mobile / Web)
```bash
pnpm dev:customer
```

### 3. Seller App (Mobile / Web)
```bash
pnpm dev:seller
```

### 4. Delivery Partner App (Mobile / Web)
```bash
pnpm dev:delivery
```

### Typecheck All Projects
```bash
pnpm typecheck
```
