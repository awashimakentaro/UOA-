"use client"

import { useState, useEffect } from "react"
import { StarIcon } from "@heroicons/react/24/solid"
import type { PropertyReview } from "@/types/review"

interface PropertyReviewsProps {
  propertyId: number
}

export function PropertyReviews({ propertyId }: PropertyReviewsProps) {
  const [reviews, setReviews] = useState<PropertyReview[]>([])

  useEffect(() => {
    const fetchReviews = () => {
      const savedReviews = JSON.parse(localStorage.getItem(`propertyReviews_${propertyId}`) || "[]")
      setReviews(savedReviews)
    }

    fetchReviews()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `propertyReviews_${propertyId}`) {
        fetchReviews()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [propertyId])

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <span className="font-semibold mr-2">{review.user}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`h-5 w-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`} />
              ))}
            </div>
          </div>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}

