"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Droplet,
  Heart,
  Sun,
  Activity,
  ActivitySquare,
  ClipboardCheck,
} from "lucide-react";
import Link from "next/link";
import { usePatient } from "@/context/patient-context";
import { TopBar } from "@/components/top-bar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { PersonalizedTracking } from "@/components/personalized-tracking";
import { HeroSection } from "@/components/hero-section";
import { ResultsSummary } from "@/components/results-summary";

// Mock data for the chart
const chartData = [
  { date: "2023-01-15", value: 95 },
  { date: "2023-02-15", value: 102 },
  { date: "2023-03-15", value: 97 },
  { date: "2023-04-15", value: 95 },
];

// Mock data for ResultsSummary
const mockNewResults = [
  {
    id: "new-1",
    testName: "Complete Blood Panel",
    status: "follow-up",
    reason: "Annual checkup",
    dateTaken: "Apr 18, 2025",
    labName: "Quest Diagnostics",
    profiles: ["Red blood cells", "White blood cells", "Platelets"],
    abnormalValues: [
      "White blood cell count: 12.3 K/uL (High)",
      "Hemoglobin: 11.2 g/dL (Low)",
    ],
    previousTest: {
      date: "Oct 12, 2024",
      changes: [
        { name: "WBC Count", trend: "up" },
        { name: "RBC Count", trend: "stable" },
        { name: "Hemoglobin", trend: "down" },
      ],
    },
    relatedTests: ["Hemoglobin A1C", "Iron Studies"],
  },
  {
    id: "new-2",
    testName: "Lipid Panel",
    status: "normal",
    reason: "Cholesterol monitoring",
    dateTaken: "Apr 15, 2025",
    labName: "LabCorp",
    profiles: ["LDL", "HDL", "Total Cholesterol", "Triglycerides"],
    previousTest: {
      date: "Jan 5, 2025",
      changes: [
        { name: "LDL Cholesterol", trend: "down" },
        { name: "HDL Cholesterol", trend: "up" },
        { name: "Triglycerides", trend: "down" },
      ],
    },
  },
];

const mockLastResults = [
  {
    id: "last-1",
    testName: "Comprehensive Metabolic Panel",
    status: "normal",
    reason: "Routine screening",
    dateTaken: "Jan 10, 2025",
    labName: "Memorial Hospital",
    profiles: ["Glucose", "Electrolytes", "Kidney function", "Liver function"],
    relatedTests: ["Vitamin D", "Calcium"],
  },
  {
    id: "last-2",
    testName: "Thyroid Function",
    status: "follow-up",
    reason: "Follow-up monitoring",
    dateTaken: "Dec 5, 2024",
    labName: "Quest Diagnostics",
    profiles: ["TSH", "Free T4", "Free T3"],
    abnormalValues: ["TSH: 5.8 uIU/mL (High)"],
    previousTest: {
      date: "Jun 15, 2024",
      changes: [
        { name: "TSH", trend: "up" },
        { name: "Free T4", trend: "stable" },
      ],
    },
  },
];

const mockUpcomingResults = [
  {
    id: "upcoming-1",
    testName: "Vitamin D Panel",
    status: "pending",
    reason: "Deficiency check",
    dateTaken: "Scheduled for May 10, 2025",
    labName: "Quest Diagnostics",
    profiles: ["25-OH Vitamin D"],
    relatedTests: ["Calcium", "Phosphorus"],
  },
];

