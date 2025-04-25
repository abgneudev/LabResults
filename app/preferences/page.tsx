import { TopBar } from "@/components/top-bar"
import { PreferenceForm } from "@/components/preference-form"

export default function PreferencesPage() {
  return (
    <div>
      <TopBar title="Preferences" />
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-2">Personalize Your Health Tracking</h1>
        <p className="text-gray-600 mb-6">
          Tell us what health metrics you want to track, and we'll customize your experience.
        </p>
        <PreferenceForm />
      </div>
    </div>
  )
}
