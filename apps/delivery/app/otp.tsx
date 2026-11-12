import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';

export default function DeliveryOtpScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp] = useState(['2', '4', '7', '9', '6', '3']);
  const [seconds, setSeconds] = useState(25);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const handleVerify = () => {
    router.push('/kyc');
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
        <View style={styles.iconCircle}>
          <Ionicons name="shield-checkmark" size={38} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit OTP sent to +91 {phone || '98765 43210'}
        </Text>

        {/* 6 OTP Boxes (Exact match to reference mockup) */}
        <View style={styles.otpRow}>
          {otp.map((digit, idx) => (
            <View key={idx} style={styles.otpBox}>
              <Text style={styles.otpDigit}>{digit}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.resendText}>
          Resend OTP in <Text style={styles.timerHighlight}>00:{seconds < 10 ? `0${seconds}` : seconds}</Text>
        </Text>

        <TouchableOpacity
          style={styles.verifyButton}
          activeOpacity={0.88}
          onPress={handleVerify}
        >
          <Text style={styles.verifyButtonText}>Verify & Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 54,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  backBtn: {
    padding: 4,
  },
  content: {
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 20,
  },
  otpRow: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 20,
  },
  otpBox: {
    width: 46,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpDigit: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
  },
  resendText: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 24,
  },
  timerHighlight: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  verifyButton: {
    width: '100%',
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
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
