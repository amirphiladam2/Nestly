import TransactionCard from "@/components/Cards/TransactionCard";

export type Transactions={
    id:number;
    amount:number;
    category:string;
    description?:string|null;
    onDelete:()=>void;
    onEdit:()=>void;

}
export type TransactionInput = {
  amount: number;
  category: string;
  description: string;
}

