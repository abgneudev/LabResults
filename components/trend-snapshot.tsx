"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TrendSnapshotProps {
  improving: number
  stable: number
  worsening: number
  className?: string
}

export function TrendSnapshot({ improving, stable, worsening, className }: TrendSnapshotProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-2 ${className}`}
    >
      {improving > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>{improving} improving</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">{improving} metrics showing improvement</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {stable > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center bg-gray-50 text-gray-700 px-2 py-1 rounded-full text-xs">
                <Minus className="h-3 w-3 mr-1" />
                <span>{stable} stable</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">{stable} metrics remaining stable</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {worsening > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center bg-red-50 text-red-700 px-2 py-1 rounded-full text-xs">
                <TrendingDown className="h-3 w-3 mr-1" />
                <span>{worsening} worsening</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">{worsening} metrics showing decline</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </motion.div>
  )
}
