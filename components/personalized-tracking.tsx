"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  MessageSquare,
  Send,
  Moon,
  Heart,
  Activity,
  Coffee,
  Clipboard,
  ChevronRight,
  Info,
  TrendingUp,
  Calendar,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StatusIndicator } from "./status-indicator";

interface PersonalizedTrackingProps {
  onClose: () => void;
}

// Common tracking categories with icons and descriptions
const trackingCategories = [
  {
    id: "vitamins",
    name: "Vitamin Levels",
    icon: Coffee,
    description:
      "Track vitamin D, B12, and other nutrient levels from your lab results",
    example: "I want to track my vitamin D and B12 levels from my blood tests",
  },
  {
    id: "cholesterol",
    name: "Cholesterol Profile",
    icon: Heart,
    description:
      "Monitor LDL, HDL, triglycerides and other lipid panel metrics",
    example: "I want to track my cholesterol levels over time",
  },
  {
    id: "thyroid",
    name: "Thyroid Function",
    icon: Activity,
    description: "Track TSH, T3, T4 and other thyroid-related lab values",
    example: "I want to monitor my thyroid function tests",
  },
  {
    id: "kidney",
    name: "Kidney Function",
    icon: Moon,
    description:
      "Monitor creatinine, BUN, GFR and other kidney health indicators",
    example: "I want to track my kidney function tests",
  },
  {
    id: "diabetes",
    name: "Diabetes Management",
    icon: Clipboard,
    description:
      "Track A1C, glucose levels, and other diabetes-related metrics",
    example: "I want to monitor my A1C and glucose trends from lab results",
  },
];

