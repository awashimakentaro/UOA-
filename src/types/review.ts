export interface Review {
  id: number
  propertyName: string
  propertyImage?: string
  user: string
  rating: number
  comment: string
  liked: boolean
  details?: PropertyDetails
}

export interface PropertyDetails {
  rent: string
  size: string
  location: string
  features: string[]
}

export interface PropertyReview {
  id: number
  user: string
  rating: number
  comment: string
}

