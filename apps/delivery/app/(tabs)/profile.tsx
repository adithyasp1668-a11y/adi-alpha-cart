import React from 'react';
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
import { mockStore } from '@alpha-cart/api-client';

export default function DeliveryProfileTab() {
  const router = useRouter();
  const partner = mockStore.getDeliveryPartner();

  const menu = [
    {
      title: 'Personal Details',
      icon: 'person-outline',
      action: () => Alert.alert('Personal Details', `Name: ${partner.name}\nPhone: ${partner.phone}\nEmail: ${partner.email}\nJoined: March 2024`),
    },
    {
      title: 'Vehicle Details',
      icon: 'bicycle-outline',
      action: () => Alert.alert('Vehicle Details', `Vehicle: ${partner.vehicleType}\nRegistration: ${partner.vehicleNumber}\nInsurance: Valid till Dec 2027`),
    },
    {
      title: 'Documents (KYC)',
      icon: 'document-text-outline',
      badge: 'Verified',
      badgeColor: '#10B981',
      action: () => router.push('/kyc'),
    },
    {
      title: 'Settings',
      icon: 'settings-outline',
      action: () => Alert.alert('Settings', 'Navigation App: Built-in Turn-by-Turn GPS\nSound Alerts: High\nBattery Saver: Optimized'),
    },
    {
      title: 'Help & Support',
      icon: 'help-circle-outline',
      action: () => Alert.alert('Partner Care', 'Rider Emergency Helpline: 1800-RIDER-CARE\nAccidental Insurance Policy #ICICI-49201'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Profile Card (Exact match to reference mockup) */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: partner.avatar }} style={styles.avatar} />
            <View style={styles.onlineBadge}>
              <Ionicons name="checkmark" size={12} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.partnerName}>{partner.name}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={styles.ratingText}>{partner.rating} ({partner.reviewCount} reviews)</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuCard}>
          {menu.map((m, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.menuRow, idx > 0 && styles.rowDivider]}
              activeOpacity={0.7}
              onPress={m.action}
            >
              <View style={styles.menuLeft}>
                <Ionicons name={m.icon as any} size={20} color="#475569" />
                <Text style={styles.menuTitle}>{m.title}</Text>
              </View>

              <View style={styles.menuRight}>
                {m.badge && (
                  <View style={[styles.badgeWrap, { backgroundColor: '#DCFCE7' }]}>
                    <Text style={[styles.badgeText, { color: '#15803D' }]}>{m.badge}</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.replace('/login')}
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out from Fleet</Text>
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
  content: {
    padding: 20,
    gap: 20,
    paddingBottom: 40,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 20,
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: '#FED7AA',
    gap: 8,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 4,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  onlineBadge: {
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
  partnerName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
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
    padding: 16,
  },
  rowDivider: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  badgeWrap: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
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
