"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "../components/Header"
import { StarIcon } from "@heroicons/react/24/solid"

export default function WriteReviewPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [propertyName, setPropertyName] = useState("")
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  // ログインしていない場合はホームページにリダイレクト
  if (status === "unauthenticated") {
    router.push("/")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // ここで口コミデータを送信する処理を実装します
    console.log({ propertyName, rating, comment, userId: session?.user?.email })
    // 送信後、フォームをリセットするなどの処理を行います
    setPropertyName("")
    setRating(0)
    setComment("")
    alert("口コミが投稿されました！")
    router.push("/reviews")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-6">口コミを書く</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propertyName">
              物件名
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="propertyName"
              type="text"
              placeholder="物件名を入力してください"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">評価</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
              コメント
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="comment"
              placeholder="口コミを入力してください"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              投稿する
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

