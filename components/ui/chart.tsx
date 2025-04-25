"use client"

import type React from "react"

import { createContext } from "react"
import { cn } from "@/lib/utils"

const ChartContext = createContext({})

interface ChartProps {
  children: React.ReactNode
  className?: string
}

export function Chart({ children, className }: ChartProps) {
  return (
    <ChartContext.Provider value={{}}>
      <div className={cn("relative", className)}>{children}</div>
    </ChartContext.Provider>
  )
}

interface ChartContainerProps {
  children: React.ReactNode
  className?: string
}

export function ChartContainer({ children, className }: ChartContainerProps) {
  return <div className={cn("rounded-md border", className)}>{children}</div>
}

interface ChartTooltipProps {
  children: React.ReactNode
  className?: string
}

export function ChartTooltip({ children, className }: ChartTooltipProps) {
  return <div className={cn("p-2 rounded-md bg-white shadow", className)}>{children}</div>
}

interface ChartTooltipContentProps {
  label: string
  value: number
  className?: string
}

export function ChartTooltipContent({ label, value, className }: ChartTooltipContentProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}

interface ChartLegendProps {
  children: React.ReactNode
  className?: string
}

export function ChartLegend({ children, className }: ChartLegendProps) {
  return <div className={cn("p-2", className)}>{children}</div>
}

interface ChartLegendContentProps {
  label: string
  color: string
  className?: string
}

export function ChartLegendContent({ label, color, className }: ChartLegendContentProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: color }}></div>
      <span className="text-sm">{label}</span>
    </div>
  )
}

interface ChartStyleProps {
  className?: string
}

export function ChartStyle({ className }: ChartStyleProps) {
  return (
    <style jsx>{`
    .recharts-tooltip-wrapper {
      z-index: 1000;
    }
  `}</style>
  )
}
