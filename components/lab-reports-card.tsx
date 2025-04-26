"use client";

import { motion } from "framer-motion";
import { FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LabReportsCardProps {
  reportCount: number;
}

export function LabReportsCard({ reportCount }: LabReportsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm p-5 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-[#e8f0fe] p-2 rounded-full mr-3">
            <FileText className="h-5 w-5 text-[#1a73e8]" />
          </div>
          <h3 className="font-medium text-[#202124]">Lab Reports</h3>
        </div>
        <span className="text-xs bg-[#f1f3f4] px-3 py-1 rounded-full text-[#5f6368] font-medium">
          {reportCount} results
        </span>
      </div>

      <p className="text-sm text-[#5f6368] mb-4">
        View your original lab reports in PDF format or browse all your test
        results.
      </p>

      <div className="flex space-x-3">
        <Button className="flex-1 bg-[#1a73e8] hover:bg-[#185abc] text-white">
          <FileText className="h-4 w-4 mr-2" />
          View PDFs
        </Button>
        <Link href="/results?view=list" className="flex-1">
          <Button
            variant="outline"
            className="w-full border-[#9aa0a6]/30 text-[#5f6368] hover:bg-[#f1f3f4] flex items-center justify-center"
          >
            Browse All Results
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
