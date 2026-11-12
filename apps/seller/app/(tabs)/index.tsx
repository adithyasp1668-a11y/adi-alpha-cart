import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, formatCurrency } from '@alpha-cart/shared-config';
import { mockStore } from '@alpha-cart/api-client';
import { Shop } from '@alpha-cart/shared-types';

export default function SellerDashboardScreen() {
  const router = useRouter();
  const [shop, setShop] = useState<Shop | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const update = () => {
      const s = mockStore.getShopById('shop-spice-haven') || mockStore.getShops()[0];
      setShop(s);
      if (s) setIsOpen(s.isOpen);
    };
    update();
    return mockStore.subscribe(update);
  }, []);

  const handleToggleOpen = (val: boolean) => {
    setIsOpen(val);
    if (shop) {
      mockStore.toggleShopOpen(shop.id, val);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.welcomeRow}>
            <Text style={styles.welcomeText}>Hi, {shop?.name || 'Spice Haven'}</Text>
            <Ionicons name="sparkles" size={18} color="#F59E0B" />
          </View>
          <Text style={styles.shopTypeLabel}>{shop?.businessTypeLabel || 'Restaurant Outlet'}</Text>
        </View>

        <TouchableOpacity style={styles.bellBtn} onPress={() => router.push('/(tabs)/orders')}>
          <Ionicons name="notifications-outline" size={22} color="#0F172A" />
          <View style={styles.bellDot} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Shop Open / Close Bar */}
        <View style={[styles.shopStatusCard, isOpen ? styles.shopStatusOpen : styles.shopStatusClosed]}>
          <View style={styles.statusInfo}>
            <View style={[styles.statusDot, { backgroundColor: isOpen ? '#10B981' : '#EF4444' }]} />
            <Text style={styles.statusText}>
              {isOpen ? 'Your Shop is OPEN for orders' : 'Your Shop is CLOSED'}
            </Text>
          </View>
          <Switch
            value={isOpen}
            onValueChange={handleToggleOpen}
            trackColor={{ false: '#CBD5E1', true: '#86EFAC' }}
            thumbColor={isOpen ? '#16A34A' : '#94A3B8'}
          />
        </View>

        {/* Today's Earnings Card (Exact match to reference mockup) */}
        <TouchableOpacity
          style={styles.earningsCard}
          activeOpacity={0.9}
          onPress={() => router.push('/earnings')}
        >
          <View style={styles.earningsLeft}>
            <Text style={styles.earningsLabel}>Today's Earnings</Text>
            <Text style={styles.earningsValue}>{formatCurrency(5420)}</Text>
            <View style={styles.trendRow}>
              <Ionicons name="trending-up" size={14} color="#15803D" />
              <Text style={styles.trendText}>+12% from yesterday</Text>
            </View>
          </View>

          {/* Mini Bar Chart simulation */}
          <View style={styles.miniChart}>
            <View style={[styles.chartBar, { height: 18 }]} />
            <View style={[styles.chartBar, { height: 28 }]} />
            <View style={[styles.chartBar, { height: 22 }]} />
            <View style={[styles.chartBar, { height: 42 }]} />
            <View style={[styles.chartBar, { height: 35 }]} />
            <View style={[styles.chartBar, { height: 50, backgroundColor: '#FFFFFF' }]} />
          </View>
        </TouchableOpacity>

        {/* Order Status Counters Row (Exact match to reference mockup) */}
        <View style={styles.orderCountersRow}>
          <TouchableOpacity
            style={styles.counterCard}
            onPress={() => router.push('/(tabs)/orders')}
          >
            <Text style={styles.counterNumber}>5</Text>
            <Text style={styles.counterLabel}>New Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.counterCard}
            onPress={() => router.push('/(tabs)/orders')}
          >
            <Text style={styles.counterNumber}>2</Text>
            <Text style={styles.counterLabel}>Preparing</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.counterCard}
            onPress={() => router.push('/(tabs)/orders')}
          >
            <Text style={styles.counterNumber}>1</Text>
            <Text style={styles.counterLabel}>Ready</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Action Tiles (Products, Earnings, Reports) */}
        <View style={styles.actionTilesRow}>
          <TouchableOpacity
            style={styles.actionTile}
            onPress={() => router.push('/(tabs)/products')}
          >
            <View style={[styles.tileIconWrap, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="cube-outline" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.tileTitle}>Products</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionTile}
            onPress={() => router.push('/earnings')}
          >
            <View style={[styles.tileIconWrap, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="bar-chart-outline" size={24} color="#16A34A" />
            </View>
            <Text style={styles.tileTitle}>Earnings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionTile}
            onPress={() => router.push('/reports')}
          >
            <View style={[styles.tileIconWrap, { backgroundColor: '#F3E8FF' }]}>
              <Ionicons name="pie-chart-outline" size={24} color="#9333EA" />
            </View>
            <Text style={styles.tileTitle}>Reports</Text>
          </TouchableOpacity>
        </View>

        {/* Boost Your Sales Banner (Exact match to reference mockup) */}
        <View style={styles.boostBanner}>
          <View style={styles.boostLeft}>
            <Text style={styles.boostTitle}>Boost Your Sales!</Text>
            <Text style={styles.boostSubtitle}>
              Create offers and attract more nearby customers.
            </Text>
          </View>
          <View style={styles.megaphoneWrap}>
            <Ionicons name="megaphone" size={32} color={COLORS.primary} />
          </View>
        </View>

        {/* Recent Store Orders snippet */}
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Active Orders</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/orders')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.recentOrderCard}
            onPress={() => router.push({ pathname: '/order/[id]', params: { id: 'ord-ac12348' } })}
          >
            <View style={styles.recentOrderTop}>
              <Text style={styles.recentOrderId}>#AC12348</Text>
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>NEW</Text>
              </View>
            </View>
            <Text style={styles.recentCustomer}>Customer: Rahul Kumar (2 items • ₹249)</Text>
            <View style={styles.quickActionRow}>
              <TouchableOpacity
                style={styles.quickAcceptBtn}
                onPress={() => router.push({ pathname: '/order/[id]', params: { id: 'ord-ac12348' } })}
              >
                <Text style={styles.quickAcceptText}>Review & Accept</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
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
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  headerLeft: {
    gap: 4,
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  shopTypeLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  bellDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  shopStatusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  shopStatusOpen: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  shopStatusClosed: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  earningsCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  earningsLeft: {
    gap: 6,
  },
  earningsLabel: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    fontWeight: '600',
  },
  earningsValue: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
  miniChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    height: 50,
  },
  chartBar: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 3,
  },
  orderCountersRow: {
    flexDirection: 'row',
    gap: 12,
  },
  counterCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 4,
  },
  counterNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  counterLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  actionTilesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionTile: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  tileIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  boostBanner: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boostLeft: {
    flex: 1,
    paddingRight: 10,
    gap: 4,
  },
  boostTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },
  boostSubtitle: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 16,
  },
  megaphoneWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentSection: {
    gap: 10,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  recentOrderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  recentOrderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentOrderId: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  newBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  newBadgeText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
  },
  recentCustomer: {
    fontSize: 13,
    color: '#64748B',
  },
  quickActionRow: {
    marginTop: 4,
  },
  quickAcceptBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  quickAcceptText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
