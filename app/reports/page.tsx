"use client";

import { TopBar } from "@/components/top-bar";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { DocumentViewer } from "@/components/document-viewer";

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Disclaimer banner positioned at top */}
      <DisclaimerBanner />

      {/* Header with required height */}
      <TopBar showBack={true} title="Lab Reports" className="h-14" />

      <div className="p-6 max-w-[640px] mx-auto">
        {/* Document Viewer Component */}
        <DocumentViewer />
      </div>
    </div>
  );
}
