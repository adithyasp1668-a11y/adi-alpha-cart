import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';
import { mockStore } from '@alpha-cart/api-client';

export default function DeliverOtpScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [digits, setDigits] = useState(['4', '8', '3', '9']);

  const handleDigitChange = (val: string, index: number) => {
    const updated = [...digits];
    updated[index] = val;
    setDigits(updated);
  };

  const handleCompleteDelivery = () => {
    const enteredOtp = digits.join('');
    const res = mockStore.completeDeliveryWithOtp(id || 'ord-ac784326', enteredOtp);

    if (res.success) {
      Alert.alert(
        'Delivery Complete! 🎉',
        'Customer order verified and delivered successfully.\nEarnings of ₹55 credited to your Alpha Cart balance!',
        [
          {
            text: 'View Earnings',
            onPress: () => router.replace('/(tabs)/earnings'),
          },
        ]
      );
    } else {
      Alert.alert('Verification Failed', res.message);
    }
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
        {/* Smartphone illustration with OTP (Exact match to reference mockup) */}
        <View style={styles.phoneIllustration}>
          <View style={styles.phoneFrame}>
            <View style={styles.screenPill}>
              <Text style={styles.screenPillLabel}>OTP</Text>
              <Text style={styles.screenPillCode}>4839</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title}>Deliver Order</Text>
        <Text style={styles.subtitle}>Enter Customer OTP</Text>
        <Text style={styles.instruction}>
          Ask customer for the 4-digit delivery verification code displayed in their Alpha Cart app.
        </Text>

        {/* 4 OTP Digit Boxes (Exact match to reference mockup) */}
        <View style={styles.otpRow}>
          {digits.map((d, idx) => (
            <View key={idx} style={styles.otpBox}>
              <TextInput
                style={styles.otpInput}
                value={d}
                onChangeText={(val) => handleDigitChange(val, idx)}
                keyboardType="numeric"
                maxLength={1}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Complete Delivery Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.completeBtn}
          activeOpacity={0.88}
          onPress={handleCompleteDelivery}
        >
          <Text style={styles.completeBtnText}>Complete Delivery</Text>
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
    paddingHorizontal: 24,
    gap: 12,
  },
  phoneIllustration: {
    width: 90,
    height: 140,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#0F172A',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  phoneFrame: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenPill: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
  },
  screenPillLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
  },
  screenPillCode: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  instruction: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
  otpRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 20,
  },
  otpBox: {
    width: 54,
    height: 60,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpInput: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  footer: {
    padding: 20,
    paddingBottom: 32,
  },
  completeBtn: {
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
  completeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
