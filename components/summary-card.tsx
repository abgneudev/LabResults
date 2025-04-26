"use client";

import { BarChart4, ChevronRight } from "lucide-react";

interface SummaryCardProps {
  className?: string;
  metricCount: number;
  improving: number;
  stable: number;
  worsening: number;
  onViewTrend?: () => void;
}

export function SummaryCard({
  className = "",
  metricCount,
  improving,
  stable,
  worsening,
  onViewTrend,
}: SummaryCardProps) {
  return (
    <div className={`rounded-lg bg-[#FAFEFF] px-4 py-3 w-full ${className}`}>
      {/* Card Header */}
      <div className="flex items-center">
        <BarChart4 className="h-4 w-4 text-[#03659C] mr-2" aria-hidden="true" />
        <span className="text-sm font-semibold">
          Tracking {metricCount} key metrics
        </span>
      </div>

      {/* Metrics Row */}
      <div className="flex flex-wrap gap-2 mt-2">
        {improving > 0 && (
          <div className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
            🟢 {improving} improving
          </div>
        )}

        {stable > 0 && (
          <div className="bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
            ◼︎ {stable} stable
          </div>
        )}

        {worsening > 0 && (
          <div className="bg-red-50 text-red-700 px-2 py-0.5 rounded-full text-xs font-medium">
            🔺 {worsening} worsening
          </div>
        )}

        <div className="ml-auto">
          <button
            onClick={onViewTrend}
            className="flex items-center text-xs text-[#03659C] font-semibold"
          >
            View trend
            <ChevronRight className="h-3 w-3 ml-1" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
