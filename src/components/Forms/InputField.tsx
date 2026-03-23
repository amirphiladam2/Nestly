import React from 'react';
import { Text, TextInput, View } from 'react-native';

export type InputFieldProps = {
  label: string,
  value: string,
  placeholder?: string,
  onChangeText: (text: string) => void,
  secureTextEntry?: boolean,
  error?: string,
}
export default function InputField({
  label,
  value,
  placeholder,
  onChangeText,
  secureTextEntry = false,
  error,
}: InputFieldProps) {

  return (
    <View className='gap-2'>
      {label && (<Text className='text-base font-semibold text-gray-600'>{label}</Text>)}
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secureTextEntry}
        className={`w-full h-14 px-4 bg-gray-200 rounded-[15px] border ${error ? 'border-red' : 'border-gray-200'}`}
      />
      {error && <Text className='text-red text-sm mt-1'>{error}</Text>}
    </View>
  )
}

