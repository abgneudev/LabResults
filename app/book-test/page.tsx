"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { TopBar } from "@/components/top-bar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Droplet,
  Heart,
  Pill,
  Flask,
  Activity,
  ChevronRight,
  Sun,
  ClipboardCheck,
} from "lucide-react";

// Lab test data model
const labTests = [
  {
    id: "blood",
    icon: <Droplet size={20} />,
    label: "Blood Panel",
    why: "Broad screen for anemia, infection & organ health",
    price: 39,
  },
  {
    id: "lipids",
    icon: <Heart size={20} />,
    label: "Cholesterol",
    why: "Checks LDL / HDL to gauge heart-disease risk",
    price: 29,
  },
  {
    id: "a1c",
    icon: <Activity size={20} />,
    label: "A1C Test",
    why: "Monitors blood sugar control over the past 3 months",
    price: 25,
  },
  {
    id: "vitamin",
    icon: <Sun size={20} />,
    label: "Vitamin Panel",
    why: "Assesses vitamin levels including D, B12, and folate",
    price: 45,
  },
  {
    id: "thyroid",
    icon: <Flask size={20} />,
    label: "Thyroid Function",
    why: "Checks thyroid hormone levels to evaluate metabolism",
    price: 35,
  },
  {
    id: "medication",
    icon: <Pill size={20} />,
    label: "Medication Levels",
    why: "Monitors therapeutic drug levels in your bloodstream",
    price: 0,
  },
  {
    id: "comprehensive",
    icon: <ClipboardCheck size={20} />,
    label: "Comprehensive",
    why: "Complete health assessment with all major panels",
    price: 0,
  },
];

// Lab Test Card Component
const LabTestCard = ({
  test,
  onClick,
  isSelected,
}: {
  test: (typeof labTests)[0];
  onClick: () => void;
  isSelected: boolean;
}) => {
  const priceDisplay = test.price === 0 ? "Included" : `$${test.price}`;

  return (
    <button
      type="button"
      className={`bg-white rounded-xl ${
        isSelected ? "shadow-md ring-2 ring-[#03659C]" : "shadow-sm"
      } hover:shadow-md p-4 flex flex-col gap-2 w-full text-left transition-all hover:translate-y-[-2px] hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#03659C]/40`}
      onClick={onClick}
      aria-label={`${test.label} – ${
        test.price === 0 ? "Included" : `${test.price} dollars`
      } – ${test.why}`}
      aria-pressed={isSelected}
    >
      <div className="w-10 h-10 rounded-full bg-[#E5F8FF] flex items-center justify-center mb-2">
        <div className="text-[#03659C]">{test.icon}</div>
      </div>

      <div className="text-sm font-semibold text-[#03659C]">{test.label}</div>

      <div className="text-xs text-gray-600 line-clamp-3">{test.why}</div>

      <div className="flex justify-between items-center mt-3">
        <span className="text-sm font-medium text-[#03659C]">
          {priceDisplay}
        </span>
        <ChevronRight size={16} className="text-[#03659C]" />
      </div>
    </button>
  );
};

export default function BookTestPage() {
  const searchParams = useSearchParams();
  const [testType, setTestType] = useState("");
  const [lab, setLab] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [useInsurance, setUseInsurance] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  // Use the built-in searchParams hook from next/navigation for client-side
  useEffect(() => {
    const typeParam = searchParams.get("type");

    if (typeParam) {
      setTestType(typeParam);
      setSelectedCard(typeParam);
    }
  }, [searchParams]);

  const handleTestSelect = (testId: string) => {
    setSelectedCard(testId);
    setTestType(testId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!testType || !lab || !date || !time) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Appointment booked",
        description: `Your ${testType} test is scheduled for ${format(
          date,
          "PPP"
        )} at ${time}`,
      });

      setIsSubmitting(false);
      router.push("/results");
    }, 1500);
  };

  return (
    <div>
      <TopBar title="Book a Test" />

      <div className="p-4">
        <h1 className="text-xl font-semibold mb-6">Schedule a Lab Test</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-lg font-medium mb-4">Choose a Test</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {labTests.map((test) => (
              <LabTestCard
                key={test.id}
                test={test}
                onClick={() => handleTestSelect(test.id)}
                isSelected={test.id === selectedCard}
              />
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
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
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  id="date"
                >
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
              <p className="text-sm text-muted-foreground">
                We'll bill your insurance on file
              </p>
            </div>
            <Switch
              id="insurance"
              checked={useInsurance}
              onCheckedChange={setUseInsurance}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !selectedCard}
          >
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </Button>
        </motion.form>
      </div>
    </div>
  );
}
