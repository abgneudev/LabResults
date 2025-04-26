"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Activity, Sparkles, FileText, User } from "lucide-react";

export function StickyMenu() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", icon: <Home size={20} />, path: "/" },
    { name: "Vitals", icon: <Activity size={20} />, path: "/vitals" },
    { name: "AI", icon: <Sparkles size={20} />, path: "/ai-assistant" },
    { name: "Reports", icon: <FileText size={20} />, path: "/reports" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {menuItems.map((item) => {
          // Consider both "/" and "/results" as home for highlighting purposes
          const isActive =
            item.path === "/"
              ? pathname === "/" || pathname === "/results"
              : pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center py-3 px-4 ${
                isActive ? "text-[#03659C]" : "text-gray-500"
              }`}
            >
              <div
                className={`${
                  isActive ? "bg-[#E5F8FF] text-[#03659C]" : ""
                } rounded-full p-2 mb-1`}
              >
                {item.icon}
              </div>
              <span className="text-xs">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
