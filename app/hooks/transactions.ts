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

export function useMonthlyIncomeTransactions(userId: string) {
  return useQuery({
    queryKey: ["monthly-income-transactions", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID not found");
      const { data } = await axios.get(`${API_URL}/${userId}/income/monthly-summary`);
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

export function useTotalExpenseInMonth(userId: string) {
  return useQuery({
    queryKey: ["total-expense-in-month", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID not found");
      const { data } = await axios.get(`${API_URL}/${userId}/totalExpense/monthly-summary`);
      return data.totalExpense;
    },
    enabled: !!userId
  })
}

export function useTotalIncomeInMonth(userId: string) {
  return useQuery({
    queryKey: ["total-income-in-month", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID not found");
      const { data } = await axios.get(`${API_URL}/${userId}/totalIncome/monthly-summary`);
      // Assuming data.totalIncome is the primitive value we need
      return data.totalIncome;
    },
    enabled: !!userId
  })
}

export function useAddBudget(userId: string) {
  return useMutation({
    mutationFn: async (budget: any) => {
      const { data } = await axios.post(`${API_URL}/${userId}/budget`, budget);
      return data;
    }
  })
}

export function useGetBudget(userId: string) {
  return useQuery({
    queryKey: ["get-budget", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID not found");
      const { data } = await axios.get(`${API_URL}/${userId}/budget`);
      return data;
    },
    enabled: !!userId
  })
}


export function useStats(userId: string) {
  return useQuery({
    queryKey: ["stats", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID not found");
      const { data } = await axios.get(`${API_URL}/${userId}/financial-summary`);
      return data;
    },
    enabled: !!userId
  })
}
