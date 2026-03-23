import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';

import LoginForm from '@/components/Forms/LoginForm';
import RegisterForm from '@/components/Forms/RegisterForm';

import { LinearGradient } from "expo-linear-gradient";
import Lottie from 'lottie-react-native';


export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <LinearGradient
      colors={["#d203fc", "rgb(50, 2, 69)"]}
      locations={[0.2, 0.6]}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View className='flex-[4]'>
          <Lottie
            source={require('../../src/assets/animations/bill payment.json')}
            autoPlay
            loop
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View className='flex-[6] bg-white rounded-t-[40px]'>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={{ paddingBottom: 16 }}
          >
            <View className='flex-1 px-4 gap-4 pt-4'>
              {isLogin ? <LoginForm /> : <RegisterForm />}

              <View className="flex-row justify-center pb-8">
                <Text className='text-center text-base'>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                </Text>
                <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                  <Text className='text-base underline font-semibold text-primary'>
                    {isLogin ? "Register" : "Login"}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}


