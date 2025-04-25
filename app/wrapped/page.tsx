import { TopBar } from "@/components/top-bar"
import { SnapshotCarousel } from "@/components/snapshot-carousel"

export default function WrappedPage() {
  return (
    <div>
      <TopBar title="Quarterly Snapshot" />
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-2">Your Health Snapshot</h1>
        <p className="text-gray-600 mb-6">Here's a summary of your health journey over the past quarter.</p>
        <SnapshotCarousel />
      </div>
    </div>
  )
}
