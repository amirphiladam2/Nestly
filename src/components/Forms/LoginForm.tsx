import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { useAuth } from '@/context/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { LoginFormValues, loginSchema } from '../../domain/validations/auth.schema';
import ControlledInput from './ControlledInput';

const LoginForm = () => {
  const { signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      await signIn({ email: data.email, password: data.password });
    } catch {
      // Error is already alerted by the context.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-5">
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
        placeholder="Enter your password"
        secureTextEntry
        textContentType="password"
      />

      <View className="rounded-[20px] border border-[#EBDFFD] bg-[#F7F1FF] px-4 py-3">
        <Text className="text-[13px] leading-5 text-[#675E82]">
          Use the email linked to your Nestly account to continue where you left off.
        </Text>
      </View>

      <PrimaryButton
        className="mt-1"
        isLoading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        title="Sign In"
      />
    </View>
  );
};

export default LoginForm;
