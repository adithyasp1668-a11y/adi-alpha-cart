import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';
import { mockStore } from '@alpha-cart/api-client';

const { width } = Dimensions.get('window');

export default function PickupConfirmScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleConfirm = () => {
    mockStore.confirmPickup(id || 'ord-ac784326');
    router.replace({ pathname: '/deliver-otp', params: { id } });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Shopping bag with checkmark illustration (Exact match to reference mockup) */}
        <View style={styles.bagGraphicCircle}>
          <View style={styles.bagBody}>
            <Ionicons name="bag-handle" size={54} color={COLORS.primary} />
            <View style={styles.checkTickBadge}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            </View>
          </View>
        </View>

        <Text style={styles.title}>Confirm Pickup</Text>
        <Text style={styles.subtitle}>
          Have you picked up the order package from{' '}
          <Text style={{ fontWeight: '800', color: '#0F172A' }}>The Spice Haven</Text>?
        </Text>
        <Text style={styles.disclaimer}>
          Please verify that all food containers are sealed properly before departure.
        </Text>
      </View>

      {/* Action Buttons: Yes, Order Picked Up / Not Yet */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.88}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>Yes, Order Picked Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.notYetButton}
          activeOpacity={0.85}
          onPress={() => router.back()}
        >
          <Text style={styles.notYetButtonText}>Not Yet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 54,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backBtn: {
    padding: 4,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    justifyContent: 'center',
    gap: 14,
    marginTop: -40,
  },
  bagGraphicCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF7ED',
    borderWidth: 2,
    borderColor: '#FED7AA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bagBody: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkTickBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
    lineHeight: 24,
  },
  disclaimer: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  footer: {
    padding: 20,
    paddingBottom: 32,
    gap: 12,
  },
  confirmButton: {
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
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  notYetButton: {
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  notYetButtonText: {
    color: '#64748B',
    fontSize: 15,
    fontWeight: '700',
  },
});
