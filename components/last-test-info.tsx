"use client"

import { motion } from "framer-motion"
import { Calendar, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface LastTestInfoProps {
  lastTestDate: string
  testType: string
  testCount: number
}

export function LastTestInfo({ lastTestDate, testType, testCount }: LastTestInfoProps) {
  const date = new Date(lastTestDate)
  const timeAgo = formatDistanceToNow(date, { addSuffix: true })
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#E5F8FF] rounded-lg p-4 mb-4 border border-[#E5F8FF]"
    >
      <div className="flex items-start">
        <div className="bg-white p-2 rounded-full mr-3">
          <Calendar className="h-5 w-5 text-[#03659C]" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-[#03659C] mb-1">Last Test</h3>
            <span className="text-xs bg-white px-2 py-1 rounded-full text-[#03659C]">{testCount} results</span>
          </div>
          <p className="text-sm text-[#03659C]/80">{testType}</p>
          <div className="flex items-center mt-2 text-xs text-[#03659C]/70">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>
              {timeAgo} • {formattedDate}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
