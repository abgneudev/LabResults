"use client"

import { motion } from "framer-motion"
import { Heart, Shield, TrendingUp } from "lucide-react"

export function ComfortSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-[#E5F8FF] rounded-lg p-4 mb-6"
    >
      <div className="flex items-center mb-2">
        <div className="bg-white p-2 rounded-full mr-3">
          <Heart className="h-5 w-5 text-pink-500" />
        </div>
        <h3 className="font-medium text-[#03659C]">Your health journey</h3>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <span className="text-lg mr-2" role="img" aria-label="Chart">
            📊
          </span>
          <span className="text-sm text-[#03659C]/80">Tracking 5 key metrics</span>
        </div>
        <div className="flex items-center">
          <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
          <span className="text-sm text-green-500">2 improving</span>
        </div>
      </div>

      <div className="flex items-center text-xs text-[#03659C]/70 bg-white p-2 rounded-lg">
        <Shield className="h-4 w-4 mr-2 text-[#03659C]" />
        <span>Your data is private and secure</span>
      </div>
    </motion.div>
  )
}
