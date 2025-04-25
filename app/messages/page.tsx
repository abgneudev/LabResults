"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { TopBar } from "@/components/top-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"

interface Message {
  id: string
  sender: "user" | "provider"
  text: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    sender: "provider",
    text: "Hello! How can I help you today?",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: "2",
    sender: "user",
    text: "I have a question about my recent lab results.",
    timestamp: new Date(Date.now() - 82800000), // 23 hours ago
  },
  {
    id: "3",
    sender: "provider",
    text: "Of course! I see your recent cholesterol test. What questions do you have?",
    timestamp: new Date(Date.now() - 79200000), // 22 hours ago
  },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate provider response after a delay
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: "provider",
        text: "Thanks for your message. A healthcare provider will respond within 24 hours.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, response])
    }, 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-screen">
      <TopBar title="Messages" />

      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              <div className="flex items-center mb-1">
                {message.sender === "provider" && (
                  <Avatar className="h-6 w-6 mr-2">
                    <div className="bg-blue-100 text-blue-800 h-full w-full flex items-center justify-center text-xs font-medium">
                      DR
                    </div>
                  </Avatar>
                )}
                <span className="text-xs opacity-70">
                  {message.sender === "user" ? "You" : "Dr. Smith"} • {formatTime(message.timestamp)}
                </span>
              </div>
              <p>{message.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="sticky bottom-0 bg-background border-t p-3">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
            className="flex-1 mr-2"
          />
          <Button type="button" size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
