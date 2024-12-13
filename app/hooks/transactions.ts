import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Transaction } from "../types/types";

const API_URL = "http://localhost:5000/transactions";

export function useTotalExpense(userId: string) {
  return useQuery({
    queryKey: ["getTotalExpense", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID not found");
      const { data } = await axios.get(`${API_URL}/${userId}`);
      const totalExpense = data
        .filter((transaction: Transaction) => transaction.type === "expense")
        .reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0);
      return { totalExpense };
    },
    enabled: !!userId, // Only run if userId is provided
  });
}

export function useTransactions(userId: string) {
  return useQuery({
    queryKey: ["transactions", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID not found");
      const { data } = await axios.get(`${API_URL}/${userId}`);
      return data.map((transaction: Transaction) => ({
        ...transaction,
        date: new Date(transaction.date), // Parse date if needed
      }));
    },
    enabled: !!userId,
  });
}

export function useMonthlyTransactions(userId: string) {
  return useQuery({
    queryKey: ["monthly-transactions", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID not found");
      const { data } = await axios.get(`${API_URL}/${userId}/monthly-summary`);
      return data;
    },
    enabled: !!userId,
  })
}


export function useIncome(userId: string) {
  return useQuery({
    queryKey: ["getTotalIncome", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID not found");
      const { data } = await axios.get(`${API_URL}/${userId}`);
      const totalIncome = data
        .filter((transaction: Transaction) => transaction.type === "income")
        .reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0);
      return { totalIncome };
    },
    enabled: !!userId,
  });
}

export function useAddTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transaction: Transaction) => {
      const { data } = await axios.post(API_URL, transaction);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["getTotalExpense"] });
      queryClient.invalidateQueries({ queryKey: ["getTotalIncome"] });
    },
  });
}

export function useHistoryIncome(userId: string) {
  return useQuery({
    queryKey: ["history-income", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID not found");
      const { data } = await axios.get(`${API_URL}/${userId}/history-income`);
      return data;
    },
    enabled: !!userId
  })
}
