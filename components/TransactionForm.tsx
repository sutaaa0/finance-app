"use client"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAddTransaction } from "@/app/hooks/transactions"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

const transactionSchema = z.object({
  type: z.enum(["income", "expense"], { errorMap: () => ({ message: "Transaction type is required" }) }),
  amount: z.number().positive("Amount must be a positive number"),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
})

type TransactionFormData = z.infer<typeof transactionSchema>

const expenseCategories = [
  "Food & drink",
  "Transportation",
  "Utilities",
  "Housing",
  "Healthcare",
  "Entertainment",
  "Shopping",
  "Personal Care",
  "Education",
  "Travel",
  "Gifts & Donations",
  "Other",
]

const incomeCategories = [
  "Salary",
  "Business",
  "Investments",
  "Freelance",
  "Rentals",
  "Gifts",
  "Other",
]

export function TransactionForm({ userId }: { userId: string }) {
  const router = useRouter()
  const { mutate, isPending } = useAddTransaction()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
  })

  const transactionType = watch("type")

  const onSubmit = async (data: TransactionFormData) => {
    setIsSubmitting(true)
    try {
      mutate({
        type: data.type,
        category: data.category,
        amount: data.amount,
        date: new Date(data.date).toISOString(),
        notes: data.notes || '',
        userId,
      })
      reset()
      toast({
        title: "Transaction added",
        description: `Your ${data.type} has been successfully added.`,
      })
      router.push("/home")
    } catch (error) {
      console.error("Error creating transaction:", error)
      toast({
        title: "Error",
        description: `There was an error adding your ${data.type}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="type">Transaction Type</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && (
              <p className="text-sm text-red-500" role="alert">
                {errors.type.message}
              </p>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("amount", { valueAsNumber: true })}
                aria-invalid={errors.amount ? "true" : "false"}
              />
              {errors.amount && (
                <p className="text-sm text-red-500" role="alert">
                  {errors.amount.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {(transactionType === "income" ? incomeCategories : expenseCategories).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-sm text-red-500" role="alert">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              {...register("date")}
              aria-invalid={errors.date ? "true" : "false"}
            />
            {errors.date && (
              <p className="text-sm text-red-500" role="alert">
                {errors.date.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Add any additional details here" {...register("notes")} />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.push("/expenses")}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting || isPending} onClick={handleSubmit(onSubmit)}>
          {isSubmitting || isPending ? "Adding Transaction..." : "Add Transaction"}
        </Button>
      </CardFooter>
    </Card>
  )
}
