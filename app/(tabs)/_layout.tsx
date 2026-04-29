import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const getTabIcon = (routeName: string) => {
  switch (routeName) {
    case 'home':
      return 'home';
    case 'transactions':
      return 'swap-horizontal';
    case 'dataAnaltics':
      return 'bar-chart';
    case 'profile':
      return 'person';
    default:
      return 'ellipse';
  }
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1C1632',
        tabBarInactiveTintColor: '#8D87A2',
        tabBarStyle: {
          backgroundColor: '#FFF9FD',
          borderTopColor: '#E9D8FB',
          height: 72,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={getTabIcon(route.name)} size={size} color={color} />
        ),
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="transactions" options={{ title: 'Transactions' }} />
      <Tabs.Screen name="dataAnaltics" options={{ title: 'Analytics' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
