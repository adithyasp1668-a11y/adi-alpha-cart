import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';

export default function SellerMoreTab() {
  const router = useRouter();

  const links = [
    { title: 'Shop Open / Close Status', icon: 'time-outline', path: '/shop-status', color: '#10B981' },
    { title: 'Earnings & Payouts', icon: 'wallet-outline', path: '/earnings', color: COLORS.primary },
    { title: 'Business Reports & Analytics', icon: 'analytics-outline', path: '/reports', color: '#8B5CF6' },
    { title: 'Change Business Type', icon: 'business-outline', path: '/business-type', color: '#3B82F6' },
    {
      title: 'Store Settings & Bank Details',
      icon: 'settings-outline',
      action: () => Alert.alert('Bank Account', 'HDFC Bank Ltd •••4921\nIFSC: HDFC0001248\nStatus: Verified for instant settlements'),
    },
    {
      title: 'Seller Help & Partner Support',
      icon: 'headset-outline',
      action: () => Alert.alert('Seller Support', 'Priority Seller Helpline: 1800-ALPHA-SELLER\nEmail: sellers@alphacart.in'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More Options</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {links.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              if (item.path) router.push(item.path as any);
              else if (item.action) item.action();
            }}
          >
            <View style={styles.left}>
              <View style={[styles.iconWrap, { backgroundColor: '#F8FAFC' }]}>
                <Ionicons name={item.icon as any} size={22} color={item.color || '#475569'} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.replace('/login')}
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout of Seller Portal</Text>
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
  content: {
    padding: 20,
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#FEF2F2',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '700',
  },
});
