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

export default function CustomerOrdersTab() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = () => {
      setOrders(mockStore.getOrders());
    };
    fetchOrders();
    return mockStore.subscribe(fetchOrders);
  }, []);

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'on_the_way':
        return { text: 'On the Way', bg: '#DCFCE7', color: '#15803D', icon: 'bicycle' };
      case 'preparing':
        return { text: 'Preparing', bg: '#FEF3C7', color: '#B45309', icon: 'hourglass-outline' };
      case 'delivered':
        return { text: 'Delivered', bg: '#F1F5F9', color: '#475569', icon: 'checkmark-circle' };
      case 'cancelled':
        return { text: 'Cancelled', bg: '#FEE2E2', color: '#EF4444', icon: 'close-circle' };
      default:
        return { text: 'Confirmed', bg: '#DBEAFE', color: '#1D4ED8', icon: 'receipt-outline' };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={48} color="#94A3B8" />
            <Text style={styles.emptyTitle}>No orders placed yet</Text>
          </View>
        ) : (
          orders.map((order) => {
            const badge = getStatusBadge(order.status);

            return (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                activeOpacity={0.88}
                onPress={() => router.push({ pathname: '/track/[id]', params: { id: order.orderNumber } })}
              >
                <View style={styles.orderCardHeader}>
                  <View>
                    <Text style={styles.shopName}>{order.shopName}</Text>
                    <Text style={styles.orderId}>{order.orderNumber} • {order.createdAt}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
                    <Text style={[styles.statusText, { color: badge.color }]}>{badge.text}</Text>
                  </View>
                </View>

                {/* Items summary */}
                <View style={styles.itemsSummary}>
                  {order.items.map((it, idx) => (
                    <Text key={idx} style={styles.itemSummaryText} numberOfLines={1}>
                      • {it.quantity}x {it.productName}
                    </Text>
                  ))}
                </View>

                <View style={styles.orderCardFooter}>
                  <Text style={styles.amountText}>{formatCurrency(order.totalAmount)}</Text>
                  <View style={styles.trackAction}>
                    <Text style={styles.trackActionText}>Track Order</Text>
                    <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
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
  scrollContent: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  orderCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  shopName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  orderId: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  itemsSummary: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    gap: 4,
  },
  itemSummaryText: {
    fontSize: 12,
    color: '#475569',
  },
  orderCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  trackAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trackActionText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 15,
    color: '#64748B',
  },
});
