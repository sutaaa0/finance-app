'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowRight, PiggyBank, TrendingUp, CreditCard } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function WelcomePage() {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">ExpenseWise</h1>
          <p className="text-xl text-purple-200">Your Smart Financial Companion</p>
        </motion.div>

        <motion.div
          className="relative w-64 h-64 mx-auto"
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <PiggyBank size={128} className="text-white" />
          </motion.div>
          <motion.div
            className="absolute top-0 right-0"
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <TrendingUp size={48} className="text-green-300" />
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0"
            animate={{ rotate: isHovered ? -360 : 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <CreditCard size={48} className="text-yellow-300" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-semibold text-white">
            Take Control of Your Finances
          </h2>
          <p className="text-purple-200 max-w-xs mx-auto">
            Track expenses, set budgets, and achieve your financial goals with ease.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            className="w-full max-w-xs h-12 text-lg bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => router.push('/home')}
          >
            Get Started
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}