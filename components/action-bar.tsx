"use client";

import { useState } from "react";
import { Share2, MessageSquare, Calendar, FileText, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Status } from "@/context/patient-context";
import Link from "next/link";

interface ActionBarProps {
  status: Status;
}

export function ActionBar({ status }: ActionBarProps) {
  const [showShare, setShowShare] = useState(false);

  // Social sharing platforms
  const shareOptions = [
    { name: "Copy Link", icon: "🔗", action: () => handleCopyLink() },
    { name: "Email", icon: "📧", action: () => handleShareViaEmail() },
    { name: "Text", icon: "💬", action: () => handleShareViaText() },
  ];

  // Handler for copy link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
    setShowShare(false);
  };

  // Handler for email sharing
  const handleShareViaEmail = () => {
    const subject = "Check out my health results";
    const body = `I wanted to share my latest health results with you: ${window.location.href}`;
    window.open(
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        body
      )}`
    );
    setShowShare(false);
  };

  // Handler for text message sharing
  const handleShareViaText = () => {
    // Uses the Web Share API if available
    if (navigator.share) {
      navigator
        .share({
          title: "My Health Results",
          text: "Check out my latest health results",
          url: window.location.href,
        })
        .then(() => setShowShare(false))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support Web Share API
      alert("Text sharing is not supported in your browser");
      setShowShare(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-16 px-3 relative">
          {/* Primary action based on status */}
          {status === "consult" ? (
            <Button className="flex-1 bg-[#03659C] mx-1 rounded-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Book Consultation
            </Button>
          ) : status === "book" ? (
            <Button className="flex-1 bg-[#03659C] mx-1 rounded-full">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Test
            </Button>
          ) : (
            <Link href="/messages" className="flex-1 mx-1">
              <Button className="w-full bg-[#03659C] rounded-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask Health Coach
              </Button>
            </Link>
          )}

          {/* View Reports Button */}
          <Link href="/reports" className="mx-1">
            <Button
              variant="outline"
              className="border-[#03659C]/20 text-[#03659C]"
            >
              <FileText className="h-4 w-4" />
            </Button>
          </Link>

          {/* Share Button with Tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="border-[#03659C]/20 text-[#03659C]"
                  onClick={() => setShowShare(!showShare)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Share your results</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Info Button with Tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="border-[#03659C]/20 text-[#03659C]"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Learn more</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Share popup */}
          <AnimatePresence>
            {showShare && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-20 right-2 bg-white p-3 rounded-lg shadow-lg border border-[#E5F8FF] w-48"
              >
                <h3 className="text-sm font-medium text-[#03659C] mb-2">
                  Share via
                </h3>
                <div className="space-y-2">
                  {shareOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={option.action}
                      className="flex items-center w-full p-2 rounded-md hover:bg-[#E5F8FF] text-left text-sm text-gray-700"
                    >
                      <span
                        className="text-lg mr-2"
                        role="img"
                        aria-label={option.name}
                      >
                        {option.icon}
                      </span>
                      {option.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
