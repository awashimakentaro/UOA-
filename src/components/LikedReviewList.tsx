"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { StarIcon, HeartIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Review, Question, Answer } from "@/types/review"

export function LikedReviewList() {
  const [likedReviews, setLikedReviews] = useState<Review[]>([])
  const [newQuestions, setNewQuestions] = useState<{ [key: number]: string }>({})
  const [newAnswers, setNewAnswers] = useState<{ [key: number]: string }>({})
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([])

  useEffect(() => {
    const fetchLikedReviews = async () => {
      const savedLikeIds = JSON.parse(localStorage.getItem("likedReviews") || "[]")
      // この部分は実際のAPIコールに置き換えてください
      const allReviews: Review[] = [
        {
          id: 1,
          propertyName: "サンシャインマンション",
          user: "Aさん",
          rating: 5,
          comment: "駅から近くて便利です。部屋も清潔で快適でした。",
          liked: true,
          propertyImage:
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          details: {
            rent: "80,000円",
            size: "25㎡",
            location: "駅から徒歩5分",
            features: ["エアコン", "バス・トイレ別", "宅配ボックス"],
          },
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
      ]
      const filteredReviews = allReviews.filter((review) => savedLikeIds.includes(review.id))
      setLikedReviews(filteredReviews)
    }

    fetchLikedReviews()
  }, [])

  const handleUnlike = (id: number) => {
    const updatedReviews = likedReviews.filter((review) => review.id !== id)
    setLikedReviews(updatedReviews)
    const updatedLikeIds = updatedReviews.map((review) => review.id)
    localStorage.setItem("likedReviews", JSON.stringify(updatedLikeIds))
  }

  const handleQuestionSubmit = (reviewId: number) => {
    if (!newQuestions[reviewId]?.trim()) return

    const updatedReviews = likedReviews.map((review) => {
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
          questions: [...(review.questions || []), newQuestion],
        }
      }
      return review
    })

    setLikedReviews(updatedReviews)
    setNewQuestions({ ...newQuestions, [reviewId]: "" })
  }

  const handleAnswerSubmit = (reviewId: number, questionId: number) => {
    if (!newAnswers[questionId]?.trim()) return

    const updatedReviews = likedReviews.map((review) => {
      if (review.id === reviewId && review.questions) {
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

    setLikedReviews(updatedReviews)
    setNewAnswers({ ...newAnswers, [questionId]: "" })
  }

  const toggleQuestions = (reviewId: number) => {
    setExpandedQuestions((prev) =>
      prev.includes(reviewId) ? prev.filter((id) => id !== reviewId) : [...prev, reviewId],
    )
  }

  return (
    <div className="space-y-6">
      {likedReviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex md:h-[600px]">
            <div className="md:w-1/2 md:overflow-y-auto">
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
                  onClick={() => handleUnlike(review.id)}
                  className="flex items-center text-red-500 hover:text-gray-500 mt-4"
                >
                  <HeartIcon className="h-5 w-5 mr-1" />
                  いいね解除
                </button>
              </div>
            </div>

            <div className="md:w-1/2 md:border-l md:overflow-y-auto">
              <div className="p-6">
                <button
                  onClick={() => toggleQuestions(review.id)}
                  className="md:hidden w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {expandedQuestions.includes(review.id) ? "質問を閉じる" : "質問する"}
                </button>

                <div className={`md:block ${expandedQuestions.includes(review.id) ? "block" : "hidden"}`}>
                  <div className="pt-4">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
                      この物件について質問する
                    </h3>
                    <div className="mb-4">
                      <Textarea
                        placeholder="質問を入力してください"
                        value={newQuestions[review.id] || ""}
                        onChange={(e) => setNewQuestions({ ...newQuestions, [review.id]: e.target.value })}
                        className="mb-2"
                      />
                      <Button onClick={() => handleQuestionSubmit(review.id)}>質問を投稿</Button>
                    </div>
                    <div className="space-y-4">
                      {review.questions?.map((question) => (
                        <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="font-semibold">{question.user}</span>
                              <p className="mt-1">{question.question}</p>
                            </div>
                            <span className="text-sm text-gray-500">{question.createdAt}</span>
                          </div>
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
                            <div className="mt-2">
                              <Textarea
                                placeholder="回答を入力してください"
                                value={newAnswers[question.id] || ""}
                                onChange={(e) => setNewAnswers({ ...newAnswers, [question.id]: e.target.value })}
                                className="mb-2"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAnswerSubmit(review.id, question.id)}
                              >
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
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

