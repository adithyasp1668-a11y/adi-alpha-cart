import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, formatCurrency } from '@alpha-cart/shared-config';
import { mockStore } from '@alpha-cart/api-client';
import { Order } from '@alpha-cart/shared-types';

const { width } = Dimensions.get('window');

export default function OrderTrackingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [order, setOrder] = useState<Order | undefined>(undefined);

  useEffect(() => {
    const fetchOrder = () => {
      const ord = mockStore.getOrderById(id || 'ord-ac784326') || mockStore.getOrders()[0];
      setOrder(ord);
    };
    fetchOrder();
    return mockStore.subscribe(fetchOrder);
  }, [id]);

  if (!order) {
    return (
      <View style={styles.centerContainer}>
        <Text>Order not found</Text>
      </View>
    );
  }

  const steps = [
    { title: 'Order Confirmed', time: '10:24 AM', done: true },
    { title: 'Preparing', time: '10:30 AM', done: true },
    { title: 'Picked Up', time: '10:55 AM', done: true },
    { title: 'On the Way', time: 'ETA: 11:20 AM', active: true, done: false },
    { title: 'Delivered', time: 'Estimated 11:25 AM', done: false },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
        <TouchableOpacity style={styles.helpBtn} onPress={() => router.push('/support')}>
          <Ionicons name="help-circle-outline" size={22} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Order Number Badge */}
        <View style={styles.orderIdCard}>
          <View>
            <Text style={styles.orderIdLabel}>Order ID</Text>
            <Text style={styles.orderIdValue}>{order.orderNumber}</Text>
          </View>
          <View style={styles.livePill}>
            <View style={styles.pulsingGreenDot} />
            <Text style={styles.livePillText}>LIVE TRACKING</Text>
          </View>
        </View>

        {/* Stepper Timeline (Exact match to reference mockup) */}
        <View style={styles.timelineCard}>
          {steps.map((step, idx) => (
            <View key={idx} style={styles.stepRow}>
              {/* Icon / Indicator Column */}
              <View style={styles.stepperCol}>
                {step.done ? (
                  <View style={styles.checkCircle}>
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  </View>
                ) : step.active ? (
                  <View style={styles.activeCircle}>
                    <View style={styles.innerDot} />
                  </View>
                ) : (
                  <View style={styles.pendingCircle} />
                )}
                {idx < steps.length - 1 && (
                  <View
                    style={[
                      styles.connectorLine,
                      step.done && styles.connectorLineDone,
                    ]}
                  />
                )}
              </View>

              {/* Step Info */}
              <View style={styles.stepInfo}>
                <Text
                  style={[
                    styles.stepTitle,
                    step.active && styles.stepTitleActive,
                    step.done && styles.stepTitleDone,
                  ]}
                >
                  {step.title}
                </Text>
                <Text style={styles.stepTime}>{step.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Real-time Map Simulation (Exact match to reference mockup) */}
        <View style={styles.mapCard}>
          <View style={styles.simulatedMapArea}>
            {/* Route Path (SVG-like dotted line simulated) */}
            <View style={styles.routeContainer}>
              <View style={styles.storePin}>
                <Ionicons name="restaurant" size={14} color="#FFFFFF" />
              </View>

              <View style={styles.routeDashLine} />

              {/* Rider Scooter in the middle */}
              <View style={styles.riderPin}>
                <Ionicons name="bicycle" size={18} color="#FFFFFF" />
              </View>

              <View style={styles.routeDashLine2} />

              <View style={styles.homePin}>
                <Ionicons name="location" size={16} color="#FFFFFF" />
              </View>
            </View>

            {/* ETA Overlay Pill */}
            <View style={styles.etaBadge}>
              <Ionicons name="flash" size={14} color={COLORS.primary} />
              <Text style={styles.etaText}>Arriving in ~15 mins</Text>
            </View>
          </View>

          {/* Delivery Partner Details Card */}
          <View style={styles.partnerInfoRow}>
            <View style={styles.partnerAvatarCircle}>
              <Ionicons name="person" size={24} color={COLORS.primary} />
            </View>

            <View style={styles.partnerTextCol}>
              <Text style={styles.partnerName}>
                {order.deliveryPartnerName || 'Ravi Kumar'}
              </Text>
              <Text style={styles.partnerSub}>Delivery Partner (4.8 ★)</Text>
              <Text style={styles.otpReminder}>
                Share Delivery OTP <Text style={styles.otpCode}>{order.deliveryOtp}</Text> at doorstep
              </Text>
            </View>

            <View style={styles.partnerActions}>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="call" size={18} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="chatbubble-ellipses" size={18} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Order Items Summary */}
        <View style={styles.orderSummaryCard}>
          <Text style={styles.summaryTitle}>Items Ordered ({order.items.length})</Text>
          {order.items.map((it, idx) => (
            <View key={idx} style={styles.orderItemRow}>
              <Text style={styles.itemQuantity}>{it.quantity}x</Text>
              <Text style={styles.itemProductName}>{it.productName}</Text>
              <Text style={styles.itemProductPrice}>{formatCurrency(it.price * it.quantity)}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalPaidLabel}>Total Paid via UPI</Text>
            <Text style={styles.totalPaidAmount}>{formatCurrency(order.totalAmount)}</Text>
          </View>
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
    paddingBottom: 14,
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
  helpBtn: {
    padding: 4,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
    gap: 16,
  },
  orderIdCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  orderIdLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  orderIdValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  pulsingGreenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#16A34A',
  },
  livePillText: {
    color: '#15803D',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  stepRow: {
    flexDirection: 'row',
    minHeight: 52,
  },
  stepperCol: {
    alignItems: 'center',
    width: 30,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF7ED',
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  pendingCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
    marginVertical: 2,
  },
  connectorLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  connectorLineDone: {
    backgroundColor: '#10B981',
  },
  stepInfo: {
    marginLeft: 14,
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  stepTitleDone: {
    color: '#0F172A',
    fontWeight: '700',
  },
  stepTitleActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  stepTime: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  mapCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  simulatedMapArea: {
    height: 160,
    backgroundColor: '#F1F5F9',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'space-between',
  },
  storePin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#64748B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeDashLine: {
    flex: 1,
    height: 3,
    backgroundColor: '#10B981',
    marginHorizontal: 8,
  },
  riderPin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  routeDashLine2: {
    flex: 1,
    height: 3,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 8,
  },
  homePin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  etaBadge: {
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  etaText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  partnerInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  partnerAvatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerTextCol: {
    flex: 1,
    gap: 2,
  },
  partnerName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  partnerSub: {
    fontSize: 12,
    color: '#64748B',
  },
  otpReminder: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  otpCode: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  partnerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderSummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 10,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  orderItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemQuantity: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    width: 24,
  },
  itemProductName: {
    flex: 1,
    fontSize: 13,
    color: '#334155',
  },
  itemProductPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
    marginTop: 4,
  },
  totalPaidLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  totalPaidAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
});
