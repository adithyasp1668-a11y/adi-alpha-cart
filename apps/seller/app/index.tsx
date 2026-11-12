import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';

export default function SellerSplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Brand Header */}
        <View style={styles.logoSection}>
          <View style={styles.iconCircle}>
            <Ionicons name="storefront" size={44} color={COLORS.primary} />
          </View>
          <Text style={styles.brandTitle}>Alpha Cart</Text>
          <View style={styles.sellerBadge}>
            <Text style={styles.sellerBadgeText}>SELLER PARTNER</Text>
          </View>
          <Text style={styles.subtitle}>Manage Your Business On The Go</Text>
        </View>

        {/* Storefront Graphic */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.storefrontOverlay}>
            <Ionicons name="checkmark-circle" size={18} color="#10B981" />
            <Text style={styles.overlayText}>Verified Merchant Network</Text>
          </View>
        </View>

        {/* Bottom Actions */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.88}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.buttonText}>Open Seller Portal</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.skipButtonText}>Direct to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 26,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0F172A',
  },
  sellerBadge: {
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sellerBadgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },
  imageWrapper: {
    height: 240,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  storefrontOverlay: {
    position: 'absolute',
    bottom: 14,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  overlayText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  footer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    height: 54,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
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
  skipButton: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
});
