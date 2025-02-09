export interface Review {
  id: number
  propertyName: string
  propertyImage: string
  user: string
  rating: number
  comment: string
  liked: boolean
  details?: PropertyDetails
  questions?: Question[]
}

export interface PropertyDetails {
  rent: string
  size: string
  location: string
  features: string[]
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

