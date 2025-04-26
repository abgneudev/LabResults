"use client";

import { motion } from "framer-motion";
import { UploadCloud, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function UploadCard() {
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
            <UploadCloud className="h-5 w-5 text-[#1a73e8]" />
          </div>
          <h3 className="font-medium text-[#202124]">Upload Lab Results</h3>
        </div>
      </div>

      <p className="text-sm text-[#5f6368] mb-4">
        Upload your lab results to automatically extract and track your health
        metrics.
      </p>

      <div className="mb-3">
        <Link href="/upload" className="w-full block">
          <Button className="w-full bg-[#1a73e8] hover:bg-[#185abc] text-white">
            <UploadCloud className="h-4 w-4 mr-2" />
            Upload PDF
          </Button>
        </Link>
      </div>

      <div>
        <Link href="/results?view=list" className="w-full block">
          <Button
            variant="outline"
            className="w-full border-[#9aa0a6]/30 text-[#5f6368] hover:bg-[#f1f3f4]"
          >
            <FileText className="h-4 w-4 mr-2" />
            View Files
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
