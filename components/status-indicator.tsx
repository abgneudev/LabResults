import { cn } from "@/lib/utils";
import { CheckCircle, Phone, AlertCircle } from "lucide-react";
import type { Status } from "@/context/patient-context";

interface StatusIndicatorProps {
  status: Status;
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function StatusIndicator({
  status,
  className,
  showText = true,
  size = "md",
}: StatusIndicatorProps) {
  // Updated status config with pastel colors and new labels
  const statusConfig = {
    balanced: {
      icon: CheckCircle,
      text: "Balanced",
      color: "bg-teal-100 text-teal-700 border-teal-200",
      outlineColor: "border-teal-200 text-teal-700 bg-white",
      iconColor: "text-teal-500",
      emoji: "😊",
      accessibleLabel: "Status: Balanced",
    },
    manage: {
      icon: AlertCircle,
      text: "Manage",
      color: "bg-amber-100 text-amber-700 border-amber-200",
      outlineColor: "border-amber-200 text-amber-700 bg-white",
      iconColor: "text-amber-500",
      emoji: "🍎",
      accessibleLabel: "Status: Needs management",
    },
    consult: {
      icon: Phone,
      text: "Consult",
      color: "bg-white text-red-600 border-red-200",
      outlineColor: "border-red-200 text-red-600 bg-white",
      iconColor: "text-red-600",
      emoji: "📞",
      accessibleLabel: "Status: Needs consultation",
    },
    book: {
      icon: () => <span className="text-lg">📅</span>,
      text: "Schedule",
      color: "bg-blue-100 text-[#03659C] border-blue-200",
      outlineColor: "border-blue-200 text-[#03659C] bg-white",
      iconColor: "text-[#03659C]",
      emoji: "📅",
      accessibleLabel: "Status: Schedule test",
    },
  };

  const sizeClasses = {
    sm: "text-xs py-0.5 px-2",
    md: "text-sm py-1 px-2.5",
    lg: "text-base py-1.5 px-3",
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20,
  };

  // Using outline style for manage and consult
  const {
    icon: Icon,
    text,
    outlineColor,
    color,
    iconColor,
    emoji,
    accessibleLabel,
  } = statusConfig[status];
  const useOutline = status === "manage" || status === "consult";
  const styleColor = useOutline ? outlineColor : color;

  if (!showText) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full",
          iconColor,
          className
        )}
        aria-label={accessibleLabel}
        role="status"
      >
        {status === "balanced" ? (
          <span role="img" aria-hidden="true">
            😊
          </span>
        ) : status === "manage" ? (
          <span role="img" aria-hidden="true">
            🍎
          </span>
        ) : status === "consult" ? (
          <Phone
            size={iconSizes[size]}
            className="stroke-[1.5px]"
            aria-hidden="true"
          />
        ) : (
          <span className="text-base" role="img" aria-hidden="true">
            📅
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full font-medium border",
        styleColor,
        sizeClasses[size],
        className,
        // Added responsive adjustments for mobile
        "sm:whitespace-nowrap",
        size === "lg" ? "sm:text-base text-sm" : "" // Reduce text size on small screens for large indicators
      )}
      role="status"
      aria-label={accessibleLabel}
    >
      {status === "balanced" ? (
        <span role="img" aria-hidden="true" className="mr-1.5">
          😊
        </span>
      ) : status === "manage" ? (
        <span role="img" aria-hidden="true" className="mr-1.5">
          🍎
        </span>
      ) : status === "consult" ? (
        <Phone
          className={cn(
            "mr-1.5 stroke-[1.5px]",
            size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5"
          )}
          aria-hidden="true"
        />
      ) : (
        <span className="mr-1.5" role="img" aria-hidden="true">
          📅
        </span>
      )}
      {text}
    </div>
  );
}
