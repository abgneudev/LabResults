"use client";

import Link from "next/link";
import {
  Upload,
  FileText,
  Sparkles,
  ActivitySquare,
  ArrowRight,
} from "lucide-react";

export function UploadLabsCta() {
  return (
    <section className="w-full mb-6">
      <div className="rounded-xl bg-white shadow-sm p-5 border border-gray-200 text-center">
        {/* Short text explanation above icons */}
        <p className="text-sm text-[#5f6368] mb-4">
          Extract key health data and receive easy-to-understand explaination of
          what it means.
        </p>

        {/* Visual Icon Flow - with modern styling */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="flex flex-col items-center">
            <FileText
              className="h-6 w-6 text-[#1a73e8] mb-2"
              aria-hidden="true"
            />
            <span className="text-xs text-[#5f6368] font-medium">
              Documents
            </span>
          </div>
          <ArrowRight
            className="h-4 w-4 text-[#9aa0a6] mt-[-8px]"
            aria-hidden="true"
          />
          <div className="flex flex-col items-center">
            <Sparkles
              className="h-6 w-6 text-[#fbbc04] mb-2"
              aria-hidden="true"
            />
            <span className="text-xs text-[#5f6368] font-medium">Analysis</span>
          </div>
          <ArrowRight
            className="h-4 w-4 text-[#9aa0a6] mt-[-8px]"
            aria-hidden="true"
          />
          <div className="flex flex-col items-center">
            <ActivitySquare
              className="h-6 w-6 text-[#34a853] mb-2"
              aria-hidden="true"
            />
            <span className="text-xs text-[#5f6368] font-medium">Insights</span>
          </div>
        </div>

        {/* Button - Only the Upload PDF button */}
        <Link
          href="/upload"
          className="w-full bg-[#1a73e8] text-white font-medium h-12 px-4 rounded-lg leading-none
            flex items-center justify-center hover:bg-[#185abc] transition-colors"
        >
          <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
          Upload Lab Report
        </Link>
      </div>
    </section>
  );
}
