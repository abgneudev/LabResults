"use client";

import { useState } from "react";
import { TopBar } from "@/components/top-bar";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, User, ArrowRight } from "lucide-react";

type Message = {
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
};

// Sample prompt suggestions
const promptSuggestions = [
  "Explain my cholesterol results",
  "What do my vitamin D levels mean?",
  "How can I improve my blood pressure?",
  "What dietary changes would help my lab results?",
  "What are normal ranges for blood glucose?",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "assistant",
      content:
        "Hello! I'm your health assistant. How can I help you understand your lab results today?",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const assistantMessage: Message = {
        type: "assistant",
        content: `I'll help you understand about "${inputValue}". This is a simulated response for demo purposes. In a real application, this would connect to an AI service to provide medical information based on your lab results.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Disclaimer banner positioned at top */}
      <DisclaimerBanner />

      {/* Header with required height */}
      <TopBar showBack={true} title="AI Health Assistant" className="h-14" />

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full p-4">
        <div className="bg-[#E5F8FF] rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="bg-[#03659C] rounded-full p-2 mr-3">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-[#03659C]">
                Health AI Assistant
              </h2>
              <p className="text-sm text-gray-600">
                Ask questions about your lab results
              </p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-3 ${
                  message.type === "user"
                    ? "bg-[#03659C] text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {message.type === "assistant" && (
                  <div className="flex items-center mb-1">
                    <Sparkles size={14} className="text-[#03659C] mr-1" />
                    <span className="text-xs font-medium text-[#03659C]">
                      Health AI
                    </span>
                  </div>
                )}
                <p>{message.content}</p>
                <div className="text-xs opacity-70 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg rounded-bl-none p-3 max-w-[85%]">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Prompt Suggestions */}
        <div className="mb-4 overflow-x-auto">
          <div className="flex space-x-2">
            {promptSuggestions.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="whitespace-nowrap px-3 py-2 bg-[#E5F8FF] text-[#03659C] rounded-full text-sm hover:bg-[#D5F0FF] flex items-center"
              >
                {prompt} <ArrowRight size={12} className="ml-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Ask about your lab results..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 border-gray-300 focus-visible:ring-[#03659C]"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-[#03659C] hover:bg-[#025180]"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
