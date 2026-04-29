import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  className?: string;
  isLoading?: boolean;
};

const PrimaryButton = ({
  title,
  onPress,
  className = '',
  isLoading = false,
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      className={`w-full min-h-[62px] items-center justify-center rounded-[22px] bg-[#1C1632] px-4 ${className}`}
      disabled={isLoading}
      onPress={onPress}
      style={{
        shadowColor: '#12051D',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 18,
        elevation: 8,
      }}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFF9FD" />
      ) : (
        <Text className="text-[17px] font-semibold tracking-[0.3px] text-[#FFF9FD]">{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
