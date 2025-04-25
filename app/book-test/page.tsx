"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { TopBar } from "@/components/top-bar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

export default function BookTestPage() {
  const [testType, setTestType] = useState("")
  const [lab, setLab] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState("")
  const [useInsurance, setUseInsurance] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!testType || !lab || !date || !time) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Appointment booked",
        description: `Your ${testType} test is scheduled for ${format(date, "PPP")} at ${time}`,
      })

      setIsSubmitting(false)
      router.push("/results")
    }, 1500)
  }

  return (
    <div>
      <TopBar title="Book a Test" />

      <div className="p-4">
        <h1 className="text-xl font-semibold mb-6">Schedule a Lab Test</h1>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <Label htmlFor="test-type">Test Type</Label>
            <Select value={testType} onValueChange={setTestType}>
              <SelectTrigger id="test-type">
                <SelectValue placeholder="Select a test" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blood-panel">Complete Blood Panel</SelectItem>
                <SelectItem value="cholesterol">Cholesterol Test</SelectItem>
                <SelectItem value="a1c">A1C Test</SelectItem>
                <SelectItem value="vitamin-panel">Vitamin Panel</SelectItem>
                <SelectItem value="thyroid">Thyroid Function</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lab-location">Lab Location</Label>
            <Select value={lab} onValueChange={setLab}>
              <SelectTrigger id="lab-location">
                <SelectValue placeholder="Select a lab" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quest">Quest Diagnostics</SelectItem>
                <SelectItem value="labcorp">LabCorp</SelectItem>
                <SelectItem value="hospital">Memorial Hospital</SelectItem>
                <SelectItem value="clinic">Community Clinic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal" id="date">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="time">
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9:00">9:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="11:00">11:00 AM</SelectItem>
                <SelectItem value="13:00">1:00 PM</SelectItem>
                <SelectItem value="14:00">2:00 PM</SelectItem>
                <SelectItem value="15:00">3:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="insurance">Use Insurance</Label>
              <p className="text-sm text-muted-foreground">We'll bill your insurance on file</p>
            </div>
            <Switch id="insurance" checked={useInsurance} onCheckedChange={setUseInsurance} />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </Button>
        </motion.form>
      </div>
    </div>
  )
}
