"use client"

import { useEffect, useRef } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProgressRingProps {
  size: number
  progress: number
  strokeWidth: number
  label: string
  sublabel?: string
  color?: string
  className?: string
}

export function ProgressRing({
  size,
  progress,
  strokeWidth,
  label,
  sublabel,
  color = "#03659C",
  className,
}: ProgressRingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Draw background circle
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = "#E5F8FF"
    ctx.lineWidth = strokeWidth
    ctx.stroke()

    // Draw progress arc
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, radius, -Math.PI / 2, -Math.PI / 2 + (2 * Math.PI * progress) / 100)
    ctx.strokeStyle = color
    ctx.lineWidth = strokeWidth
    ctx.stroke()
  }, [size, radius, strokeWidth, progress, color])

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} width={size} height={size} className="absolute" />
      <div className="flex flex-col items-center justify-center text-center z-10">
        <span className="text-sm font-medium text-[#03659C]">{label}</span>
        {sublabel && <span className="text-xs text-[#03659C]/70">{sublabel}</span>}
      </div>
    </div>
  )
}

export function NextTestProgressRing({
  daysUntilNextTest,
  className,
}: { daysUntilNextTest: number; className?: string }) {
  // Calculate progress percentage (assuming a 365-day cycle)
  const progress = Math.max(0, Math.min(100, ((365 - daysUntilNextTest) / 365) * 100))

  // Determine color based on days remaining
  let color = "#03659C" // default blue
  if (daysUntilNextTest < 30) {
    color = "#F59E0B" // amber for less than 30 days
  } else if (daysUntilNextTest < 7) {
    color = "#EF4444" // red for less than 7 days
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={className}>
            <ProgressRing
              size={60}
              progress={progress}
              strokeWidth={4}
              label={daysUntilNextTest > 0 ? `${daysUntilNextTest}` : "Due"}
              sublabel={daysUntilNextTest > 0 ? "days" : "now"}
              color={color}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">
            {daysUntilNextTest > 30
              ? `Next recommended test in ${daysUntilNextTest} days`
              : daysUntilNextTest > 0
                ? `Your next test is due soon (${daysUntilNextTest} days)`
                : "Your test is due now"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
