import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
  id: number;
  amount: number;
  category: string;
  description?: string | null;
  onUpdate?: (id: number) => void;
  onDelete?: (id: number) => void;
};

export default function TransactionCard({ id, amount, category, description, onUpdate, onDelete }: Props) {
  return (
    <View className="flex-row justify-between items-center p-4 mt-4 w-full h-24 border border-borderColor rounded-xl">
      <View>
        <Text className="font-bold">{category}</Text>
        <Text>{description || 'No description'}</Text>
      </View>
      <View className="items-end">
        <Text className="text-red font-bold mb-2">-${amount}</Text>
        <View className="flex-row gap-4">
          {onUpdate && (
            <TouchableOpacity onPress={() => onUpdate(id)}>
              <Feather name="edit-2" size={16} color="gray" />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity onPress={() => onDelete(id)}>
              <Feather name="trash-2" size={16} color="gray" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
