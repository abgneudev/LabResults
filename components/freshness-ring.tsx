"use client";

import { ProgressRing } from "./progress-ring";

interface FreshnessRingProps {
  daysSinceLastTest: number;
  className?: string;
}

export function FreshnessRing({
  daysSinceLastTest,
  className,
}: FreshnessRingProps) {
  // Calculate progress as days since last test / 90 days (goal)
  const progress = Math.min(100, (daysSinceLastTest / 90) * 100);

  // Determine color based on days since last test
  let color = "#03659C"; // 0-90 days (blue)
  if (daysSinceLastTest > 180) {
    color = "#DC2626"; // > 180 days (red-600)
  } else if (daysSinceLastTest > 90) {
    color = "#F59E0B"; // 91-180 days (amber-500)
  }

  return (
    <div
      className={className}
      role="progressbar"
      aria-valuenow={daysSinceLastTest}
      aria-valuemax={90}
    >
      <ProgressRing
        size={64}
        progress={progress}
        strokeWidth={6}
        label={`${daysSinceLastTest}`}
        sublabel="days"
        color={color}
      />
    </div>
  );
}
