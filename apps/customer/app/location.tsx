import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';

const { width } = Dimensions.get('window');

const POPULAR_LOCATIONS = [
  { id: 'loc-1', name: 'BTM Layout 2nd Stage', city: 'Bengaluru, Karnataka', tag: 'Fast 15m Delivery' },
  { id: 'loc-2', name: 'Koramangala 4th Block', city: 'Bengaluru, Karnataka', tag: 'Most Popular' },
  { id: 'loc-3', name: 'HSR Layout Sector 4', city: 'Bengaluru, Karnataka', tag: 'Hub Area' },
  { id: 'loc-4', name: 'Indiranagar 100ft Road', city: 'Bengaluru, Karnataka', tag: 'Commercial' },
  { id: 'loc-5', name: 'Main Market, Durgigudi', city: 'Shivamogga, Karnataka', tag: 'Active Zone' },
  { id: 'loc-6', name: 'Gopala Gowda Extension', city: 'Shivamogga, Karnataka', tag: 'Residential' },
];

export default function LocationScreen() {
  const router = useRouter();
  const [showManualModal, setShowManualModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(POPULAR_LOCATIONS[0].name);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectLocation = (locName: string) => {
    setSelectedLocation(locName);
    setShowManualModal(false);
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Top Illustration */}
        <View style={styles.illustrationWrapper}>
          <View style={styles.mapCircle}>
            <View style={styles.pinPulse}>
              <View style={styles.pinBadge}>
                <Ionicons name="location" size={44} color={COLORS.primary} />
              </View>
            </View>
            {/* Map Roads simulation */}
            <View style={styles.simulatedGrid}>
              <View style={styles.gridLineH} />
              <View style={styles.gridLineV} />
            </View>
          </View>
        </View>

        {/* Text Section */}
        <View style={styles.textSection}>
          <Text style={styles.title}>Enable Location</Text>
          <Text style={styles.subtitle}>
            Allow location access to find nearby stores, restaurants and faster delivery.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => router.push('/(tabs)')}
          >
            <Ionicons name="navigate" size={18} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Use Current Location</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.85}
            onPress={() => setShowManualModal(true)}
          >
            <Text style={styles.secondaryButtonText}>Enter Manually</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Manual Location Selector Modal */}
      <Modal visible={showManualModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowManualModal(false)} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color="#1E293B" />
            </TouchableOpacity>
            <Text style={styles.modalHeading}>Select Delivery Location</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#94A3B8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search area, landmark or street..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Quick Cities */}
          <View style={styles.popularSection}>
            <Text style={styles.sectionTitle}>Serviceable Areas in Karnataka</Text>
            <FlatList
              data={POPULAR_LOCATIONS.filter((l) =>
                l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                l.city.toLowerCase().includes(searchQuery.toLowerCase())
              )}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.locationItem}
                  onPress={() => handleSelectLocation(`${item.name}, ${item.city}`)}
                >
                  <View style={styles.locationIconWrap}>
                    <Ionicons name="location-outline" size={22} color={COLORS.primary} />
                  </View>
                  <View style={styles.locationDetails}>
                    <Text style={styles.locationName}>{item.name}</Text>
                    <Text style={styles.locationCity}>{item.city}</Text>
                  </View>
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagBadgeText}>{item.tag}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  illustrationWrapper: {
    marginTop: 30,
    alignItems: 'center',
  },
  mapCircle: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  simulatedGrid: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
  gridLineH: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    height: 4,
    backgroundColor: COLORS.primary,
  },
  gridLineV: {
    position: 'absolute',
    left: '50%',
    height: '100%',
    width: 4,
    backgroundColor: COLORS.primary,
  },
  pinPulse: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 107, 0, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  pinBadge: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  textSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
  actionSection: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    height: 54,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#F1F5F9',
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '700',
  },
  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backBtn: {
    padding: 6,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
  },
  popularSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 12,
  },
  locationIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationDetails: {
    flex: 1,
  },
  locationName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  locationCity: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  tagBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
});
