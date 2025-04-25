"use client";

import { useState, useEffect } from "react";

// This hook simulates fetching AI-generated interpretations of lab results
// In a real implementation, this would call an AI service
export function useResultInterpretation(status: string) {
  const [summary, setSummary] = useState<string>("");
  const [recommendation, setRecommendation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const generateInterpretation = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Generate different interpretations based on status
        switch (status) {
          case "balanced":
            setSummary(
              "Your result is within the normal range, which is a positive sign for your overall health. Values in this range typically indicate normal physiological function."
            );
            setRecommendation(
              "Continue your current health practices including a balanced diet, regular exercise, and follow-up testing as recommended by your healthcare provider."
            );
            break;
          case "manage":
            setSummary(
              "Your result is outside the optimal range but doesn't require immediate medical attention. This could be influenced by diet, exercise, stress, medications, or other factors."
            );
            setRecommendation(
              "Consider lifestyle adjustments such as dietary changes, increased physical activity, or stress management techniques. Monitor this value more frequently and discuss with your healthcare provider at your next visit."
            );
            break;
          case "consult":
            setSummary(
              "Your result is significantly outside the expected range, which may indicate a health concern that requires attention. Various factors could be contributing to this result."
            );
            setRecommendation(
              "It's recommended to consult with your healthcare provider soon to discuss this result. They may want to perform additional tests or discuss treatment options. Don't make significant changes to medications or health routines without professional guidance."
            );
            break;
          case "book":
            setSummary(
              "This test needs to be scheduled or completed. Regular monitoring is important to establish baselines and track changes over time."
            );
            setRecommendation(
              "Book an appointment for this test at your convenience. Regular testing helps your healthcare provider monitor your health effectively and catch potential issues early."
            );
            break;
          default:
            setSummary(
              "This result provides information about your current health status."
            );
            setRecommendation(
              "Follow your healthcare provider's recommendations for any follow-up actions."
            );
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };

    generateInterpretation();
  }, [status]);

  return { summary, recommendation, isLoading, error };
}
