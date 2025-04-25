import { cn } from "@/lib/utils"
import { Droplet, Sun, Heart, FlaskRound, Activity } from "lucide-react"

interface CategoryIconProps {
  type: "blood" | "vitamins" | "heart" | "urine" | "organ"
  className?: string
  size?: number
  withLabel?: boolean
}

export function CategoryIcon({ type, className, size = 24, withLabel = false }: CategoryIconProps) {
  // Updated with pastel colors
  const iconConfig = {
    blood: {
      icon: Droplet,
      color: "text-red-500 bg-red-50 border-red-100",
      label: "Blood",
      emoji: "🩸",
    },
    vitamins: {
      icon: Sun,
      color: "text-amber-500 bg-amber-50 border-amber-100",
      label: "Vitamins",
      emoji: "☀️",
    },
    heart: {
      icon: Heart,
      color: "text-pink-500 bg-pink-50 border-pink-100",
      label: "Heart",
      emoji: "❤️",
    },
    urine: {
      icon: FlaskRound,
      color: "text-teal-500 bg-teal-50 border-teal-100",
      label: "Urine",
      emoji: "💧",
    },
    organ: {
      icon: Activity,
      color: "text-purple-500 bg-purple-50 border-purple-100",
      label: "Organ",
      emoji: "🫁",
    },
  }

  const { icon: Icon, color, label, emoji } = iconConfig[type]

  if (withLabel) {
    return (
      <div className={cn("flex items-center", className)}>
        <div className={cn("flex items-center justify-center rounded-full p-2 border", color)}>
          <span className="text-lg" role="img" aria-label={label}>
            {emoji}
          </span>
        </div>
        <span className="ml-2 font-medium text-[#03659C]">{label}</span>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center justify-center rounded-full p-2 border", color, className)}>
      <span className="text-lg" role="img" aria-label={label}>
        {emoji}
      </span>
    </div>
  )
}
