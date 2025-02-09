"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { StarIcon, HeartIcon } from "@heroicons/react/24/solid"
import type { Review } from "@/types/review"

export function LikedReviewList() {
  const [likedReviews, setLikedReviews] = useState<Review[]>([])

  useEffect(() => {
    const fetchLikedReviews = async () => {
      // この部分は実際のAPIコールに置き換えてください
      const dummyData: Review[] = [
        {
          id: 1,
          propertyName: "サンシャインマンション",
          user: "Aさん",
          rating: 5,
          comment: "駅から近くて便利です。部屋も清潔で快適でした。",
          liked: true,
          propertyImage:
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        },
        {
          id: 3,
          propertyName: "ブルースカイマンション",
          user: "Cさん",
          rating: 4,
          comment: "管理人さんの対応が丁寧で安心して住めます。設備は少し古いかも。",
          liked: true,
          propertyImage:
            "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1178&q=80",
        },
      ]
      setLikedReviews(dummyData)
    }

    fetchLikedReviews()
  }, [])

  const handleUnlike = (id: number) => {
    setLikedReviews(likedReviews.filter((review) => review.id !== id))
  }

  return (
    <div className="space-y-6">
      {likedReviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-48 md:h-64">
            <Image
              src={review.propertyImage || "/placeholder.svg"}
              alt={review.propertyName}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{review.propertyName}</h2>
            <div className="flex items-center mb-2">
              <span className="font-semibold mr-2">{review.user}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className={`h-5 w-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-4">{review.comment}</p>
            <button
              onClick={() => handleUnlike(review.id)}
              className="flex items-center text-red-500 hover:text-gray-500"
            >
              <HeartIcon className="h-5 w-5 mr-1" />
              いいね解除
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

