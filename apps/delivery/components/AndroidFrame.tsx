import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';

interface AndroidFrameProps {
  children: React.ReactNode;
}

const FLOW_SCREENS = [
  { name: 'Splash', path: '/' },
  { name: 'Login', path: '/login' },
  { name: 'OTP Verification', path: '/otp' },
  { name: 'KYC & Profile', path: '/kyc' },
  { name: 'Rider Dashboard', path: '/(tabs)' },
  { name: 'New Request Card', path: '/request/req-101' },
  { name: 'Live Navigation', path: '/order/ord-ac784326' },
  { name: 'Confirm Pickup', path: '/pickup-confirm' },
  { name: 'Deliver with OTP', path: '/deliver-otp' },
  { name: 'Earnings Summary', path: '/(tabs)/earnings' },
  { name: 'Bank Payout', path: '/payout' },
  { name: 'Partner Profile', path: '/(tabs)/profile' },
];

export function AndroidFrame({ children }: AndroidFrameProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [windowWidth, setWindowWidth] = useState(
    Platform.OS === 'web' ? window.innerWidth : Dimensions.get('window').width
  );

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  if (Platform.OS !== 'web' || windowWidth <= 520) {
    return <View style={styles.nativeContainer}>{children}</View>;
  }

  return (
    <View style={styles.webBackdrop}>
      {/* Top Flow Navigator Banner */}
      <View style={styles.topControlBar}>
        <View style={styles.brandRow}>
          <View style={styles.brandBadge}>
            <Ionicons name="bicycle" size={16} color="#FFFFFF" />
          </View>
          <Text style={styles.brandTitle}>Alpha Cart Delivery Partner</Text>
          <View style={styles.appPill}>
            <Text style={styles.appPillText}>DELIVERY APP (APP 3) • ANDROID MOBILE FLOW</Text>
          </View>
        </View>

        {/* Quick Screen Switcher Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flowPillsContainer}
        >
          {FLOW_SCREENS.map((screen, idx) => {
            const isActive =
              pathname === screen.path ||
              (screen.path === '/(tabs)' && (pathname === '/(tabs)' || pathname === '/(tabs)/index'));

            return (
              <TouchableOpacity
                key={screen.path}
                style={[styles.flowPill, isActive && styles.flowPillActive]}
                onPress={() => router.push(screen.path as any)}
                activeOpacity={0.8}
              >
                <Text style={styles.stepNum}>{idx + 1}</Text>
                <Text style={[styles.flowPillText, isActive && styles.flowPillTextActive]}>
                  {screen.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Centered Android Phone Frame */}
      <View style={styles.phoneOuterShadow}>
        <View style={styles.phoneChassis}>
          {/* Android Status Bar */}
          <View style={styles.androidStatusBar}>
            <Text style={styles.statusTime}>9:41</Text>
            <View style={styles.cameraHole} />
            <View style={styles.statusIcons}>
              <Ionicons name="wifi" size={14} color="#0F172A" />
              <Ionicons name="cellular" size={14} color="#0F172A" />
              <View style={styles.batteryIcon}>
                <View style={styles.batteryLevel} />
              </View>
            </View>
          </View>

          {/* Screen Content */}
          <View style={styles.screenInner}>{children}</View>

          {/* Bottom Home Indicator */}
          <View style={styles.homeBarArea}>
            <View style={styles.homeGestureBar} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nativeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  webBackdrop: {
    flex: 1,
    minHeight: '100vh' as any,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  topControlBar: {
    width: '100%',
    maxWidth: 960,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandBadge: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: -0.3,
  },
  appPill: {
    backgroundColor: 'rgba(255, 107, 0, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 0, 0.3)',
  },
  appPillText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  flowPillsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  flowPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0F172A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  flowPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  stepNum: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
  },
  flowPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#CBD5E1',
  },
  flowPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  phoneOuterShadow: {
    borderRadius: 48,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.55,
    shadowRadius: 36,
    elevation: 20,
    padding: 2,
    backgroundColor: '#334155',
  },
  phoneChassis: {
    width: 412,
    height: 870,
    backgroundColor: '#FFFFFF',
    borderRadius: 46,
    overflow: 'hidden',
    borderWidth: 8,
    borderColor: '#1E293B',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  androidStatusBar: {
    height: 38,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    zIndex: 999,
  },
  statusTime: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  cameraHole: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0F172A',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  batteryIcon: {
    width: 18,
    height: 10,
    borderWidth: 1,
    borderColor: '#0F172A',
    borderRadius: 2.5,
    padding: 1,
  },
  batteryLevel: {
    width: '80%',
    height: '100%',
    backgroundColor: '#0F172A',
    borderRadius: 1,
  },
  screenInner: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  homeBarArea: {
    height: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeGestureBar: {
    width: 90,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#94A3B8',
  },
});
