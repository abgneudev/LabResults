"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SimpleTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  className?: string;
}

export function SimpleTooltip({
  children,
  content,
  side = "top",
  align = "center",
  delayDuration = 300,
  className,
}: SimpleTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, delayDuration);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(false);
  };

  const getPosition = () => {
    if (!triggerRef.current) return { top: 0, left: 0 };

    const rect = triggerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;

    let top = rect.top + scrollY;
    let left = rect.left + scrollX;

    switch (side) {
      case "top":
        top = rect.top + scrollY - 8;
        left = rect.left + scrollX + rect.width / 2;
        if (align === "start") left = rect.left + scrollX;
        if (align === "end") left = rect.right + scrollX;
        break;
      case "right":
        top = rect.top + scrollY + rect.height / 2;
        left = rect.right + scrollX + 8;
        if (align === "start") top = rect.top + scrollY;
        if (align === "end") top = rect.bottom + scrollY;
        break;
      case "bottom":
        top = rect.bottom + scrollY + 8;
        left = rect.left + scrollX + rect.width / 2;
        if (align === "start") left = rect.left + scrollX;
        if (align === "end") left = rect.right + scrollX;
        break;
      case "left":
        top = rect.top + scrollY + rect.height / 2;
        left = rect.left + scrollX - 8;
        if (align === "start") top = rect.top + scrollY;
        if (align === "end") top = rect.bottom + scrollY;
        break;
    }

    return { top, left };
  };

  const getTransform = () => {
    switch (side) {
      case "top":
        return { x: "-50%", y: "-100%" };
      case "right":
        return { x: "0%", y: "-50%" };
      case "bottom":
        return { x: "-50%", y: "0%" };
      case "left":
        return { x: "-100%", y: "-50%" };
      default:
        return { x: "-50%", y: "-100%" };
    }
  };

  const position = getPosition();
  const transform = getTransform();

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-flex relative"
    >
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              transform: `translate(${transform.x}, ${transform.y})`,
            }}
            className={cn(
              "z-50 px-3 py-1.5 text-xs rounded-md bg-zinc-900 text-white shadow-md",
              className
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
