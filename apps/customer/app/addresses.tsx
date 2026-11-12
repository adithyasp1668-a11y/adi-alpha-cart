import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';

export default function AddressesScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      tag: 'Home',
      line: 'Flat 402, Raghav Towers, 14th Main, HSR Layout Sector 4',
      city: 'Bengaluru, Karnataka - 560102',
      isDefault: true,
    },
    {
      id: 'addr-2',
      tag: 'Office',
      line: 'Building 7, RMZ Ecoworld, Outer Ring Road, Bellandur',
      city: 'Bengaluru, Karnataka - 560103',
      isDefault: false,
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Addresses</Text>
        <TouchableOpacity onPress={() => Alert.alert('Add Address', 'Enter new address details')} style={styles.backBtn}>
          <Ionicons name="add" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {addresses.map((item) => (
          <View key={item.id} style={[styles.card, item.isDefault && styles.cardActive]}>
            <View style={styles.topRow}>
              <View style={styles.tagWrap}>
                <Ionicons name={item.tag === 'Home' ? 'home' : 'business'} size={14} color={COLORS.primary} />
                <Text style={styles.tagText}>{item.tag}</Text>
              </View>
              {item.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </View>
            <Text style={styles.line}>{item.line}</Text>
            <Text style={styles.city}>{item.city}</Text>
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
    gap: 14,
  },
  card: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  cardActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF7ED',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  defaultBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  defaultText: {
    color: '#15803D',
    fontSize: 10,
    fontWeight: '700',
  },
  line: {
    fontSize: 13,
    color: '#334155',
  },
  city: {
    fontSize: 12,
    color: '#64748B',
  },
});
