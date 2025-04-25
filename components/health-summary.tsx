"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { NextTestProgressRing } from "@/components/progress-ring"
import { TrendSnapshot } from "@/components/trend-snapshot"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface HealthSummaryProps {
  lastTestDate: string
  testType: string
  testCount: number
  improvingMetrics: number
  stableMetrics: number
  worseningMetrics: number
  daysUntilNextTest: number
}

export function HealthSummary({
  lastTestDate,
  testType,
  testCount,
  improvingMetrics,
  stableMetrics,
  worseningMetrics,
  daysUntilNextTest,
}: HealthSummaryProps) {
  const date = new Date(lastTestDate)
  const timeAgo = formatDistanceToNow(date, { addSuffix: true })
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-[#03659C]">
      <div className="flex items-start justify-between mb-4">
        <div className="border-l-4 border-[#03659C] pl-3">
          <div className="flex items-center mb-1">
            <span className="text-sm font-medium">Last Test: {timeAgo}</span>
          </div>
          <p className="text-sm text-[#03659C]/80">
            {testType} • {formattedDate}
          </p>
        </div>

        <NextTestProgressRing daysUntilNextTest={daysUntilNextTest} />
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="text-lg mr-2" role="img" aria-label="Chart">
            📊
          </span>
          <span className="text-sm text-[#03659C]/80">Tracking {testCount} key metrics</span>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-xs text-[#03659C]/70 hover:text-[#03659C] cursor-help">
                <Shield className="h-4 w-4 mr-1 text-[#03659C]" />
                <span>Private & secure</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">
                Your health data is encrypted and private. We never share your information without your consent.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <TrendSnapshot improving={improvingMetrics} stable={stableMetrics} worsening={worseningMetrics} />
    </motion.div>
  )
}
