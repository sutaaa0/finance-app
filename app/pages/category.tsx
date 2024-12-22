"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddBudget, useGetBudget } from "../hooks/transactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Coffee, Gift, Heart, ShoppingCart, Truck, Utensils } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the schema using zod
const schema = z.object({
  name: z.string().min(1, "Category name is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
});

type FormData = z.infer<typeof schema>;

export default function CategoryPage({ userId }: { userId: string }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();

  const { mutate, isPending } = useAddBudget(userId);
  const { data: budgetData, isLoading: budgetLoading } = useGetBudget(userId);

  const availableCategories = [
    { name: "Food", icon: <Utensils className="h-6 w-6 text-red-500" /> },
    { name: "Cafe", icon: <Coffee className="h-6 w-6 text-blue-500" /> },
    { name: "Transport", icon: <Truck className="h-6 w-6 text-yellow-500" /> },
    { name: "Shopping", icon: <ShoppingCart className="h-6 w-6 text-green-500" /> },
    { name: "Gifts", icon: <Gift className="h-6 w-6 text-purple-500" /> },
    { name: "Health", icon: <Heart className="h-6 w-6 text-cyan-500" /> },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    mutate(
      { category: data.name, amount: data.amount },
      {
        onSuccess: () => {
          // Close the modal
          setIsAddModalOpen(false);

          // Show success toast
          toast({
            title: "Category added",
            description: "Category has been added successfully",
          });
        },
      }
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddModalOpen(true)}>Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
                <Input id="name" type="text" placeholder="Category Name" {...register("name")} />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" placeholder="Amount" {...register("amount", { valueAsNumber: true })} />
                {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
              </div>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Adding..." : "Add"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgetLoading ? (
          <p>Loading...</p>
        ) : (
          budgetData?.map((budget: any) => (
            <div key={budget.id} className="p-4 border rounded-lg shadow-sm flex items-center space-x-4">
              <div className="flex-shrink-0">{availableCategories.find((cat) => cat.name === budget.category)?.icon}</div>
              <div>
                <h2 className="text-lg font-semibold">{budget.category}</h2>
                <p className="text-gray-500">{budget.amount}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
