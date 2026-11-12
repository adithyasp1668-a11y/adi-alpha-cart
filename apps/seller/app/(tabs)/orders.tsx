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

export default function SellerOrdersTab() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'new' | 'preparing' | 'ready'>('new');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetch = () => {
      setOrders(mockStore.getOrders());
    };
    fetch();
    return mockStore.subscribe(fetch);
  }, []);

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'new') return o.status === 'new' || o.status === 'order_confirmed';
    if (activeTab === 'preparing') return o.status === 'preparing';
    if (activeTab === 'ready') return o.status === 'ready' || o.status === 'picked_up';
    return true;
  });

  const handleAccept = (orderId: string) => {
    mockStore.updateOrderStatus(orderId, 'preparing');
  };

  const handleReject = (orderId: string) => {
    mockStore.updateOrderStatus(orderId, 'cancelled');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
      </View>

      {/* Tabs (New (5), Preparing (2), Ready (1)) */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'new' && styles.tabBtnActive]}
          onPress={() => setActiveTab('new')}
        >
          <Text style={[styles.tabText, activeTab === 'new' && styles.tabTextActive]}>
            New ({orders.filter((o) => o.status === 'new' || o.status === 'order_confirmed').length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'preparing' && styles.tabBtnActive]}
          onPress={() => setActiveTab('preparing')}
        >
          <Text style={[styles.tabText, activeTab === 'preparing' && styles.tabTextActive]}>
            Preparing ({orders.filter((o) => o.status === 'preparing').length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'ready' && styles.tabBtnActive]}
          onPress={() => setActiveTab('ready')}
        >
          <Text style={[styles.tabText, activeTab === 'ready' && styles.tabTextActive]}>
            Ready ({orders.filter((o) => o.status === 'ready' || o.status === 'picked_up').length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {filteredOrders.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={44} color="#94A3B8" />
            <Text style={styles.emptyTitle}>No orders in {activeTab}</Text>
          </View>
        ) : (
          filteredOrders.map((ord) => (
            <TouchableOpacity
              key={ord.id}
              style={styles.orderCard}
              activeOpacity={0.9}
              onPress={() => router.push({ pathname: '/order/[id]', params: { id: ord.id } })}
            >
              <View style={styles.cardHeader}>
                <View style={styles.idWrap}>
                  <Text style={styles.orderNumber}>{ord.orderNumber}</Text>
                  <Text style={styles.orderTime}>{ord.createdAt}</Text>
                </View>
                <Text style={styles.orderSummary}>
                  {ord.items.length} items • {formatCurrency(ord.totalAmount)}
                </Text>
              </View>

              {/* Items preview */}
              <View style={styles.itemsPreview}>
                {ord.items.map((it, idx) => (
                  <Text key={idx} style={styles.itemText} numberOfLines={1}>
                    {it.quantity}x {it.productName}
                  </Text>
                ))}
              </View>

              {/* Actions row */}
              {activeTab === 'new' && (
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.rejectBtn}
                    onPress={() => handleReject(ord.id)}
                  >
                    <Text style={styles.rejectBtnText}>Reject</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.acceptBtn}
                    onPress={() => handleAccept(ord.id)}
                  >
                    <Text style={styles.acceptBtnText}>Accept</Text>
                  </TouchableOpacity>
                </View>
              )}

              {activeTab === 'preparing' && (
                <TouchableOpacity
                  style={styles.readyBtn}
                  onPress={() => mockStore.updateOrderStatus(ord.id, 'ready')}
                >
                  <Text style={styles.readyBtnText}>Mark as Ready for Pickup</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))
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
    paddingHorizontal: 14,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  scrollContent: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  idWrap: {
    gap: 2,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  orderTime: {
    fontSize: 11,
    color: '#94A3B8',
  },
  orderSummary: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  itemsPreview: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    gap: 4,
  },
  itemText: {
    fontSize: 12,
    color: '#475569',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  rejectBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectBtnText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '700',
  },
  acceptBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  acceptBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  readyBtn: {
    height: 44,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  readyBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 14,
    color: '#64748B',
  },
});
