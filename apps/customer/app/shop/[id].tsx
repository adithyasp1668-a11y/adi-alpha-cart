import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, formatCurrency } from '@alpha-cart/shared-config';
import { mockStore } from '@alpha-cart/api-client';
import { Shop, Product } from '@alpha-cart/shared-types';

export default function ShopDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [shop, setShop] = useState<Shop | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadShopAndProducts = () => {
      const currentShop = mockStore.getShopById(id || 'shop-spice-haven');
      setShop(currentShop);
      const allProds = mockStore.getProducts();
      const shopProds = allProds.filter((p) => p.shopId === (id || 'shop-spice-haven'));
      setProducts(shopProds.length > 0 ? shopProds : allProds.slice(3, 7));

      const cart = mockStore.getCart();
      const qtyMap: Record<string, number> = {};
      cart.forEach((item) => {
        qtyMap[item.product.id] = item.quantity;
      });
      setCartQuantities(qtyMap);
    };

    loadShopAndProducts();
    return mockStore.subscribe(loadShopAndProducts);
  }, [id]);

  if (!shop) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Shop not found</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAdd = (product: Product) => {
    mockStore.addToCart(product, 1);
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    mockStore.updateCartQuantity(productId, delta);
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{shop.name}</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/cart')} style={styles.headerBtn}>
          <Ionicons name="cart-outline" size={24} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Shop Banner Image */}
        <View style={styles.bannerWrapper}>
          <Image source={{ uri: shop.image }} style={styles.bannerImage} />
          {!shop.isOpen && (
            <View style={styles.closedOverlay}>
              <Text style={styles.closedOverlayText}>SHOP IS CURRENTLY CLOSED</Text>
            </View>
          )}
        </View>

        {/* Shop Meta Header */}
        <View style={styles.shopDetailsCard}>
          <View style={styles.shopTitleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.shopName}>{shop.name}</Text>
              <Text style={styles.cuisineText}>{shop.cuisineOrSpec}</Text>
              <Text style={styles.addressText}>{shop.address}, {shop.locality}</Text>
            </View>
            <View style={styles.ratingBadgeLarge}>
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text style={styles.ratingTextLarge}>{shop.rating}</Text>
              <Text style={styles.reviewsTextLarge}>({shop.reviewCount})</Text>
            </View>
          </View>

          {/* Quick Metrics Bar */}
          <View style={styles.metricsBar}>
            <View style={styles.metricItem}>
              <Ionicons name="time-outline" size={16} color={COLORS.primary} />
              <Text style={styles.metricLabel}>{shop.deliveryTimeEstimate}</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Ionicons name="location-outline" size={16} color={COLORS.primary} />
              <Text style={styles.metricLabel}>{shop.distanceKm} km away</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Ionicons name="bicycle-outline" size={16} color={COLORS.primary} />
              <Text style={styles.metricLabel}>Free above ₹199</Text>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Recommended Items ({products.length})</Text>
        </View>

        <View style={styles.menuList}>
          {products.map((item) => {
            const qty = cartQuantities[item.id] || 0;

            return (
              <View key={item.id} style={styles.menuItemCard}>
                <View style={styles.itemInfo}>
                  <View style={styles.vegIndicatorRow}>
                    <View
                      style={[
                        styles.dietMarker,
                        { borderColor: item.isVeg ? '#10B981' : '#EF4444' },
                      ]}
                    >
                      <View
                        style={[
                          styles.dietMarkerDot,
                          { backgroundColor: item.isVeg ? '#10B981' : '#EF4444' },
                        ]}
                      />
                    </View>
                    {item.badge && (
                      <View style={styles.itemBadge}>
                        <Text style={styles.itemBadgeText}>{item.badge}</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{formatCurrency(item.price)}</Text>
                  <Text style={styles.itemDesc} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>

                <View style={styles.itemActionCol}>
                  <Image source={{ uri: item.image }} style={styles.itemThumbnail} />

                  {!item.isAvailable ? (
                    <View style={styles.soldOutBadge}>
                      <Text style={styles.soldOutText}>Sold Out</Text>
                    </View>
                  ) : qty > 0 ? (
                    <View style={styles.qtyStepper}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => handleUpdateQty(item.id, -1)}
                      >
                        <Ionicons name="remove" size={14} color="#FFFFFF" />
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{qty}</Text>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => handleUpdateQty(item.id, 1)}
                      >
                        <Ionicons name="add" size={14} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.addItemBtn}
                      activeOpacity={0.85}
                      onPress={() => handleAdd(item)}
                    >
                      <Text style={styles.addItemBtnText}>ADD</Text>
                      <Ionicons name="add" size={14} color={COLORS.primary} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating View Cart bar if items added */}
      {mockStore.getCartTotals().itemCount > 0 && (
        <TouchableOpacity
          style={styles.floatingCartBar}
          activeOpacity={0.9}
          onPress={() => router.push('/(tabs)/cart')}
        >
          <View style={styles.cartBarInfo}>
            <Text style={styles.cartBarCount}>
              {mockStore.getCartTotals().itemCount} Items
            </Text>
            <Text style={styles.cartBarPrice}>
              {formatCurrency(mockStore.getCartTotals().toPay)}
            </Text>
          </View>
          <View style={styles.viewCartAction}>
            <Text style={styles.viewCartText}>View Cart</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#64748B',
  },
  backBtn: {
    marginTop: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backBtnText: {
    color: '#FFF',
    fontWeight: '700',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  bannerWrapper: {
    height: 180,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  closedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closedOverlayText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 1,
  },
  shopDetailsCard: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 8,
    borderBottomColor: '#F8FAFC',
    gap: 16,
  },
  shopTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  shopName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  cuisineText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  addressText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  ratingBadgeLarge: {
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  ratingTextLarge: {
    fontSize: 15,
    fontWeight: '800',
    color: '#B45309',
  },
  reviewsTextLarge: {
    fontSize: 10,
    color: '#92400E',
  },
  metricsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  metricDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#E2E8F0',
  },
  menuHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  menuList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  menuItemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 16,
  },
  itemInfo: {
    flex: 1,
    gap: 4,
  },
  vegIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  dietMarker: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dietMarkerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  itemBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  itemBadgeText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '700',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  itemDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
    marginTop: 2,
  },
  itemActionCol: {
    alignItems: 'center',
    position: 'relative',
    width: 90,
  },
  itemThumbnail: {
    width: 90,
    height: 90,
    borderRadius: 14,
  },
  addItemBtn: {
    position: 'absolute',
    bottom: -8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addItemBtnText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  soldOutBadge: {
    position: 'absolute',
    bottom: -8,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  soldOutText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
  },
  qtyStepper: {
    position: 'absolute',
    bottom: -8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 4,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qtyBtn: {
    padding: 2,
  },
  qtyText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
    minWidth: 16,
    textAlign: 'center',
  },
  floatingCartBar: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  cartBarInfo: {
    gap: 2,
  },
  cartBarCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.9,
  },
  cartBarPrice: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  viewCartAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  viewCartText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
