"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { StarIcon, HeartIcon } from "@heroicons/react/24/solid"
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
        propertyImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
        user: "Bさん",
        rating: 4,
        comment: "自然が豊かで静かな環境です。部屋は少し古いですが、管理が行き届いています。",
        liked: false,
        details: {
          rent: "65,000円",
          size: "30㎡",
          location: "バス停から徒歩3分",
          features: ["駐車場付き", "ペット可", "オートロック"],
        },
      },
      {
        id: 3,
        propertyName: "ブルースカイハイツ",
        propertyImage: "https://images.unsplash.com/photo-1576941089067-2de3c901e126",
        user: "Cさん",
        rating: 3,
        comment: "眺めが良く、日当たりも良好です。ただ、エレベーターがないのが少し不便です。",
        liked: false,
        details: {
          rent: "70,000円",
          size: "22㎡",
          location: "駅から徒歩10分",
          features: ["インターネット無料", "コインランドリー", "バルコニー付き"],
        },
      },
      {
        id: 4,
        propertyName: "さくら荘",
        propertyImage: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7",
        user: "Dさん",
        rating: 5,
        comment: "和風の落ち着いた雰囲気が素敵です。大学にも近くて便利です。",
        liked: false,
        details: {
          rent: "55,000円",
          size: "20㎡",
          location: "大学から徒歩7分",
          features: ["畳部屋", "共用キッチン", "自転車置き場"],
        },
      },
      {
        id: 5,
        propertyName: "メイプルコート",
        propertyImage: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd",
        user: "Eさん",
        rating: 4,
        comment: "セキュリティが充実していて安心です。コンビニも近くて便利ですね。",
        liked: false,
        details: {
          rent: "75,000円",
          size: "28㎡",
          location: "駅から徒歩8分",
          features: ["防犯カメラ", "宅配ボックス", "24時間管理人"],
        },
      },
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

    // カスタムイベントを発行して、LikedReviewListに通知
    const event = new CustomEvent("likedReviewsUpdated", { detail: likedReviewIds })
    window.dispatchEvent(event)
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <div className="relative h-48 md:h-full">
                <Image
                  src={review.propertyImage || "/placeholder.svg"}
                  alt={review.propertyName}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-6 md:w-2/3">
              <h2 className="text-xl font-semibold mb-2">{review.propertyName}</h2>
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
              <p className="text-gray-700 mb-4">{review.comment}</p>

              {review.details && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">物件詳細</h3>
                  <ul className="space-y-2">
                    <li>
                      <span className="font-medium">家賃:</span> {review.details.rent}
                    </li>
                    <li>
                      <span className="font-medium">広さ:</span> {review.details.size}
                    </li>
                    <li>
                      <span className="font-medium">立地:</span> {review.details.location}
                    </li>
                    <li>
                      <span className="font-medium">特徴:</span>
                      <ul className="list-disc list-inside ml-4">
                        {review.details.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
              )}

              <button
                onClick={() => handleLike(review.id)}
                className={`flex items-center ${review.liked ? "text-red-500" : "text-gray-500"} hover:text-red-500 mt-4`}
              >
                <HeartIcon className="h-5 w-5 mr-1" />
                {review.liked ? "いいね済み" : "いいね"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

