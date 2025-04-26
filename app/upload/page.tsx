"use client";

import { useState } from "react";
import { TopBar } from "@/components/top-bar";
import { Upload, Info, FileUp, CheckCircle } from "lucide-react";
import { DisclaimerBanner } from "@/components/disclaimer-banner";

interface UploadedFile {
  name: string;
  size: number;
  url: string;
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

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
      console.log("Files dropped:", e.dataTransfer.files);
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log("Files selected:", e.target.files);
      handleFileUpload(e.target.files);
    }
  };

  const handleFileUpload = (fileList: FileList) => {
    const newFiles: UploadedFile[] = [];

    Array.from(fileList).forEach((file) => {
      if (file.type === "application/pdf") {
        newFiles.push({
          name: file.name,
          size: file.size,
          url: URL.createObjectURL(file),
        });
      }
    });

    if (newFiles.length > 0) {
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <TopBar title="Upload Results" />
      <DisclaimerBanner />

      <div className="max-w-[640px] mx-auto px-6 py-6">
        {/* Page Title with improved typography */}
        <h1 className="text-2xl font-bold text-[#202124] mb-4">
          Upload Lab Results
        </h1>

        <p className="text-base text-[#5f6368] mb-6">
          Upload your lab results to automatically extract and track your health
          metrics.
        </p>

        {/* Info Box - with Google Material styling */}
        <div className="rounded-lg bg-[#e8f0fe] px-4 py-3 mb-6">
          <div className="flex items-center mb-2">
            <Info className="h-4 w-4 mr-2 text-[#1a73e8]" aria-hidden="true" />
            <h2 className="text-sm font-medium text-[#1a73e8]">How it works</h2>
          </div>
          <ol className="text-xs leading-5 ml-5 list-decimal text-[#5f6368]">
            <li>Upload your lab results PDF</li>
            <li>Our system extracts key health metrics</li>
            <li>View your results in an easy-to-understand format</li>
            <li>Track changes over time and get personalized insights</li>
          </ol>
        </div>

        {/* Drag and Drop Zone - modernized */}
        <div
          className={`
            border-2 border-dashed rounded-xl min-h-[200px] 
            flex items-center justify-center flex-col gap-5 mb-6
            ${
              isDragging
                ? "bg-[#e8f0fe] border-[#1a73e8]"
                : "border-[#9aa0a6]/30 hover:border-[#1a73e8]/30"
            }
            transition-all duration-200
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          aria-live="polite"
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <div className="w-16 h-16 bg-[#e8f0fe] rounded-full flex items-center justify-center">
            <Upload className="h-7 w-7 text-[#1a73e8]" aria-hidden="true" />
          </div>
          <div className="text-center">
            <p className="text-base font-medium text-[#202124] mb-2">
              Upload Lab Results
            </p>
            <p className="text-sm text-[#5f6368]">
              Select the test report you need to review
            </p>
          </div>
          <input
            id="file-input"
            type="file"
            accept="application/pdf"
            multiple
            className="hidden"
            aria-label="Upload lab PDF"
            onChange={handleFileChange}
          />
        </div>

        {/* Legal Strip - modernized */}
        <div className="bg-[#f1f3f4] rounded-lg px-4 py-3 text-xs text-[#5f6368] mb-6">
          <p>
            Our system will automatically extract key health metrics from your
            lab results.
          </p>
          <p className="mt-1 italic">
            Always consult with your healthcare provider about your results.
          </p>
        </div>

        {/* Supported Lab Reports Box - with material design */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-[#202124] mb-2">
            Supported Lab Reports
          </h3>
          <p className="text-xs text-[#5f6368] mb-1">
            We currently support PDF lab reports from the following providers:
          </p>
          <ul className="list-disc ml-5 text-xs text-[#5f6368]">
            <li>Quest Diagnostics</li>
            <li>LabCorp</li>
            <li>Mayo Clinic Laboratories</li>
            <li>Cleveland Clinic Labs</li>
            <li>Most hospital-based lab reports</li>
          </ul>
        </div>

        {/* Display uploaded files if any - with modern styling */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-[#202124] mb-3">
              Uploaded Files
            </h3>
            <div className="space-y-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-white rounded-lg shadow-sm"
                >
                  <CheckCircle className="h-5 w-5 text-[#34a853] mr-3" />
                  <div className="flex-1">
                    <p className="text-sm text-[#202124] font-medium">
                      {file.name}
                    </p>
                    <p className="text-xs text-[#5f6368]">
                      {Math.round(file.size / 1024)} KB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
