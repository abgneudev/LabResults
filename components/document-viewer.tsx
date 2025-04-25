"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  FileText,
  Beaker,
  Heart,
  Activity,
  Calendar,
  User,
  MapPin,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SmartFilter } from "@/components/smart-filter"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock data for document viewer
const mockReports = [
  {
    id: "file1",
    title: "Complete Blood Panel",
    date: "2023-04-15",
    location: "Quest Diagnostics",
    doctor: "Johnson",
    metrics: 12,
    status: "mixed", // mixed, normal, review
    type: "blood",
    patientId: "12345678",
    insurance: "Blue Cross",
    technician: "Sarah Johnson",
    results: [
      { name: "White Blood Cell Count", value: "7.8", unit: "K/uL", status: "normal", reference: "4.5-11.0" },
      { name: "Red Blood Cell Count", value: "5.2", unit: "M/uL", status: "normal", reference: "4.5-5.9" },
      { name: "Hemoglobin", value: "14.2", unit: "g/dL", status: "normal", reference: "13.5-17.5" },
      { name: "Hematocrit", value: "42", unit: "%", status: "normal", reference: "41-50" },
      { name: "Platelet Count", value: "290", unit: "K/uL", status: "normal", reference: "150-450" },
      { name: "Glucose", value: "105", unit: "mg/dL", status: "high", reference: "70-99" },
    ],
  },
  {
    id: "file2",
    title: "Lipid Panel",
    date: "2023-03-10",
    location: "LabCorp",
    doctor: "Smith",
    metrics: 8,
    status: "review",
    type: "heart",
    patientId: "12345678",
    insurance: "Blue Cross",
    technician: "Michael Brown",
    results: [
      { name: "Total Cholesterol", value: "210", unit: "mg/dL", status: "high", reference: "<200" },
      { name: "HDL Cholesterol", value: "45", unit: "mg/dL", status: "normal", reference: ">40" },
      { name: "LDL Cholesterol", value: "142", unit: "mg/dL", status: "high", reference: "<100" },
      { name: "Triglycerides", value: "150", unit: "mg/dL", status: "normal", reference: "<150" },
    ],
  },
  {
    id: "file3",
    title: "Vitamin Panel",
    date: "2023-02-05",
    location: "Memorial Hospital",
    doctor: "Williams",
    metrics: 6,
    status: "normal",
    type: "vitamin",
    patientId: "12345678",
    insurance: "Blue Cross",
    technician: "Jennifer Davis",
    results: [
      { name: "Vitamin D, 25-OH", value: "32", unit: "ng/mL", status: "normal", reference: "30-100" },
      { name: "Vitamin B12", value: "550", unit: "pg/mL", status: "normal", reference: "200-900" },
      { name: "Folate", value: "15", unit: "ng/mL", status: "normal", reference: ">5.9" },
    ],
  },
  {
    id: "file4",
    title: "Thyroid Function",
    date: "2023-01-20",
    location: "Quest Diagnostics",
    doctor: "Johnson",
    metrics: 5,
    status: "mixed",
    type: "organ",
    patientId: "12345678",
    insurance: "Blue Cross",
    technician: "Robert Wilson",
    results: [
      { name: "TSH", value: "3.8", unit: "uIU/mL", status: "normal", reference: "0.4-4.0" },
      { name: "Free T4", value: "0.9", unit: "ng/dL", status: "low", reference: "0.8-1.8" },
      { name: "Free T3", value: "3.1", unit: "pg/mL", status: "normal", reference: "2.3-4.2" },
    ],
  },
  {
    id: "file5",
    title: "Comprehensive Metabolic Panel",
    date: "2022-12-15",
    location: "LabCorp",
    doctor: "Davis",
    metrics: 14,
    status: "normal",
    type: "blood",
    patientId: "12345678",
    insurance: "Blue Cross",
    technician: "Emily Thompson",
    results: [
      { name: "Sodium", value: "140", unit: "mmol/L", status: "normal", reference: "135-145" },
      { name: "Potassium", value: "4.2", unit: "mmol/L", status: "normal", reference: "3.5-5.0" },
      { name: "Chloride", value: "102", unit: "mmol/L", status: "normal", reference: "98-107" },
      { name: "CO2", value: "24", unit: "mmol/L", status: "normal", reference: "20-29" },
      { name: "Calcium", value: "9.5", unit: "mg/dL", status: "normal", reference: "8.5-10.5" },
      { name: "Glucose", value: "95", unit: "mg/dL", status: "normal", reference: "70-99" },
      { name: "BUN", value: "15", unit: "mg/dL", status: "normal", reference: "7-20" },
      { name: "Creatinine", value: "0.9", unit: "mg/dL", status: "normal", reference: "0.6-1.2" },
    ],
  },
]

