"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Calendar, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ActionBarProps {
  status: string;
  className?: string;
}

export function ActionBar({ status, className }: ActionBarProps) {
  // Don't show the action bar for normal results
  if (status === "balanced") {
    return null;
  }

  const handleAction = (action: string) => {
    alert(`Coming soon: ${action}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5F8FF] shadow-lg p-3 z-40 flex justify-around max-w-md mx-auto",
        className
      )}
    >
      <Button
        variant="outline"
        className="flex-1 mx-1 border-[#03659C]/20 text-[#03659C]"
        onClick={() => handleAction("Book Visit")}
      >
        <Calendar className="h-4 w-4 mr-2" />
        Book Visit
      </Button>
      <Button
        className="flex-1 mx-1 bg-[#03659C]"
        onClick={() => handleAction("Call Nurse")}
      >
        <Phone className="h-4 w-4 mr-2" />
        Call Nurse
      </Button>
      <Button
        variant="outline"
        className="flex-1 mx-1 border-[#03659C]/20 text-[#03659C]"
        onClick={() => handleAction("Quick Message")}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        Quick Message
      </Button>
    </motion.div>
  );
}
