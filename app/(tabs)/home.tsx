import TransactionCard from '@/components/Cards/TransactionCard'
import TransactionForm from '@/components/Forms/TransactionForm'
import Header from '@/components/HomeScreen/Header'
import { useTransaction } from '@/hooks/useTransaction'
import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Transactions } from '@/types/transactions'

const home = () => {
  const { expenses, fetchExpense, deleteExpense,updateExpense, isFetching } = useTransaction();
  const [editingItem, setEditingItem] = React.useState<Transactions | null>(null);

  useEffect(() => {
    fetchExpense();
  }, [])

  return (
    <SafeAreaView className='flex-1'>
      <Header />
      <View className='px-4 gap-4'>
        <TransactionForm 
          onSuccess={fetchExpense}
          editingItem={editingItem}
          clearEditing={() => setEditingItem(null)}
        />
        <Text className='text-xl font-semibold'>Today's Expenses</Text>
        
        {isFetching ? (
          <ActivityIndicator size="large" color="red" className="mt-10" />
        ) : expenses.length > 0 ? (
          expenses.map((item: any) => (
            <TransactionCard key={item.id}
              id={item.id}
              category={item.category}
              amount={item.amount}
              description={item.description}
              onDelete={()=>deleteExpense(item.id)}
              onEdit={()=>setEditingItem(item)}
            />
          ))
        ) : (
          <Text className='text-base text-center mt-10 text-gray-500'>No data found</Text>
        )}

      </View>
    </SafeAreaView >
  )
}

export default home

const styles = StyleSheet.create({})