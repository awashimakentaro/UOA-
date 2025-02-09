"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { WriteReviewButton } from "@/components/WriteReviewButton"
import type React from "react"

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleReviewClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!session) {
      signIn("google", { callbackUrl: "/write-review" })
    } else {
      router.push("/write-review")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-5 pt-24 flex flex-col items-center justify-center min-h-screen">
        {/* ロゴとタイトル */}
        <div className="text-center mb-8 mt-[-4rem]">
          <h1 className="font-serif text-4xl md:text-6xl mb-4">
            <span className="text-6xl">会津</span>の賃貸の
            <span className="text-5xl md:text-7xl font-bold tracking-wider">Real</span>
          </h1>
          <div className="font-serif text-4xl md:text-2xl tracking-widest mb-4">
            <div>IoA</div>
            <div className="text-sm text-gray-600">Information Of Aizu apartment</div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4 mb-8 w-full max-w-4xl">
          {/* 口コミ投稿ボタン */}
          <WriteReviewButton />

          {/* 検索フォーム */}
          <div className="w-full max-w-4xl px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="物件名・エリアで検索"
                className="w-full py-3 px-4 pr-12 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-serif"
              />
              <div className="absolute right-0 top-0 h-full flex items-center pr-4">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

