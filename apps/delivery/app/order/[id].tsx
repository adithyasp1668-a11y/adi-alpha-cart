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
import { COLORS } from '@alpha-cart/shared-config';
import { mockStore } from '@alpha-cart/api-client';
import { Order } from '@alpha-cart/shared-types';

export default function DeliveryOrderDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'pickup' | 'drop'>('pickup');
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [itemsExpanded, setItemsExpanded] = useState(true);

  useEffect(() => {
    const o = mockStore.getOrderById(id || 'ord-ac784326') || mockStore.getOrders()[0];
    setOrder(o);
  }, [id]);

  if (!order) {
    return (
      <View style={styles.centerContainer}>
        <Text>Order not found</Text>
      </View>
    );
  }

  const handleArrived = () => {
    if (activeTab === 'pickup') {
      router.push({ pathname: '/pickup-confirm', params: { id: order.id } });
    } else {
      router.push({ pathname: '/deliver-otp', params: { id: order.id } });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order {order.orderNumber}</Text>
        <TouchableOpacity onPress={() => Alert.alert('Customer Care', 'Contacting partner dispatcher...')} style={styles.backBtn}>
          <Ionicons name="call-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Tabs: Pickup / Drop (Exact match to reference mockup) */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'pickup' && styles.tabBtnActive]}
          onPress={() => setActiveTab('pickup')}
        >
          <Text style={[styles.tabText, activeTab === 'pickup' && styles.tabTextActive]}>
            Pickup
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'drop' && styles.tabBtnActive]}
          onPress={() => setActiveTab('drop')}
        >
          <Text style={[styles.tabText, activeTab === 'drop' && styles.tabTextActive]}>
            Drop
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Location Card & Navigation Button */}
        <View style={styles.targetCard}>
          <View style={styles.targetDetails}>
            <Text style={styles.targetLabel}>
              {activeTab === 'pickup' ? 'Store Location' : 'Delivery Address'}
            </Text>
            <Text style={styles.targetName}>
              {activeTab === 'pickup' ? order.shopName : order.customerName}
            </Text>
            <Text style={styles.targetAddress}>
              {activeTab === 'pickup' ? order.shopAddress : order.customerAddress}
            </Text>
            <Text style={styles.targetDistance}>{order.distanceKm} km away</Text>
          </View>

          {/* Navigate GPS Button */}
          <TouchableOpacity
            style={styles.navigateBtn}
            onPress={() => Alert.alert('Turn-by-Turn GPS', 'Simulated Live Navigation active: Head north toward Outer Ring Road (150m)')}
          >
            <Ionicons name="navigate" size={18} color="#FFFFFF" />
            <Text style={styles.navigateBtnText}>Navigate</Text>
          </TouchableOpacity>
        </View>

        {/* Order Items Accordion */}
        <View style={styles.accordionCard}>
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => setItemsExpanded(!itemsExpanded)}
          >
            <View style={styles.accordionLeft}>
              <Ionicons name="cube-outline" size={20} color={COLORS.primary} />
              <Text style={styles.accordionTitle}>Order Items ({order.items.length})</Text>
            </View>
            <Ionicons
              name={itemsExpanded ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="#64748B"
            />
          </TouchableOpacity>

          {itemsExpanded && (
            <View style={styles.itemsBody}>
              {order.items.map((it, idx) => (
                <View key={idx} style={styles.itemRow}>
                  <Text style={styles.itemQty}>{it.quantity}x</Text>
                  <Text style={styles.itemName}>{it.productName}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Order Instructions Card */}
        <View style={styles.instructionsCard}>
          <View style={styles.instructionsHeader}>
            <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
            <Text style={styles.instructionsTitle}>Delivery Instructions</Text>
          </View>
          <Text style={styles.instructionsText}>
            {order.notes || 'Please handle soup/curry containers with care and confirm customer OTP upon handover.'}
          </Text>
        </View>
      </ScrollView>

      {/* Arrived Button Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.arrivedBtn}
          activeOpacity={0.88}
          onPress={handleArrived}
        >
          <Text style={styles.arrivedBtnText}>
            {activeTab === 'pickup' ? 'Arrived at Pickup' : 'Arrived at Customer Location'}
          </Text>
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
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 12,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  content: {
    padding: 20,
    gap: 16,
    paddingBottom: 100,
  },
  targetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  targetDetails: {
    gap: 4,
  },
  targetLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  targetName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  targetAddress: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  targetDistance: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 4,
  },
  navigateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#3B82F6',
    height: 48,
    borderRadius: 14,
  },
  navigateBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  accordionCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  accordionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  accordionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  itemsBody: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemQty: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
  },
  itemName: {
    fontSize: 13,
    color: '#334155',
  },
  instructionsCard: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  instructionsText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
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
  arrivedBtn: {
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
  arrivedBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
