import React, { useEffect } from 'react';
import { FlatList, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TransactionCard from '@/components/Cards/transactionCard';
import TransactionForm from '@/components/Forms/TransactionForm';
import Header from '@/components/HomeScreen/Header';
import { Colors } from '@/constants/Colors';
import { useTransaction } from '@/hooks/useTransaction';
import type { TransactionInput } from '@/types/transaction';

export default function Home() {
  const { addExpense, expenses, fetchExpenses, deleteExpense, updateExpense } = useTransaction();
  const [editingId, setEditingId] = React.useState<number | null>(null);

  useEffect(() => {
    void fetchExpenses();
  }, [fetchExpenses]);

  const editingTransaction = expenses.find((exp) => exp.id === editingId);

  const handleSubmit = async (data: TransactionInput) => {
    if (editingId) {
      await updateExpense(editingId, data);
      setEditingId(null);
    } else {
      await addExpense(data);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" translucent />
      <Header />
      <View className="flex-1 px-4">
        <TransactionForm
          initialValues={editingTransaction}
          submitButtonText={editingId ? 'Update' : 'Add'}
          onSubmit={handleSubmit}
          onCancel={editingId ? () => setEditingId(null) : undefined}
        />
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TransactionCard
              id={item.id}
              amount={item.amount}
              category={item.category}
              description={item.description}
              onDelete={deleteExpense}
              onUpdate={setEditingId}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

