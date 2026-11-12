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
import { mockStore } from '@alpha-cart/api-client';

export default function PayoutScreen() {
  const router = useRouter();
  const [balance, setBalance] = useState(mockStore.getDeliveryPartner().totalBalance || 2340);

  const handleWithdraw = () => {
    Alert.alert(
      'Withdrawal Initiated',
      `Payout of ${formatCurrency(balance)} successfully requested! The amount will be transferred to your registered HDFC bank account (KA-05-EM) within 30 minutes.`
    );
  };

  const menuItems = [
    {
      title: 'Payout History',
      sub: 'View previous settlement receipts',
      action: () => Alert.alert('Payout History', 'Last payout: ₹3,450 credited on 08 Nov 2026 (Ref: ACH481920)'),
    },
    {
      title: 'Bank Account',
      sub: 'HDFC Bank Ltd •••4921 (Active)',
      action: () => Alert.alert('Bank Account', 'Beneficiary: Ravi Kumar\nAccount: •••• •••• 4921\nIFSC: HDFC0001248\nStatus: Primary'),
    },
    {
      title: 'Earning Statements',
      sub: 'Download monthly tax invoice and statements',
      action: () => Alert.alert('Download Statement', 'PDF statement for October 2026 generated and sent to email.'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Available Balance Card (Exact match to reference mockup) */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceValue}>{formatCurrency(balance)}</Text>

          <TouchableOpacity
            style={styles.withdrawButton}
            activeOpacity={0.88}
            onPress={handleWithdraw}
          >
            <Ionicons name="wallet-outline" size={18} color="#FFFFFF" />
            <Text style={styles.withdrawButtonText}>Withdraw to Bank</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Options (Exact match to reference mockup) */}
        <View style={styles.menuCard}>
          {menuItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.menuRow, idx > 0 && styles.menuBorder]}
              activeOpacity={0.7}
              onPress={item.action}
            >
              <View style={styles.menuLeft}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSub}>{item.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </TouchableOpacity>
          ))}
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
    gap: 20,
  },
  balanceCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  balanceLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  balanceValue: {
    fontSize: 38,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  withdrawButton: {
    width: '100%',
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
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
  },
  menuBorder: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  menuLeft: {
    flex: 1,
    gap: 2,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  menuSub: {
    fontSize: 12,
    color: '#64748B',
  },
});
