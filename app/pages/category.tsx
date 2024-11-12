'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Home,
  LayoutGrid,
  BarChart3,
  User,
  Pizza,
  Coffee,
  Bus,
  ShoppingBag,
  Gift,
  Heart,
  Menu,
  Plus
} from 'lucide-react'
import MenuButton from '@/components/MenuButton'
import { useRouter } from 'next/navigation'

export default function CategoryPage() {
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const categories = [
    { name: 'Food', icon: Pizza, color: 'bg-red-500', progress: 70 },
    { name: 'Cafe', icon: Coffee, color: 'bg-blue-500', progress: 30 },
    { name: 'Transport', icon: Bus, color: 'bg-yellow-500', progress: 50 },
    { name: 'Shopping', icon: ShoppingBag, color: 'bg-green-500', progress: 90 },
    { name: 'Gifts', icon: Gift, color: 'bg-purple-500', progress: 40 },
    { name: 'Health', icon: Heart, color: 'bg-cyan-500', progress: 60 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6">
        <div className="flex justify-between items-center">
         <MenuButton />
          <h1 className="text-white font-semibold">Categories</h1>
          <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {category.name}
                  </CardTitle>
                  <category.icon className={`h-4 w-4 text-${category.color.split('-')[1]}-500`} />
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
          <Button onClick={() => router.push("/home")} variant="ghost" size="icon" className="text-purple-500">
            <Home className="h-6 w-6" />
          </Button>
          <Button onClick={() => router.push("/category")} variant="ghost" size="icon" className="text-gray-400">
            <LayoutGrid className="h-6 w-6" />
          </Button>
          <Button onClick={() => router.push("/stats")} variant="ghost" size="icon" className="text-gray-400">
            <BarChart3 className="h-6 w-6" />
          </Button>
          <Button onClick={() => router.push("/profile")} variant="ghost" size="icon" className="text-gray-400">
            <User className="h-6 w-6" />
          </Button>
        </div>
      </div>
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add New Category</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault()
                // Add logic to save the new category
                setIsAddModalOpen(false)
              }}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name</label>
                    <input type="text" id="categoryName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                  </div>
                  <div>
                    <label htmlFor="categoryBudget" className="block text-sm font-medium text-gray-700">Budget</label>
                    <input type="number" id="categoryBudget" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                    <Button type="submit">Add Category</Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}