import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AndroidFrame } from '../components/AndroidFrame';

export default function SellerRootLayout() {
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
          <Stack.Screen name="login" />
          <Stack.Screen name="otp" />
          <Stack.Screen name="business-type" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="shop-status" />
          <Stack.Screen name="order/[id]" />
          <Stack.Screen name="add-product" />
          <Stack.Screen name="earnings" />
          <Stack.Screen name="reports" />
        </Stack>
      </AndroidFrame>
    </SafeAreaProvider>
  );
}
