"use client";

import { useState } from "react";
import { usePatient } from "@/context/patient-context";
import { TopBar } from "@/components/top-bar";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { VitalsDashboard } from "@/components/vitals-dashboard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function VitalsPage() {
  const { patientData } = usePatient();
  const [activeTab, setActiveTab] = useState("all");

  // Define tab variants for smooth animations
  const tabContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Disclaimer banner positioned at top */}
      <DisclaimerBanner />

      {/* Header with required height */}
      <TopBar showBack={true} title="Vitals & More" className="h-14" />

      <div className="p-6 max-w-[640px] mx-auto">
        <h1 className="text-2xl font-bold text-[#03659C] mb-4">
          Your Health Vitals
        </h1>
        <p className="text-gray-600 mb-6">
          Track and monitor your most important health metrics in one place.
        </p>

        {/* Tab navigation */}
        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <div className="border-b border-[#E5F8FF]">
            <TabsList className="bg-transparent h-auto p-0 w-full flex justify-start space-x-4 overflow-x-auto">
              <TabsTrigger
                value="all"
                className="px-1 py-2.5 text-sm font-medium text-gray-600 data-[state=active]:text-[#03659C] data-[state=active]:border-b-2 data-[state=active]:border-[#03659C] rounded-none bg-transparent"
                aria-label="All vitals"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="blood"
                className="px-1 py-2.5 text-sm font-medium text-gray-600 data-[state=active]:text-[#03659C] data-[state=active]:border-b-2 data-[state=active]:border-[#03659C] rounded-none bg-transparent whitespace-nowrap"
                aria-label="Blood metrics"
              >
                Blood Metrics
              </TabsTrigger>
              <TabsTrigger
                value="heart"
                className="px-1 py-2.5 text-sm font-medium text-gray-600 data-[state=active]:text-[#03659C] data-[state=active]:border-b-2 data-[state=active]:border-[#03659C] rounded-none bg-transparent whitespace-nowrap"
                aria-label="Heart health"
              >
                Heart Health
              </TabsTrigger>
              <TabsTrigger
                value="vitamins"
                className="px-1 py-2.5 text-sm font-medium text-gray-600 data-[state=active]:text-[#03659C] data-[state=active]:border-b-2 data-[state=active]:border-[#03659C] rounded-none bg-transparent"
                aria-label="Vitamins"
              >
                Vitamins
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab content */}
          <TabsContent value="all" className="mt-4">
            <motion.div
              key="all-tab"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <VitalsDashboard className="mb-6" />
            </motion.div>
          </TabsContent>

          <TabsContent value="blood" className="mt-4">
            <motion.div
              key="blood-tab"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <VitalsDashboard className="mb-6" filterCategory="blood" />
            </motion.div>
          </TabsContent>

          <TabsContent value="heart" className="mt-4">
            <motion.div
              key="heart-tab"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <VitalsDashboard className="mb-6" filterCategory="heart" />
            </motion.div>
          </TabsContent>

          <TabsContent value="vitamins" className="mt-4">
            <motion.div
              key="vitamins-tab"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <VitalsDashboard className="mb-6" filterCategory="vitamins" />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
