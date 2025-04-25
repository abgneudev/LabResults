// Health card examples with realistic metrics
import React from "react";
import { HealthCard } from "./health-card";
import type { Metric } from "@/context/patient-context";

// Example metrics that can be used as props for the HealthCard component
export const healthCardExamples: Metric[] = [
  // Blood Glucose - Balanced
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
    description: "Blood glucose measures sugar levels in your bloodstream. Normal fasting range is 70-99 mg/dL."
  },

  // Blood Glucose - Needs Management
  {
    id: "glucose-high",
    name: "Blood Glucose",
    value: 115,
    unit: "mg/dL",
    status: "manage",
    category: "blood",
    lastUpdated: "2023-04-15",
    history: [
      { date: "2023-01-15", value: 105 },
      { date: "2023-02-15", value: 108 },
      { date: "2023-03-15", value: 112 },
      { date: "2023-04-15", value: 115 },
    ],
    description: "Blood glucose measures sugar levels in your bloodstream. Normal fasting range is 70-99 mg/dL."
  },

  // Vitamin D - Low (Needs Management)
  {
    id: "vitd",
    name: "Vitamin D",
    value: 21,
    unit: "ng/mL",
    status: "manage",
    category: "vitamins",
    lastUpdated: "2023-04-10",
    history: [
      { date: "2023-01-10", value: 18 },
      { date: "2023-02-10", value: 19 },
      { date: "2023-03-10", value: 20 },
      { date: "2023-04-10", value: 21 },
    ],
    description: "Vitamin D is essential for bone health and immune function. Normal range is 30-50 ng/mL."
  },

  // Vitamin D - Normal
  {
    id: "vitd-normal",
    name: "Vitamin D",
    value: 42,
    unit: "ng/mL",
    status: "balanced",
    category: "vitamins",
    lastUpdated: "2023-04-10",
    history: [
      { date: "2023-01-10", value: 32 },
      { date: "2023-02-10", value: 36 },
      { date: "2023-03-10", value: 38 },
      { date: "2023-04-10", value: 42 },
    ],
    description: "Vitamin D is essential for bone health and immune function. Normal range is 30-50 ng/mL."
  },

  // LDL Cholesterol - Consult Required
  {
    id: "ldl",
    name: "LDL Cholesterol",
    value: 165,
    unit: "mg/dL",
    status: "consult",
    category: "heart",
    lastUpdated: "2023-04-05",
    history: [
      { date: "2023-01-05", value: 152 },
      { date: "2023-02-05", value: 158 },
      { date: "2023-03-05", value: 160 },
      { date: "2023-04-05", value: 165 },
    ],
    description: "LDL cholesterol is often referred to as 'bad' cholesterol. Optimal level is less than 100 mg/dL."
  },

  // Blood Pressure - Book Appointment
  {
    id: "bp",
    name: "Blood Pressure",
    value: 145,
    unit: "mmHg",
    status: "book",
    category: "heart",
    lastUpdated: "2023-04-15",
    history: [
      { date: "2023-01-15", value: 138 },
      { date: "2023-02-15", value: 142 },
      { date: "2023-03-15", value: 143 },
      { date: "2023-04-15", value: 145 },
    ],
    description: "Blood pressure measures the force of blood against your artery walls. Normal is less than 120/80 mmHg."
  },

  // Urine Protein - Normal
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
    description: "Protein in urine can indicate kidney issues. Normal levels are 0 mg/dL."
  },

  // Urine Protein - Needs Consult
  {
    id: "protein-high",
    name: "Urine Protein",
    value: 20,
    unit: "mg/dL",
    status: "consult",
    category: "urine",
    lastUpdated: "2023-04-15",
    history: [
      { date: "2023-01-15", value: 0 },
      { date: "2023-02-15", value: 5 },
      { date: "2023-03-15", value: 12 },
      { date: "2023-04-15", value: 20 },
    ],
    description: "Protein in urine can indicate kidney issues. Normal levels are 0 mg/dL."
  }
];

// Example usage component
export const HealthCardExamples: React.FC = () => {
  return (
    <div className="p-4 space-y-8">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Health Card Examples</h1>
      
      <div>
        <h2 className="text-lg font-medium text-gray-700 mb-3">Blood Metrics</h2>
        <div className="space-y-6">
          <HealthCard metric={healthCardExamples[0]} index={0} />
          <HealthCard metric={healthCardExamples[1]} index={1} />
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-medium text-gray-700 mb-3">Vitamin Metrics</h2>
        <div className="space-y-6">
          <HealthCard metric={healthCardExamples[2]} index={0} />
          <HealthCard metric={healthCardExamples[3]} index={1} />
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-medium text-gray-700 mb-3">Heart Metrics</h2>
        <div className="space-y-6">
          <HealthCard metric={healthCardExamples[4]} index={0} />
          <HealthCard metric={healthCardExamples[5]} index={1} />
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-medium text-gray-700 mb-3">Urine Metrics</h2>
        <div className="space-y-6">
          <HealthCard metric={healthCardExamples[6]} index={0} />
          <HealthCard metric={healthCardExamples[7]} index={1} />
        </div>
      </div>
    </div>
  );
};

export default HealthCardExamples;