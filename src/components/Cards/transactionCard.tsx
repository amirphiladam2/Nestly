import { Transactions } from '@/types/transactions'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const TransactionCard = ({ category, amount, description, onDelete, onEdit }: Transactions & { onEdit?: () => void }) => {
  return (
    <View className='w-full py-4 border border-gray-200 bg-white px-4 rounded-xl border-l-4 border-l-red'>
      <View className='flex-row justify-between'>
        <Text className='text-xl font-semibold'>{category}</Text>
        <Text className='text-xl text-red'>-${amount}</Text>
      </View>
      <Text>{description}</Text>
      <View className='flex-row justify-end gap-x-2'>
        <TouchableOpacity onPress={onEdit}>
          <Ionicons name='create-outline' size={22} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name='trash' size={22} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TransactionCard

const styles = StyleSheet.create({})