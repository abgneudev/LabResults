"use client";

import React from "react";
import {
  HelpCircle,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  TrendingDown,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SimpleTooltip } from "@/components/ui/simple-tooltip";
import { motion, AnimatePresence } from "framer-motion";

interface ResultExplanationProps {
  testName: string;
  value: string | number;
  unit: string;
  status: string;
  className?: string;
  showFullExplanation?: boolean;
  previousValue?: string | number;
  previousDate?: string;
  referenceRange?: string;
}

// Helper function to get test category for grouping related tests
const getTestCategory = (testName: string): string => {
  const testNameLower = testName.toLowerCase();

  if (testNameLower.includes("glucose") || testNameLower.includes("a1c")) {
    return "blood-sugar";
  } else if (
    testNameLower.includes("cholesterol") ||
    testNameLower.includes("ldl") ||
    testNameLower.includes("hdl") ||
    testNameLower.includes("triglyceride")
  ) {
    return "cholesterol";
  } else if (testNameLower.includes("vitamin")) {
    return "vitamins";
  } else if (
    testNameLower.includes("tsh") ||
    testNameLower.includes("t3") ||
    testNameLower.includes("t4")
  ) {
    return "thyroid";
  } else if (
    testNameLower.includes("creatinine") ||
    testNameLower.includes("bun") ||
    testNameLower.includes("gfr")
  ) {
    return "kidney";
  } else if (
    testNameLower.includes("alt") ||
    testNameLower.includes("ast") ||
    testNameLower.includes("bilirubin")
  ) {
    return "liver";
  } else if (
    testNameLower.includes("wbc") ||
    testNameLower.includes("rbc") ||
    testNameLower.includes("platelet") ||
    testNameLower.includes("hemoglobin") ||
    testNameLower.includes("hematocrit")
  ) {
    return "blood-counts";
  }

  return "general";
};

