import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { useAuth } from '@/context/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { RegisterFormValues, registerSchema } from '../../domain/validations/auth.schema';
import ControlledInput from './ControlledInput';

const RegisterForm = () => {
  const { signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, handleSubmit } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsSubmitting(true);
      await signUp({
        email: data.email,
        password: data.password,
        options: { data: { name: data.name } },
      });
    } catch {
      // Error is already alerted by the context.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-5">
      <ControlledInput
        autoCapitalize="words"
        autoComplete="name"
        control={control}
        icon="person-outline"
        label="Full name"
        name="name"
        placeholder="Your name"
        textContentType="name"
      />

      <ControlledInput
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        control={control}
        icon="mail-outline"
        keyboardType="email-address"
        label="Email"
        name="email"
        placeholder="name@example.com"
        textContentType="emailAddress"
      />

      <ControlledInput
        autoCapitalize="none"
        autoCorrect={false}
        control={control}
        icon="lock-closed-outline"
        label="Password"
        name="password"
        placeholder="Create a password"
        secureTextEntry
        textContentType="newPassword"
      />

      <ControlledInput
        autoCapitalize="none"
        autoCorrect={false}
        control={control}
        icon="shield-checkmark-outline"
        label="Confirm password"
        name="confirmPassword"
        placeholder="Repeat your password"
        secureTextEntry
        textContentType="password"
      />

      <View className="rounded-[20px] border border-[#EBDFFD] bg-[#F7F1FF] px-4 py-3">
        <Text className="text-[13px] leading-5 text-[#675E82]">
          Your name appears in your profile, and your account stays protected with secure sign-in.
        </Text>
      </View>

      <PrimaryButton
        className="mt-1"
        isLoading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        title="Create Account"
      />
    </View>
  );
};

export default RegisterForm;
