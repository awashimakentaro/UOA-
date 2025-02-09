"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: number
  text: string
  sender: "user" | "resident"
  timestamp: Date
}

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // メッセージを追加
    const message: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages([...messages, message])
    setNewMessage("")

    // 住人からの自動返信（デモ用）
    setTimeout(() => {
      const response: Message = {
        id: Date.now() + 1,
        text: "ありがとうございます。具体的にどのようなことでしょうか？",
        sender: "resident",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, response])
    }, 1000)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-[600px] flex flex-col">
      <h2 className="text-xl font-bold mb-4">住人とチャット</h2>

      {/* メッセージ一覧 */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            {message.sender === "resident" && (
              <Avatar className="w-8 h-8 mr-2">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>住</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* メッセージ入力フォーム */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="メッセージを入力..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button type="submit">送信</Button>
      </form>
    </div>
  )
}

