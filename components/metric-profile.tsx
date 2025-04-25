"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, MessageSquare, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Metric } from "@/context/patient-context"
import { StatusIndicator } from "@/components/status-indicator"
import Link from "next/link"

interface MetricProfileProps {
  title: string
  metrics: Metric[]
  className?: string
}

export function MetricProfile({ title, metrics, className }: MetricProfileProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Get status dot color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "balanced":
        return "bg-teal-500"
      case "manage":
        return "bg-amber-500"
      case "consult":
        return "bg-rose-500"
      case "book":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("bg-[#E5F8FF] rounded-lg overflow-hidden", className)}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center">
          <h3 className="font-medium text-[#03659C]">{title}</h3>
          <div className="flex ml-3 space-x-1">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className={cn("w-2 h-2 rounded-full", getStatusColor(metric.status))}
                aria-label={`${metric.name} status: ${metric.status}`}
              />
            ))}
          </div>
        </div>
        <ChevronDown
          className={cn("h-5 w-5 text-[#03659C] transition-transform", isExpanded && "transform rotate-180")}
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          {metrics.map((metric) => (
            <div key={metric.id} className="bg-white rounded-lg p-3 border border-[#E5F8FF]">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className={cn("w-2 h-2 rounded-full mr-2", getStatusColor(metric.status))} />
                  <Link href={`/results/${metric.id}`} className="font-medium text-[#03659C] hover:underline">
                    {metric.name}
                  </Link>
                </div>
                <StatusIndicator status={metric.status} size="sm" />
              </div>

              <div className="flex justify-between items-end">
                <div className="text-xl font-bold text-[#03659C]">
                  {metric.value} <span className="text-xs font-normal">{metric.unit}</span>
                </div>

                <div className="flex space-x-2">
                  {metric.status === "consult" && (
                    <button className="flex items-center text-xs text-[#03659C] bg-[#E5F8FF] px-2 py-1 rounded-full">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      <span>Message doc</span>
                    </button>
                  )}

                  {metric.status === "book" && (
                    <button className="flex items-center text-xs text-[#03659C] bg-[#E5F8FF] px-2 py-1 rounded-full">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Book test</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
