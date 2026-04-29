import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

export type InputFieldProps = TextInputProps & {
  label?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

export default function InputField({
  label,
  error,
  icon,
  secureTextEntry = false,
  placeholderTextColor = '#8C84A4',
  onFocus,
  onBlur,
  ...textInputProps
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const showPasswordToggle = secureTextEntry;
  const isPasswordHidden = secureTextEntry && !isPasswordVisible;
  const borderStateClassName = error
    ? 'border-[#F495A4] bg-[#FFF2F4]'
    : isFocused
      ? 'border-primary bg-white'
      : 'border-[#E6DAF5] bg-[#FBF8FE]';
  const iconColor = error ? '#E34A63' : isFocused ? '#D203FC' : '#7A7197';

  return (
    <View className="gap-2.5">
      {label ? (
        <Text className="pl-1 text-[13px] font-semibold uppercase tracking-[1.4px] text-[#5D5579]">
          {label}
        </Text>
      ) : null}

      <View className={`min-h-[62px] flex-row items-center rounded-[22px] border px-4 ${borderStateClassName}`}>
        {icon ? <Ionicons name={icon} size={18} color={iconColor} style={{ marginRight: 12 }} /> : null}

        <TextInput
          {...textInputProps}
          className="flex-1 py-4 text-[16px] text-[#1F1837]"
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={isPasswordHidden}
          selectionColor="#D203FC"
        />

        {showPasswordToggle ? (
          <TouchableOpacity
            activeOpacity={0.8}
            className="ml-3"
            onPress={() => setIsPasswordVisible((currentValue) => !currentValue)}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#7A7197"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? <Text className="pl-1 text-sm font-medium text-[#E34A63]">{error}</Text> : null}
    </View>
  );
}
