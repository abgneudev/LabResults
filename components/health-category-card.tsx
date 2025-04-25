"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metric } from "@/context/patient-context";
import { MetricRow } from "./metric-row";

interface HealthCategoryCardProps {
  title: string;
  metrics: Metric[];
  className?: string;
}

export function HealthCategoryCard({
  title,
  metrics,
  className,
}: HealthCategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Get status dot color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "balanced":
        return "bg-teal-500";
      case "manage":
        return "bg-amber-500";
      case "consult":
        return "bg-rose-500";
      case "book":
        return "bg-blue-500";
      default:
        return "bg-gray-400";
    }
  };

  // Count metrics by status for accessibility/screen readers
  const statusSummary = metrics.reduce<Record<string, number>>(
    (acc, metric) => {
      acc[metric.status] = (acc[metric.status] || 0) + 1;
      return acc;
    },
    {}
  );

  // Generate accessible status summary
  const getAccessibleStatusSummary = () => {
    const parts = [];
    for (const [status, count] of Object.entries(statusSummary)) {
      if (count > 0) {
        parts.push(`${count} ${status}`);
      }
    }
    return parts.join(", ");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-[#E5F8FF] rounded-lg overflow-hidden shadow-sm border border-[#E5F8FF]",
        className
      )}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#03659C] focus-visible:ring-offset-2"
        aria-expanded={isExpanded}
        aria-controls={`metrics-${title.replace(/\s+/g, "-").toLowerCase()}`}
      >
        <div className="flex items-center">
          <h3 className="font-medium text-[#03659C]">{title}</h3>
          <div
            className="flex ml-3 space-x-1"
            aria-label={`Status indicators: ${getAccessibleStatusSummary()}`}
          >
            {metrics.map((metric, index) => (
              <div
                key={`${metric.id}-${index}`}
                className={cn(
                  "w-2 h-2 rounded-full",
                  getStatusColor(metric.status)
                )}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-[#03659C] transition-transform",
            isExpanded && "transform rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`metrics-${title.replace(/\s+/g, "-").toLowerCase()}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 pb-4 space-y-2"
          >
            {metrics.map((metric) => (
              <MetricRow key={metric.id} metric={metric} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
