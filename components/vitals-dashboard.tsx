"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { usePatient } from "@/context/patient-context";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { PersonalizedTracking } from "./personalized-tracking";
import { useMediaQuery } from "../hooks/use-media-query";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface VitalsDashboardProps {
  className?: string;
  filterCategory?: string;
}

export function VitalsDashboard({
  className,
  filterCategory,
}: VitalsDashboardProps) {
  const { patientData, isLoading } = usePatient();
  const [showPersonalizedTracking, setShowPersonalizedTracking] =
    useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Filter metrics based on the category if provided
  const filteredMetrics = filterCategory
    ? patientData.metrics.filter((m) => m.category === filterCategory)
    : patientData.metrics;

  // Get metrics that should be displayed in the vitals dashboard
  // If a category filter is active, show all metrics in that category
  // Otherwise show the default key metrics
  const displayedMetrics = filterCategory
    ? filteredMetrics
    : [
        patientData.metrics.find((m) => m.id === "glucose"),
        patientData.metrics.find((m) => m.id === "ldl"),
        patientData.metrics.find((m) => m.id === "vitd"),
      ].filter(Boolean);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "balanced":
        return "Balanced";
      case "manage":
        return "Manage";
      case "consult":
        return "Review";
      case "book":
        return "Book";
      default:
        return "Unknown";
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case "balanced":
        return "😊";
      case "manage":
        return "🍎";
      case "consult":
        return "🔍";
      case "book":
        return "📅";
      default:
        return "";
    }
  };

  const getTrendText = (metric: any) => {
    if (!metric.history || metric.history.length < 2) return null;

    const latest = metric.history[metric.history.length - 1].value;
    const previous = metric.history[metric.history.length - 2].value;
    const percentChange = ((latest - previous) / previous) * 100;

    if (Math.abs(percentChange) < 1) return null;

    const absChange = Math.abs(percentChange).toFixed(1);

    return {
      text: `${percentChange > 0 ? "▲" : "▼"} ${absChange}%`,
      improving: percentChange < 0,
      status: metric.status,
    };
  };

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {/* Header with Add Tracking button */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium text-[#03659C]">
          {filterCategory
            ? `${
                filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)
              } Metrics`
            : "Vitals & More"}
        </h2>
        <Button
          variant="outline"
          size={isMobile ? "sm" : "default"}
          className="text-[#03659C] border-[#03659C]/20"
          onClick={() => setShowPersonalizedTracking(true)}
          aria-label="Add health tracking"
        >
          <Plus className="h-4 w-4 mr-1" aria-hidden="true" />
          Add Tracking
        </Button>
      </div>

      {isLoading ? (
        // Skeleton loading state
        Array.from({ length: displayedMetrics.length || 3 }).map((_, i) => (
          <div key={i} className="mb-3">
            <Skeleton className="h-24 w-full" />
          </div>
        ))
      ) : displayedMetrics.length === 0 ? (
        // Empty state when no metrics match the filter
        <div className="bg-[#E5F8FF] rounded-lg p-6 text-center">
          <p className="text-[#03659C] mb-3">
            No metrics found for this category.
          </p>
          <Button
            onClick={() => setShowPersonalizedTracking(true)}
            className="bg-[#03659C]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Metric
          </Button>
        </div>
      ) : (
        // Vitals card layout - keeping the original design with improved accessibility
        <div className="space-y-4">
          {displayedMetrics.map((metric) => (
            <div
              key={metric!.id}
              className="bg-[#E5F8FF] rounded-lg relative overflow-hidden border border-transparent hover:border-[#03659C]/10 transition-all"
            >
              <Link
                href={`/results/${metric!.id}`}
                className="block p-4"
                aria-label={`View details for ${metric!.name}: ${
                  metric!.value
                } ${metric!.unit}, status: ${metric!.status}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex gap-x-1 items-center">
                      <h3 className="font-medium text-[#03659C]">
                        {metric!.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#03659C]/70">
                      {getFormattedDate(metric!.lastUpdated)}
                    </p>
                  </div>
                  <div>
                    <div
                      role="status"
                      aria-label={`Status: ${getStatusLabel(metric!.status)}`}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium flex items-center justify-center w-[100px] h-[28px]",
                        metric!.status === "balanced"
                          ? "bg-emerald-600 text-white"
                          : metric!.status === "manage"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-white text-red-600"
                      )}
                    >
                      <span className="mr-1.5" role="img" aria-hidden="true">
                        {getStatusEmoji(metric!.status)}
                      </span>
                      {getStatusLabel(metric!.status)}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-end mt-2">
                  <div className="text-3xl font-bold text-[#03659C]">
                    {metric!.value}
                    <span className="text-base font-medium ml-1">
                      {metric!.unit}
                    </span>
                  </div>

                  {getTrendText(metric) && (
                    <div
                      className={cn(
                        "text-sm font-medium",
                        getTrendText(metric).status === "consult"
                          ? "text-red-600"
                          : getTrendText(metric).improving
                          ? "text-emerald-700"
                          : "text-red-600"
                      )}
                      aria-label={`Trend: ${getTrendText(metric).text}`}
                    >
                      {getTrendText(metric).text}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Personalized Tracking Modal */}
      {showPersonalizedTracking && (
        <PersonalizedTracking
          onClose={() => setShowPersonalizedTracking(false)}
        />
      )}
    </motion.div>
  );
}
