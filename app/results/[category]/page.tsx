"use client"

import Link from "next/link"

import { useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { MessageSquare, Calendar, FileText, Info, ArrowLeft, ArrowRight } from "lucide-react"
import { usePatient } from "@/context/patient-context"
import { TopBar } from "@/components/top-bar"
import { StatusIndicator } from "@/components/status-indicator"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import { CategoryIcon } from "@/components/category-icon"
import { ReferenceRangeChart } from "@/components/reference-range-chart"
import { DisclaimerBanner } from "@/components/disclaimer-banner"

export default function CategoryDetailPage() {
  const params = useParams()
  const { patientData, isLoading } = usePatient()
  const [expanded, setExpanded] = useState(true)

  // Find the metric that matches the category param
  const metric = patientData.metrics.find((m) => m.id === params.category)

  // Find index of current metric for navigation
  const currentIndex = patientData.metrics.findIndex((m) => m.id === params.category)
  const prevMetric = currentIndex > 0 ? patientData.metrics[currentIndex - 1] : null
  const nextMetric = currentIndex < patientData.metrics.length - 1 ? patientData.metrics[currentIndex + 1] : null

  if (isLoading) {
    return (
      <div className="bg-[#FAFEFF] min-h-screen">
        <TopBar />
        <DisclaimerBanner />
        <div className="p-5 space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    )
  }

  if (!metric) {
    return (
      <div className="bg-[#FAFEFF] min-h-screen">
        <TopBar />
        <DisclaimerBanner />
        <div className="p-5">
          <h1 className="text-xl font-semibold mb-4 text-[#03659C]">Metric not found</h1>
          <p className="text-[#03659C]/80">The requested metric could not be found.</p>
        </div>
      </div>
    )
  }

  // Get reference ranges based on metric type
  const getReferenceRanges = (metricId: string) => {
    switch (metricId) {
      case "glucose":
        return [
          { min: 0, max: 70, label: "Low", color: "rgba(239, 68, 68, 0.2)" },
          { min: 70, max: 99, label: "Normal", color: "rgba(20, 184, 166, 0.2)" },
          { min: 99, max: 125, label: "Pre-diabetic", color: "rgba(245, 158, 11, 0.2)" },
          { min: 125, max: 200, label: "Diabetic", color: "rgba(239, 68, 68, 0.2)" },
        ]
      case "vitd":
        return [
          { min: 0, max: 20, label: "Deficient", color: "rgba(239, 68, 68, 0.2)" },
          { min: 20, max: 30, label: "Insufficient", color: "rgba(245, 158, 11, 0.2)" },
          { min: 30, max: 50, label: "Optimal", color: "rgba(20, 184, 166, 0.2)" },
          { min: 50, max: 100, label: "High", color: "rgba(245, 158, 11, 0.2)" },
        ]
      case "ldl":
        return [
          { min: 0, max: 100, label: "Optimal", color: "rgba(20, 184, 166, 0.2)" },
          { min: 100, max: 130, label: "Near optimal", color: "rgba(245, 158, 11, 0.2)" },
          { min: 130, max: 160, label: "Borderline high", color: "rgba(245, 158, 11, 0.3)" },
          { min: 160, max: 190, label: "High", color: "rgba(239, 68, 68, 0.2)" },
        ]
      case "bp":
        return [
          { min: 0, max: 90, label: "Low", color: "rgba(239, 68, 68, 0.2)" },
          { min: 90, max: 120, label: "Normal", color: "rgba(20, 184, 166, 0.2)" },
          { min: 120, max: 140, label: "Elevated", color: "rgba(245, 158, 11, 0.2)" },
          { min: 140, max: 180, label: "High", color: "rgba(239, 68, 68, 0.2)" },
        ]
      case "protein":
        return [
          { min: 0, max: 0, label: "Normal", color: "rgba(20, 184, 166, 0.2)" },
          { min: 0, max: 30, label: "Trace", color: "rgba(245, 158, 11, 0.2)" },
          { min: 30, max: 100, label: "Elevated", color: "rgba(239, 68, 68, 0.2)" },
        ]
      default:
        return [{ min: 0, max: 100, label: "Normal", color: "rgba(20, 184, 166, 0.2)" }]
    }
  }

  // Get normal range information
  const getNormalRange = (metricId: string) => {
    switch (metricId) {
      case "glucose":
        return "70-99 mg/dL (fasting)"
      case "vitd":
        return "30-50 ng/mL"
      case "ldl":
        return "<100 mg/dL"
      case "bp":
        return "<120/80 mmHg"
      case "protein":
        return "0 mg/dL"
      default:
        return "Consult your provider"
    }
  }

  // Get recommended next steps
  const getRecommendedNextSteps = (metric: (typeof patientData.metrics)[0]) => {
    switch (metric.status) {
      case "balanced":
        return "Continue your current health practices and monitor regularly."
      case "manage":
        return "Consider lifestyle adjustments like diet modifications and more frequent monitoring."
      case "consult":
        return "Schedule a follow-up with your healthcare provider to discuss these results."
      default:
        return "Follow up with your healthcare provider for guidance."
    }
  }

  // Get why it matters information
  const getWhyItMatters = (metricId: string) => {
    switch (metricId) {
      case "glucose":
        return "Blood glucose is a key indicator of how your body processes sugar. Monitoring helps identify risk for diabetes and metabolic issues early."
      case "vitd":
        return "Vitamin D is essential for bone health, immune function, and mood regulation. Adequate levels support overall wellness."
      case "ldl":
        return "LDL cholesterol, often called 'bad' cholesterol, can build up in your arteries. Keeping levels in check reduces heart disease risk."
      case "bp":
        return "Blood pressure measures the force of blood against artery walls. Healthy levels reduce strain on your heart and blood vessels."
      case "protein":
        return "Protein in urine can indicate how well your kidneys are filtering. Normal levels suggest healthy kidney function."
      default:
        return "This measurement helps your healthcare provider understand your overall health and identify potential areas for improvement."
    }
  }

  return (
    <div className="bg-[#FAFEFF] min-h-screen">
      <TopBar title={metric.name} />
      <DisclaimerBanner />

      <div className="p-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-start justify-between"
        >
          <div>
            <div className="flex items-center mb-1">
              <CategoryIcon type={metric.category as any} size={16} className="mr-2 p-1" />
              <h1 className="text-xl font-semibold text-[#03659C]">{metric.name}</h1>
            </div>
            <p className="text-sm text-[#03659C]/70">
              Last updated: {new Date(metric.lastUpdated).toLocaleDateString()}
            </p>
          </div>
          <StatusIndicator status={metric.status} size="lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#E5F8FF] rounded-lg p-5 mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="text-4xl font-bold text-[#03659C]">
              {metric.value} <span className="text-lg font-normal">{metric.unit}</span>
            </div>

            <div className="bg-white px-3 py-1.5 rounded-full text-sm text-[#03659C] font-medium">
              {getNormalRange(metric.id)}
            </div>
          </div>

          {metric.history && metric.history.length > 0 && (
            <div className="mt-4">
              <ReferenceRangeChart
                data={metric.history}
                status={metric.status}
                unit={metric.unit}
                name={metric.name}
                ranges={getReferenceRanges(metric.id)}
              />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg mb-6 border border-[#E5F8FF] overflow-hidden"
        >
          <Accordion type="single" collapsible defaultValue="next-steps" className="w-full">
            <AccordionItem value="next-steps" className="border-none">
              <AccordionTrigger className="px-5 py-4 text-[#03659C] hover:bg-[#FAFEFF]">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Recommended next steps</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-[#03659C]/80 space-y-4">
                <p className="mb-4">{getRecommendedNextSteps(metric)}</p>
                
                {/* Personalized suggestion cards */}
                <div className="space-y-3 mb-4">
                  {/* Suggestion card 1 */}
                  <div className="bg-[#FAFEFF] p-3 rounded-md flex items-start">
                    <div className="bg-green-100 p-1 rounded-md flex items-center justify-center h-8 w-8 flex-shrink-0 mr-2">
                      <span role="img" aria-label="nutrition" className="text-base">
                        {metric.category === "vitamins" ? "🥦" : 
                         metric.category === "heart" ? "🫐" :
                         metric.category === "urine" ? "🚰" : "🥗"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-gray-800">
                        {metric.id === "glucose" ? "Balance your carbohydrate intake" :
                         metric.id === "vitd" ? "Increase sun exposure and dietary vitamin D" :
                         metric.id === "ldl" ? "Reduce saturated fat consumption" :
                         metric.id === "bp" ? "Reduce sodium intake" :
                         metric.id === "protein" ? "Stay properly hydrated" :
                         "Optimize your nutrition"}
                      </h5>
                      <p className="text-xs text-gray-600 mt-1">
                        {metric.id === "glucose" ? "Choose complex carbohydrates like whole grains and limit simple sugars to better regulate blood glucose levels." :
                         metric.id === "vitd" ? "Spend 15-30 minutes in sunlight several times a week and consume vitamin D-rich foods like fatty fish and fortified dairy." :
                         metric.id === "ldl" ? "Replace saturated fats with heart-healthy unsaturated fats found in olive oil, nuts, and avocados." :
                         metric.id === "bp" ? "Aim to consume less than 2,300mg of sodium per day. Read nutrition labels and choose low-sodium options." :
                         metric.id === "protein" ? "Drink at least 8 glasses of water daily to support kidney function and help flush toxins." :
                         "Focus on a balanced diet rich in fruits, vegetables, lean protein, and healthy fats."}
                      </p>
                    </div>
                  </div>
                  
                  {/* Suggestion card 2 */}
                  <div className="bg-[#FAFEFF] p-3 rounded-md flex items-start">
                    <div className="bg-blue-100 p-1 rounded-md flex items-center justify-center h-8 w-8 flex-shrink-0 mr-2">
                      <span role="img" aria-label="activity" className="text-base">
                        {metric.category === "heart" ? "🚶" : "🏃"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-gray-800">
                        {metric.id === "glucose" ? "Regular physical activity" :
                         metric.id === "vitd" ? "Outdoor exercise routine" :
                         metric.id === "ldl" ? "Consistent aerobic exercise" :
                         metric.id === "bp" ? "Daily moderate exercise" :
                         metric.id === "protein" ? "Appropriate exercise intensity" :
                         "Maintain active lifestyle"}
                      </h5>
                      <p className="text-xs text-gray-600 mt-1">
                        {metric.id === "glucose" ? "Aim for 150 minutes of moderate exercise weekly to improve insulin sensitivity and help regulate blood sugar levels." :
                         metric.id === "vitd" ? "Combine vitamin D production with exercise by walking, jogging, or cycling outdoors during daylight hours." :
                         metric.id === "ldl" ? "Include 30 minutes of heart-healthy exercise most days to help lower LDL cholesterol and raise HDL cholesterol." :
                         metric.id === "bp" ? "Regular exercise for 30 minutes most days can lower your blood pressure by 5-8 mmHg over time." :
                         metric.id === "protein" ? "Moderate your exercise intensity and stay hydrated to reduce stress on kidneys, especially if protein levels are elevated." :
                         "Regular physical activity improves overall health and can positively impact multiple health markers."}
                      </p>
                    </div>
                  </div>

                  {metric.status !== "balanced" && (
                    <div className="bg-[#FAFEFF] p-3 rounded-md flex items-start">
                      <div className="bg-amber-100 p-1 rounded-md flex items-center justify-center h-8 w-8 flex-shrink-0 mr-2">
                        <span role="img" aria-label="monitoring" className="text-base">
                          📊
                        </span>
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium text-gray-800">
                          Follow up testing schedule
                        </h5>
                        <p className="text-xs text-gray-600 mt-1">
                          {metric.status === "manage" ? 
                            "Consider more frequent monitoring to track how lifestyle changes affect your results. Retest in 3 months." :
                           metric.status === "consult" ?
                            "Consult with your healthcare provider to determine appropriate follow-up testing. They may recommend testing in 1-2 months." :
                            "Schedule a follow-up test to establish your baseline and track improvements over time."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
                  {metric.status === "consult" && (
                    <Button className="flex-1 bg-[#03659C]">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Book Consultation
                    </Button>
                  )}

                  {metric.status === "book" && (
                    <Button className="flex-1 bg-[#03659C]">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Test
                    </Button>
                  )}

                  {(metric.status === "manage" || metric.status === "balanced") && (
                    <Link href="/messages" className="flex-1">
                      <Button className="w-full bg-[#03659C]">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Ask Health Coach
                      </Button>
                    </Link>
                  )}

                  <Link href={`/results?view=list&metric=${metric.id}`} className="flex-1">
                    <Button variant="outline" className="w-full border-[#03659C]/20 text-[#03659C]">
                      <FileText className="h-4 w-4 mr-2" />
                      View Reports
                    </Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="explanation" className="border-none">
              <AccordionTrigger className="px-5 py-4 text-[#03659C] hover:bg-[#FAFEFF]">
                <div className="flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  <span>Why this matters</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-[#03659C]/80 space-y-4">
                <p>{getWhyItMatters(metric.id)}</p>

                <div className="bg-[#FAFEFF] p-4 rounded-lg">
                  <h4 className="font-medium text-[#03659C] mb-2">Educational Resources</h4>
                  <ul className="text-[#03659C]/80 space-y-2">
                    <li className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-[#03659C]" />
                      <a href="#" className="hover:underline">
                        Understanding {metric.name}
                      </a>
                    </li>
                    <li className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-[#03659C]" />
                      <a href="#" className="hover:underline">
                        Lifestyle factors that affect {metric.name}
                      </a>
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        <div className="mt-6 flex justify-between">
          {prevMetric ? (
            <Link href={`/results/${prevMetric.id}`}>
              <Button variant="outline" size="sm" className="text-[#03659C] border-[#E5F8FF]">
                <ArrowLeft className="h-4 w-4 mr-1" />
                {prevMetric.name}
              </Button>
            </Link>
          ) : (
            <div></div>
          )}

          {nextMetric ? (
            <Link href={`/results/${nextMetric.id}`}>
              <Button variant="outline" size="sm" className="text-[#03659C] border-[#E5F8FF]">
                {nextMetric.name}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  )
}
