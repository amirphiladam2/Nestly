import { TransactionInput, Transactions } from '@/types/transactions';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export type TransactionFormProps = {
  addExpenses: (data: TransactionInput) => void;
  loading: boolean;
  editingExpense: Transactions | null;
  updateExpense: (
    id: number,
    updatedData: {
      amount: number;
      category: string;
      description: string;
    }
  ) => void;
}
const TransactionForm = ({ addExpenses, loading, editingExpense, updateExpense }: TransactionFormProps) => {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const [error, setError] = useState('')

  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDescription(editingExpense.description || '');
    }
  }, [editingExpense]);

  const handleAddTransaction = () => {
    if (!amount || !category) {
      setError("All fields are required");
      return;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setError('');

    if (editingExpense) {

      updateExpense(editingExpense.id, {
        amount: Number(amount),
        category,
        description
      });

    } else {

      addExpenses({
        amount: Number(amount),
        category,
        description
      });

    }

    setAmount('');
    setCategory('');
    setDescription('');
  }
  return (
    <View className="mb-4">
      {error ? <Text className='text-lg text-red-500 mb-2'>{error}</Text> : null}
      <TextInput
        className='border border-gray-300 p-3 rounded-lg mb-3'
        placeholder='Enter the amount'
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        className='border border-gray-300 p-3 rounded-lg mb-3'
        placeholder='Enter the Category'
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        className='border border-gray-300 p-3 rounded-lg mb-4'
        placeholder='Enter the description'
        value={description}
        onChangeText={setDescription}
      />
      <Button
        disabled={loading}
        title={loading ? "Saving..." : editingExpense ? "Update" : "Add Transaction"}
        onPress={handleAddTransaction}
      />
    </View>
  )
}

export default TransactionForm

const styles = StyleSheet.create({})