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

export default function SellerReportsScreen() {
  const router = useRouter();
  const [selectedRange, setSelectedRange] = useState('Last 7 Days');

  const chartData = [
    { day: 'Mon', value: 2400, height: 40 },
    { day: 'Tue', value: 3100, height: 55 },
    { day: 'Wed', value: 2800, height: 48 },
    { day: 'Thu', value: 3900, height: 70 },
    { day: 'Fri', value: 4200, height: 80 },
    { day: 'Sat', value: 5420, height: 100 },
    { day: 'Sun', value: 4800, height: 88 },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Business Reports</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Date Range Selector (Exact match to reference mockup) */}
        <View style={styles.rangeSelectorCard}>
          <Text style={styles.rangeLabel}>Timeframe</Text>
          <View style={styles.rangeDropdown}>
            <Text style={styles.rangeSelectedText}>{selectedRange}</Text>
            <Ionicons name="chevron-down" size={16} color="#64748B" />
          </View>
        </View>

        {/* Big Sales Figure Card */}
        <View style={styles.salesHeroCard}>
          <Text style={styles.salesHeroLabel}>Total Sales</Text>
          <Text style={styles.salesHeroValue}>{formatCurrency(21480)}</Text>
          <Text style={styles.salesHeroSub}>Across 112 successfully fulfilled customer orders</Text>

          {/* Bar Chart (Mon - Sun, exact match to reference mockup) */}
          <View style={styles.chartContainer}>
            <View style={styles.barsRow}>
              {chartData.map((d, idx) => (
                <View key={idx} style={styles.barCol}>
                  <View style={[styles.barVisual, { height: d.height }]} />
                  <Text style={styles.barDayText}>{d.day}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Summary Table Metrics (Exact match to reference mockup) */}
        <View style={styles.summaryTableCard}>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Total Orders</Text>
            <Text style={styles.tableValue}>112</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Total Sales</Text>
            <Text style={styles.tableValue}>{formatCurrency(21480)}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Commission</Text>
            <Text style={styles.commissionValue}>{formatCurrency(2148)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.tableRow}>
            <Text style={styles.tableNetLabel}>Net Earnings</Text>
            <Text style={styles.tableNetValue}>{formatCurrency(19332)}</Text>
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
    paddingBottom: 40,
  },
  rangeSelectorCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  rangeLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  rangeDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  rangeSelectedText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  salesHeroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 20,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  salesHeroLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  salesHeroValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
  },
  salesHeroSub: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 16,
  },
  chartContainer: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    paddingBottom: 20,
  },
  barCol: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  barVisual: {
    width: 22,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  barDayText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  summaryTableCard: {
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
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  tableValue: {
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
  tableNetLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  tableNetValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
});
