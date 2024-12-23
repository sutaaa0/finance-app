"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Briefcase, Bus, Circle, Film, Gift, Heart, Home, Key, Lightbulb, MoreHorizontal, Pizza, ShoppingCart  } from "lucide-react";
import { useAddBudget, useGetBudget, useMonthlyTransactions } from "../hooks/transactions";
import { Budget } from "../types/types";

// Define the schema using zod
const schema = z.object({
  name: z.string().min(1, "Category name is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
});

type FormData = z.infer<typeof schema>;

const availableCategories = [
  { name: "Food & Drink", icon: <Pizza className="h-6 w-6 text-red-500" /> },
  { name: "Transportation", icon:  <Bus className="h-6 w-6 text-yellow-500 mb-2" /> },
  { name: "Shopping", icon: <ShoppingCart className="h-6 w-6 text-green-500" /> },
  { name: "Gifts", icon: <Gift className="h-6 w-6 text-purple-500" /> },
  { name: "Health", icon: <Heart className="h-6 w-6 text-cyan-500" /> },
  { name: "Entertainment", icon: <Film className="h-6 w-6 text-red-500 mb-2" />, },
  { name: "Healthcare", icon:  <Heart className="h-6 w-6 text-cyan-500 mb-2" />, },
  { name: "Housing", icon:   <Home className="h-6 w-6 text-purple-500 mb-2" />, },
  { name: "Utilities", icon:  <Lightbulb className="h-6 w-6 text-blue-500 mb-2" />, },
  { name: "Default", icon:   <Circle className="h-6 w-6 text-gray-500 mb-2" />, },
  { name: "Investment", icon:  <BarChart className="h-6 w-6 text-green-500 mb-2" />, },
  { name: "Rentals", icon:   <Key className="h-6 w-6 text-yellow-500 mb-2" />, },
  { name: "Other", icon:    <MoreHorizontal className="h-6 w-6 text-gray-500 mb-2" /> },
  { name: "Personal Care", icon:   <Heart className="h-6 w-6 text-cyan-500 mb-2" />, },
  { name: "Education", icon:  <Briefcase className="h-6 w-6 text-yellow-800 mb-2" />,},
  { name: "Travel", icon:  <Bus className="h-6 w-6 text-yellow-500 mb-2" /> },
];

const calculateProgress = (category: string, amount: number, expenses: any[]) => {
  const expense = expenses.find((exp) => exp.category === category)?.totalAmount || 0;
  return (expense / amount) * 100;
};

export default function CategoryPage({ userId }: { userId: string }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: budgetData, isLoading: budgetLoading } = useGetBudget(userId);
  const { data: monthlyTransactions, isLoading: transactionsLoading } = useMonthlyTransactions(userId);
  const { mutate: addBudget, isPending: addingBudget } = useAddBudget(userId);


  console.log("budget :", budgetData);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    addBudget(
      { category: data.name, amount: data.amount },
      {
        onSuccess: () => {
          setIsAddModalOpen(false);
        },
      }
    );
  };

  if (budgetLoading || transactionsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Budget Categories</h1>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddModalOpen(true)}>Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Budget Category</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
                <Input id="name" type="text" placeholder="Category Name" {...register("name")} />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="amount">Budget Amount (IDR)</Label>
                <Input id="amount" type="number" placeholder="Amount" {...register("amount", { valueAsNumber: true })} />
                {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
              </div>
              <Button type="submit" className="w-full">
                Add Category
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgetData?.length > 0 ? (
          budgetData.map((budget: Budget) => {
            const expense = monthlyTransactions?.find((exp: Budget) => exp.category === budget.category)?.totalAmount || 0;
            const progress = calculateProgress(budget.category, budget.amount, monthlyTransactions || []);
            return (
              <Card key={budget.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center space-x-2">
                    <span className="p-2 bg-gray-100 rounded-full">
                      {availableCategories.find((cat) => cat.name === budget.category)?.icon || 
                      <ShoppingCart className="h-6 w-6 text-gray-600" />}
                    </span>
                    <span>{budget.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(expense)} Spent
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(budget.amount)} Budgeted
                  </div>
                  </div>
                  <div className="text-sm text-black font-bold text-right mt-1">
                    {progress.toFixed(2)}% Used
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <p>No budget categories available</p>
        )}
      </div>
    </div>
  );
}