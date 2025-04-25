"use client"

import { motion } from "framer-motion"
import { FileText, ChevronRight, Calendar, MapPin, User } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface FileViewerItemProps {
  id: string
  title: string
  date: string
  location?: string
  doctor?: string
  metrics: number
  onClick: (id: string) => void
  isActive: boolean
}

export function FileViewerItem({ id, title, date, location, doctor, metrics, onClick, isActive }: FileViewerItemProps) {
  const formattedDate = format(new Date(date), "MMM d, yyyy")

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("border-b border-[#E5F8FF] transition-colors", isActive ? "bg-[#E5F8FF]" : "hover:bg-[#FAFEFF]")}
    >
      <button onClick={() => onClick(id)} className="w-full p-4 flex items-center justify-between text-left">
        <div className="flex items-center">
          <div className="bg-[#E5F8FF] p-2 rounded-full mr-3">
            <FileText className="h-5 w-5 text-[#03659C]" />
          </div>
          <div>
            <h3 className="font-medium text-[#03659C]">{title}</h3>
            <div className="flex items-center text-xs text-[#03659C]/70 mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formattedDate}</span>

              {location && (
                <>
                  <span className="mx-1">•</span>
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{location}</span>
                </>
              )}

              {doctor && (
                <>
                  <span className="mx-1">•</span>
                  <User className="h-3 w-3 mr-1" />
                  <span>Dr. {doctor}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-xs bg-[#E5F8FF] px-2 py-1 rounded-full text-[#03659C] mr-2">{metrics} metrics</span>
          <ChevronRight
            className={cn("h-4 w-4 text-[#03659C] transition-transform", isActive && "transform rotate-90")}
          />
        </div>
      </button>

      {isActive && (
        <div className="px-4 pb-4">
          <div className="bg-white rounded-lg p-3 border border-[#E5F8FF]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[#03659C]">Patient ID: 12345678</span>
              <span className="text-xs bg-[#E5F8FF] px-2 py-0.5 rounded-full text-[#03659C]">
                Insurance: Blue Cross
              </span>
            </div>
            <div className="text-xs text-[#03659C]/70">
              <p>Technician: Sarah Johnson</p>
              <p>Ordered by: Dr. {doctor || "Smith"}</p>
              <p>Collection time: {format(new Date(date), "h:mm a")}</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
