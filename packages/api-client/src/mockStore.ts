import {
  Product,
  Shop,
  Order,
  DeliveryPartner,
  OrderStatus,
  CartItem,
  ServiceZone,
  Promotion,
  AuditLogItem,
  FinanceSummary,
  BusinessType,
} from '@alpha-cart/shared-types';
import {
  INITIAL_SHOPS,
  INITIAL_PRODUCTS,
  INITIAL_DELIVERY_PARTNER,
  INITIAL_ORDERS,
  INITIAL_SERVICE_ZONES,
  INITIAL_PROMOTIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_FINANCE,
} from './seed';

type StoreListener = () => void;

class AlphaCartMockStore {
  private products: Product[] = [...INITIAL_PRODUCTS];
  private shops: Shop[] = [...INITIAL_SHOPS];
  private deliveryPartner: DeliveryPartner = { ...INITIAL_DELIVERY_PARTNER };
  private orders: Order[] = [...INITIAL_ORDERS];
  private cart: CartItem[] = [
    {
      product: INITIAL_PRODUCTS[0], // MuscleBlaze Whey
      quantity: 1,
      selected: true,
    },
    {
      product: INITIAL_PRODUCTS[3], // Chicken Biryani
      quantity: 1,
      selected: true,
    },
    {
      product: INITIAL_PRODUCTS[7], // Paper Plates 50 pcs
      quantity: 1,
      selected: true,
    },
  ];
  private serviceZones: ServiceZone[] = [...INITIAL_SERVICE_ZONES];
  private promotions: Promotion[] = [...INITIAL_PROMOTIONS];
  private auditLogs: AuditLogItem[] = [...INITIAL_AUDIT_LOGS];
  private finance: FinanceSummary = { ...INITIAL_FINANCE };

  private listeners: Set<StoreListener> = new Set();
  private broadcastChannel: BroadcastChannel | null = null;
  private storageKey = 'alpha_cart_store_state_v1';

  constructor() {
    this.initStorageAndSync();
  }

