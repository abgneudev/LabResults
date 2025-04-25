import { HealthCardExamples } from "@/components/health-card-examples";

export default function HealthExamplesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 px-4">
          Health Card Examples
        </h1>
        <HealthCardExamples />
      </div>
    </div>
  );
}
