import { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '@/context/auth';
import { Stack } from "expo-router";
import "./global.css"

const InitialLayout = () => {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait until we know the auth status

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      //No session + trying to access App -> Go to Login
      router.replace('/(auth)/AuthScreen');
    } else if (session && inAuthGroup) {
      //Has session + sitting on Login -> Go to Home
      router.replace('/(tabs)/home');
    }
  }, [session, loading, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}

