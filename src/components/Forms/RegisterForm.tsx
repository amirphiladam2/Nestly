import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
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
                options: { data: { name: data.name } }
            });
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
                name="name"
                label="Name"
                placeholder="Enter your name"
            />

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
            <ControlledInput
                control={control}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                secureTextEntry={true}
            />

            <PrimaryButton
                title='Register'
                className="w-full mt-6"
                onPress={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
            />
        </View>
    )
}

export default RegisterForm;
