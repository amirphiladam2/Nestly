import { supabase } from "@/lib/supabase";
import { TransactionInput, Transactions } from "@/types/transactions";
import { useState } from "react";
import { file } from "zod";

export const useTransaction=()=>{
  const[expenses,setExpenses]=useState<Transactions[]>([])
  const[loading,setLoading]=useState(false) 
  const[isFetching, setIsFetching]=useState(true) 

    const fetchExpense=async()=>{
      setIsFetching(true)
      const{data,error}= await supabase
      .from('expenses')
      .select('*')
      .order('id',{ascending:true})

      if(error){
        console.log(error.message);
        setIsFetching(false)
        return;
      }
      setExpenses(data||[])
      setIsFetching(false)
    }

  const addExpense=async({category,amount,description}:TransactionInput)=>{
    if(loading) return;
    setLoading(true);
    const{data,error}=await supabase
    .from('expenses')
    .insert([{
      amount:Number(amount),
      category,
      description
    }])
    if(error){
      console.log(error.message);
      setLoading(false);
      return;
    }
    await fetchExpense();
    console.log("Inserted Data:",data);
    setLoading(false);
  }
  const deleteExpense=async(id:number)=>{
     const{error}= await supabase
     .from('expenses')
     .delete()
     .eq('id',id)

     if(error){
      console.log(error.message);
      return;
     }
     setExpenses((current) => current.filter((expense) => expense.id !== id))
  }
  
  const updateExpense=async(id:number,updatedData:{
     amount:number,
     category:string;
     description:string;
  })=>{
     const{data,error}= await supabase
     .from('expenses')
     .update(updatedData)
     .eq('id',id)
     .select()
     .single()

     if(error){
      console.log("Error in updating",error.message);
      return;
     }
     setExpenses((current)=>(current.map((expense)=>expense.id===id?data:expense)))
  }
 return{expenses,fetchExpense,addExpense,deleteExpense,updateExpense,loading,isFetching}
}