"use client"

import { useState } from "react"
import { StarIcon, HeartIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

interface Question {
  id: number
  user: string
  question: string
  answers: Answer[]
  createdAt: string
}

interface Answer {
  id: number
  user: string
  content: string
  createdAt: string
}

interface Review {
  id: number
  propertyName: string
  propertyImage: string
  user: string
  rating: number
  comment: string
  liked: boolean
  questions: Question[]
}

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      propertyName: "サンシャインマンション",
      propertyImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      user: "Aさん",
      rating: 5,
      comment: "駅から近くて便利です。部屋も清潔で快適でした。",
      liked: false,
      questions: [
        {
          id: 1,
          user: "入居検討者",
          question: "インターネット環境はどうですか？",
          createdAt: "2024-02-09",
          answers: [
            {
              id: 1,
              user: "現入居者",
              content: "光回線が利用可能で、速度も安定しています。",
              createdAt: "2024-02-09",
            },
          ],
        },
      ],
    },
    // 他の物件データ...
  ])

  const [newQuestions, setNewQuestions] = useState<{ [key: number]: string }>({})
  const [newAnswers, setNewAnswers] = useState<{ [key: number]: string }>({})
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([])

  const handleLike = (id: number) => {
    setReviews(reviews.map((review) => (review.id === id ? { ...review, liked: !review.liked } : review)))
  }

  const handleQuestionSubmit = (reviewId: number) => {
    if (!newQuestions[reviewId]?.trim()) return

    const updatedReviews = reviews.map((review) => {
      if (review.id === reviewId) {
        const newQuestion: Question = {
          id: Math.random(),
          user: "匿名ユーザー",
          question: newQuestions[reviewId],
          answers: [],
          createdAt: new Date().toISOString().split("T")[0],
        }
        return {
          ...review,
          questions: [...review.questions, newQuestion],
        }
      }
      return review
    })

    setReviews(updatedReviews)
    setNewQuestions({ ...newQuestions, [reviewId]: "" })
  }

  const handleAnswerSubmit = (reviewId: number, questionId: number) => {
    if (!newAnswers[questionId]?.trim()) return

    const updatedReviews = reviews.map((review) => {
      if (review.id === reviewId) {
        return {
          ...review,
          questions: review.questions.map((q) => {
            if (q.id === questionId) {
              const newAnswer: Answer = {
                id: Math.random(),
                user: "現入居者",
                content: newAnswers[questionId],
                createdAt: new Date().toISOString().split("T")[0],
              }
              return {
                ...q,
                answers: [...q.answers, newAnswer],
              }
            }
            return q
          }),
        }
      }
      return review
    })

    setReviews(updatedReviews)
    setNewAnswers({ ...newAnswers, [questionId]: "" })
  }

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions(
      expandedQuestions.includes(questionId)
        ? expandedQuestions.filter((id) => id !== questionId)
        : [...expandedQuestions, questionId],
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* 物件情報ヘッダー */}
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

            {/* レビュー本文 */}
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

            {/* いいねボタン */}
            <button
              onClick={() => handleLike(review.id)}
              className={`flex items-center ${review.liked ? "text-red-500" : "text-gray-500"} hover:text-red-500 mb-4`}
            >
              <HeartIcon className="h-5 w-5 mr-1" />
              {review.liked ? "いいね済み" : "いいね"}
            </button>

            {/* Q&Aセクション */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
                この物件について質問する
              </h3>

              {/* 質問投稿フォーム */}
              <div className="mb-4">
                <Textarea
                  placeholder="質問を入力してください"
                  value={newQuestions[review.id] || ""}
                  onChange={(e) => setNewQuestions({ ...newQuestions, [review.id]: e.target.value })}
                  className="mb-2"
                />
                <Button onClick={() => handleQuestionSubmit(review.id)}>質問を投稿</Button>
              </div>

              {/* 質問一覧 */}
              <div className="space-y-4">
                {review.questions.map((question) => (
                  <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-semibold">{question.user}</span>
                        <p className="mt-1">{question.question}</p>
                      </div>
                      <span className="text-sm text-gray-500">{question.createdAt}</span>
                    </div>

                    {/* 回答一覧 */}
                    <div className="ml-4 mt-2">
                      {question.answers.map((answer) => (
                        <div key={answer.id} className="bg-white p-3 rounded-lg mb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-semibold text-sm">{answer.user}</span>
                              <p className="mt-1 text-sm">{answer.content}</p>
                            </div>
                            <span className="text-xs text-gray-500">{answer.createdAt}</span>
                          </div>
                        </div>
                      ))}

                      {/* 回答投稿フォーム */}
                      <div className="mt-2">
                        <Textarea
                          placeholder="回答を入力してください"
                          value={newAnswers[question.id] || ""}
                          onChange={(e) => setNewAnswers({ ...newAnswers, [question.id]: e.target.value })}
                          className="mb-2"
                        />
                        <Button variant="outline" size="sm" onClick={() => handleAnswerSubmit(review.id, question.id)}>
                          回答する
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

