export type Transaction = {
    id?: string;
    userId: string;
    amount: number;
    category: string;
    date: string | Date;
    notes?: string;
    type: "income" | "expense";
  };

  export type monthlyTransaction = {
    category: string;
    totalAmount: number;
  }
  