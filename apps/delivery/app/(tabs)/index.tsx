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
import { DeliveryPartner } from '@alpha-cart/shared-types';

export default function DeliveryDashboardScreen() {
  const router = useRouter();
  const [partner, setPartner] = useState<DeliveryPartner>(mockStore.getDeliveryPartner());
  const [isOnline, setIsOnline] = useState(partner.isOnline);

  useEffect(() => {
    const update = () => {
      const p = mockStore.getDeliveryPartner();
      setPartner(p);
      setIsOnline(p.isOnline);
    };
    update();
    return mockStore.subscribe(update);
  }, []);

  const handleToggleOnline = (val: boolean) => {
    setIsOnline(val);
    mockStore.togglePartnerOnline(val);
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.nameRow}>
            <Text style={styles.welcomeText}>Hi, {partner.name.split(' ')[0]}</Text>
            <Text style={styles.waveEmoji}>👋</Text>
          </View>
          <View style={styles.statusPill}>
            <View style={[styles.statusDot, { backgroundColor: isOnline ? '#10B981' : '#EF4444' }]} />
            <Text style={styles.statusText}>
              {isOnline ? 'You are Online' : 'You are Offline'}
            </Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <Switch
            value={isOnline}
            onValueChange={handleToggleOnline}
            trackColor={{ false: '#CBD5E1', true: '#86EFAC' }}
            thumbColor={isOnline ? '#16A34A' : '#94A3B8'}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Offline Alert Banner */}
        {!isOnline && (
          <View style={styles.offlineWarning}>
            <Ionicons name="information-circle" size={20} color="#DC2626" />
            <Text style={styles.offlineWarningText}>
              Turn on toggle to start receiving delivery requests in Bengaluru.
            </Text>
          </View>
        )}

        {/* 4 Stat Cards (Exact match to reference mockup) */}
        <View style={styles.statsGrid}>
          {/* Card 1: Today's Earnings */}
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => router.push('/(tabs)/earnings')}
          >
            <Text style={styles.statLabel}>Today's Earnings</Text>
            <Text style={[styles.statValue, { color: COLORS.primary }]}>
              {formatCurrency(partner.todayEarnings)}
            </Text>
          </TouchableOpacity>

          {/* Card 2: Orders */}
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Orders</Text>
            <Text style={styles.statValue}>{partner.todayOrders}</Text>
          </View>

          {/* Card 3: Distance */}
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Distance</Text>
            <Text style={styles.statValue}>{partner.todayDistanceKm} km</Text>
          </View>

          {/* Card 4: Rating */}
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Rating</Text>
            <View style={styles.ratingValRow}>
              <Text style={styles.statValue}>{partner.rating}</Text>
              <Ionicons name="star" size={16} color="#F59E0B" />
            </View>
          </View>
        </View>

        {/* New Orders Banner (Exact match to reference mockup) */}
        <View style={styles.newOrdersBanner}>
          <View style={styles.bannerLeft}>
            <Text style={styles.bannerTitle}>New Orders</Text>
            <Text style={styles.bannerSub}>High demand near BTM & HSR Layout</Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>3</Text>
          </View>
        </View>

        {/* Live Incoming Order Request Card */}
        <View style={styles.incomingSection}>
          <Text style={styles.sectionTitle}>Available Delivery Request</Text>

          <TouchableOpacity
            style={styles.requestCard}
            activeOpacity={0.9}
            onPress={() => router.push({ pathname: '/request/[id]', params: { id: 'ord-ac784326' } })}
          >
            <View style={styles.requestHeader}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>Food Delivery</Text>
              </View>
              <Text style={styles.payoutEstimate}>{formatCurrency(55)}</Text>
            </View>

            <View style={styles.routePreview}>
              {/* Pickup Point */}
              <View style={styles.stopRow}>
                <View style={styles.pickupDot} />
                <View style={styles.stopDetails}>
                  <Text style={styles.stopType}>Pickup</Text>
                  <Text style={styles.stopName}>The Spice Haven • BTM Layout</Text>
                </View>
              </View>

              <View style={styles.routeConnector} />

              {/* Drop Point */}
              <View style={styles.stopRow}>
                <View style={styles.dropDot} />
                <View style={styles.stopDetails}>
                  <Text style={styles.stopType}>Drop</Text>
                  <Text style={styles.stopName}>Raghav Towers • HSR Layout</Text>
                </View>
              </View>
            </View>

            <View style={styles.requestFooter}>
              <View style={styles.distBadge}>
                <Ionicons name="navigate-outline" size={14} color="#64748B" />
                <Text style={styles.distText}>6.2 km total distance</Text>
              </View>

              <View style={styles.viewAction}>
                <Text style={styles.viewActionText}>View Details</Text>
                <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
              </View>
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
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  waveEmoji: {
    fontSize: 18,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  offlineWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 14,
    padding: 12,
  },
  offlineWarningText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  ratingValRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  newOrdersBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    borderRadius: 16,
    padding: 16,
  },
  bannerLeft: {
    gap: 2,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },
  bannerSub: {
    fontSize: 12,
    color: '#64748B',
  },
  countBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadgeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  incomingSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    gap: 14,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  payoutEstimate: {
    fontSize: 22,
    fontWeight: '800',
    color: '#10B981',
  },
  routePreview: {
    gap: 4,
  },
  stopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
  },
  dropDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
  },
  routeConnector: {
    width: 2,
    height: 16,
    backgroundColor: '#CBD5E1',
    marginLeft: 5,
    marginVertical: 2,
  },
  stopDetails: {
    flex: 1,
  },
  stopType: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  stopName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  requestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  distBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distText: {
    fontSize: 12,
    color: '#64748B',
  },
  viewAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewActionText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
