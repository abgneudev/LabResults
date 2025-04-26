"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Upload, FileText, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { usePatient } from "@/context/patient-context";
import { Button } from "@/components/ui/button";

export function UploadDropzone() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const { toast } = useToast();
  const router = useRouter();
  const { addReport } = usePatient();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);

    try {
      // Mock API call to parse the PDF
      // In a real app, this would send the file to the server
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful parsing
      const mockParsedData = {
        id: Date.now().toString(),
        filename: file.name,
        uploadDate: new Date().toISOString(),
        metrics: [
          {
            id: "cholesterol",
            name: "Total Cholesterol",
            value: 185,
            unit: "mg/dL",
            status: "balanced",
            category: "blood",
            lastUpdated: new Date().toISOString(),
          },
        ],
      };

      addReport(mockParsedData);
      setUploadStatus("success");

      toast({
        title: "Upload successful",
        description: "Your lab results have been processed",
      });

      // Redirect to results page after a short delay
      setTimeout(() => {
        router.push("/results");
      }, 1500);
    } catch (error) {
      setUploadStatus("error");
      toast({
        title: "Upload failed",
        description: "There was an error processing your file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {uploadStatus === "idle" ? (
          <>
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Upload Lab Results</h3>
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop your PDF file here, or click to select
            </p>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                variant="outline"
                className="cursor-pointer"
                disabled={isUploading}
                type="button"
              >
                Select PDF
              </Button>
            </label>
          </>
        ) : uploadStatus === "success" ? (
          <div className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Upload Complete</h3>
            <p className="text-sm text-gray-500">
              Your lab results have been processed
            </p>
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Upload Failed</h3>
            <p className="text-sm text-gray-500 mb-4">
              There was an error processing your file
            </p>
            <Button
              variant="outline"
              onClick={() => setUploadStatus("idle")}
              type="button"
            >
              Try Again
            </Button>
          </div>
        )}
      </motion.div>

      {file && uploadStatus === "idle" && (
        <div className="mt-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <FileText className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium truncate flex-1">
              {file.name}
            </span>
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              className="ml-2"
              type="button"
            >
              {isUploading ? "Processing..." : "Upload"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
