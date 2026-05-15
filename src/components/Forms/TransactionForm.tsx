import { useTransaction } from '@/hooks/useTransaction';
import { Transactions } from '@/types/transactions';
import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

type TransactionFormProps={
  onSuccess: () => void;
  editingItem: Transactions | null;
  clearEditing: () => void;
}

const TransactionForm = ({ onSuccess, editingItem, clearEditing }: TransactionFormProps) => {
    const[category,setCategory]=useState('')
    const[amount,setAmount]=useState('')
    const[description,setDescription]=useState('')
    const[error,setError]=useState('')
   
    const{addExpense, updateExpense, loading}=useTransaction();

    useEffect(()=>{
      if(editingItem){
        setAmount(editingItem.amount.toString());
        setCategory(editingItem.category);
        setDescription(editingItem.description || '');
      }
    },[editingItem])
    
    const handleAddTransaction=async()=>{
       if(!category || !amount){
         setError("Please provide the details");
         return;
       }

       if(isNaN(Number(amount)) || Number(amount)<=0){
         setError("Please enter a valid amount");
         return;
       }
       setError('')

         if (editingItem) {
      await updateExpense(editingItem.id, {
        amount: Number(amount),
        category,
        description
      });
      clearEditing();

    } else {

      await addExpense({
        amount: Number(amount),
        category,
        description
      });

    }
       //Clear the fields
       setAmount('')
       setCategory('')
       setDescription('')

       // Notify parent (Home) that we successfully added an item
       onSuccess()
    }

    const handleCancel = () => {
      setAmount('')
      setCategory('')
      setDescription('')
      clearEditing()
    }

  return (
    <View className='gap-2 mb-2'>
     {error?<Text className='text-red'>{error}</Text>:null}
      <TextInput
        className='border border-gray-400 rounded-xl'
        placeholder='Enter the amount $'
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        className='border border-gray-400 rounded-xl'
        placeholder='Enter the category'
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        className='border border-gray-400 rounded-xl px-2 py-1'
        placeholder='Enter the description'
        value={description}
        onChangeText={setDescription}
      />
      <View className="flex-row justify-between w-full">
        {editingItem && (
          <View className="flex-1 mr-2">
            <Button 
              title="Cancel"
              onPress={handleCancel}
              color="gray"
            />
          </View>
        )}
        <View className="flex-1">
          <Button 
             title={loading ? (editingItem ? 'Updating...' : 'Adding...') : (editingItem ? 'Update' : 'Add Transaction')}
             onPress={handleAddTransaction}
             disabled={loading}
           />
        </View>
      </View>
    </View>
  )
}
export default TransactionForm

