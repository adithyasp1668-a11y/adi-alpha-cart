import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';
import { BusinessType } from '@alpha-cart/shared-types';

const BUSINESS_TYPES: Array<{
  id: BusinessType;
  title: string;
  sub: string;
  icon: string;
}> = [
  {
    id: 'food',
    title: 'Restaurant / Food Outlet',
    sub: 'Hotel, Cafe, Food Stall',
    icon: 'restaurant-outline',
  },
  {
    id: 'grocery',
    title: 'Grocery Store',
    sub: 'Kirana, Supermarket',
    icon: 'basket-outline',
  },
  {
    id: 'fitness',
    title: 'Gym & Fitness Store',
    sub: 'Supplements, Apparel',
    icon: 'barbell-outline',
  },
  {
    id: 'disposable',
    title: 'Use & Throw Store',
    sub: 'Plates, Cups, Tissue, etc.',
    icon: 'layers-outline',
  },
];

export default function BusinessTypeScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<BusinessType>('food');

  const handleContinue = () => {
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
          <Text style={styles.title}>Set Up Your Shop</Text>
          <Text style={styles.subtitle}>Select Your Business Type</Text>
        </View>

        {/* Business Type Cards */}
        <View style={styles.cardList}>
          {BUSINESS_TYPES.map((bt) => {
            const isSelected = selected === bt.id;

            return (
              <TouchableOpacity
                key={bt.id}
                style={[styles.card, isSelected && styles.cardActive]}
                activeOpacity={0.88}
                onPress={() => setSelected(bt.id)}
              >
                <View style={[styles.iconWrap, isSelected && styles.iconWrapActive]}>
                  <Ionicons
                    name={bt.icon as any}
                    size={24}
                    color={isSelected ? COLORS.primary : '#64748B'}
                  />
                </View>

                <View style={styles.cardInfo}>
                  <Text style={[styles.cardTitle, isSelected && styles.cardTitleActive]}>
                    {bt.title}
                  </Text>
                  <Text style={styles.cardSub}>{bt.sub}</Text>
                </View>

                <Ionicons
                  name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                  size={22}
                  color={isSelected ? COLORS.primary : '#CBD5E1'}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer Continue */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.88}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
    fontSize: 15,
    color: '#64748B',
  },
  cardList: {
    gap: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    gap: 14,
  },
  cardActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF7ED',
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconWrapActive: {
    backgroundColor: '#FFF3E0',
    borderColor: '#FED7AA',
  },
  cardInfo: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  cardTitleActive: {
    color: '#0F172A',
  },
  cardSub: {
    fontSize: 12,
    color: '#64748B',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  continueButton: {
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
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
