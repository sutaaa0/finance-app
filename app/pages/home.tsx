"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Pizza, Coffee, Bus, ShoppingBag, Gift, Heart, PenSquare, DollarSign, Film, Home, Lightbulb, Circle } from "lucide-react";
import MenuButton from "@/components/MenuButton";
import { useSession } from "next-auth/react";
import { useIncome, useMonthlyTransactions, useTotalExpense, useTransactions } from "../hooks/transactions";
import { monthlyTransaction, Transaction } from "../types/types";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("expenses");
  const { data: session } = useSession();
  const userId = session?.user?.id || "";

  const { data: totalExpense, isLoading: loadingExpense } = useTotalExpense(userId);
  const { data: income, isLoading: loadingIncome } = useIncome(userId);
  const { data: transactions, isLoading: loadingTransactions } = useTransactions(userId);
  const { data: monthlyTransactions, isLoading: loadingMonthlyTransactions } = useMonthlyTransactions(userId);
  console.log("data monthly :",monthlyTransactions)

  const categoryIcons = {
    salary: <DollarSign className="h-6 w-6 text-green-500 mb-2" />,
    entertainment: <Film className="h-6 w-6 text-red-500 mb-2" />,
    transport: <Bus className="h-6 w-6 text-yellow-500 mb-2" />,
    healthcare: <Heart className="h-6 w-6 text-cyan-500 mb-2" />,
    housing: <Home className="h-6 w-6 text-purple-500 mb-2" />,
    utilities: <Lightbulb className="h-6 w-6 text-blue-500 mb-2" />,
    default: <Circle className="h-6 w-6 text-gray-500 mb-2" />,
  };

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
        <Card className="p-6 bg-white shadow-lg rounded-xl">
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
                        <span className="text-3xl font-bold text-gray-800">{totalExpense?.totalExpense || 0}</span>
                        <span className="text-sm text-gray-500 mt-1">Total Expenses</span>
                      </>
                    )}
                  </div>
                </motion.div>

                {/* Expense Categories */}
                <div className="grid grid-cols-3 gap-4">
                  {/* <motion.div whileHover={{ scale: 1.05 }} className="bg-red-50 p-4 rounded-xl">
                    <Pizza className="h-6 w-6 text-red-500 mb-2" />
                    <p className="text-sm text-gray-600">Food</p>
                    <p className="text-lg font-semibold text-gray-800">$235</p>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} className="bg-blue-50 p-4 rounded-xl">
                    <Coffee className="h-6 w-6 text-blue-500 mb-2" />
                    <p className="text-sm text-gray-600">Cafe</p>
                    <p className="text-lg font-semibold text-gray-800">$52</p>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} className="bg-yellow-50 p-4 rounded-xl">
                    <Bus className="h-6 w-6 text-yellow-500 mb-2" />
                    <p className="text-sm text-gray-600">Transport</p>
                    <p className="text-lg font-semibold text-gray-800">$84</p>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} className="bg-green-50 p-4 rounded-xl">
                    <ShoppingBag className="h-6 w-6 text-green-500 mb-2" />
                    <p className="text-sm text-gray-600">Shopping</p>
                    <p className="text-lg font-semibold text-gray-800">$523</p>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} className="bg-purple-50 p-4 rounded-xl">
                    <Gift className="h-6 w-6 text-purple-500 mb-2" />
                    <p className="text-sm text-gray-600">Gifts</p>
                    <p className="text-lg font-semibold text-gray-800">$344</p>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} className="bg-cyan-50 p-4 rounded-xl">
                    <Heart className="h-6 w-6 text-cyan-500 mb-2" />
                    <p className="text-sm text-gray-600">Health</p>
                    <p className="text-lg font-semibold text-gray-800">$115</p>
                  </motion.div> */}
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
                    <p className="text-4xl font-bold text-green-500">${income?.totalIncome}</p>
                  </>
                )}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600">Salary</p>
                    <p className="text-lg font-semibold text-gray-800">$4,500</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600">Freelance</p>
                    <p className="text-lg font-semibold text-gray-800">$780</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "june" && (
              <motion.div key="june" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">June Overview</h3>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <p className="text-sm text-gray-600">Total Income</p>
                    <p className="text-xl font-semibold text-green-500">$5,280.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Expenses</p>
                    <p className="text-xl font-semibold text-red-500">$1,612.50</p>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Net Savings</p>
                  <p className="text-2xl font-bold text-purple-500">$3,667.50</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}
