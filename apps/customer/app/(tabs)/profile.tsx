import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';

export default function ProfileScreen() {
  const router = useRouter();
  const [alphaPassActive, setAlphaPassActive] = useState(true);

  const menuItems = [
    {
      id: 'addresses',
      title: 'My Addresses',
      icon: 'location-outline',
      action: () => router.push('/addresses'),
    },
    {
      id: 'orders',
      title: 'Orders',
      icon: 'receipt-outline',
      action: () => router.push('/(tabs)/orders'),
    },
    {
      id: 'wishlist',
      title: 'Wishlist',
      icon: 'heart-outline',
      action: () => router.push('/wishlist'),
    },
    {
      id: 'alphapass',
      title: 'AlphaPass Membership',
      icon: 'sparkles',
      badge: 'Active VIP',
      badgeColor: '#F59E0B',
      action: () => Alert.alert('AlphaPass VIP', 'You have active VIP membership with Unlimited Free Deliveries on orders above ₹149!'),
    },
    {
      id: 'payments',
      title: 'Saved Payment Methods',
      icon: 'card-outline',
      action: () => Alert.alert('Payment Methods', 'UPI: Google Pay (•••4210)\nCards: HDFC Regalia (•••8819)'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      action: () => router.push('/support'),
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings-outline',
      action: () => Alert.alert('Settings', 'Alpha Cart App Version 1.0.0 (Production Build)\nNotifications: ON\nLanguage: English / Kannada'),
    },
  ];

  const handleLogout = () => {
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* User Card (Exact match to reference mockup) */}
        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' }}
              style={styles.avatarImage}
            />
            <View style={styles.verifiedTick}>
              <Ionicons name="checkmark" size={12} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.userName}>Ravi Kumar</Text>
          <Text style={styles.userPhone}>+91 98765 43210</Text>
        </View>

        {/* Menu Items List */}
        <View style={styles.menuList}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuRow}
              activeOpacity={0.7}
              onPress={item.action}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconCircle}>
                  <Ionicons name={item.icon as any} size={20} color={item.id === 'alphapass' ? '#F59E0B' : '#475569'} />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>

              <View style={styles.menuRight}>
                {item.badge && (
                  <View style={[styles.badgeTag, { backgroundColor: '#FEF3C7' }]}>
                    <Text style={[styles.badgeTagText, { color: '#B45309' }]}>{item.badge}</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>
            </TouchableOpacity>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutRow}
            activeOpacity={0.7}
            onPress={handleLogout}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIconCircle, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              </View>
              <Text style={styles.logoutText}>Log Out</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#EF4444" />
          </TouchableOpacity>
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
  scrollContent: {
    paddingBottom: 40,
  },
  profileHeaderCard: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFF7ED',
    borderBottomWidth: 1,
    borderBottomColor: '#FED7AA',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  verifiedTick: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  userPhone: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },
  menuList: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 8,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  menuIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    marginTop: 12,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EF4444',
  },
});
