"use client";

import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MedicalTermProps {
  term: string;
  children: React.ReactNode;
  className?: string;
}

// Medical terminology dictionary
const termDefinitions: Record<string, string> = {
  // Blood sugar terms
  glucose: "A type of sugar that is your body's main source of energy.",
  fasting:
    "Not eating or drinking anything except water for a period of time before a medical test.",
  prediabetic:
    "Having blood sugar levels that are higher than normal but not high enough to be diagnosed as diabetes.",
  A1C: "A blood test that shows your average blood sugar level over the past 2-3 months.",

  // Cholesterol terms
  LDL: "Low-Density Lipoprotein, often called 'bad cholesterol', can build up in arteries.",
  HDL: "High-Density Lipoprotein, often called 'good cholesterol', helps remove other forms of cholesterol from your bloodstream.",
  triglycerides:
    "A type of fat found in your blood that your body uses for energy.",
  "lipid panel":
    "A blood test that measures different types of fat in your blood, including cholesterol and triglycerides.",

  // Vitamin terms
  "vitamin D":
    "A nutrient that helps your body absorb calcium. Your skin makes it when exposed to sunlight.",
  deficient:
    "Having an inadequate amount of something your body needs, like a vitamin or mineral.",
  supplement:
    "A product taken to add nutrients to your diet or to lower your risk of health problems.",

  // Blood pressure terms
  systolic:
    "The top number in a blood pressure reading that measures the pressure in your arteries when your heart beats.",
  diastolic:
    "The bottom number in a blood pressure reading that measures the pressure in your arteries when your heart rests between beats.",
  hypertension:
    "High blood pressure, a condition where the force of blood against artery walls is too high.",

  // Kidney terms
  creatinine:
    "A waste product from the normal breakdown of muscles that your kidneys filter out of your blood.",
  eGFR: "Estimated Glomerular Filtration Rate, a test that checks how well your kidneys are working by estimating how much blood passes through tiny filters in your kidneys.",
  BUN: "Blood Urea Nitrogen, a waste product filtered by your kidneys. High levels may indicate your kidneys aren't working properly.",

  // General terms
  "reference range":
    "The range of test results considered normal for a healthy person.",
  biomarker:
    "A measurable substance in your body that can indicate your health status.",
  metabolism:
    "The process your body uses to get or make energy from the food you eat.",
};

export function MedicalTerm({
  term,
  children,
  className = "",
}: MedicalTermProps) {
  // Convert term to lowercase for dictionary lookup
  const lookupTerm = term.toLowerCase();

  // Use predetermined definition if available, otherwise use a generic message
  const definition =
    termDefinitions[lookupTerm] ||
    `${term} is a medical term. Ask your healthcare provider for more information.`;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className={`inline-flex items-center group ${className}`}>
            {children}
            <Info className="h-3 w-3 ml-0.5 text-[#03659C]/70 group-hover:text-[#03659C]" />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p className="text-sm">{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
