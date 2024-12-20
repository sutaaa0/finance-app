"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pizza, Coffee, Bus, ShoppingBag, Gift, Heart, PenSquare, DollarSign, Film, Home, Lightbulb, Circle, Briefcase, Laptop } from "lucide-react";
import MenuButton from "@/components/MenuButton";
import { useSession } from "next-auth/react";
import { useHistoryIncome, useIncome, useMonthlyIncomeTransactions, useMonthlyTransactions, useTotalExpense, useTotalExpenseInMonth, useTotalIncomeInMonth, useTransactions } from "../hooks/transactions";
import { monthlyTransaction, Transaction } from "../types/types";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("expenses");
  const { data: session } = useSession();
  const userId = session?.user?.id || "";

  const { data: totalExpense, isLoading: loadingExpense } = useTotalExpense(userId);
  const { data: income, isLoading: loadingIncome } = useIncome(userId);
  const { data: transactions, isLoading: loadingTransactions } = useTransactions(userId);
  const { data: monthlyTransactions, isLoading: loadingMonthlyTransactions } = useMonthlyTransactions(userId);
  const { data: monthlyIncomeTransactions, isLoading: loadingMonthlyIncomeTransactions } = useMonthlyIncomeTransactions(userId);
  const { data: historyIncome, isLoading: loadingHistoryIncome } = useHistoryIncome(userId);
  const { data: totalExpenseInMonth, isLoading: loadingTotalExpenseInMonth } = useTotalExpenseInMonth(userId);
  const { data: totalIncomeInMonth, isLoading: loadingTotalIncomeInMonth } = useTotalIncomeInMonth(userId);

  const sevings = totalIncomeInMonth - totalExpenseInMonth;


  const categoryIcons = {
    salary: <DollarSign className="h-6 w-6 text-green-500 mb-2" />,
    entertainment: <Film className="h-6 w-6 text-red-500 mb-2" />,
    food: <Pizza className="h-6 w-6 text-orange-500 mb-2" />,
    transport: <Bus className="h-6 w-6 text-yellow-500 mb-2" />,
    shopping: <ShoppingBag className="h-6 w-6 text-pink-500 mb-2" />,
    gifts: <Gift className="h-6 w-6 text-purple-500 mb-2" />,
    coffee: <Coffee className="h-6 w-6 text-blue-500 mb-2" />,
    business: <Briefcase className="h-6 w-6 text-yellow-800 mb-2" />,
    healthcare: <Heart className="h-6 w-6 text-cyan-500 mb-2" />,
    housing: <Home className="h-6 w-6 text-purple-500 mb-2" />,
    utilities: <Lightbulb className="h-6 w-6 text-blue-500 mb-2" />,
    default: <Circle className="h-6 w-6 text-gray-500 mb-2" />,
    freelance: <Laptop className="h-6 w-6 mb-2" />,
  };

  const recentExpenses = useMemo(() => {
    if (!transactions) return [];
    return transactions
      .filter((transaction: Transaction) => transaction.type === "expense")
      .sort((a: Transaction, b: Transaction) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }, [transactions]);

  return (
    <div className="min-h-screen bg-gray-50 mb-12">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 pb-24 relative">
        <div className="flex justify-between items-center">
          <MenuButton />
          <h1 className="text-white font-semibold">ExpenseWise</h1>
          <Link href="/transaction">
            <Button variant="ghost" size="icon" className="text-white">
              <PenSquare className="h-6 w-6" />
            </Button>
          </Link>
        </div>
        <div className="mt-6 text-center">
          <p className="text-purple-200 text-sm">Total Balance</p>
          <h2 className="text-white text-3xl font-bold mt-1">$32,500.00</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-20 relative z-10">
        <Card className="p-6 bg-white shadow-lg rounded-xl mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="expenses" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                Expenses
              </TabsTrigger>
              <TabsTrigger value="income" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                Income
              </TabsTrigger>
              <TabsTrigger value="june" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                June
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <AnimatePresence mode="wait">
            {activeTab === "expenses" && (
              <motion.div key="expenses" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Circular Progress */}
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-48 h-48 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-full border-8 border-gray-100" />
                  <div className="absolute inset-0 rounded-full border-8 border-purple-500 border-l-transparent border-r-transparent border-b-transparent transform -rotate-45" />
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    {loadingExpense ? (
                      <span>Loading...</span>
                    ) : (
                      <>
                        <span className=" font-bold text-gray-800">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalExpense?.totalExpense || 0)}</span>

                        <span className="text-sm text-gray-500 mt-1">Total Expenses</span>
                      </>
                    )}
                  </div>
                </motion.div>

                {/* Expense Categories */}
                <div className="grid grid-cols-3 gap-4">
                  {monthlyTransactions?.map((transaction: monthlyTransaction) => (
                    <motion.div key={transaction.category} whileHover={{ scale: 1.05 }} className="p-4 rounded-xl bg-green-50">
                      {categoryIcons[transaction.category.toLowerCase() as keyof typeof categoryIcons] || categoryIcons.default}
                      <p className="text-sm text-gray-600">{transaction.category}</p>
                      <p className="text-lg font-semibold text-gray-800">${transaction.totalAmount}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "income" && (
              <motion.div key="income" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Total Income</h3>
                {loadingIncome ? (
                  <span>Loading...</span>
                ) : (
                  <>
                    <p className="font-bold text-green-500">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(income?.totalIncome || 0)}</p>
                  </>
                )}

                <div className="grid grid-cols-3 gap-4">
                  {monthlyIncomeTransactions?.map((transaction: monthlyTransaction) => (
                    <motion.div key={transaction.category} whileHover={{ scale: 1.05 }} className="p-4 rounded-xl bg-green-50">
                      {categoryIcons[transaction.category.toLowerCase() as keyof typeof categoryIcons] || categoryIcons.default}
                      <p className="text-sm text-gray-600">{transaction.category}</p>
                      <p className="text-lg font-semibold text-gray-800">${transaction.totalAmount}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "june" && (
              <motion.div key="june" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">June Overview</h3>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <p className="text-sm text-gray-600">Total Income</p>
                    <p className="text-xl font-semibold text-green-500">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalIncomeInMonth || 0)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Expenses</p>
                    <p className="text-xl font-semibold text-red-500">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalExpenseInMonth || 0)}</p>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Net Savings</p>
                  <p className="text-2xl font-bold text-purple-500">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(sevings || 0)}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Recent Expenses Section */}
        {activeTab == "expenses" && (
          <Card className="p-6 bg-white shadow-lg rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Expenses</h3>
            {loadingTransactions ? (
              <p>Loading recent expenses...</p>
            ) : (
              <div className="space-y-4">
                {recentExpenses.map((expense: Transaction) => (
                  <div key={expense.id} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      {categoryIcons[expense.category.toLowerCase() as keyof typeof categoryIcons] || categoryIcons.default}
                      <div className="ml-3">
                        <p className="font-semibold text-gray-800">{expense.category}</p>
                        <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-500">-{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(expense.amount)}</p>
                      <p className="text-sm text-gray-500">{expense.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {activeTab == "income" && (
          <Card className="p-6 bg-white shadow-lg rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Expenses</h3>
            {loadingHistoryIncome ? (
              <p>Loading recent expenses...</p>
            ) : (
              <div className="space-y-4">
                {historyIncome &&
                  historyIncome.map((income: Transaction) => (
                    <div key={income.id} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center">
                        {categoryIcons[income.category.toLowerCase() as keyof typeof categoryIcons] || categoryIcons.default}
                        <div className="ml-3">
                          <p className="font-semibold text-gray-800">{income.category}</p>
                          <p className="text-sm text-gray-500">{new Date(income.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-500">+{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(income.amount)}</p>
                        <p className="text-sm text-gray-500">{income.notes}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
