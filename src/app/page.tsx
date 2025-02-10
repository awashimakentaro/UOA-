"use client"

import { useState } from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { SearchResults } from "@/components/SearchResults"
import type { Review } from "@/types/review"

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Review[]>([])

  const handleReviewClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!session) {
      signIn("google", { callbackUrl: "/write-review" })
    } else {
      router.push("/write-review")
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // この部分は実際のAPIコールに置き換えてください
    const allReviews: Review[] = [
      {
        id: 1,
        propertyName: "サンシャインマンション",
        propertyImages: [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
        ],
        rating: 4.5,
        reviewCount: 10,
        liked: false,
        details: {
          rent: "80,000円",
          size: "25㎡",
          location: "駅から徒歩5分",
          features: ["エアコン", "バス・トイレ別", "宅配ボックス"],
        },
      },
      {
        id: 2,
        propertyName: "グリーンヒルズ会津",
        propertyImages: [
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        ],
        rating: 4.2,
        reviewCount: 8,
        liked: false,
        details: {
          rent: "65,000円",
          size: "30㎡",
          location: "バス停から徒歩3分",
          features: ["駐車場付き", "ペット可", "オートロック"],
        },
      },
    ]

    const filteredResults = allReviews.filter((review) =>
      review.propertyName.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setSearchResults(filteredResults)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-5 pt-24 flex flex-col items-center justify-center min-h-screen">
        {/* ロゴとタイトル */}
        <div className="text-center mb-8 mt-[-4rem]">
          <h1 className="font-serif text-5xl mb-4">
            <span className="text-6xl">会津</span>の賃貸の
            <span className="text-6xl font-bold tracking-wider">Real</span>
          </h1>
          <div className="font-serif text-2xl tracking-widest mb-4">
            <div>IoA</div>
            <div className="text-sm text-gray-600">Information Of Aizu apartment</div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4 mb-8 w-full max-w-4xl">
          {/* 口コミ投稿ボタン */}
          <button
            onClick={handleReviewClick}
            className="inline-block mb-8 px-8 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors duration-300 font-serif tracking-wider"
          >
            口コミを投稿する
          </button>

          {/* 検索フォーム */}
          <form onSubmit={handleSearch} className="w-full max-w-4xl px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="物件名・エリアで検索"
                className="w-full py-3 px-4 pr-12 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-serif"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-0 top-0 h-full flex items-center pr-4">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
            </div>
          </form>
        </div>

        {/* 検索結果 */}
        {searchResults.length > 0 && <SearchResults results={searchResults} />}
      </main>
    </div>
  )
}

