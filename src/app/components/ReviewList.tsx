"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { StarIcon, HeartIcon } from "@heroicons/react/24/solid"

interface Review {
  id: number
  propertyName: string
  user: string
  rating: number
  comment: string
  liked: boolean
  image: string
}

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    // ここで実際のAPIからデータを取得します
    const fetchReviews = async () => {
      // この部分は実際のAPIコールに置き換えてください
      const dummyData: Review[] = [
        {
          id: 1,
          propertyName: "サンシャインマンション",
          user: "Aさん",
          rating: 5,
          comment: "駅から近くて便利です。部屋も清潔で快適でした。",
          liked: false,
          image:
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        },
        {
          id: 2,
          propertyName: "グリーンテラス",
          user: "Bさん",
          rating: 4,
          comment: "周辺の環境が良く、静かで住みやすいです。ただ、家賃が少し高めかな。",
          liked: false,
          image:
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        },
        {
          id: 3,
          propertyName: "ブルースカイマンション",
          user: "Cさん",
          rating: 4,
          comment: "管理人さんの対応が丁寧で安心して住めます。設備は少し古いかも。",
          liked: false,
          image:
            "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1178&q=80",
        },
      ]
      setReviews(dummyData)
    }

    fetchReviews()
  }, [])

  const handleLike = (id: number) => {
    setReviews(reviews.map((review) => (review.id === id ? { ...review, liked: !review.liked } : review)))
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-48 md:h-64">
            <Image src={review.image || "/placeholder.svg"} alt={review.propertyName} fill className="object-cover" />
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

