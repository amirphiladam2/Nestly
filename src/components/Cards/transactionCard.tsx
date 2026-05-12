import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { Transactions } from '@/types/transactions'

const TransactionCard = ({ amount, category, description,onEdit,onDelete }: Transactions) => {
  return (
    <View className='w-full bg-white py-4 border border-gray-300 border-l-4 border-l-red mt-2 rounded-xl px-2'>
      <View className='flex-row justify-between'>
        <Text className='text-xl font-semibold'>{category}</Text>
        <Text className='text-xl font-semibold text-red'>-${amount}</Text>
      </View>

      <Text>{description}</Text>

      <View className='flex-row justify-end gap-x-4'>
        <TouchableOpacity onPress={onEdit}>
          <Ionicons name='create-outline' size={24} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TransactionCard

const styles = StyleSheet.create({})
