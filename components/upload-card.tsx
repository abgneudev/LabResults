"use client"

import { motion } from "framer-motion"
import { UploadCloud, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function UploadCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-[#E5F8FF] rounded-lg p-5 mb-6"
    >
      <div className="flex items-center mb-3">
        <div className="bg-white p-2 rounded-full mr-3">
          <UploadCloud className="h-5 w-5 text-[#03659C]" />
        </div>
        <h3 className="font-medium text-[#03659C]">Upload Lab Results</h3>
      </div>

      <p className="text-sm text-[#03659C]/80 mb-4">
        Upload your lab results PDF to automatically extract and track your health metrics.
      </p>

      <div className="flex space-x-2">
        <Link href="/upload" className="flex-1">
          <Button className="w-full bg-[#03659C] hover:bg-[#024e78]">
            <UploadCloud className="h-4 w-4 mr-2" />
            Upload PDF
          </Button>
        </Link>
        <Link href="/results?view=list" className="flex-1">
          <Button variant="outline" className="w-full border-[#03659C]/20 text-[#03659C] hover:bg-white/50">
            <FileText className="h-4 w-4 mr-2" />
            View Files
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}
