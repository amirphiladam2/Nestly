export type Transaction = {
  id: number;
  amount: number;
  category: string;
  description: string | null;
};

export type TransactionInput = Pick<Transaction, 'amount' | 'category'> & {
  description?: string;
};
