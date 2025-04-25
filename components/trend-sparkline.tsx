"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import type { Status } from "@/context/patient-context"
import { motion, AnimatePresence } from "framer-motion"

interface TrendSparklineProps {
  data: { date: string; value: number }[]
  status: Status
  className?: string
  height?: number
  normalRange?: { min: number; max: number }
}

export function TrendSparkline({
  data,
  status,
  className,
  height = 40,
  normalRange = { min: 0, max: 0 },
}: TrendSparklineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tooltip, setTooltip] = useState<{
    visible: boolean
    x: number
    y: number
    value: number
    date: string
    index: number
  }>({
    visible: false,
    x: 0,
    y: 0,
    value: 0,
    date: "",
    index: 0,
  })

  const statusColors = {
    balanced: "#22c55e", // green-500
    manage: "#f59e0b", // amber-500
    consult: "#ef4444", // red-500
    book: "#3b82f6", // blue-500
  }

  useEffect(() => {
    if (!canvasRef.current || data.length < 2) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Extract values
    const values = data.map((d) => d.value)
    const min = Math.min(...values) * 0.9 // Add some padding
    const max = Math.max(...values) * 1.1 // Add some padding
    const range = max - min || 1 // Avoid division by zero

    // Draw normal range band if provided and valid
    if (normalRange && normalRange.min !== normalRange.max) {
      const normalMinY = canvas.height - ((normalRange.min - min) / range) * (canvas.height - 10) - 5
      const normalMaxY = canvas.height - ((normalRange.max - min) / range) * (canvas.height - 10) - 5
      const bandHeight = normalMinY - normalMaxY

      ctx.fillStyle = "rgba(220, 252, 231, 0.5)" // Light green background
      ctx.fillRect(0, normalMaxY, canvas.width, bandHeight)

      // Draw normal range lines
      ctx.beginPath()
      ctx.moveTo(0, normalMaxY)
      ctx.lineTo(canvas.width, normalMaxY)
      ctx.strokeStyle = "rgba(34, 197, 94, 0.5)" // Light green line
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, normalMinY)
      ctx.lineTo(canvas.width, normalMinY)
      ctx.strokeStyle = "rgba(34, 197, 94, 0.5)" // Light green line
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Calculate points
    const points = data.map((d, i) => ({
      x: (i / (data.length - 1)) * canvas.width,
      y: canvas.height - ((d.value - min) / range) * (canvas.height - 10) - 5, // 5px padding
      value: d.value,
      date: d.date,
      index: i,
    }))

    // Draw line with gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, statusColors[status])
    gradient.addColorStop(1, `${statusColors[status]}33`) // Add transparency

    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }
    ctx.strokeStyle = statusColors[status]
    ctx.lineWidth = 2.5
    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(points[points.length - 1].x, canvas.height)
    ctx.lineTo(points[0].x, canvas.height)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.globalAlpha = 0.1
    ctx.fill()
    ctx.globalAlpha = 1

    // Draw dots
    points.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI)
      ctx.fillStyle = "white"
      ctx.fill()
      ctx.strokeStyle = statusColors[status]
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // Add click handler for tooltip
    canvas.onclick = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left

      // Find closest point
      let closestPoint = points[0]
      let closestDistance = Math.abs(closestPoint.x - x)

      for (let i = 1; i < points.length; i++) {
        const distance = Math.abs(points[i].x - x)
        if (distance < closestDistance) {
          closestDistance = distance
          closestPoint = points[i]
        }
      }

      if (closestDistance < 20) {
        // Only show tooltip if click is close enough
        setTooltip({
          visible: true,
          x: closestPoint.x,
          y: closestPoint.y,
          value: closestPoint.value,
          date: closestPoint.date,
          index: closestPoint.index,
        })
      } else {
        setTooltip((prev) => ({ ...prev, visible: false }))
      }
    }

    return () => {
      if (canvas) {
        canvas.onclick = null
      }
    }
  }, [data, status, normalRange])

  if (data.length < 2) {
    return <div className={cn("h-[40px]", className)}>Not enough data</div>
  }

  // Generate insight based on status and data point
  const getInsight = (value: number, index: number) => {
    if (index === 0) return "This was your baseline reading."

    const prevValue = data[index - 1].value
    const change = ((value - prevValue) / prevValue) * 100
    const changeText = change > 0 ? "increased" : "decreased"
    const absChange = Math.abs(change).toFixed(1)

    switch (status) {
      case "balanced":
        return `This reading ${changeText} by ${absChange}% but remains in the healthy range.`
      case "manage":
        return `This reading ${changeText} by ${absChange}% and is worth monitoring.`
      case "consult":
        return `This reading ${changeText} by ${absChange}% and may need attention.`
      case "book":
        return `This reading ${changeText} by ${absChange}% and suggests scheduling a follow-up.`
      default:
        return ""
    }
  }

  return (
    <div className="relative">
      <canvas ref={canvasRef} height={height} className={cn("w-full", className)}></canvas>

      <AnimatePresence>
        {tooltip.visible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bg-white p-3 rounded-lg shadow-md text-sm z-10 border border-blue-100 max-w-[200px]"
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y - 80}px`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="font-medium text-blue-900">{tooltip.value}</div>
            <div className="text-gray-500 text-xs">{new Date(tooltip.date).toLocaleDateString()}</div>
            <div className="mt-1 text-xs">{getInsight(tooltip.value, tooltip.index)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
