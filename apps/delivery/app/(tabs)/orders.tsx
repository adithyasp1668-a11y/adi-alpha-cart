import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, formatCurrency } from '@alpha-cart/shared-config';
import { mockStore } from '@alpha-cart/api-client';
import { Order } from '@alpha-cart/shared-types';

export default function DeliveryOrdersTab() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetch = () => {
      setOrders(mockStore.getOrders());
    };
    fetch();
    return mockStore.subscribe(fetch);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Delivery Orders</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {orders.map((ord) => (
          <TouchableOpacity
            key={ord.id}
            style={styles.orderCard}
            activeOpacity={0.88}
            onPress={() => {
              if (ord.status === 'delivered') {
                router.push({ pathname: '/order/[id]', params: { id: ord.id } });
              } else {
                router.push({ pathname: '/order/[id]', params: { id: ord.id } });
              }
            }}
          >
            <View style={styles.topRow}>
              <View>
                <Text style={styles.orderNumber}>{ord.orderNumber}</Text>
                <Text style={styles.orderStore}>{ord.shopName} → {ord.customerLocality}</Text>
              </View>
              <Text style={styles.payoutText}>+{formatCurrency(ord.partnerPayout || 55)}</Text>
            </View>

            <View style={styles.statusRow}>
              <View style={[styles.statusBadge, { backgroundColor: ord.status === 'delivered' ? '#F1F5F9' : '#DCFCE7' }]}>
                <Text style={[styles.statusBadgeText, { color: ord.status === 'delivered' ? '#475569' : '#15803D' }]}>
                  {ord.status === 'delivered' ? 'DELIVERED' : 'EN ROUTE / ACTIVE'}
                </Text>
              </View>
              <Text style={styles.distLabel}>{ord.distanceKm} km</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  content: {
    padding: 20,
    gap: 14,
    paddingBottom: 40,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  orderStore: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  payoutText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#10B981',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  distLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
});
