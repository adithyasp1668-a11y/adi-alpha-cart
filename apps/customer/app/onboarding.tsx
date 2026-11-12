import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header Skip */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/login')} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Illustration */}
      <View style={styles.imageSection}>
        <View style={styles.illustrationWrapper}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=700&q=80' }}
            style={styles.scooterImage}
            resizeMode="cover"
          />
          <View style={styles.deliveryBadge}>
            <Ionicons name="bicycle" size={20} color={COLORS.primary} />
            <Text style={styles.deliveryBadgeText}>Hyperlocal Express</Text>
          </View>
        </View>
      </View>

      {/* Content & Pager */}
      <View style={styles.contentSection}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Everything You Need In One App</Text>
          <Text style={styles.subtitle}>
            Grocery, Food, Gym & Fitness and Use & Throw, delivered at your doorstep.
          </Text>
        </View>

        {/* Pager Indicator */}
        <View style={styles.pagerDots}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 36,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 40,
    alignItems: 'center',
  },
  skipButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
  },
  imageSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  illustrationWrapper: {
    width: width * 0.82,
    height: width * 0.82,
    borderRadius: 36,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  scooterImage: {
    width: '100%',
    height: '100%',
  },
  deliveryBadge: {
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
  deliveryBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  contentSection: {
    alignItems: 'center',
    gap: 24,
  },
  textWrapper: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  pagerDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
  },
  activeDot: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
  primaryButton: {
    width: '100%',
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
});
