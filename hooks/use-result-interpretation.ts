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
              "Your result is within the normal range, which is a positive sign for your overall health. This indicates your body is functioning as expected for this measurement."
            );
            setRecommendation(
              "Maintain your current health practices and continue with regular check-ups as recommended by your healthcare provider."
            );
            break;
          case "manage":
            setSummary(
              "Your result is outside the optimal range but doesn't require immediate medical attention. Several factors like diet, exercise, stress, or medications could be influencing this value."
            );
            setRecommendation(
              "Consider reviewing your lifestyle habits such as diet, physical activity, and stress management. Monitor this value more regularly and discuss it at your next healthcare visit."
            );
            break;
          case "consult":
            setSummary(
              "Your result falls significantly outside the expected range, which may indicate a health concern that warrants attention. This could be related to various underlying factors."
            );
            setRecommendation(
              "We recommend consulting with your healthcare provider soon to discuss this result. They may suggest additional testing or treatment options. Continue following your current medication and health routines until you receive professional guidance."
            );
            break;
          case "book":
            setSummary(
              "This test needs to be scheduled. Regular monitoring helps establish your personal baselines and track important changes over time."
            );
            setRecommendation(
              "Schedule this test at your convenience. Consistent testing allows your healthcare provider to monitor your health effectively and address potential concerns early."
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
