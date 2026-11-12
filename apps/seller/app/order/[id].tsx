import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, formatCurrency } from '@alpha-cart/shared-config';
import { mockStore } from '@alpha-cart/api-client';
import { Order } from '@alpha-cart/shared-types';

export default function SellerOrderDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [order, setOrder] = useState<Order | undefined>(undefined);

  useEffect(() => {
    const fetch = () => {
      const o = mockStore.getOrderById(id || 'ord-ac12348') || mockStore.getOrders()[1];
      setOrder(o);
    };
    fetch();
    return mockStore.subscribe(fetch);
  }, [id]);

  if (!order) {
    return (
      <View style={styles.centerContainer}>
        <Text>Order not found</Text>
      </View>
    );
  }

  const handleAccept = () => {
    mockStore.updateOrderStatus(order.id, 'preparing');
    Alert.alert('Order Accepted', 'Kitchen instructed to start preparing!');
  };

  const handleReject = () => {
    mockStore.updateOrderStatus(order.id, 'cancelled');
    Alert.alert('Order Rejected', 'Customer notified.');
    router.back();
  };

  const handleReady = () => {
    mockStore.updateOrderStatus(order.id, 'ready');
    Alert.alert('Marked as Ready', 'Delivery partner notified for pickup!');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order ID & Status Header */}
        <View style={styles.orderNumberCard}>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>
              {order.status === 'new' || order.status === 'order_confirmed'
                ? 'New Order'
                : order.status.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Customer Information (Exact match to reference mockup) */}
        <View style={styles.customerCard}>
          <View style={styles.customerLeft}>
            <View style={styles.custAvatar}>
              <Ionicons name="person" size={20} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.customerLabel}>Customer</Text>
              <Text style={styles.customerName}>{order.customerName}</Text>
              <Text style={styles.customerAddress}>{order.customerAddress}</Text>
            </View>
          </View>

          <View style={styles.custActions}>
            <TouchableOpacity
              style={styles.iconCircle}
              onPress={() => Alert.alert('Call Customer', `Dialing ${order.customerPhone}...`)}
            >
              <Ionicons name="call" size={18} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconCircle}
              onPress={() => Alert.alert('Chat', 'Opening Alpha Cart customer chat...')}
            >
              <Ionicons name="chatbubble" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Items List (Exact match to reference mockup) */}
        <View style={styles.itemsCard}>
          <Text style={styles.itemsHeading}>Items ({order.items.length})</Text>

          {order.items.map((it, idx) => (
            <View key={idx} style={styles.itemRow}>
              <View style={styles.itemNameCol}>
                <Text style={styles.itemName}>{it.productName}</Text>
                <Text style={styles.itemQty}>x{it.quantity}</Text>
              </View>
              <Text style={styles.itemTotal}>{formatCurrency(it.price * it.quantity)}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>{formatCurrency(order.totalAmount)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons Footer */}
      <View style={styles.footer}>
        {order.status === 'new' || order.status === 'order_confirmed' ? (
          <View style={styles.footerRow}>
            <TouchableOpacity
              style={styles.rejectBtn}
              activeOpacity={0.85}
              onPress={handleReject}
            >
              <Text style={styles.rejectBtnText}>Reject Order</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.acceptBtn}
              activeOpacity={0.88}
              onPress={handleAccept}
            >
              <Text style={styles.acceptBtnText}>Accept Order</Text>
            </TouchableOpacity>
          </View>
        ) : order.status === 'preparing' ? (
          <TouchableOpacity
            style={styles.readyBtn}
            activeOpacity={0.88}
            onPress={handleReady}
          >
            <Text style={styles.readyBtnText}>Mark Order as Ready</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.completedNotice}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.completedNoticeText}>
              Order is ready / handled by delivery partner
            </Text>
          </View>
        )}
      </View>
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
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  content: {
    padding: 20,
    gap: 16,
    paddingBottom: 100,
  },
  orderNumberCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  statusPill: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusPillText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  customerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  customerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  custAvatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  customerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  customerAddress: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  custActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 12,
  },
  itemsHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemNameCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  itemQty: {
    fontSize: 13,
    color: '#64748B',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 28,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  footerRow: {
    flexDirection: 'row',
    gap: 12,
  },
  rejectBtn: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectBtnText: {
    color: '#64748B',
    fontSize: 15,
    fontWeight: '700',
  },
  acceptBtn: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  acceptBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  readyBtn: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  readyBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  completedNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
  },
  completedNoticeText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '700',
  },
});
