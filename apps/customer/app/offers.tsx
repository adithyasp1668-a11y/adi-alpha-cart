import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';
import { mockStore } from '@alpha-cart/api-client';

export default function OffersScreen() {
  const router = useRouter();
  const promotions = mockStore.getPromotions();

  const handleCopyCode = (code: string) => {
    Alert.alert('Coupon Applied', `Code "${code}" copied to clipboard!`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Offers & Discounts</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {promotions.map((promo) => (
          <View key={promo.id} style={styles.promoCard}>
            <View style={styles.cardHeader}>
              <View style={styles.codeBadge}>
                <Text style={styles.codeText}>{promo.code}</Text>
              </View>
              <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => handleCopyCode(promo.code)}
              >
                <Text style={styles.applyBtnText}>APPLY</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.promoTitle}>{promo.title}</Text>
            <Text style={styles.promoDesc}>{promo.description}</Text>
            <Text style={styles.expiryText}>Valid until {promo.validUntil}</Text>
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
  promoCard: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codeBadge: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  codeText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  applyBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 4,
  },
  promoDesc: {
    fontSize: 13,
    color: '#475569',
  },
  expiryText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
});
