"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface Suggestion {
  id: string
  title: string
  description: string
  icon: string
  source: string
  sourceUrl: string
  category: "nutrition" | "activity" | "lifestyle" | "medical"
}

interface ImprovementSuggestionsProps {
  metricId: string
  className?: string
}

export function ImprovementSuggestions({ metricId, className }: ImprovementSuggestionsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Get suggestions based on metric
  const getSuggestions = (id: string): Suggestion[] => {
    switch (id) {
      case "glucose":
        return [
          {
            id: "glucose-1",
            title: "Add more fiber to your diet",
            description: "Foods high in soluble fiber can help regulate blood sugar levels by slowing digestion.",
            icon: "🥦",
            source: "American Diabetes Association",
            sourceUrl: "https://diabetes.org",
            category: "nutrition",
          },
          {
            id: "glucose-2",
            title: "Take a 10-minute walk after meals",
            description: "Light activity after eating can help your body use glucose more effectively.",
            icon: "🚶",
            source: "CDC",
            sourceUrl: "https://cdc.gov",
            category: "activity",
          },
          {
            id: "glucose-3",
            title: "Stay hydrated",
            description: "Drinking water helps your kidneys flush out excess glucose through urine.",
            icon: "💧",
            source: "Mayo Clinic",
            sourceUrl: "https://mayoclinic.org",
            category: "lifestyle",
          },
        ]
      case "vitd":
        return [
          {
            id: "vitd-1",
            title: "Morning sunlight exposure",
            description:
              "Spend 15-30 minutes in morning sunlight several times a week (with appropriate sun protection).",
            icon: "☀️",
            source: "NIH",
            sourceUrl: "https://nih.gov",
            category: "lifestyle",
          },
          {
            id: "vitd-2",
            title: "Include fatty fish in your diet",
            description: "Salmon, mackerel, and sardines are excellent natural sources of vitamin D.",
            icon: "🐟",
            source: "Harvard Health",
            sourceUrl: "https://health.harvard.edu",
            category: "nutrition",
          },
          {
            id: "vitd-3",
            title: "Consider a supplement",
            description: "Talk to your doctor about vitamin D3 supplements, especially during winter months.",
            icon: "💊",
            source: "Cleveland Clinic",
            sourceUrl: "https://clevelandclinic.org",
            category: "medical",
          },
        ]
      case "ldl":
        return [
          {
            id: "ldl-1",
            title: "Increase soluble fiber intake",
            description:
              "Oats, beans, and fruits can help reduce LDL cholesterol by binding to it in your digestive system.",
            icon: "🥣",
            source: "American Heart Association",
            sourceUrl: "https://heart.org",
            category: "nutrition",
          },
          {
            id: "ldl-2",
            title: "Add plant sterols to your diet",
            description:
              "Found in nuts, seeds, and fortified foods, plant sterols can help block cholesterol absorption.",
            icon: "🌱",
            source: "Mayo Clinic",
            sourceUrl: "https://mayoclinic.org",
            category: "nutrition",
          },
          {
            id: "ldl-3",
            title: "Regular aerobic exercise",
            description: "Aim for 150 minutes of moderate activity weekly to help raise HDL and lower LDL.",
            icon: "🏃",
            source: "CDC",
            sourceUrl: "https://cdc.gov",
            category: "activity",
          },
        ]
      default:
        return [
          {
            id: "general-1",
            title: "Stay physically active",
            description: "Regular exercise supports overall health and can improve many health metrics.",
            icon: "🏋️",
            source: "WHO",
            sourceUrl: "https://who.int",
            category: "activity",
          },
          {
            id: "general-2",
            title: "Prioritize quality sleep",
            description: "Aim for 7-9 hours of quality sleep to support your body's natural healing processes.",
            icon: "😴",
            source: "Sleep Foundation",
            sourceUrl: "https://sleepfoundation.org",
            category: "lifestyle",
          },
          {
            id: "general-3",
            title: "Stay hydrated",
            description: "Proper hydration supports all bodily functions and helps maintain healthy metrics.",
            icon: "🚰",
            source: "Harvard Health",
            sourceUrl: "https://health.harvard.edu",
            category: "lifestyle",
          },
        ]
    }
  }

  const suggestions = getSuggestions(metricId)

  const nextCard = () => {
    setCurrentIndex((prev) => (prev === suggestions.length - 1 ? 0 : prev + 1))
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev === 0 ? suggestions.length - 1 : prev - 1))
  }

  // Category colors
  const categoryColors = {
    nutrition: "bg-green-100 text-green-800",
    activity: "bg-blue-100 text-blue-800",
    lifestyle: "bg-purple-100 text-purple-800",
    medical: "bg-red-100 text-red-800",
  }

  return (
    <div className={cn("relative", className)}>
      <h3 className="font-medium text-[#03659C] mb-3">Improvement Suggestions</h3>

      <div className="relative overflow-hidden" ref={containerRef}>
        <div className="flex items-center justify-between absolute top-1/2 left-0 right-0 z-10 transform -translate-y-1/2 pointer-events-none">
          <button
            onClick={prevCard}
            className="bg-white rounded-full p-1 shadow-md text-[#03659C] pointer-events-auto"
            aria-label="Previous suggestion"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextCard}
            className="bg-white rounded-full p-1 shadow-md text-[#03659C] pointer-events-auto"
            aria-label="Next suggestion"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="relative">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: index === currentIndex ? 1 : 0,
                x: index === currentIndex ? 0 : 100,
                zIndex: index === currentIndex ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-lg shadow-md p-4 border border-[#E5F8FF] ${
                index === currentIndex ? "block" : "hidden"
              }`}
            >
              <div className="flex items-start mb-3">
                <div className="text-2xl mr-3" role="img" aria-label={suggestion.title}>
                  {suggestion.icon}
                </div>
                <div>
                  <h4 className="font-medium text-[#03659C]">{suggestion.title}</h4>
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full inline-block mt-1",
                      categoryColors[suggestion.category],
                    )}
                  >
                    {suggestion.category.charAt(0).toUpperCase() + suggestion.category.slice(1)}
                  </span>
                </div>
              </div>
              <p className="text-sm text-[#03659C]/80 mb-3">{suggestion.description}</p>
              <div className="flex items-center justify-between text-xs text-[#03659C]/70">
                <span>Source: {suggestion.source}</span>
                <a
                  href={suggestion.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#03659C] hover:underline"
                >
                  Learn more <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-3 space-x-1">
          {suggestions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-[#03659C]" : "bg-[#E5F8FF]"}`}
              aria-label={`Go to suggestion ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
