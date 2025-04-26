"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import type { Metric } from "@/context/patient-context";
import { StatusIndicator } from "@/components/status-indicator";
import { CategoryIcon } from "@/components/category-icon";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
  Heart,
  Droplet,
  Sun,
  FlaskRound,
  Activity,
} from "lucide-react";

interface HealthCardProps {
  metric: Metric;
  index: number;
  className?: string;
}

export function HealthCard({ metric, index, className }: HealthCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedDate = new Date(metric.lastUpdated).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric" }
  );

  // Calculate trend if history exists
  const hasTrend = metric.history && metric.history.length >= 2;
  let trendIcon = Minus;
  let trendText = "Stable";
  let trendColor = "text-gray-500";

  if (hasTrend) {
    const latest = metric.history![metric.history!.length - 1].value;
    const previous = metric.history![metric.history!.length - 2].value;
    const percentChange = ((latest - previous) / previous) * 100;

    if (percentChange > 2) {
      trendIcon = TrendingUp;
      trendText = `Up ${Math.abs(percentChange).toFixed(1)}%`;
      trendColor =
        metric.status === "balanced" ? "text-green-600" : "text-red-600";
    } else if (percentChange < -2) {
      trendIcon = TrendingDown;
      trendText = `Down ${Math.abs(percentChange).toFixed(1)}%`;
      trendColor =
        metric.status === "balanced" ? "text-green-600" : "text-red-600";
    }
  }

  // Normal range information
  const getNormalRange = (metricId: string) => {
    switch (metricId) {
      case "glucose":
        return "70-99 mg/dL (fasting)";
      case "vitd":
        return "30-50 ng/mL";
      case "ldl":
        return "<100 mg/dL";
      case "bp":
        return "<120/80 mmHg";
      case "protein":
        return "0 mg/dL";
      default:
        return "Consult your provider";
    }
  };

  // Why it matters information
  const getWhyItMatters = (metricId: string) => {
    switch (metricId) {
      case "glucose":
        return "Blood glucose is a key indicator of how your body processes sugar. Monitoring helps identify risk for diabetes and metabolic issues early.";
      case "vitd":
        return "Vitamin D is essential for bone health, immune function, and mood regulation. Adequate levels support overall wellness.";
      case "ldl":
        return "LDL cholesterol, often called 'bad' cholesterol, can build up in your arteries. Keeping levels in check reduces heart disease risk.";
      case "bp":
        return "Blood pressure measures the force of blood against artery walls. Healthy levels reduce strain on your heart and blood vessels.";
      case "protein":
        return "Protein in urine can indicate how well your kidneys are filtering. Normal levels suggest healthy kidney function.";
      default:
        return "This measurement helps your healthcare provider understand your overall health and identify potential areas for improvement.";
    }
  };

  // Get icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "blood":
        return Droplet;
      case "vitamins":
        return Sun;
      case "heart":
        return Heart;
      case "urine":
        return FlaskRound;
      case "organ":
        return Activity;
      default:
        return Info;
    }
  };

  // Get lifestyle tips
  const getLifestyleTip = (metricId: string) => {
    switch (metricId) {
      case "glucose":
        return "Regular physical activity and a diet rich in fiber, lean proteins, and healthy fats can help maintain healthy blood sugar levels.";
      case "vitd":
        return "Spending 15-30 minutes in sunlight a few times a week and including fatty fish, egg yolks, and fortified foods in your diet can help maintain levels.";
      case "ldl":
        return "Eating foods rich in soluble fiber (oats, beans, fruits) and healthy fats (olive oil, nuts) while limiting saturated fats can help manage cholesterol.";
      case "bp":
        return "Regular physical activity, limiting sodium intake, and managing stress through meditation or deep breathing can support healthy blood pressure.";
      case "protein":
        return "Staying well-hydrated, maintaining a healthy weight, and following a balanced diet supports kidney health and function.";
      default:
        return "A balanced diet, regular physical activity, adequate sleep, and stress management support overall health and wellness.";
    }
  };

  // Background color based on category (similar to Headspace design)
  const getCategoryBgColor = (category: string) => {
    switch (category) {
      case "blood":
        return "bg-gradient-to-br from-orange-100 to-orange-200";
      case "vitamins":
        return "bg-gradient-to-br from-yellow-100 to-yellow-200";
      case "heart":
        return "bg-gradient-to-br from-red-100 to-red-200";
      case "urine":
        return "bg-gradient-to-br from-blue-100 to-blue-200";
      case "organ":
        return "bg-gradient-to-br from-green-100 to-green-200";
      default:
        return "bg-gradient-to-br from-[#E5F8FF] to-[#D9F2FF]";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn("relative", className)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-center">
        <div className="w-px h-full bg-[#E5F8FF] absolute left-1/2 transform -translate-x-1/2"></div>
        <div className="w-8 h-8 rounded-full bg-white border border-[#E5F8FF] flex items-center justify-center z-10 mt-4">
          <CategoryIcon
            type={metric.category === "organ" ? "organ" : metric.category}
            size={16}
            className="p-0"
          />
        </div>
      </div>

      <div className="ml-12">
        <Link
          href={`/results/${metric.id}`}
          aria-label={`View details for ${metric.name}: ${metric.value} ${metric.unit}, status: ${metric.status}`}
        >
          <div
            className={cn(
              "rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md",
              "border border-transparent hover:border-[#E5F8FF]"
            )}
          >
            <div
              className={cn(
                "px-3 py-2 flex flex-col",
                getCategoryBgColor(metric.category)
              )}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">
                    {metric.name}
                  </h3>
                </div>
                <StatusIndicator status={metric.status} />
              </div>

              <div className="flex items-end justify-between mt-0.5">
                <div className="text-2xl font-bold text-gray-900">
                  {metric.value}{" "}
                  <span className="text-sm font-medium ml-1 text-gray-800">
                    {metric.unit}
                  </span>
                </div>

                {hasTrend && (
                  <div
                    className={cn(
                      "flex items-center text-xs font-semibold",
                      trendColor
                    )}
                    aria-label={`Trend: ${trendText}`}
                  >
                    {React.createElement(trendIcon, {
                      size: 14,
                      className: "mr-1",
                      "aria-hidden": "true",
                    })}
                    <span>{trendText}</span>
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-800 flex items-center mt-0.5 font-medium">
                <Info className="h-3 w-3 mr-1" aria-hidden="true" />
                <span>
                  {formattedDate} •{" "}
                  <span className="font-semibold">Normal range:</span>{" "}
                  {getNormalRange(metric.id)}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* "What this means" accordion - shows on demand */}
        <div className="mt-1 bg-white rounded-lg border border-[#E5F8FF]">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }}
            className="w-full py-1.5 px-3 flex justify-between items-center text-xs font-medium text-left text-gray-700 hover:bg-[#FAFEFF] transition-colors rounded-lg"
            aria-expanded={isExpanded}
            aria-controls={`info-${metric.id}`}
          >
            <div className="flex items-center">
              <Info
                className="h-3 w-3 mr-1.5 text-gray-700"
                aria-hidden="true"
              />
              <span>What this means</span>
            </div>
            <ChevronDown
              className={`h-3 w-3 transition-transform duration-200 ${
                isExpanded ? "transform rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="p-3 pt-1 text-xs space-y-3 border-t border-[#E5F8FF]"
              id={`info-${metric.id}`}
            >
              <div>
                <span className="font-semibold text-gray-900 block mb-1">
                  Why it matters:
                </span>
                <span className="text-gray-800 font-normal">
                  {getWhyItMatters(metric.id)}
                </span>
              </div>
              <div className="bg-[#FAFEFF] p-2 rounded-lg">
                <div className="flex items-center mb-1">
                  {React.createElement(getCategoryIcon(metric.category), {
                    size: 14,
                    className: "mr-1.5 text-gray-800",
                    "aria-hidden": "true",
                  })}
                  <span className="font-semibold text-gray-900">
                    Lifestyle tip:
                  </span>
                </div>
                <p className="text-gray-800 font-normal">
                  {getLifestyleTip(metric.id)}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
