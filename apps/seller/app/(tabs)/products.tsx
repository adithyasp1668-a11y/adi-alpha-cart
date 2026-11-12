import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, formatCurrency } from '@alpha-cart/shared-config';
import { mockStore } from '@alpha-cart/api-client';
import { Product } from '@alpha-cart/shared-types';

export default function SellerProductsTab() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'available' | 'out_of_stock'>('all');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const update = () => {
      setProducts(mockStore.getProducts());
    };
    update();
    return mockStore.subscribe(update);
  }, []);

  const availableCount = products.filter((p) => p.isAvailable).length;
  const outOfStockCount = products.filter((p) => !p.isAvailable).length;

  const filteredProducts = products.filter((p) => {
    if (filter === 'available') return p.isAvailable;
    if (filter === 'out_of_stock') return !p.isAvailable;
    return true;
  });

  const handleToggle = (productId: string, currentValue: boolean) => {
    mockStore.toggleProductAvailability(productId, !currentValue);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Products</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tabBtn, filter === 'all' && styles.tabBtnActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.tabText, filter === 'all' && styles.tabTextActive]}>
            All ({products.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, filter === 'available' && styles.tabBtnActive]}
          onPress={() => setFilter('available')}
        >
          <Text style={[styles.tabText, filter === 'available' && styles.tabTextActive]}>
            Available ({availableCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, filter === 'out_of_stock' && styles.tabBtnActive]}
          onPress={() => setFilter('out_of_stock')}
        >
          <Text style={[styles.tabText, filter === 'out_of_stock' && styles.tabTextActive]}>
            Out of Stock ({outOfStockCount})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {filteredProducts.map((prod) => (
          <View key={prod.id} style={styles.productRow}>
            <Image source={{ uri: prod.image }} style={styles.productImg} />

            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={1}>{prod.name}</Text>
              <Text style={styles.productPrice}>{formatCurrency(prod.price)}</Text>
              <Text style={styles.productCategory}>{prod.categoryName}</Text>
            </View>

            {/* Availability Toggle (Syncs to Customer App!) */}
            <View style={styles.toggleWrap}>
              <Text style={[styles.toggleLabel, { color: prod.isAvailable ? '#10B981' : '#EF4444' }]}>
                {prod.isAvailable ? 'In Stock' : 'Out'}
              </Text>
              <Switch
                value={prod.isAvailable}
                onValueChange={() => handleToggle(prod.id, prod.isAvailable)}
                trackColor={{ false: '#CBD5E1', true: '#86EFAC' }}
                thumbColor={prod.isAvailable ? '#16A34A' : '#94A3B8'}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Sticky "+ Add New Item" Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.88}
          onPress={() => router.push('/add-product')}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.addBtnText}>Add New Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 8,
  },
  tabBtn: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 110,
    gap: 12,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  productImg: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
  },
  productInfo: {
    flex: 1,
    gap: 2,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },
  productCategory: {
    fontSize: 11,
    color: '#94A3B8',
  },
  toggleWrap: {
    alignItems: 'center',
    gap: 4,
  },
  toggleLabel: {
    fontSize: 10,
    fontWeight: '700',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
