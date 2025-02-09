"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid"
import { toggleLike } from "../app/actions/like"

interface LikeButtonProps {
  propertyId: string
  initialLikes: string[]
}

export default function LikeButton({ propertyId, initialLikes }: LikeButtonProps) {
  const { data: session } = useSession()
  const [likes, setLikes] = useState<string[]>(initialLikes)
  const isLiked = session?.user?.email ? likes.includes(session.user.email) : false

  const handleLike = async () => {
    if (!session?.user?.email) {
      // ログインしていない場合はログインページへリダイレクト
      window.location.href = "/auth/signin"
      return
    }

    const updatedLikes = await toggleLike(propertyId, session.user.email)
    setLikes(updatedLikes)
  }

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-colors ${
        isLiked ? "border-red-500 text-red-500 hover:bg-red-50" : "border-gray-300 text-gray-500 hover:bg-gray-50"
      }`}
    >
      {isLiked ? <HeartSolidIcon className="h-5 w-5 text-red-500" /> : <HeartIcon className="h-5 w-5" />}
      <span className="text-sm">{likes.length}</span>
    </button>
  )
}

