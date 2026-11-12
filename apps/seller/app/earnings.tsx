import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, formatCurrency } from '@alpha-cart/shared-config';

export default function SellerEarningsScreen() {
  const router = useRouter();
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');

  const stats = {
    today: {
      earnings: 5420,
      orders: 28,
      salesValue: 18960,
      commission: 1896,
      net: 5420,
      trend: '+12% from yesterday',
    },
    week: {
      earnings: 34850,
      orders: 172,
      salesValue: 124500,
      commission: 12450,
      net: 34850,
      trend: '+18% from last week',
    },
    month: {
      earnings: 142600,
      orders: 680,
      salesValue: 495000,
      commission: 49500,
      net: 142600,
      trend: '+24% from last month',
    },
  }[period];

  const handleWithdraw = () => {
    Alert.alert(
      'Withdrawal Initiated',
      `Payout request for ${formatCurrency(stats.earnings)} submitted to your HDFC bank account! Settlement will credit within 2 hours.`
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Earnings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Period Tabs: Today, This Week, This Month */}
      <View style={styles.periodTabsRow}>
        <TouchableOpacity
          style={[styles.periodTab, period === 'today' && styles.periodTabActive]}
          onPress={() => setPeriod('today')}
        >
          <Text style={[styles.periodTabText, period === 'today' && styles.periodTabTextActive]}>
            Today
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.periodTab, period === 'week' && styles.periodTabActive]}
          onPress={() => setPeriod('week')}
        >
          <Text style={[styles.periodTabText, period === 'week' && styles.periodTabTextActive]}>
            This Week
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.periodTab, period === 'month' && styles.periodTabActive]}
          onPress={() => setPeriod('month')}
        >
          <Text style={[styles.periodTabText, period === 'month' && styles.periodTabTextActive]}>
            This Month
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Total Earnings Card (Exact match to reference mockup) */}
        <View style={styles.totalEarningsCard}>
          <Text style={styles.earningsLabel}>Total Earnings</Text>
          <Text style={styles.earningsValue}>{formatCurrency(stats.earnings)}</Text>
          <View style={styles.trendRow}>
            <Ionicons name="trending-up" size={14} color="#15803D" />
            <Text style={styles.trendText}>{stats.trend}</Text>
          </View>
        </View>

        {/* Breakdown Card (Exact match to reference mockup) */}
        <View style={styles.breakdownCard}>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Orders Completed</Text>
            <Text style={styles.breakdownValue}>{stats.orders}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Sales Value</Text>
            <Text style={styles.breakdownValue}>{formatCurrency(stats.salesValue)}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Commission (10%)</Text>
            <Text style={styles.commissionValue}>-{formatCurrency(stats.commission)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.breakdownRow}>
            <Text style={styles.netLabel}>Net Earnings</Text>
            <Text style={styles.netValue}>{formatCurrency(stats.net)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Withdraw Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.withdrawButton}
          activeOpacity={0.88}
          onPress={handleWithdraw}
        >
          <Ionicons name="wallet-outline" size={20} color="#FFFFFF" />
          <Text style={styles.withdrawButtonText}>Withdraw to Bank</Text>
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
  periodTabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 10,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
  },
  periodTabActive: {
    backgroundColor: '#FFF3E0',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  periodTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  periodTabTextActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  content: {
    padding: 20,
    gap: 16,
    paddingBottom: 100,
  },
  totalEarningsCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  earningsLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  earningsValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
  breakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 18,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  commissionValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#EF4444',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  netLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  netValue: {
    fontSize: 20,
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
  withdrawButton: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  withdrawButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
