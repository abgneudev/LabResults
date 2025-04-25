"use client";

import { useState } from "react";
import {
  Filter,
  Calendar,
  ArrowUpDown,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Clock,
  CalendarDays,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { SimpleTooltip } from "@/components/ui/simple-tooltip";
import { cn } from "@/lib/utils";

interface SmartFilterProps {
  onFilterChange: (filters: any) => void;
  className?: string;
}

export function SmartFilter({ onFilterChange, className }: SmartFilterProps) {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [showProgress, setShowProgress] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("recent-abnormal");
  const [dateRange, setDateRange] = useState<string>("all");

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "newest" ? "oldest" : "newest";
    setSortOrder(newOrder);
    onFilterChange({ sortOrder: newOrder });
  };

  const toggleShowProgress = () => {
    setShowProgress(!showProgress);
    onFilterChange({ showProgress: !showProgress });
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange({ filter });
  };

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    onFilterChange({ dateRange: range });
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <SimpleTooltip content="Filter lab reports" side="bottom">
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-[#03659C]/20 text-[#03659C] hover:bg-[#E5F8FF] hover:text-[#03659C] hover:border-[#03659C]/30"
            >
              <Filter className="h-4 w-4 mr-2" />
              {activeFilter === "recent-abnormal" && (
                <Badge
                  variant="outline"
                  className="mr-1 bg-amber-50 text-amber-800 border-amber-200 text-[10px]"
                >
                  Abnormal
                </Badge>
              )}
              {activeFilter === "all-normal" && (
                <Badge
                  variant="outline"
                  className="mr-1 bg-green-50 text-green-800 border-green-200 text-[10px]"
                >
                  Normal
                </Badge>
              )}
              {activeFilter === "recent" && (
                <Badge
                  variant="outline"
                  className="mr-1 bg-blue-50 text-blue-800 border-blue-200 text-[10px]"
                >
                  Recent
                </Badge>
              )}
              Filter
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
        </SimpleTooltip>

        <DropdownMenuContent className="w-64">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={cn(
                "flex items-center transition-colors",
                activeFilter === "recent-abnormal"
                  ? "bg-[#E5F8FF] font-medium"
                  : "hover:bg-[#FAFEFF]"
              )}
              onClick={() => handleFilterChange("recent-abnormal")}
            >
              <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
              <div className="flex flex-col">
                <span>Abnormal results</span>
                <span className="text-xs text-[#03659C]/60">
                  Show reports with abnormal values
                </span>
              </div>
              {activeFilter === "recent-abnormal" && (
                <CheckCircle className="h-3 w-3 ml-auto text-[#03659C]" />
              )}
            </DropdownMenuItem>

            <DropdownMenuItem
              className={cn(
                "flex items-center transition-colors",
                activeFilter === "all-normal"
                  ? "bg-[#E5F8FF] font-medium"
                  : "hover:bg-[#FAFEFF]"
              )}
              onClick={() => handleFilterChange("all-normal")}
            >
              <CheckCircle className="h-4 w-4 mr-2 text-teal-500" />
              <div className="flex flex-col">
                <span>Normal results</span>
                <span className="text-xs text-[#03659C]/60">
                  Show reports with all normal values
                </span>
              </div>
              {activeFilter === "all-normal" && (
                <CheckCircle className="h-3 w-3 ml-auto text-[#03659C]" />
              )}
            </DropdownMenuItem>

            <DropdownMenuItem
              className={cn(
                "flex items-center transition-colors",
                activeFilter === "recent"
                  ? "bg-[#E5F8FF] font-medium"
                  : "hover:bg-[#FAFEFF]"
              )}
              onClick={() => handleFilterChange("recent")}
            >
              <Clock className="h-4 w-4 mr-2 text-[#03659C]" />
              <div className="flex flex-col">
                <span>All results</span>
                <span className="text-xs text-[#03659C]/60">
                  Show all reports by date
                </span>
              </div>
              {activeFilter === "recent" && (
                <CheckCircle className="h-3 w-3 ml-auto text-[#03659C]" />
              )}
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Date range</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={
                dateRange === "3m" ? "bg-[#E5F8FF]" : "hover:bg-[#FAFEFF]"
              }
              onClick={() => handleDateRangeChange("3m")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              <span>Last 3 months</span>
              {dateRange === "3m" && (
                <CheckCircle className="h-3 w-3 ml-auto text-[#03659C]" />
              )}
            </DropdownMenuItem>

            <DropdownMenuItem
              className={
                dateRange === "6m" ? "bg-[#E5F8FF]" : "hover:bg-[#FAFEFF]"
              }
              onClick={() => handleDateRangeChange("6m")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              <span>Last 6 months</span>
              {dateRange === "6m" && (
                <CheckCircle className="h-3 w-3 ml-auto text-[#03659C]" />
              )}
            </DropdownMenuItem>

            <DropdownMenuItem
              className={
                dateRange === "1y" ? "bg-[#E5F8FF]" : "hover:bg-[#FAFEFF]"
              }
              onClick={() => handleDateRangeChange("1y")}
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              <span>Last year</span>
              {dateRange === "1y" && (
                <CheckCircle className="h-3 w-3 ml-auto text-[#03659C]" />
              )}
            </DropdownMenuItem>

            <DropdownMenuItem
              className={
                dateRange === "all" ? "bg-[#E5F8FF]" : "hover:bg-[#FAFEFF]"
              }
              onClick={() => handleDateRangeChange("all")}
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              <span>All time</span>
              {dateRange === "all" && (
                <CheckCircle className="h-3 w-3 ml-auto text-[#03659C]" />
              )}
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <div className="p-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm">Show progress indicators</span>
                <span className="text-xs text-[#03659C]/60">
                  Display trends over time
                </span>
              </div>
              <Switch
                checked={showProgress}
                onCheckedChange={toggleShowProgress}
              />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <SimpleTooltip
        content={`Sort by ${sortOrder === "newest" ? "oldest" : "newest"}`}
        side="bottom"
      >
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "border-[#03659C]/20 text-[#03659C] hover:bg-[#E5F8FF] hover:text-[#03659C] hover:border-[#03659C]/30",
            sortOrder === "oldest" && "bg-[#E5F8FF]"
          )}
          onClick={toggleSortOrder}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </SimpleTooltip>
    </div>
  );
}
