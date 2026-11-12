import React, { useState } from 'react';
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

export default function DeliveryEarningsTab() {
  const router = useRouter();
  const [tab, setTab] = useState<'today' | 'week' | 'month'>('today');

  const data = {
    today: { total: 680, base: 520, count: 10, surge: 80, distance: 40, incentives: 40 },
    week: { total: 4760, base: 3640, count: 70, surge: 560, distance: 280, incentives: 280 },
    month: { total: 19800, base: 15200, count: 290, surge: 2200, distance: 1200, incentives: 1200 },
  }[tab];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Earnings</Text>
        <TouchableOpacity onPress={() => router.push('/payout')} style={styles.backBtn}>
          <Ionicons name="card-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Tabs: Today, Week, Month (Exact match to reference mockup) */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'today' && styles.tabBtnActive]}
          onPress={() => setTab('today')}
        >
          <Text style={[styles.tabText, tab === 'today' && styles.tabTextActive]}>Today</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, tab === 'week' && styles.tabBtnActive]}
          onPress={() => setTab('week')}
        >
          <Text style={[styles.tabText, tab === 'week' && styles.tabTextActive]}>Week</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, tab === 'month' && styles.tabBtnActive]}
          onPress={() => setTab('month')}
        >
          <Text style={[styles.tabText, tab === 'month' && styles.tabTextActive]}>Month</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Total Earnings Hero Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroAmount}>{formatCurrency(data.total)}</Text>
          <Text style={styles.heroLabel}>Total Earnings</Text>
        </View>

        {/* Breakdown Card (Exact match to reference mockup) */}
        <View style={styles.breakdownCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Base Earnings ({data.count})</Text>
            <Text style={styles.value}>{formatCurrency(data.base)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Surge Bonus</Text>
            <Text style={styles.value}>{formatCurrency(data.surge)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Distance Bonus</Text>
            <Text style={styles.value}>{formatCurrency(data.distance)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Other Incentives</Text>
            <Text style={styles.value}>{formatCurrency(data.incentives)}</Text>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.viewOrdersRow}
            onPress={() => router.push('/(tabs)/orders')}
          >
            <Text style={styles.viewOrdersText}>View Order Details</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Quick Action to Payout */}
        <TouchableOpacity
          style={styles.payoutCardBtn}
          activeOpacity={0.88}
          onPress={() => router.push('/payout')}
        >
          <View style={styles.payoutBtnLeft}>
            <Ionicons name="wallet" size={22} color={COLORS.primary} />
            <View>
              <Text style={styles.payoutBtnTitle}>Payout & Withdrawal</Text>
              <Text style={styles.payoutBtnSub}>Available Balance: ₹2,340</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={18} color={COLORS.primary} />
        </TouchableOpacity>
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
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
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
    gap: 18,
    paddingBottom: 40,
  },
  heroCard: {
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 20,
    paddingVertical: 28,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    gap: 6,
  },
  heroAmount: {
    fontSize: 44,
    fontWeight: '800',
    color: COLORS.primary,
  },
  heroLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  breakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#475569',
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  viewOrdersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  viewOrdersText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  payoutCardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  payoutBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  payoutBtnTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  payoutBtnSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
});
