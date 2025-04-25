"use client";

import Link from "next/link";
import { MessageSquare } from "lucide-react";
import type { Metric } from "@/context/patient-context";
import { StatusIndicator } from "./status-indicator";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MetricRowProps {
  metric: Metric;
  className?: string;
}

export function MetricRow({ metric, className }: MetricRowProps) {
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "balanced":
        return "Normal";
      case "manage":
        return "Monitor";
      case "consult":
        return "Needs follow-up";
      case "book":
        return "Schedule test";
      default:
        return "Unknown";
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "balanced":
        return "bg-teal-100 text-teal-700";
      case "manage":
        return "bg-amber-100 text-amber-700";
      case "consult":
        return "bg-gray-100 text-gray-700";
      case "book":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 bg-white rounded-md shadow-sm border border-[#E5F8FF]/80",
        className
      )}
    >
      <div className="flex items-center space-x-3">
        <div
          className={cn("w-3 h-3 rounded-full", getStatusColor(metric.status))}
        />
        <div>
          <Link
            href={`/results/${metric.id}`}
            className="font-medium text-[#03659C] hover:underline"
          >
            {metric.name}
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-3 flex-shrink-0">
        <div className="text-[#03659C] font-medium">
          {metric.value}{" "}
          <span className="text-xs font-normal">{metric.unit}</span>
        </div>

        <div
          className={cn(
            "px-2 py-1 text-xs rounded-full font-medium whitespace-nowrap",
            getStatusBadgeStyle(metric.status)
          )}
        >
          {getStatusText(metric.status)}
        </div>

        {metric.status === "consult" && (
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7 px-2 text-[#03659C] border-[#03659C]/20 whitespace-nowrap"
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            Message doc
          </Button>
        )}
      </div>
    </div>
  );
}