export function ResultExplanation({
  testName,
  value,
  unit,
  status,
  className,
  showFullExplanation = false,
  previousValue,
  previousDate,
  referenceRange,
}: ResultExplanationProps) {
  const [expanded, setExpanded] = useState(showFullExplanation);
  const [showResources, setShowResources] = useState(false);

  // Get test category
  const category = getTestCategory(testName);

  // Calculate trend if we have previous value
  const getTrend = () => {
    if (previousValue === undefined) return null;

    const current = typeof value === "string" ? parseFloat(value) : value;
    const previous =
      typeof previousValue === "string" ? parseFloat(previousValue) : previousValue;
    const diff = current - previous;
    const percentChange = previous !== 0 ? (diff / previous) * 100 : 0;

    if (Math.abs(diff) < 0.001)
      return {
        direction: "none",
        percent: 0,
        color: "text-gray-500",
        icon: <Minus className="h-4 w-4" />,
      };

    if (diff > 0) {
      return {
        direction: "up",
        percent: percentChange,
        color: status === "high" ? "text-amber-600" : "text-blue-600",
        icon: <TrendingUp className="h-4 w-4" />,
      };
    } else {
      return {
        direction: "down",
        percent: percentChange,
        color: status === "low" ? "text-amber-600" : "text-blue-600",
        icon: <TrendingDown className="h-4 w-4" />,
      };
    }
  };

  const trend = getTrend();

  // Get explanation content based on test name and status
  const getExplanation = () => {
    if (status === "normal") {
      return {
        short: "Your result is within the normal range.",
        detail:
          "This result is within the expected healthy range for this test. Continue with your current health practices.",
        recommendations: [
          "Maintain your current health habits",
          "Follow up with regular check-ups as recommended by your doctor",
        ],
        resources: [
          { title: "Understanding normal lab values", url: "#" },
          { title: "Preventive health screenings", url: "#" },
        ],
      };
    }

    // Explanations for abnormal results by category
    switch (category) {
      case "blood-sugar":
        return status === "high"
          ? {
              short: "Your blood sugar level is elevated.",
              detail:
                "Elevated blood sugar may indicate prediabetes or diabetes. Persistent high levels can affect your blood vessels and organs over time.",
              recommendations: [
                "Consider discussing dietary changes with your healthcare provider",
                "Regular exercise can help lower blood sugar levels",
                "Monitor your carbohydrate intake",
                "Follow up with your doctor for additional testing if needed",
              ],
              resources: [
                { title: "American Diabetes Association", url: "https://diabetes.org" },
                { title: "Managing high blood sugar", url: "#" },
                { title: "Diet tips for blood sugar control", url: "#" },
              ],
            }
          : {
              short: "Your blood sugar level is lower than normal.",
              detail:
                "Low blood sugar can cause symptoms like shakiness, hunger, anxiety, and confusion. It may be temporary or indicate an underlying condition.",
              recommendations: [
                "Eat regular meals and snacks throughout the day",
                "Include protein and healthy fats with carbohydrates",
                "Discuss with your doctor, especially if you're taking diabetes medications",
              ],
              resources: [
                { title: "Hypoglycemia (Low Blood Sugar)", url: "#" },
                { title: "Balancing blood sugar levels", url: "#" },
              ],
            };

      case "cholesterol":
        if (testName.toLowerCase().includes("ldl")) {
          return status === "high"
            ? {
                short: "Your LDL ('bad') cholesterol is elevated.",
                detail:
                  "Elevated LDL cholesterol can build up on artery walls and increase risk of heart disease and stroke.",
                recommendations: [
                  "Focus on a heart-healthy diet with less saturated fat",
                  "Increase physical activity",
                  "Consider foods that can help lower cholesterol like oats, nuts, and olive oil",
                  "Discuss with your doctor if medication might be appropriate",
                ],
                resources: [
                  { title: "American Heart Association", url: "https://heart.org" },
                  { title: "Foods that help lower LDL cholesterol", url: "#" },
                  { title: "Understanding cholesterol medications", url: "#" },
                ],
              }
            : {
                short:
                  "Your LDL cholesterol is lower than typical reference ranges.",
                detail:
                  "While generally considered positive, very low LDL levels may sometimes be associated with other conditions.",
                recommendations: [
                  "Continue your healthy lifestyle choices",
                  "Discuss with your doctor at your next appointment",
                ],
                resources: [
                  { title: "Understanding cholesterol levels", url: "#" },
                ],
              };
        } else if (testName.toLowerCase().includes("hdl")) {
          return status === "high"
            ? {
                short:
                  "Your HDL ('good') cholesterol is higher than typical ranges.",
                detail:
                  "Higher HDL levels are generally protective against heart disease, though very high levels may have other implications.",
                recommendations: [
                  "Maintain your current exercise and dietary habits",
                  "Discuss with your doctor at your next appointment",
                ],
                resources: [
                  { title: "Benefits of HDL cholesterol", url: "#" },
                ],
              }
            : {
                short: "Your HDL ('good') cholesterol is lower than optimal.",
                detail:
                  "Lower HDL cholesterol may reduce protection against heart disease.",
                recommendations: [
                  "Regular aerobic exercise can help raise HDL levels",
                  "Consider including heart-healthy fats like olive oil, avocados and nuts",
                  "If you smoke, consider a smoking cessation program",
                  "Discuss with your healthcare provider at your next visit",
                ],
                resources: [
                  { title: "How to increase HDL levels naturally", url: "#" },
                  { title: "Exercise and cholesterol", url: "#" },
                ],
              };
        } else {
          return status === "high"
            ? {
                short: "Your cholesterol levels are higher than normal.",
                detail:
                  "Elevated cholesterol can increase your risk of heart disease and stroke over time.",
                recommendations: [
                  "Consider dietary changes, limiting saturated and trans fats",
                  "Increase physical activity",
                  "Discuss with your doctor if additional tests or treatments might be appropriate",
                ],
                resources: [
                  { title: "National Heart, Lung, and Blood Institute", url: "#" },
                  { title: "Heart-healthy diet tips", url: "#" },
                ],
              }
            : {
                short: "Your cholesterol levels are lower than typical ranges.",
                detail:
                  "While often considered positive, very low cholesterol may sometimes be associated with other conditions.",
                recommendations: [
                  "Discuss with your doctor at your next appointment",
                ],
                resources: [
                  { title: "Understanding cholesterol test results", url: "#" },
                ],
              };
        }

      case "thyroid":
        if (testName.toLowerCase().includes("tsh")) {
          return status === "high"
            ? {
                short: "Your thyroid stimulating hormone is elevated.",
                detail:
                  "Elevated TSH often indicates an underactive thyroid (hypothyroidism), which can affect metabolism and energy levels.",
                recommendations: [
                  "Further thyroid testing may be needed",
                  "Discuss symptoms like fatigue, weight gain, or cold sensitivity with your doctor",
                  "Follow up with your healthcare provider for possible treatment options",
                ],
                resources: [
                  { title: "American Thyroid Association", url: "https://www.thyroid.org" },
                  { title: "Understanding hypothyroidism", url: "#" },
                ],
              }
            : {
                short: "Your thyroid stimulating hormone is lower than normal.",
                detail:
                  "Low TSH may indicate an overactive thyroid (hyperthyroidism), which can affect heart rate, weight, and energy levels.",
                recommendations: [
                  "Further thyroid testing may be needed",
                  "Discuss symptoms like anxiety, weight loss, or heat sensitivity with your doctor",
                  "Follow up with your healthcare provider for evaluation",
                ],
                resources: [
                  { title: "American Thyroid Association", url: "https://www.thyroid.org" },
                  { title: "Understanding hyperthyroidism", url: "#" },
                ],
              };
        } else {
          return status === "high"
            ? {
                short: "Your thyroid hormone level is elevated.",
                detail:
                  "Elevated thyroid hormones may indicate an overactive thyroid (hyperthyroidism).",
                recommendations: [
                  "Discuss with your doctor for proper interpretation with other thyroid test results",
                  "Follow up for possible additional testing or treatment",
                ],
                resources: [
                  { title: "Managing thyroid disorders", url: "#" },
                ],
              }
            : {
                short: "Your thyroid hormone level is lower than normal.",
                detail:
                  "Low thyroid hormones may indicate an underactive thyroid (hypothyroidism).",
                recommendations: [
                  "Discuss with your doctor for proper interpretation with other thyroid test results",
                  "Follow up for possible additional testing or treatment",
                ],
                resources: [
                  { title: "Thyroid hormone replacement", url: "#" },
                ],
              };
        }

      // Add other categories with their explanations...

      default:
        return status === "high"
          ? {
              short: "This result is higher than the reference range.",
              detail:
                "Results outside the reference range may need attention, though they don't always indicate a problem.",
              recommendations: [
                "Discuss this result with your healthcare provider",
                "Consider if any follow-up testing is recommended",
              ],
              resources: [
                { title: "Understanding lab test results", url: "#" },
              ],
            }
          : {
              short: "This result is lower than the reference range.",
              detail:
                "Results outside the reference range may need attention, though they don't always indicate a problem.",
              recommendations: [
                "Discuss this result with your healthcare provider",
                "Consider if any follow-up testing is recommended",
              ],
              resources: [
                { title: "Understanding lab test results", url: "#" },
              ],
            };
    }
  };

  const explanation = getExplanation();

  // Get action based on test type and status
  const getRecommendedAction = () => {
    if (status === "normal") return null;

    if (category === "blood-sugar" && status === "high") {
      return {
        text: "Track blood sugar",
        icon: <ActivityIcon className="h-4 w-4 mr-1.5" />,
        frequency: "daily",
      };
    } else if (category === "cholesterol" && status === "high") {
      return {
        text: "Monitor cholesterol",
        icon: <HeartIcon className="h-4 w-4 mr-1.5" />,
        frequency: "3-6 months",
      };
    } else if (category === "thyroid") {
      return {
        text: "Track thyroid levels",
        icon: <ActivityIcon className="h-4 w-4 mr-1.5" />,
        frequency: "3-6 months",
      };
    }

    return {
      text: "Follow-up needed",
      icon: <CalendarIcon className="h-4 w-4 mr-1.5" />,
      frequency: "schedule appointment",
    };
  };

  return (
    <div
      className={cn(
        "bg-white rounded-lg border p-3 mt-2",
        status === "normal"
          ? "border-green-100 bg-green-50/30"
          : status === "high"
          ? "border-amber-100 bg-amber-50/30"
          : "border-rose-100 bg-rose-50/30",
        className
      )}
    >
      <div className="flex items-start">
        {status === "normal" ? (
          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
        )}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-gray-700">{explanation.short}</p>
            {trend && (
              <div
                className={cn(
                  "mt-1 sm:mt-0 flex items-center text-xs gap-1",
                  trend.color
                )}
              >
                {trend.icon}
                <span>
                  {Math.abs(trend.percent).toFixed(1)}%{" "}
                  {trend.direction === "up"
                    ? "increase"
                    : trend.direction === "down"
                    ? "decrease"
                    : ""}
                </span>
                <SimpleTooltip
                  content={`Previous value: ${previousValue} ${unit}`}
                  side="top"
                >
                  <HelpCircle className="h-3 w-3 ml-0.5 cursor-help" />
                </SimpleTooltip>
              </div>
            )}
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2"
              >
                <div className="bg-white/60 rounded-md p-2 mb-3">
                  <div className="flex items-start mb-2">
                    <Lightbulb className="h-4 w-4 text-amber-500 mr-1.5 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{explanation.detail}</p>
                  </div>
                  {referenceRange && (
                    <div className="text-xs text-gray-500 mb-1">
                      Reference range: {referenceRange}
                    </div>
                  )}
                </div>

                {explanation.recommendations &&
                  explanation.recommendations.length > 0 && (
                    <div className="mt-2">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">
                        Recommendations:
                      </h5>
                      <ul className="text-sm text-gray-600 pl-5 list-disc space-y-1">
                        {explanation.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                <div className="mt-3 pt-2 border-t border-gray-200 space-y-2">
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setShowResources(!showResources)}
                    className="h-6 text-xs text-[#03659C] p-0 hover:bg-transparent hover:text-[#024e78] flex items-center"
                  >
                    {showResources ? (
                      <>
                        Hide resources <ChevronUp className="h-3 w-3 ml-1" />
                      </>
                    ) : (
                      <>
                        Show resources <ChevronDown className="h-3 w-3 ml-1" />
                      </>
                    )}
                  </Button>

                  {showResources && explanation.resources && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-2 space-y-1"
                    >
                      {explanation.resources.map((resource, i) => (
                        <a
                          key={i}
                          href={resource.url}
                          className="text-xs text-[#03659C] flex items-center hover:underline"
                          onClick={(e) => e.preventDefault()}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          {resource.title}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mt-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="h-6 text-xs text-[#03659C] px-0 hover:bg-transparent hover:text-[#024e78] flex items-center"
            >
              {expanded ? (
                <>
                  Show less <ChevronUp className="h-3 w-3 ml-1" />
                </>
              ) : (
                <>
                  Show more <ChevronDown className="h-3 w-3 ml-1" />
                </>
              )}
            </Button>

            <SimpleTooltip content="Track this metric" side="top">
              <Button
                variant="outline"
                size="sm"
                className="h-6 text-xs bg-white border-[#03659C]/20 text-[#03659C] hover:bg-[#E5F8FF] hover:text-[#03659C]"
              >
                <ActivityIcon className="h-3 w-3 mr-1" />
                Track
              </Button>
            </SimpleTooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple icon components to avoid importing entire libraries
const ActivityIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const HeartIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const CalendarIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);
