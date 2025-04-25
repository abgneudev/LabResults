"use client"

import { motion } from "framer-motion"
import { FileText, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface LabReportsCardProps {
  reportCount: number
}

export function LabReportsCard({ reportCount }: LabReportsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-lg p-4 mb-6 border border-[#E5F8FF]"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-[#03659C]" />
          <h3 className="font-medium text-[#03659C]">Lab Reports</h3>
        </div>
        <span className="text-xs text-[#03659C]/70 bg-[#FAFEFF] px-2 py-1 rounded-full">{reportCount} results</span>
      </div>
      <p className="text-sm text-[#03659C]/80 mb-3">
        View your original lab reports in PDF format or browse all your test results.
      </p>
      <div className="flex space-x-2">
        <Button className="flex-1 bg-[#03659C] hover:bg-[#024e78]">
          <FileText className="h-4 w-4 mr-2" />
          View PDFs
        </Button>
        <Link href="/results?view=list" className="flex-1">
          <Button variant="outline" className="w-full border-[#03659C]/20 text-[#03659C] hover:bg-[#E5F8FF]">
            Browse All Results
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}
