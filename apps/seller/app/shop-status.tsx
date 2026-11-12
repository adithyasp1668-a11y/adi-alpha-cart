import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';
import { mockStore } from '@alpha-cart/api-client';

export default function ShopStatusScreen() {
  const router = useRouter();
  const shop = mockStore.getShopById('shop-spice-haven') || mockStore.getShops()[0];

  const [isOpen, setIsOpen] = useState(shop ? shop.isOpen : true);
  const [openingTime, setOpeningTime] = useState('09:00 AM');
  const [closingTime, setClosingTime] = useState('11:00 PM');
  const [breakTimeEnabled, setBreakTimeEnabled] = useState(false);

  const handleSave = () => {
    if (shop) {
      mockStore.updateShop(shop.id, {
        isOpen,
        openingTime,
        closingTime,
        breakTimeEnabled,
      });
    }
    Alert.alert('Status Updated', 'Shop operating hours and open/close state have been saved!');
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shop Status</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Storefront Graphic (Exact match to reference mockup) */}
        <View style={styles.storefrontHero}>
          <View style={styles.awningIllustration}>
            <View style={styles.awningStripeOrange} />
            <View style={styles.awningStripeWhite} />
            <View style={styles.awningStripeOrange} />
            <View style={styles.awningStripeWhite} />
            <View style={styles.awningStripeOrange} />
          </View>
          <View style={styles.storeBase}>
            <Ionicons name="storefront" size={48} color={COLORS.primary} />
          </View>
          <Text style={styles.statusBigTitle}>
            Your Shop is <Text style={{ color: isOpen ? '#10B981' : '#EF4444' }}>{isOpen ? 'OPEN' : 'CLOSED'}</Text>
          </Text>
          <Text style={styles.statusSub}>
            {isOpen ? 'Customers can now view and order your items.' : 'Store is paused. New customer orders are paused.'}
          </Text>
        </View>

        {/* Status Toggle Row */}
        <View style={styles.toggleRow}>
          <View style={styles.toggleTextGroup}>
            <Text style={styles.toggleLabel}>Shop Open</Text>
            <Text style={styles.toggleDesc}>Toggle to instantly open or close storefront</Text>
          </View>
          <Switch
            value={isOpen}
            onValueChange={setIsOpen}
            trackColor={{ false: '#CBD5E1', true: '#86EFAC' }}
            thumbColor={isOpen ? '#16A34A' : '#94A3B8'}
          />
        </View>

        {/* Operating Timings (Opening Time, Closing Time) */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Set Timings</Text>

          <View style={styles.timeInputsRow}>
            <View style={styles.timeBox}>
              <Text style={styles.timeLabel}>Opening Time</Text>
              <View style={styles.timeValueWrap}>
                <Ionicons name="time-outline" size={16} color={COLORS.primary} />
                <Text style={styles.timeValue}>{openingTime}</Text>
              </View>
            </View>

            <View style={styles.timeBox}>
              <Text style={styles.timeLabel}>Closing Time</Text>
              <View style={styles.timeValueWrap}>
                <Ionicons name="moon-outline" size={16} color={COLORS.primary} />
                <Text style={styles.timeValue}>{closingTime}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Break Time (Optional) */}
        <View style={styles.toggleRow}>
          <View style={styles.toggleTextGroup}>
            <Text style={styles.toggleLabel}>Break Time (Optional)</Text>
            <Text style={styles.toggleDesc}>Pause orders daily between 03:30 PM - 05:00 PM</Text>
          </View>
          <Switch
            value={breakTimeEnabled}
            onValueChange={setBreakTimeEnabled}
            trackColor={{ false: '#CBD5E1', true: '#FED7AA' }}
            thumbColor={breakTimeEnabled ? COLORS.primary : '#94A3B8'}
          />
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.88}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
  content: {
    padding: 20,
    paddingBottom: 100,
    gap: 20,
  },
  storefrontHero: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFF7ED',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FED7AA',
    gap: 10,
  },
  awningIllustration: {
    flexDirection: 'row',
    width: 140,
    height: 18,
    borderRadius: 8,
    overflow: 'hidden',
  },
  awningStripeOrange: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  awningStripeWhite: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  storeBase: {
    width: 80,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  statusBigTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  statusSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  toggleTextGroup: {
    flex: 1,
    paddingRight: 12,
    gap: 2,
  },
  toggleLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  toggleDesc: {
    fontSize: 12,
    color: '#64748B',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  timeInputsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timeBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  timeLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  timeValueWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
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
  saveButton: {
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
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