export function DocumentViewer() {
  const [activeReport, setActiveReport] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({ sortOrder: "newest", showProgress: false, filter: "recent-abnormal" })

  const handleReportClick = (id: string) => {
    setActiveReport(activeReport === id ? null : id)
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters })
  }

  // Get icon based on report type
  const getReportIcon = (type: string) => {
    switch (type) {
      case "blood":
        return <Beaker className="h-5 w-5 text-[#03659C]" />
      case "heart":
        return <Heart className="h-5 w-5 text-[#03659C]" />
      case "vitamin":
        return <Activity className="h-5 w-5 text-[#03659C]" />
      case "organ":
        return <Activity className="h-5 w-5 text-[#03659C]" />
      default:
        return <FileText className="h-5 w-5 text-[#03659C]" />
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <CheckCircle className="h-4 w-4 text-teal-500" />
      case "mixed":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "review":
        return <AlertCircle className="h-4 w-4 text-rose-500" />
      default:
        return null
    }
  }

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "normal":
        return "All normal"
      case "mixed":
        return "Mixed results"
      case "review":
        return "Needs review"
      default:
        return ""
    }
  }

  // Filter and sort reports
  let filteredReports = [...mockReports]

  // Apply search filter
  if (searchQuery) {
    filteredReports = filteredReports.filter(
      (report) =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  // Apply smart filter
  if (filters.filter === "recent-abnormal") {
    filteredReports = filteredReports.filter((report) => report.status !== "normal")
  } else if (filters.filter === "all-normal") {
    filteredReports = filteredReports.filter((report) => report.status === "normal")
  }

  // Apply sort order
  filteredReports.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return filters.sortOrder === "newest" ? dateB - dateA : dateA - dateB
  })

  return (
    <div className="bg-white rounded-lg border border-[#E5F8FF] overflow-hidden">
      <div className="p-4 border-b border-[#E5F8FF]">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#03659C]/60 h-4 w-4" />
          <Input
            placeholder="Search lab reports"
            className="pl-9 bg-[#FAFEFF] border-[#E5F8FF] text-[#03659C] placeholder:text-[#03659C]/60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center">
          <SmartFilter onFilterChange={handleFilterChange} />

          <div className="text-xs text-[#03659C]/70">
            {filteredReports.length} {filteredReports.length === 1 ? "report" : "reports"}
          </div>
        </div>
      </div>

      <div className="max-h-[600px] overflow-y-auto">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div key={report.id} className="border-b border-[#E5F8FF]">
              <button
                onClick={() => handleReportClick(report.id)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-[#FAFEFF] transition-colors"
              >
                <div className="flex items-center">
                  <div className="bg-[#E5F8FF] p-2 rounded-full mr-3">{getReportIcon(report.type)}</div>
                  <div>
                    <h3 className="font-medium text-[#03659C]">{report.title}</h3>
                    <div className="flex items-center text-xs text-[#03659C]/70 mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{format(new Date(report.date), "MMM d, yyyy")}</span>
                      <span className="mx-1">•</span>
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{report.location}</span>
                      <span className="mx-1">•</span>
                      <User className="h-3 w-3 mr-1" />
                      <span>Dr. {report.doctor}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center bg-[#FAFEFF] px-2 py-1 rounded-full text-xs mr-3">
                    {getStatusIcon(report.status)}
                    <span className="ml-1">{getStatusText(report.status)}</span>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {activeReport === report.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4"
                  >
                    {/* Report header */}
                    <div className="bg-[#FAFEFF] p-3 rounded-lg mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-[#03659C]">Patient ID: {report.patientId}</span>
                        <span className="text-xs bg-[#E5F8FF] px-2 py-0.5 rounded-full text-[#03659C]">
                          Insurance: {report.insurance}
                        </span>
                      </div>
                      <div className="text-xs text-[#03659C]/70">
                        <p>Technician: {report.technician}</p>
                        <p>Ordered by: Dr. {report.doctor}</p>
                        <p>Collection time: {format(new Date(report.date), "h:mm a")}</p>
                      </div>
                    </div>

                    {/* Educational header */}
                    <div className="bg-[#E5F8FF] p-3 rounded-lg mb-3 text-xs text-[#03659C]">
                      <p className="font-medium">Understanding your results:</p>
                      <p>
                        Results outside the reference range may need attention. Discuss with your healthcare provider.
                      </p>
                    </div>

                    {/* Results table */}
                    <div className="bg-white rounded-lg border border-[#E5F8FF] overflow-hidden">
                      <div className="grid grid-cols-12 gap-2 p-3 border-b border-[#E5F8FF] bg-[#FAFEFF] text-xs font-medium text-[#03659C]">
                        <div className="col-span-5">Test</div>
                        <div className="col-span-2 text-right">Result</div>
                        <div className="col-span-3 text-right">Reference Range</div>
                        <div className="col-span-2 text-right">Status</div>
                      </div>

                      {report.results.map((result, index) => (
                        <div
                          key={index}
                          className={cn(
                            "grid grid-cols-12 gap-2 p-3 text-xs text-[#03659C]",
                            index % 2 === 0 ? "bg-white" : "bg-[#FAFEFF]",
                            result.status !== "normal" && "bg-amber-50/50",
                          )}
                        >
                          <div className="col-span-5 font-medium">{result.name}</div>
                          <div className="col-span-2 text-right font-medium">
                            {result.value} <span className="font-normal">{result.unit}</span>
                          </div>
                          <div className="col-span-3 text-right text-[#03659C]/70">{result.reference}</div>
                          <div className="col-span-2 text-right">
                            {result.status === "normal" ? (
                              <span className="text-teal-500 flex items-center justify-end">
                                <CheckCircle className="h-3 w-3 mr-1" /> Normal
                              </span>
                            ) : result.status === "high" ? (
                              <span className="text-amber-500 flex items-center justify-end">
                                <AlertTriangle className="h-3 w-3 mr-1" /> High
                              </span>
                            ) : (
                              <span className="text-rose-500 flex items-center justify-end">
                                <AlertCircle className="h-3 w-3 mr-1" /> Low
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end mt-3 space-x-2">
                      <Button variant="outline" size="sm" className="text-[#03659C] border-[#03659C]/20">
                        <FileText className="h-4 w-4 mr-1" />
                        View Original PDF
                      </Button>
                      <Button size="sm" className="bg-[#03659C]">
                        <Activity className="h-4 w-4 mr-1" />
                        Track Metrics
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-[#03659C]/70">
            <FileText className="h-12 w-12 mx-auto mb-2 text-[#03659C]/40" />
            <p className="font-medium text-[#03659C]">No lab reports found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
