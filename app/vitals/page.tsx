"use client";

import { usePatient } from "@/context/patient-context";
import { TopBar } from "@/components/top-bar";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { VitalsDashboard } from "@/components/vitals-dashboard";

export default function VitalsPage() {
  const { patientData } = usePatient();

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

        {/* Vitals Dashboard Component */}
        <VitalsDashboard className="mb-6" />
      </div>
    </div>
  );
}
