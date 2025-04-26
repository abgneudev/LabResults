"use client";

import { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  ClipboardList,
  Clock,
  FileText,
  HospitalIcon,
  LineChart,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

type ResultStatus = "normal" | "follow-up" | "pending";

// Test type mapping to emojis
const testTypeEmojis = {
  "Complete Blood Panel": "🩸",
  "Lipid Panel": "💉",
  "Comprehensive Metabolic Panel": "🧪",
  "Thyroid Function": "🦋",
  "Vitamin D Panel": "☀️",
  default: "📋",
};

interface ResultCardProps {
  id: string;
  testName: string;
  status: ResultStatus;
  reason: string;
  dateTaken: string;
  labName: string;
  profiles: string[];
  abnormalValues?: string[];
  previousTest?: {
    date: string;
    changes?: Array<{
      name: string;
      trend: "up" | "down" | "stable";
    }>;
  };
  relatedTests?: string[];
}

interface ResultsSummaryProps {
  className?: string;
  newResults: ResultCardProps[];
  lastResults: ResultCardProps[];
  upcomingResults: ResultCardProps[];
}

export function ResultsSummary({
  className,
  newResults,
  lastResults,
  upcomingResults,
}: ResultsSummaryProps) {
  const [activeTab, setActiveTab] = useState("new");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Show only 3 most recent results in the "Last" tab
  const recentResults = lastResults.slice(0, 3);

  // Animation variants for tab content
  const tabContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  // Handle slider navigation
  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0
        ? activeTab === "new"
          ? newResults.length - 1
          : activeTab === "last"
          ? recentResults.length - 1
          : upcomingResults.length - 1
        : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) =>
      prev ===
      (activeTab === "new"
        ? newResults.length - 1
        : activeTab === "last"
        ? recentResults.length - 1
        : upcomingResults.length - 1)
        ? 0
        : prev + 1
    );
  };

  // Reset current slide when changing tabs
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeTab]);

  // Get current results based on active tab
  const getCurrentResults = () => {
    switch (activeTab) {
      case "new":
        return newResults;
      case "last":
        return recentResults;
      case "upcoming":
        return upcomingResults;
      default:
        return [];
    }
  };

  const currentResults = getCurrentResults();
  const hasResults = currentResults.length > 0;

  return (
    <div
      className={cn(
        "space-y-4 px-4 md:px-6 py-5 bg-[#E5F8FF] rounded-lg mb-6",
        className
      )}
    >
      {/* Section title with microscope emoji */}
      <h2 className="text-lg md:text-xl font-bold text-sky-900 flex items-center mb-3">
        <span className="mr-2.5" role="img" aria-label="microscope">
          🔬
        </span>
        Labs at a glance
      </h2>

      {/* Enhanced Tabs component with improved focus styling */}
      <Tabs
        defaultValue="new"
        className="w-full"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TabsList className="w-full grid grid-cols-3 gap-1 text-sm bg-white p-1 rounded-full border border-gray-100 shadow-sm">
          <TabsTrigger
            value="new"
            className={cn(
              "rounded-full px-3 py-1.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#03659C] focus:ring-offset-2",
              activeTab === "new"
                ? "bg-[#03659C] text-white font-medium ring-2 ring-[#03659C] ring-offset-2"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <span role="img" aria-label="new" className="mr-1.5 text-xs">
              🆕
            </span>
            New ({newResults.length})
          </TabsTrigger>

          <TabsTrigger
            value="upcoming"
            className={cn(
              "rounded-full px-3 py-1.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#03659C] focus:ring-offset-2",
              activeTab === "upcoming"
                ? "bg-[#03659C] text-white font-medium ring-2 ring-[#03659C] ring-offset-2"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <span role="img" aria-label="upcoming" className="mr-1.5 text-xs">
              🔜
            </span>
            Upcoming ({upcomingResults.length})
          </TabsTrigger>

          <TabsTrigger
            value="last"
            className={cn(
              "rounded-full px-3 py-1.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#03659C] focus:ring-offset-2",
              activeTab === "last"
                ? "bg-blue-500 text-white font-medium ring-2 ring-blue-500 ring-offset-2"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <span role="img" aria-label="previous" className="mr-1.5 text-xs">
              📜
            </span>
            Past ({lastResults.length})
          </TabsTrigger>
        </TabsList>

        {/* Tab panels with animations */}
        <AnimatePresence mode="wait">
          {activeTab === "new" && (
            <TabsContent value="new" className="mt-1">
              <motion.div
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {hasResults ? (
                  <div className="relative">
                    <ResultCard
                      {...newResults[currentSlide]}
                      index={currentSlide + 1}
                      total={newResults.length}
                    />

                    {/* Slider navigation with page indicator */}
                    <div className="flex justify-between items-center mt-4 mb-4">
                      <div className="w-24"></div> {/* Spacer */}
                      <div className="flex gap-3">
                        {newResults.map((_, index) => (
                          <button
                            key={index}
                            className={cn(
                              "w-2.5 h-2.5 rounded-full transition-all",
                              index === currentSlide
                                ? "bg-blue-500"
                                : "bg-gray-300"
                            )}
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                      <div className="w-24 text-right"></div>
                    </div>

                    {/* Full-width CTA */}
                    <Link
                      href="/reports"
                      className="block w-full text-center py-3.5 px-4 bg-[#03659C] text-white rounded-md font-medium mt-3 text-sm flex items-center justify-center"
                    >
                      View all reports
                      <ChevronRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </div>
                ) : (
                  <EmptyStateCard />
                )}
              </motion.div>
            </TabsContent>
          )}

          {activeTab === "last" && (
            <TabsContent value="last" className="mt-1">
              <motion.div
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {recentResults.length > 0 ? (
                  <div className="relative">
                    <ResultCard
                      {...recentResults[currentSlide]}
                      index={currentSlide + 1}
                      total={recentResults.length}
                    />

                    {/* Slider navigation and view all link */}
                    <div className="flex justify-center items-center mt-4 mb-4">
                      <div className="flex gap-3">
                        {recentResults.map((_, index) => (
                          <button
                            key={index}
                            className={cn(
                              "w-2.5 h-2.5 rounded-full transition-all",
                              index === currentSlide
                                ? "bg-blue-500"
                                : "bg-gray-300"
                            )}
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>

                      {lastResults.length > 3 && (
                        <Link
                          href="/results"
                          className="text-xs text-blue-600 hover:underline flex items-center ml-4"
                        >
                          View all <ChevronRight className="h-3 w-3 ml-1" />
                        </Link>
                      )}
                    </div>
                  </div>
                ) : (
                  <EmptyStateCard />
                )}
              </motion.div>
            </TabsContent>
          )}

          {activeTab === "upcoming" && (
            <TabsContent value="upcoming" className="mt-1">
              <motion.div
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {upcomingResults.length > 0 ? (
                  <div className="relative">
                    <ResultCard
                      {...upcomingResults[currentSlide]}
                      index={currentSlide + 1}
                      total={upcomingResults.length}
                    />

                    {/* Slider navigation */}
                    <div className="flex justify-center items-center mt-4 mb-4">
                      <div className="flex gap-3">
                        {upcomingResults.map((_, index) => (
                          <button
                            key={index}
                            className={cn(
                              "w-2.5 h-2.5 rounded-full transition-all",
                              index === currentSlide
                                ? "bg-blue-500"
                                : "bg-gray-300"
                            )}
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <EmptyStateCard />
                )}
              </motion.div>
            </TabsContent>
          )}
        </AnimatePresence>
      </Tabs>
    </div>
  );
}

function ResultCard({
  testName,
  status,
  reason,
  dateTaken,
  labName,
  profiles,
  abnormalValues = [],
  index,
  total,
}: ResultCardProps & { index?: number; total?: number }) {
  const testEmoji = testTypeEmojis[testName] || testTypeEmojis.default;

  // Get status style to match VitalsDashboard component
  const getStatusDetails = () => {
    switch (status) {
      case "normal":
        return {
          label: "Balanced",
          emoji: "😊",
          className: "bg-emerald-600 text-white",
        };
      case "follow-up":
        return {
          label: "Review",
          emoji: "🔍",
          className: "bg-white text-red-600 border border-red-600",
        };
      case "pending":
        return {
          label: "Manage",
          emoji: "🍎",
          className: "bg-amber-100 text-amber-700",
        };
      default:
        return {
          label: "Unknown",
          emoji: "",
          className: "bg-gray-100 text-gray-700",
        };
    }
  };

  const statusDetails = getStatusDetails();

  return (
    <motion.div
      className="bg-white rounded-xl p-5 transition-all duration-200 shadow-sm"
      whileHover={{ y: -2 }}
      layout
    >
      {/* Slider index indicator (if in slider mode) */}
      {index && total && total > 1 && (
        <div className="absolute top-3 right-3 bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-0.5 font-medium">
          {index}/{total}
        </div>
      )}

      {/* Section 1: Main header with test name and emoji */}
      <div className="flex items-center mb-6">
        <div className="mr-3 text-2xl" role="img" aria-label={testName}>
          {testEmoji}
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-slate-800">{testName}</h3>
        </div>
        <div
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium flex items-center h-6",
            statusDetails.className
          )}
        >
          <span className="mr-1.5">{statusDetails.emoji}</span>
          {statusDetails.label}
        </div>
      </div>

      {/* Section 2: Metadata section - simplified to 2x2 grid with clearer hierarchy */}
      <div className="grid grid-cols-2 gap-y-3 mb-4 pb-4 border-b border-gray-100">
        <div className="flex items-center">
          <Search className="h-3.5 w-3.5 mr-2 text-gray-400 flex-shrink-0" />
          <span className="text-xs text-gray-500">Reason:</span>
          <span className="text-xs text-gray-700 font-medium ml-1">
            {reason}
          </span>
        </div>

        <div className="flex items-center">
          <Calendar className="h-3.5 w-3.5 mr-2 text-gray-400 flex-shrink-0" />
          <span className="text-xs text-gray-500">Date:</span>
          <span className="text-xs text-gray-700 font-medium ml-1">
            {dateTaken}
          </span>
        </div>

        <div className="flex items-center">
          <HospitalIcon className="h-3.5 w-3.5 mr-2 text-gray-400 flex-shrink-0" />
          <span className="text-xs text-gray-500">Lab:</span>
          <span className="text-xs text-gray-700 font-medium ml-1">
            {labName}
          </span>
        </div>

        <div className="flex items-center">
          <ClipboardList className="h-3.5 w-3.5 mr-2 text-gray-400 flex-shrink-0" />
          <span className="text-xs text-gray-500">Profiles:</span>
          <span className="text-xs text-gray-700 font-medium ml-1">
            {profiles?.length || 0}
          </span>
        </div>
      </div>

      {/* Section 3: Abnormal values section with improved styling */}
      {abnormalValues.length > 0 && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700 font-medium text-xs mb-3">
            Abnormal values:
          </p>
          <ul className="space-y-2.5">
            {abnormalValues.map((value, i) => (
              <li key={i} className="text-red-600 text-xs flex items-start">
                <span className="text-red-500 mr-2">•</span>
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

function EmptyStateCard() {
  return (
    <motion.div
      className="bg-[#F0F9FF] text-slate-600 rounded-lg p-6 text-center shadow-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-center mb-4">
        <Calendar className="h-10 w-10 text-blue-300" />
      </div>

      <p className="text-sm mb-5 font-normal">
        No pending test results. Re-testing may be due in 3–6 months.
      </p>

      <Button
        variant="outline"
        size="sm"
        className="border-blue-200 text-blue-600 hover:bg-blue-50 font-medium px-4 py-2"
      >
        Schedule a test
      </Button>
    </motion.div>
  );
}
