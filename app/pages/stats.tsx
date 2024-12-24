'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Home,
  LayoutGrid,
  BarChart3,
  User,
  Menu,
  ArrowUp,
  ArrowDown,
  DollarSign,
  LucideIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface StatItem {
  title: string;
  amount: string;
  icon: LucideIcon;
  color: string;
}

interface Stats {
  week: StatItem[];
  month: StatItem[];
  year: StatItem[];
}

interface ExpenseTrend {
  week: number[];
  month: number[];
  year: number[];
}

export default function StatsScreen({userId}: {userId : String}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<keyof Stats>('week');
  const [stats, setStats] = useState<Stats>({
    week: [
      { title: 'Total Spent', amount: '$1,234', icon: ArrowUp, color: 'text-red-500' },
      { title: 'Total Saved', amount: '$5,678', icon: ArrowDown, color: 'text-green-500' },
      { title: 'Budget Left', amount: '$3,456', icon: DollarSign, color: 'text-blue-500' },
    ],
    month: [
      { title: 'Total Spent', amount: '$5,678', icon: ArrowUp, color: 'text-red-500' },
      { title: 'Total Saved', amount: '$10,234', icon: ArrowDown, color: 'text-green-500' },
      { title: 'Budget Left', amount: '$7,890', icon: DollarSign, color: 'text-blue-500' },
    ],
    year: [
      { title: 'Total Spent', amount: '$45,678', icon: ArrowUp, color: 'text-red-500' },
      { title: 'Total Saved', amount: '$78,901', icon: ArrowDown, color: 'text-green-500' },
      { title: 'Budget Left', amount: '$23,456', icon: DollarSign, color: 'text-blue-500' },
    ],
  });
  const [expenseTrend, setExpenseTrend] = useState<ExpenseTrend>({
    week: [40, 70, 30, 85, 50, 60, 20],
    month: [60, 45, 80, 30, 75, 55, 70],
    year: [50, 60, 70, 55, 80, 65, 75],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6">
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="icon" className="text-white">
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-white font-semibold">Statistics</h1>
          <div className="w-6" /> {/* Placeholder for symmetry */}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as keyof Stats)} className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid gap-4 mb-8">
          {stats[activeTab].map((stat: StatItem, index: number) => (
            <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.amount}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Expense Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between">
              {expenseTrend[activeTab].map((height: number, index: number) => (
                <motion.div
                  key={index}
                  className="bg-purple-500 w-8 rounded-t"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
