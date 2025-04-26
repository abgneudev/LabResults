"use client";

import React, { useState, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  Beaker,
  Heart,
  Activity,
  Calendar,
  User,
  MapPin,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Download,
  Share2,
  X,
  Filter,
  Brain,
  Droplet,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SmartFilter } from "@/components/smart-filter";
import { format, differenceInDays, subDays, subMonths } from "date-fns";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendIndicator } from "@/components/trend-indicator";
import { ResultExplanation } from "@/components/result-explanation";
import { SimpleTooltip } from "@/components/ui/simple-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Enhanced mock data with previous results for trending and additional reports
const mockReports = [
  // April 2023 Reports
  {
    id: "file1",
    title: "Complete Blood Panel",
    date: "2023-04-15",
    location: "Quest Diagnostics",
    doctor: "Johnson",
    metrics: 12,
    status: "mixed", // mixed, normal, review
    type: "blood",
    patientId: "12345678",
    insurance: "Blue Cross",
    technician: "Sarah Johnson",
    results: [
      {
        name: "White Blood Cell Count",
        value: "7.8",
        unit: "K/uL",
        status: "normal",
        reference: "4.5-11.0",
        previousValue: "7.2",
        previousDate: "2023-01-10",
      },
      {
        name: "Red Blood Cell Count",
        value: "5.2",
        unit: "M/uL",
        status: "normal",
        reference: "4.5-5.9",
        previousValue: "5.1",
        previousDate: "2023-01-10",
      },
      {
        name: "Hemoglobin",
        value: "14.2",
        unit: "g/dL",
        status: "normal",
        reference: "13.5-17.5",
        previousValue: "14.0",
        previousDate: "2023-01-10",
      },
      {
        name: "Hematocrit",
        value: "42",
        unit: "%",
        status: "normal",
        reference: "41-50",
        previousValue: "41",
        previousDate: "2023-01-10",
      },
      {
        name: "Platelet Count",
        value: "290",
        unit: "K/uL",
        status: "normal",
        reference: "150-450",
        previousValue: "275",
        previousDate: "2023-01-10",
      },
      {
        name: "Glucose",
        value: "105",
        unit: "mg/dL",
        status: "high",
        reference: "70-99",
        previousValue: "98",
        previousDate: "2023-01-10",
      },
    ],
  },
  {
    id: "file6",
    title: "Hemoglobin A1C",
    date: "2023-04-15", // Same date as CBC
    location: "Quest Diagnostics",
    doctor: "Johnson",
    metrics: 1,
    status: "normal",
    type: "blood",
    patientId: "12345678",
    insurance: "Blue Cross",
    technician: "Sarah Johnson",
    results: [
      {
        name: "Hemoglobin A1C",
        value: "5.4",
        unit: "%",
        status: "normal",
        reference: "4.0-5.6",
        previousValue: "5.6",
        previousDate: "2022-10-15",
      },
    ],
  },

  // March 2023 Reports
  {
    id: "file2",
    title: "Lipid Panel",
    date: "2023-03-10",
    location: "LabCorp",
    doctor: "Smith",
    metrics: 8,
    status: "review",
    type: "heart",
    patientId: "12345678",
    insurance: "Blue Cross",
    technician: "Michael Brown",
    results: [
      {
        name: "Total Cholesterol",
        value: "210",
        unit: "mg/dL",
        status: "high",
        reference: "<200",
        previousValue: "195",
        previousDate: "2022-12-05",
      },
      {
        name: "HDL Cholesterol",
        value: "45",
        unit: "mg/dL",
        status: "normal",
        reference: ">40",
        previousValue: "48",
        previousDate: "2022-12-05",
      },
      {
        name: "LDL Cholesterol",
        value: "142",
        unit: "mg/dL",
        status: "high",
        reference: "<100",
        previousValue: "128",
        previousDate: "2022-12-05",
      },
      {
        name: "Triglycerides",
        value: "150",
        unit: "mg/dL",
        status: "normal",
        reference: "<150",
        previousValue: "145",
        previousDate: "2022-12-05",
      },
    ],
  },
  {
    id: "file7",
    title: "Cardiac Risk Assessment",
    date: "2023-03-10", // Same date as Lipid Panel
    location: "LabCorp",
    doctor: "Smith",
    metrics: 3,
    status: "mixed",
    type: "heart",
    patientId: "12345678",
    insurance: "Blue Cross",
    technician: "Michael Brown",
    results: [
      {
        name: "C-Reactive Protein",
        value: "2.8",
        unit: "mg/L",
        status: "high",
        reference: "<2.0",
        previousValue: "1.9",
        previousDate: "2022-12-05",
      },
      {
        name: "Lipoprotein(a)",
        value: "18",
        unit: "mg/dL",
        status: "normal",
        reference: "<30",
        previousValue: "20",
        previousDate: "2022-12-05",
      },
    ],
  },

  // February 2023 Reports
  {
    id: "file3",
    title: "Vitamin Panel",
    date: "2023-02-05",
    location: "Memorial Hospital",
    doctor: "Williams",
    metrics: 6,
    status: "normal",
    type: "vitamin",
    patientId: "12345678",
    insurance: "Blue Cross",
    technician: "Jennifer Davis",
    results: [
      {
        name: "Vitamin D, 25-OH",
        value: "32",
        unit: "ng/mL",
        status: "normal",
        reference: "30-100",
        previousValue: "28",
        previousDate: "2022-10-15",
      },
      {
        name: "Vitamin B12",
        value: "550",
        unit: "pg/mL",
        status: "normal",
        reference: "200-900",
        previousValue: "530",
        previousDate: "2022-10-15",
      },
      {
        name: "Folate",
        value: "15",
        unit: "ng/mL",
        status: "normal",
        reference: ">5.9",
        previousValue: "14",
        previousDate: "2022-10-15",
      },
    ],
  },
  {
    id: "file8",
    title: "Iron Studies",
    date: "2023-02-05", // Same date as Vitamin Panel
    location: "Memorial Hospital",
    doctor: "Williams",
    metrics: 4,
    status: "mixed",
    type: "vitamin",
    patientId: "12345678",
    insurance: "Blue Cross",
    technician: "Jennifer Davis",
    results: [
      {
        name: "Ferritin",
        value: "22",
        unit: "ng/mL",
        status: "low",
        reference: "30-400",
        previousValue: "28",
        previousDate: "2022-10-15",
      },
      {
        name: "Iron",
        value: "75",
        unit: "μg/dL",
        status: "normal",
        reference: "60-170",
        previousValue: "70",
        previousDate: "2022-10-15",
      },
      {
        name: "TIBC",
        value: "350",
        unit: "μg/dL",
        status: "normal",
        reference: "240-450",
        previousValue: "335",
        previousDate: "2022-10-15",
      },
    ],
  },

  // January 2023 Reports
  {
    id: "file4",
    title: "Thyroid Function",
    date: "2023-01-20",
    location: "Quest Diagnostics",
    doctor: "Johnson",
    metrics: 5,
    status: "mixed",
    type: "organ",
    patientId: "12345678",
    insurance: "Blue Cross",
    technician: "Robert Wilson",
    results: [
      {
        name: "TSH",
        value: "3.8",
        unit: "uIU/mL",
        status: "normal",
        reference: "0.4-4.0",
        previousValue: "3.5",
        previousDate: "2022-09-20",
      },
      {
        name: "Free T4",
        value: "0.9",
        unit: "ng/dL",
        status: "low",
        reference: "0.8-1.8",
        previousValue: "1.1",
        previousDate: "2022-09-20",
      },
      {
        name: "Free T3",
        value: "3.1",
        unit: "pg/mL",
        status: "normal",
        reference: "2.3-4.2",
        previousValue: "3.3",
        previousDate: "2022-09-20",
      },
    ],
  },

  // December 2022 Reports
  {
    id: "file5",
    title: "Comprehensive Metabolic Panel",
    date: "2022-12-15",
    location: "LabCorp",
    doctor: "Davis",
    metrics: 14,
    status: "normal",
    type: "blood",
    patientId: "12345678",
    insurance: "Blue Cross",
    technician: "Emily Thompson",
    results: [
      {
        name: "Sodium",
        value: "140",
        unit: "mmol/L",
        status: "normal",
        reference: "135-145",
        previousValue: "138",
        previousDate: "2022-08-15",
      },
      {
        name: "Potassium",
        value: "4.2",
        unit: "mmol/L",
        status: "normal",
        reference: "3.5-5.0",
        previousValue: "4.0",
        previousDate: "2022-08-15",
      },
      {
        name: "Chloride",
        value: "102",
        unit: "mmol/L",
        status: "normal",
        reference: "98-107",
        previousValue: "101",
        previousDate: "2022-08-15",
      },
      {
        name: "CO2",
        value: "24",
        unit: "mmol/L",
        status: "normal",
        reference: "20-29",
        previousValue: "25",
        previousDate: "2022-08-15",
      },
      {
        name: "Calcium",
        value: "9.5",
        unit: "mg/dL",
        status: "normal",
        reference: "8.5-10.5",
        previousValue: "9.4",
        previousDate: "2022-08-15",
      },
      {
        name: "Glucose",
        value: "95",
        unit: "mg/dL",
        status: "normal",
        reference: "70-99",
        previousValue: "92",
        previousDate: "2022-08-15",
      },
      {
        name: "BUN",
        value: "15",
        unit: "mg/dL",
        status: "normal",
        reference: "7-20",
        previousValue: "14",
        previousDate: "2022-08-15",
      },
      {
        name: "Creatinine",
        value: "0.9",
        unit: "mg/dL",
        status: "normal",
        reference: "0.6-1.2",
        previousValue: "0.8",
        previousDate: "2022-08-15",
      },
    ],
  },
  {
    id: "file9",
    title: "Kidney Function Panel",
    date: "2022-12-15", // Same date as CMP
    location: "LabCorp",
    doctor: "Davis",
    metrics: 3,
    status: "normal",
    type: "organ",
    patientId: "12345678",
    insurance: "Blue Cross",
    technician: "Emily Thompson",
    results: [
      {
        name: "eGFR",
        value: "92",
        unit: "mL/min/1.73m²",
        status: "normal",
        reference: ">60",
        previousValue: "90",
        previousDate: "2022-08-15",
      },
      {
        name: "Urine Albumin/Creatinine Ratio",
        value: "18",
        unit: "mg/g",
        status: "normal",
        reference: "<30",
        previousValue: "20",
        previousDate: "2022-08-15",
      },
    ],
  },
];

