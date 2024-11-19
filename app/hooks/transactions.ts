import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useTotalExpense(userId: string) {
  return useQuery({
    queryKey: ["getTotalExpense", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID not found");
      }

      const response = await axios.get(`http://localhost:5000/api/transactions/${userId}`);
      const data = response.data;

      // Hitung total expense
      const totalExpense = data
        .filter((transaction: any) => transaction.type === "expense") // Filter hanya "expense"
        .reduce((sum: number, transaction: any) => sum + transaction.amount, 0); // Hitung total

      return { totalExpense };
    },
  });
}

export function useTransactions(userId: string) {
  return useQuery({
    queryKey: ["transactions", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID not found");
      }

      const response = await axios.get(`http://localhost:5000/api/transactions/${userId}`);
      const data = response.data;

      const transactions = data.map((transaction: any) => ({
        amount: transaction.amount,
        category: transaction.category,
        date: transaction.date,
        notes: transaction.notes,
        type: transaction.type,
      }));

      return { transactions };
    },
  });
}

export function useIncome(userId: string) {
  return useQuery({
    queryKey: ["getTotalIncome", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID not found");
      }

      const response = await axios.get(`http://localhost:5000/api/transactions/${userId}`);
      const data = response.data;

      // Hitung total income
      const totalIncome = data
        .filter((transaction: any) => transaction.type === "income") // Filter hanya "income"
        .reduce((sum: number, transaction: any) => sum + transaction.amount, 0); // Hitung total

      return { totalIncome };
    },
  });
}
