import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';

export default function DeliveryLoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('9876543210');

  const handleSendOtp = () => {
    router.push({ pathname: '/otp', params: { phone } });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Brand Header */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="bicycle" size={38} color={COLORS.primary} />
          </View>
          <Text style={styles.brandTitle}>Alpha Cart</Text>
          <Text style={styles.brandRole}>Delivery Partner</Text>
          <Text style={styles.title}>Login with Mobile Number</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.phoneInputRow}>
            <View style={styles.countryCode}>
              <Text style={styles.flagEmoji}>🇮🇳</Text>
              <Text style={styles.codeText}>+91</Text>
            </View>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={10}
              placeholder="98765 43210"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.88}
            onPress={handleSendOtp}
          >
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.googleButton}
            activeOpacity={0.85}
            onPress={handleSendOtp}
          >
            <Ionicons name="logo-google" size={18} color="#EA4335" />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>New to Alpha Cart? </Text>
          <TouchableOpacity onPress={() => router.push('/kyc')}>
            <Text style={styles.registerText}>Register as Partner</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    gap: 6,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  brandRole: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginTop: 8,
  },
  form: {
    gap: 16,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  flagEmoji: {
    fontSize: 18,
  },
  codeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 1,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '500',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#64748B',
  },
  registerText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
