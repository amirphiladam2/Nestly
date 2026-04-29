import { Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
const Header = () => {
  return (
    <View className="h-24 flex-row items-center gap-x-2 border-b border-white bg-white p-2 px-4">
      <View className="h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-gray-300">
        <Ionicons name="person" size={48} color="#ccc" />
      </View>
      <View className="flex-1">
        <Text>Welcome Back</Text>
        <Text className="font-semibold">Hello,Amir</Text>
      </View>
      <Ionicons name="notifications" size={30} color="#666"
        style={{ marginRight: 12 }}
      />
    </View>
  );
};

export default Header;

