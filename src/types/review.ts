export interface Review {
  id: number
  propertyName: string
  propertyImage: string
  user: string
  rating: number
  comment: string
  liked: boolean
  questions?: Question[] // questionsをオプショナルに変更
}

export interface Question {
  id: number
  user: string
  question: string
  answers: Answer[]
  createdAt: string
}

export interface Answer {
  id: number
  user: string
  content: string
  createdAt: string
}

