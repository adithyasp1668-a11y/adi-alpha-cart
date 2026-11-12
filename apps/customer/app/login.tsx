import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('9876543210');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['4', '8', '3', '9', '2', '1']);
  const [timer, setTimer] = useState(28);

  const handleSendOtp = () => {
    setShowOtpModal(true);
  };

  const handleVerify = () => {
    setShowOtpModal(false);
    router.push('/location');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Top Cart Icon */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="cart" size={40} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Enter your mobile number to continue</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.inputLabel}>Mobile Number</Text>
          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.flagEmoji}>🇮🇳</Text>
              <Text style={styles.codeText}>+91</Text>
            </View>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="Enter mobile number"
              placeholderTextColor="#94A3B8"
              maxLength={10}
            />
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={handleSendOtp}
          >
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login */}
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
          <TouchableOpacity onPress={() => router.push('/location')}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* OTP Verification Modal */}
      <Modal visible={showOtpModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={styles.otpIconCircle}>
                <Ionicons name="shield-checkmark" size={32} color={COLORS.primary} />
              </View>
              <Text style={styles.modalTitle}>Verify OTP</Text>
              <Text style={styles.modalSubtitle}>
                Enter the 6-digit OTP sent to +91 {phone}
              </Text>
            </View>

            {/* OTP Boxes */}
            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <View key={index} style={styles.otpBox}>
                  <Text style={styles.otpDigit}>{digit}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.resendText}>
              Resend OTP in <Text style={{ color: COLORS.primary, fontWeight: '700' }}>00:{timer}</Text>
            </Text>

            <TouchableOpacity
              style={styles.verifyButton}
              activeOpacity={0.85}
              onPress={handleVerify}
            >
              <Text style={styles.buttonText}>Verify & Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowOtpModal(false)}
            >
              <Text style={styles.closeButtonText}>Change Mobile Number</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
  },
  form: {
    gap: 16,
    marginVertical: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    marginBottom: -8,
  },
  phoneInputContainer: {
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
    fontWeight: '600',
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
    marginVertical: 6,
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
    borderWidth: 1,
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
  signUpText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  otpIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
  },
  otpRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 16,
  },
  otpBox: {
    width: 44,
    height: 50,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpDigit: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  resendText: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 20,
  },
  verifyButton: {
    width: '100%',
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    marginTop: 14,
    padding: 8,
  },
  closeButtonText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
});
