import React, { useEffect, useState } from 'react';
import { Button, TextInput, View } from 'react-native';

import type { Transaction, TransactionInput } from '@/types/transaction';

type TransactionFormProps = {
  initialValues?: Transaction | null;
  submitButtonText?: string;
  onSubmit: (data: TransactionInput) => Promise<void> | void;
  onCancel?: () => void;
};

const TransactionForm = ({ initialValues, submitButtonText = 'Add', onSubmit, onCancel }: TransactionFormProps) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialValues) {
      setAmount(initialValues.amount.toString());
      setCategory(initialValues.category);
      setDescription(initialValues.description || '');
    } else {
      resetForm();
    }
  }, [initialValues]);

  const resetForm = () => {
    setAmount('');
    setCategory('');
    setDescription('');
  };

  const handleSubmit = async () => {
    const parsedAmount = Number(amount);

    if (!amount || !category || Number.isNaN(parsedAmount)) {
      return;
    }

    try {
      await onSubmit({
        amount: parsedAmount,
        category: category.trim(),
        description: description.trim(),
      });
      resetForm();
    } catch (error) {
      console.log('Unable to save transaction:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        className="mb-4"
      />
      <View className="flex-row gap-4 mb-4">
        {onCancel && (
          <View className="flex-1">
            <Button title="Cancel" onPress={onCancel} color="gray" />
          </View>
        )}
        <View className="flex-1">
          <Button title={submitButtonText} onPress={() => void handleSubmit()} />
        </View>
      </View>
    </View>
  );
};

export default TransactionForm;
