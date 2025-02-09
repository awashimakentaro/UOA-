import { Header } from "@/components/Header"
import { ReviewList } from "@/components/ReviewList"
import { ChatSection } from "@/components/ChatSection"
import { FilterBar } from "@/components/FilterBar"

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <FilterBar />
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">すべての口コミ</h1>
            <ReviewList />
          </div>
          <div className="hidden lg:block w-[400px]">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <ChatSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

