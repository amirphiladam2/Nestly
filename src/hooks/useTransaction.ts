import { useCallback, useState } from 'react';

import { supabase } from '@/lib/supabase';
import type { Transaction, TransactionInput } from '@/types/transaction';

export const useTransaction = () => {
  const [expenses, setExpenses] = useState<Transaction[]>([]);

  const addExpense = async ({ amount, category, description }: TransactionInput) => {
    const payload = {
      amount,
      category,
      description: description?.trim() || null,
    };

    const { data, error } = await supabase
      .from('expenses')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.log('Error adding expense:', error.message);
      throw error;
    }

    setExpenses((currentExpenses) => [data as Transaction, ...currentExpenses]);
  };

  const fetchExpenses = useCallback(async () => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.log('Fetch error:', error.message);
      return;
    }

    setExpenses((data as Transaction[]) ?? []);
  }, []);

  const updateExpense = async (id: number, updates: Partial<TransactionInput>) => {
    const { data, error } = await supabase
      .from('expenses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    setExpenses((current) => current.map((exp) => exp.id === id ? (data as Transaction) : exp));
  };

  const deleteExpense = async (id: number) => {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) throw error;
    setExpenses((current) => current.filter((exp) => exp.id !== id));
  };

  return {
    expenses,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };
};



