"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import type { Status } from "@/context/patient-context"
import { motion, AnimatePresence } from "framer-motion"
import { Info, TrendingDown, TrendingUp, Minus } from "lucide-react"

interface ReferenceRange {
  min: number
  max: number
  label: string
  color: string
}

interface ReferenceRangeChartProps {
  data: { date: string; value: number }[]
  status: Status
  className?: string
  height?: number
  unit: string
  ranges: ReferenceRange[]
  name: string
}

export function ReferenceRangeChart({
  data,
  status,
  className,
  height = 200,
  unit,
  ranges,
  name,
}: ReferenceRangeChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tooltip, setTooltip] = useState<{
    visible: boolean
    x: number
    y: number
    value: number
    date: string
    range?: string
  }>({
    visible: false,
    x: 0,
    y: 0,
    value: 0,
    date: "",
    range: undefined,
  })

  // Updated with pastel colors
  const statusColors = {
    balanced: "#14b8a6", // teal-500
    manage: "#f59e0b", // amber-500
    consult: "#f43f5e", // rose-500
    book: "#03659C", // blue
  }

  // Calculate trend
  const getTrendInfo = () => {
    if (data.length < 2) return { icon: Minus, text: "Stable", color: "text-gray-500" }

    const latest = data[data.length - 1].value
    const previous = data[data.length - 2].value
    const percentChange = ((latest - previous) / previous) * 100
    const absChange = Math.abs(percentChange).toFixed(1)

    // Determine if the value is in normal range
    const isInNormalRange = ranges.some((range) => {
      if (range.label.toLowerCase().includes("normal") || range.label.toLowerCase().includes("optimal")) {
        return latest >= range.min && latest <= range.max
      }
      return false
    })

    if (percentChange > 2) {
      const direction = status === "balanced" ? "improvement" : "increase"
      const sentiment =
        status === "balanced" ? "positive" : status === "manage" || status === "consult" ? "concerning" : "neutral"
      return {
        icon: TrendingUp,
        text: `↗ ${absChange}% ${direction}, ${isInNormalRange ? "still normal" : sentiment}`,
        color: status === "balanced" ? "text-teal-600" : "text-amber-600",
      }
    } else if (percentChange < -2) {
      const direction = status === "balanced" ? "decline" : "decrease"
      const sentiment = status === "balanced" ? (isInNormalRange ? "still normal" : "monitor") : "improvement"
      return {
        icon: TrendingDown,
        text: `↘ ${absChange}% ${direction}, ${isInNormalRange ? "still normal" : sentiment}`,
        color: status === "balanced" ? "text-amber-600" : "text-teal-600",
      }
    } else {
      return {
        icon: Minus,
        text: `Stable (±${absChange}%), ${isInNormalRange ? "normal range" : "monitor"}`,
        color: "text-gray-500",
      }
    }
  }

  const trendInfo = getTrendInfo()

  useEffect(() => {
    if (!canvasRef.current || data.length < 2) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Extract values
    const values = data.map((d) => d.value)
    const minValue = Math.min(...values) * 0.9 // Add some padding
    const maxValue = Math.max(...values) * 1.1 // Add some padding

    // Ensure we include the reference ranges in our min/max calculation
    const allRangeValues = ranges.flatMap((range) => [range.min, range.max])
    const minRange = Math.min(...allRangeValues)
    const maxRange = Math.max(...allRangeValues)

    const min = Math.min(minValue, minRange)
    const max = Math.max(maxValue, maxRange)
    const range = max - min || 1 // Avoid division by zero

    const padding = { top: 20, right: 20, bottom: 30, left: 40 }
    const chartWidth = canvas.width - padding.left - padding.right
    const chartHeight = canvas.height - padding.top - padding.bottom

    // Draw reference range bands
    ranges.forEach((refRange) => {
      const minY = canvas.height - padding.bottom - ((refRange.max - min) / range) * chartHeight
      const maxY = canvas.height - padding.bottom - ((refRange.min - min) / range) * chartHeight
      const bandHeight = maxY - minY

      ctx.fillStyle = refRange.color
      ctx.fillRect(padding.left, minY, chartWidth, bandHeight)

      // Add range label
      ctx.fillStyle = "#03659C"
      ctx.font = "10px Inter, sans-serif"
      ctx.textAlign = "left"
      ctx.fillText(refRange.label, padding.left + 5, minY + 12)
    })

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, canvas.height - padding.bottom)
    ctx.lineTo(canvas.width - padding.right, canvas.height - padding.bottom)
    ctx.strokeStyle = "#CBD5E1" // slate-300
    ctx.lineWidth = 1
    ctx.stroke()

    // Draw Y-axis labels
    const yAxisSteps = 5
    for (let i = 0; i <= yAxisSteps; i++) {
      const value = min + (range / yAxisSteps) * i
      const y = canvas.height - padding.bottom - (i / yAxisSteps) * chartHeight

      ctx.beginPath()
      ctx.moveTo(padding.left - 5, y)
      ctx.lineTo(padding.left, y)
      ctx.strokeStyle = "#CBD5E1"
      ctx.stroke()

      ctx.fillStyle = "#64748B" // slate-500
      ctx.font = "10px Inter, sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(value.toFixed(0), padding.left - 8, y + 3)
    }

    // Calculate points
    const points = data.map((d, i) => {
      const x = padding.left + (i / (data.length - 1)) * chartWidth
      const y = canvas.height - padding.bottom - ((d.value - min) / range) * chartHeight

      // Determine which range this point falls into
      let pointRange = undefined
      for (const r of ranges) {
        if (d.value >= r.min && d.value <= r.max) {
          pointRange = r.label
          break
        }
      }

      return {
        x,
        y,
        value: d.value,
        date: d.date,
        range: pointRange,
      }
    })

    // Draw X-axis labels (dates)
    const dateLabelsToShow = data.length <= 4 ? data.length : 4
    const step = Math.ceil(data.length / dateLabelsToShow)

    for (let i = 0; i < data.length; i += step) {
      const x = padding.left + (i / (data.length - 1)) * chartWidth
      const date = new Date(data[i].date)
      const formattedDate = date.toLocaleDateString(undefined, { month: "short", day: "numeric" })

      ctx.fillStyle = "#64748B" // slate-500
      ctx.font = "10px Inter, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(formattedDate, x, canvas.height - padding.bottom + 15)
    }

    // Draw line
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }
    ctx.strokeStyle = statusColors[status]
    ctx.lineWidth = 2.5
    ctx.stroke()

    // Draw dots
    points.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI)
      ctx.fillStyle = "white"
      ctx.fill()
      ctx.strokeStyle = statusColors[status]
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // Add unit label to Y-axis
    ctx.save()
    ctx.translate(padding.left - 30, padding.top + chartHeight / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillStyle = "#64748B"
    ctx.font = "12px Inter, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(unit, 0, 0)
    ctx.restore()

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
          range: closestPoint.range,
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
  }, [data, status, ranges, unit])

  if (data.length < 2) {
    return (
      <div className={cn("h-[200px] flex items-center justify-center text-[#03659C]", className)}>
        Not enough data available
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-medium text-[#03659C]">{name} History</h3>
        <div className="flex items-center text-xs text-[#03659C]">
          <Info size={14} className="mr-1" />
          <span>Click on points for details</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#E5F8FF]">
        <canvas
          ref={canvasRef}
          height={height}
          className={cn("w-full rounded-lg", className)}
          aria-label={`Chart showing ${name} history over time`}
        ></canvas>

        {/* Trend callout pill */}
        <div className="px-3 py-2 flex justify-center">
          <div className={cn("flex items-center text-xs px-2 py-1 rounded-full", trendInfo.color)}>
            <trendInfo.icon className="h-3 w-3 mr-1" />
            <span>{trendInfo.text}</span>
          </div>
        </div>

        {/* Legend inside the chart card */}
        <div className="flex flex-wrap gap-3 p-3 border-t border-[#E5F8FF]">
          {ranges.map((range) => (
            <div key={range.label} className="flex items-center">
              <div
                className="w-3 h-3 rounded-sm mr-1.5"
                style={{ backgroundColor: range.color }}
                aria-hidden="true"
              ></div>
              <span className="text-xs text-[#03659C]">{range.label}</span>
            </div>
          ))}
          <div className="flex items-center">
            <div
              className="w-4 h-0.5 rounded-sm mr-1.5"
              style={{ backgroundColor: statusColors[status] }}
              aria-hidden="true"
            ></div>
            <span className="text-xs text-[#03659C]">Your results</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {tooltip.visible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bg-white p-3 rounded-lg shadow-md text-sm z-10 border border-[#E5F8FF] max-w-[200px]"
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y - 80}px`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="font-medium text-[#03659C]">
              {tooltip.value} {unit}
            </div>
            <div className="text-gray-500 text-xs">{new Date(tooltip.date).toLocaleDateString()}</div>
            {tooltip.range && <div className="mt-1 text-xs font-medium text-[#03659C]">{tooltip.range} range</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
