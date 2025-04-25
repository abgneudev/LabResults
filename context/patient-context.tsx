"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

export type Status = "balanced" | "manage" | "consult" | "book"

export interface Metric {
  id: string
  name: string
  value: number
  unit: string
  status: Status
  category: "blood" | "vitamins" | "heart" | "urine"
  lastUpdated: string
  history?: { date: string; value: number }[]
  description?: string
}

export interface PatientData {
  name: string
  metrics: Metric[]
  preferences: string[]
  reports: any[]
}

interface PatientContextType {
  patientData: PatientData
  updatePatientData: (data: Partial<PatientData>) => void
  addMetric: (metric: Metric) => void
  addPreference: (preference: string) => void
  addReport: (report: any) => void
  isLoading: boolean
}

const defaultPatientData: PatientData = {
  name: "Alex",
  metrics: [
    {
      id: "glucose",
      name: "Blood Glucose",
      value: 95,
      unit: "mg/dL",
      status: "balanced",
      category: "blood",
      lastUpdated: "2023-04-15",
      history: [
        { date: "2023-01-15", value: 98 },
        { date: "2023-02-15", value: 102 },
        { date: "2023-03-15", value: 97 },
        { date: "2023-04-15", value: 95 },
      ],
      description:
        "Blood glucose measures the amount of sugar in your blood. Normal fasting levels are below 100 mg/dL.",
    },
    {
      id: "vitd",
      name: "Vitamin D",
      value: 28,
      unit: "ng/mL",
      status: "manage",
      category: "vitamins",
      lastUpdated: "2023-04-15",
      history: [
        { date: "2023-01-15", value: 22 },
        { date: "2023-02-15", value: 24 },
        { date: "2023-03-15", value: 26 },
        { date: "2023-04-15", value: 28 },
      ],
      description:
        "Vitamin D is essential for bone health and immune function. Levels between 30-50 ng/mL are considered optimal.",
    },
    {
      id: "ldl",
      name: "LDL Cholesterol",
      value: 142,
      unit: "mg/dL",
      status: "consult",
      category: "blood",
      lastUpdated: "2023-04-15",
      history: [
        { date: "2023-01-15", value: 155 },
        { date: "2023-02-15", value: 150 },
        { date: "2023-03-15", value: 145 },
        { date: "2023-04-15", value: 142 },
      ],
      description:
        "LDL cholesterol is often called 'bad' cholesterol. Levels below 100 mg/dL are considered optimal for most people.",
    },
    {
      id: "bp",
      name: "Blood Pressure",
      value: 128,
      unit: "mmHg",
      status: "manage",
      category: "heart",
      lastUpdated: "2023-04-15",
      history: [
        { date: "2023-01-15", value: 135 },
        { date: "2023-02-15", value: 132 },
        { date: "2023-03-15", value: 130 },
        { date: "2023-04-15", value: 128 },
      ],
      description:
        "Blood pressure measures the force of blood against your artery walls. Normal is less than 120/80 mmHg.",
    },
    {
      id: "protein",
      name: "Urine Protein",
      value: 0,
      unit: "mg/dL",
      status: "balanced",
      category: "urine",
      lastUpdated: "2023-04-15",
      history: [
        { date: "2023-01-15", value: 0 },
        { date: "2023-02-15", value: 0 },
        { date: "2023-03-15", value: 0 },
        { date: "2023-04-15", value: 0 },
      ],
      description: "Protein in urine can indicate kidney issues. Normal levels are 0 mg/dL.",
    },
  ],
  preferences: ["Blood sugar", "Vitamin D", "Cholesterol"],
  reports: [],
}

const PatientContext = createContext<PatientContextType | undefined>(undefined)

export function PatientProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [storedData, setStoredData] = useLocalStorage<PatientData>("patientData", defaultPatientData)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const updatePatientData = (data: Partial<PatientData>) => {
    setStoredData((prev) => ({ ...prev, ...data }))
  }

  const addMetric = (metric: Metric) => {
    setStoredData((prev) => ({
      ...prev,
      metrics: [...prev.metrics, metric],
    }))
  }

  const addPreference = (preference: string) => {
    if (!storedData.preferences.includes(preference)) {
      setStoredData((prev) => ({
        ...prev,
        preferences: [...prev.preferences, preference],
      }))
    }
  }

  const addReport = (report: any) => {
    setStoredData((prev) => ({
      ...prev,
      reports: [...prev.reports, report],
    }))
  }

  return (
    <PatientContext.Provider
      value={{
        patientData: storedData,
        updatePatientData,
        addMetric,
        addPreference,
        addReport,
        isLoading,
      }}
    >
      {children}
    </PatientContext.Provider>
  )
}

export function usePatient() {
  const context = useContext(PatientContext)
  if (context === undefined) {
    throw new Error("usePatient must be used within a PatientProvider")
  }
  return context
}
