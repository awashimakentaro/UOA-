"use client"

import { useState, useEffect } from "react"
import { StarIcon, HeartIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import type { Review } from "@/types/review"

export function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    // この部分は実際のAPIコールに置き換えてください
    const initialReviews: Review[] = [
      {
        id: 1,
        propertyName: "サンシャインマンション",
        propertyImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
        user: "Aさん",
        rating: 5,
        comment: "駅から近くて便利です。部屋も清潔で快適でした。",
        liked: false,
      },
      // 他の物件データ...
    ]
    setReviews(initialReviews)
  }, [])

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("likedReviews") || "[]")
    setReviews((prevReviews) =>
      prevReviews.map((review) => ({
        ...review,
        liked: savedLikes.includes(review.id),
      })),
    )
  }, [])

  const handleLike = (id: number) => {
    const updatedReviews = reviews.map((review) => (review.id === id ? { ...review, liked: !review.liked } : review))
    setReviews(updatedReviews)

    const likedReviewIds = updatedReviews.filter((review) => review.liked).map((review) => review.id)
    localStorage.setItem("likedReviews", JSON.stringify(likedReviewIds))
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src={review.propertyImage || "/placeholder.svg"}
              alt={review.propertyName}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{review.propertyName}</h2>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className="font-semibold mr-2">{review.user}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
            <button
              onClick={() => handleLike(review.id)}
              className={`flex items-center ${review.liked ? "text-red-500" : "text-gray-500"} hover:text-red-500`}
            >
              <HeartIcon className="h-5 w-5 mr-1" />
              {review.liked ? "いいね済み" : "いいね"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

