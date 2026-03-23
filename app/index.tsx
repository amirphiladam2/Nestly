import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import OnBoard from '@/components/OnBoard/onBoard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect } from 'expo-router'

export default function OnboardScreen() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('hasCompletedOnboarding').then((value: string | null) => {
      if (value === 'true') {
        setIsFirstLaunch(false);
      } else {
        setIsFirstLaunch(true);
      }
    }).catch(() => {
      setIsFirstLaunch(true);
    });
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#c300ff" />
      </View>
    );
  }

  if (!isFirstLaunch) {
    return <Redirect href="/(auth)/AuthScreen" />;
  }

  return (
    <OnBoard/>
  )
}
