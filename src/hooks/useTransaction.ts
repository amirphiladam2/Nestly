import { supabase } from "@/lib/supabase";
import { useState } from 'react'
import { Transactions, TransactionInput } from "@/types/transactions";

export const useTransaction = () => {
    const [expenses, setExpenses] = useState<Transactions[]>([])
    const [loading, setLoading] = useState(false);

    const addExpense = async ({ category, amount, description }: TransactionInput) => {
        if (loading) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('expenses')
            .insert([{
                amount,
                category,
                description
            }])
        if (error) {
            console.log(error.message);
            setLoading(false);
            return;
        }
        await fetchExpense();
        console.log("Inserted Data:", data);
        setLoading(false);
    }

    const fetchExpense = async () => {
        const { data, error } = await supabase
            .from('expenses')
            .select('*')
            .order('id', { ascending: false })

        if (error) {
            console.log(error.message)
            return;
        }
        setExpenses(data || [])
    }

    const deleteExpense = async (id: number) => {
        const { error } = await supabase
            .from('expenses')
            .delete()
            .eq('id', id);

        if (error) {
            console.log(error.message);
            return;
        }
        setExpenses((current) => current.filter((expense) => expense.id !== id))
    };

    const updateExpense = async (id: number,
        updatedData: {
            amount: number;
            category: string;
            description: string;
        }
    ) => {
        const { data, error } = await supabase
            .from('expenses')
            .update(updatedData)
            .eq('id', id)
            .select()
            .single()

        if(error){
        console.log(error.message);
        return;
        }
       setExpenses((current)=>(
        current.map((expense)=>expense.id===id?data:expense)
       ));
    }
    
    return { expenses, fetchExpense, addExpense, deleteExpense, updateExpense, loading }
}