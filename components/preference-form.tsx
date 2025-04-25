"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { usePatient } from "@/context/patient-context"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { X } from "lucide-react"

export function PreferenceForm() {
  const [preferences, setPreferences] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [mappedPreferences, setMappedPreferences] = useState<string[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const { addPreference } = usePatient()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!preferences.trim()) {
      toast({
        title: "Empty preferences",
        description: "Please enter what you'd like to track",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Mock LLM processing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock mapped preferences based on input
      const mockMappedPrefs = preferences
        .toLowerCase()
        .split(/[,.\n]/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
        .map((p) => {
          if (p.includes("sugar") || p.includes("glucose")) return "Blood Glucose"
          if (p.includes("vitamin") || p.includes("vit")) return "Vitamin D"
          if (p.includes("cholesterol") || p.includes("ldl")) return "LDL Cholesterol"
          if (p.includes("pressure") || p.includes("bp")) return "Blood Pressure"
          if (p.includes("protein") || p.includes("urine")) return "Urine Protein"
          return p.charAt(0).toUpperCase() + p.slice(1) // Capitalize first letter
        })

      setMappedPreferences(mockMappedPrefs)
      setShowPreview(true)
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "There was an error processing your preferences",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSave = () => {
    // Save mapped preferences to context
    mappedPreferences.forEach((pref) => {
      addPreference(pref)
    })

    toast({
      title: "Preferences saved",
      description: "Your health tracking preferences have been updated",
    })

    // Redirect to results page
    router.push("/results")
  }

  const removePreference = (index: number) => {
    setMappedPreferences((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {!showPreview ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label htmlFor="preferences" className="block text-sm font-medium mb-1">
              What do you want to track?
            </label>
            <Textarea
              id="preferences"
              placeholder="I want to track my blood sugar, vitamin D levels, and cholesterol..."
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              rows={5}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Describe in plain English what health metrics matter to you</p>
          </div>
          <Button type="submit" className="w-full" disabled={isProcessing || !preferences.trim()}>
            {isProcessing ? "Processing..." : "Continue"}
          </Button>
        </motion.form>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h3 className="text-lg font-medium">We'll track these for you:</h3>
          <div className="flex flex-wrap gap-2">
            {mappedPreferences.map((pref, index) => (
              <div key={index} className="flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                {pref}
                <button
                  type="button"
                  onClick={() => removePreference(index)}
                  className="ml-1 text-primary/70 hover:text-primary"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setShowPreview(false)} className="flex-1">
              Edit
            </Button>
            <Button type="button" onClick={handleSave} className="flex-1">
              Save Preferences
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