export function PersonalizedTracking({ onClose }: PersonalizedTrackingProps) {
  const [step, setStep] = useState<
    "categories" | "prompt" | "generating" | "preview"
  >("categories");
  const [prompt, setPrompt] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [livePreview, setLivePreview] = useState({
    title: "",
    metrics: [] as string[],
    category: "blood",
    value: 95,
    unit: "mg/dL",
    status: "balanced" as "balanced" | "manage" | "consult" | "book",
  });

  // Auto-focus the textarea when switching to the prompt step
  useEffect(() => {
    if (step === "prompt" && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [step]);

  // Generate live preview based on prompt input
  useEffect(() => {
    if (prompt.trim()) {
      // Simple logic to extract potential tracking metrics from the prompt
      const normalizedPrompt = prompt.toLowerCase();
      const keywords = {
        vitamins: ["vitamin", "d", "b12", "nutrient"],
        cholesterol: ["cholesterol", "ldl", "hdl", "triglycerides", "lipid"],
        thyroid: ["thyroid", "tsh", "t3", "t4"],
        kidney: ["kidney", "creatinine", "bun", "gfr"],
        diabetes: ["diabetes", "a1c", "glucose", "sugar"],
      };

      // Extract title from prompt - simple heuristic
      let title = "";
      if (normalizedPrompt.includes("track")) {
        const afterTrack = normalizedPrompt.split("track")[1];
        if (afterTrack && afterTrack.includes("and")) {
          title =
            afterTrack.split("and")[0].trim() +
            " & " +
            afterTrack.split("and")[1].split(" ").slice(0, 2).join(" ");
        } else if (afterTrack) {
          title = afterTrack.split(" ").slice(0, 3).join(" ");
        }
      }

      title = title || "Personalized Health Tracker";
      title = title.charAt(0).toUpperCase() + title.slice(1);

      // Extract metrics based on keywords
      const detectedMetrics: string[] = [];
      let category = "blood";
      Object.entries(keywords).forEach(([categoryKey, terms]) => {
        terms.forEach((term) => {
          if (
            normalizedPrompt.includes(term) &&
            !detectedMetrics.includes(categoryKey)
          ) {
            detectedMetrics.push(categoryKey);
            if (categoryKey === "vitamins") category = "vitamins";
            if (categoryKey === "cholesterol" || categoryKey === "diabetes")
              category = "heart";
            if (categoryKey === "kidney") category = "urine";
          }
        });
      });

      // Map detected metrics to user-friendly names
      const metricLabels = detectedMetrics.map((metric) => {
        switch (metric) {
          case "vitamins":
            return "Vitamin levels";
          case "cholesterol":
            return "Cholesterol profile";
          case "thyroid":
            return "Thyroid function";
          case "kidney":
            return "Kidney function";
          case "diabetes":
            return "Diabetes management";
          default:
            return metric;
        }
      });

      // Determine sample value and unit based on category
      let value = 95;
      let unit = "mg/dL";

      if (category === "vitamins") {
        value = 42;
        unit = "ng/mL";
      } else if (category === "heart") {
        value = 145;
        unit = "mmHg";
      } else if (category === "urine") {
        value = 0;
        unit = "mg/dL";
      }

      setLivePreview({
        title: title.length > 30 ? title.substring(0, 30) + "..." : title,
        metrics: metricLabels.slice(0, 3), // Limit to 3 metrics for display
        category,
        value,
        unit,
        status: "balanced",
      });
    } else {
      setLivePreview({
        title: "",
        metrics: [],
        category: "blood",
        value: 95,
        unit: "mg/dL",
        status: "balanced",
      });
    }
  }, [prompt]);

  const handleCategorySelect = (categoryId: string) => {
    const category = trackingCategories.find((c) => c.id === categoryId);
    if (category) {
      setSelectedCategory(categoryId);
      setPrompt(category.example);
      setStep("prompt");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setStep("generating");

    // Simulate AI generation
    setTimeout(() => {
      setStep("preview");
    }, 2000);
  };

  const handleBackToCategories = () => {
    setStep("categories");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-xl"
        >
          <div className="p-4 border-b border-[#E5F8FF] flex justify-between items-center">
            <h3 className="font-medium text-[#03659C]">
              Create Personalized Tracking
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-[#03659C] rounded-full hover:bg-[#E5F8FF]"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress indicator */}
          <div className="px-4 pt-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-2">
                <motion.div
                  animate={{
                    scale: step === "categories" ? 1.2 : 1,
                    backgroundColor:
                      step === "categories" ? "#03659C" : "#E5F8FF",
                  }}
                  className="h-2 w-2 rounded-full"
                ></motion.div>
                <motion.div
                  animate={{
                    scale: step === "prompt" ? 1.2 : 1,
                    backgroundColor: step === "prompt" ? "#03659C" : "#E5F8FF",
                  }}
                  className="h-2 w-2 rounded-full"
                ></motion.div>
                <motion.div
                  animate={{
                    scale:
                      step === "generating" || step === "preview" ? 1.2 : 1,
                    backgroundColor:
                      step === "generating" || step === "preview"
                        ? "#03659C"
                        : "#E5F8FF",
                  }}
                  className="h-2 w-2 rounded-full"
                ></motion.div>
              </div>
              <span className="text-xs text-[#03659C]/70">
                Step{" "}
                {step === "categories" ? "1" : step === "prompt" ? "2" : "3"} of
                3
              </span>
            </div>
          </div>

          {/* Categories selection step */}
          {step === "categories" && (
            <div className="p-4">
              <div className="mb-3">
                <h4 className="text-sm font-medium text-[#03659C]">
                  Choose a tracking category
                </h4>
              </div>

              <div className="space-y-2 mb-4">
                {trackingCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className="w-full bg-[#E5F8FF] hover:bg-[#D5F0FF] rounded-lg p-3 flex items-center justify-between transition-colors"
                    whileHover={{ scale: 1.01, backgroundColor: "#D5F0FF" }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center">
                      <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                        <category.icon className="h-5 w-5 text-[#03659C]" />
                      </div>
                      <div className="text-left">
                        <h5 className="font-medium text-[#03659C]">
                          {category.name}
                        </h5>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#03659C]/70" />
                  </motion.button>
                ))}
              </div>

              <Button
                onClick={() => setStep("prompt")}
                className="w-full bg-[#03659C] hover:bg-[#03659C]/90"
              >
                Create Custom Tracking
              </Button>
            </div>
          )}

          {/* Prompt entry step */}
          {step === "prompt" && (
            <div className="p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <label
                      htmlFor="prompt"
                      className="block text-sm font-medium text-[#03659C]"
                    >
                      What would you like to track?
                    </label>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full hover:bg-[#E5F8FF]"
                          >
                            <Info className="h-4 w-4 text-[#03659C]/70" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="max-w-xs">
                          <p>
                            Be specific about what metrics you want to track
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <Textarea
                    id="prompt"
                    placeholder="Example: I want to track my vitamin D levels"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full border-[#E5F8FF] text-[#03659C] rounded-lg focus-visible:ring-[#03659C]"
                    rows={3}
                    ref={textareaRef}
                  />
                </div>

                {/* Live preview section */}
                {prompt.trim() && (
                  <div className="mb-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="rounded-lg overflow-hidden shadow-sm"
                    >
                      <div
                        className={`p-3 pb-2.5 flex flex-col bg-gradient-to-br ${
                          livePreview.category === "blood"
                            ? "from-orange-100 to-orange-200"
                            : livePreview.category === "vitamins"
                            ? "from-yellow-100 to-yellow-200"
                            : livePreview.category === "heart"
                            ? "from-red-100 to-red-200"
                            : livePreview.category === "urine"
                            ? "from-blue-100 to-blue-200"
                            : "from-[#E5F8FF] to-[#D9F2FF]"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <div>
                            <h3 className="font-medium text-gray-800 text-base">
                              {livePreview.title || "Personalized Tracker"}
                            </h3>
                          </div>
                          <StatusIndicator status={livePreview.status} />
                        </div>

                        <div className="flex items-end justify-between">
                          <div className="text-2xl font-bold text-gray-800">
                            {livePreview.value}{" "}
                            <span className="text-sm font-normal ml-1">
                              {livePreview.unit}
                            </span>
                          </div>
                          <div className="flex items-center text-xs text-green-600">
                            <TrendingUp size={14} className="mr-1" />
                            <span>Tracking</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#03659C]/20 text-[#03659C] hover:bg-[#E5F8FF] hover:text-[#03659C]"
                    onClick={handleBackToCategories}
                  >
                    Back
                  </Button>

                  <Button
                    type="submit"
                    className="flex-1 bg-[#03659C] hover:bg-[#03659C]/90"
                    disabled={!prompt.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Create
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Loading/generating step */}
          {step === "generating" && (
            <div className="p-6 text-center">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 border-t-4 border-[#E5F8FF] border-solid rounded-full animate-spin"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-[#03659C]" />
                </div>
              </div>
              <p className="text-[#03659C] font-medium">
                Creating your tracker
              </p>
              <div className="flex flex-col gap-1 mt-3">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center text-xs text-[#03659C]/70"
                >
                  <div className="w-2 h-2 bg-[#03659C] rounded-full mr-2 animate-pulse"></div>
                  Analyzing metrics
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center text-xs text-[#03659C]/70"
                >
                  <div className="w-2 h-2 bg-[#03659C] rounded-full mr-2 animate-pulse"></div>
                  Finding correlations
                </motion.div>
              </div>
            </div>
          )}

          {/* Preview step */}
          {step === "preview" && (
            <div className="p-4">
              <div className="bg-white rounded-lg mb-4 overflow-hidden shadow">
                {/* Card header with status indicator */}
                <div
                  className={`p-3 flex flex-col bg-gradient-to-br ${
                    livePreview.category === "blood"
                      ? "from-orange-100 to-orange-200"
                      : livePreview.category === "vitamins"
                      ? "from-yellow-100 to-yellow-200"
                      : livePreview.category === "heart"
                      ? "from-red-100 to-red-200"
                      : livePreview.category === "urine"
                      ? "from-blue-100 to-blue-200"
                      : "from-[#E5F8FF] to-[#D9F2FF]"
                  } rounded-lg`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-800 text-base">
                        {livePreview.title || "Personalized Health Tracker"}
                      </h3>
                    </div>
                    <StatusIndicator status={livePreview.status} />
                  </div>

                  <div className="flex items-end justify-between mt-1">
                    <div className="text-2xl font-bold text-gray-800">
                      {livePreview.value}{" "}
                      <span className="text-sm font-normal ml-1">
                        {livePreview.unit}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-green-600">
                      <TrendingUp size={14} className="mr-1" />
                      <span>Tracking</span>
                    </div>
                  </div>
                </div>

                {/* Recommended next steps section */}
                <div className="p-3 border-b border-[#E5F8FF]">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-[#03659C]" />
                    <h4 className="font-medium text-[#03659C] text-sm">
                      Recommended next steps
                    </h4>
                  </div>
                  <p className="text-sm text-[#03659C]/80 mb-3">
                    {livePreview.status === "balanced"
                      ? "Continue your current health practices and monitor regularly."
                      : livePreview.status === "manage"
                      ? "Consider lifestyle adjustments like diet modifications and more frequent monitoring."
                      : livePreview.status === "consult"
                      ? "Schedule a follow-up with your healthcare provider to discuss these results."
                      : "Book a test to establish your baseline measurements."}
                  </p>

                  {/* Action buttons */}
                  <div className="flex space-x-2">
                    {(livePreview.status === "consult" ||
                      livePreview.status === "book") && (
                      <Button className="flex-1 bg-[#03659C]">
                        {livePreview.status === "consult" ? (
                          <>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Book Consultation
                          </>
                        ) : (
                          <>
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Test
                          </>
                        )}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="flex-1 border-[#03659C]/20 text-[#03659C]"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Report
                    </Button>
                  </div>
                </div>

                {/* Personalized tips section with cards */}
                <div className="p-3">
                  <div className="flex items-center mb-3">
                    <Info className="h-4 w-4 mr-2 text-[#03659C]" />
                    <h4 className="font-medium text-[#03659C] text-sm">
                      Personalized suggestions
                    </h4>
                  </div>

                  <div className="space-y-3 mb-3">
                    {/* Suggestion card 1 */}
                    <div className="bg-[#FAFEFF] p-2 rounded-md flex items-start">
                      <div className="bg-green-100 p-1 rounded-md flex items-center justify-center h-8 w-8 flex-shrink-0 mr-2">
                        <span
                          role="img"
                          aria-label="nutrition"
                          className="text-base"
                        >
                          {livePreview.category === "vitamins"
                            ? "🥦"
                            : livePreview.category === "heart"
                            ? "🫐"
                            : livePreview.category === "urine"
                            ? "🚰"
                            : "🥗"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h5 className="text-xs font-medium text-gray-800">
                          {livePreview.category === "vitamins"
                            ? "Add vitamin-rich foods to your diet"
                            : livePreview.category === "heart"
                            ? "Focus on heart-healthy foods"
                            : livePreview.category === "urine"
                            ? "Increase your water intake"
                            : "Balance your macronutrients"}
                        </h5>
                        <p className="text-xs text-gray-600 mt-1">
                          {livePreview.category === "vitamins"
                            ? "Include more leafy greens, dairy, and fortified foods in your daily meals."
                            : livePreview.category === "heart"
                            ? "Incorporate omega-3 rich foods like nuts, seeds, and fatty fish."
                            : livePreview.category === "urine"
                            ? "Aim for 8 glasses of water daily to support kidney function."
                            : "Focus on a balanced plate with lean proteins, complex carbs, and healthy fats."}
                        </p>
                      </div>
                    </div>

                    {/* Suggestion card 2 */}
                    <div className="bg-[#FAFEFF] p-2 rounded-md flex items-start">
                      <div className="bg-blue-100 p-1 rounded-md flex items-center justify-center h-8 w-8 flex-shrink-0 mr-2">
                        <span
                          role="img"
                          aria-label="activity"
                          className="text-base"
                        >
                          {livePreview.category === "heart" ? "🚶" : "🏃"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h5 className="text-xs font-medium text-gray-800">
                          {livePreview.category === "heart"
                            ? "Take a short walk after meals"
                            : livePreview.category === "vitamins"
                            ? "Exercise outdoors for natural vitamin D"
                            : "Regular physical activity"}
                        </h5>
                        <p className="text-xs text-gray-600 mt-1">
                          {livePreview.category === "heart"
                            ? "A 10-minute walk after eating helps regulate blood sugar and supports heart health."
                            : livePreview.category === "vitamins"
                            ? "Spending 15-30 minutes in sunlight helps your body produce vitamin D naturally."
                            : "Aim for 150 minutes of moderate activity weekly to support overall health."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xs font-medium text-[#03659C] mb-2">
                    Tracking includes:
                  </h4>
                  <div className="flex items-center gap-1 flex-wrap mb-3">
                    {livePreview.metrics.length > 0 ? (
                      livePreview.metrics.map((metric, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#E5F8FF] text-[#03659C] font-medium"
                        >
                          {metric}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#E5F8FF] text-[#03659C] font-medium">
                          Vitamin levels
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#E5F8FF] text-[#03659C] font-medium">
                          Cholesterol profile
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1 border-[#03659C]/20 text-[#03659C] hover:bg-[#E5F8FF]"
                  onClick={() => setStep("prompt")}
                >
                  Edit
                </Button>
                <Button
                  className="flex-1 bg-[#03659C] hover:bg-[#03659C]/90"
                  onClick={onClose}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Add to Dashboard
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
