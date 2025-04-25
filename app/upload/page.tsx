"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { TopBar } from "@/components/top-bar"
import { UploadCloud, FileText, Check, AlertCircle, FileType, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { usePatient } from "@/context/patient-context"
import { DisclaimerBanner } from "@/components/disclaimer-banner"

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const { toast } = useToast()
  const router = useRouter()
  const { addReport } = usePatient()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        })
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)

    try {
      // Mock API call to parse the PDF
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful parsing
      const mockParsedData = {
        id: Date.now().toString(),
        filename: file.name,
        uploadDate: new Date().toISOString(),
        metrics: [
          {
            id: "cholesterol",
            name: "Total Cholesterol",
            value: 185,
            unit: "mg/dL",
            status: "balanced",
            category: "blood",
            lastUpdated: new Date().toISOString(),
          },
        ],
      }

      addReport(mockParsedData)
      setUploadStatus("success")

      toast({
        title: "Upload successful",
        description: "Your lab results have been processed",
      })

      // Redirect to results page after a short delay
      setTimeout(() => {
        router.push("/results")
      }, 1500)
    } catch (error) {
      setUploadStatus("error")
      toast({
        title: "Upload failed",
        description: "There was an error processing your file",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="bg-[#FAFEFF] min-h-screen">
      <TopBar title="Upload Results" />
      <DisclaimerBanner />

      <div className="p-5">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold mb-3 text-[#03659C]"
        >
          Upload Lab Results
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#03659C]/80 mb-6"
        >
          Upload your lab results PDF to automatically extract and track your health metrics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#E5F8FF] p-4 rounded-lg mb-6"
        >
          <div className="flex items-center mb-2">
            <Info className="h-5 w-5 mr-2 text-[#03659C]" />
            <h3 className="font-medium text-[#03659C]">How it works</h3>
          </div>
          <ol className="list-decimal list-inside text-sm text-[#03659C]/80 space-y-2 ml-1">
            <li>Upload your lab results PDF</li>
            <li>Our system extracts key health metrics</li>
            <li>View your results in an easy-to-understand format</li>
            <li>Track changes over time and get personalized insights</li>
          </ol>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-md mx-auto"
        >
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              isDragging ? "border-[#03659C] bg-[#E5F8FF]" : "border-[#03659C]/30"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploadStatus === "idle" ? (
              <>
                <div className="mx-auto w-16 h-16 rounded-full bg-[#E5F8FF] flex items-center justify-center mb-4">
                  <UploadCloud className="h-8 w-8 text-[#03659C]" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-[#03659C]">Upload Lab Results</h3>
                <p className="text-sm text-[#03659C]/80 mb-4">Drag and drop your PDF file here, or click to select</p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="outline"
                    className="cursor-pointer bg-white border-[#03659C]/30 text-[#03659C] hover:bg-[#E5F8FF]"
                    disabled={isUploading}
                    type="button"
                  >
                    <FileType className="h-4 w-4 mr-2" />
                    Select PDF
                  </Button>
                </label>
              </>
            ) : uploadStatus === "success" ? (
              <div className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-[#03659C]">Upload Complete</h3>
                <p className="text-sm text-[#03659C]/80">Your lab results have been processed</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-[#03659C]">Upload Failed</h3>
                <p className="text-sm text-[#03659C]/80 mb-4">There was an error processing your file</p>
                <Button
                  variant="outline"
                  onClick={() => setUploadStatus("idle")}
                  type="button"
                  className="bg-white border-[#03659C]/30 text-[#03659C] hover:bg-[#E5F8FF]"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>

          {file && uploadStatus === "idle" && (
            <div className="mt-4">
              <div className="flex items-center p-4 bg-white rounded-lg border border-[#E5F8FF]">
                <FileText className="h-5 w-5 text-[#03659C] mr-3" />
                <span className="text-sm font-medium truncate flex-1 text-[#03659C]">{file.name}</span>
                <Button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="ml-2 bg-[#03659C] hover:bg-[#024e78]"
                  type="button"
                >
                  {isUploading ? "Processing..." : "Upload"}
                </Button>
              </div>
            </div>
          )}

          <div className="mt-6 text-xs text-center text-[#03659C] bg-[#E5F8FF] p-3 rounded-lg">
            <p>Our system will automatically extract key health metrics from your lab results.</p>
            <p className="mt-1">Always consult with your healthcare provider about your results.</p>
          </div>

          <div className="mt-6 bg-white p-4 rounded-lg border border-[#E5F8FF]">
            <h3 className="font-medium text-[#03659C] mb-2">Supported Lab Reports</h3>
            <p className="text-sm text-[#03659C]/80 mb-3">
              We currently support PDF lab reports from the following providers:
            </p>
            <ul className="text-sm text-[#03659C]/80 space-y-1 list-disc pl-5">
              <li>Quest Diagnostics</li>
              <li>LabCorp</li>
              <li>Mayo Clinic Laboratories</li>
              <li>Cleveland Clinic Labs</li>
              <li>Most hospital-based lab reports</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