export function DocumentViewer() {
  const [activeReport, setActiveReport] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    sortOrder: "newest",
    showProgress: true,
    filter: "all",
    dateRange: "all",
  });
  const [activeTab, setActiveTab] = useState("all");
  const [expandedResults, setExpandedResults] = useState<{
    [key: string]: boolean;
  }>({});
  const [viewMode, setViewMode] = useState<"date" | "category">("date");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Function to get user's common test categories based on test history
  const getUserTestCategories = () => {
    const categoryCounts = {};
    mockReports.forEach((report) => {
      const reportType = report.type;
      if (categoryCounts[reportType]) {
        categoryCounts[reportType]++;
      } else {
        categoryCounts[reportType] = 1;
      }
    });

    // Sort by frequency and return top categories
    return Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([category]) => category);
  };

  const userCategories = getUserTestCategories();

  // Get display name for category
  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case "blood":
        return "Blood Tests";
      case "heart":
        return "Cardiac";
      case "vitamin":
        return "Vitamins";
      case "organ":
        return "Organ Function";
      case "urine":
        return "Urine Tests";
      default:
        return "General";
    }
  };

  // Get icon for category filter
  const getCategoryFilterIcon = (category: string) => {
    switch (category) {
      case "blood":
        return <Droplet className="h-4 w-4" />;
      case "heart":
        return <Heart className="h-4 w-4" />;
      case "vitamin":
        return <Activity className="h-4 w-4" />;
      case "organ":
        return <Brain className="h-4 w-4" />;
      case "urine":
        return <Beaker className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Handle category filter click
  const handleCategoryFilter = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const toggleResultExplanation = (reportId: string, resultIndex: number) => {
    const key = `${reportId}-${resultIndex}`;
    setExpandedResults((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isResultExplanationExpanded = (
    reportId: string,
    resultIndex: number
  ) => {
    const key = `${reportId}-${resultIndex}`;
    return !!expandedResults[key];
  };

  const handleReportClick = (id: string) => {
    setActiveReport(activeReport === id ? null : id);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case "blood":
        return <Droplet className="h-5 w-5 text-[#03659C]" />;
      case "heart":
        return <Heart className="h-5 w-5 text-[#03659C]" />;
      case "vitamin":
        return <Activity className="h-5 w-5 text-[#03659C]" />;
      case "organ":
        return <Brain className="h-5 w-5 text-[#03659C]" />;
      case "urine":
        return <Beaker className="h-5 w-5 text-[#03659C]" />;
      default:
        return <FileText className="h-5 w-5 text-[#03659C]" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return (
          <Badge
            variant="outline"
            className="pl-1.5 pr-3 py-1 text-xs rounded-md bg-green-50 border-green-200 text-green-800 flex items-center justify-center w-[100px] h-[28px]"
          >
            <span className="flex items-center">
              <span className="ml-1">😊 Balanced</span>
            </span>
          </Badge>
        );
      case "mixed":
        return (
          <Badge
            variant="outline"
            className="pl-2 pr-3 py-1 text-xs rounded-md bg-amber-50 border-amber-200 text-amber-800 flex items-center justify-center w-[100px] h-[28px]"
          >
            <span className="flex items-center">
              <span className="ml-1">🍎 Manage</span>
            </span>
          </Badge>
        );
      case "review":
        return (
          <Badge
            variant="outline"
            className="pl-1.5 pr-3 py-1 text-xs rounded-md bg-rose-50 border-rose-200 text-rose-800 flex items-center justify-center w-[100px] h-[28px]"
          >
            <span className="flex items-center">
              <span className="ml-1">🔍 Review</span>
            </span>
          </Badge>
        );
      default:
        return null;
    }
  };

  const getFreshnessIndicator = (date: string) => {
    const daysDifference = differenceInDays(new Date(), new Date(date));

    if (daysDifference <= 7) {
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 border-blue-200 text-blue-800 text-[10px]"
        >
          New
        </Badge>
      );
    }

    return null;
  };

  const parseReferenceRange = (reference: string) => {
    try {
      if (reference.startsWith("<")) {
        const max = parseFloat(reference.substring(1).trim());
        return { min: 0, max };
      } else if (reference.startsWith(">")) {
        const min = parseFloat(reference.substring(1).trim());
        return { min, max: min * 2 };
      } else if (reference.includes("-")) {
        const [min, max] = reference
          .split("-")
          .map((val) => parseFloat(val.trim()));
        return { min, max };
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  let filteredReports = [...mockReports];

  if (activeTab === "abnormal") {
    filteredReports = filteredReports.filter(
      (report) => report.status !== "normal"
    );
  } else if (activeTab === "recent") {
    filteredReports = filteredReports.filter((report) => {
      const daysDifference = differenceInDays(
        new Date(),
        new Date(report.date)
      );
      return daysDifference <= 30;
    });
  }

  if (searchQuery) {
    filteredReports = filteredReports.filter(
      (report) =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.results?.some((result) =>
          result.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }

  if (filters.filter === "recent-abnormal") {
    filteredReports = filteredReports.filter(
      (report) => report.status !== "normal"
    );
  } else if (filters.filter === "all-normal") {
    filteredReports = filteredReports.filter(
      (report) => report.status === "normal"
    );
  }

  if (filters.dateRange === "3m") {
    filteredReports = filteredReports.filter((report) => {
      return differenceInDays(new Date(), new Date(report.date)) <= 90;
    });
  } else if (filters.dateRange === "6m") {
    filteredReports = filteredReports.filter((report) => {
      return differenceInDays(new Date(), new Date(report.date)) <= 180;
    });
  } else if (filters.dateRange === "1y") {
    filteredReports = filteredReports.filter((report) => {
      return differenceInDays(new Date(), new Date(report.date)) <= 365;
    });
  }

  if (activeCategory) {
    filteredReports = filteredReports.filter(
      (report) => report.type === activeCategory
    );
  }

  filteredReports.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return filters.sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Group reports by date or category
  const groupReportsByMode = (reports) => {
    if (viewMode === "date") {
      // Group by date
      const groupedByDate = {};
      reports.forEach((report) => {
        const dateKey = format(new Date(report.date), "yyyy-MM-dd");
        if (!groupedByDate[dateKey]) {
          groupedByDate[dateKey] = [];
        }
        groupedByDate[dateKey].push(report);
      });

      // Convert to array and sort by date (newest first)
      return Object.entries(groupedByDate)
        .map(([date, reports]) => ({
          key: date,
          title: format(new Date(date), "MMMM d, yyyy"),
          reports,
        }))
        .sort((a, b) => new Date(b.key).getTime() - new Date(a.key).getTime());
    } else {
      // Group by category
      const groupedByCategory = {};
      reports.forEach((report) => {
        const categoryKey = report.type;
        if (!groupedByCategory[categoryKey]) {
          groupedByCategory[categoryKey] = [];
        }
        groupedByCategory[categoryKey].push(report);
      });

      // Convert to array
      return Object.entries(groupedByCategory)
        .map(([category, reports]) => ({
          key: category,
          title: getCategoryDisplayName(category),
          reports,
        }))
        .sort((a, b) => {
          // Sort by category with most recent report date first
          const aLatestDate = Math.max(
            ...a.reports.map((r) => new Date(r.date).getTime())
          );
          const bLatestDate = Math.max(
            ...b.reports.map((r) => new Date(r.date).getTime())
          );
          return bLatestDate - aLatestDate;
        });
    }
  };

  const groupedReports = groupReportsByMode(filteredReports);

  return (
    <div className="bg-white rounded-lg border border-[#E5F8FF] overflow-hidden">
      <div className="p-4 border-b border-[#E5F8FF]">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#03659C]/60 h-4 w-4" />
          <Input
            placeholder="Search lab reports or test names..."
            className="pl-9 bg-[#FAFEFF] border-[#E5F8FF] text-[#03659C] placeholder:text-[#03659C]/60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="flex justify-between w-full">
            <div className="flex items-center justify-end">
              <SmartFilter onFilterChange={handleFilterChange} />

              <span className="text-xs text-[#03659C]/70 ml-2">
                {filters.sortOrder === "newest"
                  ? "Sorted by newest"
                  : "Sorted by oldest"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-2 bg-[#FAFEFF]/60 border-b border-[#E5F8FF]">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-medium text-[#03659C]/70 mb-2">
            Filter by Category
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-[#03659C]/70 hover:bg-transparent hover:text-[#03659C]"
            onClick={() => setActiveCategory(null)}
          >
            <X className="h-3.5 w-3.5 mr-0" />
            clear filters
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {userCategories.map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className={cn(
                "text-[10px] border-[#03659C]/20 hover:bg-[#E5F8FF] py-0 px-2",
                activeCategory === category && "bg-[#E5F8FF]"
              )}
              onClick={() => handleCategoryFilter(category)}
            >
              {getCategoryFilterIcon(category)}
              <span className="ml-1 truncate max-w-[100px]">
                {getCategoryDisplayName(category)}
              </span>
            </Button>
          ))}
        </div>
      </div>

      <div className="max-h-[600px] overflow-y-auto">
        {groupedReports.length > 0 ? (
          <div>
            {groupedReports.map((group) => (
              <div key={group.key} className="border-b border-[#E5F8FF]">
                <div className="px-4 py-2 bg-[#FAFEFF]/80">
                  <h3 className="text-sm font-medium text-[#03659C]">
                    {group.title}
                  </h3>
                </div>
                {group.reports.map((report) => (
                  <div
                    key={report.id}
                    className="border-b border-[#E5F8FF] last:border-b-0 relative"
                  >
                    <button
                      onClick={() => handleReportClick(report.id)}
                      className={cn(
                        "w-full p-4 flex items-center justify-between text-left hover:bg-[#FAFEFF]/60 transition-colors",
                        activeReport === report.id && "bg-[#FAFEFF]",
                        report.status === "review" && "bg-rose-50/30"
                      )}
                    >
                      <div className="flex items-center flex-1 min-w-0">
                        <div
                          className={cn(
                            "p-2 rounded-full mr-3 flex-shrink-0",
                            report.status === "normal"
                              ? "bg-[#E5F8FF]"
                              : report.status === "mixed"
                              ? "bg-amber-50"
                              : "bg-rose-50"
                          )}
                        >
                          {getReportIcon(report.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start">
                            <h3 className="font-medium text-[#03659C] break-words">
                              {report.title}
                            </h3>
                            {differenceInDays(
                              new Date(),
                              new Date(report.date)
                            ) <= 14 && (
                              <span className="ml-2 flex-shrink-0">
                                {getFreshnessIndicator(report.date)}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center text-xs text-[#03659C]/70 mt-1 gap-y-1">
                            {viewMode === "category" && (
                              <div className="flex items-center mr-3">
                                <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                                <span>
                                  {format(new Date(report.date), "MMM d, yyyy")}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center mr-3">
                              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                              <span className="truncate max-w-[120px]">
                                {report.location}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1 flex-shrink-0" />
                              <span className="truncate max-w-[100px]">
                                Dr. {report.doctor}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center ml-2">
                        {getStatusBadge(report.status)}
                        {activeReport === report.id ? (
                          <ChevronDown className="h-4 w-4 text-[#03659C]/60" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-[#03659C]/60" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {activeReport === report.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 pb-4"
                        >
                          <div className="bg-[#FAFEFF] p-3 rounded-lg mb-3">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-[#03659C]">
                                Patient ID: {report.patientId}
                              </span>
                              <span className="text-xs bg-[#E5F8FF] pl-2 pr-3 py-1rounded-full text-[#03659C]">
                                Insurance: {report.insurance}
                              </span>
                            </div>
                            <div className="text-xs text-[#03659C]/70 grid grid-cols-1 sm:grid-cols-3 gap-1">
                              <p>Technician: {report.technician}</p>
                              <p>Ordered by: Dr. {report.doctor}</p>
                              <p>
                                Collection time:{" "}
                                {format(new Date(report.date), "h:mm a")}
                              </p>
                            </div>
                          </div>

                          <div className="bg-[#E5F8FF] p-3 rounded-lg mb-3 text-xs text-[#03659C]">
                            <p className="font-medium">
                              Understanding your results:
                            </p>
                            <p>
                              Results outside the reference range may need
                              attention. Discuss with your healthcare provider.
                            </p>
                          </div>

                          <div className="bg-white rounded-lg border border-[#E5F8FF] overflow-hidden">
                            <div className="grid grid-cols-12 gap-2 p-3 border-b border-[#E5F8FF] bg-[#FAFEFF] text-xs font-medium text-[#03659C]">
                              <div className="col-span-4 px-2">Test</div>
                              <div className="col-span-2 text-right px-2">
                                Result
                              </div>
                              <div className="col-span-2 text-right px-2">
                                Range
                              </div>
                              <div className="col-span-2 text-right px-2">
                                Status
                              </div>
                              {filters.showProgress && (
                                <div className="col-span-2 text-right px-2">
                                  Trend
                                </div>
                              )}
                            </div>

                            {report.results.map((result, index) => {
                              const normalRange = parseReferenceRange(
                                result.reference
                              );
                              const resultKey = `${report.id}-${index}`;
                              const showExplanation =
                                isResultExplanationExpanded(report.id, index);

                              return (
                                <Fragment key={index}>
                                  <div
                                    className={cn(
                                      "grid grid-cols-12 gap-2 py-3 px-1 text-xs text-[#03659C] cursor-pointer hover:bg-[#FAFEFF]/80 transition-colors",
                                      index % 2 === 0
                                        ? "bg-white"
                                        : "bg-[#FAFEFF]",
                                      result.status !== "normal" &&
                                        "bg-amber-50/50",
                                      showExplanation &&
                                        "border-b border-dashed border-gray-200"
                                    )}
                                    onClick={() =>
                                      result.status !== "normal" &&
                                      toggleResultExplanation(report.id, index)
                                    }
                                  >
                                    <div className="col-span-4 font-medium flex items-center px-2">
                                      {result.name}
                                      {result.status !== "normal" && (
                                        <SimpleTooltip content="Click for more information">
                                          <AlertCircle className="h-3 w-3 ml-1 text-amber-500" />
                                        </SimpleTooltip>
                                      )}
                                    </div>
                                    <div className="col-span-2 text-right font-medium px-2">
                                      {result.value}{" "}
                                      <span className="font-normal text-[#03659C]/80">
                                        {result.unit}
                                      </span>
                                    </div>
                                    <div className="col-span-2 text-right text-[#03659C]/70 px-2">
                                      {result.reference}
                                    </div>
                                    <div className="col-span-2 text-right px-2">
                                      {result.status === "normal" ? (
                                        <span className="text-teal-500 flex items-center justify-end">
                                          <CheckCircle className="h-3 w-3 mr-1.5" />
                                          Normal
                                        </span>
                                      ) : result.status === "high" ? (
                                        <span className="text-amber-500 flex items-center justify-end">
                                          <AlertTriangle className="h-3 w-3 mr-1.5" />
                                          High
                                        </span>
                                      ) : (
                                        <span className="text-rose-500 flex items-center justify-end">
                                          <AlertCircle className="h-3 w-3 mr-1.5" />
                                          Low
                                        </span>
                                      )}
                                    </div>
                                    {filters.showProgress && (
                                      <div className="col-span-2 text-right px-2">
                                        {result.previousValue ? (
                                          <div className="flex justify-end items-center">
                                            <TrendIndicator
                                              currentValue={result.value}
                                              previousValue={
                                                result.previousValue
                                              }
                                              unit={result.unit}
                                              normalRange={normalRange}
                                            />
                                            <SimpleTooltip
                                              content={`Previous test: ${format(
                                                new Date(result.previousDate),
                                                "MMM d, yyyy"
                                              )}`}
                                              side="left"
                                              className="text-xs"
                                            >
                                              <Calendar className="h-3 w-3 ml-1 text-[#03659C]/40" />
                                            </SimpleTooltip>
                                          </div>
                                        ) : (
                                          <span className="text-[#03659C]/40">
                                            No history
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  {result.status !== "normal" &&
                                    showExplanation && (
                                      <div
                                        className={cn(
                                          "col-span-12 px-3 pb-2",
                                          index % 2 === 0
                                            ? "bg-white"
                                            : "bg-[#FAFEFF]",
                                          result.status !== "normal" &&
                                            "bg-amber-50/50"
                                        )}
                                      >
                                        <ResultExplanation
                                          testName={result.name}
                                          value={result.value}
                                          unit={result.unit}
                                          status={result.status}
                                        />
                                      </div>
                                    )}
                                </Fragment>
                              );
                            })}
                          </div>

                          {report.results.some(
                            (r) => r.status !== "normal"
                          ) && (
                            <div className="mt-3 mb-3 p-3 rounded-lg border border-amber-100 bg-amber-50/30">
                              <h4 className="text-sm font-medium flex items-center text-amber-800 mb-2">
                                <AlertTriangle className="h-4 w-4 mr-1.5" />
                                Important Results Summary
                              </h4>
                              <p className="text-xs text-amber-800 mb-2">
                                This report contains{" "}
                                {
                                  report.results.filter(
                                    (r) => r.status !== "normal"
                                  ).length
                                }{" "}
                                result(s) that fall outside the reference range.
                                Click each abnormal result for more information.
                              </p>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-white border-amber-200 text-amber-800 hover:bg-amber-50 text-xs"
                              >
                                Schedule Follow-up
                              </Button>
                            </div>
                          )}

                          <div className="flex flex-wrap justify-end mt-3 gap-2">
                            <SimpleTooltip
                              content="Share with your doctor"
                              side="bottom"
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-[#03659C] border-[#03659C]/20"
                              >
                                <Share2 className="h-4 w-4 mr-1.5" />
                                Share
                              </Button>
                            </SimpleTooltip>

                            <Button
                              variant="outline"
                              size="sm"
                              className="text-[#03659C] border-[#03659C]/20"
                            >
                              <Download className="h-4 w-4 mr-1.5" />
                              Download PDF
                            </Button>

                            <Button size="sm" className="bg-[#03659C]">
                              <Activity className="h-4 w-4 mr-1.5" />
                              Track Metrics
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-[#03659C]/70">
            <FileText className="h-12 w-12 mx-auto mb-2 text-[#03659C]/40" />
            <p className="font-medium text-[#03659C]">No lab reports found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
            {searchQuery && (
              <Button
                variant="link"
                className="mt-2 text-[#03659C]"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
