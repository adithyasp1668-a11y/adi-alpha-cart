import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';

export default function SupportScreen() {
  const router = useRouter();

  const faqs = [
    { q: 'How fast is Alpha Cart delivery?', a: 'Standard deliveries arrive in 15 to 35 minutes depending on distance and category.' },
    { q: 'Can I cancel my order?', a: 'You can cancel anytime before the restaurant or store starts preparing your order.' },
    { q: 'What is the AlphaPass benefit?', a: 'AlphaPass gives unlimited free delivery on all eligible orders above ₹149.' },
    { q: 'How do I return a damaged item?', a: 'Tap on your order history and click "Report an Issue" to initiate an instant replacement or refund.' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.contactRow}>
          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => Alert.alert('Call Support', 'Dialing 1800-ALPHA-CART...')}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="call" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.contactTitle}>Call Us</Text>
            <Text style={styles.contactSub}>24x7 Customer Care</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => Alert.alert('Live Chat', 'Connecting with support agent...')}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="chatbubbles" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactSub}>Average reply 1 min</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.faqHeading}>Frequently Asked Questions</Text>
        {faqs.map((faq, idx) => (
          <View key={idx} style={styles.faqCard}>
            <Text style={styles.faqQuestion}>{faq.q}</Text>
            <Text style={styles.faqAnswer}>{faq.a}</Text>
          </View>
        ))}
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
    gap: 16,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 12,
  },
  contactCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  contactSub: {
    fontSize: 11,
    color: '#64748B',
  },
  faqHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 8,
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 6,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  faqAnswer: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
});
