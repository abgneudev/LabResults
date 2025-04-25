"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Trophy, AlertTriangle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SnapshotItem {
  type: "win" | "watchout" | "nextstep"
  title: string
  description: string
}

const mockSnapshotData: SnapshotItem[] = [
  {
    type: "win",
    title: "Blood Pressure Improvement",
    description: "Your blood pressure has decreased by 7 points since last quarter. Keep up the good work!",
  },
  {
    type: "watchout",
    title: "Vitamin D Levels",
    description:
      "Your vitamin D levels are still below the recommended range. Consider increasing your supplement dosage.",
  },
  {
    type: "nextstep",
    title: "Schedule Cholesterol Follow-up",
    description: "Based on your LDL levels, we recommend scheduling a follow-up test in the next 3 months.",
  },
  {
    type: "win",
    title: "Consistent Glucose Levels",
    description: "Your blood glucose has remained stable in the healthy range for 3 months straight.",
  },
]

export function SnapshotCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? mockSnapshotData.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === mockSnapshotData.length - 1 ? 0 : prev + 1))
  }

  const typeConfig = {
    win: {
      icon: Trophy,
      color: "bg-green-100 text-green-800 border-green-200",
    },
    watchout: {
      icon: AlertTriangle,
      color: "bg-amber-100 text-amber-800 border-amber-200",
    },
    nextstep: {
      icon: ArrowRight,
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
  }

  const currentItem = mockSnapshotData[currentIndex]
  const { icon: Icon, color } = typeConfig[currentItem.type]

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-lg bg-white shadow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <div
              className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mb-4",
                color,
              )}
            >
              <Icon className="w-3 h-3 mr-1" />
              {currentItem.type === "win" ? "Win" : currentItem.type === "watchout" ? "Watch Out" : "Next Step"}
            </div>
            <h3 className="text-lg font-semibold mb-2">{currentItem.title}</h3>
            <p className="text-gray-600">{currentItem.description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center p-4 border-t">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="rounded-full"
            aria-label="Previous snapshot"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex space-x-1">
            {mockSnapshotData.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 w-1.5 rounded-full ${index === currentIndex ? "bg-primary" : "bg-gray-300"}`}
              />
            ))}
          </div>
          <Button variant="ghost" size="icon" onClick={goToNext} className="rounded-full" aria-label="Next snapshot">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
