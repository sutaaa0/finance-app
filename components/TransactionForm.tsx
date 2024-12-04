"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useAddTransaction } from "@/app/hooks/transactions";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

// Skema validasi untuk transaksi
const transactionSchema = z.object({
  amount: z.coerce.number().min(0.01, { 
    message: "Jumlah harus lebih dari 0" 
  }),
  category: z.string().min(1, { 
    message: "Pilih kategori" 
  }),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Tanggal tidak valid"
  }),
  notes: z.string().optional(),
  type: z.enum(["expense", "income"], {
    required_error: "Pilih tipe transaksi"
  })
});

export function TransactionForm({ 
  onClose 
}: { 
  onClose: () => void 
}) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const addTransactionMutation = useAddTransaction();

  // Inisialisasi form
  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0, // Pastikan angka memiliki nilai awal
      category: "",
      date: new Date().toISOString().split('T')[0], // Tanggal hari ini
      notes: "",
      type: "expense"
    }
  });

  // Handler submit
  function onSubmit(values: z.infer<typeof transactionSchema>) {
    // Tambahkan userId dari session
    const transaction = {
      ...values,
      userId: session?.user?.id || ""
    };

    addTransactionMutation.mutate(transaction, {
      onSuccess: () => {
        toast({
          title: "Transaksi Berhasil",
          description: "Transaksi baru telah ditambahkan",
        });
        onClose(); // Tutup dialog
        form.reset(); // Reset form
      },
      onError: (error) => {
        toast({
          title: "Gagal Menambahkan Transaksi",
          description: error.message,
          variant: "destructive"
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Input Jumlah */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Masukkan jumlah" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pilih Kategori */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value} // Gunakan `value` alih-alih `defaultValue`
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="food">Makanan</SelectItem>
                  <SelectItem value="transport">Transportasi</SelectItem>
                  <SelectItem value="entertainment">Hiburan</SelectItem>
                  <SelectItem value="bills">Tagihan</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pilih Tanggal */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal</FormLabel>
              <FormControl>
                <Input 
                  type="date" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pilih Tipe Transaksi */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipe Transaksi</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value} // Gunakan `value` alih-alih `defaultValue`
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="expense">Pengeluaran</SelectItem>
                  <SelectItem value="income">Pemasukan</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Catatan Opsional */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catatan</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Tambahkan catatan (opsional)" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={addTransactionMutation.isPending}
        >
          {addTransactionMutation.isPending ? 'Menambahkan...' : 'Tambah Transaksi'}
        </Button>
      </form>
    </Form>
  );
}
