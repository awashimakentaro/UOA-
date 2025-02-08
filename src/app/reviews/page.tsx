"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPinIcon, AdjustmentsHorizontalIcon, MapIcon, BookmarkIcon } from "@heroicons/react/24/outline"
import { StarIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

interface Property {
  id: number
  name: string
  address: string
  station: string
  walkingTime: string
  builtYear: string
  rating: number
  reviewCount: number
  images: string[]
  features: string[]
}

export default function ReviewsPage() {
  const [selectedAreas, setSelectedAreas] = useState<string[]>(["八戸駅"])
  const [properties, setProperties] = useState<Property[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // 仮のデータ取得関数
  useEffect(() => {
    const fetchProperties = async () => {
      // 実際のAPIコールに置き換えてください
      const dummyData: Property[] = [
        {
          id: 1,
          name: "ローズガーデングリーン",
          address: "青森県八戸市尻内町尻内",
          station: "八戸駅",
          walkingTime: "徒歩14分",
          builtYear: "2011年1月築",
          rating: 2.96,
          reviewCount: 2,
          images: [
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
            "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83"
          ],
          features: ["キャッシュバック対象"],
        },
        {
          id: 2,
          name: "グリーンテラス八戸",
          address: "青森県八戸市内丸",
          station: "本八戸駅",
          walkingTime: "徒歩10分",
          builtYear: "2015年3月築",
          rating: 3.5,
          reviewCount: 4,
          images: [
            "https://images.unsplash.com/photo-1576941089067-2de3c901e126",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
          ],
          features: ["ペット可", "駐車場あり"],
        },
        // 他の物件データ...
      ]
      setProperties(dummyData)
    }
    fetchProperties()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        {/* 検索条件バー */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-3 divide-x">
            <button className="flex items-center justify-center py-4 hover:bg-gray-50">
              <MapPinIcon className="h-5 w-5 mr-2 text-gray-600" />
              <span>並び替え</span>
            </button>
            <button
              className="flex items-center justify-center py-4 hover:bg-gray-50"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 text-gray-600" />
              <span>条件変更</span>
            </button>
            <button className="flex items-center justify-center py-4 hover:bg-gray-50">
              <MapIcon className="h-5 w-5 mr-2 text-gray-600" />
              <span>地図表示</span>
            </button>
          </div>

          {/* フィルターパネル */}
          {isFilterOpen && (
            <div className="p-4 border-t">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2 flex items-center">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    エリア
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["八戸駅", "陸奥白浜駅", "大久喜駅"].map((area) => (
                      <Button
                        key={area}
                        variant={selectedAreas.includes(area) ? "default" : "outline"}
                        onClick={() => {
                          if (selectedAreas.includes(area)) {
                            setSelectedAreas(selectedAreas.filter((a) => a !== area))
                          } else {
                            setSelectedAreas([...selectedAreas, area])
                          }
                        }}
                      >
                        {area}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-2">詳細条件</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>キャッシュバック対象物件</span>
                    </label>
                    {/* 他の条件を追加 */}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button onClick={() => setIsFilterOpen(false)}>条件を適用</Button>
              </div>
            </div>
          )}
        </div>

        {/* 検索結果 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            賃貸マンション・アパート <span className="text-red-500">{properties.length}</span>件
          </h2>
          <Button variant="outline" size="sm">
            <BookmarkIcon className="h-4 w-4 mr-2" />
            条件保存
          </Button>
        </div>

        <div className="space-y-4">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <div className="flex">
                <div className="w-1/3">
                  <div className="relative h-48">
                    <Image
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 p-4">
                  <h3 className="text-xl font-bold mb-2">{property.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.floor(property.rating) ? "text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-bold">{property.rating}</span>
                    <span className="ml-2 text-gray-600">（{property.reviewCount}件）</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <MapPinIcon className="h-4 w-4 inline mr-1" />
                      {property.address}
                    </p>
                    <p>
                      {property.station}、{property.walkingTime}
                    </p>
                    <p>{property.builtYear}</p>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {property.features.map((feature, index) => (
                      <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

