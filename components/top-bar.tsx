import Link from "next/link"
import { ChevronLeft, User, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface TopBarProps {
  showBack?: boolean
  title?: string
  className?: string
}

export function TopBar({ showBack = true, title = "MyChart", className }: TopBarProps) {
  return (
    <div className={cn("sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white shadow-sm", className)}>
      <div className="flex items-center">
        {showBack && (
          <Link
            href="/results"
            className="mr-2 text-[#03659C] hover:text-[#024e78] transition-colors p-2.5 rounded-full"
            aria-label="Go back"
          >
            <ChevronLeft className="h-6 w-6" />
          </Link>
        )}
        <h1 className="font-semibold text-lg text-[#03659C]">{title}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className="text-[#03659C] hover:text-[#024e78] transition-colors p-2.5 rounded-full hover:bg-[#E5F8FF]"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="text-[#03659C] hover:text-[#024e78] transition-colors p-2.5 rounded-full hover:bg-[#E5F8FF]"
          aria-label="Profile"
        >
          <User className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
