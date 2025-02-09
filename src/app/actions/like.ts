"use server"

// TODO: 実際のデータベース操作に置き換える
const likes = new Map<string, Set<string>>()

export async function toggleLike(propertyId: string, userId: string) {
  const propertyLikes = likes.get(propertyId) || new Set()

  if (propertyLikes.has(userId)) {
    propertyLikes.delete(userId)
  } else {
    propertyLikes.add(userId)
  }

  likes.set(propertyId, propertyLikes)
  return Array.from(propertyLikes)
}

export async function getLikes(propertyId: string) {
  return Array.from(likes.get(propertyId) || [])
}

