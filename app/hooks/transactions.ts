import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Transaction } from "../types/types";

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
        .filter((transaction: Transaction) => transaction.type === "expense") // Filter hanya "expense"
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

      const transactions = data.map((transaction: Transaction) => ({
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
        .filter((transaction: Transaction) => transaction.type === "income") // Filter hanya "income"
        .reduce((sum: number, transaction: any) => sum + transaction.amount, 0); // Hitung total

      return { totalIncome };
    },
  });
}

export function useAddTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    // Fungsi untuk mengirim transaksi ke backend
    mutationFn: async (transaction: Transaction) => {
      const response = await axios.post("http://localhost:5000/api/transactions", transaction);
      return response.data;
    },
    // Setelah berhasil, perbarui cache query
    onSuccess: () => {
      // Invalidate dan refresh query terkait
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["getTotalExpense"] });
      queryClient.invalidateQueries({ queryKey: ["getTotalIncome"] });
    },
    // Tangani error jika terjadi
    onError: (error) => {
      console.error("Gagal menambahkan transaksi:", error);
      // Anda bisa menambahkan logika untuk menampilkan pesan error ke pengguna
    }
  });
}

