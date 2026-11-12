import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Brand Logo & Icon */}
        <View style={styles.logoContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="cart" size={48} color={COLORS.primary} />
          </View>
          <Text style={styles.brandTitle}>Alpha Cart</Text>
          <Text style={styles.tagline}>Your Everyday Delivery Partner</Text>
        </View>

        {/* Hero Illustration */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.bagOverlay}>
            <View style={styles.pillBadge}>
              <Ionicons name="flash" size={14} color="#FFF" />
              <Text style={styles.pillText}>10-30 Min Delivery</Text>
            </View>
          </View>
        </View>

        {/* Bottom Action */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => router.push('/onboarding')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.secondaryButtonText}>Skip to Home</Text>
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
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  iconCircle: {
    width: 84,
    height: 84,
    borderRadius: 24,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 6,
    fontWeight: '500',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
    borderRadius: 24,
    overflow: 'hidden',
    height: 260,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  bagOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 107, 0, 0.95)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  pillText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
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
  secondaryButton: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
});
