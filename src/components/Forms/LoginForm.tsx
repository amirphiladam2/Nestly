import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/auth';
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
    } catch (e) {
      // Error is already alerted by the context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="px-4 gap-4 mt-4">
      <ControlledInput
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
      />

      <ControlledInput
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        secureTextEntry={true}
      />

      <Text className='text-right text-primary font-semibold'>Forgot Password?</Text>

      <PrimaryButton
        title='Login'
        className="w-full mt-6"
        onPress={handleSubmit(onSubmit)}
        isLoading={isSubmitting}
      />
    </View>
  )
}

export default LoginForm;
