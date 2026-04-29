import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { useAuth } from '@/context/auth';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const { user, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const displayName =
    typeof user?.user_metadata?.name === 'string' && user.user_metadata.name.trim().length > 0
      ? user.user_metadata.name
      : 'Nestly member';

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFF9FD]">
      <View className="flex-1 px-5 pb-8 pt-4">
        <View
          className="rounded-[28px] border border-borderColor bg-white px-5 py-6"
          style={{
            shadowColor: '#18042A',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.08,
            shadowRadius: 24,
            elevation: 8,
          }}
        >
          <View className="h-16 w-16 items-center justify-center rounded-full bg-[#1C1632]">
            <Ionicons name="person" size={32} color="#FFF9FD" />
          </View>

          <Text className="mt-4 text-[28px] font-bold text-[#1C1632]">{displayName}</Text>
          <Text className="mt-2 text-[15px] leading-6 text-[#6C6388]">
            {user?.email ?? 'Signed in to Nestly'}
          </Text>

          <View className="mt-6 rounded-[22px] bg-[#F7F1FF] px-4 py-4">
            <Text className="text-[13px] font-semibold uppercase tracking-[1.2px] text-[#8A739D]">
              Account
            </Text>
            <Text className="mt-2 text-[15px] leading-6 text-[#675E82]">
              Need to switch accounts? You can sign out here and log back in with a different
              email anytime.
            </Text>
          </View>
        </View>

        <View className="mt-auto pt-6">
          <PrimaryButton
            isLoading={isSigningOut}
            onPress={handleSignOut}
            title="Log Out"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
