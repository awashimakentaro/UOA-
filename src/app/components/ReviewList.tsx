"use client"

import { useState, useEffect } from "react"
import { StarIcon, HeartIcon, MapPinIcon, HomeIcon, CalendarIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

interface Review {
  id: number
  propertyName: string
  user: string
  rating: number
  comment: string
  liked: boolean
  image: string
  address: string
  buildYear: string
  monthlyRent: string
  description: string
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
          comment: "駅から近くて便利です。部屋も清潔で快適でした。日当たりも良く、管理人さんの対応も丁寧です。",
          liked: false,
          image: "https://images.unsplash.com/photo-1605283176568-9b41fde3672e",
          address: "青森県八戸市内丸1-1-1",
          buildYear: "2020年築",
          monthlyRent: "65,000円",
          description: "駅徒歩5分、オートロック、宅配ボックス完備。コンビニまで徒歩1分の好立地。",
        },
        {
          id: 2,
          propertyName: "グリーンテラス",
          user: "Bさん",
          rating: 4,
          comment: "周辺の環境が良く、静かで住みやすいです。ただ、家賃が少し高めかな。スーパーも近くて便利です。",
          liked: false,
          image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
          address: "青森県八戸市内丸2-2-2",
          buildYear: "2019年築",
          monthlyRent: "75,000円",
          description: "緑豊かな環境、充実した設備。24時間セキュリティ対応。",
        },
        {
          id: 3,
          propertyName: "ブルースカイマンション",
          user: "Cさん",
          rating: 4,
          comment: "管理人さんの対応が丁寧で安心して住めます。設備は少し古いかも。バス停も近くて通勤に便利。",
          liked: false,
          image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7",
          address: "青森県八戸市内丸3-3-3",
          buildYear: "2018年築",
          monthlyRent: "55,000円",
          description: "バス停徒歩1分、スーパー徒歩5分。リノベーション済みの清潔な物件。",
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
    <div className="space-y-8">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-64 w-full">
            <Image src={review.image || "/placeholder.svg"} alt={review.propertyName} fill className="object-cover" />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">{review.propertyName}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {review.address}
              </div>
              <div className="flex items-center">
                <HomeIcon className="h-4 w-4 mr-1" />
                {review.monthlyRent}
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {review.buildYear}
              </div>
            </div>
            <p className="text-gray-700 mb-4">{review.description}</p>
            <div className="border-t border-b py-4 my-4">
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
              className={`flex items-center ${
                review.liked ? "text-red-500" : "text-gray-500"
              } hover:text-red-500 transition-colors`}
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

