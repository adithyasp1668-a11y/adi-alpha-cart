import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, formatCurrency } from '@alpha-cart/shared-config';
import { mockStore } from '@alpha-cart/api-client';
import { Order } from '@alpha-cart/shared-types';

const { width } = Dimensions.get('window');

export default function DeliveryRequestScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [order, setOrder] = useState<Order | undefined>(undefined);

  useEffect(() => {
    const o = mockStore.getOrderById(id || 'ord-ac784326') || mockStore.getOrders()[0];
    setOrder(o);
  }, [id]);

  if (!order) {
    return (
      <View style={styles.centerContainer}>
        <Text>Request not found</Text>
      </View>
    );
  }

  const handleAccept = () => {
    mockStore.acceptDeliveryRequest(order.id);
    router.replace({ pathname: '/order/[id]', params: { id: order.id } });
  };

  const handleDecline = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Order</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category Pill */}
        <View style={styles.categoryBadgeWrap}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>Food Delivery</Text>
          </View>
        </View>

        {/* Payout Figure (Exact match to reference mockup) */}
        <View style={styles.payoutCard}>
          <Text style={styles.payoutAmount}>{formatCurrency(order.partnerPayout || 55)}</Text>
          <Text style={styles.payoutSub}>Estimated Partner Payout</Text>
          <View style={styles.distanceBadge}>
            <Ionicons name="location" size={14} color="#64748B" />
            <Text style={styles.distanceText}>Distance: {order.distanceKm} km</Text>
          </View>
        </View>

        {/* Mapped Route Preview (Exact match to reference mockup) */}
        <View style={styles.routeCard}>
          {/* Pickup Step */}
          <View style={styles.routeStop}>
            <View style={styles.pickupPinCircle}>
              <View style={styles.innerGreen} />
            </View>
            <View style={styles.stopInfo}>
              <Text style={styles.stopLabel}>Pickup</Text>
              <Text style={styles.stopName}>{order.shopName}</Text>
              <Text style={styles.stopAddress}>{order.shopAddress}</Text>
            </View>
          </View>

          <View style={styles.routeConnectingLine} />

          {/* Drop Step */}
          <View style={styles.routeStop}>
            <View style={styles.dropPinCircle}>
              <View style={styles.innerRed} />
            </View>
            <View style={styles.stopInfo}>
              <Text style={styles.stopLabel}>Drop</Text>
              <Text style={styles.stopName}>{order.customerName}</Text>
              <Text style={styles.stopAddress}>{order.customerAddress}</Text>
            </View>
          </View>
        </View>

        {/* Items Summary */}
        <View style={styles.itemsSummaryCard}>
          <Text style={styles.itemsHeading}>Order Items ({order.items.length})</Text>
          {order.items.map((it, idx) => (
            <Text key={idx} style={styles.itemRowText}>
              • {it.quantity}x {it.productName}
            </Text>
          ))}
        </View>
      </ScrollView>

      {/* Action Buttons: Accept / Decline (Exact match to reference mockup) */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.acceptButton}
          activeOpacity={0.88}
          onPress={handleAccept}
        >
          <Text style={styles.acceptButtonText}>Accept Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.declineButton}
          activeOpacity={0.85}
          onPress={handleDecline}
        >
          <Text style={styles.declineButtonText}>Decline</Text>
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
    gap: 20,
    paddingBottom: 120,
  },
  categoryBadgeWrap: {
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryBadgeText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  payoutCard: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  payoutAmount: {
    fontSize: 44,
    fontWeight: '800',
    color: '#0F172A',
  },
  payoutSub: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 6,
  },
  distanceText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  routeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    padding: 18,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  routeStop: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  pickupPinCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  innerGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
  },
  dropPinCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  innerRed: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
  },
  routeConnectingLine: {
    width: 2,
    height: 26,
    backgroundColor: '#E2E8F0',
    marginLeft: 10,
    marginVertical: -2,
  },
  stopInfo: {
    flex: 1,
    gap: 2,
  },
  stopLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  stopName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  stopAddress: {
    fontSize: 12,
    color: '#64748B',
  },
  itemsSummaryCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    gap: 6,
  },
  itemsHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  itemRowText: {
    fontSize: 12,
    color: '#64748B',
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
    gap: 10,
  },
  acceptButton: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  declineButton: {
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  declineButtonText: {
    color: '#64748B',
    fontSize: 15,
    fontWeight: '700',
  },
});
