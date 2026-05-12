import { StyleSheet, Text, View,Button } from 'react-native'
import React, { useEffect,useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/HomeScreen/Header'
import TransactionForm from '@/components/Forms/TransactionForm'
import { useTransaction } from '@/hooks/useTransaction'
import TransactionCard from '@/components/Cards/TransactionCard'
import { Transactions } from '@/types/transactions'
import { TransactionInput } from '@/types/transactions'

const home = () => {
  const[editingExpense,setEditingExpense]=useState<Transactions|null>(null);
  const { expenses, fetchExpense,addExpense,deleteExpense,updateExpense,loading } = useTransaction();
 
  useEffect(() => {
    fetchExpense();
  }, [])

  const handleUpdateExpense = async (
  id: number,
  updatedData: TransactionInput
) => {

  await updateExpense(id, updatedData);

  setEditingExpense(null);
};
  return (
    <SafeAreaView className='flex-1'>
      <Header />
      <View className='px-4'>
        <TransactionForm 
          addExpenses={addExpense}
          editingExpense={editingExpense}
          updateExpense={handleUpdateExpense}
          loading={loading}
        />
        {expenses.length > 0 ? (expenses.map((item: any) =>
        (<TransactionCard
          key={item.id}
          id={item.id}
          amount={item.amount} 
          category={item.category}
          description={item.description}
          onDelete={()=>deleteExpense(item.id)}
          onEdit={()=>setEditingExpense(item)}
        />))
        ) :
          (<Text>No meal found in the table</Text>)}
      </View>
    </SafeAreaView>
  )
}

export default home

const styles = StyleSheet.create({})