"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, TrendingUp } from "lucide-react";
import { usePatient } from "@/context/patient-context";
import { TopBar } from "@/components/top-bar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReferenceRangeChart } from "@/components/reference-range-chart";
import { HealthSummary } from "@/components/health-summary";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { PersonalizedTracking } from "@/components/personalized-tracking";
import { DocumentViewer } from "@/components/document-viewer";
import { MetricProfile } from "@/components/metric-profile";
import { VitalsDashboard } from "@/components/vitals-dashboard";

// Mock data for the chart
const chartData = [
  { date: "2023-01-15", value: 95 },
  { date: "2023-02-15", value: 102 },
  { date: "2023-03-15", value: 97 },
  { date: "2023-04-15", value: 95 },
];

export default function ResultsPage() {
  const { patientData, isLoading } = usePatient();
  const [refreshing, setRefreshing] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [activeTab, setActiveTab] = useState("timeline");
  const [showPersonalizedTracking, setShowPersonalizedTracking] =
    useState(false);

  // Handle pull-to-refresh
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd < -100 && window.scrollY === 0) {
      handleRefresh();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // Group metrics by profile
  const metricProfiles = {
    bloodHealth: patientData.metrics.filter((m) => m.category === "blood"),
    heartCholesterol: patientData.metrics.filter((m) => m.category === "heart"),
    vitamins: patientData.metrics.filter((m) => m.category === "vitamins"),
    organFunction: patientData.metrics.filter((m) => m.category === "urine"),
  };

  // Get the most recent test date
  const mostRecentTest = patientData.metrics.reduce(
    (latest, current) => {
      const currentDate = new Date(current.lastUpdated);
      return currentDate > latest.date
        ? { date: currentDate, type: current.name }
        : latest;
    },
    { date: new Date(0), type: "" }
  );

  // Calculate trend metrics
  const trendMetrics = {
    improving: 2,
    stable: 1,
    worsening: 1,
  };

  return (
    <div
      className="min-h-screen bg-[#FAFEFF]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <TopBar showBack={false} />
      <DisclaimerBanner />

      {refreshing && (
        <div className="flex justify-center py-4 text-[#03659C] animate-pulse">
          <TrendingUp className="mr-2 h-5 w-5" />
          <span>Refreshing your health data...</span>
        </div>
      )}

      <div className="p-5">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold mb-4 text-[#03659C]"
        >
          Your health at a glance, {patientData.name}
        </motion.h1>

        {/* Health Summary with progress ring */}
        <HealthSummary
          lastTestDate={mostRecentTest.date.toISOString()}
          testType={mostRecentTest.type}
          testCount={patientData.metrics.length}
          improvingMetrics={trendMetrics.improving}
          stableMetrics={trendMetrics.stable}
          worseningMetrics={trendMetrics.worsening}
          daysUntilNextTest={45}
        />

        <Tabs
          defaultValue="timeline"
          className="mb-6"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="timeline" className="text-[#03659C]">
              Timeline View
            </TabsTrigger>
            <TabsTrigger value="documents" className="text-[#03659C]">
              Document View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline">
            {/* Test Results Hero Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#E5F8FF] rounded-lg p-5 mb-6"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-medium text-[#03659C]">
                  Blood Glucose
                </h2>
                <span className="text-xs text-[#03659C] bg-white px-2 py-1 rounded-full">
                  Apr 15, 2023
                </span>
              </div>

              {isLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : (
                <div className="mb-4">
                  <ReferenceRangeChart
                    data={chartData}
                    status="balanced"
                    unit="mg/dL"
                    name="Blood Glucose"
                    ranges={[
                      {
                        min: 0,
                        max: 70,
                        label: "Low",
                        color: "rgba(239, 68, 68, 0.2)",
                      },
                      {
                        min: 70,
                        max: 99,
                        label: "Normal",
                        color: "rgba(20, 184, 166, 0.2)",
                      },
                      {
                        min: 99,
                        max: 125,
                        label: "Pre-diabetic",
                        color: "rgba(245, 158, 11, 0.2)",
                      },
                      {
                        min: 125,
                        max: 200,
                        label: "Diabetic",
                        color: "rgba(239, 68, 68, 0.2)",
                      },
                    ]}
                  />
                </div>
              )}

              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 text-[#03659C] border-[#03659C]/20 hover:bg-white/50 opacity-80"
              >
                View Full Report
              </Button>
            </motion.div>

            {/* Vitals & More Section - Using our new VitalsDashboard component */}
            <VitalsDashboard className="mb-6" />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentViewer />
          </TabsContent>
        </Tabs>
      </div>

      {/* Personalized Tracking Modal is now handled by VitalsDashboard */}
      {showPersonalizedTracking && (
        <PersonalizedTracking
          onClose={() => setShowPersonalizedTracking(false)}
        />
      )}
    </div>
  );
}
