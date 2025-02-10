import { Header } from "@/components/Header"
import { ChatSection } from "@/components/ChatSection"

export default function QAndAPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-6">Q&A</h1>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <ChatSection />
        </div>
      </main>
    </div>
  )
}

