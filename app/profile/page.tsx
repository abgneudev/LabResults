"use client";

import { usePatient } from "@/context/patient-context";
import { TopBar } from "@/components/top-bar";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Button } from "@/components/ui/button";
import {
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ClipboardList,
  Settings,
  Lock,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function ProfilePage() {
  const { patientData } = usePatient();

  return (
    <div className="min-h-screen bg-white">
      {/* Disclaimer banner positioned at top */}
      <DisclaimerBanner />

      {/* Header with required height */}
      <TopBar showBack={true} title="Profile" className="h-14" />

      <div className="p-6 max-w-[640px] mx-auto">
        {/* Profile Header */}
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#E5F8FF] flex items-center justify-center border-4 border-[#03659C]/20 mr-4">
            <User size={36} className="text-[#03659C]" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{patientData.name}</h1>
            <p className="text-sm text-gray-500">Patient ID: A6294</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 text-xs bg-[#E5F8FF] border-[#03659C]/20 text-[#03659C]"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-[#03659C]">
              Personal Information
            </h2>
          </div>

          <div className="divide-y divide-gray-100">
            <div className="flex items-center p-4">
              <Calendar size={18} className="text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">May 15, 1985</p>
              </div>
            </div>

            <div className="flex items-center p-4">
              <Phone size={18} className="text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">(555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center p-4">
              <Mail size={18} className="text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">
                  {patientData.name.toLowerCase().replace(" ", ".")}@example.com
                </p>
              </div>
            </div>

            <div className="flex items-center p-4">
              <MapPin size={18} className="text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">
                  123 Health Street, Medical City, MC 12345
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Information Section */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-[#03659C]">
              Insurance Information
            </h2>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">BlueCross BlueShield</p>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                Active
              </span>
            </div>
            <p className="text-sm text-gray-500">Policy #: BCBS-12345678</p>
            <p className="text-sm text-gray-500">Group #: 987654</p>
            <p className="text-sm text-gray-500">
              Coverage: 01/01/2025 - 12/31/2025
            </p>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-[#03659C]">Settings</h2>
          </div>

          <div className="divide-y divide-gray-100">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <ClipboardList size={18} className="text-gray-500 mr-3" />
                <span>Health Preferences</span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <Settings size={18} className="text-gray-500 mr-3" />
                <span>App Settings</span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <Lock size={18} className="text-gray-500 mr-3" />
                <span>Privacy & Security</span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 text-red-500">
              <div className="flex items-center">
                <LogOut size={18} className="mr-3" />
                <span>Sign Out</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
