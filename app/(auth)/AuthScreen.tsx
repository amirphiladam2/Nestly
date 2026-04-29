import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Lottie from 'lottie-react-native';

import LoginForm from '@/components/Forms/LoginForm';
import RegisterForm from '@/components/Forms/RegisterForm';

const authHighlights = ['Track spending', 'Stay on budget', 'See trends faster'];

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <LinearGradient colors={['#08111F', '#161F3A', '#3A145E']} style={{ flex: 1 }}>
      <StatusBar style="light" />

      <View className="absolute -left-12 top-24 h-40 w-40 rounded-full bg-[#FFFFFF]/8" />
      <View className="absolute -right-10 top-14 h-52 w-52 rounded-full bg-[#FF58C9]/18" />
      <View className="absolute bottom-28 left-0 h-44 w-44 rounded-full bg-[#7C5CFF]/12" />

      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            bounces={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-1 justify-between px-4 pt-2">
              <View className="px-2">
                <View className="self-start rounded-full border border-white/15 bg-white/10 px-4 py-2">
                  <Text className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#F9EDFF]">
                    Personal finance, simplified
                  </Text>
                </View>

                <View className="mt-5 flex-row items-center justify-between">
                  <View className="flex-1 pr-4">
                    <Text className="text-[38px] font-black leading-[42px] text-white">Nestly</Text>
                    <Text className="mt-3 text-[16px] leading-7 text-[#D4C8F1]">
                      Build calmer money habits with one place for your expenses, budgets, and daily
                      financial decisions.
                    </Text>
                  </View>

                  <View className="-mr-2 h-[170px] w-[170px]">
                    <Lottie
                      source={require('../../src/assets/animations/login.json')}
                      autoPlay
                      loop
                      style={{ width: '100%', height: '100%' }}
                    />
                  </View>
                </View>

                <View className="mt-4 flex-row flex-wrap gap-3">
                  {authHighlights.map((item) => (
                    <View
                      key={item}
                      className="flex-row items-center rounded-full border border-white/12 bg-white/10 px-3.5 py-2"
                    >
                      <View className="mr-2 h-2 w-2 rounded-full bg-[#FF8AD9]" />
                      <Text className="text-[13px] font-medium text-[#F5EFFF]">{item}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View
                className="mt-6 rounded-[32px] border border-[#E9D8FB] bg-[#FFF9FD] px-5 pb-6 pt-5"
                style={{
                  shadowColor: '#18042A',
                  shadowOffset: { width: 0, height: 12 },
                  shadowOpacity: 0.16,
                  shadowRadius: 24,
                  elevation: 12,
                }}
              >
                <View className="flex-row rounded-full bg-[#F2E8FE] p-1">
                  <TouchableOpacity
                    activeOpacity={0.9}
                    className={`flex-1 rounded-full px-4 py-3 ${
                      isLogin ? 'bg-[#1C1632]' : 'bg-transparent'
                    }`}
                    onPress={() => setIsLogin(true)}
                  >
                    <Text
                      className={`text-center text-[15px] font-semibold ${
                        isLogin ? 'text-white' : 'text-[#6F668B]'
                      }`}
                    >
                      Sign in
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.9}
                    className={`flex-1 rounded-full px-4 py-3 ${
                      isLogin ? 'bg-transparent' : 'bg-[#1C1632]'
                    }`}
                    onPress={() => setIsLogin(false)}
                  >
                    <Text
                      className={`text-center text-[15px] font-semibold ${
                        isLogin ? 'text-[#6F668B]' : 'text-white'
                      }`}
                    >
                      Create account
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="mt-5 gap-2">
                  <Text className="text-[28px] font-bold text-[#1C1632]">
                    {isLogin ? 'Welcome back' : 'Make your money easier to manage'}
                  </Text>
                  <Text className="text-[15px] leading-6 text-[#6C6388]">
                    {isLogin
                      ? 'Sign in to pick up your budgets, recent activity, and insights right where you left them.'
                      : 'Create your account to start tracking expenses and building a clearer picture of your finances.'}
                  </Text>
                </View>

                <View className="mt-6">{isLogin ? <LoginForm /> : <RegisterForm />}</View>

                <View className="mt-6 flex-row items-center justify-center rounded-[20px] bg-[#F7F1FF] px-4 py-3">
                  <Ionicons name="shield-checkmark-outline" size={16} color="#6C6388" />
                  <Text className="ml-2 text-[13px] text-[#6C6388]">
                    Protected with secure email authentication.
                  </Text>
                </View>

                <View className="mt-5 flex-row justify-center">
                  <Text className="text-center text-[15px] text-[#6C6388]">
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                  </Text>
                  <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                    <Text className="text-[15px] font-semibold text-primary">
                      {isLogin ? 'Create one' : 'Sign in'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