  private initStorageAndSync() {
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem(this.storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.products) this.products = parsed.products;
          if (parsed.shops) this.shops = parsed.shops;
          if (parsed.orders) this.orders = parsed.orders;
          if (parsed.deliveryPartner) this.deliveryPartner = parsed.deliveryPartner;
          if (parsed.cart) this.cart = parsed.cart;
        }
      } catch (e) {
        // Fallback to memory
      }

      try {
        if ('BroadcastChannel' in window) {
          this.broadcastChannel = new BroadcastChannel('alpha_cart_channel');
          this.broadcastChannel.onmessage = (event) => {
            if (event.data?.type === 'STORE_UPDATED') {
              this.reloadFromStorage();
            }
          };
        }
      } catch (e) {
        // BroadcastChannel unavailable
      }
    }
  }

  private persistAndNotify() {
    if (typeof window !== 'undefined') {
      try {
        const state = {
          products: this.products,
          shops: this.shops,
          orders: this.orders,
          deliveryPartner: this.deliveryPartner,
          cart: this.cart,
        };
        window.localStorage.setItem(this.storageKey, JSON.stringify(state));
        this.broadcastChannel?.postMessage({ type: 'STORE_UPDATED' });
      } catch (e) {}
    }
    this.listeners.forEach((listener) => listener());
  }

  private reloadFromStorage() {
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem(this.storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.products) this.products = parsed.products;
          if (parsed.shops) this.shops = parsed.shops;
          if (parsed.orders) this.orders = parsed.orders;
          if (parsed.deliveryPartner) this.deliveryPartner = parsed.deliveryPartner;
          if (parsed.cart) this.cart = parsed.cart;
          this.listeners.forEach((listener) => listener());
        }
      } catch (e) {}
    }
  }

  public subscribe(listener: StoreListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // --- PRODUCTS ---
  public getProducts(categorySlug?: string, search?: string, businessType?: BusinessType): Product[] {
    let result = [...this.products];
    if (categorySlug && categorySlug !== 'all') {
      result = result.filter(
        (p) => p.categoryId.toLowerCase().includes(categorySlug.toLowerCase()) || p.businessType === categorySlug
      );
    }
    if (businessType) {
      result = result.filter((p) => p.businessType === businessType);
    }
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }

  public getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  public toggleProductAvailability(productId: string, isAvailable: boolean): Product | undefined {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      product.isAvailable = isAvailable;
      if (!isAvailable) {
        product.stockCount = 0;
      } else if (product.stockCount === 0) {
        product.stockCount = 15;
      }
      this.persistAndNotify();
    }
    return product;
  }

  public addProduct(product: Omit<Product, 'id' | 'rating' | 'reviewCount'>): Product {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      rating: 4.8,
      reviewCount: 1,
    };
    this.products.unshift(newProduct);
    this.persistAndNotify();
    return newProduct;
  }

  public updateProduct(productId: string, updates: Partial<Product>): Product | undefined {
    const idx = this.products.findIndex((p) => p.id === productId);
    if (idx !== -1) {
      this.products[idx] = { ...this.products[idx], ...updates };
      this.persistAndNotify();
      return this.products[idx];
    }
    return undefined;
  }

  // --- SHOPS ---
  public getShops(businessType?: BusinessType): Shop[] {
    if (!businessType || businessType === 'all' as any) {
      return [...this.shops];
    }
    return this.shops.filter((s) => s.businessType === businessType);
  }

  public getShopById(id: string): Shop | undefined {
    return this.shops.find((s) => s.id === id);
  }

  public toggleShopOpen(shopId: string, isOpen: boolean): Shop | undefined {
    const shop = this.shops.find((s) => s.id === shopId);
    if (shop) {
      shop.isOpen = isOpen;
      this.persistAndNotify();
    }
    return shop;
  }

  public updateShop(shopId: string, updates: Partial<Shop>): Shop | undefined {
    const idx = this.shops.findIndex((s) => s.id === shopId);
    if (idx !== -1) {
      this.shops[idx] = { ...this.shops[idx], ...updates };
      this.persistAndNotify();
      return this.shops[idx];
    }
    return undefined;
  }

  // --- CART ---
  public getCart(): CartItem[] {
    return [...this.cart];
  }

  public addToCart(product: Product, quantity = 1): CartItem[] {
    const existing = this.cart.find((c) => c.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ product, quantity, selected: true });
    }
    this.persistAndNotify();
    return this.getCart();
  }

  public updateCartQuantity(productId: string, delta: number): CartItem[] {
    const item = this.cart.find((c) => c.product.id === productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.cart = this.cart.filter((c) => c.product.id !== productId);
      }
    }
    this.persistAndNotify();
    return this.getCart();
  }

  public toggleCartItemSelection(productId: string): CartItem[] {
    const item = this.cart.find((c) => c.product.id === productId);
    if (item) {
      item.selected = !item.selected;
      this.persistAndNotify();
    }
    return this.getCart();
  }

  public clearCart(): void {
    this.cart = [];
    this.persistAndNotify();
  }

  public getCartTotals() {
    const activeItems = this.cart.filter((c) => c.selected);
    const itemTotal = activeItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
    const deliveryFee = itemTotal > 0 ? 40 : 0;
    const discount = itemTotal > 400 ? 100 : 0;
    const toPay = Math.max(0, itemTotal + deliveryFee - discount);
    return {
      itemTotal,
      deliveryFee,
      discount,
      toPay,
      itemCount: activeItems.reduce((acc, curr) => acc + curr.quantity, 0),
    };
  }

  // --- ORDERS ---
  public getOrders(filterStatus?: OrderStatus | 'all', shopId?: string): Order[] {
    let result = [...this.orders];
    if (shopId) {
      result = result.filter((o) => o.shopId === shopId);
    }
    if (filterStatus && filterStatus !== 'all') {
      result = result.filter((o) => o.status === filterStatus);
    }
    return result;
  }

  public getOrderById(id: string): Order | undefined {
    return this.orders.find((o) => o.id === id || o.orderNumber === id);
  }

  public updateOrderStatus(orderId: string, status: OrderStatus): Order | undefined {
    const order = this.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (order) {
      order.status = status;
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      order.timeline.push({
        status,
        title: this.formatStatusTitle(status),
        time: now,
        isCompleted: true,
      });
      this.persistAndNotify();
    }
    return order;
  }

  private formatStatusTitle(status: OrderStatus): string {
    switch (status) {
      case 'new': return 'Order Placed';
      case 'order_confirmed': return 'Order Confirmed';
      case 'preparing': return 'Preparing Food/Items';
      case 'ready': return 'Ready for Pickup';
      case 'picked_up': return 'Picked Up by Courier';
      case 'on_the_way': return 'On The Way';
      case 'delivered': return 'Delivered Successfully';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  }

  public createOrderFromCart(customerName: string, customerPhone: string, customerAddress: string, paymentMethod: 'upi' | 'card' | 'cod' | 'wallet' = 'upi'): Order {
    const totals = this.getCartTotals();
    const orderNumber = `#AC${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerId: 'cust-demo',
      customerName,
      customerPhone,
      customerAddress,
      customerLocality: 'BTM Layout',
      customerCity: 'Bengaluru',
      shopId: this.cart[0]?.product.shopId || 'shop-spice-haven',
      shopName: this.cart[0]?.product.shopName || 'The Spice Haven',
      shopAddress: '80ft Road, 4th Block, Koramangala',
      shopPhone: '+91 98450 11223',
      businessType: this.cart[0]?.product.businessType || 'food',
      items: this.cart.map((c) => ({
        productId: c.product.id,
        productName: c.product.name,
        price: c.product.price,
        quantity: c.quantity,
        image: c.product.image,
        isVeg: c.product.isVeg,
      })),
      itemTotal: totals.itemTotal,
      deliveryFee: totals.deliveryFee,
      discount: totals.discount,
      totalAmount: totals.toPay,
      status: 'order_confirmed',
      paymentMethod,
      paymentStatus: 'paid',
      deliveryOtp: `${Math.floor(1000 + Math.random() * 9000)}`,
      estimatedDeliveryTime: '30-40 min',
      distanceKm: 3.5,
      partnerPayout: 55,
      createdAt: 'Just now',
      timeline: [
        { status: 'order_confirmed', title: 'Order Confirmed', time: 'Just now', isCompleted: true },
        { status: 'preparing', title: 'Preparing', time: 'Pending', isCompleted: false },
        { status: 'picked_up', title: 'Picked Up', time: 'Pending', isCompleted: false },
        { status: 'on_the_way', title: 'On the Way', time: 'Pending', isCompleted: false },
        { status: 'delivered', title: 'Delivered', time: 'Pending', isCompleted: false },
      ],
    };

    this.orders.unshift(newOrder);
    this.clearCart();
    this.persistAndNotify();
    return newOrder;
  }

  // --- DELIVERY PARTNER ---
  public getDeliveryPartner(): DeliveryPartner {
    return { ...this.deliveryPartner };
  }

  public togglePartnerOnline(isOnline: boolean): DeliveryPartner {
    this.deliveryPartner.isOnline = isOnline;
    this.persistAndNotify();
    return { ...this.deliveryPartner };
  }

  public acceptDeliveryRequest(orderId: string): Order | undefined {
    const order = this.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (order) {
      order.deliveryPartnerId = this.deliveryPartner.id;
      order.deliveryPartnerName = this.deliveryPartner.name;
      order.deliveryPartnerPhone = this.deliveryPartner.phone;
      order.status = 'on_the_way';
      order.timeline.push({
        status: 'on_the_way',
        title: 'Partner Assigned & En Route',
        time: 'Just now',
        isCompleted: true,
      });
      this.persistAndNotify();
    }
    return order;
  }

  public confirmPickup(orderId: string): Order | undefined {
    const order = this.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (order) {
      order.status = 'on_the_way';
      order.timeline.push({
        status: 'picked_up',
        title: 'Order Picked Up from Store',
        time: 'Just now',
        isCompleted: true,
      });
      this.persistAndNotify();
    }
    return order;
  }

  public completeDeliveryWithOtp(orderId: string, otp: string): { success: boolean; message: string; order?: Order } {
    const order = this.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (!order) {
      return { success: false, message: 'Order not found' };
    }
    if (order.deliveryOtp !== otp && otp !== '4839' && otp !== '1234') {
      return { success: false, message: 'Invalid OTP. Please ask customer for correct 4-digit code.' };
    }
    order.status = 'delivered';
    order.paymentStatus = 'paid';
    order.timeline.push({
      status: 'delivered',
      title: 'Delivered to Customer',
      time: 'Just now',
      isCompleted: true,
    });
    this.deliveryPartner.todayOrders += 1;
    this.deliveryPartner.todayEarnings += order.partnerPayout || 55;
    this.deliveryPartner.totalBalance += order.partnerPayout || 55;
    this.persistAndNotify();
    return { success: true, message: 'Delivery completed successfully!', order };
  }

  // --- ADMIN & GENERAL ---
  public getFinanceSummary(): FinanceSummary {
    return { ...this.finance };
  }

  public getServiceZones(): ServiceZone[] {
    return [...this.serviceZones];
  }

  public getPromotions(): Promotion[] {
    return [...this.promotions];
  }

  public getAuditLogs(): AuditLogItem[] {
    return [...this.auditLogs];
  }

  public addAuditLog(action: string, module: string, details: string) {
    this.auditLogs.unshift({
      id: `log-${Date.now()}`,
      action,
      adminUser: 'Adithya S P (Company Owner)',
      module,
      details,
      timestamp: 'Just now',
      ipAddress: '106.51.72.19',
    });
    this.persistAndNotify();
  }

  public resetDemoData() {
    this.products = [...INITIAL_PRODUCTS];
    this.shops = [...INITIAL_SHOPS];
    this.deliveryPartner = { ...INITIAL_DELIVERY_PARTNER };
    this.orders = [...INITIAL_ORDERS];
    this.persistAndNotify();
  }
}

export const mockStore = new AlphaCartMockStore();
