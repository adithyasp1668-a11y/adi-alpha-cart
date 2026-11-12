import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CATEGORIES_DATA, formatCurrency } from '@alpha-cart/shared-config';
import { mockStore } from '@alpha-cart/api-client';
import { Product, Shop } from '@alpha-cart/shared-types';

const { width } = Dimensions.get('window');

export default function CustomerHomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    const updateData = () => {
      setProducts(mockStore.getProducts());
      setShops(mockStore.getShops());
    };
    updateData();
    const unsub = mockStore.subscribe(updateData);
    return unsub;
  }, []);

  const handleAddToCart = (product: Product) => {
    mockStore.addToCart(product, 1);
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoRow}>
            <View style={styles.logoBadge}>
              <Ionicons name="cart" size={18} color="#FFFFFF" />
            </View>
            <Text style={styles.logoText}>Alpha Cart</Text>
          </View>
          <TouchableOpacity
            style={styles.locationDropdown}
            onPress={() => router.push('/location')}
          >
            <Ionicons name="location" size={14} color={COLORS.primary} />
            <Text style={styles.locationText}>Bengaluru, Karnataka</Text>
            <Ionicons name="chevron-down" size={14} color="#64748B" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.notificationBtn} onPress={() => router.push('/orders')}>
          <Ionicons name="notifications-outline" size={22} color="#1E293B" />
          <View style={styles.unreadDot} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for groceries, food, fitness..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.searchAction}>
            <Ionicons name="mic-outline" size={18} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Hero Promo Banner (Exact match to reference mockup) */}
        <TouchableOpacity
          style={styles.heroBanner}
          activeOpacity={0.9}
          onPress={() => router.push('/offers')}
        >
          <View style={styles.bannerTextCol}>
            <Text style={styles.bannerHeading}>Up to 40% OFF</Text>
            <Text style={styles.bannerSubheading}>On Your First Order</Text>
            <View style={styles.bannerArrowCircle}>
              <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
            </View>
          </View>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80' }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </TouchableOpacity>

        {/* 4 Main Categories Grid (Exact pastel theme matching reference) */}
        <View style={styles.categoriesSection}>
          <View style={styles.categoriesRow}>
            {CATEGORIES_DATA.map((cat) => {
              const iconMap: Record<string, any> = {
                grocery: 'basket',
                food: 'restaurant',
                fitness: 'barbell',
                disposable: 'layers',
              };

              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.categoryTile, { backgroundColor: cat.lightBgColor }]}
                  activeOpacity={0.85}
                  onPress={() => {
                    if (cat.slug === 'food') {
                      router.push('/food');
                    } else {
                      router.push({ pathname: '/(tabs)/categories', params: { selected: cat.slug } });
                    }
                  }}
                >
                  <View style={[styles.catIconWrap, { backgroundColor: cat.accentColor }]}>
                    <Ionicons name={iconMap[cat.slug] || 'grid'} size={20} color="#FFFFFF" />
                  </View>
                  <Text style={styles.categoryTitle}>{cat.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Offers for You */}
        <View style={styles.offersHeader}>
          <Text style={styles.sectionHeading}>Offers for You</Text>
          <TouchableOpacity onPress={() => router.push('/offers')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.offersRow}>
          <TouchableOpacity
            style={[styles.offerCard, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}
            onPress={() => router.push('/offers')}
          >
            <View style={styles.offerBadgeWrap}>
              <Text style={[styles.offerBadge, { color: '#047857' }]}>FLAT ₹50 OFF</Text>
            </View>
            <Text style={styles.offerDesc}>On Grocery Orders above ₹299</Text>
            <Text style={styles.offerCode}>Use Code: GROCERY50</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.offerCard, { backgroundColor: '#F5F3FF', borderColor: '#DDD6FE' }]}
            onPress={() => router.push('/offers')}
          >
            <View style={styles.offerBadgeWrap}>
              <Text style={[styles.offerBadge, { color: '#6D28D9' }]}>BUY 2 GET 1</Text>
            </View>
            <Text style={styles.offerDesc}>On Fitness Supplements & Gear</Text>
            <Text style={styles.offerCode}>Use Code: FITPOWER</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Featured Products / Quick Picks */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>Popular Near You</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/categories')}>
            <Text style={styles.viewAllText}>See More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productsGrid}>
          {products.slice(0, 4).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.productCard}
              activeOpacity={0.9}
              onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
            >
              <View style={styles.productImgWrapper}>
                <Image source={{ uri: item.image }} style={styles.productImg} />
                {item.discountPercent ? (
                  <View style={styles.discountTag}>
                    <Text style={styles.discountTagText}>{item.discountPercent}% OFF</Text>
                  </View>
                ) : null}
                {!item.isAvailable && (
                  <View style={styles.outOfStockOverlay}>
                    <Text style={styles.outOfStockText}>Out of Stock</Text>
                  </View>
                )}
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productCategory}>{item.categoryName}</Text>
                <Text style={styles.productName} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.productUnit}>{item.unit}</Text>

                <View style={styles.productPriceRow}>
                  <View>
                    <Text style={styles.productPrice}>{formatCurrency(item.price)}</Text>
                    {item.originalPrice ? (
                      <Text style={styles.originalPrice}>{formatCurrency(item.originalPrice)}</Text>
                    ) : null}
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.addButton,
                      !item.isAvailable && styles.addButtonDisabled,
                    ]}
                    disabled={!item.isAvailable}
                    onPress={() => handleAddToCart(item)}
                  >
                    <Ionicons name="add" size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  headerLeft: {
    gap: 4,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoBadge: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  locationDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  unreadDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    height: 48,
    marginTop: 14,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  searchAction: {
    padding: 4,
  },
  heroBanner: {
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FFEDD5',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  bannerTextCol: {
    flex: 1,
    gap: 4,
  },
  bannerHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  bannerSubheading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  bannerArrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
  },
  categoriesSection: {
    marginTop: 20,
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  categoryTile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
  },
  catIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
  },
  offersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 14,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  offersRow: {
    gap: 12,
  },
  offerCard: {
    width: 220,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
  },
  offerBadgeWrap: {
    marginBottom: 6,
  },
  offerBadge: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  offerDesc: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  offerCode: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 6,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 52) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  productImgWrapper: {
    height: 120,
    backgroundColor: '#F8FAFC',
    position: 'relative',
  },
  productImg: {
    width: '100%',
    height: '100%',
  },
  discountTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  outOfStockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outOfStockText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  productInfo: {
    padding: 10,
    gap: 4,
  },
  productCategory: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 18,
    height: 36,
  },
  productUnit: {
    fontSize: 11,
    color: '#64748B',
  },
  productPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  originalPrice: {
    fontSize: 11,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#CBD5E1',
  },
});
