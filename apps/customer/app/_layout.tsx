import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AndroidFrame } from '../components/AndroidFrame';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AndroidFrame>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#FFFFFF' },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="login" />
          <Stack.Screen name="location" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="food" />
          <Stack.Screen name="product/[id]" />
          <Stack.Screen name="shop/[id]" />
          <Stack.Screen name="checkout" />
          <Stack.Screen name="track/[id]" />
          <Stack.Screen name="wishlist" />
          <Stack.Screen name="addresses" />
          <Stack.Screen name="offers" />
          <Stack.Screen name="support" />
        </Stack>
      </AndroidFrame>
    </SafeAreaProvider>
  );
}
