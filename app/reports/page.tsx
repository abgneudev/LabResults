"use client";

import { TopBar } from "@/components/top-bar";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { DocumentViewer } from "@/components/document-viewer";
import { FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Disclaimer banner positioned at top */}
      <DisclaimerBanner />

      {/* Header with required height */}
      <TopBar showBack={true} title="Lab Reports" className="h-14" />

      <div className="p-6 max-w-[640px] mx-auto">
        <div className="flex items-center mb-4">
          <div className="bg-[#E5F8FF] p-2 rounded-full mr-3">
            <FileText className="h-6 w-6 text-[#03659C]" />
          </div>
          <h1 className="text-2xl font-bold text-[#03659C]">
            Your Health Reports
          </h1>
        </div>

        <p className="text-gray-600 mb-6">
          View and manage all your lab reports and medical documents in one
          place.
        </p>

        {/* Document Viewer Component */}
        <DocumentViewer />
      </div>
    </div>
  );
}
