import { ActivityIndicator, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';

import OnBoard from '@/components/OnBoard/onBoard';
import { useAuth } from '@/context/auth';

export default function OnboardScreen() {
  const { session, loading } = useAuth();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    AsyncStorage.getItem('hasCompletedOnboarding').then((value: string | null) => {
      if (!isMounted) return;
      setHasCompletedOnboarding(value === 'true');
    }).catch(() => {
      if (isMounted) {
        setHasCompletedOnboarding(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (hasCompletedOnboarding === null || loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#c300ff" />
      </View>
    );
  }

  if (!hasCompletedOnboarding) {
    return <OnBoard />;
  }

  if (session) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/AuthScreen" />;
}
