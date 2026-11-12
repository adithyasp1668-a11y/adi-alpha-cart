import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';

export default function DeliveryKycScreen() {
  const router = useRouter();

  const [steps, setSteps] = useState([
    { id: 1, title: 'Personal Details', desc: 'Ravi Kumar • +91 98765 43210', icon: 'person-outline', done: true },
    { id: 2, title: 'Upload Documents', desc: 'Driving License, Aadhaar Card & PAN', icon: 'document-text-outline', done: true },
    { id: 3, title: 'Vehicle Details', desc: 'Electric Two-Wheeler (KA-05-EM-4921)', icon: 'bicycle-outline', done: true },
    { id: 4, title: 'Face Verification', desc: 'Live selfie matched with ID proof', icon: 'scan-outline', done: true },
  ]);

  const handleSubmit = () => {
    Alert.alert('KYC Verified', 'Your partner profile has been approved! You can now go online to receive orders.');
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Submit your verification credentials to start earning with Alpha Cart.
          </Text>
        </View>

        {/* KYC Steps List (Exact match to reference mockup) */}
        <View style={styles.stepsList}>
          {steps.map((st) => (
            <TouchableOpacity
              key={st.id}
              style={styles.stepCard}
              activeOpacity={0.88}
              onPress={() => Alert.alert(st.title, `${st.desc}\n\nStatus: Verified and Approved`)}
            >
              <View style={styles.iconCircle}>
                <Ionicons name={st.icon as any} size={22} color={COLORS.primary} />
              </View>

              <View style={styles.stepInfo}>
                <Text style={styles.stepTitle}>{st.title}</Text>
                <Text style={styles.stepDesc}>{st.desc}</Text>
              </View>

              {st.done ? (
                <View style={styles.checkBadge}>
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                </View>
              ) : (
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Footer Action */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.88}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit for Verification</Text>
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
    marginBottom: 10,
  },
  backBtn: {
    padding: 4,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 24,
  },
  titleSection: {
    gap: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  stepsList: {
    gap: 14,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    gap: 14,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepInfo: {
    flex: 1,
    gap: 2,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  stepDesc: {
    fontSize: 12,
    color: '#64748B',
  },
  checkBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
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
  submitButton: {
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
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
