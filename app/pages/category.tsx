"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Home,
  LayoutGrid,
  BarChart3,
  User,
  Plus,
  Coffee,
  ShoppingCart,
  Heart,
  Gift,
  Truck,
  Utensils,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MenuButton from "@/components/MenuButton";
import { useRouter } from "next/navigation";

export default function CategoryPage() {
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    budget: "",
  });

  const availableCategories = [
    { name: "Food", icon: <Utensils className="h-6 w-6 text-red-500" /> },
    { name: "Cafe", icon: <Coffee className="h-6 w-6 text-blue-500" /> },
    { name: "Transport", icon: <Truck className="h-6 w-6 text-yellow-500" /> },
    { name: "Shopping", icon: <ShoppingCart className="h-6 w-6 text-green-500" /> },
    { name: "Gifts", icon: <Gift className="h-6 w-6 text-purple-500" /> },
    { name: "Health", icon: <Heart className="h-6 w-6 text-cyan-500" /> },
  ];

  const [categories, setCategories] = useState([
    { name: "Food", icon: <Utensils className="h-6 w-6 text-red-500" />, progress: 70 },
    { name: "Cafe", icon: <Coffee className="h-6 w-6 text-blue-500" />, progress: 30 },
  ]);

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.budget) return;
    const selectedCategory = availableCategories.find(
      (cat) => cat.name === newCategory.name
    );
    if (!selectedCategory) return;

    setCategories([
      ...categories,
      {
        name: newCategory.name,
        icon: selectedCategory.icon,
        progress: 0,
      },
    ]);
    setIsAddModalOpen(false);
    setNewCategory({ name: "", budget: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6">
        <div className="flex justify-between items-center">
          <MenuButton />
          <h1 className="text-white font-semibold">Categories</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {category.name}
                  </CardTitle>
                  {/* Ikon Kategori */}
                  <div className="h-6 w-6">{category.icon}</div>
                </CardHeader>
                <CardContent>
                  <Progress value={category.progress} className="w-full" />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>$300</span>
                    <span>Budget: $500</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-2">
        <div className="flex justify-between items-center">
          <Button
            onClick={() => router.push("/home")}
            variant="ghost"
            size="icon"
            className="text-purple-500"
          >
            <Home className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => router.push("/category")}
            variant="ghost"
            size="icon"
            className="text-gray-400"
          >
            <LayoutGrid className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => router.push("/stats")}
            variant="ghost"
            size="icon"
            className="text-gray-400"
          >
            <BarChart3 className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => router.push("/profile")}
            variant="ghost"
            size="icon"
            className="text-gray-400"
          >
            <User className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add New Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="categoryName">Select Category</Label>
                  <Select
                    onValueChange={(value) =>
                      setNewCategory({ ...newCategory, name: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCategories.map((cat) => (
                        <SelectItem key={cat.name} value={cat.name}>
                          <div className="flex items-center">
                            {cat.icon}
                            <span>{cat.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="categoryBudget">Budget</Label>
                  <Input
                    id="categoryBudget"
                    value={newCategory.budget}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, budget: e.target.value })
                    }
                    type="number"
                    placeholder="Budget Amount"
                  />
                </div>
              </div>
            </CardContent>
            <div className="flex justify-end p-4 space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddCategory}>Add</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
