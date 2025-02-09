"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: number
  content: string
  isUser: boolean
  timestamp: Date
}

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "この物件について、どんなことでも質問してください！",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // ユーザーのメッセージを追加
    const userMessage: Message = {
      id: messages.length + 1,
      content: newMessage,
      isUser: true,
      timestamp: new Date(),
    }
    setMessages([...messages, userMessage])

    // 自動返信（実際のAPIコールに置き換えることができます）
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        content: "ご質問ありがとうございます。担当者が確認次第、回答させていただきます。",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Q & A</h2>
        <span className="text-sm text-gray-500">通常1営業日以内に回答</span>
      </div>

      {/* メッセージ表示エリア */}
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-2 max-w-[80%] ${message.isUser ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={message.isUser ? "/user-avatar.png" : "/bot-avatar.png"}
                    alt={message.isUser ? "User" : "Bot"}
                  />
                  <AvatarFallback>{message.isUser ? "U" : "B"}</AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-3 ${
                    message.isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* メッセージ入力フォーム */}
      <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
        <Input
          type="text"
          placeholder="質問を入力してください..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">送信</Button>
      </form>
    </div>
  )
}

