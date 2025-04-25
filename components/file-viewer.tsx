"use client"

import { useState } from "react"
import { Search, Filter, Calendar, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FileViewerItem } from "@/components/file-viewer-item"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for file viewer
const mockFiles = [
  {
    id: "file1",
    title: "Complete Blood Panel",
    date: "2023-04-15",
    location: "Quest Diagnostics",
    doctor: "Johnson",
    metrics: 12,
  },
  {
    id: "file2",
    title: "Lipid Panel",
    date: "2023-03-10",
    location: "LabCorp",
    doctor: "Smith",
    metrics: 8,
  },
  {
    id: "file3",
    title: "Vitamin Panel",
    date: "2023-02-05",
    location: "Memorial Hospital",
    doctor: "Williams",
    metrics: 6,
  },
  {
    id: "file4",
    title: "Thyroid Function",
    date: "2023-01-20",
    location: "Quest Diagnostics",
    doctor: "Johnson",
    metrics: 5,
  },
  {
    id: "file5",
    title: "Comprehensive Metabolic Panel",
    date: "2022-12-15",
    location: "LabCorp",
    doctor: "Davis",
    metrics: 14,
  },
]

export function FileViewer() {
  const [activeFile, setActiveFile] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const handleFileClick = (id: string) => {
    setActiveFile(activeFile === id ? null : id)
  }

  // Filter files based on search query
  const filteredFiles = mockFiles.filter(
    (file) =>
      file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="bg-white rounded-lg border border-[#E5F8FF] overflow-hidden">
      <div className="p-4 border-b border-[#E5F8FF]">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#03659C]/60 h-4 w-4" />
          <Input
            placeholder="Search lab reports"
            className="pl-9 bg-[#FAFEFF] border-[#E5F8FF] text-[#03659C] placeholder:text-[#03659C]/60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="date" className="w-full">
          <TabsList className="grid grid-cols-2 mb-2">
            <TabsTrigger value="date" className="text-[#03659C]">
              <Calendar className="h-4 w-4 mr-2" />
              By Date
            </TabsTrigger>
            <TabsTrigger value="type" className="text-[#03659C]">
              <FileText className="h-4 w-4 mr-2" />
              By Type
            </TabsTrigger>
          </TabsList>

          <TabsContent value="date" className="mt-0">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Button
                variant={activeFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(null)}
                className={activeFilter === null ? "bg-[#03659C]" : "border-[#03659C]/20 text-[#03659C]"}
              >
                All
              </Button>
              <Button
                variant={activeFilter === "2023" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("2023")}
                className={activeFilter === "2023" ? "bg-[#03659C]" : "border-[#03659C]/20 text-[#03659C]"}
              >
                2023
              </Button>
              <Button
                variant={activeFilter === "2022" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("2022")}
                className={activeFilter === "2022" ? "bg-[#03659C]" : "border-[#03659C]/20 text-[#03659C]"}
              >
                2022
              </Button>
              <Button variant="outline" size="sm" className="border-[#03659C]/20 text-[#03659C]">
                <Filter className="h-4 w-4 mr-1" />
                More
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="type" className="mt-0">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Button
                variant={activeFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(null)}
                className={activeFilter === null ? "bg-[#03659C]" : "border-[#03659C]/20 text-[#03659C]"}
              >
                All
              </Button>
              <Button
                variant={activeFilter === "blood" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("blood")}
                className={activeFilter === "blood" ? "bg-[#03659C]" : "border-[#03659C]/20 text-[#03659C]"}
              >
                Blood Panels
              </Button>
              <Button
                variant={activeFilter === "vitamin" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("vitamin")}
                className={activeFilter === "vitamin" ? "bg-[#03659C]" : "border-[#03659C]/20 text-[#03659C]"}
              >
                Vitamin Panels
              </Button>
              <Button variant="outline" size="sm" className="border-[#03659C]/20 text-[#03659C]">
                <Filter className="h-4 w-4 mr-1" />
                More
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="max-h-[500px] overflow-y-auto">
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file) => (
            <FileViewerItem
              key={file.id}
              id={file.id}
              title={file.title}
              date={file.date}
              location={file.location}
              doctor={file.doctor}
              metrics={file.metrics}
              onClick={handleFileClick}
              isActive={activeFile === file.id}
            />
          ))
        ) : (
          <div className="p-8 text-center text-[#03659C]/70">
            <FileText className="h-12 w-12 mx-auto mb-2 text-[#03659C]/40" />
            <p className="font-medium text-[#03659C]">No lab reports found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
