import { cn } from "@/lib/utils"
import { CheckCircle, AlertTriangle, AlertCircle, Calendar } from "lucide-react"
import type { Status } from "@/context/patient-context"

interface StatusPillProps {
  status: Status
  className?: string
}

export function StatusPill({ status, className }: StatusPillProps) {
  const statusConfig = {
    balanced: {
      icon: CheckCircle,
      text: "Balanced",
      color: "bg-green-50 text-green-700 border-green-100",
    },
    manage: {
      icon: AlertTriangle,
      text: "Worth keeping an eye on",
      color: "bg-amber-50 text-amber-700 border-amber-100",
    },
    consult: {
      icon: AlertCircle,
      text: "Needs a closer look",
      color: "bg-rose-50 text-rose-700 border-rose-100",
    },
    book: {
      icon: Calendar,
      text: "Book",
      color: "bg-blue-50 text-blue-700 border-blue-100",
    },
  }

  const { icon: Icon, text, color } = statusConfig[status]

  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-all",
        color,
        className,
      )}
    >
      <Icon className="w-3 h-3 mr-1.5" />
      {text}
    </div>
  )
}
