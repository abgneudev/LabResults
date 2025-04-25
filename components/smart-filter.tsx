"use client"

import { useState } from "react"
import { Filter, Calendar, ArrowUpDown, ChevronDown, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface SmartFilterProps {
  onFilterChange: (filters: any) => void
  className?: string
}

export function SmartFilter({ onFilterChange, className }: SmartFilterProps) {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  const [showProgress, setShowProgress] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string>("recent-abnormal")

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "newest" ? "oldest" : "newest"
    setSortOrder(newOrder)
    onFilterChange({ sortOrder: newOrder })
  }

  const toggleShowProgress = () => {
    setShowProgress(!showProgress)
    onFilterChange({ showProgress: !showProgress })
  }

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    onFilterChange({ filter })
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-[#03659C]/20 text-[#03659C]">
            <Filter className="h-4 w-4 mr-2" />
            Smart Filter
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={cn(activeFilter === "recent-abnormal" && "bg-[#E5F8FF]")}
              onClick={() => handleFilterChange("recent-abnormal")}
            >
              <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
              <span>Most recent abnormal</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(activeFilter === "all-normal" && "bg-[#E5F8FF]")}
              onClick={() => handleFilterChange("all-normal")}
            >
              <CheckCircle className="h-4 w-4 mr-2 text-teal-500" />
              <span>All normal results</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(activeFilter === "recent" && "bg-[#E5F8FF]")}
              onClick={() => handleFilterChange("recent")}
            >
              <Clock className="h-4 w-4 mr-2 text-[#03659C]" />
              <span>Most recent</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Date range</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Calendar className="h-4 w-4 mr-2" />
              <span>Last 3 months</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Calendar className="h-4 w-4 mr-2" />
              <span>Last 6 months</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Calendar className="h-4 w-4 mr-2" />
              <span>Last year</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Calendar className="h-4 w-4 mr-2" />
              <span>All time</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <div className="p-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Show progress</span>
              <Switch checked={showProgress} onCheckedChange={toggleShowProgress} />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" size="icon" className="border-[#03659C]/20 text-[#03659C]" onClick={toggleSortOrder}>
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    </div>
  )
}
