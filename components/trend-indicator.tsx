"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SimpleTooltip } from "@/components/ui/simple-tooltip";

interface TrendIndicatorProps {
  currentValue: number | string;
  previousValue?: number | string;
  normalRange?: {
    min: number | string;
    max: number | string;
  };
  unit: string;
  showPercentage?: boolean;
  className?: string;
}

export function TrendIndicator({
  currentValue,
  previousValue,
  normalRange,
  unit,
  showPercentage = true,
  className,
}: TrendIndicatorProps) {
  // Convert string values to numbers
  const current =
    typeof currentValue === "string" ? parseFloat(currentValue) : currentValue;
  const previous = previousValue
    ? typeof previousValue === "string"
      ? parseFloat(previousValue)
      : previousValue
    : undefined;

  // Cannot determine trend without previous value
  if (previous === undefined) {
    return (
      <div className={cn("flex items-center text-gray-400 text-xs", className)}>
        <Minus className="h-3 w-3 mr-1" />
        <span>No trend data</span>
      </div>
    );
  }

  const diff = current - previous;
  const percentChange = previous !== 0 ? (diff / previous) * 100 : 0;

  // Determine if change is within normal range
  let isSignificant = false;
  if (normalRange) {
    const min =
      typeof normalRange.min === "string"
        ? parseFloat(normalRange.min)
        : normalRange.min;
    const max =
      typeof normalRange.max === "string"
        ? parseFloat(normalRange.max)
        : normalRange.max;

    // Significant if change crossed boundary of normal range
    const wasPreviousInRange = previous >= min && previous <= max;
    const isCurrentInRange = current >= min && current <= max;
    isSignificant =
      wasPreviousInRange !== isCurrentInRange || Math.abs(percentChange) > 15;
  } else {
    // Without range, consider >10% change significant
    isSignificant = Math.abs(percentChange) > 10;
  }

  // Determine colors and indicators based on direction and significance
  let color, icon, label;

  if (Math.abs(diff) < 0.001) {
    // Essentially no change
    color = "text-gray-500";
    icon = <Minus className="h-3 w-3 mr-1" />;
    label = "No change";
  } else if (diff > 0) {
    if (isSignificant) {
      color = "text-amber-500";
      icon = <TrendingUp className="h-3 w-3 mr-1" />;
      label = "Increased";
    } else {
      color = "text-blue-500";
      icon = <TrendingUp className="h-3 w-3 mr-1" />;
      label = "Slight increase";
    }
  } else {
    if (isSignificant) {
      color = "text-teal-500"; // Going down can often be good for many metrics
      icon = <TrendingDown className="h-3 w-3 mr-1" />;
      label = "Decreased";
    } else {
      color = "text-blue-500";
      icon = <TrendingDown className="h-3 w-3 mr-1" />;
      label = "Slight decrease";
    }
  }

  const tooltipContent = (
    <div className="text-xs">
      <p>{label}</p>
      <p className="mt-1">
        Previous: {previous} {unit}
      </p>
      <p>
        Current: {current} {unit}
      </p>
      {normalRange && (
        <p className="mt-1 text-[#03659C]/70">
          Normal range: {normalRange.min}-{normalRange.max} {unit}
        </p>
      )}
    </div>
  );

  return (
    <SimpleTooltip content={tooltipContent} side="top">
      <div className={cn("flex items-center cursor-help", color, className)}>
        {icon}
        <span>
          {showPercentage
            ? `${Math.abs(percentChange).toFixed(1)}%`
            : `${Math.abs(diff).toFixed(1)} ${unit}`}
        </span>
      </div>
    </SimpleTooltip>
  );
}
