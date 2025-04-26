"use client";

import { format } from "date-fns";
import { FreshnessRing } from "./freshness-ring";
import { SummaryCard } from "./summary-card";
import { UploadLabsCta } from "./upload-labs-cta";
import Link from "next/link";
import {
  Droplet,
  Heart,
  Sun,
  Activity,
  ActivitySquare,
  ClipboardCheck,
} from "lucide-react";

interface HeroSectionProps {
  firstName: string;
  lastTest: {
    type: string;
    date: Date;
  };
  daysSinceLastTest: number;
  metrics: {
    total: number;
    improving: number;
    stable: number;
    worsening: number;
  };
  onViewTrend?: () => void;
}

export function HeroSection({
  firstName,
  lastTest,
  daysSinceLastTest,
  metrics,
  onViewTrend,
}: HeroSectionProps) {
  // Format the date (Apr 14 2023)
  const formattedDate = format(lastTest.date, "MMM dd yyyy");

  return (
    <div className="p-6 max-w-[640px] mx-auto flex flex-col gap-4">
      {/* Hero Block */}
      <div>
        <p className="text-lg font-medium mb-1">Hello, {firstName} 👋</p>
        <h1 className="text-2xl font-bold text-[#03659C] mb-4">
          Your labs at a glance
        </h1>
      </div>

      {/* Lab Test Booking Options */}
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

      {/* Upload Labs CTA - replacing the old button */}
      <UploadLabsCta />
    </div>
  );
}
