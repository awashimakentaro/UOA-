import Image from "next/image"
import { StarIcon } from "@heroicons/react/24/solid"
import type { Review } from "@/types/review"

interface SearchResultsProps {
  results: Review[]
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">検索結果</h2>
      <div className="space-y-6">
        {results.map((result) => (
          <div key={result.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <div className="relative h-48 md:h-full">
                  <Image
                    src={result.propertyImages[0] || "/placeholder.svg"}
                    alt={result.propertyName}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="p-6 md:w-2/3">
                <h3 className="text-xl font-semibold mb-2">{result.propertyName}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(result.rating) ? "text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">{result.rating.toFixed(1)}</span>
                  <span className="text-sm text-gray-500 ml-2">({result.reviewCount}件の口コミ)</span>
                </div>
                {result.details && (
                  <div className="mt-2">
                    <p>家賃: {result.details.rent}</p>
                    <p>広さ: {result.details.size}</p>
                    <p>立地: {result.details.location}</p>
                    <p>特徴: {result.details.features.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

