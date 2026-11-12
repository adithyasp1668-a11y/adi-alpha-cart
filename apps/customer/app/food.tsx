import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';
import { mockStore } from '@alpha-cart/api-client';
import { Shop } from '@alpha-cart/shared-types';

const CUISINES = ['All', 'Biryani', 'Pizza', 'Burger', 'Chinese', 'South Indian'];

export default function FoodSectionScreen() {
  const router = useRouter();
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [shops, setShops] = useState<Shop[]>([]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'shop-spice-haven': true,
  });

  useEffect(() => {
    const updateShops = () => {
      setShops(mockStore.getShops('food'));
    };
    updateShops();
    return mockStore.subscribe(updateShops);
  }, []);

  const toggleFavorite = (shopId: string) => {
    setFavorites((prev) => ({ ...prev, [shopId]: !prev[shopId] }));
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Food</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="options-outline" size={22} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Veg / Non-Veg / All Toggle Pills (Exact match to reference mockup) */}
        <View style={styles.dietToggleRow}>
          <TouchableOpacity
            style={[
              styles.dietPill,
              dietFilter === 'veg' && styles.dietPillVegActive,
            ]}
            onPress={() => setDietFilter(dietFilter === 'veg' ? 'all' : 'veg')}
          >
            <View style={styles.vegIndicatorDot} />
            <Text style={[styles.dietPillText, dietFilter === 'veg' && styles.dietPillTextActive]}>
              Veg
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.dietPill,
              dietFilter === 'non-veg' && styles.dietPillNonVegActive,
            ]}
            onPress={() => setDietFilter(dietFilter === 'non-veg' ? 'all' : 'non-veg')}
          >
            <View style={styles.nonVegIndicatorDot} />
            <Text style={[styles.dietPillText, dietFilter === 'non-veg' && styles.dietPillTextActive]}>
              Non-Veg
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.dietPill,
              dietFilter === 'all' && styles.dietPillAllActive,
            ]}
            onPress={() => setDietFilter('all')}
          >
            <Text style={[styles.dietPillText, dietFilter === 'all' && styles.dietPillTextActive]}>
              All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cuisine Filter Tags */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cuisineRow}>
          {CUISINES.map((cuisine) => {
            const isSelected = selectedCuisine === cuisine;
            return (
              <TouchableOpacity
                key={cuisine}
                style={[styles.cuisineChip, isSelected && styles.cuisineChipActive]}
                onPress={() => setSelectedCuisine(cuisine)}
              >
                <Text style={[styles.cuisineChipText, isSelected && styles.cuisineChipTextActive]}>
                  {cuisine}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Restaurants Near You Section (Exact match to reference image) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Restaurants Near You</Text>
          <Text style={styles.resultsCount}>{shops.length} Outlets</Text>
        </View>

        <View style={styles.restaurantList}>
          {shops.map((shop) => (
            <TouchableOpacity
              key={shop.id}
              style={styles.restaurantCard}
              activeOpacity={0.9}
              onPress={() => router.push({ pathname: '/shop/[id]', params: { id: shop.id } })}
            >
              <Image source={{ uri: shop.image }} style={styles.restaurantImage} />

              <View style={styles.restaurantContent}>
                <View style={styles.cardTopRow}>
                  <Text style={styles.restaurantName}>{shop.name}</Text>
                  <TouchableOpacity
                    onPress={() => toggleFavorite(shop.id)}
                    style={styles.favBtn}
                  >
                    <Ionicons
                      name={favorites[shop.id] ? 'heart' : 'heart-outline'}
                      size={20}
                      color={favorites[shop.id] ? '#EF4444' : '#94A3B8'}
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.cuisineText}>{shop.cuisineOrSpec}</Text>

                <View style={styles.metaRow}>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={13} color="#F59E0B" />
                    <Text style={styles.ratingText}>
                      {shop.rating} ({shop.reviewCount > 1000 ? `${(shop.reviewCount / 1000).toFixed(1)}k` : shop.reviewCount})
                    </Text>
                  </View>

                  <View style={styles.metaDot} />
                  <Text style={styles.metaText}>{shop.deliveryTimeEstimate}</Text>

                  <View style={styles.metaDot} />
                  <View style={styles.distanceBadge}>
                    <Ionicons name="location-outline" size={13} color="#64748B" />
                    <Text style={styles.distanceText}>{shop.distanceKm} km</Text>
                  </View>
                </View>

                {!shop.isOpen && (
                  <View style={styles.closedBadge}>
                    <Text style={styles.closedBadgeText}>Currently Closed</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  iconBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  dietToggleRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  dietPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  vegIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  nonVegIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  dietPillVegActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  dietPillNonVegActive: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  dietPillAllActive: {
    backgroundColor: '#1E293B',
    borderColor: '#1E293B',
  },
  dietPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  dietPillTextActive: {
    color: '#FFFFFF',
  },
  cuisineRow: {
    gap: 8,
    paddingVertical: 16,
  },
  cuisineChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cuisineChipActive: {
    backgroundColor: '#FFF3E0',
    borderColor: COLORS.primary,
  },
  cuisineChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  cuisineChipTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  resultsCount: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  restaurantList: {
    gap: 16,
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  restaurantImage: {
    width: 100,
    height: 100,
  },
  restaurantContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    gap: 4,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  favBtn: {
    padding: 2,
  },
  cuisineText: {
    fontSize: 12,
    color: '#64748B',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
  },
  metaText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  distanceText: {
    fontSize: 12,
    color: '#64748B',
  },
  closedBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  closedBadgeText: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '700',
  },
});