export default function ResultsPage() {
  const { patientData, isLoading } = usePatient();
  const [refreshing, setRefreshing] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
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

  // Calculate days since last test (for our freshness ring)
  const today = new Date();
  const daysSinceLastTest = Math.floor(
    (today.getTime() - mostRecentTest.date.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate trend metrics
  const trendMetrics = {
    improving: 2,
    stable: 1,
    worsening: 1,
  };

  // Handle view trend button click
  const handleViewTrend = () => {
    // In a real app, this would navigate to a trend view or open a modal
    console.log("View trend clicked");
  };

  return (
    <div
      className="min-h-screen bg-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Disclaimer banner positioned at top */}
      <DisclaimerBanner />

      {/* Header with required height */}
      <TopBar showBack={false} className="h-14" />

      {refreshing && (
        <div className="flex justify-center py-4 text-[#03659C] animate-pulse">
          <TrendingUp className="mr-2 h-5 w-5" />
          <span>Refreshing your health data...</span>
        </div>
      )}

      {/* Hero Section - greeting and title only */}
      <div className="p-6 max-w-[640px] mx-auto">
        <p className="text-lg font-medium mb-1">
          Hello, {patientData.name.split(" ")[0]} 👋
        </p>
        <div className="flex flex-col space-y-1 mt-2">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-[#03659C]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="text-sm text-[#03659C]">Patient ID:</span>
            <span className="text-sm ml-1">A6294</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-[#03659C]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="16" rx="2"></rect>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <span className="text-sm text-[#03659C]">Insurance provider:</span>
            <span className="text-sm ml-1">BlueCross BlueShield</span>
          </div>
        </div>
      </div>

      {/* Results Summary Section - right after the title */}
      <ResultsSummary
        newResults={mockNewResults}
        lastResults={mockLastResults}
        upcomingResults={mockUpcomingResults}
        className="max-w-[640px] mx-auto -mt-2"
      />

      {/* Lab Test Booking Options and Other Hero Components */}
      <div className="p-6 pt-0 max-w-[640px] mx-auto">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-[#03659C] mb-3">
            Book a Lab Test
          </h2>

          <div className="grid grid-cols-3 gap-4 mb-3">
            {/* First Row */}
            <div className="flex flex-col items-center">
              <Link
                href="/book-test?type=blood-panel"
                className="w-16 h-16 rounded-full bg-[#E5F8FF] hover:bg-[#D5F0FF] transition-colors flex items-center justify-center mb-2 border border-[#03659C]/10"
              >
                <Droplet className="h-7 w-7 text-[#03659C]" />
              </Link>
              <span className="text-xs text-[#03659C]/80 text-center">
                Blood Panel
              </span>
            </div>

            <div className="flex flex-col items-center">
              <Link
                href="/book-test?type=cholesterol"
                className="w-16 h-16 rounded-full bg-[#E5F8FF] hover:bg-[#D5F0FF] transition-colors flex items-center justify-center mb-2 border border-[#03659C]/10"
              >
                <Heart className="h-7 w-7 text-[#03659C]" />
              </Link>
              <span className="text-xs text-[#03659C]/80 text-center">
                Cholesterol
              </span>
            </div>

            <div className="flex flex-col items-center">
              <Link
                href="/book-test?type=vitamin-panel"
                className="w-16 h-16 rounded-full bg-[#E5F8FF] hover:bg-[#D5F0FF] transition-colors flex items-center justify-center mb-2 border border-[#03659C]/10"
              >
                <Sun className="h-7 w-7 text-[#03659C]" />
              </Link>
              <span className="text-xs text-[#03659C]/80 text-center">
                Vitamin Panel
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Second Row */}
            <div className="flex flex-col items-center">
              <Link
                href="/book-test?type=thyroid"
                className="w-16 h-16 rounded-full bg-[#E5F8FF] hover:bg-[#D5F0FF] transition-colors flex items-center justify-center mb-2 border border-[#03659C]/10"
              >
                <Activity className="h-7 w-7 text-[#03659C]" />
              </Link>
              <span className="text-xs text-[#03659C]/80 text-center">
                Thyroid
              </span>
            </div>

            <div className="flex flex-col items-center">
              <Link
                href="/book-test?type=diabetes"
                className="w-16 h-16 rounded-full bg-[#E5F8FF] hover:bg-[#D5F0FF] transition-colors flex items-center justify-center mb-2 border border-[#03659C]/10"
              >
                <ActivitySquare className="h-7 w-7 text-[#03659C]" />
              </Link>
              <span className="text-xs text-[#03659C]/80 text-center">
                Diabetes
              </span>
            </div>

            <div className="flex flex-col items-center">
              <Link
                href="/book-test?type=comprehensive"
                className="w-16 h-16 rounded-full bg-[#E5F8FF] hover:bg-[#D5F0FF] transition-colors flex items-center justify-center mb-2 border border-[#03659C]/10"
              >
                <ClipboardCheck className="h-7 w-7 text-[#03659C]" />
              </Link>
              <span className="text-xs text-[#03659C]/80 text-center">
                Comprehensive
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Tracking Modal */}
      {showPersonalizedTracking && (
        <PersonalizedTracking
          onClose={() => setShowPersonalizedTracking(false)}
        />
      )}
    </div>
  );
}
