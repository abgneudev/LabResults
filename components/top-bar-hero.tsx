"use client"

import { Bell, User } from "lucide-react"

export function TopBarHero() {
  return (
    <header className="sticky top-0 z-10 bg-white">
      <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100">
        <div className="font-semibold text-[#03659C]">MyChart</div>
        <div className="flex items-center gap-4">
          <button 
            aria-label="Notifications"
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          <button
            aria-label="User profile"
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <User className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  )
}